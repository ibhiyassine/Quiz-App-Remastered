<script setup>
import { ref } from 'vue'
import NavBar from '../components/NavBar.vue'
import Sidebar from '../components/optionsItem.vue' 


const barvisible = ref(true)

function toggleSidebar() {
  barvisible.value = !barvisible.value
}
</script>

<template>
  
  <div>
    <NavBar @toggleSidebar="toggleSidebar" style="position:sticky; top:0" />

    <div class="layout-wrapper">
      <transition name="slide">
        <Sidebar v-if="barvisible" class="stickyside" />
      </transition>

      <div class="main-content">
        <slot />
      </div>

    </div>
    
  </div>
  
</template>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: row;
  height: calc(100vh - 70px);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
.stickyside{
  left:0;
  top:100px;
  position:fixed;
  height: calc(100vh - 100px);
  overflow-y: auto;
}
.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>
