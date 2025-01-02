import React from 'react';
    import { Link } from 'react-router-dom';
    import Header from '../components/Header';
    import { UserPlus, FileText, BarChart } from 'lucide-react';

    export default function WelcomePage() {
      return (
        <div className="min-h-screen bg-gray-50">
          <Header />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Bem-vindo ao TaxAnalytics</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link to="/customers/new" className="group block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-center h-16 w-16 bg-blue-100 rounded-full mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <UserPlus className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 text-center">Cadastro de Clientes</h2>
                <p className="text-gray-600 text-center mt-2">Gerencie e registre novos clientes de forma eficiente.</p>
              </Link>

              <Link to="/cnae" className="group block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-center h-16 w-16 bg-green-100 rounded-full mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 text-center">Cadastro de CNAE</h2>
                <p className="text-gray-600 text-center mt-2">Acesse e atualize informações de CNAE facilmente.</p>
              </Link>

              <Link to="/reports" className="group block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-center h-16 w-16 bg-yellow-100 rounded-full mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <BarChart className="h-8 w-8 text-yellow-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 text-center">Relatórios</h2>
                <p className="text-gray-600 text-center mt-2">Visualize relatórios detalhados e insights.</p>
              </Link>
            </div>
          </div>
        </div>
      );
    }
