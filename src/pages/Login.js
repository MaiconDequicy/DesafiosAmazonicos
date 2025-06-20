import { Link } from "react-router-dom";


function Login({ tw }) {
  return (
    <div className={tw`min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300`}>
      <div className={tw`bg-white rounded-2xl shadow-xl p-10 w-full max-w-md`}>
        <h1 className={tw`text-3xl font-bold text-green-700 mb-6 text-center`}>Bem-vindo!</h1>
        <p className={tw`text-lg text-green-900 mb-8 text-center`}>
          Faça login para acessar os desafios amazônicos.
        </p>
        <form className={tw`flex flex-col gap-6`}>
          <div>
            <label className={tw`block text-green-800 font-semibold mb-2`} htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              className={tw`w-full px-4 py-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400`}
              placeholder="Digite o seu e-mail"
              autoComplete="username"
              required
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
              autoComplete="current-password"
              required
            />
          </div>
          <button
            type="submit"
            className={tw`bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-3 rounded shadow text-lg transition`}
          >
            Entrar
          </button>

        </form>
        <div className={tw`mt-6 text-center`}>
          <span className={tw`text-green-800`}>Ainda não tem conta? </span>
          <Link
            to="/cadastro"
            className={tw`text-green-700 font-bold hover:underline`}
          >
            Faça o seu cadastro!
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Login;