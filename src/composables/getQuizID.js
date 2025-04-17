import { getquizzes } from "@/composables/getQuiz.js";

export async function getQuizID(quizId) {
    const { quizzes, fetchQuizzes } = getquizzes();
  
    if (quizzes.value.length === 0) {
      await fetchQuizzes();
    }
  
    for (let quiz of quizzes.value) {
      if(quiz.id==quizId){
        console.log(quiz);
          return quiz;
      }
    }
    return "no id matched";
  
  }