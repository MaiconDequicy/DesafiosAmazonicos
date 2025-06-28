import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth"; // Adicione isso

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
// const analytics = getAnalytics(app); // Remova ou comente esta linha
const db = getFirestore(app);

// Configura a persistência da sessão do Auth
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

export { db, app, auth };