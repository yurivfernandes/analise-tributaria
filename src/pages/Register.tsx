import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/auth';
import { Github, Google } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    cep: '',
    isAdmin: false
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    try {
      await auth.loginWithSocial(provider);
      navigate('/dashboard');
    } catch (err: any) {
      setError(`Erro no login com ${provider}: ${err.message}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validações
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('Campos obrigatórios não preenchidos.');
      return;
    }

    // Validação de CEP (formato: 00000-000)
    const cepRegex = /^\d{5}-?\d{3}$/;
    if (!cepRegex.test(formData.cep)) {
      setError('CEP inválido');
      return;
    }

    // Validação de telefone (formato: (00) 00000-0000)
    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Telefone inválido');
      return;
    }

    try {
      await auth.register({
        ...formData,
        isAdmin: formData.email === 'admin@sistema.com' && formData.password === 'admin123'
      });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
          Criar Conta
        </h2>

        {/* Botões de login social */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => handleSocialLogin('google')}
            className="flex-1 flex items-center justify-center gap-2 p-2 border rounded-md hover:bg-gray-50"
          >
            <Google className="w-5 h-5" />
            Google
          </button>
          <button
            onClick={() => handleSocialLogin('github')}
            className="flex-1 flex items-center justify-center gap-2 p-2 border rounded-md hover:bg-gray-50"
          >
            <Github className="w-5 h-5" />
            Github
          </button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Ou continue com</span>
          </div>
        </div>

        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Telefone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="(00) 00000-0000"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>

          <div>
            <label htmlFor="cep" className="block text-sm font-medium text-gray-700">
              CEP
            </label>
            <input
              id="cep"
              name="cep"
              type="text"
              placeholder="00000-000"
              value={formData.cep}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Criar Conta
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
