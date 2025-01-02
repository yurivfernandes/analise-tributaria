import React from 'react';
import { formatCurrency, parseCurrency } from '../../lib/masks';

interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export default function CurrencyInput({
  value,
  onChange,
  required = false,
  placeholder,
  className = ''
}: CurrencyInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    const numberValue = Number(rawValue) / 100;
    onChange(numberValue);
  };

  return (
    <input
      type="text"
      value={formatCurrency(value)}
      onChange={handleChange}
      required={required}
      placeholder={placeholder}
      className={`w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
}
