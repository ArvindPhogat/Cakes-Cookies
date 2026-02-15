'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';

interface HeaderProps {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
}

export function Header({ searchTerm = '', onSearchChange }: HeaderProps) {
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    onSearchChange?.(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(localSearch)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-100">
      {/* Top bar */}
      <div className="bg-neutral-900 text-white text-center py-2 text-xs tracking-wide">
        <span className="text-gold-400">Free Delivery</span> on orders above HKD 500
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 -ml-2 text-neutral-600 hover:text-neutral-900"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-4">
            <div className="relative">
              <img
                src="/logoimage.png"
                alt="Rasa Essence"
                className="h-14 w-auto object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display text-2xl font-semibold text-neutral-900 tracking-tight">
                Rasa Essence
              </h1>
              <p className="text-xs text-neutral-500 tracking-wider uppercase">
                Artisan Bakery
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/valentine" className="link link-underline text-sm font-medium">
              Valentine
            </Link>
            <Link href="/birthday" className="link link-underline text-sm font-medium">
              Birthday
            </Link>
            <Link href="/anniversary" className="link link-underline text-sm font-medium">
              Anniversary
            </Link>
            <Link href="/customized-cakes" className="link link-underline text-sm font-medium">
              Custom Cakes
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-3 text-neutral-600 hover:text-neutral-900 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account */}
            <Link
              href="/admin/login"
              className="p-3 text-neutral-600 hover:text-neutral-900 transition-colors"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-3 text-neutral-600 hover:text-neutral-900 transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary-600 text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>

        {/* Search Bar (expandable) */}
        {isSearchOpen && (
          <div className="py-4 border-t border-neutral-100 animate-slide-up">
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="search"
                  value={localSearch}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search for cakes, flavours, occasions..."
                  className="input pl-12 pr-4"
                  autoFocus
                />
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-100 animate-slide-up">
          <nav className="px-4 py-6 space-y-4">
            <Link href="/valentine" className="block text-neutral-600 hover:text-neutral-900 font-medium">
              Valentine
            </Link>
            <Link href="/birthday" className="block text-neutral-600 hover:text-neutral-900 font-medium">
              Birthday
            </Link>
            <Link href="/anniversary" className="block text-neutral-600 hover:text-neutral-900 font-medium">
              Anniversary
            </Link>
            <Link href="/customized-cakes" className="block text-neutral-600 hover:text-neutral-900 font-medium">
              Custom Cakes
            </Link>
            <Link href="/desserts" className="block text-neutral-600 hover:text-neutral-900 font-medium">
              Desserts
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
