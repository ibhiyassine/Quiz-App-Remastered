<script setup>
import { Timestamp } from 'firebase/firestore';
import { computed, watch } from 'vue';
import { get_date_string } from "../composables/dateString";
import { RouterLink } from 'vue-router';
import TopicTag from './TopicTag.vue';
const props = defineProps({
    id: {
        type: String,
    },
    name: {
        type: String,
        required: true,
        default: 'Default Name'
    },
    difficulty: {
        type: Number,
        required: true,
        default: 2,
    },
    topics: {
        type: Array,
        required: true,
        default: () => ['Array', 'of', 'Topics'],
    },
    questions: {
        type: Array,
        required: true,
        default: () => [0, 1, 0],
    },
    createdAt: {
        type: Timestamp,
        required: true,
    },
});

let count_questions = computed(() => {
    console.log("Counting questions", props.questions.length);
    return props.questions.length;
});

let correct_answers = computed(() => {
    return props.questions.filter((question) => {return question == 0}).length;
});

let date_string = computed(() => {
    return get_date_string(props.createdAt);
});

watch(props, () => { }, { deep: true });
</script>

<template>
    <RouterLink style="text-decoration: none;" :to="'/'">
        <div class="d-flex flex-column gap-1 cardx border-5 border border-blue mx-2 my-1" id="compact" style="width: 34rem;">
            <div class="fs-4 fw-bold d-flex align-items-center"><span class="material-icons me-2 fs-2">style</span><span
                    class="fs-5 fw-bold">{{
                    name }}</span></div>
            <div class="d-flex align-items-center justify-content-between mx-5">
                <div class="fw-bold">
                    Score: {{ correct_answers }} / {{ count_questions }}
                </div>
                <div class="fw-bold d-flex align-items-center">
                    <span class="material-icons me-2">date_range</span>
                    {{ date_string }}
    
                </div>
            </div>
        </div>
    </RouterLink>
</template>

<style scoped>
.border-blue {
    border-color: var(--secondary-color) !important;
}
/* Add your styles here */
#compact:hover{
    background-color: #52bd3f; /* Example style */
    transform: translateY(-5px);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    border-bottom: 5px solid var(--secondary-color);
}

</style>