/* eslint-disable no-unused-vars */
import { db } from '@/firebase';
import { doc, deleteDoc,updateDoc  } from "firebase/firestore";
import { getusers } from './getUsers';
import { getquizzes } from './getQuiz';

 export async function DeleteUser(username, router) {
    const {quizzes,fetchQuizzes} = getquizzes();
    await fetchQuizzes();
    for (let quiz of quizzes.value) {

          const updatedTakenBy = quiz.takenBy.filter(user => user.id !== username);
    
          if (updatedTakenBy.length !== quiz.takenBy.length) {
            await updateDoc(doc(db, "quizzes", quiz.id), {
              takenBy: updatedTakenBy
            });
          }
        
      }


    const { users, fetchUsers } = getusers();
    await fetchUsers();
    for(let user of users.value){
        if(user.id===username){
            await deleteDoc(doc(db, "users", username));
            console.log("hey");

        }
    }
    
    router.push("/login");
    return
 }
