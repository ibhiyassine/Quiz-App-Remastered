<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToLogin = () => {
  router.push('/login');
};

const navigateToRegister = () => {
  router.push('/register');
};
</script>

<template>
  <div class="landing-page">
    <nav class="navbar">
      <div class="navbar-brand">
        <img src="/src/assets/logo2.png" alt="Quizzy Logo" class="logo" />
      </div>
      <div class="navbar-links">
        <button @click="navigateToLogin" class="btn">
          <i class="bi bi-box-arrow-in-right"></i> Login
        </button>
        <button @click="navigateToRegister" class="btn btn-primary">
          <i class="bi bi-person-plus"></i> Register
        </button>
      </div>
    </nav>

    <header class="hero-section">
      <h1 class="hero-title">Welcome to Quizzy</h1>
      <p class="hero-subtitle">The ultimate platform to test your knowledge and learn new things!</p>
      <button @click="navigateToRegister" class="btn get-started">
        <i class="bi bi-arrow-right-circle"></i> Get Started
      </button>
    </header>

    <section class="features">
      <div class="feature">
        <h2>Engaging Quizzes</h2>
        <p>Challenge yourself with a variety of quizzes across multiple topics.</p>
      </div>
      <div class="feature">
        <h2>Track Your Progress</h2>
        <p>Monitor your performance and improve over time.</p>
      </div>
      <div class="feature">
        <h2>Compete with Friends</h2>
        <p>See how you rank against others on the leaderboard.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>

.landing-page {
  color: var(--secondary-color);
  background-color: var(--tertiary-color);
  text-align: center;
  padding: 0;
  margin: 0;
  border: 4px solid var(--secondary-color);
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--tertiary-color);
  color: var(--secondary-color);
  border-bottom: 4px solid var(--secondary-color);
}

.navbar-brand .logo {
  height: 50px;
}

.navbar-links {
  display: flex;
  gap: 1rem;
}

.navbar-links .btn {
  padding: 0.5rem 1rem;
  border: 4px solid var(--secondary-color);
  background: none;
  cursor: pointer;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: bold;
}

.navbar-links .btn-primary {
  background-color: var(--primary-color);
  color: var(--tertiary-color);
}

.hero-section {
    height: 100%;
  padding: 4rem 2rem;
  background-color: var(--primary-color);
  color: var(--tertiary-color);
  border-bottom: 4px solid var(--secondary-color);
}

.hero-title {
  font-size: 4rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  font-weight: bold;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.get-started {
  background-color: var(--tertiary-color);
  color: var(--secondary-color);
  font-weight: bold;
  border: 4px solid var(--secondary-color);
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  font-size: 1rem;
  cursor: pointer;
}

.get-started:hover {
  background-color: var(--secondary-color);
  color: var(--tertiary-color);
}

.features {
  display: flex;
  justify-content: space-around;
  padding: 2rem;
  border-top: 4px solid var(--secondary-color);
}

.feature {
  max-width: 300px;
  text-align: left;
  border: 4px solid var(--secondary-color);
  padding: 1rem;
  background-color: var(--tertiary-color);
}

.feature h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  font-weight: bold;
}

.feature p {
  font-size: 1rem;
  color: var(--secondary-color);
}
</style>