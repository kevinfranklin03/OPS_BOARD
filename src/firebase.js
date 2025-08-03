// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDU2NYa9ygcNuG0ORJfFgWfd3ZQFzF71Uk",
  authDomain: "smartcrm-lite.firebaseapp.com",
  projectId: "smartcrm-lite",
  storageBucket: "smartcrm-lite.firebasestorage.app",
  messagingSenderId: "989789653016",
  appId: "1:989789653016:web:ed8cb72d3c0b9c2dae5b6d",
  measurementId: "G-J2GBSVV83P"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
