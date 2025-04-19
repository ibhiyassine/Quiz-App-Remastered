import { collection, addDoc, serverTimestamp, doc } from 'firebase/firestore';
import { db } from '@/firebase'; 

export async function saveQuiz(quiz, selectedQuestions) {
  
    const questionsRefs = selectedQuestions.map(q => doc(db, 'questions', q.id));
    
    const docRef = await addDoc(collection(db, 'quizzes'), {
      name: quiz.title,
      difficulty: parseInt(quiz.difficulty),
      topics: Array.from(quiz.topic),
      createdAt: serverTimestamp(),
      NumberOfQuestions: questionsRefs.length,
      takenBy: [],
      questions: questionsRefs
    });
    console.log("ayaa",docRef.id);
    return docRef;

  
}
