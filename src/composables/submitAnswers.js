import { auth, db } from '@/firebase'
import { doc, DocumentReference, getDoc, Timestamp, updateDoc } from 'firebase/firestore'
import { authStateListener } from './authStateListener'

var user = null

function callback(u) {
  user = u
}

export async function submitAnswer(answers, quizID) {
    console.log(quizID);
  await authStateListener(callback)
  if (user) {
    console.log(user);
    let username = user.displayName
    // Now i need to add the quiz answers to the users document
    const userRef = doc(db, 'users', username)
    const quizRef = doc(db, 'quizzes', quizID)
    const userSnapshot = await getDoc(userRef)
    const score = answers.filter((answer) => answer === 0).length
    const quiz = (userSnapshot.get('quizzes')).filter((element) => element.name.id === quizID)
    console.log("quiz condition", quiz);
    if(quiz.length > 0){
        await updateDoc(userRef, {
            quizzes: (userSnapshot.get('quizzes')).map((element) => {
                if(element.name.id === quizID){
                    return {
                            answers: answers,
                            lastTakenAt: Timestamp.fromDate(new Date()),
                            name: quizRef,
                            score: score,
                    };
                }
                else{
                    return element
                }
            })
          })
    }
    else{
        await updateDoc(userRef, {
          quizzes: [
            ...(userSnapshot.get('quizzes')),
            {
              answers: answers,
              lastTakenAt: Timestamp.fromDate(new Date()),
              name: quizRef,
              score: score,
            },
          ],
        })
    }
    // and add takenBy to the quizID
    const quizSnapshot = await getDoc(quizRef)
    const existingUser = (quizSnapshot.get("takenBy")).filter((element) => element.id === username);
    console.log(quizSnapshot.get("takenBy"))
    console.log("user condition", existingUser);
    if(existingUser.length == 0){
        await updateDoc(quizRef, {
            takenBy: [
                ...(quizSnapshot.get("takenBy")),
                userRef,
            ],
        })
    }
    console.log("submitted answers succesfully");
  }
}
