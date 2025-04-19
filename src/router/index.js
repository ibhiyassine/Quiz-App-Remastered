import { createRouter, createWebHistory } from 'vue-router'
import { db, auth } from '@/firebase'
import {doc, getDoc} from 'firebase/firestore'
import LoginRegisterView from '@/views/LoginRegisterView.vue'
import ProfileView from '@/views/ProfileView.vue'
import HomeView from '@/views/HomeView.vue'
import LandingPage from '@/views/LandingPage.vue'
import QuizView from '@/views/QuizView.vue'
import TakeQuizView from '@/views/TakeQuizView.vue'
import AdminView from '@/views/AdminView.vue'
import QuizResultView from '@/views/QuizResultView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage,
    },
    {

      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginRegisterView
    },
    {
      path: '/register',
      name: 'register',
      component: LoginRegisterView
    },
    {
      path: '/profile/:username',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: QuizView
    },
    {
      path: '/quiz/:id',
      name: 'take-quiz',
      component: TakeQuizView
    },
    {
      path: '/quiz/:id/result',
      name: 'quiz-result',
      component: QuizResultView
    },
    {
      path: '/admin/:username',
      name: 'admin',
      component: AdminView,
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!auth.currentUser;

  if (to.name === "admin") {
      auth.onAuthStateChanged(async (user) => {
          if (user) {
              const userDoc = await getDoc(
                  doc(db, "users", user.displayName)
              );
              if (userDoc.exists() && userDoc.data().isAdmin === true) {
                  next();
              } else {
                  alert("You aren't allowed to be here... get out!");
                  next({ name: "LandingPage" });
              }
          } else {
            alert("You aren't allowed to be here... get out!");
              next({ name: "LandingPage" });
          }
      });
  } else if ((to.name === "profile") && !isAuthenticated) {
      // Wait for Firebase to initialize auth state
      auth.onAuthStateChanged((user) => {
          if (user) {
              next(); // Proceed if the user is authenticated
          } else {
              alert("You must be logged in to access this page.");
              next({ name: "Login" }); // Redirect to login if not authenticated
          }
      });
  } else {
      next(); // Proceed for all other routes
  }
});

export default router
