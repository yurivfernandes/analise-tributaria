import React from 'react';
import { BarChart2 } from 'lucide-react';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <BarChart2 className="h-20 w-20 text-blue-600 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Seja bem-vindo ao TaxAnalytics!
        </h1>
        <p className="text-xl text-gray-600">
          Sua jornada para uma gestão tributária mais inteligente começa aqui.
        </p>
      </div>
    </div>
  );
}