import { db } from "@/firebase";
import { getDoc, doc } from "firebase/firestore";

export async function getUserLatest(user){
    const userDocRef = doc(db, "users", user);
    const userDocSnap = await getDoc(userDocRef);
    let quizzes = userDocSnap.get("quizzes");
    let out = await Promise.all(quizzes.map(async (element) => {
        let quizRef = await getDoc(doc(db, "quizzes", element.name.id));
        
        let e = {
            id: element.name.id,
            name: quizRef.get("name"),
            difficulty: quizRef.get("difficulty"),
            topics: quizRef.get("topics"),
            questions: element.answers,
            createdAt: quizRef.get("createdAt"),
        };
        return e;
    }));
    return out;
}