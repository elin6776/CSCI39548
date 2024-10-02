CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_path VARCHAR(255),
    category VARCHAR(50),
    availability_status ENUM('In Stock', 'Out of Stock') DEFAULT 'In Stock',
    rating DECIMAL(2, 1),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, description, price, image_path, category, availability_status, rating) VALUES
('Candle 1', 'A beautiful scented candle', 19.99, 'public\images\one.png', 'Scented', 'In Stock', 4.5),
('Candle 2', 'A floral candle', 29.99, 'public\images\foral.png', 'Scented', 'Out of Stock', NULL),
('Candle 3', 'An elegant candle', 39.99, 'public\images\two.png', 'Scented', 'In Stock', NULL),
('Candle 4', 'Round-shaped candle', 49.99, 'public\images\round.png', 'Beeswax', 'In Stock', NULL),
('Candle 5', 'An aromatic candle', 49.99, 'public\images\o.png', 'Unscented', 'Out of Stock', 4.5),
('Candle 6', 'Cinnamon-scented candle', 49.99, 'public\images\cinammon.png', 'Scented', 'In Stock', NULL),
('Candle 7', 'A lovely candle', 49.99, 'public\images\beageniice.png', 'Soy', 'In Stock', 4.5),
('Candle 8', 'Lavender-scented candle', 49.99, 'public\images\lavendar.png', 'Scented', 'In Stock', 3.5),
('Candle 9', 'Leaf-shaped candle', 49.99, 'public\images\leaf.png', 'Beeswax', 'In Stock', NULL),
('Candle 10', 'A floral candle', 49.99, 'public\images\foral2.png', 'Scented', 'In Stock', NULL),
('Candle 11', 'Ridged candle', 49.99, 'public\images\ridges.png', 'Unscented', 'Out of Stock', NULL),
('Candle 12', 'Pink candle', 49.99, 'public\images\pink.png', 'Soy', 'In Stock', 4.5);
SELECT * FROM products;