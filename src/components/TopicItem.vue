<!-- eslint-disable no-unused-vars -->
<script setup>
    const props = defineProps({
        topic: {
            type: String,
            required: true,
            default: "A.I.",
        }
    });

</script>

<template>
    <div>

        <button type="button" class="btn rounded-pill fw-bold btn-sm btn-smx" style="background-color: #1d3c45;color: #fff1e1;"> {{ topic }}</button>
        
    </div>
</template>

<style scoped>
.btn-sm:hover{
    background-color: #dc3545;
}
.btn-sm{
    padding: 0.375rem 0.75rem;
        font-size: 1rem;
        font-weight: 400;
}
</style>