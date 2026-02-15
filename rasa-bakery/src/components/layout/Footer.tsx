'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
    setEmail('');
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-display text-2xl font-semibold mb-2">
                Stay Updated
              </h3>
              <p className="text-neutral-400">
                Subscribe for exclusive offers and new arrivals
              </p>
            </div>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex w-full md:w-auto gap-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 md:w-80 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder:text-neutral-500 focus:outline-none focus:border-primary-500 transition-colors"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors flex items-center gap-2"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <h2 className="font-display text-2xl font-semibold text-white">
                Rasa Essence
              </h2>
              <p className="text-sm text-neutral-500 tracking-wider uppercase mt-1">
                Artisan Bakery
              </p>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Creating memorable moments through exquisite handcrafted cakes since 2015.
            </p>
            <div className="flex gap-3">
              <SocialLink href="#" icon={<Facebook className="w-4 h-4" />} label="Facebook" />
              <SocialLink href="#" icon={<Instagram className="w-4 h-4" />} label="Instagram" />
              <SocialLink href="#" icon={<Twitter className="w-4 h-4" />} label="Twitter" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <FooterLink href="/valentine">Valentine Cakes</FooterLink>
              <FooterLink href="/birthday">Birthday Cakes</FooterLink>
              <FooterLink href="/anniversary">Anniversary Cakes</FooterLink>
              <FooterLink href="/customized-cakes">Custom Cakes</FooterLink>
              <FooterLink href="/desserts">Desserts</FooterLink>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-white mb-6">Customer Service</h4>
            <ul className="space-y-3">
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/shipping">Delivery Information</FooterLink>
              <FooterLink href="/returns">Returns & Refunds</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms & Conditions</FooterLink>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-neutral-400">
                <MapPin className="w-5 h-5 mt-0.5 text-primary-500" />
                <span className="text-sm">123 Baker Street, Central, Hong Kong</span>
              </li>
              <li className="flex items-center gap-3 text-neutral-400">
                <Phone className="w-5 h-5 text-primary-500" />
                <a href="tel:+85212345678" className="text-sm hover:text-white transition-colors">
                  +852 1234 5678
                </a>
              </li>
              <li className="flex items-center gap-3 text-neutral-400">
                <Mail className="w-5 h-5 text-primary-500" />
                <a href="mailto:hello@rasaessence.com" className="text-sm hover:text-white transition-colors">
                  hello@rasaessence.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
            <p>© {currentYear} Rasa Essence. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-neutral-800 text-neutral-400 hover:bg-primary-600 hover:text-white transition-all duration-300"
    >
      {icon}
    </a>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-neutral-400 hover:text-white transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}
