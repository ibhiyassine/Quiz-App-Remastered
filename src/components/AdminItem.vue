<script setup>
import { onMounted, ref } from 'vue'
import NavSide from './NavSide.vue'
import OwnQuestions from './OwnQuestions.vue'
import SavedQuestions from './SavedQuestions.vue'

let loading = ref(true);

const afficherform = ref(0)

function handleShowForm(formid) {
  afficherform.value = formid;

}

onMounted(async () => {
  setTimeout(() => loading.value = false, 1000);
})

</script>
<template>
  <!-- Loading and Error States -->
  <div v-if="loading" class="text-center p-5">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <p class="mt-3 fs-5">Loading profile to take a look 🐨...</p>
  </div>
  <NavSide v-else :notadmin="false" :inprofile="false" @showForm="handleShowForm">

    <SavedQuestions v-if="afficherform === 3" />
    <OwnQuestions v-if="afficherform === 2" />
    <div v-if="afficherform != 3 && afficherform != 2" class="fw-bold fs-1 d-flex justify-content-center  ">This Is The
      Admin Page</div>
    <div v-if="afficherform != 3 && afficherform != 2" class="fw-bold fs-1 d-flex justify-content-center  ">Welcome!!</div>




  </NavSide>
</template>