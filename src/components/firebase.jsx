// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3Pvac9xNg5kHjClqo0NTNA4ZmVxeDCOQ",
  authDomain: "cv-maker-71ecc.firebaseapp.com",
  projectId: "cv-maker-71ecc",
  storageBucket: "cv-maker-71ecc.appspot.com", // Düzenlendi
  messagingSenderId: "552768667854",
  appId: "1:552768667854:web:999df0cc171a381edb509f",
  measurementId: "G-P69QZQER3T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
