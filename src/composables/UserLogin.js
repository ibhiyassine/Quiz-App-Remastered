import { auth, db } from "@/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export async function loginUser(email, password) {
    try {
    
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;

        const username = user.username; 
        if (!username) {
            throw new Error("Username is missing. Please contact support.");
        }

        const userDocRef = doc(db, "users", username); 
        const userSnapshot = await getDoc(userDocRef);

        if (!userSnapshot.exists()) {
          
            await signOut(auth);
            throw new Error(
                "This account has been deleted. Please contact support."
            );
        }

        return user;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}
