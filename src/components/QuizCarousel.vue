<script setup>
import MainQuizCard from './MainQuizCard.vue';
import { onMounted } from 'vue';
const props = defineProps({
    latest: {
        type: Array,
        required: true,
        default: () => [],
    },
});
onMounted(() => {
    console.log("Quizzes loaded:", props.latest);
});

</script>

<template>
    <div id="carouselExampleIndicators" class="carousel slide vw-100" style="height: 18rem;">
        <div class="carousel-inner py-3">
            <div class="carousel-item active">
                <div class="d-flex justify-content-around px-5">
                    <MainQuizCard v-bind="latest[0]" />
                    <MainQuizCard v-bind="latest[1]" />
                    <MainQuizCard v-bind="latest[2]" />
                </div>
            </div>
            <div class="carousel-item">

                <div class="d-flex justify-content-around px-5">
                    <MainQuizCard v-bind="latest[3]" />
                    <MainQuizCard v-bind="latest[4]" />
                    <MainQuizCard v-bind="latest[5]" />
                </div>
            </div>
        </div>
        <button class="carousel-control-prev carousel-button mx-3" type="button"
            data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next carousel-button mx-3" type="button"
            data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</template>

<style scoped>
.carousel-button {
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    background-color: var(--secondary-color);
    margin-top: auto;
    margin-bottom: auto;
}
#carouselExampleIndicators {
    background-color: var(--tertiary-color);
    border-radius: 1rem;
}
</style>