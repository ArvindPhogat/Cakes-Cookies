import { notFound } from 'next/navigation';
import { Header, Footer, CategoryTabs } from '@/components/layout';
import { ProductGrid, Product } from '@/components/products';
import { categories } from '@/lib/categories';

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

// Map URL slugs to category IDs
const categorySlugMap: Record<string, string> = {
  'valentine': 'valentine',
  'theme-cakes': 'theme',
  'relationship': 'relationship',
  'desserts': 'desserts',
  'birthday': 'birthday',
  'hampers': 'hampers',
  'anniversary': 'anniversary',
  'customized-cakes': 'customized',
};

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

// Dynamic route - no static generation for edge runtime
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const categoryId = categorySlugMap[categorySlug];
  const category = categories.find((c) => c.id === categoryId);

  if (!category) {
    return { title: 'Category Not Found | Rasa Essence' };
  }

  return {
    title: `${category.title} | Rasa Essence`,
    description: `Browse our ${category.label} collection. Handmade with love.`,
  };
}

async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  // In production, fetch from /api/products?category=...
  return mockProducts;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const categoryId = categorySlugMap[categorySlug];

  if (!categoryId) {
    notFound();
  }

  const category = categories.find((c) => c.id === categoryId);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(categoryId);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 py-16">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-medium rounded-full mb-4">
              {category.label}
            </span>
            <h1 className="section-title">{category.title}</h1>
            <p className="section-subtitle max-w-2xl mx-auto">
              Discover our handcrafted selection of {category.label.toLowerCase()} cakes
            </p>
          </div>
        </section>

        {/* Products Section */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <CategoryTabs activeCategory={categoryId} />

          <div className="mt-10">
            <ProductGrid
              products={products}
              emptyMessage={`No ${category.label.toLowerCase()} available at the moment.`}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
