<script setup>

</script>

<template>
    
  <div class="sidebar">
    
    <div class="row">
<router-link to="/" class="sidebar-link fx-w d-flex gap-4 text-decoration-none align-items-center" style="color: #d2601a; background-color: #1d3c45; height: 50px; padding: 10px; border-radius: 5px;font-size: 23px;font-weight: bold;">        
  <span class="material-icons  " style="font-size: 30px;">
        home
        </span> Home
      </router-link>
       
    </div>
    <div class="row">
        <router-link :to="`/profile/:${username}`" class="d-flex gap-4 text-decoration-none align-items-center h4" style="color: #d2601a; background-color: #1d3c45; height: 50px; padding: 10px; border-radius: 5px; font-size: 23px;font-weight: bold;">
            <span class="material-icons "  style="font-size: 30px;">
            account_circle
            </span> Profile
      </router-link>
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
</style>