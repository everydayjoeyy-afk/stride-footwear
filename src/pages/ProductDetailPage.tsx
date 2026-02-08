import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { products } from '../data/products';
import { Star, ShoppingCart, Heart, Truck, Shield, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ProductCard } from '../components/ProductCard';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Product not found</h2>
          <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize,
        color: selectedColor,
      });
    }
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/shop')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Shop
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity">
                  <img
                    src={product.image}
                    alt={`${product.name} view ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4">
              <span className="text-sm text-gray-500 uppercase tracking-wide">
                {product.category}
              </span>
              {product.isBestSeller && (
                <span className="ml-3 inline-block bg-blue-900 text-white text-xs px-3 py-1 rounded-full">
                  Best Seller
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl mb-4">{product.name}</h1>

            <div className="flex items-center mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                {product.rating} ({Math.floor(Math.random() * 200 + 50)} reviews)
              </span>
            </div>

            <div className="text-3xl font-semibold mb-8">{formatPrice(product.price)}</div>

            {/* Color Selection */}
            <div className="mb-6">
              <label className="block font-semibold mb-3">Color</label>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full border-2 capitalize flex items-center justify-center ${
                      selectedColor === color
                        ? 'border-blue-900 ring-2 ring-blue-900 ring-offset-2'
                        : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color === 'tan' ? '#d2b48c' : color === 'khaki' ? '#c3b091' : color }}
                    title={color}
                  >
                    {selectedColor === color && (
                      <span className="text-white text-xs">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="block font-semibold mb-3">Size (US)</label>
              <div className="grid grid-cols-6 gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-3 border rounded-lg transition-all ${
                      selectedSize === size
                        ? 'bg-blue-900 text-white border-blue-900'
                        : 'border-gray-300 hover:border-blue-900'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block font-semibold mb-3">Quantity</label>
              <div className="flex items-center border border-gray-300 rounded-lg w-32">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="flex-1 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                onClick={handleAddToCart}
                className="flex-1 bg-blue-900 hover:bg-blue-800"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                onClick={handleBuyNow}
                variant="outline"
                className="flex-1 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white"
              >
                Buy Now
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-start">
                <Truck className="h-5 w-5 text-blue-900 mr-3 mt-1" />
                <div>
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-sm text-gray-600">On orders over {formatPrice(100, 0)}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-blue-900 mr-3 mt-1" />
                <div>
                  <p className="font-medium">30-Day Returns</p>
                  <p className="text-sm text-gray-600">Easy returns & exchanges</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Description */}
        <div className="mb-16">
          <div className="border-b border-gray-200 mb-6">
            <h2 className="text-2xl pb-4">Product Details</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Description</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Materials & Care</h3>
              <p className="text-gray-700 mb-4">{product.materials}</p>
              <h3 className="font-semibold mb-3">Care Instructions</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Clean with a soft, damp cloth</li>
                <li>• Avoid harsh chemicals and excessive water</li>
                <li>• Store in a cool, dry place</li>
                <li>• Use shoe trees to maintain shape</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="border-b border-gray-200 mb-8">
              <h2 className="text-2xl pb-4">You May Also Like</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
