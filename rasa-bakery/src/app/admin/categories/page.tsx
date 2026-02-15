'use client';

import { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Edit, Save, X, GripVertical } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  displayOrder: number;
  isActive: boolean;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to load categories:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAdd() {
    if (!newName.trim()) return;

    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName,
          description: newDescription,
          displayOrder: categories.length,
        }),
      });

      if (res.ok) {
        const category: Category = await res.json();
        setCategories([...categories, category]);
        setNewName('');
        setNewDescription('');
        setIsAdding(false);
      }
    } catch (error) {
      console.error('Failed to add category:', error);
    }
  }

  async function handleSave(id: number) {
    try {
      const res = await fetch('/api/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          name: editName,
          description: editDescription,
        }),
      });

      if (res.ok) {
        setCategories(
          categories.map((c) =>
            c.id === id
              ? { ...c, name: editName, description: editDescription }
              : c
          )
        );
        setEditingId(null);
      }
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  }

  function startEdit(category: Category) {
    setEditingId(category.id);
    setEditName(category.name);
    setEditDescription(category.description || '');
  }

  function cancelEdit() {
    setEditingId(null);
    setEditName('');
    setEditDescription('');
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-dark">Categories</h1>
          <p className="text-text-secondary">
            Manage product categories
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setIsAdding(true)}
          disabled={isAdding}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Add New Category Form */}
      {isAdding && (
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-text-dark">Add New Category</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-text-dark mb-1">
                Name *
              </label>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Category name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-dark mb-1">
                Description
              </label>
              <Input
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Optional description"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="primary" onClick={handleAdd}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="ghost" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Categories List */}
      <Card>
        <div className="divide-y">
          {isLoading ? (
            <div className="p-8 text-center text-text-muted">
              Loading categories...
            </div>
          ) : categories.length === 0 ? (
            <div className="p-8 text-center text-text-muted">
              No categories yet
            </div>
          ) : (
            categories.map((category) => (
              <div
                key={category.id}
                className="p-4 flex items-center gap-4 hover:bg-gray-50"
              >
                <GripVertical className="w-5 h-5 text-text-muted cursor-grab" />

                {editingId === category.id ? (
                  <div className="flex-1 flex items-center gap-4">
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="max-w-xs"
                    />
                    <Input
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      placeholder="Description"
                      className="max-w-md"
                    />
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleSave(category.id)}
                    >
                      <Save className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={cancelEdit}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex-1">
                      <p className="font-medium text-text-dark">
                        {category.name}
                      </p>
                      <p className="text-sm text-text-muted">
                        /{category.slug}
                        {category.description && ` - ${category.description}`}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEdit(category)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
