import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import CurrencyInput from '../components/forms/CurrencyInput';
import PhoneInput from '../components/forms/PhoneInput';

interface CustomerForm {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  annualRevenue: number;
  professionalCouncil: string;
  accountingFee: number;
  cityTax: number;
  issPerEmployee: number;
  stateTaxes: number;
}

const initialForm: CustomerForm = {
  fullName: '',
  companyName: '',
  phone: '',
  email: '',
  annualRevenue: 0,
  professionalCouncil: '',
  accountingFee: 0,
  cityTax: 0,
  issPerEmployee: 0,
  stateTaxes: 0
};

export default function CustomerRegistrationPage() {
  const [form, setForm] = useState<CustomerForm>(initialForm);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('Usuário não autenticado');

      const { error: insertError } = await supabase
        .from('customers')
        .insert([
          {
            user_id: user.id,
            full_name: form.fullName,
            company_name: form.companyName,
            phone: form.phone,
            email: form.email,
            annual_revenue: form.annualRevenue,
            professional_council: form.professionalCouncil,
            accounting_fee: form.accountingFee,
            city_tax: form.cityTax,
            iss_per_employee: form.issPerEmployee,
            state_taxes: form.stateTaxes
          }
        ]);

      if (insertError) throw insertError;

      setSuccess('Cliente cadastrado com sucesso!');
      setForm(initialForm);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao cadastrar cliente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Cadastro de Cliente</h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={e => setForm(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome da Empresa *
                </label>
                <input
                  type="text"
                  required
                  value={form.companyName}
                  onChange={e => setForm(prev => ({ ...prev, companyName: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone *
                </label>
                <PhoneInput
                  value={form.phone}
                  onChange={value => setForm(prev => ({ ...prev, phone: value }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Faturamento Anual *
                </label>
                <CurrencyInput
                  value={form.annualRevenue}
                  onChange={value => setForm(prev => ({ ...prev, annualRevenue: value }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Registro Conselho Profissional *
                </label>
                <input
                  type="text"
                  required
                  value={form.professionalCouncil}
                  onChange={e => setForm(prev => ({ ...prev, professionalCouncil: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Honorários Contábeis *
                </label>
                <CurrencyInput
                  value={form.accountingFee}
                  onChange={value => setForm(prev => ({ ...prev, accountingFee: value }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Taxa Municipal
                </label>
                <CurrencyInput
                  value={form.cityTax}
                  onChange={value => setForm(prev => ({ ...prev, cityTax: value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ISS por Funcionário - SPL
                </label>
                <CurrencyInput
                  value={form.issPerEmployee}
                  onChange={value => setForm(prev => ({ ...prev, issPerEmployee: value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Impostos Estaduais
                </label>
                <CurrencyInput
                  value={form.stateTaxes}
                  onChange={value => setForm(prev => ({ ...prev, stateTaxes: value }))}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 bg-blue-600 text-white rounded-lg transition-colors ${
                  loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
                }`}
              >
                {loading ? 'Cadastrando...' : 'Cadastrar Cliente'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}