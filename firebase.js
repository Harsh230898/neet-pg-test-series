// src/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics"; // Optional: if you use analytics

// Your web app's Firebase configuration
// Replace these with your actual config details from your Firebase project
const firebaseConfig = {
  apiKey: "AIzaSyC2B7Fwwrs3bXRPGQmg87AIK_mpivqAE9I",
  authDomain: "neet-pg-test-series.firebaseapp.com",
  projectId: "neet-pg-test-series",
  storageBucket: "neet-pg-test-series.firebasestorage.app",
  messagingSenderId: "762702111401",
  appId: "1:762702111401:web:041ad0b8d999aae4debfb8",
  measurementId: "G-XSLTLM06YH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
// export const analytics = getAnalytics(app); // Optional

// Note: You will use 'auth' to manage user login/logout 
// and 'db' to fetch and store data in Firestore.

export default app;