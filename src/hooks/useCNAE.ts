import { useState, useEffect, useCallback } from 'react';
import { CNAE } from '../types/cnae';
import { supabase } from '../lib/supabase';

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

      let query = supabase
        .from('cnaes')
        .select('*')
        .order('codigo', { ascending: true });

      if (filters.search) {
        query = query.ilike(filters.field, `%${filters.search}%`);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      setCNAEs(data || []);
      
      // Buscar última atualização
      const { data: logData } = await supabase
        .from('cnae_logs')
        .select('data')
        .eq('status', 'success')
        .order('data', { ascending: false })
        .limit(1);

      if (logData?.[0]) {
        setLastUpdate(logData[0].data);
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
      
      // Simular chamada à API externa
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Registrar log
      const { error: logError } = await supabase
        .from('cnae_logs')
        .insert([
          {
            data: new Date().toISOString(),
            status: 'success',
            mensagem: 'CNAEs atualizados com sucesso'
          }
        ]);

      if (logError) throw logError;

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