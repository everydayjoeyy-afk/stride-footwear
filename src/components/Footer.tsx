import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="text-2xl tracking-tight mb-4">
              <span className="font-bold">STRIDE</span>
            </div>
            <p className="text-gray-600 text-sm">
              Premium footwear for every step of your journey.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-600 hover:text-blue-900 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-900 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-900 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-900 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shop?category=sneakers" className="text-gray-600 hover:text-blue-900 transition-colors">
                  Sneakers
                </Link>
              </li>
              <li>
                <Link to="/shop?category=slides" className="text-gray-600 hover:text-blue-900 transition-colors">
                  Slides
                </Link>
              </li>
              <li>
                <Link to="/shop?category=sandals" className="text-gray-600 hover:text-blue-900 transition-colors">
                  Sandals
                </Link>
              </li>
              <li>
                <Link to="/shop?category=formal" className="text-gray-600 hover:text-blue-900 transition-colors">
                  Formal Shoes
                </Link>
              </li>
              <li>
                <Link to="/shop?category=casual" className="text-gray-600 hover:text-blue-900 transition-colors">
                  Casual Footwear
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-blue-900 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-blue-900 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-900 transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-900 transition-colors">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-900 transition-colors">
                  Returns & Exchanges
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-600 text-sm mb-4">
              Subscribe to get special offers and updates.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
              <button
                type="submit"
                className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
          <p>&copy; {currentYear} STRIDE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
