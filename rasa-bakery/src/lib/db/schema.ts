import { sql } from 'drizzle-orm';
import { text, integer, real, sqliteTable, index, uniqueIndex } from 'drizzle-orm/sqlite-core';

// Categories
export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  displayOrder: integer('display_order').default(0),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').default(sql`(datetime('now'))`),
}, (table) => ({
  slugIdx: uniqueIndex('idx_categories_slug').on(table.slug),
}));

// Products
export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  shortDescription: text('short_description'),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  isFeatured: integer('is_featured', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').default(sql`(datetime('now'))`),
}, (table) => ({
  slugIdx: uniqueIndex('idx_products_slug').on(table.slug),
  activeIdx: index('idx_products_active').on(table.isActive),
  featuredIdx: index('idx_products_featured').on(table.isFeatured),
}));

// Product Prices
export const productPrices = sqliteTable('product_prices', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  productId: integer('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  weight: text('weight').notNull(),
  weightLabel: text('weight_label').notNull(),
  price: real('price').notNull(),
  currency: text('currency').default('HKD'),
}, (table) => ({
  productIdx: index('idx_product_prices_product').on(table.productId),
}));

// Product Categories (many-to-many)
export const productCategories = sqliteTable('product_categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  productId: integer('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  categoryId: integer('category_id').notNull().references(() => categories.id, { onDelete: 'cascade' }),
}, (table) => ({
  productIdx: index('idx_product_categories_product').on(table.productId),
  categoryIdx: index('idx_product_categories_category').on(table.categoryId),
}));

// Product Images
export const productImages = sqliteTable('product_images', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  productId: integer('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  r2Key: text('r2_key'),
  isPrimary: integer('is_primary', { mode: 'boolean' }).default(false),
  displayOrder: integer('display_order').default(0),
  createdAt: text('created_at').default(sql`(datetime('now'))`),
}, (table) => ({
  productIdx: index('idx_product_images_product').on(table.productId),
}));

// Tags
export const tags = sqliteTable('tags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
});

// Product Tags (many-to-many)
export const productTags = sqliteTable('product_tags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  productId: integer('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  tagId: integer('tag_id').notNull().references(() => tags.id, { onDelete: 'cascade' }),
});

// Admin Users
export const adminUsers = sqliteTable('admin_users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: text('name'),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').default(sql`(datetime('now'))`),
});

// Admin Sessions
export const adminSessions = sqliteTable('admin_sessions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  token: text('token').notNull().unique(),
  userId: integer('user_id').notNull().references(() => adminUsers.id, { onDelete: 'cascade' }),
  expiresAt: text('expires_at').notNull(),
  createdAt: text('created_at').default(sql`(datetime('now'))`),
}, (table) => ({
  tokenIdx: uniqueIndex('idx_admin_sessions_token').on(table.token),
  expiresIdx: index('idx_admin_sessions_expires').on(table.expiresAt),
}));

// Types
export type Category = typeof categories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type ProductPrice = typeof productPrices.$inferSelect;
export type ProductImage = typeof productImages.$inferSelect;
export type Tag = typeof tags.$inferSelect;
export type AdminUser = typeof adminUsers.$inferSelect;
