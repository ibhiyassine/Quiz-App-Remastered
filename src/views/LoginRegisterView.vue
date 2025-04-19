<script setup>
import LoginForm from '@/components/LoginForm.vue'
import { onMounted } from 'vue';

onMounted(async () => {
  signOut(auth).then(() => {
  // Sign-out successful.
  console.log("signed out");
}).catch((error) => {
  // An error happened.
});
})
</script>

<template>
  <LoginForm />
</template>

<style scoped>

</style>