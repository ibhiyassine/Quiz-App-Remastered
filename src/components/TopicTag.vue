<script setup>
const props = defineProps({
    topic: {
        type: String,
        required: true,
        default: "topic",
    }
});
</script>

<template>
    <div class="rounded-pill d-inline px-2 py-1 tag">
        {{ topic }}
    </div>
</template>

<style scoped>
.tag{
    color: var(--secondary-color);
    color: rgb(107, 157, 172);
    border: solid 1px var(--secondary-color);
    background-color: rgba(29, 60, 69, 1);
    font-size: 1rem;
    text-align: center;
}
</style>