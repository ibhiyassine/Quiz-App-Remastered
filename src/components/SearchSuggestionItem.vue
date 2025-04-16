<!-- eslint-disable no-unused-vars -->
<script setup>
    const props = defineProps({
        type: {
            type: String,
            required: true,
            default: "", 
        },
        value: {
            type: String,
            required: true,
            default: "",
        }
    })
</script>

<template>
    
    <div class="w-100 p-2 d-flex gap-lg-1 border-bottom  ">
        <router-link v-if="type == 'User' " to="/"
            class="d-flex gap-4 text-decoration-none align-items-center"><img src="../assets/user.png" width="45"
                class="rounded-circle d-block"> <span class="d-block link"> u/{{ value }} </span></router-link>
                <!--else if type == 'Topic' -->
        <router-link v-else to="/"
            class="d-flex gap-4 text-decoration-none align-items-center"><img src="../assets/title.png" width="45"
                class="rounded-circle d-block"> <span class="d-block link"> title/{{ value }} </span></router-link>
    </div>
    
</template>

<style scoped>
.link{
    font-weight: bold;
    color: black;
    text-decoration: none;
}
.link:hover{
    color: #d2601a;
}

</style>