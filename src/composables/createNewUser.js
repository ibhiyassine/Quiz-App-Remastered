import { db } from "@/firebase";
import { getDoc, doc, addDoc, Timestamp, setDoc } from "firebase/firestore";


export async function checkUsername(username) {
    const userRef = await getDoc(doc(db, "users", username));
    return !(userRef.get("username") == username);    
}

export async function addUsername(username, mail) {
    let user = {
        createdAt: Timestamp.fromDate(new Date()),
        isAdmin: false,
        mail: mail,
        pfp: "avatar.png",
        quizzes: [],
        username: username,
    };
    try{

        setDoc(doc(db, "users", username), user);
    }
    catch(e){
        console.error("YASSINE USER CAN'T BE CREATED", e);
    }
}