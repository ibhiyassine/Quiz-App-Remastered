<script setup>
import { ref, computed, watch } from 'vue';
import UserCardLeaderboard from './UserCardLeaderboard.vue';

const props = defineProps({
    quiz: {
        type: String,
        required: false,
        default: 'Global Leaderboard',
    },
    userScore: {
        type: Number,
        required: false,
        default: 0,
    },
    userRank: {
        type: Number,
        required: false,
        default: 1,
    },
    users: {
        type: Array,
        required: false,
        default: () => [
            {
                id: 1,
                name: 'User 1',
                score: 100,
            },
            {
                id: 2,
                name: 'User 2',
                score: 90,
            },
            {
                id: 3,
                name: 'User 3',
                score: 80,
            },
            {
                id: 4,
                name: 'User 4',
                score: 70,
            },
            {
                id: 5,
                name: 'User 5',
                score: 60,
            },
            {
                id: 6,
                name: 'User 6',
                score: 50,
            },
            {
                id: 7,
                name: 'User 7',
                score: 40,
            },
            {
                id: 8,
                name: 'User 8',
                score: 30,
            },
            {
                id: 9,
                name: 'User 9',
                score: 20,
            },
            {
                id: 10,
                name: 'User 10',
                score: 10,
            },
            {
                id: 11,
                name: 'User 11',
                score: 0,
            },
            {
                id: 12,
                name: 'User 12',
                score: -10,
            },
            {
                id: 13,
                name: 'User 13',
                score: -20,
            },
            {
                id: 14,
                name: 'User 14',
                score: -30,
            },
            {
                id: 15,
                name: 'User 15',
                score: -40,
            },
            {
                id: 16,
                name: 'User 16',
                score: -50,
            },
            {
                id: 17,
                name: 'User 17',
                score: -60,
            },
            {
                id: 18,
                name: 'User 18',
                score: -70,
            },
            {
                id: 19,
                name: 'User 19',
                score: -80,
            },
            {
                id: 20,
                name: 'User 20',
                score: -90,
            },
            {
                id: 21,
                name: 'User 21',
                score: -100,
            },
            {
                id: 22,
                name: 'User 22',
                score: -110,
            },
            {
                id: 23,
                name: 'User 23',
                score: -120,
            },
            {
                id: 24,
                name: 'User 24',
                score: -130,
            },
            {
                id: 25,
                name: 'User 25',
                score: -140,
            },
            {
                id: 26,
                name: 'User 26',
                score: -150,
            },
            {
                id: 27,
                name: 'User 27',
                score: -160,
            },
            {
                id: 28,
                name: 'User 28',
                score: -170,
            },
            {
                id: 29,
                name: 'User 29',
                score: -180,
            },
            {
                id: 30,
                name: 'User 30',
                score: -190,
            },
            {
                id: 31,
                name: 'User 31',
                score: -200,
            },
            {
                id: 32,
                name: 'User 32',
                score: -210,
            },
            {
                id: 33,
                name: 'User 33',
                score: -220,
            },
            {
                id: 34,
                name: 'User 34',
                score: -230,
            },
            {
                id: 35,
                name: 'User 35',
                score: -240,
            },
        ],
    }
});
let number_of_items_per_page = 7;
let number_of_pages = ref(Math.ceil(props.users.length / number_of_items_per_page));
let current_page = ref(1);
let start_index = ref((current_page.value - 1) * number_of_items_per_page);
let end_index = ref(start_index.value + number_of_items_per_page);
let paginated_users = computed(() => {
    console.log("props.users.slice(start_index.value, end_index.value);", props.users.slice(start_index.value, end_index.value));
    return props.users.slice(start_index.value, end_index.value);
});
watch(current_page, (newPage) => {
    start_index.value = (newPage - 1) * number_of_items_per_page;
    end_index.value = start_index.value + number_of_items_per_page;
    number_of_pages.value = Math.ceil(props.users.length / number_of_items_per_page);
});
</script>

<template>
    <div class="border border-5 w-75 mx-auto border-blue baground-orange fixed-overflow">
        <div class="border-bottom border-5 border-blue d-flex justify-content-between sticky-top baground-orange">
            <div class="fs-3 p-3 fw-bold text-blue"> {{ quiz }} </div>
            <div>
                <div class="d-flex flex-column">
                    <div class="d-flex justify-content-between">
                        <div class="fs-5 p-3 text-blue fw-bold">Your Score: {{ userScore }}</div>
                        <div class="fs-5 p-3 text-blue fw-bold">Ranked: {{ userRank }}</div>
                    </div>
                </div>
            </div>
        </div>
        <ul>
            <li class=" border border-blue" v-for="user in paginated_users" :key="user.id">
                <UserCardLeaderboard :rank="user.id" :name="user.name" :score="user.score" />
            </li>
        </ul>
    </div>
    <div class="d-flex justify-content-center gap-5 mt-3">
        <div class="index" @click="current_page = (current_page > 1 ? current_page - 1 : 1)">Prev.</div>
        <div v-for="i in number_of_pages" :class="{ 'text-decoration-underline text-orange': current_page == i }"
            class="index" @click="current_page = i">
            {{ i }}
        </div>
        <div class="index" @click="current_page = (current_page < number_of_pages ? current_page + 1 : number_of_pages)">Next</div>
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
}
.fixed-overflow{
    max-height: 500px;
    overflow-y: scroll;
}
li {
    list-style-type: none;
    display: block;
    padding: 1rem;
    width: 100%;
    padding: 0;
}
ul{
    padding: 0;
    margin: 0;
}
.index{
    font-weight: bold;
    font-size: 1.7rem;
    transform: translateY(1rem);

}
.index:hover{
    cursor: pointer;
    text-decoration: underline;
    color: var(--primary-color);
    font-size: 2rem;
    transform: translateY(0rem);
}
</style>