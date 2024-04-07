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
  apiKey: "AIzaSyAMzFYQ8fWsHQVQT1w4bMgm1yePVUiksrM",
  authDomain: "chatroom-f9712.firebaseapp.com",
  projectId: "chatroom-f9712",
  storageBucket: "chatroom-f9712.appspot.com",
  messagingSenderId: "335123784180",
  appId: "1:335123784180:web:b9df214804e365cf3219a1",
  measurementId: "G-7CCMFCR0W3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
