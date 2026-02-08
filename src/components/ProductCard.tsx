import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../data/products';
import { formatPrice } from '../utils/formatPrice';
import { Button } from './ui/button';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.sizes[0],
      color: product.colors[0],
    });
    toast.success('Added to cart!');
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="aspect-square overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-4">
            <h3 className="text-sm text-gray-500 uppercase tracking-wide">
              {product.category}
            </h3>
            <h2 className="mt-1 mb-2">{product.name}</h2>
            <div className="flex items-center mb-3">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm text-gray-600">
                {product.rating} ({Math.floor(Math.random() * 200 + 50)} reviews)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-semibold">{formatPrice(product.price)}</span>
              <Button
                size="sm"
                onClick={handleAddToCart}
                className="bg-blue-900 hover:bg-blue-800"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
