import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">Análise Tributária</Link>
          <div>
            <Link to="/login" className="px-4 py-2 rounded bg-blue-600 text-white">Login</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
