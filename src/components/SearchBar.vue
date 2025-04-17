<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { getusers } from '@/composables/getUsers';
import { getquizzes } from '@/composables/getQuiz';
import SearchSuggestionItem from './SearchSuggestionItem.vue';

const props=defineProps({
  username: {
    type: String,
    default: 'ibhi'
  }
});

const search=ref("");
const suggestionsRef = ref(null);
const inputref = ref(null);
const cliick = ref(false);

const { users, fetchUsers } = getusers();
onMounted(async () => {
  await fetchUsers().then(()=>{
    console.log("users:", users.value[0].username);
  })
});

const {quizzes, fetchQuizzes} = getquizzes();
onMounted(async () => {
  await fetchQuizzes().then(()=>{
    console.log("quizzes:", quizzes.value);
  })
});

const filteredUsers = computed(() => {
  return users.value.filter(user => user.username.includes(search.value));
});

const matchedQuizzes = computed(() => {
  return quizzes.value.filter(quiz => quiz.name.includes(search.value));
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

const handleClickOutside = (event) => {
  if (suggestionsRef.value && !suggestionsRef.value.contains(event.target) && !inputref.value.contains(event.target)) {
    cliick.value = false;

  }
};
const handleBlur = () => {
  setTimeout(() => {
    cliick.value = false;
  }, 200);
};
</script>

<template>
  <div class="mx-3 rounded-1 bg-white z-1 search-bar-container" style="width: 40%;">
    
    <div class="position-relative">
  <span class="material-icons position-absolute top-50 start-0 translate-middle-y ps-2 text-muted" style="color: black;">search</span>
  <input class="form-control ps-5 rounded border-0" type="text" placeholder="Search Quizzy" style="height: 50px;" v-model="search"
  ref="inputref" @focus="cliick = true" @blur="handleBlur" @input="cliick = search_field.trim().length > 0" />
</div>

  <div v-show="search.trim().length > 0 && cliick" :ref="suggestionsRef"
      class="shadow-lg rounded mt-2 p-2 suggestion-item">
      
      <div v-if="filteredUsers.length">
        <h6 class="text-muted px-2 ">Users</h6>
        <SearchSuggestionItem v-for="(user, index) in filteredUsers" :key="index" :value="user.username" type="User" />
      </div>

      <div v-if="matchedQuizzes.length">
        <h6 class="text-muted px-2 ">Quizzes</h6>
        <SearchSuggestionItem v-for="(quiz, index) in matchedQuizzes" :key="index" :value="quiz.name" type="Quiz" />
      </div>

    </div>
    </div>
  
  
</template>

<style scoped>
.search-bar-container {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;

}

input[type="text"] {
  background-color: rgb(229, 219, 219);
}

input[type="text"]:focus {
  
  background-color: white;
  color: black;
  font-weight: 500;
  border: 2px solid #1d3c45; 
  outline: none;
  box-shadow: 0 0 0 0.25rem #1d3c45; 

}


</style>