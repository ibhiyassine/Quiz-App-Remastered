import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";
export async function quizExists(title) {
  const q = query(collection(db, "quizzes"), where("name", "==", title));
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}
