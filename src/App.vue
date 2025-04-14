<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <span class="material-icons" style="font-size: xx-large; color: blueviolet;">quiz</span>

  <RouterView />
</template>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* Removed container styles to let components handle their own layout */
</style>