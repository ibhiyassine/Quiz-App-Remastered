import { getquizzes } from "@/composables/getQuiz.js";
import { getUserInfo } from "./getUserInfo";

export async function getUserquizzes(username) {
  const { quizzes, fetchQuizzes } = getquizzes();
  const userInfo = await getUserInfo(username);

  const questions = [];

  
    for (let k = 0; k < userInfo.quizzes.length; k++) {
      questions.push(userInfo.quizzes[k].score); 
    }
  

  const userquizzes = [];
  if (quizzes.value.length === 0) {
    await fetchQuizzes();
  }

  for (let quiz of quizzes.value) {
    for (let i of quiz.takenBy) {
      if (i.id === username) {
        userquizzes.push(quiz);
      }
    }
  }
  for (let i = 0; i < userquizzes.length; i++) {
    if(i<questions.length){
      userquizzes[i].questions = questions[i];
    }
    else{
      userquizzes[i].questions = 0;

    }
  }

  return userquizzes;
}
