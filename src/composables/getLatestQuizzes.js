import { db } from "@/firebase";
import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";

const quizzesRef = collection(db, "quizzes");
const q = query(quizzesRef, orderBy("createdAt", "desc"), limit(6))

export async function getLatestQuizzes(arr){
    let docRefs = await getDocs(q);
    docRefs.forEach(async (data) => {
        arr.value.push({
            id: data.id,
            name: data.get("name"),
            createdAt: data.get("createdAt"),
            difficulty: data.get("difficulty"),
            topics: data.get("topics"),
            questions: data.get("questions"),
            takenBy: data.get("takenBy"),
        });
    });
}