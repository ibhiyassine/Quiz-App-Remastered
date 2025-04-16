<script setup>
import { ref } from 'vue'
import NavBar from '../components/NavBar.vue'
import Sidebar from '../components/optionsItem.vue' 
import { RouterView } from 'vue-router'
import ComapctQuizCard from '@/components/ComapctQuizCard.vue'

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

      <main class="main-content">
        <div class="d-flex flex-wrap">

          <ComapctQuizCard />
          <ComapctQuizCard />
          <ComapctQuizCard />
        </div>
        <RouterView />
      </main>
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
  position:sticky;
  height: calc(100vh - 100px);
  overflow-y: auto;
}
</style>
