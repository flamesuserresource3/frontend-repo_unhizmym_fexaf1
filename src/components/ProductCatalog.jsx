import { Search, Plus } from 'lucide-react';
import { useMemo } from 'react';

export default function ProductCatalog({ products, query, setQuery, onAdd }) {
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) =>
      [p.name, p.sku].some((v) => String(v).toLowerCase().includes(q))
    );
  }, [products, query]);

  return (
    <section className="flex flex-col h-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products, SKU..."
          className="w-full pl-10 pr-3 py-2 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        />
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 overflow-auto pr-1">
        {filtered.map((p) => (
          <button
            key={p.id}
            onClick={() => onAdd(p)}
            className="group rounded-lg border bg-white hover:shadow transition text-left p-3 flex flex-col"
          >
            <div className="flex-1">
              <div className="font-medium leading-tight line-clamp-2">{p.name}</div>
              <div className="text-xs text-gray-500 mt-1">SKU: {p.sku}</div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-semibold">${p.price.toFixed(2)}</span>
              <span className="text-xs text-gray-500">Stock: {p.stock}</span>
            </div>
            <div className="mt-2 inline-flex items-center gap-1 text-emerald-700 text-sm">
              <Plus className="h-4 w-4" /> Add
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-10">
            No products found
          </div>
        )}
      </div>
    </section>
  );
}
