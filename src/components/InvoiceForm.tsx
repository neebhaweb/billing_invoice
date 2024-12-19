import React, { useState, FormEvent, ChangeEvent } from "react";
import { uid } from "uid";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";
import incrementString from "../helper/incrementString";

const today = new Date().toLocaleDateString("en-GB", {
  month: "numeric",
  day: "numeric",
  year: "numeric",
});

interface Item {
  id: string;
  name: string;
  qty: number;
  price: string;
}

const InvoiceForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [discount, setDiscount] = useState<string>("");
  const [tax, setTax] = useState<string>("");
  const [invoiceNumber, setInvoiceNumber] = useState<number>(1);
  const [cashierName, setCashierName] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [items, setItems] = useState<Item[]>([
    {
      id: uid(6),
      name: "",
      qty: 1,
      price: "1.00",
    },
  ]);

  const reviewInvoiceHandler = (event: FormEvent) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const addNextInvoiceHandler = () => {
    // setInvoiceNumber((prevNumber) => incrementString(prevNumber));
    const incrementedNumber = incrementString(invoiceNumber.toString());
    setInvoiceNumber(Number(incrementedNumber));
    setItems([
      {
        id: uid(6),
        name: "",
        qty: 1,
        price: "1.00",
      },
    ]);
  };

  const addItemHandler = () => {
    setItems((prevItem) => [
      ...prevItem,
      {
        id: uid(6),
        name: "",
        qty: 1,
        price: "1.00",
      },
    ]);
  };

  const deleteItemHandler = (id: string) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };

  const edtiItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, name, value } = event.target;

    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, [name]: value };
      }
      return item;
    });

    setItems(newItems);
  };

  const subtotal = items.reduce((prev, curr) => {
    if (curr.name.trim().length > 0)
      return prev + Number(curr.price) * Math.floor(curr.qty);
    else return prev;
  }, 0);

  const taxRate = (Number(tax) * subtotal) / 100;
  const discountRate = (Number(discount) * subtotal) / 100;
  const total = subtotal - discountRate + taxRate;

  return (
    <form
      className="relative flex flex-col px-2 md:flex-row"
      onSubmit={reviewInvoiceHandler}
    >
      <div className="my-6 flex-1 space-y-2 rounded-md bg-white p-4 shadow-sm sm:space-y-4 md:p-6">
        <div className="flex flex-col justify-between space-y-2 border-b border-gray-900/10 pb-4 md:flex-row md:items-center md:space-y-0">
          <div className="flex space-x-2">
            <span className="font-bold">Current Date: </span>
            <span>{today}</span>
          </div>
          <div className="flex items-center space-x-2">
            <label className="font-bold" htmlFor="invoiceNumber">
              Invoice Number:
            </label>
            <input
              required
              className="max-w-[130px]"
              type="number"
              name="invoiceNumber"
              id="invoiceNumber"
              min="1"
              step="1"
              value={invoiceNumber}
              onChange={(event) => setInvoiceNumber(Number(event.target.value))}
            />
          </div>
        </div>
        <h1 className="text-center text-lg font-bold">INVOICE</h1>
        <div className="grid grid-cols-2 gap-2 pt-4 pb-8">
          <label
            htmlFor="cashierName"
            className="text-sm font-bold sm:text-base"
          >
            Cashier:
          </label>
          <input
            required
            className="flex-1"
            placeholder="Cashier name"
            type="text"
            name="cashierName"
            id="cashierName"
            value={cashierName}
            onChange={(event) => setCashierName(event.target.value)}
          />
          <label
            htmlFor="customerName"
            className="col-start-2 row-start-1 text-sm font-bold md:text-base"
          >
            Customer:
          </label>
          <input
            required
            className="flex-1"
            placeholder="Customer name"
            type="text"
            name="customerName"
            id="customerName"
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
          />
        </div>
        <table className="w-full p-4 text-left">
          <thead>
            <tr className="border-b border-gray-900/10 text-sm md:text-base">
              <th>ITEM</th>
              <th>QTY</th>
              <th className="text-center">PRICE</th>
              <th className="text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <InvoiceItem
                key={item.id}
                id={item.id}
                name={item.name}
                qty={item.qty}
                price={item.price}
                onDeleteItem={deleteItemHandler}
                onEdtiItem={edtiItemHandler}
              />
            ))}
          </tbody>
        </table>
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
          type="button"
          onClick={addItemHandler}
        >
          Add Item
        </button>
        <div className="flex flex-col items-end space-y-2 pt-6">
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Subtotal:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Discount:</span>
            <span>
              ({discount || "0"}%) ₹{discountRate.toFixed(2)}
            </span>
          </div>
          {/* <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Tax:</span>
            <span>
              ({tax || "0"}%) ₹{taxRate.toFixed(2)}
            </span>
          </div> */}
          <div className="flex w-full justify-between border-t border-gray-900/10 pt-2 md:w-1/2">
            <span className="font-bold">Total:</span>
            <span className="font-bold">
            ₹{total % 1 === 0 ? total : total.toFixed(2)}
            </span>
          </div>
          <div className="flex w-full justify-between border-t border-black/10 py-2">
            <span className="font-bold">Total:</span>
            <span className="font-bold">
              ₹{total % 1 === 0 ? total : total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      <div className="basis-1/4 bg-transparent">
        <div className="sticky top-0 z-10 space-y-4 divide-y divide-gray-900/10 pb-8 md:pt-6 md:pl-4">
          <button
            className="w-full rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
            type="submit"
          >
            Review Invoice
          </button>
          <InvoiceModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            invoiceInfo={{
              invoiceNumber,
              cashierName,
              customerName,
              subtotal,
              taxRate,
              discountRate,
              total,
            }}
            items={items}
            onAddNextInvoice={addNextInvoiceHandler}
          />
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="flex flex-col">
                <span>Discount %</span>
                <input
                  className="max-w-[130px]"
                  type="number"
                  name="discount"
                  id="discount"
                  min="0"
                  value={discount}
                  onChange={(event) => setDiscount(event.target.value)}
                />
              </label>
              {/* fix me later */}
              {/* <label className="flex flex-col">
                <span>Tax %</span>
                <input
                  className="max-w-[130px]"
                  type="number"
                  name="tax"
                  id="tax"
                  min="0"
                  value={tax}
                  onChange={(event) => setTax(event.target.value)}
                />
              </label> */}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default InvoiceForm;
