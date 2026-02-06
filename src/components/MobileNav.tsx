import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export function MobileNav() {
  const location = useLocation();
  const { getCartCount } = useCart();

  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/shop', icon: ShoppingBag, label: 'Shop' },
    { to: '/cart', icon: ShoppingCart, label: 'Cart', badge: getCartCount() },
    { to: '/login', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center flex-1 h-full relative ${
                isActive ? 'text-blue-900' : 'text-gray-600'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.label}</span>
              {item.badge && item.badge > 0 && (
                <span className="absolute top-2 right-1/4 bg-blue-900 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
