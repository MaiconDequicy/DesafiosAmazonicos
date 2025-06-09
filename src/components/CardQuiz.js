import React from "react";

function CardQuiz({ tw, image, title, description, questions, onStart }) {
  return (
    <div className={tw`bg-white rounded-2xl shadow p-8 flex flex-col h-full`}>
      <img
        src={image}
        alt={title}
        className={tw`w-full h-56 object-cover rounded-xl mb-6`}
      />
      <h3 className={tw`text-2xl font-bold text-green-700 mb-2`}>{title}</h3>
      <p className={tw`text-lg text-green-900 mb-4 flex-1`}>{description}</p>
      <div className={tw`flex items-center justify-between mt-auto`}>
        <span className={tw`text-green-700 text-lg`}>{questions} perguntas</span>
        <button
          className={tw`bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 rounded-lg`}
          onClick={onStart}
        >
          Iniciar Quiz
        </button>
      </div>
    </div>
  );
}

export default CardQuiz;