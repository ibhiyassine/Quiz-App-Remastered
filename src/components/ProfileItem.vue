<script setup>
import NavSide from '@/components/NavSide.vue';
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getUserquizzes } from "@/composables/getUserquizzes"; // Fixed case sensitivity
import ComapctQuizCard from '@/components/ComapctQuizCard.vue';
import LeaderBoard from '@/components/LeaderBoard.vue';
import { getUserLatest } from '@/composables/getUserLatest';
import { getGlobalScores } from '@/composables/getGlobalScores';
import { authStateListener } from '@/composables/authStateListener';
import { auth, db } from '@/firebase';
import { getDoc, doc } from 'firebase/firestore';

const router = useRouter();
const route = useRoute();

let users = ref([]);
let userScore = ref([]);
let userRank = ref([]);
const loading = ref(true);

let userLatest = ref([]);
let user = ref('');
let isNotAdmin = ref(true);
async function defineUser(u) {
  user.value = u.displayName;
  console.log("comparing user and username", user.value == username.value);
}

// Define username as reactive reference from route params
const username = ref(route.params.username);

// Function to load all profile data
async function loadProfileData() {
  // Load global scores
  let out = await getGlobalScores(username.value);
  users.value = out.users;
  userScore.value = out.userScore;
  userRank.value = out.userRank;

  // Load user's latest quizzes
  userLatest.value = await getUserLatest(username.value);

  // Load user's taken quizzes
  result.value = await getUserquizzes(username.value);
  console.log("User quizzes loaded", result.value);
}

onMounted(async () => {
  loading.value = true;
  await loadProfileData();
  await defineUser(auth.currentUser);
  const userRef = doc(db, "users", user.value);
  isNotAdmin.value = !((await getDoc(userRef)).get("isAdmin"));
  console.log("being admin", isNotAdmin.value);
  setTimeout(() => loading.value = false, 1000);
})

// Watch for route params changes to reload data when navigating between profiles
watch(() => route.params.username, async (newUsername) => {
  if (newUsername) {
    username.value = newUsername;
    await loadProfileData();
  }
}, { immediate: true });

const result = ref([]);
</script>

<template>
  <!-- Loading and Error States -->
  <div v-if="loading" class="text-center p-5">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <p class="mt-3 fs-5">Loading profile to take a look 🐨...</p>
  </div>
  <NavSide v-else :username="username" :inprofile="username == user" :notadmin="isNotAdmin">
    <div v-if="result.length != 0" class="p-1">
      <div class="fs-4 text-blue fw-bold fst-italic text-decoration-underline">
        {{ (username == user) ? 'Your taken quizzes' : `${username}'s taken quizzes` }}
      </div>
      <div v-if="result" class="d-flex flex-wrap gap-2" style="max-height: 500px; overflow-y: scroll !important; scrollbar-width: none;">
        <ComapctQuizCard v-for="(quiz, index) in result" :key="index" v-bind="quiz" />
      </div>
    </div>
    <div v-else class="fs-4 text-blue fw-bold text-danger text-decoration-underline">
      No quizzes were taken by this user.
    </div>
    <div>
      <div class="fs-4 text-blue fw-bold fst-italic text-decoration-underline">
        Wanna know what the others are up to?
      </div>
      <div>
        <LeaderBoard class="mb-3" :users="users" :userRank="userRank" :userScore="userScore" />
      </div>
    </div>

  </NavSide>
</template>