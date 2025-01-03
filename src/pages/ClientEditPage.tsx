import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CurrencyInput from '../components/forms/CurrencyInput';
import PhoneInput from '../components/forms/PhoneInput';
import Header from '../components/Header';

interface Partner {
  fullName: string;
  proLabore: number;
  dependents: number;
  irToPay: number;
  irToRefund: number;
  inssOtherSource: number;
}

interface CNAE {
  id: string;
  descricao: string;
}

interface Customer {
  id: string;
  fullName: string;
  registrationType: 'individual' | 'company';
  companyName: string;
  phone: string;
  email: string;
  annualRevenue: number;
  professionalCouncil: string;
  accountingFee: number;
  cityTax: number;
  issPerEmployee: number;
  stateTaxes: number;
  inssAutonomo: number;
  irToPay: number;
  irToRefund: number;
  irCarneLeao: number;
  monthlySalary: number;
  dependentsLivroCaixa: number;
  issqn: number;
  status: 'active' | 'inactive';
  cnaeCode: string;
  partners: Partner[];
}

const initialForm: Customer = {
  id: '',
  fullName: '',
  registrationType: 'individual',
  companyName: '',
  phone: '',
  email: '',
  annualRevenue: 0,
  professionalCouncil: '',
  accountingFee: 0,
  cityTax: 0,
  issPerEmployee: 0,
  stateTaxes: 0,
  inssAutonomo: 0,
  irToPay: 0,
  irToRefund: 0,
  irCarneLeao: 0,
  monthlySalary: 0,
  dependentsLivroCaixa: 0,
  issqn: 0,
  status: 'active',
  cnaeCode: '',
  partners: []
};

export default function ClientEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<Customer>(initialForm);
  const [cnaes, setCNAEs] = useState<CNAE[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (id) {
      fetchCustomer(id);
    }
    fetchCNAEs();
  }, [id]);

  const fetchCustomer = async (customerId: string) => {
    try {
      const response = await fetch(`/api/customers/${customerId}`);
      if (!response.ok) throw new Error('Falha ao carregar cliente');
      const data = await response.json();
      setForm(data);
    } catch (err) {
      setError('Erro ao carregar dados do cliente');
      console.error(err);
    }
  };

  const fetchCNAEs = async () => {
    try {
      const response = await fetch('https://servicodados.ibge.gov.br/api/v2/cnae/classes');
      if (!response.ok) throw new Error('Failed to fetch CNAE data');
      const data = await response.json();
      setCNAEs(data);
    } catch (err) {
      console.error('Erro ao carregar CNAEs', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch(`/api/customers/${form.id || ''}`, {
        method: form.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) throw new Error('Falha ao salvar cliente');

      setSuccess('Cliente salvo com sucesso!');
      navigate('/customers');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar cliente');
    } finally {
      setLoading(false);
    }
  };

  const filteredCNAEs = cnaes.filter(
    (cnae) =>
      cnae.id.toLowerCase().includes(form.cnaeCode.toLowerCase()) ||
      cnae.descricao.toLowerCase().includes(form.cnaeCode.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">{id ? 'Editar Cliente' : 'Adicionar Cliente'}</h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={e => setForm(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Cadastro *
                </label>
                <select
                  value={form.registrationType}
                  onChange={e => setForm(prev => ({ ...prev, registrationType: e.target.value as 'individual' | 'company' }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="individual">Pessoa Física</option>
                  <option value="company">Pessoa Jurídica</option>
                </select>
              </div>

              {form.registrationType === 'company' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome da Empresa *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.companyName}
                    onChange={e => setForm(prev => ({ ...prev, companyName: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone *
                </label>
                <PhoneInput
                  value={form.phone}
                  onChange={value => setForm(prev => ({ ...prev, phone: value }))}
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Conselho Profissional *
                </label>
                <input
                  type="text"
                  required
                  value={form.professionalCouncil}
                  onChange={e => setForm(prev => ({ ...prev, professionalCouncil: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CNAE
                </label>
                <input
                  type="text"
                  placeholder="Digite o código ou descrição..."
                  value={form.cnaeCode}
                  onChange={(e) => setForm(prev => ({ ...prev, cnaeCode: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {filteredCNAEs.length > 0 && (
                  <ul className="border border-gray-300 rounded-lg mt-2 max-h-40 overflow-y-auto">
                    {filteredCNAEs.map((cnae) => (
                      <li
                        key={cnae.id}
                        onClick={() => setForm(prev => ({ ...prev, cnaeCode: cnae.id }))}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        {cnae.id} - {cnae.descricao}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Taxa Municipal
                </label>
                <CurrencyInput
                  value={form.cityTax}
                  onChange={value => setForm(prev => ({ ...prev, cityTax: value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ISS por Funcionário
                </label>
                <CurrencyInput
                  value={form.issPerEmployee}
                  onChange={value => setForm(prev => ({ ...prev, issPerEmployee: value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Impostos Estaduais
                </label>
                <CurrencyInput
                  value={form.stateTaxes}
                  onChange={value => setForm(prev => ({ ...prev, stateTaxes: value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status *
                </label>
                <select
                  value={form.status}
                  onChange={e => setForm(prev => ({ ...prev, status: e.target.value as 'active' | 'inactive' }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
              </div>
            </div>

            {form.registrationType === 'individual' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Informações Adicionais (Pessoa Física)</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      INSS Autônomo
                    </label>
                    <CurrencyInput
                      value={form.inssAutonomo}
                      onChange={value => setForm(prev => ({ ...prev, inssAutonomo: value }))}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      IR a Pagar
                    </label>
                    <CurrencyInput
                      value={form.irToPay}
                      onChange={value => setForm(prev => ({ ...prev, irToPay: value }))}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      IR a Restituir
                    </label>
                    <CurrencyInput
                      value={form.irToRefund}
                      onChange={value => setForm(prev => ({ ...prev, irToRefund: value }))}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      IR Carnê Leão
                    </label>
                    <CurrencyInput
                      value={form.irCarneLeao}
                      onChange={value => setForm(prev => ({ ...prev, irCarneLeao: value }))}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salário Mensal
                    </label>
                    <CurrencyInput
                      value={form.monthlySalary}
                      onChange={value => setForm(prev => ({ ...prev, monthlySalary: value }))}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dependentes no Livro Caixa
                    </label>
                    <input
                      type="number"
                      value={form.dependentsLivroCaixa}
                      onChange={e => setForm(prev => ({ ...prev, dependentsLivroCaixa: parseInt(e.target.value, 10) || 0 }))}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ISSQN
                    </label>
                    <CurrencyInput
                      value={form.issqn}
                      onChange={value => setForm(prev => ({ ...prev, issqn: value }))}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {form.registrationType === 'company' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Informações dos Sócios</h2>
                {form.partners.map((partner, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        value={partner.fullName}
                        onChange={e => updatePartner(index, 'fullName', e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pro-labore
                      </label>
                      <CurrencyInput
                        value={partner.proLabore}
                        onChange={value => updatePartner(index, 'proLabore', value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dependentes
                      </label>
                      <input
                        type="number"
                        value={partner.dependents}
                        onChange={e => updatePartner(index, 'dependents', parseInt(e.target.value, 10) || 0)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        IR a Pagar (Sócio)
                      </label>
                      <CurrencyInput
                        value={partner.irToPay}
                        onChange={value => updatePartner(index, 'irToPay', value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        IR a Restituir (Sócio)
                      </label>
                      <CurrencyInput
                        value={partner.irToRefund}
                        onChange={value => updatePartner(index, 'irToRefund', value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        INSS de Outra Fonte
                      </label>
                      <CurrencyInput
                        value={partner.inssOtherSource}
                        onChange={value => updatePartner(index, 'inssOtherSource', value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => removePartner(index)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        Remover Sócio
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addPartner}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Adicionar Sócio
                </button>
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/customers/new')}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 bg-blue-600 text-white rounded-lg transition-colors ${
                  loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
                }`}
              >
                {form.id ? 'Salvar Alterações' : 'Criar Cliente'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
