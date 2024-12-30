import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC3Pvac9xNg5kHjClqo0NTNA4ZmVxeDCOQ",
    authDomain: "cv-maker-71ecc.firebaseapp.com",
    projectId: "cv-maker-71ecc",
    storageBucket: "cv-maker-71ecc.firebasestorage.app",
    messagingSenderId: "552768667854",
    appId: "1:552768667854:web:999df0cc171a381edb509f",
    measurementId: "G-P69QZQER3T"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
