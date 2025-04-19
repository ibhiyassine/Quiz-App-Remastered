import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";

export async function questionExists(questionText) {
    const q = query(collection(db, "questions"), where("question", "==", questionText));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  }
  