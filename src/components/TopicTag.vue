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
    <div class="rounded-pill d-inline px-2 py-1 tag h-6">
        {{ topic }}
    </div>
</template>

<style scoped>
.tag{
    color: var(--secondary-color);
    color: #fff1e1;
    border: solid 1px var(--secondary-color);
    background-color: rgba(29, 60, 69, 1);
    font-size: 0.9rem;
    text-align: center;
}
</style>