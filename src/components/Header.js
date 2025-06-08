import React, { useState } from "react";
import SideMenu from "./SideMenu";

function Header({ tw }) {

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
    </header>
    <SideMenu tw={tw} open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

export default Header;