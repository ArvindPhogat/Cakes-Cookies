'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImageUploader } from './ImageUploader';
import { Save, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface Price {
  weight: string;
  weightLabel: string;
  price: number;
  currency: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface ProductFormProps {
  productId?: number;
}

interface ProductData {
  name?: string;
  description?: string;
  shortDescription?: string;
  prices?: Price[];
  categoryIds?: number[];
  images?: Array<{ url: string } | string>;
  isFeatured?: boolean;
  isActive?: boolean;
}

export function ProductForm({ productId }: ProductFormProps) {
  const router = useRouter();
  const isEditing = !!productId;

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [prices, setPrices] = useState<Price[]>([
    { weight: '0.5', weightLabel: '1/2 kg', price: 250, currency: 'HKD' },
    { weight: '1', weightLabel: '1 kg', price: 500, currency: 'HKD' },
    { weight: '2', weightLabel: '2 kg', price: 1200, currency: 'HKD' },
  ]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);

  // Load categories
  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data);
      })
      .catch(console.error);
  }, []);

  // Load product if editing
  useEffect(() => {
    if (productId) {
      setIsLoading(true);
      fetch(`/api/products/${productId}`)
        .then((res) => res.json() as Promise<ProductData>)
        .then((data) => {
          setName(data.name || '');
          setDescription(data.description || '');
          setShortDescription(data.shortDescription || '');
          setPrices(
            data.prices && data.prices.length > 0
              ? data.prices
              : [{ weight: '0.5', weightLabel: '1/2 kg', price: 250, currency: 'HKD' }]
          );
          setSelectedCategories(data.categoryIds || []);
          setImageUrls(data.images?.map((i) => typeof i === 'string' ? i : i.url) || []);
          setIsFeatured(data.isFeatured || false);
          setIsActive(data.isActive !== false);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const payload = {
        name,
        description,
        shortDescription,
        prices,
        categoryIds: selectedCategories,
        imageUrls,
        isFeatured,
        isActive,
      };

      const url = isEditing ? `/api/products/${productId}` : '/api/products';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin/products');
        router.refresh();
      } else {
        const errorData = await res.json() as { error?: string };
        alert(errorData.error || 'Failed to save product');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save product');
    } finally {
      setIsSaving(false);
    }
  };

  const updatePrice = (index: number, field: keyof Price, value: string | number) => {
    const newPrices = [...prices];
    newPrices[index] = { ...newPrices[index], [field]: value };
    setPrices(newPrices);
  };

  const addPrice = () => {
    setPrices([...prices, { weight: '', weightLabel: '', price: 0, currency: 'HKD' }]);
  };

  const removePrice = (index: number) => {
    setPrices(prices.filter((_, i) => i !== index));
  };

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products">
            <Button type="button" variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-text-dark">
              {isEditing ? 'Edit Product' : 'Add Product'}
            </h1>
          </div>
        </div>
        <Button type="submit" variant="primary" disabled={isSaving}>
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Product'}
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-text-dark">Basic Information</h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-text-dark mb-1">
                  Product Name *
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Red Velvet Cake"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-dark mb-1">
                  Short Description
                </label>
                <Input
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Brief description for product cards"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-dark mb-1">
                  Full Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed product description..."
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg border border-border-soft bg-white text-text-dark focus:outline-none focus:ring-2 focus:ring-brand-pink/30 focus:border-brand-pink"
                />
              </div>
            </CardBody>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <h2 className="font-semibold text-text-dark">Pricing</h2>
              <Button type="button" variant="secondary" size="sm" onClick={addPrice}>
                <Plus className="w-4 h-4 mr-1" />
                Add Price
              </Button>
            </CardHeader>
            <CardBody className="space-y-4">
              {prices.map((price, index) => (
                <div key={index} className="flex items-end gap-3">
                  <div className="flex-1">
                    <label className="block text-sm text-text-secondary mb-1">
                      Weight
                    </label>
                    <Input
                      value={price.weight}
                      onChange={(e) => updatePrice(index, 'weight', e.target.value)}
                      placeholder="0.5"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm text-text-secondary mb-1">
                      Label
                    </label>
                    <Input
                      value={price.weightLabel}
                      onChange={(e) => updatePrice(index, 'weightLabel', e.target.value)}
                      placeholder="1/2 kg"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm text-text-secondary mb-1">
                      Price (HKD)
                    </label>
                    <Input
                      type="number"
                      value={price.price}
                      onChange={(e) => updatePrice(index, 'price', parseFloat(e.target.value) || 0)}
                      placeholder="250"
                    />
                  </div>
                  {prices.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removePrice(index)}
                      className="text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </CardBody>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-text-dark">Images</h2>
            </CardHeader>
            <CardBody>
              <ImageUploader images={imageUrls} onImagesChange={setImageUrls} />
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-text-dark">Status</h2>
            </CardHeader>
            <CardBody className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-brand-rose focus:ring-brand-rose"
                />
                <span className="text-text-dark">Active (visible on site)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-brand-rose focus:ring-brand-rose"
                />
                <span className="text-text-dark">Featured product</span>
              </label>
            </CardBody>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-text-dark">Categories</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => toggleCategory(category.id)}
                      className="w-4 h-4 rounded border-gray-300 text-brand-rose focus:ring-brand-rose"
                    />
                    <span className="text-text-dark">{category.name}</span>
                  </label>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </form>
  );
}
