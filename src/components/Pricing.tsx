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

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Planos e Preços</h2>
          <p className="mt-4 text-xl text-gray-600">
            Escolha o plano ideal para seu negócio
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`
                rounded-xl p-8 
                ${plan.highlighted 
                  ? 'bg-blue-600 text-white ring-4 ring-blue-600 ring-opacity-50 scale-105' 
                  : 'bg-white text-gray-900 border border-gray-200'}
              `}
            >
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className={plan.highlighted ? 'text-blue-100' : 'text-gray-500'}>
                  {plan.period}
                </span>
              </div>
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <Check className={`h-5 w-5 ${plan.highlighted ? 'text-blue-200' : 'text-blue-600'} mr-2`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`
                  mt-8 w-full py-3 px-6 rounded-lg font-semibold
                  ${plan.highlighted 
                    ? 'bg-white text-blue-600 hover:bg-gray-50' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'}
                  transition-colors
                `}
              >
                Começar Agora
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}