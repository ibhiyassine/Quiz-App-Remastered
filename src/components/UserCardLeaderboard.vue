<script setup>
const props = defineProps({
    rank: {
        type: Number,
        required: true,
        default: 1,
    },
    name: {
        type: String,
        required: true,
        default: 'Default Name',
    },
    score: {
        type: Number,
        required: true,
        default: 0,
    },
});

</script>

<template>
    <div class="w-100 h-100 d-flex justify-content-between bg-white p-3">
        <div class="d-flex gap-5 align-items-center">
            <div :id="`rank-${rank}`" class="rank">{{ rank }}</div>
            <div class="user-name">{{ name }}</div>
        </div>
        <div>
            <div class="fs-5 text-blue fw-bold">{{ score }}</div>
        </div>
    </div>
</template>

<style scoped>
.rank {
    width: 3rem;
    height: 3rem;
    background-color: var(--secondary-color);
    color: white;
    font-size: 1.5rem;
    text-align: center;
    line-height: 3rem;
    border-radius: 50%;
}
.user-name {
    font-size: 1.5rem;
    color: var(--secondary-color);
    font-weight: bold;
}
#rank-1 {
    background-color: gold;
    color: black;
}
#rank-2 {
    background-color: silver;
    color: black;
}
#rank-3 {
    background-color: #cd7f32;
    color: black;
}
.text-blue {
    color: var(--secondary-color) !important;
}
</style>