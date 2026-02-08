import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { formatPrice } from '../utils/formatPrice';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';

export function OrderConfirmationPage() {
  const { orderNumber } = useParams();
  const { items, clearCart, getCartTotal } = useCart();

  useEffect(() => {
    // Clear cart after order is placed
    const timer = setTimeout(() => {
      clearCart();
    }, 1000);
    return () => clearTimeout(timer);
  }, [clearCart]);

  const estimatedDeliveryDate = new Date();
  estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 7);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg p-8 md:p-12 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block mb-6"
          >
            <CheckCircle className="h-20 w-20 text-green-500" />
          </motion.div>

          <h1 className="text-3xl md:text-4xl mb-4">
            Your order has been placed successfully! 🎉
          </h1>

          <p className="text-gray-600 mb-8">
            Thank you for shopping with STRIDE. We've received your order and will process it shortly.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-gray-600 mb-1">Order Number</p>
                <p className="font-semibold text-lg">{orderNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Estimated Delivery</p>
                <p className="font-semibold text-lg">
                  {estimatedDeliveryDate.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          {items.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-left">Order Summary</h2>
              <div className="space-y-3">
                {items.map(item => (
                  <div
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity} | Size: US {item.size} | {item.color}
                      </p>
                    </div>
                    <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                <span className="font-semibold text-lg">Total</span>
                <span className="font-semibold text-2xl">{formatPrice(getCartTotal())}</span>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex items-start gap-3">
            <Package className="h-5 w-5 text-blue-900 mt-0.5 flex-shrink-0" />
            <div className="text-left">
              <p className="font-medium text-blue-900 mb-1">Track Your Order</p>
              <p className="text-sm text-gray-600">
                We'll send you an email with tracking information once your order ships.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop">
              <Button size="lg" className="bg-blue-900 hover:bg-blue-800 w-full sm:w-auto">
                Continue Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/">
              <Button size="lg" variant="outline" className="border-gray-300 w-full sm:w-auto">
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
