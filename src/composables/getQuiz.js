import { ref } from "vue";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

export function getquizzes() {
    const quizzes = ref([]);

    const fetchQuizzes = async () => {
        const querySnapshot = await getDocs(collection(db, "quizzes"));
        quizzes.value = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    };
    

    return {
        quizzes,
        fetchQuizzes,
    };
}
