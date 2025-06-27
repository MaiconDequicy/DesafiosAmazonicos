import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import Header from "../components/Header";
import Footer from "../components/Footer";

const EMAIL_PROFESSORA = "professora@exemplo.com"; // Troque para o e-mail real da professora

function Ranking({ tw }) {
  const [pontuacoes, setPontuacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPontuacoes() {
      setLoading(true);
      const q = query(collection(db, "pontuacoes"), orderBy("pontos", "desc"));
      const snapshot = await getDocs(q);
      setPontuacoes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }
    fetchPontuacoes();
  }, []);

  // Filtra para não mostrar a professora
  const pontuacoesFiltradas = pontuacoes.filter(p => p.userEmail !== EMAIL_PROFESSORA);

  // Agrupa por quiz
  const quizzes = {};
  pontuacoesFiltradas.forEach(p => {
    if (!quizzes[p.quizTitle]) quizzes[p.quizTitle] = [];
    quizzes[p.quizTitle].push(p);
  });

  return (
    <div>
      <Header tw={tw} />
      <main className={tw`flex flex-col items-center mt-8 w-full`}>
        <div className={tw`w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center`}>
          <h2 className={tw`text-3xl font-bold text-green-700 mb-6`}>Ranking dos Quizzes</h2>
          {loading ? (
            <div className={tw`text-center`}>Carregando ranking...</div>
          ) : (
            Object.entries(quizzes).map(([quizTitle, scores]) => (
              <div key={quizTitle} className={tw`mb-10 w-full`}>
                <h3 className={tw`text-xl font-bold text-green-800 mb-2`}>{quizTitle}</h3>
                <table className={tw`w-full text-left mb-4`}>
                  <thead>
                    <tr>
                      <th className={tw`py-2`}>#</th>
                      <th className={tw`py-2`}>Usuário</th>
                      <th className={tw`py-2`}>Pontos</th>
                      <th className={tw`py-2`}>Total</th>
                      <th className={tw`py-2`}>Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scores
                      .sort((a, b) => b.pontos - a.pontos)
                      .slice(0, 10)
                      .map((p, idx) => (
                        <tr key={p.id} className={tw`${idx === 0 ? "font-bold text-green-700" : ""}`}>
                          <td className={tw`py-1`}>{idx + 1}</td>
                          <td className={tw`py-1`}>{p.userEmail}</td>
                          <td className={tw`py-1`}>{p.pontos}</td>
                          <td className={tw`py-1`}>{p.total}</td>
                          <td className={tw`py-1`}>{p.data?.toDate?.().toLocaleDateString() || ""}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer tw={tw} />
    </div>
  );
}

export default Ranking;