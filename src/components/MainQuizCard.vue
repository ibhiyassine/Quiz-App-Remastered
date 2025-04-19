<script setup>
import { Timestamp } from 'firebase/firestore';
import { computed, watch } from 'vue';
import { get_date_string } from "../composables/dateString";
import { RouterLink } from 'vue-router';
import TopicTag from './TopicTag.vue';
const props = defineProps({
    /*
    id: data.id,
    name: data.get("name"),
    createdAt: data.get("createdAt"),
    difficulty: data.get("difficulty"),
    topics: data.get("topics"),
    questions: data.get("questions"),
    takenBy: data.get("takenBy"),
    */
    id: {
        type: String,
    },
    name: {
        type: String,
        default: 'Default Name'
    },
    difficulty: {
        type: Number,
        default: 2,
    },
    topics: {
        type: Array,
        default: () => ['Array', 'of', 'Topics'],
    },
    questions: {
        type: Array,
        default: () => ['Array', 'of', 'Questions'],
    },
    createdAt: {
        type: Timestamp,
    },
});

let count_questions = computed(() => {
    return props.questions.length;
});

let date_string = computed(() => {
    return get_date_string(props.createdAt);
});

watch(props, () => { }, { deep: true });

</script>

<template>
    <div>
        <RouterLink :to="`/quiz/${id}`" class="RouterLink">
            <div style="width: 30rem; height: 16rem; gap: 18px;" class="cardx template d-flex flex-column">
                <div class="d-flex justify-content-between">
                    <div class="fs-6 fw-bold">{{ name }}</div>
                    <div>
                        <span v-for="i in difficulty" :key="i" class="material-icons">star</span>
                    </div>
                </div>
                <div class="d-flex flex-wrap gap-1">
                    <TopicTag v-for="(topic, index) in topics" :key="index" :topic="topic" />
                </div>
                <div class="mt-auto d-flex justify-content-between">
                    <div class="fw-bold">{{ count_questions }} questions</div>
                    <div class="fw-bold">created at : {{ date_string }}</div>
                </div>
            </div>
        </RouterLink>
    </div>
</template>

<style scoped>
.RouterLink {
    text-decoration: none;
}

.template {
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border-bottom 0.3s ease-in-out, background-color 0.3s ease-in-out;
}

.template:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    border-bottom: 4px solid var(--secondary-color);
    background-color: white;
}
</style>
