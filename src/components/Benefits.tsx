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
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Benefícios</h2>
        <div className="text-center">
          <p className="text-xl">Otimize seus processos tributários</p>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
