import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Básico',
    price: 'R$ 97',
    period: '/mês',
    features: [
      'Análise básica de CNAE',
      'Relatório simplificado',
      'Suporte por email',
      'Acesso à plataforma web'
    ],
    highlighted: false
  },
  {
    name: 'Profissional',
    price: 'R$ 197',
    period: '/mês',
    features: [
      'Análise avançada de CNAE',
      'Relatórios detalhados',
      'Suporte prioritário',
      'Simulações ilimitadas',
      'Consultoria mensal'
    ],
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: 'R$ 497',
    period: '/mês',
    features: [
      'Análise completa multiempresas',
      'Relatórios personalizados',
      'Suporte 24/7',
      'API de integração',
      'Consultoria semanal',
      'Treinamento da equipe'
    ],
    highlighted: false
  }
];

const Pricing = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Planos</h2>
        <div className="text-center mb-12">
          <p className="text-xl text-gray-600">Escolha o melhor plano para sua empresa</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`p-8 rounded-lg ${
                plan.highlighted 
                  ? 'bg-blue-600 text-white scale-105 shadow-xl' 
                  : 'bg-white text-gray-900 shadow'
              }`}
            >
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-sm">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <Check className="w-5 h-5 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                className={`w-full py-3 rounded-lg font-semibold ${
                  plan.highlighted
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Selecionar Plano
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
