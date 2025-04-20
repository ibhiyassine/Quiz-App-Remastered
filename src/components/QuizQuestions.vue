<script setup>
import { computed, onMounted, ref, watch } from 'vue';
let props = defineProps({
    questions: {
        type: Array,
        default: [
            {
                questions: '',
                answers: ['hello']
            }
        ],
    },
    NumberOfQuestions: {
        type: Number,
        default: 0,
    }
});


let question_count = ref(0);
let current_question = ref(1);
let answers = ref([]);
let permutation = [];
let response_count = ref(1);
function show_ans(i) {
    try {
        let permutedIndex = permutation[i - 1];
        return props.questions[current_question.value - 1].answers[permutedIndex];
    }
    catch (e) {
        return '';
    }
}
function show_ques() {
    try {
        return props.questions[current_question.value - 1].question;
    }
    catch (e) {
        return '';
    }
}

let selected = ref(-1);
watch(props, () => {
    question_count.value = props.NumberOfQuestions;
    answers.value = Array(question_count.value).fill(-1);
    try {
        response_count.value = props.questions[current_question.value - 1].answers.length;
    }
    catch (e) {

        response_count.value = 1;
    }
    permutation = Array.from({ length: response_count.value }, (_, index) => index);
    permutation = permutation.sort(() => Math.random() - 0.5);
}, { deep: true });
watch(current_question, (newValue) => {
    try {
        response_count.value = props.questions[newValue - 1].answers.length;
    }
    catch (e) {

        response_count.value = 1;
    }
    permutation = Array.from({ length: response_count.value }, (_, index) => index);
    permutation = permutation.sort(() => Math.random() - 0.5);

});
watch(selected, () => { });
</script>

<template>
    <div class="border border-5 border-blue rounded d-flex bg-white mb-3" style="height: 600px; width: 800px;">
        <div class="border-end border-5 border-blue overflow-y-scroll" style="scrollbar-width: none;">
            <div class="fs-4 fw-bold text-blue border-bottom border-blue p-3 border-5 sticky-top bg-white">
                Questions
            </div>
            <div v-for="i in question_count" :key="i"
                :class="{ 'text-decoration-underline text-orange': i == current_question }"
                class="fs-6 fw-bold text-blue border-bottom border-blue p-3 text-center question-index"
                @click="current_question = i">
                Question {{ i }}
            </div>
        </div>
        <div class="p-5" style="width: 36rem;">
            <!-- Here we put the question and the answers-->
            <div class="text-center border rounded border-3 border-blue p-1 fs-6 fw-bold baground-orange question">
                {{ show_ques() }}
            </div>
            <div v-for="i in response_count" :key="i"
                :class="{ 'baground-orange-primary': answers[current_question - 1] == permutation[i - 1] }"
                class="p-3 baground-orange border border-3 border-blue answer rounded-pill mt-3 fw-bold d-flex align-items-center"
                @click="answers[current_question - 1] = permutation[i - 1]">
                <span class="material-icons me-1">lightbulb</span> {{ show_ans(i) }}
            </div>
            <!--Here we put the next and prev buttons-->
            <div class="d-flex justify-content-around px-5 mt-5">
                <div class="rounded rounded-pill border border-blue border-3 px-2 py-1 fw-bold fs-6 button"
                    @click="current_question = (current_question == 1) ? 1 : (current_question - 1)">
                    Prev
                </div>
                <div class="rounded rounded-pill border border-blue border-3 px-2 py-1 fw-bold fs-6 button"
                    @click="$emit('submit', answers)" v-if="current_question == question_count">
                    Submit
                </div>
                <div class="rounded rounded-pill border border-blue border-3 px-2 py-1 fw-bold fs-6 button"
                    @click="current_question = (current_question == question_count) ? question_count : (current_question + 1)">
                    Next
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.sticky-top {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 2;
}
.border-blue {
    border-color: var(--secondary-color) !important;
}

.text-blue {
    color: var(--secondary-color) !important;
}

.text-orange {
    color: var(--primary-color) !important;
}

.baground-orange {
    background-color: var(--tertiary-color) !important;
    user-select: none;
}

.answer:hover {
    background-color: var(--primary-color) !important;
    transform: scale(1.05);
}

.baground-orange-primary {
    background-color: pink !important;
}

.answer:active {
    background-color: pink !important;
}

.fixed-overflow {
    max-height: 500px;
    overflow-y: scroll;
}

.question {
    max-height: 120px;
    overflow-y: scroll;
    scrollbar-width: thin;
    scrollbar-color: var(--secondary-color) transparent;
}

.question-index:hover {
    transform: scale(1.05);
    color: var(--primary-color) !important;
    text-decoration: underline;
}

.button {
    background-color: var(--secondary-color);
    color: var(--primary-color);
}

.button:hover {
    cursor: pointer;
    transform: scale(1.05);
    background-color: var(--primary-color);
    color: var(--secondary-color);
}
</style>