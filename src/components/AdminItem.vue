<script setup>
import { ref } from 'vue'
import NavSide from './NavSide.vue'
import OwnQuestions from './OwnQuestions.vue'
import SavedQuestions from './SavedQuestions.vue'
import ApiQuestions from './ApiQuestions.vue'


const afficherform = ref(0)

function handleShowForm(formid) {
  afficherform.value = formid;

}

</script>
<template>
    <NavSide :notadmin="false" :inprofile="false" @showForm="handleShowForm" >
  
    <SavedQuestions v-if="afficherform === 3" />
    <OwnQuestions v-if="afficherform === 2" />
    <ApiQuestions v-if="afficherform === 1" />

    
    </NavSide>
  </template>