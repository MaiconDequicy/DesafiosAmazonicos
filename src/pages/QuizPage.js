import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVisibleQuizzes } from "../services/quizService";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { db } from "../firebase";
import { collection, addDoc, Timestamp, query, where, getDocs } from "firebase/firestore";

function QuizPage({ tw }) {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [current, setCurrent] = useState(0); // índice da questão atual
  const [respostas, setRespostas] = useState([]); // respostas do usuário
  const [finalizado, setFinalizado] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Usuário autenticado:", user);
      if (!user) {
        setAuthChecked(true);
        navigate("/login");
      } else {
        getVisibleQuizzes().then((quizzes) => {
          const found = quizzes.find((q) => q.id === quizId);
          if (found) setQuiz(found);
          else navigate("/quizzes");
          setLoading(false);
          setAuthChecked(true);

          const user = getAuth().currentUser;
          if (user) {
            checkJaRespondeu(found.id, user.uid);
          }
        });
      }
    });
    return () => unsubscribe();
  }, [quizId, navigate]);

  // Função para atualizar resposta
  const handleChange = (idx, value) => {
    const novas = [...respostas];
    novas[idx] = value;
    setRespostas(novas);
  };

  const corrigirQuiz = async () => {
    let pontos = 0;
    quiz.questions.forEach((q, idx) => {
      if (respostas[idx] === q.answer) pontos++;
    });
    setAcertos(pontos);
    setFinalizado(true);

    // Salvar pontuação no Firestore
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      await addDoc(collection(db, "pontuacoes"), {
        quizId: quiz.id,
        quizTitle: quiz.title,
        userId: user ? user.uid : null,
        userEmail: user ? user.email : "anônimo",
        pontos,
        total: quiz.questions.length,
        data: Timestamp.now(),
      });
    } catch (err) {
      console.error("Erro ao registrar pontuação:", err);
    }
  };

  const checkJaRespondeu = async (quizId, userId) => {
    const qPont = query(
      collection(db, "pontuacoes"),
      where("quizId", "==", quizId),
      where("userId", "==", userId)
    );
    const snapshot = await getDocs(qPont);
    if (!snapshot.empty) {
      // Já respondeu, pegue os dados
      const dados = snapshot.docs[0].data();
      setAcertos(dados.pontos);
      setFinalizado(true);
      setRespostas([]); // ou, se quiser, pode mostrar as respostas salvas
    }
  };

  if (!authChecked)
    return <div className={tw`text-center mt-10`}>Verificando autenticação...</div>;
  if (loading) return <div className={tw`text-center mt-10`}>Carregando quiz...</div>;
  if (!quiz) return <div className={tw`text-center mt-10`}>Quiz não encontrado.</div>;

  const q = quiz.questions[current];

  return (
    <div>
      <Header tw={tw} />
      <main className={tw`flex flex-col items-center mt-8 w-full`}>
        <div className={tw`w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center`}>
          <h2 className={tw`text-2xl font-bold mb-2 text-green-700`}>{quiz.title}</h2>
          <p className={tw`mb-6 text-gray-700 text-center`}>{quiz.description}</p>
          <div className={tw`mb-8 w-full`}>
            <div className={tw`mb-2 font-semibold text-lg`}>
              {`Pergunta ${current + 1} de ${quiz.questions.length}: ${q.question}`}
            </div>
            {q.image && (
              <img
                src={q.image}
                alt={`Imagem da pergunta ${current + 1}`}
                className={tw`mb-4 max-h-48 rounded shadow`}
              />
            )}
            <div className={tw`flex flex-col gap-2`}>
              {q.options.map((opt, oIdx) => (
                <label
                  key={oIdx}
                  className={tw`flex items-center bg-green-50 rounded px-4 py-2 cursor-pointer hover:bg-green-100 transition`}
                >
                  <input
                    type="radio"
                    name={`pergunta-${current}`}
                    value={oIdx}
                    checked={respostas[current] === oIdx}
                    onChange={() => handleChange(current, oIdx)}
                    className={tw`mr-3 accent-green-600`}
                    disabled={finalizado}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          <div className={tw`flex gap-4 mt-4`}>
            <button
              className={tw`bg-gray-300 hover:bg-gray-400 text-green-900 font-bold py-2 px-6 rounded shadow`}
              onClick={() => setCurrent(current - 1)}
              disabled={current === 0 || finalizado}
            >
              Anterior
            </button>
            {current < quiz.questions.length - 1 ? (
              <button
                className={tw`bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-2 px-6 rounded shadow`}
                onClick={() => setCurrent(current + 1)}
                disabled={respostas[current] === undefined || finalizado}
              >
                Próxima
              </button>
            ) : (
              <button
                className={tw`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-8 rounded shadow`}
                onClick={corrigirQuiz}
                disabled={respostas[current] === undefined || finalizado}
              >
                Enviar Respostas
              </button>
            )}
          </div>
          {finalizado && (
            <div className={tw`mt-8 text-center`}>
              <h3 className={tw`text-xl font-bold text-green-700`}>Resultado</h3>
              <p className={tw`text-lg`}>Você acertou {acertos} de {quiz.questions.length} perguntas!</p>
              <div className={tw`mt-4`}>
                {quiz.questions.map((q, idx) => (
                  <div key={idx} className={tw`mb-2`}>
                    <span className={tw`font-semibold`}>Pergunta {idx + 1}: </span>
                    <span className={respostas[idx] === q.answer ? tw`text-green-700 font-bold` : tw`text-red-600 font-bold`}>
                      {respostas[idx] === q.answer ? "Correta" : "Incorreta"}
                    </span>
                  </div>
                ))}
              </div>
              <button
                className={tw`mt-6 bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-2 px-8 rounded shadow`}
                onClick={() => navigate("/ranking")}
              >
                Ver Ranking
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer tw={tw} />
    </div>
  );
}

export default QuizPage;