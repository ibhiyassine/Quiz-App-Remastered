// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_s2vHl5kOxWrbZADSwZESZ8b7asDyljU",
  authDomain: "quizapp-87fbd.firebaseapp.com",
  projectId: "quizapp-87fbd",
  storageBucket: "quizapp-87fbd.firebasestorage.app",
  messagingSenderId: "574773305103",
  appId: "1:574773305103:web:83f3119789f3513d12e87a",
  measurementId: "G-VVWXN6PCGK"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth();