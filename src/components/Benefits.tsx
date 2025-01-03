import React from 'react';

const benefits = [
  {
    title: 'Economia Comprovada',
    description: 'Média de 32% de economia em impostos para nossos clientes',
    metric: '32%'
  },
  {
    title: 'Análise Rápida',
    description: 'Resultados completos em menos de 5 minutos',
    metric: '5min'
  },
  {
    title: 'Empresas Atendidas',
    description: 'Mais de 10.000 empresas já utilizaram nossa plataforma',
    metric: '10k+'
  },
  {
    title: 'Satisfação Garantida',
    description: 'Taxa de satisfação dos clientes com o serviço',
    metric: '98%'
  }
];

const Benefits = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Por que escolher nossa plataforma?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition">
              <div className="text-4xl font-bold text-blue-600 mb-4">{benefit.metric}</div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
