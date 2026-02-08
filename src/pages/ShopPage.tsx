import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet';
import { SlidersHorizontal } from 'lucide-react';
import { supabase } from '../supabase/client';
import { formatPrice } from '../utils/formatPrice';

/** Supabase products table row (snake_case from DB) */
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

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number[]>([0, 200]);
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categories = ['all', 'slides', 'sneakers', 'sandals', 'formal', 'casual'];
  const sizes = [7, 8, 9, 10, 11, 12];
  const colors = ['all', 'white', 'black', 'brown', 'navy', 'red', 'blue', 'gray', 'tan', 'khaki'];

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    supabase
      .from('products')
      .select('*')
      .then(({ data, error: err }) => {
        if (cancelled) return;
        setLoading(false);
        if (err) {
          setError(err.message);
          setProducts([]);
          return;
        }
        const list = (data ?? []).map((row) => mapRowToProduct(row as SupabaseProductRow));
        setProducts(list);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by size
    if (selectedSize !== 'all') {
      result = result.filter(p => p.sizes.includes(parseInt(selectedSize)));
    }

    // Filter by price range
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Filter by color
    if (selectedColor !== 'all') {
      result = result.filter(p => p.colors.includes(selectedColor));
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'new':
        result.reverse();
        break;
      case 'best-sellers':
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, selectedSize, priceRange, selectedColor, sortBy]);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const FilterSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map(cat => (
            <label key={cat} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={cat}
                checked={selectedCategory === cat}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-4 h-4 text-blue-900 focus:ring-blue-900"
              />
              <span className="capitalize">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Size (US)</h3>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setSelectedSize('all')}
            className={`px-3 py-2 border rounded-lg ${
              selectedSize === 'all'
                ? 'bg-blue-900 text-white border-blue-900'
                : 'border-gray-300 hover:border-blue-900'
            }`}
          >
            All
          </button>
          {sizes.map(size => (
            <button
              key={size}
              onClick={() => setSelectedSize(size.toString())}
              className={`px-3 py-2 border rounded-lg ${
                selectedSize === size.toString()
                  ? 'bg-blue-900 text-white border-blue-900'
                  : 'border-gray-300 hover:border-blue-900'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={200}
            step={10}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{formatPrice(priceRange[0], 0)}</span>
            <span>{formatPrice(priceRange[1], 0)}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Color</h3>
        <div className="grid grid-cols-3 gap-2">
          {colors.map(color => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`px-3 py-2 border rounded-lg capitalize ${
                selectedColor === color
                  ? 'bg-blue-900 text-white border-blue-900'
                  : 'border-gray-300 hover:border-blue-900'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl mb-4">Shop All Footwear</h1>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-gray-600">
              {loading ? 'Loading…' : `Showing ${filteredProducts.length} of ${products.length} products`}
            </p>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="new">New Arrivals</SelectItem>
                  <SelectItem value="best-sellers">Best Sellers</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filter Button */}
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] overflow-y-auto">
                  <h2 className="text-xl font-semibold mb-6">Filters</h2>
                  <FilterSection />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Filters</h2>
              <FilterSection />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {error ? (
              <div className="text-center py-12">
                <p className="text-red-600 text-lg">Failed to load products: {error}</p>
              </div>
            ) : loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-gray-100 rounded-lg aspect-square animate-pulse" />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found matching your filters.</p>
                <Button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedSize('all');
                    setPriceRange([0, 200]);
                    setSelectedColor('all');
                  }}
                  className="mt-4 bg-blue-900 hover:bg-blue-800"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
