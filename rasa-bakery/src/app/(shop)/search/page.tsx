'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header, Footer, CategoryTabs } from '@/components/layout';
import { ProductGrid, Product } from '@/components/products';
import { Search, Loader2 } from 'lucide-react';

// Mock data - will be replaced with API call
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Money Plant Designer Cake',
    slug: 'money-plant-designer-cake',
    image: '/MoneyPlantCake.png',
    prices: [
      { weight: '0.5', weightLabel: '1/2 kg', price: 250, currency: 'HKD' },
      { weight: '1', weightLabel: '1 kg', price: 500, currency: 'HKD' },
      { weight: '2', weightLabel: '2 kg', price: 1200, currency: 'HKD' },
    ],
    isNew: true,
  },
  {
    id: 2,
    name: 'Rasmalai Cream Cake',
    slug: 'rasmalai-cream-cake',
    image: '/RasmalaiCake.png',
    prices: [
      { weight: '0.5', weightLabel: '1/2 kg', price: 250, currency: 'HKD' },
      { weight: '1', weightLabel: '1 kg', price: 500, currency: 'HKD' },
      { weight: '2', weightLabel: '2 kg', price: 1200, currency: 'HKD' },
    ],
    isBestseller: true,
  },
  {
    id: 3,
    name: 'Red Velvet Vanilla Cake',
    slug: 'red-velvet-vanilla-cake',
    image: '/RedVanillaCake.png',
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
    prices: [
      { weight: '0.5', weightLabel: '1/2 kg', price: 250, currency: 'HKD' },
      { weight: '1', weightLabel: '1 kg', price: 500, currency: 'HKD' },
      { weight: '2', weightLabel: '2 kg', price: 1200, currency: 'HKD' },
    ],
    isBestseller: true,
  },
];

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  // Filter products by search query
  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header searchTerm={query} />
      <main className="flex-1">
        {/* Search Header */}
        <section className="bg-gradient-to-br from-neutral-50 via-white to-neutral-50 py-12">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-3 text-neutral-600 mb-4">
              <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
            </div>
            {query ? (
              <>
                <h1 className="section-title">
                  Search results for &quot;{query}&quot;
                </h1>
                <p className="section-subtitle">
                  {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                </p>
              </>
            ) : (
              <>
                <h1 className="section-title">Search Products</h1>
                <p className="section-subtitle">
                  Enter a search term to find products
                </p>
              </>
            )}
          </div>
        </section>

        {/* Products Section */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <CategoryTabs />

          <div className="mt-10">
            <ProductGrid
              products={filteredProducts}
              emptyMessage={
                query
                  ? `No products found matching "${query}"`
                  : 'Start typing to search for products'
              }
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function SearchFallback() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-neutral-500">Loading search results...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchResults />
    </Suspense>
  );
}
