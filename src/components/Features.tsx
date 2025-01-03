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

const Features = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Recursos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
                <Icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
