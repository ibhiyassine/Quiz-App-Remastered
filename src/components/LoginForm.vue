<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { checkUsername, addUsername } from '@/composables/createNewUser'
import { loginUser } from '@/composables/UserLogin'

const router = useRouter()
const route = useRoute()
const auth = getAuth();

const isLogin = computed(() => route.path === '/login')

const email = ref('')
const password = ref('')
const username = ref('')
const showPassword = ref(false)
let errorMessage = ref('')


const switchMode = () => {
  if (isLogin.value) {
    router.push('/register')
  } else {
    router.push('/login')
  }
}

async function submitLogReg(){
  if(isLogin.value){
    await loginUser(email.value, password.value);
  }
  else{
    if(await checkUsername(username.value)){
      
      createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log("User created", user);
      // ...
    })
    .catch((error) => {
      errorMessage.value = error.message;
      console.log("Error in creating user", errorMessage.value);
      // ..
    });
    await addUsername(username.value, email.value);
    router.replace(`/home/${username.value}`);
    }
    else{
      errorMessage.value = "username already exists";
    }
  }
}
</script>

<template>
  <div class="page-container">
    <div class="d-flex flex-column align-items-center border-box">
  <img src="../assets/logo2.png" class="rounded-circle m-4 image" width="250px" alt="Logo" />
  <div class="main-title text-center">
    <p>A <strong style="color: #d2601a;">Brilliant </strong> experience</p>  
    <p>in every question</p>
  </div>
</div>
    
    <div class="form-section  ">
      <div class="auth-header">
        <div class="auth-tabs">
          <button 
            class="tab-btn" 
            :class="{ active: !isLogin }"
            @click="router.push('/register')"
          >
          <span class="h6" >Sign up</span>
            
          </button>
          <button 
            class="tab-btn" 
            :class="{ active: isLogin }"
            @click="router.push('/login')"
          >
            <span class="h6" >Log in</span>
          </button>
        </div>
      </div>
      
      <div class="login-container">
        <div class="form-header">
          <h1 class="title">Smash sets in<br>your sweats.</h1>
        </div>

        <form @submit.prevent="submitLogReg" class="login-form">
          <button type="button" class="social-btn google-btn">
            <img src="@/assets/google-icon.svg" alt="Google" class="social-icon" />
            {{ isLogin ? 'Log in' : 'Continue' }} with Google
          </button>

          <div class="divider">
            <span style="color:var(--primary-color)" class="fs-5 fw-bold bg-transparent text-center">or email</span >
          </div>

          <template v-if="!isLogin">

            <div class="form-group">
              <input
                type="text"
                v-model="username"
                placeholder="Username"
                required
              />
            </div>
          </template>

          <div class="form-group">
            <label>Email</label>
            <input
              type="email"
              v-model="email"
              placeholder="Enter your email address or username"
              required
            />
          </div>

          <div class="form-group">
            <div class="password-header">
              <label style="color: var(--primary-color);">Password</label>
            </div>
            <div class="password-input">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                placeholder="Enter your password"
                required
              />
              <button 
                type="button" 
                class="toggle-password"
                @click="showPassword = !showPassword"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
              >
                <svg 
                  v-if="!showPassword" 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  stroke-width="2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                <svg 
                  v-else 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  stroke-width="2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              </button>
            </div>
          </div>

          <div class="terms-text">
            By clicking {{ isLogin ? 'Log in' : 'Sign up' }}, you accept Quizlet's
            <a href="#" @click.prevent style="color: var(--primary-color);">Terms of Service</a> and
            <a href="#" @click.prevent style="color: var(--primary-color);">Privacy Policy</a>
          </div>
          <div class="text-danger fs-4 fw-bold text-center">
            {{ errorMessage }}
          </div>
          <button type="submit" class="submit-btn">
            {{ isLogin ? 'Log in' : 'Sign up' }}
          </button>

          <button type="button" class="create-account-btn" @click="switchMode">
            {{ isLogin ? 'New to Quizzy? Create an account' : 'Already have an account? Log in' }}
          </button>

        </form>
      </div>
    </div>
    <div>
         </div>

  </div>

</template>

<style scoped>
.page-container {
  min-height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
}

.page-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
 
}

.form-section {
  position: relative;
  width: 50%;
  min-height: 100vh;
  background-color: #1d3c45;
  display: flex;
  flex-direction: column;
  margin-left: auto;
}

.auth-header {
  padding: 0.75rem 2rem;
  border-bottom: 2px solid #d2601a;
}

.auth-tabs {
  display: flex;
  gap: 1.5rem;
  justify-content: flex-end;
}

.tab-btn {
  background: none;
  border: none;
  font-size: 0.9rem;
  color: white;
  cursor: pointer;
  padding: 0.5rem 0;
  position: relative;
}

.tab-btn.active {
  color: white;
  font-weight: 600;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary-color);
}

.login-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
  padding: 1.5rem;
}

.form-header {
  margin-bottom: 1.5rem;
}

.title {
  font-size: 2rem;
  color: white;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  gap: 0.75rem;
  width:130% ;
}

.social-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem;
  border: 1px solid #d9dde8;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  font-size: 0.875rem;
  color: #2e3856;
  font-weight: 500;
  transition: background-color 0.2s, border-color 0.2s;
}

.social-icon {
  width: 20px;
  height: 20px;
  margin-right: 0.625rem;
}

.google-btn:hover {
  background-color: #f6f7fb;
}

.facebook-btn {
  background-color: #1877f2;
  border-color: #1877f2;
  color: white;
}

.facebook-btn:hover {
  background-color: #166fe5;
}

.apple-btn {
  background-color: black;
  border-color: black;
  color: white;
}

.apple-btn:hover {
  background-color: #1a1a1a;
}

.divider {
  text-align: center;
  position: relative;
  margin: 0.75rem 0;
  color:black;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 30%;
  height: 1px;
  background-color: #d9dde8;
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
  font-size: 0.75rem;
}

.form-group {
  margin-bottom: 0.75rem;
}

.form-group label {
  display: block;
  color: #2e3856;
  font-weight: 600;
  margin-bottom: 0.375rem;
  font-size: 0.75rem;
}

.password-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.375rem;
}

.forgot-link {
  color: rgb(56, 56, 233);
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 500;
}

.form-group input,
.birthday-inputs select {
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid #d9dde8;
  border-radius: 6px;
  font-size: 0.875rem;
  background-color: #f6f7fb;
  color: #2e3856;
  transition: all 0.2s ease;
}

.birthday-section {
  margin-bottom: 0.75rem;
}

.birthday-section label {
  display: block;
  margin-bottom: 0.375rem;
  color: #2e3856;
  font-size: 0.75rem;
  font-weight: 600;
}

.birthday-inputs {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 0.5rem;
}

/* Select styles */
select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23586380' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1rem;
  padding-right: 2rem !important;
}

select:focus {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234255ff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
}

select option {
  color: #2e3856;
  padding: 0.5rem;
}

.password-input {
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
  color: #586380;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  transition: color 0.2s;
}

.toggle-password:hover {
  color: #2e3856;
}

.toggle-password:focus {
  outline: none;
  color: #4255ff;
}

.toggle-password svg {
  width: 16px;
  height: 16px;
}

.terms-text {
  font-size: 0.6875rem;
  color: white;
  text-align: center;
  margin: 0.75rem 0;
}

.terms-text a {
  color: #4255ff;
  text-decoration: none;
}

.submit-btn {
  width: 100%;
  background-color: #d2601a;
  color: white;
  padding: 0.625rem;
  border: none;
  border-radius: 6px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:hover {
  background-color: #3344cc;
}

.create-account-btn {
  width: 100%;
  background-color: white;
  color: #2e3856;
  padding: 0.625rem;
  border: 1px solid #d9dde8;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 0.375rem;
}

.create-account-btn:hover {
  background-color: #f6f7fb;
}

.magic-link {
  color: #4255ff;
  text-decoration: none;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 500;
  margin-top: 0.75rem;
  display: block;
}

input:focus,
select:focus {
  outline: none;
  border-color: #4255ff;
  background-color: white;
}

.facebook-btn .social-icon,
.apple-btn .social-icon {
  filter: brightness(0) invert(1);
}

/* Hover states */
.forgot-link:hover,
.terms-text a:hover,
.magic-link:hover {
  text-decoration: underline;
}

/* Focus styles */
.social-btn:focus,
.submit-btn:focus,
.create-account-btn:focus {
  outline: none;
  box-shadow: 0 0 0 2px #4255ff33;
}

/* Placeholder styles */
input::placeholder,
select:invalid {
  color: #8f9299;
  opacity: 1;
}
.image {
  display: block;
  margin: 0 auto;
  top: 175px;
  
  position: relative;
}
.main-title {
 
 
  color: #1d3c45;
  font-size: 2.8rem;
  
  
  align-items: center;
  margin-top: 175px;
  margin-bottom: 25px;
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease-in-out;
  
  z-index: 1;
 
}
.main-title p{
  text-align: center;
  z-index: 2;
  font-weight: bolder;

}
.border-box {
  border: 2px solid black;
  width: 50%;

  padding-bottom: 20px;
}
</style>