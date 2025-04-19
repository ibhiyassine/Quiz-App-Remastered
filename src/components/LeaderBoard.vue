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
        default: -1,
    },
    users: {
        type: Array,
        required: false,
        default: () => [
            {
                name: 'User 1',
                score: 100,
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
    <div class="p-3 w-100">
        <div class="border border-5 w-75 mx-auto border-blue baground-orange fixed-overflow">
            <div class="border-bottom border-5 border-blue d-flex justify-content-between sticky-top baground-orange">
                <div class="fs-3 p-3 fw-bold text-blue"> {{ quiz }} </div>
                <div>
                    <div class="d-flex flex-column">
                        <div class="d-flex justify-content-between">
                            <div class="fs-5 p-3 text-blue fw-bold">Your Score: {{ userScore }}</div>
                            <div class="fs-5 p-3 text-blue fw-bold">{{(userRank != -1) ? `Ranked: ${userRank }` : 'Not ranked yet!'}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <ul>
                <li class=" border border-blue" v-for="(user, index) in paginated_users" :key="index">
                    <UserCardLeaderboard :rank="index + 1" :name="user.name" :score="user.score" :class="{'baground-orange-2': index + 1 == userRank}" />
                </li>
            </ul>
        </div>
        <div class="d-flex justify-content-center gap-5 mt-1">
            <div class="index" @click="current_page = (current_page > 1 ? current_page - 1 : 1)">Prev.</div>
            <div v-for="i in number_of_pages" :key="i" :class="{ 'text-decoration-underline text-orange': current_page == i }"
                class="index" @click="current_page = i">
                {{ i }}
            </div>
            <div class="index" @click="current_page = (current_page < number_of_pages ? current_page + 1 : number_of_pages)">Next</div>
        </div>
    </div>

</template>

<style scoped>
.sticky-top {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
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
}
.fixed-overflow{
    max-height: 510px;
    overflow-y: scroll;
    scrollbar-width: none;
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
    user-select: none;

}
.index:hover{
    cursor: pointer;
    text-decoration: underline;
    color: var(--primary-color);
    font-size: 2rem;
    transform: translateY(0rem);
}
.baground-orange-2{
    background-color: rgb(255, 255, 175) !important;
}
</style>