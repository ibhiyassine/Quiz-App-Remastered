import { getquizzes } from "@/composables/getQuiz.js";

export async function getTopics() {
  const { quizzes, fetchQuizzes } = getquizzes();
  if (quizzes.value.length === 0) {
    await fetchQuizzes();
  }
 

  const Topics =new Set();

  for(let quiz of quizzes.value){
    for(let topic of quiz.topics){
        Topics.add(topic)
    }
  }
  return Topics;
}