import React from 'react';
import { maskPhone } from '../../lib/masks';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
}

export default function PhoneInput({
  value,
  onChange,
  required = false,
  className = ''
}: PhoneInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = maskPhone(e.target.value);
    onChange(maskedValue);
  };

  return (
    <input
      type="tel"
      value={value}
      onChange={handleChange}
      required={required}
      placeholder="(00) 00000-0000"
      className={`w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
}
