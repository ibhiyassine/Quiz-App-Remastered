<script setup>
import MainQuizCard from './MainQuizCard.vue';
import { onMounted, ref, watch } from 'vue';
import { getLatestQuizzes } from '@/composables/getLatestQuizzes';

const latestQuizzes = ref([]);


onMounted(async () => {
    await getLatestQuizzes(latestQuizzes);
    console.log(latestQuizzes);
});
</script>

<template>
    <div class="d-flex position-relative" style="z-index: 0;">
        <div id="carouselExampleIndicators" class="carousel slide" style="height: 18rem; width: 70rem;">
            <div class="carousel-inner py-3">
                <div class="carousel-item active">
                    <div class="d-flex justify-content-around px-5 gap-2">
                        <MainQuizCard v-bind="latestQuizzes[0]" />
                        <MainQuizCard v-bind="latestQuizzes[1]" />
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="d-flex justify-content-around px-5 gap-2">
                        <MainQuizCard v-bind="latestQuizzes[2]" />
                        <MainQuizCard v-bind="latestQuizzes[3]" />
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="d-flex justify-content-around px-5 gap-2">
                        <MainQuizCard v-bind="latestQuizzes[4]" />
                        <MainQuizCard v-bind="latestQuizzes[5]" />
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