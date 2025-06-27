import { collection, getDocs, query, where } from "firebase/firestore";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

// Adiciona um novo quiz à coleção 'quizzes'
export async function addQuiz(quizData) {
  return await addDoc(collection(db, 'quizzes'), quizData);
}

// Adiciona um novo resultado à coleção 'quizResults'
export async function addQuizResult(resultData) {
  return await addDoc(collection(db, 'quizResults'), {
    ...resultData,
    timestamp: serverTimestamp()
  });
}

export async function getVisibleQuizzes() {
  const q = query(collection(db, "quizzes"), where("visible", "==", true));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Apagar quiz
export async function deleteQuiz(quizId) {
  await deleteDoc(doc(db, "quizzes", quizId));
}

// Alterar visibilidade
export async function setQuizVisibility(quizId, visible) {
  await updateDoc(doc(db, "quizzes", quizId), { visible });
}
