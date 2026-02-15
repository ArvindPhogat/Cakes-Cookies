'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardBody } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, FolderTree, Plus, TrendingUp } from 'lucide-react';

interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  featuredProducts: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalCategories: 0,
    featuredProducts: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        // Fetch products and categories
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories'),
        ]);

        const products = await productsRes.json();
        const categories = await categoriesRes.json();

        setStats({
          totalProducts: Array.isArray(products) ? products.length : 0,
          totalCategories: Array.isArray(categories) ? categories.length : 0,
          featuredProducts: Array.isArray(products)
            ? products.filter((p: any) => p.isFeatured).length
            : 0,
        });
      } catch (error) {
        console.error('Failed to load stats:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-dark">Dashboard</h1>
          <p className="text-text-secondary">
            Welcome back to Rasa Essence Admin
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button variant="primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={Package}
          color="rose"
          href="/admin/products"
          isLoading={isLoading}
        />
        <StatCard
          title="Categories"
          value={stats.totalCategories}
          icon={FolderTree}
          color="pink"
          href="/admin/categories"
          isLoading={isLoading}
        />
        <StatCard
          title="Featured Products"
          value={stats.featuredProducts}
          icon={TrendingUp}
          color="coral"
          isLoading={isLoading}
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardBody>
          <h2 className="text-lg font-semibold text-text-dark mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickAction
              href="/admin/products/new"
              icon={Plus}
              label="Add Product"
            />
            <QuickAction
              href="/admin/products"
              icon={Package}
              label="Manage Products"
            />
            <QuickAction
              href="/admin/categories"
              icon={FolderTree}
              label="Manage Categories"
            />
            <QuickAction
              href="/"
              icon={TrendingUp}
              label="View Site"
              external
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  color: 'rose' | 'pink' | 'coral';
  href?: string;
  isLoading?: boolean;
}

function StatCard({
  title,
  value,
  icon: Icon,
  color,
  href,
  isLoading,
}: StatCardProps) {
  const colorClasses = {
    rose: 'bg-brand-rose/10 text-brand-rose',
    pink: 'bg-brand-pink/10 text-brand-pink',
    coral: 'bg-brand-coral/10 text-brand-coral',
  };

  const content = (
    <Card className="hover:shadow-lg transition-shadow">
      <CardBody className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-text-secondary">{title}</p>
          <p className="text-2xl font-bold text-text-dark">
            {isLoading ? '...' : value}
          </p>
        </div>
      </CardBody>
    </Card>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

interface QuickActionProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  external?: boolean;
}

function QuickAction({ href, icon: Icon, label, external }: QuickActionProps) {
  const Component = external ? 'a' : Link;
  const extraProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Component
      href={href}
      {...extraProps}
      className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:border-brand-rose hover:bg-brand-rose/5 transition-colors"
    >
      <Icon className="w-6 h-6 text-brand-rose" />
      <span className="text-sm font-medium text-text-dark">{label}</span>
    </Component>
  );
}
