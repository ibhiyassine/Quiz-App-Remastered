<script setup>
import { computed, ref, watch } from 'vue';
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
let answers  = ref([]);
let response_count = computed(() => {
    try{
        return props.questions[current_question.value - 1].answers.length;
    }
    catch(e){

        return 1;
    }
});
function show_ans(i){
    try{
        return props.questions[current_question.value - 1].answers[i - 1];
    }
    catch(e){
        return '';
    }
}
function show_ques(){
    try{
        return props.questions[current_question.value - 1].question;
    }
    catch(e){
        return '';
    }
}

let selected = ref(-1);
watch(props, () => {
    question_count.value = props.NumberOfQuestions;
    for(let i in question_count.value){
        answers.value.push(-1); 
    }
 }, {deep: true});
watch(selected, () => { });
</script>

<template>
    <div class="border border-5 border-blue rounded d-flex bg-white" style="height: 600px; width: 800px;">
        <div class="border-end border-5 border-blue">
            <div class="fs-4 fw-bold text-blue border-bottom border-blue p-3 border-5">
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
            <div v-for="i in response_count" :key="i" :class="{ 'baground-orange-primary': answers[current_question - 1] == i }"
                class="p-3 baground-orange border border-3 border-blue answer rounded-pill mt-3 fw-bold d-flex align-items-center"
                @click="answers[current_question - 1] = i">
                <span class="material-icons me-1">lightbulb</span> {{ show_ans(i) }}
            </div>
            <!--Here we put the next and prev buttons-->
            <div class="d-flex justify-content-around px-5 mt-5">
                <div class="rounded rounded-pill border border-blue border-3 px-2 py-1 fw-bold fs-6 button"
                @click="current_question = (current_question == 1) ? 1 : (current_question - 1)">
                    Prev
                </div>
                <div class="rounded rounded-pill border border-blue border-3 px-2 py-1 fw-bold fs-6 button"
                @click="$emit('submit', answers.value)" v-if="current_question == question_count">
                    Submit
                </div>
                <div class="rounded rounded-pill border border-blue border-3 px-2 py-1 fw-bold fs-6 button"
                @click="current_question = (current_question == question_count) ? question_count : (current_question + 1)" >
                    Next
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
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
    background-color: var(--primary-color) !important;
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