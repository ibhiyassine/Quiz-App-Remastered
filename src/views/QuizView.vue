<script setup>
import Navside from '@/components/NavSide.vue';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { get_date_string } from '@/composables/dateString';
import { getquizzes } from '@/composables/getQuiz';
const router = useRouter();

// test
let q = ref([]);

const searchQuery = ref('');
const selectedDifficulty = ref('');
const selectedTopic = ref('');
const sortAscending = ref(false);
const loading = ref(true);

const topics = computed(() => {
  let topics = new Set();
  q.value.forEach((quiz) => {
    quiz.topics.forEach(topic => topics.add(topic));
  })
  return [...topics];
});

const filteredQuizzes = computed(() => {
  let filtered = [...q.value];

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(quiz =>
      quiz.name.toLowerCase().includes(query) ||
      quiz.topics.includes(query)
    );
  }

  // Apply difficulty filter
  if (selectedDifficulty.value) {
    filtered = filtered.filter(quiz =>
      quiz.difficulty === parseInt(selectedDifficulty.value)
    );
  }

  // Apply topic filter
  if (selectedTopic.value) {
    filtered = filtered.filter(quiz =>
      quiz.topics.includes(selectedTopic.value)
    );
  }

  // Apply sorting
  filtered.sort((a, b) => {
    return sortAscending.value
      ? a.createdAt - b.createdAt
      : b.createdAt - a.createdAt;
  });

  return filtered;
});

const navigateToQuiz = (quizId) => {
  router.push(`/quiz/${quizId}`);
};

const toggleSortOrder = () => {
  sortAscending.value = !sortAscending.value;
};

const formatDate = (date) => {
  return get_date_string(date) //TODO
};

onMounted(async () => {
  loading.value = true;
  console.log("On mounted");
  const { quizzes, fetchQuizzes } = getquizzes();
  await fetchQuizzes();
  q.value = quizzes.value;
  setTimeout(() => loading.value = false, 1000);})
</script>


<template>
  <!-- Loading and Error States -->
  <div v-if="loading" class="text-center p-5">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <p class="mt-3 fs-5">Loading quizzes...</p>
  </div>
  <Navside v-else>
    <div class="quiz-view">
      <!-- Search and Filter Section -->
      <div class="search-filter-section">
        <h1 class="page-title">Quiz Library</h1>
        <div class="search-bar">
          <i class="material-icons search-icon">search</i>
          <input type="text" v-model="searchQuery" placeholder="Search for quizzes..." @input="filterQuizzes">
        </div>

        <div class="filters">
          <div class="filter-group">
            <label>Difficulty</label>
            <select v-model="selectedDifficulty" @change="filterQuizzes" class="p-2">
              <option value="">All Levels</option>
              <option value="1">Easy</option>
              <option value="2">Medium</option>
              <option value="3">Hard</option>
            </select>
          </div>

          <div class="filter-group">
            <label>Topic</label>
            <select v-model="selectedTopic" @change="filterQuizzes" class="p-2">
              <option value="">All Topics</option>
              <option v-for="topic in topics" :key="topic" :value="topic">
                {{ topic }}
              </option>
            </select>
          </div>

          <button class="sort-btn p-2 border border-1 border-blue" @click="toggleSortOrder">
            <i class="material-icons">{{ sortAscending ? 'arrow_upward' : 'arrow_downward' }}</i>
            Sort by Date
          </button>
        </div>
      </div>

      <!-- All Quizzes Section -->
      <section class="quiz-section">
        <div class="section-header">
          <h2>Available Quizzes</h2>
          <div class="section-line"></div>
        </div>
        <div class="quiz-grid">
          <RouterLink :to="`/quiz/${quiz.id}`" v-for="quiz in filteredQuizzes" :key="quiz.id"
            class="quiz-card justify-content-between" @click="navigateToQuiz(quiz.id)">
            <div class="quiz-info">
              <div class="quiz-name" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                {{ quiz.name }}
              </div>
              <div class="difficulty-badge">
                {{ '★'.repeat(quiz.difficulty) }}
              </div>
              <div class="d-flex flex-wrap gap-2">
                <span class="quiz-topic" v-for="topic of quiz.topics">{{ topic }}</span>
              </div>
            </div>
            <div class="card-footer">
              <span class="quiz-date">
                <i class="material-icons">event</i>
                {{ formatDate(quiz.createdAt) }}
              </span>
            </div>
          </RouterLink>
        </div>
      </section>
    </div>
  </Navside>
</template>

<style scoped>
a {
  text-decoration: none;
}

.border-blue {
  border-color: var(--secondary-color) !important;
}

.quiz-view {
  min-height: 100vh;
  padding: 2rem 4rem;
  background-color: #fff1e1;
  color: #454f57;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #454f57;
}

.search-filter-section {
  margin-bottom: 3rem;
}

.search-bar {
  position: relative;
  margin-bottom: 1.5rem;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #d47440;
}

.search-bar input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #d47440;
  border-radius: 12px;
  background-color: white;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.search-bar input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(212, 116, 64, 0.2);
}

.filters {
  display: flex;
  gap: 1.5rem;
  align-items: flex-end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #454f57;
}

.filters select {
  padding: 0.75rem 1.5rem;
  border: 2px solid #d47440;
  border-radius: 8px;
  background-color: white;
  color: #454f57;
  cursor: pointer;
  font-size: 1rem;
  min-width: 150px;
  transition: all 0.3s ease;
}

.filters select:hover {
  border-color: #c26636;
}

.sort-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #d47440;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.sort-btn:hover {
  background-color: #c26636;
  transform: translateY(-2px);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 1.8rem;
  font-weight: 600;
  color: #454f57;
  white-space: nowrap;
}

.section-line {
  height: 2px;
  background-color: #d47440;
  flex-grow: 1;
  opacity: 0.3;
}

.quiz-section {
  margin-bottom: 4rem;
}

.quiz-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.quiz-card {
  background-color: white;
  padding: 1.5rem;
  border-radius: 16px;
  color: #454f57;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.3s ease;
  border: 2px solid #d47440;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  width: 22rem;
}

.quiz-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(212, 116, 64, 0.1);
}

.difficulty-badge {
  color: #d47440;
  font-size: 1.2rem;
}

.quiz-info {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  gap: 0.75rem;
}

.quiz-name {
  font-weight: bold;
  font-size: 1.1rem;
  color: #454f57;
}

.quiz-topic {
  display: inline;
  padding: 0.4rem 1rem;
  background-color: rgba(212, 116, 64, 0.1);
  color: #d47440;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid rgba(212, 116, 64, 0.2);
}

.quiz-date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;
}

.quiz-date i {
  font-size: 1.1rem;
  color: #d47440;
}

@media (max-width: 768px) {
  .quiz-view {
    padding: 1rem;
  }

  .filters {
    flex-direction: column;
    gap: 1rem;
  }

  .filter-group,
  .sort-btn {
    width: 100%;
  }
}
</style>