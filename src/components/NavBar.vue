<!-- eslint-disable no-unused-vars -->
<script setup>
import SearchBar from './SearchBar.vue';

const emit=defineEmits(['toggleSidebar']);

</script>

<template>

      <div class="navbar-wrapper ">
        <div class="navbar navbar-expand d-flex ">
          <div class="d-flex gap-2 align-items-center w-100 p-2">
            <span class="material-icons" style="font-size: 40px; cursor: pointer;" @click="$emit('toggleSidebar')">
              menu
            </span>
            <router-link to="/">
                <img src="../assets/logo2.png" class="rounded-circle" width="75px" alt="Logo" />
            </router-link>
            <search-bar />
          </div>
        </div>
      </div>
  
</template>
  

<style scoped>
.fx-w {
    position: relative;
    background-color: rgb(219, 219, 219);
}

.fx-w:hover {
    background-color: black;
    color: white;
}
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: #fff1e1;
  height: 100px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  
}
</style>
