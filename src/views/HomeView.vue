<script setup>

import NavSide from '../components/NavSide.vue'
 
import { RouterView } from 'vue-router'


</script>

<template>
  <div>
    <NavSide>
      <div>Content goes here</div>
    </NavSide>


      <main class="main-content">
        <RouterView />
      </main>
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
