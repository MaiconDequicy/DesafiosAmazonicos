import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import Footer from "../components/Footer";
import { addQuiz } from "../services/quizService"; // Importe o serviço
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import { deleteQuiz, setQuizVisibility } from "../services/quizService";

const EMAIL_PROFESSORA = "professora@exemplo.com"; // Troque para o e-mail real

function AdminPage({ tw }) {
  const [autorizado, setAutorizado] = useState(null);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visible, setVisible] = useState(true);
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], answer: 0, image: "" }
  ]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [expandedQuiz, setExpandedQuiz] = useState(null);
  const [quizImage, setQuizImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === EMAIL_PROFESSORA) {
        setAutorizado(true);
      } else {
        setAutorizado(false);
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (autorizado) {
      getDocs(collection(db, "quizzes")).then(snapshot => {
        setAllQuizzes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
    }
  }, [autorizado, msg]);

  const handleQuestionChange = (idx, field, value) => {
    const newQuestions = [...questions];
    if (field === "question") newQuestions[idx].question = value;
    if (field === "answer") newQuestions[idx].answer = Number(value);
    if (field === "image") newQuestions[idx].image = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIdx, oIdx, value) => {
    const newQuestions = [...questions];
    newQuestions[qIdx].options[oIdx] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", "", "", ""], answer: 0, image: "" }]);
  };

  const removeQuestion = (idx) => {
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      await addQuiz({ title, description, image: quizImage, questions, visible });
      setMsg("Quiz cadastrado com sucesso!");
      setTitle("");
      setDescription("");
      setVisible(true);
      setQuestions([{ question: "", options: ["", "", "", ""], answer: 0, image: "" }]);
      setQuizImage("");
    } catch (err) {
      setMsg("Erro ao cadastrar quiz: " + err.message);
    }
    setLoading(false);
  };

  if (autorizado === null) return <div>Verificando permissão...</div>;
  if (!autorizado) return null;

  return (
    <div className={tw`min-h-screen flex flex-col`}>
      <Header tw={tw} nomeUsuario="Professora" onMenuOpen={() => setSideMenuOpen(true)} />
      <SideMenu tw={tw} open={sideMenuOpen} onClose={() => setSideMenuOpen(false)} />
      <main className={tw`flex-1 flex flex-col items-center mt-8`}>
        <div className={tw`w-full max-w-3xl rounded-2xl shadow-lg p-12 bg-white mb-8 flex flex-col items-center`}>
          <h1 className={tw`text-4xl font-bold mb-4 text-green-800`}>Área Administrativa</h1>
          <p className={tw`text-xl mb-8 text-center`}>Bem-vinda, professora! Aqui você pode cadastrar e gerenciar quizzes.</p>
          <form onSubmit={handleSubmit} className={tw`w-full flex flex-col gap-4`}>
            <input
              className={tw`border p-2 rounded`}
              placeholder="Título do Quiz"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
            <textarea
              className={tw`border p-2 rounded`}
              placeholder="Descrição"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
            <input
              className={tw`border p-2 rounded`}
              placeholder="URL da imagem do quiz (opcional)"
              value={quizImage}
              onChange={e => setQuizImage(e.target.value)}
            />
            <label className={tw`flex items-center gap-2`}>
              <input
                type="checkbox"
                checked={visible}
                onChange={e => setVisible(e.target.checked)}
              />
              Quiz visível para os alunos
            </label>
            {questions.map((q, idx) => (
              <div key={idx} className={tw`border rounded p-4 mb-2`}>
                <input
                  className={tw`border p-2 rounded w-full mb-2`}
                  placeholder={`Pergunta ${idx + 1}`}
                  value={q.question}
                  onChange={e => handleQuestionChange(idx, "question", e.target.value)}
                  required
                />
                <input
                  className={tw`border p-2 rounded w-full mb-2`}
                  placeholder="URL da imagem (opcional)"
                  value={q.image || ""}
                  onChange={e => handleQuestionChange(idx, "image", e.target.value)}
                />
                {q.options.map((opt, oIdx) => (
                  <input
                    key={oIdx}
                    className={tw`border p-2 rounded w-full mb-1`}
                    placeholder={`Opção ${oIdx + 1}`}
                    value={opt}
                    onChange={e => handleOptionChange(idx, oIdx, e.target.value)}
                    required
                  />
                ))}
                <label className={tw`block mt-2`}>
                  Resposta correta:
                  <select
                    className={tw`ml-2 border rounded`}
                    value={q.answer}
                    onChange={e => handleQuestionChange(idx, "answer", e.target.value)}
                  >
                    {q.options.map((_, oIdx) => (
                      <option key={oIdx} value={oIdx}>{`Opção ${oIdx + 1}`}</option>
                    ))}
                  </select>
                </label>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(idx)}
                    className={tw`bg-red-500 text-white px-3 py-1 rounded mt-2 ml-2`}
                  >
                    Remover Pergunta
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addQuestion} className={tw`bg-blue-500 text-white px-4 py-2 rounded mt-2`}>
              Adicionar Pergunta
            </button>
            <button type="submit" className={tw`bg-green-600 text-white px-6 py-2 rounded font-bold`} disabled={loading}>
              {loading ? "Salvando..." : "Cadastrar Quiz"}
            </button>
            {msg && <div className={tw`mt-2 text-center`}>{msg}</div>}
          </form>
        </div>
        
        <div className={tw`w-full max-w-3xl mt-8`}>
          <h2 className={tw`text-2xl font-bold mb-4`}>Quizzes cadastrados</h2>
          {allQuizzes.length === 0 && <div>Nenhum quiz cadastrado.</div>}
          {allQuizzes.map(quiz => (
            <div key={quiz.id} className={tw`border rounded p-4 mb-2 flex flex-col`}>
              <div className={tw`flex flex-col md:flex-row md:items-center md:justify-between`}>
                <div>
                  <strong>{quiz.title}</strong>
                  <div className={tw`text-sm text-gray-600`}>{quiz.description}</div>
                  <div className={tw`text-sm`}>Visível: {quiz.visible ? "Sim" : "Não"}</div>
                </div>
                <div className={tw`flex gap-2 mt-2 md:mt-0`}>
                  <button
                    className={tw`bg-blue-500 text-white px-3 py-1 rounded`}
                    onClick={() => setExpandedQuiz(expandedQuiz === quiz.id ? null : quiz.id)}
                  >
                    {expandedQuiz === quiz.id ? "Ocultar detalhes" : "Ver detalhes"}
                  </button>
                  <button
                    className={tw`bg-yellow-500 text-white px-3 py-1 rounded`}
                    onClick={() => setQuizVisibility(quiz.id, !quiz.visible).then(() => setMsg("Visibilidade alterada!"))}
                  >
                    {quiz.visible ? "Ocultar" : "Tornar visível"}
                  </button>
                  <button
                    className={tw`bg-red-600 text-white px-3 py-1 rounded`}
                    onClick={() => deleteQuiz(quiz.id).then(() => setMsg("Quiz apagado!"))}
                  >
                    Apagar
                  </button>
                </div>
              </div>
              {expandedQuiz === quiz.id && (
                <div className={tw`mt-4 bg-gray-50 rounded p-4`}>
                  <h3 className={tw`font-bold mb-2`}>Perguntas:</h3>
                  {quiz.questions && quiz.questions.length > 0 ? (
                    quiz.questions.map((q, idx) => (
                      <div key={idx} className={tw`mb-4`}>
                        <div className={tw`font-semibold`}>{`Q${idx + 1}: ${q.question}`}</div>
                        {q.image && (
                          <img
                            src={q.image}
                            alt={`Imagem da pergunta ${idx + 1}`}
                            className={tw`my-2 max-h-40 rounded`}
                          />
                        )}
                        <ul className={tw`ml-4 list-disc`}>
                          {q.options.map((opt, oIdx) => (
                            <li key={oIdx} className={tw`${q.answer === oIdx ? "font-bold text-green-700" : ""}`}>
                              {opt} {q.answer === oIdx && "(correta)"}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <div className={tw`text-gray-500`}>Sem perguntas cadastradas.</div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer tw={tw} />
    </div>
  );
}

export default AdminPage;