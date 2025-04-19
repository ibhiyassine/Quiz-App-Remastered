import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getQuizID(quizId) {
    const docRef = doc(db, "quizzes", quizId);
    const quiz = await getDoc(docRef);
    let quizObj = {
      id: quiz.id,
      name: quiz.get("name"),
      difficulty: quiz.get("difficulty"),
      createdAt: quiz.get("createdAt"),
      NumberOfQuestions: quiz.get("NumberOfQuestions"),
      questions: quiz.get("questions"),
      takenBy: quiz.get("takenBy"),
      topics: quiz.get("topics"),
    };
    await getQuestions(quizObj);
    await getUsers(quizObj);
    return quizObj
  
  }
export async function getQuestions(quiz){
  quiz.questions = await Promise.all(quiz.questions.map(async (question) => {
    const quesRef = doc(db, "questions", question.id);
    let questionObj = await getDoc(quesRef);
    return {
      answers: questionObj.get("answers"),
      question: questionObj.get("question")
    };
  }));
}

async function getUsers(quiz){
  quiz.takenBy = await Promise.all(quiz.takenBy.map(async (person) => {
    const userRef = doc(db, "users", person.id);
    let user = await getDoc(userRef);
    for(let takenQuizzes of user.get("quizzes") ){
      if(takenQuizzes.name.id == quiz.id){
        return {
          name: user.id,
          score: takenQuizzes.score,
        }
      }
    }
  }));
  quiz.takenBy.sort((a, b) => b.score - a.score);
}