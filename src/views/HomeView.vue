<script setup>
import { onBeforeMount, onMounted, ref, watch } from 'vue'
import { getGlobalScores } from '@/composables/getGlobalScores'
import { getUserLatest } from '@/composables/getUserLatest'
import { useRoute, useRouter } from 'vue-router'
import ComapctQuizCard from '@/components/ComapctQuizCard.vue'
import QuizCarousel from '@/components/QuizCarousel.vue'
import NavSide from '@/components/NavSide.vue'
import { authStateListener } from '@/composables/authStateListener'

const route = useRoute();
const router = useRouter();

let userLatest = ref([]);

let user = ref('');
const loading = ref(true);

let checkRoute = async (u) => {
  console.log(u, "u")
  user.value = u.displayName;
};

onMounted(async () => {
  loading.value = true;
  await authStateListener(checkRoute);
  setTimeout(() => loading.value = false, 1000);
})
watch(user, async () => {
  userLatest.value = await getUserLatest(user.value);
  console.log("got userlatest", userLatest.value);
});
</script>

<template>
  <!-- Loading and Error States -->
  <div v-if="loading" class="text-center p-5">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <p class="mt-3 fs-5">Loading Home Page...</p>
  </div>
  <NavSide v-else :inprofile="false" :username="user">
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
        <ComapctQuizCard v-for="(quiz, index) in userLatest" :key="index" v-bind="quiz" />
      </div>
    </div>
    <div>
      <div class="d-flex justify-content-between align-items-center">
        <div class="fs-2 page-title fw-bold">
          Latest Quizzes
        </div>
        <div>
          <RouterLink to="/quiz" class="fs-6 fw-bold page-link">Show all quizzes</RouterLink>
        </div>
      </div>
      <div>
        <QuizCarousel />
      </div>
    </div>

  </NavSide>
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

.page-link {
  color: #454f57;
  background-color: transparent;
  border: none;
  transition: all ease 0.5s;
}

.page-link:hover {
  text-decoration: underline;
  transform: scale(1.05);
}
</style>
