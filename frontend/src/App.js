import React, { useEffect, useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';

function Header({ searchTerm, onSearchChange }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <img src="/logoimage.png" alt="Rasa Essence Logo" className="logo" />
          <div className="brand-text">
            <h1 className="brand-name">Rasa Essence</h1>
            <p className="brand-tagline">Crafted with love by Seema Dabas</p>
          </div>
        </div>
        <div className="header-center">
          <form className="search" onSubmit={(event) => event.preventDefault()}>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search for cakes, occasion, flavour and more..."
              aria-label="Search cakes"
            />
            <button type="submit">Search</button>
          </form>
        </div>
        <div className="header-right">
          <a className="header-link" href="#track">Track Order</a>
          <a className="header-link" href="#cart">Cart</a>
          <a className="header-link" href="#login">Login/Signup</a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <h1>Rasa Shop — Cakes & Cookies</h1>
        <p>Handmade cakes, fast delivery. Fresh flavors every day.</p>
      </div>
    </section>
  );
}

const categories = [
  { id: 'valentine', label: 'Valentine', path: '/valentine', title: "Valentine's Day Cakes" },
  { id: 'theme', label: 'Theme Cakes', path: '/theme-cakes', title: 'Theme Cakes' },
  { id: 'relationship', label: 'By Relationship', path: '/relationship', title: 'Relationship Cakes' },
  { id: 'desserts', label: 'Desserts', path: '/desserts', title: 'Desserts' },
  { id: 'birthday', label: 'Birthday', path: '/birthday', title: 'Birthday Cakes' },
  { id: 'hampers', label: 'Hampers', path: '/hampers', title: 'Hampers' },
  { id: 'anniversary', label: 'Anniversary', path: '/anniversary', title: 'Anniversary Cakes' },
  { id: 'customized', label: 'Customized Cakes', path: '/customized-cakes', title: 'Customized Cakes' }
];


function CategoryTabs() {
  return (
    <nav className="category-tabs">
      {categories.map((category) => (
        <NavLink
          key={category.id}
          to={category.path}
          className={({ isActive }) =>
            isActive ? 'category-tab active' : 'category-tab'
          }
        >
          {category.label}
        </NavLink>
      ))}
    </nav>
  );
}

function BestsellerCard({ item }) {
  const [weight, setWeight] = useState('0.5');
  const price = item.prices[weight];

  return (
    <div className="card">
      <img src={item.image} alt={item.name} />
      <div className="card-body">
        <h4>{item.name}</h4>
        <div className="card-row">
          <label className="weight-label" htmlFor={`weight-${item.id}`}>Weight</label>
          <select
            id={`weight-${item.id}`}
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
          >
            <option value="0.5">1/2 kg</option>
            <option value="1">1 kg</option>
            <option value="2">2 kg</option>
          </select>
        </div>
        <p className="price">HKD {price}</p>
        <button
          onClick={() => fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cakeId: item.id, quantity: 1, weight })
          })}
        >
          Order
        </button>
      </div>
    </div>
  );
}

function CategorySection({ query, categoryId }) {
  const [items, setItems] = useState([]);
  const selectedTag = 'all';

  const activeCategory = categoryId || 'valentine';

  useEffect(() => {
    let isMounted = true;

    fetch('/api/cakes')
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {
          setItems(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setItems([]);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredItems = items.filter((item) => {
    const matchesCategory = (item.categories || []).includes(activeCategory);
    const matchesTag = selectedTag === 'all' || (item.tags || []).includes(selectedTag);
    const matchesQuery =
      normalizedQuery.length === 0 ||
      item.name.toLowerCase().includes(normalizedQuery) ||
      (item.tags || []).some((tag) => tag.includes(normalizedQuery));

    return matchesCategory && matchesTag && matchesQuery;
  });

  const activeCategoryTitle =
    categories.find((category) => category.id === activeCategory)?.title || 'Cakes';

  return (
    <section id="categories" className="category-section">
      <CategoryTabs />
      <h2 className="category-title">{activeCategoryTitle}</h2>
      <div className="grid">
        {filteredItems.map(it => <BestsellerCard key={it.id} item={it} />)}
      </div>
      {query.trim().length > 0 && filteredItems.length === 0 && (
        <p className="empty-state">No matching items found.</p>
      )}
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <h3>Subscribe to our newsletter</h3>
        <form className="newsletter" onSubmit={(event) => event.preventDefault()}>
          <input
            type="email"
            placeholder="Enter Email Address"
            aria-label="Email address"
          />
          <button type="submit" aria-label="Submit email">Send</button>
        </form>
      </div>
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">Rasa Essence</div>
          <p className="footer-year">© {new Date().getFullYear()}</p>
          <div className="footer-social">
            <a href="#fb" aria-label="Facebook">FB</a>
            <a href="#ig" aria-label="Instagram">IG</a>
            <a href="#x" aria-label="X">X</a>
            <a href="#in" aria-label="LinkedIn">IN</a>
            <a href="#yt" aria-label="YouTube">YT</a>
          </div>
        </div>
        <div className="footer-columns">
          <div className="footer-column">
            <h4>Know Us</h4>
            <a href="#story">Our Story</a>
            <a href="#contact">Contact Us</a>
            <a href="#locate">Locate Us</a>
            <a href="#blog">Blog</a>
            <a href="#media">Media</a>
            <a href="#careers">Careers</a>
          </div>
          <div className="footer-column">
            <h4>Need Help</h4>
            <a href="#faq">FAQ</a>
            <a href="#cancellation">Cancellation And Refund</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms And Conditions</a>
            <a href="#grievance">Customer Grievance</a>
            <a href="#sitemap">Sitemap</a>
          </div>
          <div className="footer-column">
            <h4>More Info</h4>
            <a href="#corporate">Corporate Cakes</a>
            <a href="#coupons">Coupons & Offers</a>
            <a href="#app">Download App</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function CategoryPage({ query, categoryId }) {
  return <CategorySection query={query} categoryId={categoryId} />;
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <BrowserRouter>
      <div className="App">
        <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <main>
                  <CategorySection query={searchTerm} categoryId="valentine" />
                </main>
              </>
            }
          />
          <Route
            path="/valentine"
            element={
              <main>
                <CategoryPage query={searchTerm} categoryId="valentine" />
              </main>
            }
          />
          <Route
            path="/theme-cakes"
            element={
              <main>
                <CategoryPage query={searchTerm} categoryId="theme" />
              </main>
            }
          />
          <Route
            path="/desserts"
            element={
              <main>
                <CategoryPage query={searchTerm} categoryId="desserts" />
              </main>
            }
          />
          <Route
            path="/relationship"
            element={
              <main>
                <CategoryPage query={searchTerm} categoryId="relationship" />
              </main>
            }
          />
          <Route
            path="/birthday"
            element={
              <main>
                <CategoryPage query={searchTerm} categoryId="birthday" />
              </main>
            }
          />
          <Route
            path="/hampers"
            element={
              <main>
                <CategoryPage query={searchTerm} categoryId="hampers" />
              </main>
            }
          />
          <Route
            path="/anniversary"
            element={
              <main>
                <CategoryPage query={searchTerm} categoryId="anniversary" />
              </main>
            }
          />
          <Route
            path="/customized-cakes"
            element={
              <main>
                <CategoryPage query={searchTerm} categoryId="customized" />
              </main>
            }
          />
          <Route
            path="*"
            element={
              <main>
                <CategoryPage query={searchTerm} categoryId="valentine" />
              </main>
            }
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
