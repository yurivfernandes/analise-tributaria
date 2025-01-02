import React from 'react';
import { BarChart2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  if (isAuthPage) return null;

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <BarChart2 className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">TaxAnalytics</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
              Funcionalidades
            </a>
            <a href="#benefits" className="text-gray-600 hover:text-blue-600 transition-colors">
              Benefícios
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">
              Planos
            </a>
          </nav>

          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Começar Agora
          </Link>
        </div>
      </div>
    </header>
  );
}