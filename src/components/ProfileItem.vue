<script setup>
import NavSide from '@/components/NavSide.vue';
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getUserquizzes } from "@/composables/getUserQuizzes";
import ComapctQuizCard from '@/components/ComapctQuizCard.vue';
import LeaderBoard from '@/components/LeaderBoard.vue';
import { getUserLatest } from '@/composables/getUserLatest';
import { getGlobalScores } from '@/composables/getGlobalScores';


let users = ref([]);
let userScore = ref([]);
let userRank = ref([]);

let userLatest = ref([]);

function toggleSidebar() {
  barvisible.value = !barvisible.value
}

onMounted(async () => {
  let out = await getGlobalScores(route.params.username);
  users.value = out.users;
  userScore.value = out.userScore;
  userRank.value = out.userRank;
  userLatest.value = await getUserLatest(route.params.username);
  console.log("userLatest", userLatest.value);
})
const route = useRoute();

const username = route.params.username;


const result = ref([]);
onMounted(async () => {
        result.value = await getUserquizzes(username);
        console.log("aaa", result.value);
});


</script>

<template>
        <div>
            <NavSide :username="username">
            <div v-if="result.length!=0" class="p-1">
                <div class="fs-4 text-blue fw-bold fst-italic text-decoration-underline">
                Your taken quizzes
                </div>
                    <div v-if="result.length === 0" class="text-danger p-2">
                        No quizzes found for this user.
                    </div>
                    <div v-if="result" class="d-flex flex-wrap gap-2">
                    <ComapctQuizCard v-for="(quiz, index) in result" :key="index" v-bind="quiz"/>
                </div>
                </div>
                <div>
        <div class="fs-4 text-blue fw-bold fst-italic text-decoration-underline">
          Wanna know what the others are up to?
        </div>
        <div>
          <LeaderBoard class="mb-3" :users="users" :userRank="userRank" :userScore="userScore"/>
        </div>
      </div>
      
            </NavSide>

        </div>
    
    
    
   
    
</template>