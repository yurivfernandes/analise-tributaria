import React from 'react';
import { Search } from 'lucide-react';

interface CNAEFilters {
  search: string;
  field: string;
}

interface CNAEFiltersProps {
  filters: CNAEFilters;
  onChange: (filters: CNAEFilters) => void;
}

const FILTER_FIELDS = [
  { value: 'codigo', label: 'Código' },
  { value: 'denominacao', label: 'Denominação' },
  { value: 'secao', label: 'Seção' },
  { value: 'divisao', label: 'Divisão' },
  { value: 'grupo', label: 'Grupo' },
  { value: 'classe', label: 'Classe' },
  { value: 'subclasse', label: 'Subclasse' },
];

export default function CNAEFilters({ filters, onChange }: CNAEFiltersProps) {
  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Pesquisar CNAEs..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <select
        value={filters.field}
        onChange={(e) => onChange({ ...filters, field: e.target.value })}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {FILTER_FIELDS.map((field) => (
          <option key={field.value} value={field.value}>
            Filtrar por {field.label}
          </option>
        ))}
      </select>
    </div>
  );
}
