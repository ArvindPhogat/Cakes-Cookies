import { Header, Footer, Hero, CategoryTabs } from '@/components/layout';
import { ProductGrid, Product } from '@/components/products';
import { Sparkles, Truck, Award, Clock } from 'lucide-react';

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

async function getProducts(): Promise<Product[]> {
  // In production, this would fetch from /api/products
  return mockProducts;
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <Hero />

      {/* Features Section */}
      <section className="bg-neutral-50 py-12 border-y border-neutral-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <FeatureItem
              icon={<Truck className="w-6 h-6" />}
              title="Free Delivery"
              description="On orders above HKD 500"
            />
            <FeatureItem
              icon={<Clock className="w-6 h-6" />}
              title="Same Day Delivery"
              description="Order before 2 PM"
            />
            <FeatureItem
              icon={<Award className="w-6 h-6" />}
              title="Premium Quality"
              description="100% fresh ingredients"
            />
            <FeatureItem
              icon={<Sparkles className="w-6 h-6" />}
              title="Custom Designs"
              description="Personalized for you"
            />
          </div>
        </div>
      </section>

      <main className="flex-1">
        {/* Products Section */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-medium rounded-full mb-4">
              Our Collection
            </span>
            <h2 className="section-title">Featured Cakes</h2>
            <p className="section-subtitle">
              Discover our handcrafted selection of premium cakes
            </p>
          </div>

          <CategoryTabs />

          <div className="mt-10">
            <ProductGrid products={products} />
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <a
              href="/all-cakes"
              className="btn btn-secondary"
            >
              View All Cakes
            </a>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-neutral-900 text-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-1.5 bg-white/10 text-white text-sm font-medium rounded-full mb-6">
                  Why Choose Us
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
                  Crafted with Love,<br />
                  <span className="text-primary-400">Delivered with Care</span>
                </h2>
                <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
                  Every cake we create is a masterpiece of flavor and design. Using only the finest
                  ingredients and time-honored techniques, we bring your sweetest dreams to life.
                </p>
                <ul className="space-y-4">
                  <ListItem>Freshly baked with premium ingredients</ListItem>
                  <ListItem>Custom designs for any occasion</ListItem>
                  <ListItem>Same-day delivery available</ListItem>
                  <ListItem>100% satisfaction guaranteed</ListItem>
                </ul>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary-600/20 to-gold-500/20 rounded-3xl overflow-hidden">
                  <img
                    src="/RasmalaiCake.png"
                    alt="Premium Cake"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white text-neutral-900 p-6 rounded-2xl shadow-elegant">
                  <div className="font-display text-3xl font-semibold">5000+</div>
                  <div className="text-neutral-500 text-sm">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function FeatureItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-white shadow-soft flex items-center justify-center text-neutral-700 mb-3">
        {icon}
      </div>
      <h3 className="font-semibold text-neutral-900 text-sm mb-1">{title}</h3>
      <p className="text-neutral-500 text-xs">{description}</p>
    </div>
  );
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3 text-neutral-300">
      <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
      {children}
    </li>
  );
}
