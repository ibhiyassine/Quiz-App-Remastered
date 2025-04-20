<script setup>
import { reactive, ref, onMounted, watch,computed,nextTick  } from 'vue';
import TopicItem from './TopicItem.vue';
import { getTopics } from '@/composables/getTopics';
import {GetSavedQuetions} from '@/composables/GetsavedQuetions';
import { saveQuiz } from '@/composables/SaveQuiz'; 
import { db } from "@/firebase"; 
import { collection, addDoc } from "firebase/firestore";
import { quizExists } from '@/composables/QuizExists';
import { questionExists } from '@/composables/QuestionExists';


const questionsContainerRef = ref(null);
const quiz = reactive({
  title: "",
  difficulty: "",
  topic: new Set(),
});

//to get fetched questions
const topicSelected = ref("");
const shouldFetch = computed(() => {
  return quiz.topic.size > 0 && quiz.difficulty !== "";
});

watch(shouldFetch, async (newValue) => {
  if (newValue) {
    console.log("Fetching questions...");
    fetchedQuestions.value = await GetSavedQuetions(quiz);
    console.log(" questions:", fetchedQuestions.value);
  }
});

//to add topic to the quiz object
function addTopic() {
  if (topicSelected.value && !quiz.topic.has(topicSelected.value)) {
    quiz.topic.add(topicSelected.value);
  }
  topicSelected.value = "";
}

//for the topics in select 
const topics = ref([]);

onMounted(async () => {
  topics.value = await getTopics();
  console.log("quiz", quiz);
});

watch(topicSelected, (newValue) => {
  if (newValue) addTopic();
});

//submission
function submitForm(event) {
 
  if (quiz.title && quiz.topic.size > 0 && quiz.difficulty) {

    console.log("form:", quiz);
  } else {
    alert("Please fill in all required fields");
  }
  return false;
}

//to get the selecteed questions
const fetchedQuestions = ref([]);
const selectedQuestions = ref([]);
const showQuestionList = ref(false);

function toggleQuestion(q) {
  const index = selectedQuestions.value.findIndex(id => id === q.id);
  if (index !== -1) {
    selectedQuestions.value.splice(index, 1);
  } else {
    selectedQuestions.value.push(q.id);
  }
}
//scroll 
async function showQuestionsAndScroll() {
  console.log("Fetching questions...");
    fetchedQuestions.value = await GetSavedQuetions(quiz);
    console.log(" questions:", fetchedQuestions.value);
  showQuestionList.value = true;
  
  await nextTick();
  
  console.log("hey");
  if (questionsContainerRef.value) {
    questionsContainerRef.value.scrollIntoView({ behavior: 'smooth' });
  }
}
//to save 
async function saveSelectedQuestions() {
  const selected = fetchedQuestions.value.filter(q => selectedQuestions.value.includes(q.id));
  console.log("Selected questions:", selected);
  if (selected.length === 0) {
    alert("Please select at least one question.");
    return;
  }
  const quizAlreadyExists = await quizExists(quiz.title);
  if (quizAlreadyExists) {
    alert("A quiz with this title already exists. Please choose a different title.");
    return;
  }

  console.log("Saving quiz:", quiz);

  const quizRef = await saveQuiz(quiz, selected);
    alert("Quiz saved!",selected);

    for (const q of selected) {
    const alreadyExists = await questionExists(q.question);
    if (!alreadyExists) {
      const questionData = {
        question: q.question,
        answers: q.answers,
        category: q.category,
        difficulty: parseInt(q.difficulty),
      };
      await addDoc(collection(db, "questions"), questionData);
    } else {
      console.log(`Question already exists: ${q.question}`);
    }
  }
    showQuestionList.value = false;

  
    quiz.title = "";
    quiz.difficulty = "";
    quiz.topic.clear();
    selectedQuestions.value=[];

  alert(`Saved ${selected.length} questions!`);
  showQuestionList.value = false;
}



</script>

<template>
  <div class="d-flex justify-content-center">
    <div class="w-50 h100 m-5">
      <form class="d-flex flex-column justify-content-evenly h-100 gap-2 mt-5"  @submit.prevent="submitForm">
        <input
          type="text"
          class="form-control border border-3 border-blue"
          id="title"
          placeholder="Quiz title"
          required
          v-model="quiz.title" 
        />

        <div class="position-relative">
          <select class="form-select border border-3 border-blue" id="topics" v-model="topicSelected">
            <option value="" disabled>Select Topics</option>
            <option v-for="(topic, index) in topics" :key="index" :value="topic">{{ topic }}</option>
          </select>
          <span v-if="quiz.topic.size > 0" class="position-absolute top-0 end-0 badge bg-success me-2 mt-2">
            {{ quiz.topic.size }} selected
          </span>
        </div>

        <div class="d-flex gap-2 p-2 flex-wrap ps-4">
          <TopicItem v-for="(topic, index) in Array.from(quiz.topic)" :key="index" :topic="topic" @remove="quiz.topic.delete(topic)" />
        </div>

        <select class="form-select border border-3 border-blue" v-model="quiz.difficulty" required>
          <option value="" disabled>Select difficulty</option>
          <option class="options" value="1" >Easy</option>
          <option class="options" value="2">Medium</option>
          <option class="options" value="3">Hard</option>
        </select>

        <button
          type="submit"
          class="btn btn-primary mt-3 mx-auto fw-bold fs-5 border border-5 border-blue rounded-pill "
          style="background-color:#1d3c45 ; color:#fff1e1 ; width: 180px;" @click="showQuestionsAndScroll"
        >
          Add questions
        </button>
      </form>
    </div>
  </div>

  <div v-if="showQuestionList && fetchedQuestions.length > 0" class="mt-4 rounded p-3 w-75 m-auto" style="background-color: #fff1e1; border: 3px solid #d2601a;">
  <h4 class="text-center mb-3 fw-bold" style="color: #d2601a; background-color: #fff1e1; border-bottom: 3px solid #d2601a; padding-bottom: 10px;">Select Questions</h4>
  
  <div class="questions-container" ref="questionsContainerRef" style="max-height: 400px; overflow-y: auto; padding: 5px 15px 5px 5px;">
    <div v-for="(q, index) in fetchedQuestions" :key="q.id" class="form-check mb-4 d-flex align-items-start">
      <input
        class="form-check-input mt-2"
        type="checkbox"
        :id="'q'+index"
        :value="q.id"
        @change="toggleQuestion(q)"
        :checked="selectedQuestions.includes(q.id)"
        style="min-width: 18px; height: 18px; margin-right: 12px;"
      />
      <label class="form-check-label fw-bold" :for="'q'+index" style="margin-left: 5px; word-break: break-word;">
        {{ q.question }}
      </label>
    </div>
  </div>

  <div class="text-center mt-4">
    <button class="btn btn-primary mt-3 mx-auto fw-bold fs-5 border border-5 border-blue rounded-pill" 
            @click="saveSelectedQuestions" 
            style="color: #1d3c45; background-color: #d2601a; padding: 8px 20px;">
      Save Selected Questions
    </button>
  </div>
</div>



</template>

<style scoped>
.form-select,
input {
  background-color: #fff1e1;
  color: #1d3c45;
  font-weight: bold;
  font-size: 18px;
  border-radius: 12px;
  padding: 10px 15px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 0 5px rgba(29, 60, 69, 0.2);
}

.form-select:focus,
input:focus {
  border-color: #d2601a;
  box-shadow: 0 0 0 0.2rem rgba(210, 96, 26, 0.25);
  outline: none;
  background-color: white;
}

.form-select option {
  background-color: #fff1e1;
  color: #1d3c45;
  font-weight: 600;
}

.form-select option:hover {
  background-color: #d2601a;
  color: white;
}

.options {
  font-style: italic;
}

input::placeholder {
  color: #1d3c45;
  font-weight: bold;
  font-size: 18px;
}
</style>
