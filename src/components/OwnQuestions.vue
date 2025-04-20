<script setup>
import { ref, reactive } from 'vue';
import { db } from "@/firebase"; 
import { collection, addDoc, query, where, getDocs,doc } from "firebase/firestore";
import { quizExists } from '@/composables/QuizExists';

const categoryMap = {
  "General Knowledge": 9,
  "Books": 10,
  "Film": 11,
  "Music": 12,
  "Television": 14,
  "Video Games": 15,
  "Science & Nature": 17,
  "Computers": 18,
  "Mathematics": 19,
  "Mythology": 20,
  "Sports": 21,
  "Geography": 22,
  "History": 23,
  "Politics": 24,
  "Art": 25,
  "Animals": 27,
  "Vehicles": 28,
};

const quiz = reactive({
  title: "",
  difficulty: "",
  topic: "",
});

const NumberOfQuestions = ref(10);
const isLoading = ref(false);


// Save quiz

async function saveQuiz() {
  if (!quiz.title || !quiz.difficulty || !quiz.topic) {
    alert("Please fill in all required fields");
    return;
  }

  isLoading.value = true;

  try {
    if (await quizExists(quiz.title)) {
      alert("Quiz already exists. Choose a different title.");
      isLoading.value = false;
      return;
    }

    const categoryId = categoryMap[quiz.topic];
    if (!categoryId) {
      alert("Invalid topic selected.");
      isLoading.value = false;
      return;
    }

    const url = `https://opentdb.com/api.php?amount=${NumberOfQuestions.value}&category=${categoryId}&difficulty=${quiz.difficulty}&type=multiple`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.response_code !== 0 || data.results.length === 0) {
      alert("No questions found. Try different settings.");
      isLoading.value = false;
      return;
    }

    const difficultyLevel = quiz.difficulty === "easy" ? 1 : quiz.difficulty === "medium" ? 2 : 3;

    const questionRefs = [];

    for (const q of data.results) {
      let questionId;

      const existingQ = await getDocs(query(collection(db, "questions"), where("question", "==", q.question)));

      if (!existingQ.empty) {
        questionId = existingQ.docs[0].id;
      } else {
        const allAnswers = [q.correct_answer, ...q.incorrect_answers];

        const questionData = {
          question: q.question,
          answers: allAnswers,
          category: [q.category],
          difficulty: difficultyLevel
        };

        const questionRef = await addDoc(collection(db, "questions"), questionData);
        questionId = questionRef.id;
      }

      questionRefs.push(doc(db, "questions", questionId));
    }

    const quizData = {
      name: quiz.title,
      NumberOfQuestions: questionRefs.length,
      createdAt: new Date(),
      difficulty: difficultyLevel,
      takenBy: [],
      topics: [quiz.topic],
      questions: questionRefs 
    };

    await addDoc(collection(db, "quizzes"), quizData);

    alert(`Quiz "${quiz.title}" saved with ${questionRefs.length} questions!`);

   
    quiz.title = "";
    quiz.difficulty = "";
    quiz.topic = "";

  } catch (error) {
    console.error(error);
    alert("Failed to save quiz.");
  } finally {
    isLoading.value = false;
  }
}

</script>


<template>
  <div class="d-flex justify-content-center">
    <div class="w-50 h100 m-5">
      <form @submit.prevent="saveQuiz" class="d-flex flex-column justify-content-evenly h-100 gap-2 mt-5">

        <input
          type="text"
          class="form-control border border-3 border-blue"
          placeholder="Quiz title"
          v-model="quiz.title"
          required
        />

        <select class="form-select border border-3 border-blue" v-model="quiz.difficulty" required>
          <option value="" disabled>Select difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <select class="form-select border border-3 border-blue" v-model="quiz.topic" required>
          <option value="" disabled>Select topic</option>
          <option v-for="(id, name) in categoryMap" :key="id" :value="name">
            {{ name }}
          </option>
        </select>

        <div class="mb-3">
          <label for="NumberOfQuestions" class="form-label" style="color: #1d3c45; font-weight: bold;">Number of Questions</label>
          <input
            type="number"
            class="form-control border border-3 border-blue"
            id="NumberOfQuestions"
            min="1"
            max="50"
            v-model="NumberOfQuestions"
          />
        </div>

        <button
          type="submit"
          class="btn btn-primary mt-3 mx-auto fw-bold fs-5 border border-5 border-blue rounded-pill"
          style="background-color:#1d3c45; color:#fff1e1; width: 180px;"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Saving...' : 'Create Quiz' }}
        </button>
      </form>
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