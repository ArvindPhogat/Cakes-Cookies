'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { WeightSelector, WeightOption } from '@/components/products';
import { ChevronLeft, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

// Mock product data - will be replaced with API call
const mockProducts = [
  {
    id: 1,
    name: 'Money Plant Designer Cake',
    slug: 'money-plant-designer-cake',
    image: '/MoneyPlantCake.png',
    description: 'A beautiful designer cake featuring an elegant money plant decoration. Perfect for birthdays, anniversaries, and special celebrations.',
    prices: [
      { weight: '0.5', weightLabel: '1/2 kg', price: 250, currency: 'HKD' },
      { weight: '1', weightLabel: '1 kg', price: 500, currency: 'HKD' },
      { weight: '2', weightLabel: '2 kg', price: 1200, currency: 'HKD' },
    ],
  },
  {
    id: 2,
    name: 'Rasmalai Cream Cake',
    slug: 'rasmalai-cream-cake',
    image: '/RasmalaiCake.png',
    description: 'Indulge in the fusion of traditional rasmalai flavors with a modern cream cake. A unique treat for those who love Indian sweets.',
    prices: [
      { weight: '0.5', weightLabel: '1/2 kg', price: 250, currency: 'HKD' },
      { weight: '1', weightLabel: '1 kg', price: 500, currency: 'HKD' },
      { weight: '2', weightLabel: '2 kg', price: 1200, currency: 'HKD' },
    ],
  },
  {
    id: 3,
    name: 'Red Velvet Vanilla Cake',
    slug: 'red-velvet-vanilla-cake',
    image: '/RedVanillaCake.png',
    description: 'Classic red velvet meets vanilla in this stunning cake. Perfect for Valentine\'s Day and romantic celebrations.',
    prices: [
      { weight: '0.5', weightLabel: '1/2 kg', price: 250, currency: 'HKD' },
      { weight: '1', weightLabel: '1 kg', price: 500, currency: 'HKD' },
      { weight: '2', weightLabel: '2 kg', price: 1200, currency: 'HKD' },
    ],
  },
  {
    id: 4,
    name: 'Classic Vanilla Cake',
    slug: 'classic-vanilla-cake',
    image: '/VanillaCake.png',
    description: 'A timeless classic that never goes out of style. Our vanilla cake is moist, fluffy, and perfect for any occasion.',
    prices: [
      { weight: '0.5', weightLabel: '1/2 kg', price: 250, currency: 'HKD' },
      { weight: '1', weightLabel: '1 kg', price: 500, currency: 'HKD' },
      { weight: '2', weightLabel: '2 kg', price: 1200, currency: 'HKD' },
    ],
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  // Find product by slug
  const product = mockProducts.find((p) => p.slug === productId);

  const [selectedWeight, setSelectedWeight] = useState('0.5');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <>
        <Header />
        <main className="flex-1 flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-text-dark mb-4">Product Not Found</h1>
            <Link href="/">
              <Button variant="primary">Go Back Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const weightOptions: WeightOption[] = product.prices.map((p) => ({
    value: p.weight,
    label: p.weightLabel,
    price: p.price,
  }));

  const currentPrice = product.prices.find((p) => p.weight === selectedWeight);
  const totalPrice = (currentPrice?.price || 0) * quantity;

  const handleOrder = async () => {
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          quantity,
          weight: selectedWeight,
        }),
      });
      alert('Added to cart!');
    } catch (error) {
      console.error('Order failed:', error);
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-5 py-6">
          {/* Breadcrumb */}
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-text-secondary hover:text-brand-rose mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Shop
          </Link>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-text-dark mb-4">
                {product.name}
              </h1>

              <p className="text-text-secondary mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Weight Selector */}
              <div className="mb-4">
                <WeightSelector
                  id={`weight-detail-${product.id}`}
                  options={weightOptions}
                  selectedWeight={selectedWeight}
                  onWeightChange={setSelectedWeight}
                />
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <label className="text-sm text-text-secondary font-semibold">
                  Quantity
                </label>
                <div className="flex items-center border border-border-soft rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <p className="text-3xl font-bold text-brand-pink">
                  {currentPrice?.currency} {totalPrice}
                </p>
                <p className="text-sm text-text-muted">
                  {currentPrice?.weightLabel} × {quantity}
                </p>
              </div>

              {/* Add to Cart Button */}
              <Button
                variant="primary"
                size="lg"
                className="w-full md:w-auto"
                onClick={handleOrder}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
