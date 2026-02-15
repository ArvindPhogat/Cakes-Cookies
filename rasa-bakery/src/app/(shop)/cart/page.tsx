'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, ArrowRight } from 'lucide-react';

interface CartItem {
  id: number;
  productId: number;
  name: string;
  image: string;
  weight: string;
  weightLabel: string;
  price: number;
  quantity: number;
  currency: string;
}

export default function CartPage() {
  // Mock cart data - will be replaced with actual cart state management
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      productId: 1,
      name: 'Money Plant Designer Cake',
      image: '/MoneyPlantCake.png',
      weight: '1',
      weightLabel: '1 kg',
      price: 500,
      quantity: 1,
      currency: 'HKD',
    },
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const isEmpty = cartItems.length === 0;

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-5 py-8">
          <h1 className="text-3xl font-bold text-text-dark mb-8 flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-brand-rose" />
            Your Cart
          </h1>

          {isEmpty ? (
            <div className="text-center py-16">
              <ShoppingCart className="w-16 h-16 text-text-muted mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-text-dark mb-2">
                Your cart is empty
              </h2>
              <p className="text-text-secondary mb-6">
                Looks like you haven&apos;t added anything to your cart yet.
              </p>
              <Link href="/">
                <Button variant="primary">Start Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-md p-4 flex gap-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-text-dark">
                        {item.name}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        {item.weightLabel}
                      </p>
                      <p className="text-brand-pink font-bold mt-1">
                        {item.currency} {item.price}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-text-muted hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <div className="flex items-center border border-border-soft rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 hover:bg-gray-100 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-gray-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                  <h2 className="text-xl font-bold text-text-dark mb-4">
                    Order Summary
                  </h2>
                  <div className="space-y-3 border-b border-gray-100 pb-4 mb-4">
                    <div className="flex justify-between text-text-secondary">
                      <span>Subtotal</span>
                      <span>HKD {subtotal}</span>
                    </div>
                    <div className="flex justify-between text-text-secondary">
                      <span>Delivery</span>
                      <span>Free</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-text-dark mb-6">
                    <span>Total</span>
                    <span className="text-brand-pink">HKD {subtotal}</span>
                  </div>
                  <Button variant="primary" size="lg" className="w-full">
                    Checkout
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
