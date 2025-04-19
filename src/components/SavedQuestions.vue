<script setup>
import { reactive, ref, onMounted, watch } from 'vue';
import TopicItem from './TopicItem.vue';
import { getTopics } from '@/composables/getTopics';

const topicSelected = ref("");

const quiz = reactive({
  title: "",
  difficulty: "",
  topic: new Set(),
});



function addTopic() {
  if (topicSelected.value && !quiz.topic.has(topicSelected.value)) {
    quiz.topic.add(topicSelected.value);
  }
  topicSelected.value = "";
}

const topics = ref([]);

onMounted(async () => {
  topics.value = await getTopics();
  console.log("quiz", quiz);
});

watch(topicSelected, (newValue) => {
  if (newValue) addTopic();
});
</script>

<template>
  <div class="d-flex justify-content-center">
    <div class="w-50 h100 m-5">
      <form class="d-flex flex-column justify-content-evenly h-100 gap-2 mt-5">
        <input
          type="text"
          class="form-control border border-3 border-blue"
          id="title"
          placeholder="Quiz title"
          required
          v-model="quiz.title"
        />

        <select class="form-select border border-3 border-blue" id="topics" v-model="topicSelected">
          <option value="" disabled>Select Topics</option>
          <option v-for="(topic, index) in topics" :key="index" :value="topic">{{ topic }}</option>
        </select>

        <div class="d-flex gap-2 p-2 flex-wrap ps-4">
          <TopicItem v-for="(topic, index) in Array.from(quiz.topic)" :key="index" :topic="topic" />
        </div>

        <select class="form-select border border-3 border-blue" v-model="quiz.difficulty" required>
          <option value="" disabled>Select difficulty</option>
          <option class="options" value="1">Easy</option>
          <option class="options" value="2">Medium</option>
          <option class="options" value="3">Hard</option>
        </select>

        <button
          type="submit"
          class="btn btn-primary mt-3 mx-auto fw-bold fs-5 border border-5 border-blue rounded-pill"
          style="background-color:#1d3c45 ; color:#fff1e1 ; width: 180px;"
        >
          Add questions
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
