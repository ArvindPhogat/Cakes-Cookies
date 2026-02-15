'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart } from 'lucide-react';
import { WeightSelector, WeightOption } from './WeightSelector';

export interface ProductPrice {
  weight: string;
  weightLabel: string;
  price: number;
  currency: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  image: string;
  prices: ProductPrice[];
  shortDescription?: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const weightOptions: WeightOption[] = product.prices.map((p) => ({
    value: p.weight,
    label: p.weightLabel,
    price: p.price,
  }));

  const [selectedWeight, setSelectedWeight] = useState(weightOptions[0]?.value || '0.5');

  const currentPrice = product.prices.find((p) => p.weight === selectedWeight);
  const currency = currentPrice?.currency || 'HKD';
  const price = currentPrice?.price || 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
          weight: selectedWeight,
        }),
      });
      alert('Added to cart!');
    } catch (error) {
      console.error('Order failed:', error);
    }
  };

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link href={`/product/${product.slug}`} className="block relative overflow-hidden">
        <div className="aspect-square bg-neutral-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="badge badge-new">New</span>
          )}
          {product.isBestseller && (
            <span className="badge badge-gold">Bestseller</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className={clsx(
            'absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
            isWishlisted
              ? 'bg-primary-600 text-white'
              : 'bg-white/90 text-neutral-600 hover:bg-white hover:text-primary-600'
          )}
        >
          <Heart className={clsx('w-5 h-5', isWishlisted && 'fill-current')} />
        </button>

        {/* Quick Add Overlay */}
        <div
          className={clsx(
            'absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
        >
          <button
            onClick={handleAddToCart}
            className="w-full py-3 bg-white text-neutral-900 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-neutral-100 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-display text-lg font-semibold text-neutral-900 mb-3 line-clamp-2 hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Weight Selector */}
        <div className="mb-4">
          <WeightSelector
            id={`weight-${product.id}`}
            options={weightOptions}
            selectedWeight={selectedWeight}
            onWeightChange={setSelectedWeight}
          />
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-neutral-500">{currency}</span>
            <span className="text-2xl font-semibold text-neutral-900 ml-1">{price}</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="p-3 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function clsx(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
