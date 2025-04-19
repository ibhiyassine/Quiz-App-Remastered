<script setup>
import { defineProps, ref,onMounted,defineEmits } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { DeleteUser } from '@/composables/DeleteUser.js';

const emit = defineEmits(['showForm']);

const props = defineProps({
  username: {
    type: String,
    required: true,
    default: "ibhi"
  },
  notadmin:{
    type: Boolean,
    required: true,
    default: false
  },
  inprofile:{
    type: Boolean,
    required: true,
    default: false
  }
})
const router= useRouter();
const route = useRoute();
const handleDelete = async () => {
  const confirmed = confirm(`Are you sure you want to delete "${props.username}"?`);
  if (confirmed) {
    await DeleteUser(props.username, router);
    console.log("User deleted!");
  }
};




</script>

<template>
    
  <div class="sidebar border-end border-5 border-blue">
    
    <div class="row">
<router-link :to="`/home`" class="sidebar-link fx-w d-flex gap-4 text-decoration-none align-items-center" style="color: #d2601a; background-color: #1d3c45; height: 50px; padding: 10px; border-radius: 5px;font-size: 23px;font-weight: bold;">        
  <span class="material-icons  " style="font-size: 30px;">
        home
        </span> Home
      </router-link>
       
    </div>

    <div class="row" v-show="notadmin">
        <router-link :to="`/profile/${username}`" class="d-flex gap-4 text-decoration-none align-items-center h4" style="color: #d2601a; background-color: #1d3c45; height: 50px; padding: 10px; border-radius: 5px; font-size: 23px;font-weight: bold;">
            <span class="material-icons "  style="font-size: 30px;">
            account_circle
            </span> Profile
      </router-link>
    </div>

    <div class="dropdown"  v-show="inprofile && username == route.params.username">
      <div class="btn btn-secondary dropdown-toggle d-flex gap-4 text-decoration-none align-items-center h4" style="color: #d2601a; background-color: #1d3c45; height: 50px; padding: 10px; border-radius: 5px; font-size: 23px;font-weight: bold; width: 230px; position: relative; right:12px"  role="button" data-bs-toggle="dropdown" >
          <span class="material-icons" style="font-size: 30px;">
            settings
            </span>
        Settings
      </div>

      <ul class="dropdown-menu border-0" style="background-color: #fff1e1;" >
        <div class="dropdown-item settings d-flex h6" @click="handleDelete" ><span class="material-icons" style="font-size: 20px;">
    delete
    </span>Delete account</div>
        <div class="dropdown-item settings2 d-flex h6  "><span class="material-icons" style="font-size: 20px;">
        lock_reset
        </span>Change password</div>
          </ul>
        </div>

<div class="dropdown"  v-show="!notadmin">
      <div class="btn btn-secondary dropdown-toggle d-flex gap-4 text-decoration-none align-items-center h4" style="color: #d2601a; background-color: #1d3c45; height: 50px; padding: 10px; border-radius: 5px; font-size: 23px;font-weight: bold; width: 230px; position: relative; right:12px"  role="button" data-bs-toggle="dropdown" >
        <span class="material-icons" style="font-size: 30px;">
           add
        </span>
        Add Quiz
      </div>

      <ul class="dropdown-menu border-0" style="background-color: #fff1e1;" >
        <div class="dropdown-item settings d-flex h6 gap-2" style="font-size: 13px;background-color: #A6AEBF;"  @click="emit('showForm',2)"><span class="material-icons" style="font-size: 19px;">
          api
          </span>Import from API</div>

                  <div class="dropdown-item settings2 d-flex h6 gap-1" style="font-size: 13px; background-color: #A6AEBF" @click="emit('showForm',3)" ><span class="material-icons" style="font-size: 19px;">
          cloud_circle
          </span>Snag Some Saved Questions</div>
            </ul>
          </div>
              
            </div>


</template>

<style >
.sidebar {
  width: 250px;
  background-color: #fff1e1;
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  
}
.changer:hover {
  color: #1d3c45;
  transition: color 0.3s ease;
}
.fx-w:hover {
  background-color: #d2601a;
  color: white;

}
.border-blue {
  border-color: #1d3c45 !important;
}
.settings{
  color: black;
  background-color: #e63946;
  height: 40px;
  padding: 10px;
  border-radius: 5px;
  width: 200px;
  cursor: pointer;
}
.settings:hover{
  background-color: #e63946;
  color: #fff1e1;
  transition: all 0.5s;
}
.settings2{
  
  color:black;
  height: 40px;
  padding: 10px;
  border-radius: 5px;
  width: 200px;
  cursor: pointer;

}
.settings2:hover{
  background-color: gray;
  color: #fff1e1;
  transition: all 0.5s;
}


</style>