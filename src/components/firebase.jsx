// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase yapılandırma bilgileriniz:
const firebaseConfig = {
  apiKey: "AIzaSyC3Pvac9xNg5kHjClqo0NTNA4ZmVxeDCOQ",
  authDomain: "cv-maker-71ecc.firebaseapp.com",
  projectId: "cv-maker-71ecc",
  storageBucket: "cv-maker-71ecc.appspot.com",
  messagingSenderId: "552768667854",
  appId: "1:552768667854:web:999df0cc171a381edb509f",
  measurementId: "G-P69QZQER3T",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { app, auth, googleProvider };
