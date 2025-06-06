// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWBbf016WqjK32LWsxuHxx0e6P5QvWcyI",
  authDomain: "desafiosicos.firebaseapp.com",
  projectId: "desafiosicos",
  storageBucket: "desafiosicos.firebasestorage.app",
  messagingSenderId: "331008676207",
  appId: "1:331008676207:web:4964ce4e7b78142893189a",
  measurementId: "G-PRDM749CV7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);