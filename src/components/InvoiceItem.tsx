import React, { ChangeEvent } from "react";

interface InvoiceItemProps {
  id: string;
  name: string;
  qty: number;
  price: string;
  onDeleteItem: (id: string) => void;
  onEdtiItem: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InvoiceItem: React.FC<InvoiceItemProps> = ({
  id,
  name,
  qty,
  price,
  onDeleteItem,
  onEdtiItem,
}) => {
  return (
    <tr className="border-b border-gray-900/10 text-sm md:text-base">
      <td>
        <input
          className="w-full"
          type="text"
          name="name"
          id={id}
          value={name}
          onChange={onEdtiItem}
          required
        />
      </td>
      <td>
        <input
          className="w-full text-center"
          type="number"
          name="qty"
          id={id}
          value={qty}
          min="1"
          onChange={onEdtiItem}
          required
        />
      </td>
      <td>
      {/* fix me later */}
        {/* <input
          className="w-full text-center"
          type="number"
          name="price"
          id={id}
          value={price}
          step="0.01"
          min="0.01"
          onChange={onEdtiItem}
          required
        /> */}
        <input
          className="w-full text-center"
          type="number"
          name="price"
          id={id}
          value={price}
          step="0.01"
          min="0.01"
          onChange={onEdtiItem}
          required
        />
      </td>
      <td className="text-center">
        <button
          type="button"
          className="text-red-500 hover:text-red-700"
          onClick={() => onDeleteItem(id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default InvoiceItem;
