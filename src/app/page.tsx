'use client';

import { useState } from 'react';
import PayPalCheckout from '@/components/PayPalCheckout';
import {
  Lock,
  Truck,
  Star,
  Check,
  Sparkles,
  RotateCcw,
  ChevronDown,
} from 'lucide-react';

const SKU = 'CJMY178964801AZ';

const COLORS = [
  { name: 'Green', hex: '#4F775D', image: '/product-sage.jpg' },
  { name: 'Beige', hex: '#E6DCC8', image: '/product-coral.jpg' },
  { name: 'Grey', hex: '#9CA3AF', image: '/product-sky.jpg' },
];

const BUNDLES = {
  single: {
    id: 'single' as const,
    title: '1x TrailPup 2-in-1 Bottle (550ml)',
    badge: 'STARTER',
    price: 28.99,
    compareAt: 39.99,
    quantity: 1,
    subtitle: 'Free US Shipping (Est. 9–17 days: 1–3d processing + 8–14d transit)',
  },
  double: {
    id: 'double' as const,
    title: '2x TrailPup Walk Pack (Save $11)',
    badge: 'MOST POPULAR',
    price: 46.99,
    compareAt: 79.98,
    quantity: 2,
    subtitle: 'Keep one in the car + one by the door • Free US Shipping (Est. 9–17 days)',
  },
};

export default function HomePage() {
  const [selectedColor, setSelectedColor] = useState(COLORS[0].name);
  const [selectedBundle, setSelectedBundle] = useState<'single' | 'double'>('double');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activeColor = COLORS.find((c) => c.name === selectedColor) ?? COLORS[0];
  const activeOffer = BUNDLES[selectedBundle];

  const faqs = [
    {
      q: 'How long does shipping to the US take?',
      a: 'Orders take 1–3 business days for processing and 8–14 days in transit to the US (estimated 9–17 days total) with tracking updates.',
    },
    {
      q: 'Does it really never leak inside a backpack or car?',
      a: 'Yes. TrailPup uses a silicone seal ring plus a physical lock switch. Once locked, it is built to prevent leaks in your bag or car.',
    },
    {
      q: 'What happens to the water my dog does not finish?',
      a: 'Simply tilt the bottle upright and press the water-return button—unused water drains back inside so you do not waste water on walks.',
    },
    {
      q: 'Is it safe for large and small breeds?',
      a: 'Yes. It works well for daily walks and outings, holds water plus a treat/kibble compartment at the base, and is made with BPA-free materials.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-white text-center text-xs sm:text-sm py-2.5 px-4 font-medium tracking-wide">
        🇺🇸 FREE US SHIPPING ON ALL ORDERS (EST. 9–17 DAYS) • 30-DAY GUARANTEE
      </div>

      {/* Header */}
      <header className="border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-lg">
              T
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">
              Trail<span className="text-emerald-600">Pup</span>
            </span>
          </div>
          <a
            href="#buy-box"
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition"
          >
            Order Now
          </a>
        </div>
      </header>

      {/* Main Product Section */}
      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Product Visuals */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-emerald-50 via-slate-50 to-amber-50 border border-slate-200 flex items-center justify-center p-4 relative overflow-hidden">
              <span className="absolute top-4 left-4 z-10 bg-amber-400 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full uppercase">
                2026 Best Seller
              </span>
              <img
                src={activeColor.image}
                alt={`TrailPup 2-in-1 Bottle in ${activeColor.name}`}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            {/* Trust Badges Row */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                <Lock className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                <p className="text-xs font-semibold">100% Leak-Proof</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                <Sparkles className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                <p className="text-xs font-semibold">BPA-Free Materials</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                <Truck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                <p className="text-xs font-semibold">Est. 9–17 Day US Delivery</p>
              </div>
            </div>

            {/* Trail Lifestyle Banner */}
            <div className="rounded-3xl overflow-hidden border border-slate-200 bg-slate-50">
              <img
                src="/trail-lifestyle.jpg"
                alt="Dog hydrating on a sunny mountain trail"
                className="w-full h-52 object-cover"
              />
            </div>
          </div>

          {/* Right Column: Buy Box */}
          <div id="buy-box" className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-medium text-slate-600">
                  4.9/5 (420+ Happy Dog Owners)
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                TrailPup™ 2-in-1 Portable Dog Water &amp; Treat Bottle
              </h1>
              <p className="text-slate-600 mt-3 text-base leading-relaxed">
                Keep your pup hydrated and rewarded on every hike, road trip, and park walk—with zero spills, zero wasted water, and one-hand operation.
              </p>
            </div>

            {/* Key Bullet Points */}
            <ul className="space-y-2.5 text-sm text-slate-700">
              <li className="flex items-center gap-2.5">
                <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  <strong>Water-Return Button:</strong> Unused water drains back inside—zero waste.
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  <strong>Built-In Treat Compartment:</strong> Holds kibble or training snacks at the base.
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  <strong>Silicone Seal + Lock Switch:</strong> Toss it inside your bag without a single drop leaking.
                </span>
              </li>
            </ul>

            {/* Step 1: Select Color */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                1. Choose Color: <span className="font-normal text-slate-600">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {COLORS.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition ${
                      selectedColor === c.name
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-600/20'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/20"
                      style={{ backgroundColor: c.hex }}
                    />
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Offer Bundle */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-900">
                2. Select Your Bundle:
              </label>

              {(['double', 'single'] as const).map((key) => {
                const item = BUNDLES[key];
                const isSelected = selectedBundle === key;
                return (
                  <div
                    key={key}
                    onClick={() => setSelectedBundle(key)}
                    className={`cursor-pointer rounded-2xl border-2 p-4 transition relative ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span
                          className={`inline-block text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase mb-1 ${
                            key === 'double'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {item.badge}
                        </span>
                        <h3 className="font-bold text-slate-900">{item.title}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">{item.subtitle}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-extrabold text-slate-900">
                          ${item.price.toFixed(2)}
                        </p>
                        <p className="text-xs text-slate-400 line-through">
                          ${item.compareAt.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Step 3: Instant PayPal Express Checkout */}
            <div className="pt-2">
              <PayPalCheckout
                bundle={activeOffer.id}
                color={selectedColor}
                price={activeOffer.price}
                quantity={activeOffer.quantity}
                title={activeOffer.title}
                sku={SKU}
              />
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((item, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 hover:bg-slate-50"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer with US Compliance Links */}
      <footer className="border-t border-slate-200 bg-slate-50 mt-20 py-12 px-4 text-sm text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between gap-6">
          <div>
            <p className="font-bold text-slate-900 text-base">TrailPup™ Gear</p>
            <p className="mt-1 text-xs">
              Smart hydration &amp; travel essentials for dogs. Support: support@trailpupgear.com
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1">
              <RotateCcw className="w-3.5 h-3.5" /> 30-Day Return Policy
            </span>
            <span>Shipping Policy (Est. 9–17 Days US)</span>
            <span>Privacy Policy &amp; Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}