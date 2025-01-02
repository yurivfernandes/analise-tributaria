import React from 'react';
import { Calculator, Shield, TrendingUp, FileText } from 'lucide-react';

const features = [
  {
    icon: Calculator,
    title: 'Análise CNAE',
    description: 'Análise detalhada baseada no seu código CNAE para determinar o melhor regime tributário'
  },
  {
    icon: Shield,
    title: 'Conformidade Fiscal',
    description: 'Garantia de conformidade com todas as obrigações fiscais e tributárias'
  },
  {
    icon: TrendingUp,
    title: 'Projeções Financeiras',
    description: 'Simulações e projeções de economia baseadas em diferentes cenários tributários'
  },
  {
    icon: FileText,
    title: 'Relatórios Detalhados',
    description: 'Relatórios completos com análises e recomendações personalizadas'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Como Funciona</h2>
          <p className="mt-4 text-xl text-gray-600">
            Sistema inteligente que analisa seu perfil empresarial
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <feature.icon className="h-12 w-12 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}