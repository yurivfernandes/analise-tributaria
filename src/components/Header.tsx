import React, { useState } from 'react';
    import { BarChart2, Menu, X } from 'lucide-react';
    import { Link, useLocation } from 'react-router-dom';

    export default function Header() {
      const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
      const location = useLocation();
      const isAuthPage = ['/login', '/signup'].includes(location.pathname);
      const isLandingPage = location.pathname === '/';

      if (isAuthPage) return null;

      return (
        <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to={isLandingPage ? "/" : "/welcome"} className="flex items-center">
                <BarChart2 className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">TaxAnalytics</span>
              </Link>
              
              <div className="hidden md:flex space-x-8">
                {!isLandingPage && (
                  <div className="relative group">
                    <button className="text-gray-600 hover:text-blue-600 transition-colors">
                      Cadastros
                    </button>
                    <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link to="/customers/new" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        Clientes
                      </Link>
                      <Link to="/cnae" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        CNAEs
                      </Link>
                    </div>
                  </div>
                )}
                <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Funcionalidades
                </a>
                <a href="#benefits" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Benefícios
                </a>
                <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Planos
                </a>
              </div>

              {isLandingPage && (
                <Link
                  to="/login"
                  className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Começar Agora
                </Link>
              )}

              <button
                className="md:hidden text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            {isMobileMenuOpen && (
              <div className="md:hidden mt-2 space-y-2">
                {!isLandingPage && (
                  <>
                    <Link to="/customers/new" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Clientes
                    </Link>
                    <Link to="/cnae" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      CNAEs
                    </Link>
                  </>
                )}
                <a href="#features" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Funcionalidades
                </a>
                <a href="#benefits" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Benefícios
                </a>
                <a href="#pricing" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Planos
                </a>
                {isLandingPage && (
                  <Link
                    to="/login"
                    className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Começar Agora
                  </Link>
                )}
              </div>
            )}
          </div>
        </header>
      );
    }
