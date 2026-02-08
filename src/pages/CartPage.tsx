import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { formatPrice } from '../utils/formatPrice';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';

export function CartPage() {
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  const shippingCost = getCartTotal() >= 100 ? 0 : 10;
  const total = getCartTotal() + shippingCost;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/shop">
            <Button size="lg" className="bg-blue-900 hover:bg-blue-800">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Button
          variant="ghost"
          onClick={() => navigate('/shop')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continue Shopping
        </Button>

        <h1 className="text-3xl md:text-4xl mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={`${item.id}-${item.size}-${item.color}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row gap-4"
                >
                  <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Size: US {item.size} | Color: <span className="capitalize">{item.color}</span>
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-x border-gray-300">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-gray-600">{formatPrice(item.price)} each</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(getCartTotal())}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}</span>
                </div>
                {getCartTotal() < 100 && (
                  <p className="text-sm text-blue-900 bg-blue-50 p-2 rounded">
                    Add {formatPrice(100 - getCartTotal())} more for free shipping!
                  </p>
                )}
                <div className="border-t border-gray-300 pt-3 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <Link to="/checkout">
                <Button size="lg" className="w-full bg-blue-900 hover:bg-blue-800 mb-3">
                  Proceed to Checkout
                </Button>
              </Link>

              <Link to="/shop">
                <Button size="lg" variant="outline" className="w-full border-gray-300">
                  Continue Shopping
                </Button>
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-300 space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span>30-day returns</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">✓</span>
                  <span>Free shipping over {formatPrice(100, 0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
