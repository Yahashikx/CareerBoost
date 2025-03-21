// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAns1BAHwi1rGceaPqRdt0QzVAYQtcdJsg",
  authDomain: "careerboost-21701.firebaseapp.com",
  projectId: "careerboost-21701",
  storageBucket: "careerboost-21701.firebasestorage.app",
  messagingSenderId: "776987219071",
  appId: "1:776987219071:web:8923ad9ac57ad59fec5b4a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)