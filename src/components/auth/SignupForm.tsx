import React, { useState } from 'react';
import { Mail, Lock, User, Building2, Phone, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SocialLogin from './SocialLogin';
import { signUp } from '../../lib/auth';

export default function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await signUp(formData);
      navigate('/login', { 
        state: { message: 'Cadastro realizado com sucesso! Faça login para continuar.' }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Criar Conta</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form fields remain the same */}
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors ${
            loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
        >
          {loading ? 'Criando conta...' : 'Criar Conta'}
        </button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Ou continue com</span>
          </div>
        </div>

        <SocialLogin />

        <p className="mt-6 text-center text-sm text-gray-600">
          Já tem uma conta?{' '}
          <a href="/login" className="text-blue-600 hover:text-blue-500">
            Faça login
          </a>
        </p>
      </div>
    </div>
  );
}
