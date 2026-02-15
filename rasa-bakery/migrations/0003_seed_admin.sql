-- Seed initial admin user
-- Password: admin123 (SHA-256 hashed with salt)
-- Note: You should change this password after first login!

INSERT INTO admin_users (email, password_hash, name, is_active) VALUES
    ('admin@rasabakery.shop', '0123456789abcdef0123456789abcdef:8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'Admin', 1);

-- Note: The above password hash is a placeholder.
-- After deploying, use the following to generate a proper hash:
-- 1. Update this migration with a real hashed password, or
-- 2. Create an admin user through a secure setup script
