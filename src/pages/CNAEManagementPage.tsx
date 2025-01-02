import React, { useState, useEffect } from 'react';
    import Header from '../components/Header';

    interface CNAE {
      id: string;
      descricao: string;
    }

    export default function CNAEManagementPage() {
      const [cnaes, setCNAEs] = useState<CNAE[]>([]);
      const [error, setError] = useState('');
      const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage, setItemsPerPage] = useState(50);
      const [searchTerm, setSearchTerm] = useState('');

      useEffect(() => {
        fetchCNAEs();
      }, []);

      const fetchCNAEs = async () => {
        try {
          const response = await fetch('https://servicodados.ibge.gov.br/api/v2/cnae/classes');
          if (!response.ok) throw new Error('Failed to fetch CNAE data');
          const data = await response.json();
          setCNAEs(data);
        } catch (err) {
          setError('Erro ao carregar CNAEs');
          console.error(err);
        }
      };

      const filteredCNAEs = cnaes.filter(
        (cnae) =>
          cnae.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cnae.descricao.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = filteredCNAEs.slice(indexOfFirstItem, indexOfLastItem);

      const totalPages = Math.ceil(filteredCNAEs.length / itemsPerPage);

      const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
      };

      const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPageButtons = 5;
        const halfMaxPageButtons = Math.floor(maxPageButtons / 2);

        let startPage = Math.max(currentPage - halfMaxPageButtons, 1);
        let endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

        if (endPage - startPage < maxPageButtons - 1) {
          startPage = Math.max(endPage - maxPageButtons + 1, 1);
        }

        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={`px-2 py-1 rounded focus:outline-none ${
                currentPage === i
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              {i}
            </button>
          );
        }

        return pageNumbers;
      };

      return (
        <div className="min-h-screen bg-gray-100">
          <Header />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-2xl font-semibold text-blue-600 mb-6 text-center">CNAE Registrations</h1>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                placeholder="Pesquisar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[10, 20, 50, 100, 150].map((number) => (
                  <option key={number} value={number}>
                    {number} por página
                  </option>
                ))}
              </select>
            </div>

            <div className="overflow-hidden shadow-md rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Código
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Denominação
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((cnae) => (
                    <tr key={cnae.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{cnae.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{cnae.descricao}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-8 space-x-1">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="px-2 py-1 rounded bg-gray-300 text-gray-700 hover:bg-gray-400"
              >
                &laquo;
              </button>
              {renderPageNumbers()}
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 rounded bg-gray-300 text-gray-700 hover:bg-gray-400"
              >
                &raquo;
              </button>
            </div>
          </div>
        </div>
      );
    }
