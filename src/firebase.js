import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC3Pvac9xNg5kHjClqo0NTNA4ZmVxeDCOQ",
  authDomain: "cv-maker-71ecc.firebaseapp.com",
  projectId: "cv-maker-71ecc",
  storageBucket: "cv-maker-71ecc.firebasestorage.app",
  messagingSenderId: "552768667854",
  appId: "1:552768667854:web:999df0cc171a381edb509f",
  measurementId: "G-P69QZQER3T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

// Configure Google Auth Provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;