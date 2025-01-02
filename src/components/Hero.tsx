import React from 'react';

export default function Hero() {
  return (
    <section className="pt-32 pb-24 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Descubra o Regime Tributário
            <span className="block text-blue-600">Ideal para sua Empresa</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Otimize sua carga tributária e mantenha-se em conformidade com a legislação.
            Nossa análise inteligente baseada em CNAE garante a melhor estratégia fiscal.
          </p>
          <div className="mt-10">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
              Fazer Análise Gratuita
            </button>
            <p className="mt-4 text-sm text-gray-500">Não é necessário cartão de crédito</p>
          </div>
        </div>
      </div>
    </section>
  );
}