const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Rasa Bakery Backend',
    domain: 'rasabakery.shop'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('Backend running - Rasa Bakery API');
});

// API endpoint for cakes
app.get('/api/cakes', (req, res) => {
  const cakes = [
    {
      id: 1,
      name: 'Money Plant Designer Cake',
      image: '/MoneyPlantCake.png',
      categories: ['birthday', 'anniversary', 'customized'],
      tags: ['photo-cake', 'theme'],
      prices: { '0.5': 250, '1': 500, '2': 1200 }
    },
    {
      id: 2,
      name: 'Rasmalai Cream Cake',
      image: '/RasmalaiCake.png',
      categories: ['cakes', 'desserts', 'hampers'],
      tags: ['jar-cake', 'cup-cake'],
      prices: { '0.5': 250, '1': 500, '2': 1200 }
    },
    {
      id: 3,
      name: 'Red Velvet Vanilla Cake',
      image: '/RedVanillaCake.png',
      categories: ['valentine', 'theme', 'relationship'],
      tags: ['red-velvet', 'heart-shape', 'chocolate-day'],
      prices: { '0.5': 250, '1': 500, '2': 1200 }
    },
    {
      id: 4,
      name: 'Classic Vanilla Cake',
      image: '/VanillaCake.png',
      categories: ['cakes', 'birthday', 'anniversary'],
      tags: ['cup-cake'],
      prices: { '0.5': 250, '1': 500, '2': 1200 }
    }
  ];
  res.json(cakes);
});

// API endpoint for orders
app.post('/api/orders', (req, res) => {
  const { cakeId, quantity } = req.body;
  res.status(201).json({ 
    success: true,
    message: 'Order placed successfully',
    cakeId,
    quantity,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🍰 Rasa Bakery Backend running on port ${PORT}`);
  console.log(`Domain: rasabakery.shop`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
