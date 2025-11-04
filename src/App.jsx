import { useMemo, useState } from 'react';
import HeaderBar from './components/HeaderBar';
import ProductCatalog from './components/ProductCatalog';
import CartTable from './components/CartTable';
import CheckoutPanel from './components/CheckoutPanel';

const initialProducts = [
  { id: 'p1', name: 'Colombian Coffee Beans 1kg', sku: 'CF-CO-1KG', price: 16.99, stock: 24 },
  { id: 'p2', name: 'Organic Green Tea Box', sku: 'TE-GR-ORG', price: 8.5, stock: 48 },
  { id: 'p3', name: 'Almond Milk 1L', sku: 'ML-AL-1L', price: 3.29, stock: 36 },
  { id: 'p4', name: 'Dark Chocolate 70%', sku: 'CH-70-100', price: 2.49, stock: 60 },
  { id: 'p5', name: 'Fresh Baguette', sku: 'BR-BA-FR', price: 1.99, stock: 20 },
  { id: 'p6', name: 'Sparkling Water 500ml', sku: 'WA-SP-500', price: 1.2, stock: 100 },
  { id: 'p7', name: 'Granola Crunch 400g', sku: 'BR-GR-400', price: 4.75, stock: 18 },
  { id: 'p8', name: 'Free-range Eggs (12)', sku: 'EG-12-FR', price: 3.99, stock: 32 },
];

export default function App() {
  const [products] = useState(initialProducts);
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState([]); // {id, name, price, qty}

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  };

  const increaseQty = (id) => {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(0, i.qty - 1) } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);

  const subtotal = useMemo(() => cart.reduce((sum, i) => sum + i.price * i.qty, 0), [cart]);
  const taxRate = 0.07;
  const tax = useMemo(() => subtotal * taxRate, [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    // Simulate successful checkout
    alert(`Sale completed. Total charged: $${total.toFixed(2)}`);
    clearCart();
  };

  const handlePrint = () => {
    if (cart.length === 0) return;
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50 text-gray-900">
      <HeaderBar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 xl:col-span-8">
          <ProductCatalog
            products={products}
            query={query}
            setQuery={setQuery}
            onAdd={addToCart}
          />
        </div>

        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
          <CartTable
            items={cart}
            onIncrease={increaseQty}
            onDecrease={decreaseQty}
            onRemove={removeItem}
            onClear={clearCart}
          />

          <CheckoutPanel
            subtotal={subtotal}
            tax={tax}
            total={total}
            onCheckout={handleCheckout}
            onPrint={handlePrint}
            disabled={cart.length === 0}
          />
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-gray-500">
        SwiftPOS demo • Tax rate set to 7% for illustration
      </footer>
    </div>
  );
}
