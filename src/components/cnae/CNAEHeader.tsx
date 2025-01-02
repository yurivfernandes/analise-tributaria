import React from 'react';
import { RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { formatDate } from '../../utils/date';

interface CNAEHeaderProps {
  onUpdate: () => Promise<void>;
  lastUpdate: string | null;
  loading: boolean;
  updateStatus: 'idle' | 'loading' | 'success' | 'error';
}

export default function CNAEHeader({ onUpdate, lastUpdate, loading, updateStatus }: CNAEHeaderProps) {
  return (
    <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gerenciamento de CNAEs</h1>
        {lastUpdate && (
          <p className="text-sm text-gray-500 mt-1">
            Última atualização: {formatDate(lastUpdate)}
          </p>
        )}
      </div>

      <button
        onClick={onUpdate}
        disabled={loading || updateStatus === 'loading'}
        className={`
          flex items-center px-4 py-2 rounded-lg text-white
          ${loading || updateStatus === 'loading'
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'}
          transition-colors
        `}
      >
        {updateStatus === 'loading' ? (
          <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
        ) : updateStatus === 'success' ? (
          <CheckCircle className="h-5 w-5 mr-2" />
        ) : updateStatus === 'error' ? (
          <XCircle className="h-5 w-5 mr-2" />
        ) : (
          <RefreshCw className="h-5 w-5 mr-2" />
        )}
        {updateStatus === 'loading' ? 'Atualizando...' : 'Atualizar CNAEs'}
      </button>
    </div>
  );
}