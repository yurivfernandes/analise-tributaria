import React from 'react';
import { CheckCircle } from 'lucide-react';

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

export default function Benefits() {
  return (
    <section id="benefits" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Por que Escolher Nossa Plataforma</h2>
          <p className="mt-4 text-xl text-gray-600">
            Resultados comprovados por milhares de empresas
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-3xl font-bold text-blue-600 mb-4">{benefit.metric}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white p-8 rounded-xl shadow-sm">
          <blockquote className="text-xl italic text-gray-700">
            "A análise tributária nos ajudou a economizar mais de R$ 50.000 em impostos no primeiro ano. 
            O sistema é intuitivo e os relatórios são muito detalhados."
          </blockquote>
          <div className="mt-4">
            <p className="font-semibold">Maria Silva</p>
            <p className="text-gray-600">CEO - Tech Solutions LTDA</p>
          </div>
        </div>
      </div>
    </section>
  );
}