import React from 'react';
import CNAETable from '../components/cnae/CNAETable';
import CNAEHeader from '../components/cnae/CNAEHeader';
import CNAEFilters from '../components/cnae/CNAEFilters';
import { useCNAE } from '../hooks/useCNAE';

export default function CNAEPage() {
  const {
    cnaes,
    loading,
    error,
    filters,
    setFilters,
    handleUpdateCNAEs,
    lastUpdate,
    updateStatus,
  } = useCNAE();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CNAEHeader 
          onUpdate={handleUpdateCNAEs}
          lastUpdate={lastUpdate}
          loading={loading}
          updateStatus={updateStatus}
        />
        
        <CNAEFilters filters={filters} onChange={setFilters} />
        
        <CNAETable 
          data={cnaes}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}
