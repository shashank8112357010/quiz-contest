import { initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyC7UBXpBnZI0G5gN6_y697fWSfy84CH-dE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "quiz-20372.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "quiz-20372",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "quiz-20372.appspot.com", // fixed domain
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "483541012215",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:483541012215:web:7d7a695e6b423750c0cdf2",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-0NKQ1F0CE2",
};

console.log("Firebase Config:", firebaseConfig);

// Check if Firebase is configured
export const isFirebaseReady = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId
);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app, "Firebase App Initialized");

// ✅ Explicitly typed Auth
export const auth: Auth = getAuth(app);
console.log(auth, "Firebase Auth Initialized");

export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
