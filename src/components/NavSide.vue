<script setup>
import { ref,defineProps } from 'vue';
import NavBar from './NavBar.vue';
import Sidebar from './optionsItem.vue';

const props=defineProps({
    notadmin:{
        type: Boolean,
        default: true
    },
    inprofile:{
        type: Boolean,
        default: false
    },
    username:{
        type: String,
        required: true,
        default: "ibhi"
    }
})

const barvisible = ref(true);

function toggleSidebar() {
    barvisible.value = !barvisible.value;
}
</script>

<template>
    <NavBar @toggleSidebar="toggleSidebar" style="position:sticky; top:0; z-index: 2;" class="border-bottom border-5 border-blue" />
  
    <transition name="slide">
      <Sidebar
        :notadmin="notadmin"
        :inprofile="inprofile"
        :username="username"
        v-if="barvisible"
        @showForm="(n) => $emit('showForm', n)" 
       
        class="stickyside border-end border-top border-5 border-blue"
      />
    </transition>
  
    <main class="main-content d-flex flex-column gap-5" :class="{ 'margin': barvisible }">
      <slot />
    </main>
  </template>
  

<style scoped>
.stickyside{
    left:0;
    top:80px;
    position:fixed;
    height: calc(100vh - 80px);
    overflow-y: auto;
  }
.border-blue {
    border-color: var(--secondary-color) !important;
}
.main-content {
  max-width: 1200px;
  margin-top: 1.5rem;
  margin-left: 25px;
  transition: all ease 0.5s;
}

.margin{
  margin-left: 275px !important;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
