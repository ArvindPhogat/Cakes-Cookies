'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { categories, type Category } from '@/lib/categories';

// Re-export for convenience
export { categories, type Category } from '@/lib/categories';

interface CategoryTabsProps {
  activeCategory?: string;
}

export function CategoryTabs({ activeCategory }: CategoryTabsProps) {
  const pathname = usePathname();

  const isActive = (category: Category) => {
    if (activeCategory) {
      return category.id === activeCategory;
    }
    return pathname === category.path;
  };

  return (
    <div className="relative" id="categories">
      <nav className="flex items-center justify-center gap-2 md:gap-4 py-4 overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.path}
            className={clsx(
              'relative px-5 py-2.5 text-sm font-medium rounded-full whitespace-nowrap transition-all duration-300',
              isActive(category)
                ? 'bg-neutral-900 text-white shadow-lg'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            )}
          >
            {category.label}
          </Link>
        ))}
      </nav>
      {/* Subtle gradient fade on edges for scroll indication */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none md:hidden" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden" />
    </div>
  );
}
