import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import "../firebase"; // Garante que o Firebase está inicializado
function Cadastro({ tw }) {

  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    const auth = getAuth();

  try {
      // Cria o usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      // Atualiza o perfil do usuário com nome e username
      await updateProfile(userCredential.user, {
        displayName: form.name,
      });
      // Redireciona para loginx
      navigate("/login");
    } catch (err) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  };


  return (
    <div className={tw`min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300`}>
      <div className={tw`bg-white rounded-2xl shadow-xl p-10 w-full max-w-md`}>
        <h1 className={tw`text-3xl font-bold text-green-700 mb-6 text-center`}>Cadastro</h1>
        <form className={tw`flex flex-col gap-6`} onSubmit={handleSubmit}>
          <div>
            <label className={tw`block text-green-800 font-semibold mb-2`} htmlFor="username">
              Nome de usuário
            </label>
            <input
              id="username"
              type="text"
              className={tw`w-full px-4 py-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400`}
              placeholder="Digite seu nome de usuário"
              autoComplete="username"
              required
              value={form.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={tw`block text-green-800 font-semibold mb-2`} htmlFor="name">
              Nome completo
            </label>
            <input
              id="name"
              type="text"
              className={tw`w-full px-4 py-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400`}
              placeholder="Digite seu nome"
              autoComplete="name"
              required
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={tw`block text-green-800 font-semibold mb-2`} htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              className={tw`w-full px-4 py-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400`}
              placeholder="Digite seu e-mail"
              autoComplete="email"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={tw`block text-green-800 font-semibold mb-2`} htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              type="password"
              className={tw`w-full px-4 py-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400`}
              placeholder="Digite sua senha"
              autoComplete="new-password"
              required
              value={form.senha}
              onChange={handleChange}
            />
          </div>
          {erro && <div className={tw`text-red-600 text-center`}>{erro}</div>}
          <button
            type="submit"
            className={tw`bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-3 rounded shadow text-lg transition`}
            disabled={carregando}
          >
            {carregando ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
        <div className={tw`mt-6 text-center`}>
          <span className={tw`text-green-800`}>Já tem conta? </span>
          <Link
            to="/login"
            className={tw`text-green-700 font-bold hover:underline`}
          >
            Faça login agora!
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Cadastro;