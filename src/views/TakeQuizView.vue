<script setup>
import { onMounted, ref, computed, nextTick, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getQuizID } from '@/composables/getQuizID';
import { get_date_string } from '@/composables/dateString';
import { Timestamp } from 'firebase/firestore';
import { submitAnswer } from '@/composables/submitAnswers';
import Navside from '@/components/NavSide.vue';
import LeaderBoard from '@/components/LeaderBoard.vue';
import QuizQuestions from '@/components/QuizQuestions.vue';
import TopicTag from '@/components/TopicTag.vue';
import { authStateListener } from '@/composables/authStateListener';

const route = useRoute();
const router = useRouter();

let quiz = ref({
  name: '',
  difficulty: 0,
  createdAt: Timestamp.fromDate(new Date(Date.now())),
  NumberOfQuestions: 1,
  questions: [],
  takenBy: [],
  topics: [],
});
let counter = ref(0);
let showLeaderboard = ref(false);
let leaderboardDisplay = ref('0px');
let isButtonDisabled = ref(false);
let takingQuiz = ref(false);
let end = ref(false);
let findRankScore = ref({});

let user = ref("");
function setUser(u) {
  if (u !== null) {
    user.value = u.displayName;
  }
}

function endQuiz(){
  end.value = true;
  nextTick(() => {
    const quizModal = document.getElementById("quiz-modal");
    if (quizModal) {
      quizModal.scrollIntoView({ behavior: "smooth", block: "start" });
      document.body.style.overflow = "hidden"; // Disable scrolling
    }
  });
}

function disableButton() {
  if (!isButtonDisabled.value) {
    takingQuiz.value = true;
    isButtonDisabled.value = true;
    nextTick(() => {
      const quizTableElement = document.getElementById("quiz-table");
      if (quizTableElement) {
        quizTableElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
    const interval = setInterval(() => {
      if (counter.value > 0) {
        counter.value--;
      } else {
        clearInterval(interval);
        endQuiz();
      }
    }, 1000);
  }
}

let date_string = computed(() => get_date_string(quiz.value.createdAt));

function toggleShow() {
  if (leaderboardDisplay.value == '0px') {
    leaderboardDisplay.value = '550px';
  }
  else {
    leaderboardDisplay.value = '0px';
  }
}

async function submitAnswers(answers) {
  endQuiz();
  await submitAnswer(answers, route.params.id);
}

function gotoResults() {
  router.push(route.path + '/result');
}

onMounted(async () => {
  await authStateListener(setUser);
  quiz.value = await getQuizID(route.params.id);
  console.log("taking quiz", quiz.value);
  counter.value = 10 * quiz.value.NumberOfQuestions;
  if (quiz.value.takenBy.length > 0) {
    for (let u = 0; u < quiz.value.takenBy.length; u++) {
      if (user.value === quiz.value.takenBy[u].name) {
        findRankScore.value = {
          userRank: u + 1,
          userScore: quiz.value.takenBy[u].score,
        };
      }
    }
  }
  else {
    findRankScore.value = {};
  }
  console.log("findRankScore", findRankScore.value, quiz.value.takenBy);
});


</script>

<template>
  <Navside>
    <div v-if="end" class="quiz-modal-blur" id="quiz-modal">
      <div class="quiz-modal-content">
        <h2 class="mb-4">The quiz has ended</h2>
        <button class="btn btn-primary btn-bg btn-lg fw-bold border-4" @click="gotoResults()">Show Answers</button>
      </div>
    </div>
    <div id="leaderboard">
      <!--Leaderboard title-->
      <div id="lead-title" class="d-flex justify-content-between align-items-center">
        <div class="page-title">
          Quiz leaderboard
        </div>
        <div class="page-title fs-6" id="show" @click="toggleShow()">
          {{ showLeaderboard ? 'hide' : 'show' }}
        </div>
      </div>
      <!-- Leaderboard -->
      <div :style="`max-height: ${leaderboardDisplay};`" class="show-leaderboard">
        <LeaderBoard :quiz="quiz.name" :users="quiz.takenBy" v-bind="findRankScore" />
      </div>
    </div>
    <div class="section-line"></div>
    <!--Card overview-->
    <div id="card-content" class="d-flex flex-column">
      <div class="page-title">
        Quiz Overview
      </div>
      <div style="width: 50rem; height: 24rem;" class="cardx template d-flex flex-column align-self-center mb-3">
        <div class="d-flex justify-content-between align-items-center">
          <div class="fs-2 fw-bold">{{ quiz.name }}</div>
          <div>
            <span v-for="i in quiz.difficulty" :key="i" class="material-icons fs-2">star</span>
          </div>
        </div>
        <div class="d-flex flex-wrap gap-1">
          <TopicTag v-for="(topic, index) in quiz.topics" :key="index" :topic="topic" />
        </div>
        <button
          class=" fs-4 fw-bold align-self-center my-auto border rounded-pill p-2 border-3 border-blue baground-orange"
          id="take-quiz" :class="{ 'active': !isButtonDisabled }" :disabled="isButtonDisabled" @click="disableButton()">
          {{ (!isButtonDisabled) ? 'Take quiz' : 'scroll down!' }}
        </button>
        <div class="mt-auto d-flex justify-content-between">
          <div class="fw-bold fs-4">{{ quiz.NumberOfQuestions }} questions</div>
          <div class="fw-bold fs-4">created at : {{ date_string }}</div>
        </div>
      </div>
    </div>
    <!--Quiz table-->
    <div class="section-line"></div>
    <div class="d-flex flex-column">
      <div class="align-self-start p-2 counter" v-show="takingQuiz && !end">
        {{ counter }}
      </div>
      <div id="quiz-table" class="align-self-center" v-show="takingQuiz && !end">
        <QuizQuestions :questions="quiz.questions" :-number-of-questions="quiz.NumberOfQuestions"
          @submit="(answers) => submitAnswers(answers)" />
      </div>
    </div>
  </Navside>
</template>

<style scoped>
button {
  color: var(--primary-color);
  text-decoration: none;
}
.border-blue {
    border-color: var(--secondary-color) !important;
}
.btn-bg {
  background-color: var(--secondary-color) !important;
  border-color: var(--primary-color);

  &:hover {
    box-shadow: 0 4px 8px var(--primary-color);
  }

  &:focus {
    box-shadow: 0 4px 8px var(--primary-color);
  }

  &:not(:hover):not(:focus) {
    box-shadow: none;
    box-shadow: 0 4px 8px var(--primary-color);
  }

  &:active {
    border-color: var(--primary-color);
  }
}

#take-quiz {
  transition: all ease 0.5s;
}

.active:hover {
  color: var(--secondary-color) !important;
  cursor: pointer;
  transform: scale(1.1);
  background-color: var(--tertiary-color);
}

.baground-orange {
  background-color: var(--secondary-color);
  color: var(--primary-color);
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #454f57;
}

#show {
  transition: all ease 0.5s;
}

#show:hover {
  font-size: 1.2rem !important;
  text-decoration: underline;
}

.show-leaderboard {
  overflow-y: hidden;
  transition: all ease 0.5s;
}

.section-line {
  height: 2px;
  background-color: #d47440;
  flex-grow: 1;
  opacity: 0.3;
}

.counter {
  font-weight: bold;
  font-size: 1.2rem;
  width: 50px;
  height: 50px;
  text-align: center;
  border-radius: 50%;
  background-color: var(--primary-color);
}

.quiz-modal-blur {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.01);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.quiz-modal-content {
  background: white;
  border: 4px solid var(--secondary-color);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  text-align: center;
}
</style>