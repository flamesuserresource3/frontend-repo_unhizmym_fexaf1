import { ShoppingCart } from 'lucide-react';

export default function HeaderBar() {
  return (
    <header className="w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-md bg-emerald-600 text-white grid place-items-center shadow">
            <ShoppingCart className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">SwiftPOS</h1>
            <p className="text-xs text-gray-500">Fast, simple point of sale</p>
          </div>
        </div>
        <div className="text-xs text-gray-500 hidden sm:block">
          {new Date().toLocaleString()}
        </div>
      </div>
    </header>
  );
}
