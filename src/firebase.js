import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Adicione esta linha

const firebaseConfig = {
  apiKey: "AIzaSyCWBbf016WqjK32LWsxuHxx0e6P5QvWcyI",
  authDomain: "desafiosicos.firebaseapp.com",
  projectId: "desafiosicos",
  storageBucket: "desafiosicos.firebasestorage.app",
  messagingSenderId: "331008676207",
  appId: "1:331008676207:web:4964ce4e7b78142893189a",
  measurementId: "G-PRDM749CV7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Adicione esta linha

export { db, app };