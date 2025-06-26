import React, { useState,  useEffect } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function SideMenu({ tw, open, onClose }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const EMAIL_PROFESSORA = "professora@exemplo.com";

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdmin(user && user.email === EMAIL_PROFESSORA);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    setShowConfirm(false);
    onClose(); // Fecha o menu lateral
    navigate("/login");
  };

  return (
    <>
      {/* Menu lateral */}
      <div
        className={tw`
          fixed top-0 left-0 h-full w-80 bg-green-800 text-white z-50 rounded-tr-xl rounded-br-xl shadow-lg
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{ minWidth: "300px" }}
      >
        <div className={tw`flex items-center justify-between px-6 py-5 border-b border-green-700`}>
          <span className={tw`text-3xl font-bold`}>Menu</span>
          <button onClick={onClose} className={tw`text-3xl`} aria-label="Fechar menu">×</button>
        </div>
        <nav className={tw`flex flex-col gap-8 px-8 py-8 text-xl`}>
          <a href="/" className={tw`flex items-center gap-4 hover:underline text-xl`}>
            <span className="material-icons-outlined" style={{ fontSize: "2rem" }}>home</span> Início
          </a>
          <a href="/acessibilidade" className={tw`flex items-center gap-4 hover:underline text-xl`}>
            <span className="material-icons-outlined" style={{ fontSize: "2rem" }}>accessible</span> Acessibilidade
          </a>
          <a href="/sobre" className={tw`flex items-center gap-4 hover:underline text-xl`}>
            <span className="material-icons-outlined" style={{ fontSize: "2rem" }}>info</span> Sobre o Projeto
          </a>
          <a href="/creditos" className={tw`flex items-center gap-4 hover:underline text-xl`}>
            <span className="material-icons-outlined" style={{ fontSize: "2rem" }}>groups</span> Créditos dos Colaboradores
          </a>
          <button
            onClick={() => setShowConfirm(true)}
            className={tw`flex items-center gap-4 mt-10 text-left hover:underline text-red-300 text-xl`}
          >
            <span className="material-icons-outlined" style={{ fontSize: "2rem" }}>logout</span> Encerrar Sessão
          </button>
        </nav>

        <nav className={tw`flex flex-col gap-8 px-8 py-8 text-xl`}>
        {/* ...outros links... */}
        {isAdmin && (
          <a href="/admin" className={tw`flex items-center gap-4 hover:underline text-xl`}>
            <span className="material-icons-outlined" style={{ fontSize: "2rem" }}>admin_panel_settings</span>
            Administração
          </a>
        )}
        {/* ...outros links e botão de logout... */}
      </nav>
      </div>

      {/* Popup de confirmação */}
      {showConfirm && (
        <div className={tw`fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-[999]`}>
          <div className={tw`bg-white rounded-xl p-8 shadow-xl flex flex-col items-center`}>
            <span className={tw`text-2xl font-bold mb-4 text-green-800`}>Deseja encerrar a sessão?</span>
            <div className={tw`flex gap-6 mt-2`}>
              <button
                className={tw`bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2 rounded`}
                onClick={handleLogout}
              >
                Sim, sair
              </button>
              <button
                className={tw`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-6 py-2 rounded`}
                onClick={() => setShowConfirm(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SideMenu;