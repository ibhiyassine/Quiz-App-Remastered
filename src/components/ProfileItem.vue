<script setup>
import NavSide from '../components/Navside.vue';
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getUserInfo } from "@/composables/getUserInfo";


const route = useRoute();
const router = useRouter();
const username = route.params.username;
const userInfo = ref(null);

onMounted(async () => {
        userInfo.value = await getUserInfo(username);
        

});

</script>

<template>

    <NavSide>
        <div>
        z
    </div>
    </NavSide>
    
    
   
    
</template>