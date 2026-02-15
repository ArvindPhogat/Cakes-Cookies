'use client';

import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-medium rounded-full mb-6">
              Artisan Bakery
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 leading-tight mb-6">
              Exquisite Cakes for
              <span className="block text-primary-600">Every Celebration</span>
            </h1>
            <p className="text-lg text-neutral-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Handcrafted with passion, our artisan cakes bring joy to every occasion.
              From elegant designs to delicious flavors, experience the art of celebration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="#categories"
                className="btn btn-primary"
              >
                Explore Collection
              </Link>
              <Link
                href="/customized-cakes"
                className="btn btn-secondary"
              >
                Custom Orders
              </Link>
            </div>
          </div>

          {/* Image Grid */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl h-48 flex items-center justify-center overflow-hidden">
                  <img
                    src="/MoneyPlantCake.png"
                    alt="Designer Cake"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="bg-gradient-to-br from-gold-100 to-gold-50 rounded-2xl h-32 flex items-center justify-center overflow-hidden">
                  <img
                    src="/RasmalaiCake.png"
                    alt="Rasmalai Cake"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-gradient-to-br from-neutral-100 to-neutral-50 rounded-2xl h-32 flex items-center justify-center overflow-hidden">
                  <img
                    src="/VanillaCake.png"
                    alt="Vanilla Cake"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="bg-gradient-to-br from-primary-100 to-gold-50 rounded-2xl h-48 flex items-center justify-center overflow-hidden">
                  <img
                    src="/RedVanillaCake.png"
                    alt="Red Velvet Cake"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold-200/50 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-200/50 rounded-full blur-2xl" />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 pt-12 border-t border-neutral-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-display text-3xl font-semibold text-neutral-900">500+</div>
              <div className="text-sm text-neutral-500 mt-1">Cake Designs</div>
            </div>
            <div>
              <div className="font-display text-3xl font-semibold text-neutral-900">10K+</div>
              <div className="text-sm text-neutral-500 mt-1">Happy Customers</div>
            </div>
            <div>
              <div className="font-display text-3xl font-semibold text-neutral-900">5★</div>
              <div className="text-sm text-neutral-500 mt-1">Average Rating</div>
            </div>
            <div>
              <div className="font-display text-3xl font-semibold text-neutral-900">2hr</div>
              <div className="text-sm text-neutral-500 mt-1">Express Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
