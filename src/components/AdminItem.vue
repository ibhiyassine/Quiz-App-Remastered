<script setup>
import { ref } from 'vue'
import NavSide from './NavSide.vue'
import OwnQuestions from './OwnQuestions.vue'
import SavedQuestions from './SavedQuestions.vue'


const afficherform = ref(0)

function handleShowForm(formid) {
  afficherform.value = formid;

}

</script>
<template>
    <NavSide :notadmin="false" :inprofile="false" @showForm="handleShowForm" >
  
    <SavedQuestions v-if="afficherform === 3" />
    <OwnQuestions v-if="afficherform === 2" />
    <div v-if="afficherform!=3 && afficherform!=2" class="fw-bold fs-1 d-flex justify-content-center  " >This Is The Admin Page</div>
    <div v-if="afficherform!=3 && afficherform!=2" class="fw-bold fs-1 d-flex justify-content-center  ">Welcome!!</div>

   

    
    </NavSide>
  </template>