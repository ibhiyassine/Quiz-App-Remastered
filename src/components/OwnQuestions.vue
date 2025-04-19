<script setup>
import { reactive,ref } from 'vue';
import TopicItem from './TopicItem.vue';


let quiz=reactive({
    title: "",
    difficulty: "",
    numberOfQuestions: "",
    topic: new Set([]),
});
let topic_stream=ref("");

function check_input(key) {
    console.log("Great")
    if (key === ' ' && topic_stream.value.trim()){
        quiz.topic.add(topic_stream.value.trim().toLowerCase());
        topic_stream.value = "";
    }
    console.log(quiz);
}
</script>
<!-- name/difficulty/numberof questions/topics -->
<template>
    <div class="d-flex justify-content-center   ">
        <div class="w-50 h100 m-5 ">
            <form class="d-flex flex-column justify-content-evenly h-100 gap-2 mt-5 ">
                <input type="text" class="form-control border border-3 border-blue" id="title" placeholder="Quiz title" required v-model="quiz.title">
                <select class="form-select border border-3 border-blue" id="difficulty" v-model="quiz.difficulty" required>
                    <option value="" disabled selected>Select difficulty</option>
                    <option class="options" value="easy">Easy</option>
                    <option class="options" value="medium">Medium</option>
                    <option class="options" value="hard">Hard</option>
                </select>
                <div class="d-flex gap-2 p-2 flex-wrap ps-4">
                        <TopicItem   v-for="(topic, index) in Array.from(quiz.topic)"
                                :key="index"
                                :topic="topic" />
                        <input type="text" class="form-control rounded-pill border border-3 border-blue  "
                            placeholder="Add topics, Space will create a new topic" v-model="topic_stream"
                            @keydown=" (event) => check_input(event.key)">
                    </div>
            <button type="submit" class="btn btn-primary mt-3  mx-auto fw-bold fs-5 border border-5 border-blue rounded-pill " style="background-color:#1d3c45 ; color:#fff1e1 ;width: 180px;">Add questions</button>
                
            </form>
        </div>
    </div>
   


    
</template>
<style scoped>

.form-select, input {
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

input::placeholder{
    color: #1d3c45;
  font-weight: bold;
  font-size: 18px;
}


</style>
