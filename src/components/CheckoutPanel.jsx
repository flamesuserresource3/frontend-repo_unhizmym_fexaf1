import { CreditCard, Printer } from 'lucide-react';

export default function CheckoutPanel({ subtotal, tax, total, onCheckout, onPrint, disabled }) {
  return (
    <aside className="rounded-lg border bg-white p-4">
      <h3 className="text-lg font-semibold">Checkout</h3>

      <div className="mt-3 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-base pt-2 border-t">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <button
          onClick={onCheckout}
          disabled={disabled}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 text-white px-4 py-2 hover:bg-emerald-700 disabled:opacity-50"
        >
          <CreditCard className="h-5 w-5" />
          Complete Sale
        </button>
        <button
          onClick={onPrint}
          disabled={disabled}
          className="inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2 hover:bg-gray-50 disabled:opacity-50"
        >
          <Printer className="h-5 w-5" />
          Print Receipt
        </button>
      </div>

      <p className="mt-3 text-xs text-gray-500">
        Payments are simulated for demo purposes.
      </p>
    </aside>
  );
}
