import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Product } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';
import { supabase } from '../supabase/client';

type SupabaseProductRow = {
  id: string;
  name: string;
  price: number;
  image?: string | null;
  image_url?: string | null;
  gender?: string | null;
  category?: string | null;
  rating?: number | null;
  colors?: string[] | null;
  sizes?: number[] | null;
  description?: string | null;
  materials?: string | null;
  is_best_seller?: boolean | null;
};

function mapRowToProduct(row: SupabaseProductRow): Product {
  const category = (row.gender || row.category || 'casual') as Product['category'];
  return {
    id: String(row.id),
    name: row.name,
    category: ['slides', 'sneakers', 'sandals', 'formal', 'casual'].includes(category) ? category : 'casual',
    price: Number(row.price),
    rating: Number(row.rating) || 0,
    image: row.image || row.image_url || '',
    colors: Array.isArray(row.colors) && row.colors.length > 0 ? row.colors : ['black'],
    sizes: Array.isArray(row.sizes) && row.sizes.length > 0 ? row.sizes : [7, 8, 9, 10, 11, 12],
    description: row.description || '',
    materials: row.materials || '',
    isBestSeller: row.is_best_seller ?? false,
  };
}

export function HomePage() {
  const [email, setEmail] = useState('');
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [featuredLoading, setFeaturedLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setFeaturedLoading(true);
    supabase
      .from('products')
      .select('*')
      .then(({ data, error: err }) => {
        if (cancelled) return;
        setFeaturedLoading(false);
        if (err) {
          setFeaturedProducts([]);
          return;
        }
        const list = (data ?? []).map((row) => mapRowToProduct(row as SupabaseProductRow));
        const bestSellers = list.filter((p) => p.isBestSeller);
        setFeaturedProducts(bestSellers.length > 0 ? bestSellers : list.slice(0, 4));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = [
    { id: 'slides', name: 'Slides', image: 'https://images.unsplash.com/photo-1625318880107-49baad6765fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwc2xpZGVzJTIwc2FuZGFsc3xlbnwxfHx8fDE3NzAzOTg4MDh8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 'sneakers', name: 'Sneakers', image: 'https://images.unsplash.com/photo-1631482665588-d3a6f88e65f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNuZWFrZXJzJTIwcHJvZHVjdHxlbnwxfHx8fDE3NzAyODg4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 'sandals', name: 'Sandals', image: 'https://images.unsplash.com/photo-1758179764179-955b069dd2cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHNhbmRhbHMlMjBzdW1tZXJ8ZW58MXx8fHwxNzcwMzk4ODA5fDA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 'formal', name: 'Formal Shoes', image: 'https://images.unsplash.com/photo-1552422554-0d5af0c79fc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JtYWwlMjBkcmVzcyUyMHNob2VzfGVufDF8fHx8MTc3MDI3NDU3N3ww&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 'casual', name: 'Casual Footwear', image: 'https://images.unsplash.com/photo-1759527588071-e143b4a451b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBjYW52YXMlMjBzaG9lc3xlbnwxfHx8fDE3NzAzNjY3MzF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      text: 'Best quality shoes I\'ve ever purchased! The comfort is unmatched.',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=1e3a8a&color=fff'
    },
    {
      name: 'Michael Chen',
      rating: 5,
      text: 'Fast shipping and excellent customer service. Highly recommend!',
      avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=1e3a8a&color=fff'
    },
    {
      name: 'Emma Williams',
      rating: 5,
      text: 'The sneakers are stylish and super comfortable for all-day wear.',
      avatar: 'https://ui-avatars.com/api/?name=Emma+Williams&background=1e3a8a&color=fff'
    },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px] bg-gray-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1593248835695-40456ead5e78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHlsaXNoJTIwc25lYWtlcnMlMjBsaWZlc3R5bGUlMjBoZXJvfGVufDF8fHx8MTc3MDM5ODgwN3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Hero"
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white max-w-2xl"
          >
            <p className="text-sm md:text-base uppercase tracking-widest text-gray-300 mb-2">
              PYF est 2022
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl mb-4">
              Pamper Your Feet
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              Comfort. Style. Affordability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop">
                <Button size="lg" className="bg-blue-900 hover:bg-blue-800 text-white w-full sm:w-auto">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/shop">
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20 w-full sm:w-auto">
                  View Collections
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our diverse collection of premium footwear for every lifestyle
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/shop?category=${category.id}`}
                  className="group block"
                >
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-3">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-center font-medium group-hover:text-blue-900 transition-colors">
                    {category.name}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Best Sellers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our most popular styles, loved by thousands of customers
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredLoading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg aspect-square animate-pulse" />
              ))
            ) : (
              featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
          <div className="text-center mt-12">
            <Link to="/shop">
              <Button size="lg" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-6"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <span className="font-medium">{testimonial.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 md:py-24 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl mb-4">Stay in the Loop</h2>
            <p className="text-blue-100 mb-8">
              Subscribe to our newsletter for exclusive offers, new arrivals, and style tips
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button type="submit" size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
