import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Reduza seus Impostos de Forma Legal e Segura
          </h1>
          <p className="text-xl mb-8">
            Nossa plataforma analisa automaticamente o melhor regime tributário para sua empresa, 
            proporcionando economia média de 32% em impostos.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition">
              Começar Análise Gratuita
            </button>
            <button className="px-8 py-3 border-2 border-white rounded-lg font-semibold hover:bg-white/10 transition flex items-center">
              Agendar Demonstração <ArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
