import { Minus, Plus, Trash2 } from 'lucide-react';

export default function CartTable({ items, onIncrease, onDecrease, onRemove, onClear }) {
  const hasItems = items.length > 0;

  return (
    <section className="flex flex-col h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Current Sale</h2>
        <button
          onClick={onClear}
          className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
          disabled={!hasItems}
        >
          Clear cart
        </button>
      </div>

      <div className="mt-3 overflow-auto border rounded-md bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-3 py-2 font-medium">Item</th>
              <th className="text-right px-3 py-2 font-medium">Price</th>
              <th className="text-center px-3 py-2 font-medium">Qty</th>
              <th className="text-right px-3 py-2 font-medium">Total</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id} className="border-t">
                <td className="px-3 py-2">{it.name}</td>
                <td className="px-3 py-2 text-right">${it.price.toFixed(2)}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onDecrease(it.id)}
                      className="h-7 w-7 rounded-md border grid place-items-center hover:bg-gray-50"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-6 text-center">{it.qty}</span>
                    <button
                      onClick={() => onIncrease(it.id)}
                      className="h-7 w-7 rounded-md border grid place-items-center hover:bg-gray-50"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </td>
                <td className="px-3 py-2 text-right">${(it.price * it.qty).toFixed(2)}</td>
                <td className="px-3 py-2 text-right">
                  <button
                    onClick={() => onRemove(it.id)}
                    className="inline-flex items-center gap-1 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {!hasItems && (
              <tr>
                <td colSpan={5} className="px-3 py-8 text-center text-gray-500">
                  Your cart is empty. Add items from the product list.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
