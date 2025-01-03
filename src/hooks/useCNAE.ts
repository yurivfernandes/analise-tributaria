import { useState, useEffect, useCallback } from 'react';
import { CNAE } from '../types/cnae';

interface CNAEFilters {
  search: string;
  field: string;
}

export function useCNAE() {
  const [cnaes, setCNAEs] = useState<CNAE[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [updateStatus, setUpdateStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [filters, setFilters] = useState<CNAEFilters>({
    search: '',
    field: 'codigo'
  });

  const fetchCNAEs = useCallback(async () => {
    try {
      setLoading(true);
      setError(undefined);

      const queryParams = new URLSearchParams();
      if (filters.search) {
        queryParams.append('search', filters.search);
        queryParams.append('field', filters.field);
      }

      const response = await fetch(`/api/cnaes?${queryParams}`);
      if (!response.ok) throw new Error('Falha ao carregar CNAEs');
      const data = await response.json();
      
      setCNAEs(data.cnaes || []);
      
      // Buscar última atualização
      const logResponse = await fetch('/api/cnaes/last-update');
      if (logResponse.ok) {
        const logData = await logResponse.json();
        setLastUpdate(logData.lastUpdate);
      }
    } catch (err) {
      setError('Erro ao carregar CNAEs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const handleUpdateCNAEs = async () => {
    try {
      setUpdateStatus('loading');
      
      const response = await fetch('/api/cnaes/update', {
        method: 'POST'
      });

      if (!response.ok) throw new Error('Falha na atualização');

      setUpdateStatus('success');
      fetchCNAEs();
    } catch (err) {
      setUpdateStatus('error');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCNAEs();
  }, [fetchCNAEs]);

  return {
    cnaes,
    loading,
    error,
    filters,
    setFilters,
    handleUpdateCNAEs,
    lastUpdate,
    updateStatus
  };
}
