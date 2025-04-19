<script setup>
import SearchBar from './SearchBar.vue';
import UserInfo from './UserInfo.vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { authStateListener } from '@/composables/authStateListener';

const route = useRoute();
const router = useRouter();
let username = ref('');

function defineUsername(u){
  username.value = u.displayName;
}

const emit = defineEmits(['toggleSidebar']);
const see = ref(false);

onMounted(async () => {
  await authStateListener(defineUsername);
})
</script>

<template>
  <div class="navbar-wrapper border-bottom border-5 border-blue sticky-top">
    <div class="navbar navbar-expand d-flex justify-content-between align-items-center">

      
      <div class="d-flex gap-2 align-items-center w-100 p-2">
        <span class="material-icons" style="font-size: 40px; cursor: pointer;" @click="$emit('toggleSidebar')">
          menu
        </span>
        <router-link to="/home">
          <img src="../assets/logo2.png" class="rounded-circle" width="75px" alt="Logo" />
        </router-link>
        <search-bar />
      </div>

      
      <div class="d-flex align-items-center me-4 position-relative">
        <span 
          class="material-icons hvr" 
          style="font-size: 60px; cursor: pointer;" 
          @click="see = !see"
        >
          account_circle
        </span>

        
        <div 
          v-if="see" 
          class="user-info-popup position-absolute "
        >
          <user-info :username="username" />
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: #fff1e1;
  height: 80px;
  padding: 0 20px;
}

.hvr {
  color: #1d3c45;
  transition: color 0.3s ease;
}

.hvr:hover {
  color: #d2601a;
}

.border-blue {
  border-color: #1d3c45 !important;
}

.user-info-popup {
  top: 100%; 
  right: 0;
  background-color: white;
  border: 2px solid #1d3c45;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  height: 300px;
  z-index: 1001;
  width: 300px;
}


</style>
