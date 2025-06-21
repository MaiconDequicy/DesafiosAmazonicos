import React, { useState } from "react";
import SideMenu from "./SideMenu";

function Header({ tw, nomeUsuario }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className={tw`bg-green-700 text-white flex items-center px-8 py-4 rounded-b-lg shadow-md`}>
        {/* Ícone menu à esquerda */}
        <button
          className={tw`text-2x1 cursor-pointer mr-4`}
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir Menu"
        >
          &#9776;
        </button>
        {/* Título centralizado ocupando todo o espaço */}
        <span className={tw`flex-1 text-4xl font-bold text-center`}>Desafios Amazônicos</span>
        {/* Usuário no canto direito */}
        {nomeUsuario && (
          <div className={tw`flex items-center gap-2 ml-4`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={tw`h-7 w-7 text-white`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 20c0-4 4-7 8-7s8 3 8 7" />
            </svg>
            <span className={tw`text-white font-semibold`}>{nomeUsuario}</span>
          </div>
        )}
      </header>
      <SideMenu tw={tw} open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

export default Header;