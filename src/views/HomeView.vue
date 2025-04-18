<script setup>
import { onMounted, ref } from 'vue'
import { getGlobalScores } from '@/composables/getGlobalScores'
import { getUserLatest } from '@/composables/getUserLatest'
import { useRoute } from 'vue-router'
import ComapctQuizCard from '@/components/ComapctQuizCard.vue'
import QuizCarousel from '@/components/QuizCarousel.vue'
import LeaderBoard from '@/components/LeaderBoard.vue';
import NavSide from '@/components/NavSide.vue'

const route = useRoute();

const barvisible = ref(true)
let users = ref([]);
let userScore = ref([]);
let userRank = ref([]);

let userLatest = ref([]);

function toggleSidebar() {
  barvisible.value = !barvisible.value
}

onMounted(async () => {
  let out = await getGlobalScores(route.params.username);
  users.value = out.users;
  userScore.value = out.userScore;
  userRank.value = out.userRank;
  userLatest.value = await getUserLatest(route.params.username);
  console.log("userLatest", userLatest.value);
})
</script>

<template>
  <div>
    <NavSide>
      <div class="p-1">
        <div class="fs-2 page-title fw-bold">
          Your recently taken quizzes
        </div>
        <div v-if="userLatest.length == 0">
          <div class="fs-2 text-blue fw-bold">
            Do some quizzes!!!
          </div>
        </div>
        <div v-else class="d-flex flex-wrap gap-2">
          <ComapctQuizCard v-for="(quiz, index) in userLatest" :key="index" v-bind="quiz"/>
        </div>
      </div>
      <div>
        <div class="fs-2 page-title fw-bold">
          Latest Quizzes
        </div>
        <div>
          <QuizCarousel />
        </div>
      </div>
      <div>
        <div class="fs-2 page-title fw-bold">
          Wanna know what the others are up to?
        </div>
        <div>
          <LeaderBoard class="mb-3" :users="users" :userRank="userRank" :userScore="userScore"/>
        </div>
      </div>
    </NavSide>
  </div>
</template>

<style scoped>

.border-blue {
  border-color: var(--secondary-color) !important;
}
.text-blue {
  color: var(--secondary-color);
}
.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #454f57;
}
</style>
