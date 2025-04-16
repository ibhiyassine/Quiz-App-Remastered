import { createRouter, createWebHistory } from 'vue-router'
import LoginRegisterView from '@/views/LoginRegisterView.vue'
import ProfileView from '@/views/ProfileView.vue'
import HomeView from '@/views/HomeView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {

      path: '/',
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
      name: 'Profile',
      component: ProfileView
    }
  ]
})

export default router
