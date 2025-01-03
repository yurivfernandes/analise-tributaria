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
        <div className="text-center">
          <p className="text-xl">Escolha o melhor plano para sua empresa</p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
