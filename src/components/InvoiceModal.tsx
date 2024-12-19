import React from "react";
import { jsPDF } from "jspdf";

interface Item {
  id: string;
  name: string;
  qty: number;
  price: any;
}

interface InvoiceInfo {
  invoiceNumber: any;
  cashierName: string;
  customerName: string;
  subtotal: number;
  discountRate: number;
  taxRate: number;
  total: number;
}

interface InvoiceModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  invoiceInfo: InvoiceInfo;
  items: Item[];
  onAddNextInvoice: () => void;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  setIsOpen,
  invoiceInfo,
  items,
  onAddNextInvoice,
}) => {
  const closeModal = () => setIsOpen(false);

  const addNextInvoiceHandler = () => {
    setIsOpen(false);
    onAddNextInvoice();
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add Title - Invoice
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Invoice", 105, 20, { align: "center" });

    // Invoice Details Section
    doc.setFontSize(12);
    doc.text(`Invoice Number: ${invoiceInfo.invoiceNumber}`, 20, 40);
    doc.text(`Cashier: ${invoiceInfo.cashierName}`, 20, 50);
    doc.text(`Customer: ${invoiceInfo.customerName}`, 20, 60);

    // Line separator
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(20, 65, 190, 65); // Horizontal line

    // Table Header for Items
    let yOffset = 75;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    
    doc.text("ITEM", 20, yOffset);
    doc.text("QTY", 80, yOffset);
    doc.text("PRICE", 140, yOffset);
    doc.text("AMOUNT", 180, yOffset);

    // Line separator
    yOffset += 8;
    doc.setLineWidth(0.2);
    doc.line(20, yOffset, 190, yOffset);

    // Table Rows for Items
    yOffset += 8;
    doc.setFont("helvetica", "normal");
    items.forEach((item) => {
      const price = parseFloat(item.price);  // Ensure it's treated as a number
      const amount = (price * item.qty).toFixed(2);  // Result is a number with two decimals

      // Render item details with ₹ symbol
      doc.text(item.name, 20, yOffset);
      doc.text(item.qty.toString(), 80, yOffset);
      doc.text(`${price.toFixed(2)}`, 140, yOffset);
      doc.text(`${amount}`, 180, yOffset);

      yOffset += 8;
    });

    // Line separator after items
    doc.setLineWidth(0.5);
    doc.line(20, yOffset, 190, yOffset);

    // Totals Section
    yOffset += 10;

    doc.setFont("helvetica", "bold");
    doc.text(`Subtotal: ${invoiceInfo.subtotal.toFixed(2)}`, 20, yOffset);
    yOffset += 8;
    doc.text(`Discount: ${invoiceInfo.discountRate.toFixed(2)}`, 20, yOffset);
    yOffset += 8;
    // fix me later
    // doc.text(`Tax: ${invoiceInfo.taxRate.toFixed(2)}`, 20, yOffset);
    // yOffset += 8;
    doc.text(`Total: ${invoiceInfo.total.toFixed(2)}`, 20, yOffset);

    // Save the PDF
    doc.save(`invoice-${invoiceInfo.invoiceNumber}.pdf`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-md">
        <h1 className="text-center text-lg font-bold text-gray-900">Invoice</h1>

        <div className="mt-4">
          <div className="mb-4 grid grid-cols-2">
            <span className="font-bold">Invoice Number:</span>
            <span>{invoiceInfo.invoiceNumber}</span>
            <span className="font-bold">Cashier:</span>
            <span>{invoiceInfo.cashierName}</span>
            <span className="font-bold">Customer:</span>
            <span>{invoiceInfo.customerName}</span>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="border-y border-black/10 text-sm md:text-base">
                <th>ITEM</th>
                <th className="text-center">QTY</th>
                <th className="text-right">PRICE</th>
                <th className="text-right">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const price = parseFloat(item.price) || 0;
                const amount = (price * item.qty).toFixed(2);

                return (
                  <tr key={item.id}>
                    <td className="w-full">{item.name}</td>
                    <td className="min-w-[50px] text-center">{item.qty}</td>
                    <td className="min-w-[80px] text-right">₹{price.toFixed(2)}</td>
                    <td className="min-w-[90px] text-right">₹{amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="mt-4 flex flex-col items-end space-y-2">
            <div className="flex w-full justify-between border-t border-black/10 pt-2">
              <span className="font-bold">Subtotal:</span>
              <span>₹{invoiceInfo.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex w-full justify-between">
              <span className="font-bold">Discount:</span>
              <span>₹{invoiceInfo.discountRate.toFixed(2)}</span>
            </div>
            <div className="flex w-full justify-between">
              <span className="font-bold">Tax:</span>
              <span>₹{invoiceInfo.taxRate.toFixed(2)}</span>
            </div>
            <div className="flex w-full justify-between border-t border-black/10 py-2">
              <span className="font-bold">Total:</span>
              <span className="font-bold">₹{invoiceInfo.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex space-x-2 px-4 pb-6">
          <button
            onClick={generatePDF}
            className="w-full bg-blue-500 text-white py-2 rounded-md"
          >
            Download PDF
          </button>

          <button
            onClick={addNextInvoiceHandler}
            className="flex w-full items-center justify-center space-x-1 rounded-md bg-green-500 py-2 text-sm text-white shadow-sm hover:bg-green-600"
          >
            <span>Next</span>
          </button>
        </div>

        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-xl font-bold text-gray-600"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default InvoiceModal;


