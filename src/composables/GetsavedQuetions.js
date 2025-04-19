import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";

export async function GetSavedQuetions(data) {
  let allQuestions = [];
  const seenIds = new Set();
  
 
  
  const questionsRef = collection(db, "questions");
  
  const topics = Array.from(data.topic);
  
  for (let topic of topics) {
    const q = query(questionsRef, where("category", "array-contains", topic));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach(docSnap => {
      const question = {
        id: docSnap.id,
        ...docSnap.data()
      };
      
      if (!seenIds.has(question.id)) {
        seenIds.add(question.id);
        allQuestions.push(question);
      }
    });
  }
  
  if (data.difficulty === "1") {
    allQuestions = allQuestions.filter((question) => question.difficulty === 1);
  } else if (data.difficulty === "2") {
    allQuestions = allQuestions.filter((question) => question.difficulty === 2);
  } else if (data.difficulty === "3") {
    allQuestions = allQuestions.filter((question) => question.difficulty === 3);
  }
  
  return allQuestions;
}