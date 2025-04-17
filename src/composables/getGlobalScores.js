import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

const docRefs = collection(db, 'users');

function getScore(quizzes){
    let out = 0;
    quizzes.forEach((quizz) => {
        out += quizz.score;
    });
    return out;
}

export async function getGlobalScores(user='ibhi') {
    const querySnapshot = await getDocs(docRefs);
    let users = [];
    querySnapshot.forEach((element) => {
        users.push({
            name: element.id,
            score: getScore(element.get("quizzes"))
        });
    });
    users.sort((a, b) => b.score - a.score);
    let userScore = 0; let userRank = 2;
    for(let i = 0; i < users.length; i++){
        if(users[i].name == user){
            userScore = users[i].score;
            userRank = i + 1;
        }
    }
    return {
        users,
        userScore,
        userRank
    };
}