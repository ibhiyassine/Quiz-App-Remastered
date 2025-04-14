<template>
    <div class="page-container">
      <div class="form-section">
        <div class="register-container">
          <div class="form-header">
            <h1 class="title">The best way to study.</h1>
            <h2 class="subtitle">Sign up for free.</h2>
          </div>
  
          <form @submit.prevent="handleSubmit" class="register-form">
            <div class="social-buttons">
              <button type="button" class="social-btn google-btn">
                <img src="@/assets/google-icon.svg" alt="Google" class="social-icon" />
                Continue with Google
              </button>
              <button type="button" class="social-btn facebook-btn">
                <img src="@/assets/facebook-icon.svg" alt="Facebook" class="social-icon" />
                Continue with Facebook
              </button>
            </div>
  
            <div class="divider">
              <span>or email</span>
            </div>
  
            <div class="birthday-section">
              <label>Birthday</label>
              <div class="birthday-inputs">
                <select v-model="month" required>
                  <option value="" disabled selected>Month</option>
                  <option v-for="m in months" :key="m" :value="m">{{ m }}</option>
                </select>
                <select v-model="day" required>
                  <option value="" disabled selected>Day</option>
                  <option v-for="d in 31" :key="d" :value="d">{{ d }}</option>
                </select>
                <select v-model="year" required>
                  <option value="" disabled selected>Year</option>
                  <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
                </select>
              </div>
            </div>
  
            <div class="form-group">
              <input
                type="text"
                v-model="username"
                placeholder="Username"
                required
              />
            </div>
  
            <div class="form-group">
              <input
                type="email"
                v-model="email"
                placeholder="Email"
                required
              />
            </div>
  
            <div class="form-group password-group">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                placeholder="Password"
                required
              />
              <button 
                type="button" 
                class="toggle-password"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? '🙈' : '👁️' }}
              </button>
            </div>
  
            <div class="terms-checkbox">
              <input
                type="checkbox"
                id="terms"
                v-model="acceptedTerms"
                required
              />
              <label for="terms">
                I accept Quizlet's 
                <a href="#" @click.prevent>Terms of Service</a> and
                <a href="#" @click.prevent>Privacy Policy</a>
              </label>
            </div>
  
            <button type="submit" class="submit-btn">
              Sign up
            </button>
  
            <p class="switch-mode">
              Already have an account? 
              <a href="#" @click.prevent="goToLogin">
                Log in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const email = ref('')
  const password = ref('')
  const username = ref('')
  const month = ref('')
  const day = ref('')
  const year = ref('')
  const showPassword = ref(false)
  const acceptedTerms = ref(false)
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)
  
  const handleSubmit = () => {
    console.log('Registration submitted:', {
      email: email.value,
      password: password.value,
      username: username.value,
      birthday: `${month.value} ${day.value}, ${year.value}`
    })
  }
  
  const goToLogin = () => {
    router.push('/login')
  }
  </script>
  
  <style scoped>
  .page-container {
    min-height: 100vh;
    width: 100%;
    position: relative;
    background-image: url('@/assets/bg.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  
  .form-section {
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    min-height: 100vh;
    background-color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }
  
  .register-container {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }
  
  .form-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .title {
    font-size: 2rem;
    color: #303545;
    margin-bottom: 0.5rem;
  }
  
  .subtitle {
    font-size: 1.5rem;
    color: #586380;
    font-weight: normal;
  }
  
  .register-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .social-buttons {
    display: flex;
    gap: 0.5rem;
  }
  
  .social-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    background: white;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.2s, border-color 0.2s;
  }
  
  .google-btn:hover {
    background-color: #f8f9fa;
    border-color: #dadce0;
  }
  
  .facebook-btn {
    background-color: #1877f2;
    border-color: #1877f2;
    color: white;
  }
  
  .facebook-btn:hover {
    background-color: #166fe5;
    border-color: #166fe5;
  }
  
  .social-icon {
    width: 20px;
    height: 20px;
    margin-right: 0.5rem;
  }
  
  .facebook-btn .social-icon {
    filter: brightness(0) invert(1);
  }
  
  .divider {
    text-align: center;
    position: relative;
    margin: 1rem 0;
  }
  
  .divider::before,
  .divider::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 45%;
    height: 1px;
    background-color: #e6e6e6;
  }
  
  .divider::before {
    left: 0;
  }
  
  .divider::after {
    right: 0;
  }
  
  .divider span {
    background: white;
    padding: 0 10px;
    color: #586380;
    font-size: 0.9rem;
  }
  
  .form-group {
    position: relative;
  }
  
  .form-group input,
  .birthday-inputs select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .birthday-section {
    margin-bottom: 1rem;
  }
  
  .birthday-section label {
    display: block;
    margin-bottom: 0.5rem;
    color: #586380;
  }
  
  .birthday-inputs {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 0.5rem;
  }
  
  .password-group {
    position: relative;
  }
  
  .toggle-password {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }
  
  .terms-checkbox {
    display: flex;
    gap: 0.5rem;
    align-items: flex-start;
    font-size: 0.9rem;
  }
  
  .terms-checkbox a {
    color: #4255ff;
    text-decoration: none;
  }
  
  .submit-btn {
    background-color: #4255ff;
    color: white;
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 0.5rem;
  }
  
  .submit-btn:hover {
    background-color: #3344cc;
  }
  
  .switch-mode {
    text-align: center;
    font-size: 0.9rem;
    color: #586380;
    margin-top: 1rem;
  }
  
  .switch-mode a {
    color: #4255ff;
    text-decoration: none;
    font-weight: 500;
  }
  
  input:focus,
  select:focus {
    outline: none;
    border-color: #4255ff;
  }
  </style>
  