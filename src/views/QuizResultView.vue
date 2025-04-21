<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { getQuizID } from '@/composables/getQuizID';
import { getUserInfo } from '@/composables/getUserInfo';
import { get_date_string } from '@/composables/dateString';
import Navside from '@/components/NavSide.vue';
import TopicTag from '@/components/TopicTag.vue';
import { authStateListener } from '@/composables/authStateListener';

const route = useRoute();

// State variables
let quiz = ref({
  id: '',
  name: '',
  difficulty: 0,
  createdAt: null,
  NumberOfQuestions: 0,
  questions: [],
  takenBy: [],
  topics: [],
});

let user = ref('');
let userAnswers = ref([]);
let userQuiz = ref(null);
let userScore = ref(0);
let userScorePercentage = ref(0);
let quizTakenTime = ref(null);
let currentQuestion = ref(1);
let loading = ref(true);
let errorMessage = ref('');

// Handle auth state to get current user
function setUser(u) {
  if (u !== null) {
    user.value = u.displayName;
  }
}

// Format date
let date_string = computed(() => get_date_string(quiz.value.createdAt));
let taken_date_string = computed(() => quizTakenTime.value ? get_date_string(quizTakenTime.value) : 'Unknown');

// Get the correct answer for a question (index 0 is always the correct one in this app)
function getCorrectAnswer(questionIndex) {
  try {
    if (quiz.value.questions && quiz.value.questions[questionIndex]) {
      return quiz.value.questions[questionIndex].answers[0];
    }
    return 'No answer available';
  } catch (e) {
    console.error("Error getting correct answer:", e);
    return 'Error loading answer';
  }
}

// Get user's answer for a question
function getUserAnswer(questionIndex) {
  try {
    if (!userAnswers.value || userAnswers.value.length === 0) {
      return 'No answer available';
    }
    
    const userChoice = userAnswers.value[questionIndex];
    if (userChoice === undefined || userChoice === null || userChoice === -1) {
      return 'Not answered';
    }
    
    if (!quiz.value.questions[questionIndex] || !quiz.value.questions[questionIndex].answers) {
      return 'Answer data missing';
    }
    
    return quiz.value.questions[questionIndex].answers[userChoice];
  } catch (e) {
    console.error("Error getting user answer:", e, "for question index:", questionIndex);
    return 'Error loading answer';
  }
}

// Check if user's answer is correct
function isCorrectAnswer(questionIndex) {
  if (!userAnswers.value || userAnswers.value.length <= questionIndex) {
    return false;
  }
  return userAnswers.value[questionIndex] === 0; // 0 is the correct answer index
}

// Load quiz data and user's answers
onMounted(async () => {
  document.body.style.overflow = "scroll";
  loading.value = true;
  errorMessage.value = '';
  try {
    await authStateListener(setUser);
    
    // Get quiz data
    const quizId = route.params.id;
    console.log("Loading quiz with ID:", quizId);
    quiz.value = await getQuizID(quizId);
    console.log("Quiz loaded:", quiz.value);
    
    // Get user answers from their profile
    if (user.value) {
      console.log("Getting user info for:", user.value);
      const userInfo = await getUserInfo(user.value);
      console.log("User info loaded:", userInfo);
      
      if (userInfo && userInfo.quizzes) {
        userQuiz.value = userInfo.quizzes.find(q => q.name && q.name.id === quizId);
        console.log("User quiz attempt found:", userQuiz.value);
        
        if (userQuiz.value) {
          userAnswers.value = userQuiz.value.answers || [];
          console.log("User answers:", userAnswers.value);
          userScore.value = userQuiz.value.score || 0;
          userScorePercentage.value = Math.round((userScore.value / quiz.value.NumberOfQuestions) * 100);
          quizTakenTime.value = userQuiz.value.lastTakenAt;
        } else {
          errorMessage.value = "You haven't taken this quiz yet.";
        }
      } else {
        errorMessage.value = "Couldn't find your quiz attempts.";
      }
    } else {
      errorMessage.value = "User not authenticated.";
    }
  } catch (error) {
    console.error("Error in QuizResultView:", error);
    errorMessage.value = "Failed to load quiz results. " + error.message;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <Navside>
    <div class="quiz-view">
      <!-- Quiz Result Header -->
      <div class="section-header mb-4">
        <h1 class="page-title">Quiz Results</h1>
        <div class="section-line"></div>
      </div>

      <!-- Loading and Error States -->
      <div v-if="loading" class="text-center p-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 fs-5">Loading quiz results...</p>
      </div>

      <div v-else-if="errorMessage" class="alert alert-warning p-4 fs-5">
        {{ errorMessage }}
      </div>

      <div v-else>
        <!-- Quiz Summary Card -->
        <div class="bg-white p-4 rounded-3 mb-4 border border-4 border-blue">
          <div class="d-flex justify-content-between">
            <div>
              <RouterLink :to="`/quiz/${quiz.id}`" class="text-blue text-decoration-underline"><h2 class="fs-2 fw-bold">{{ quiz.name }}</h2></RouterLink>
              <div class="d-flex flex-wrap gap-1 mb-3">
                <TopicTag v-for="(topic, index) in quiz.topics" :key="index" :topic="topic" />
              </div>
              <div class="fs-5 fw-bold">
                <span class="text-blue">Score: </span>
                <span :class="userScorePercentage >= 70 ? 'text-success' : userScorePercentage >= 40 ? 'text-warning' : 'text-danger'">
                  {{ userScore }}/{{ quiz.NumberOfQuestions }} ({{ userScorePercentage }}%)
                </span>
              </div>
            </div>
            <div class="text-end">
              <div class="difficulty mb-2">
                <span class="material-icons fs-3 text-orange" v-for="i in quiz.difficulty" :key="i">star</span>
              </div>
              <div class="fs-6 text-muted">
                <div><span class="material-icons me-1 align-middle">event</span> Created: {{ date_string }}</div>
                <div><span class="material-icons me-1 align-middle">history</span> Taken: {{ taken_date_string }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Questions and Answers Section -->
        <div v-if="quiz.questions && quiz.questions.length > 0 && userAnswers && userAnswers.length > 0" 
             class="border border-5 border-blue rounded d-flex bg-white mb-3" 
             style="min-height: 600px;">
          <!-- Question Navigation Sidebar -->
          <div class="border-end border-5 border-blue overflow-y-scroll" style="min-width: 200px; scrollbar-width: none;">
            <div class="fs-4 fw-bold text-blue border-bottom border-blue p-3 border-5 sticky-top bg-white">
              Questions
            </div>
            <div v-for="i in quiz.NumberOfQuestions" :key="i"
                :class="{ 
                  'text-decoration-underline text-orange': i === currentQuestion, 
                  'bg-success text-white': isCorrectAnswer(i-1), 
                  'bg-danger text-white': !isCorrectAnswer(i-1) && userAnswers[i-1] !== -1 && userAnswers[i-1] !== undefined 
                }"
                class="fs-6 fw-bold border-bottom border-blue p-3 text-center question-index"
                @click="currentQuestion = i">
              Question {{ i }}
            </div>
          </div>

          <!-- Question and Answer Display -->
          <div class="p-4 flex-grow-1">
            <div class="text-center border rounded border-3 border-blue p-3 fs-5 fw-bold baground-orange mb-4">
              {{ quiz.questions[currentQuestion-1] ? quiz.questions[currentQuestion-1].question : 'Question not found' }}
            </div>

            <div class="answer-comparison mb-3">
              <h3 class="fs-5 mb-3">Answer Comparison:</h3>
              
              <!-- Correct Answer -->
              <div class="p-3 border border-3 border-success rounded-pill fw-bold mb-3 d-flex align-items-center">
                <span class="material-icons me-2 text-success">check_circle</span>
                <div>
                  <small class="d-block text-muted">Correct Answer:</small>
                  {{ getCorrectAnswer(currentQuestion-1) }}
                </div>
              </div>
              
              <!-- User Answer -->
              <div class="p-3 border border-3 rounded-pill fw-bold d-flex align-items-center"
                  :class="isCorrectAnswer(currentQuestion-1) ? 'border-success' : 'border-danger'">
                <span class="material-icons me-2" :class="isCorrectAnswer(currentQuestion-1) ? 'text-success' : 'text-danger'">
                  {{ isCorrectAnswer(currentQuestion-1) ? 'check_circle' : 'cancel' }}
                </span>
                <div>
                  <small class="d-block text-muted">Your Answer:</small>
                  {{ getUserAnswer(currentQuestion-1) }}
                </div>
              </div>
            </div>
            
            <!-- Navigation Buttons -->
            <div class="d-flex justify-content-around mt-5">
              <button class="btn button rounded-pill border border-blue border-3 px-4 py-2 fw-bold"
                    @click="currentQuestion = (currentQuestion === 1) ? 1 : (currentQuestion - 1)">
                Previous
              </button>
              <button class="btn button rounded-pill border border-blue border-3 px-4 py-2 fw-bold"
                    @click="currentQuestion = (currentQuestion === quiz.NumberOfQuestions) ? quiz.NumberOfQuestions : (currentQuestion + 1)">
                Next
              </button>
            </div>
          </div>
        </div>
        
        <!-- No Questions/Answers Warning -->
        <div v-else class="alert alert-info p-4">
          <h3 class="fs-4 mb-3">No Questions or Answers Available</h3>
          <p class="fs-5">
            We couldn't find the questions and answers for this quiz. This might happen if:
          </p>
          <ul class="fs-5">
            <li>You haven't taken this quiz yet</li>
            <li>There was a problem loading the quiz data</li>
            <li>The quiz structure has been modified since you took it</li>
          </ul>
        </div>
      </div>
    </div>
  </Navside>
</template>

<style scoped>
.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #454f57;
}

.border-blue {
  border-color: var(--secondary-color) !important;
}

.text-blue {
  color: var(--secondary-color) !important;
}

.text-orange {
  color: var(--primary-color) !important;
}

/* Custom pastel colors for success and danger - darker versions */
.text-success {
  color: #93ab76 !important; /* Darker olive oil pastel */
}

.text-danger {
  color: #ff87a7 !important; /* Darker pastel pink */
}

.border-success {
  border-color: #93ab76 !important; /* Darker olive oil pastel */
}

.border-danger {
  border-color: #ff87a7 !important; /* Darker pastel pink */
}

.bg-success {
  background-color: #b5c696 !important; /* Darker lighter olive pastel */
}

.bg-danger {
  background-color: #ffadc5 !important; /* Darker lighter pastel pink */
}

/* Override bootstrap's warning color */
.alert-warning {
  background-color: #ffe8b3 !important; /* Darker */
  border-color: #ffd980 !important; /* Darker */
}

/* Override bootstrap's info color */
.alert-info {
  background-color: #b8e0e7 !important; /* Darker */
  border-color: #a2d9e3 !important; /* Darker */
}

.baground-orange {
  background-color: var(--tertiary-color) !important;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.section-line {
  height: 2px;
  background-color: #d47440;
  flex-grow: 1;
  opacity: 0.3;
}

.quiz-view {
  min-height: 100vh;
  padding: 2rem 4rem;
  background-color: #fff1e1;
  color: #454f57;
}

.question-index {
  cursor: pointer;
  transition: all 0.2s ease;
}

.question-index:hover {
  transform: scale(1.05);
  color: var(--primary-color) !important;
}

.button {
  background-color: var(--secondary-color);
  color: var(--primary-color);
}

.button:hover {
  cursor: pointer;
  transform: scale(1.05);
  background-color: var(--primary-color);
  color: var(--secondary-color);
}
</style>