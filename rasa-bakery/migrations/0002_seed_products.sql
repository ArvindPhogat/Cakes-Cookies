-- Seed initial products from existing data

-- Product 1: Money Plant Designer Cake
INSERT INTO products (name, slug, description, short_description, is_active, is_featured) VALUES
    ('Money Plant Designer Cake', 'money-plant-designer-cake', 'A beautiful designer cake featuring an elegant money plant decoration. Perfect for birthdays, anniversaries, and special celebrations.', 'Elegant designer cake with money plant decoration', 1, 1);

INSERT INTO product_prices (product_id, weight, weight_label, price, currency) VALUES
    (1, '0.5', '1/2 kg', 250, 'HKD'),
    (1, '1', '1 kg', 500, 'HKD'),
    (1, '2', '2 kg', 1200, 'HKD');

INSERT INTO product_categories (product_id, category_id) VALUES
    (1, 5), -- Birthday
    (1, 7), -- Anniversary
    (1, 8); -- Customized

INSERT INTO product_images (product_id, url, is_primary) VALUES
    (1, '/MoneyPlantCake.png', 1);

-- Product 2: Rasmalai Cream Cake
INSERT INTO products (name, slug, description, short_description, is_active, is_featured) VALUES
    ('Rasmalai Cream Cake', 'rasmalai-cream-cake', 'Indulge in the fusion of traditional rasmalai flavors with a modern cream cake. A unique treat for those who love Indian sweets.', 'Fusion of rasmalai flavors with cream cake', 1, 0);

INSERT INTO product_prices (product_id, weight, weight_label, price, currency) VALUES
    (2, '0.5', '1/2 kg', 250, 'HKD'),
    (2, '1', '1 kg', 500, 'HKD'),
    (2, '2', '2 kg', 1200, 'HKD');

INSERT INTO product_categories (product_id, category_id) VALUES
    (2, 4), -- Desserts
    (2, 6); -- Hampers

INSERT INTO product_images (product_id, url, is_primary) VALUES
    (2, '/RasmalaiCake.png', 1);

-- Product 3: Red Velvet Vanilla Cake
INSERT INTO products (name, slug, description, short_description, is_active, is_featured) VALUES
    ('Red Velvet Vanilla Cake', 'red-velvet-vanilla-cake', 'Classic red velvet meets vanilla in this stunning cake. Perfect for Valentine''s Day and romantic celebrations.', 'Classic red velvet and vanilla combination', 1, 1);

INSERT INTO product_prices (product_id, weight, weight_label, price, currency) VALUES
    (3, '0.5', '1/2 kg', 250, 'HKD'),
    (3, '1', '1 kg', 500, 'HKD'),
    (3, '2', '2 kg', 1200, 'HKD');

INSERT INTO product_categories (product_id, category_id) VALUES
    (3, 1), -- Valentine
    (3, 2), -- Theme Cakes
    (3, 3); -- Relationship

INSERT INTO product_images (product_id, url, is_primary) VALUES
    (3, '/RedVanillaCake.png', 1);

INSERT INTO product_tags (product_id, tag_id) VALUES
    (3, 5), -- Red Velvet
    (3, 6), -- Heart Shape
    (3, 7); -- Chocolate Day

-- Product 4: Classic Vanilla Cake
INSERT INTO products (name, slug, description, short_description, is_active, is_featured) VALUES
    ('Classic Vanilla Cake', 'classic-vanilla-cake', 'A timeless classic that never goes out of style. Our vanilla cake is moist, fluffy, and perfect for any occasion.', 'Timeless classic vanilla cake', 1, 0);

INSERT INTO product_prices (product_id, weight, weight_label, price, currency) VALUES
    (4, '0.5', '1/2 kg', 250, 'HKD'),
    (4, '1', '1 kg', 500, 'HKD'),
    (4, '2', '2 kg', 1200, 'HKD');

INSERT INTO product_categories (product_id, category_id) VALUES
    (4, 5), -- Birthday
    (4, 7); -- Anniversary

INSERT INTO product_images (product_id, url, is_primary) VALUES
    (4, '/VanillaCake.png', 1);

INSERT INTO product_tags (product_id, tag_id) VALUES
    (4, 4); -- Cup Cake
