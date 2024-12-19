import React, { ChangeEvent } from 'react';

interface InvoiceFieldProps {
  onEditItem: (event: ChangeEvent<HTMLInputElement>) => void;
  cellData: {
    className?: string;
    type: string;
    placeholder?: string;
    min?: string | number;
    max?: string | number;
    step?: string | number;
    name: string;
    id: string;
    value: string | number;
  };
}

const InvoiceField: React.FC<InvoiceFieldProps> = ({ onEditItem, cellData }) => {
  return (
    <input
      className={cellData.className}
      type={cellData.type}
      placeholder={cellData.placeholder}
      min={cellData.min}
      max={cellData.max}
      step={cellData.step}
      name={cellData.name}
      id={cellData.id}
      value={cellData.value}
      onChange={onEditItem}
      required
    />
  );
};

export default InvoiceField;
