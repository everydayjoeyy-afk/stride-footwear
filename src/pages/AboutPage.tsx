import React from 'react';
import { Award, Heart, Truck, Users } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl mb-6">About STRIDE</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're passionate about creating premium footwear that combines style, comfort, and sustainability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Award className="h-8 w-8 text-blue-900" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
            <p className="text-gray-600">Crafted with the finest materials for lasting durability</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Heart className="h-8 w-8 text-blue-900" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Customer First</h3>
            <p className="text-gray-600">Your satisfaction is our top priority</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Truck className="h-8 w-8 text-blue-900" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
            <p className="text-gray-600">Quick and reliable delivery worldwide</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Users className="h-8 w-8 text-blue-900" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-gray-600">Join thousands of satisfied customers</p>
          </div>
        </div>

        <div className="prose prose-lg max-w-4xl mx-auto">
          <h2>Our Story</h2>
          <p>
            Founded in 2020, STRIDE was born from a simple idea: everyone deserves footwear that looks great and feels even better. We started in a small workshop with a handful of dedicated craftspeople who shared our vision of creating shoes that would stand the test of time.
          </p>
          <p>
            Today, we've grown into a global brand, but our commitment to quality and customer satisfaction remains unchanged. Every pair of shoes we create is a testament to our dedication to excellence, combining traditional craftsmanship with modern design.
          </p>
          <h2>Our Values</h2>
          <p>
            At STRIDE, we believe in transparency, sustainability, and ethical manufacturing. We work closely with our suppliers to ensure fair labor practices and environmentally responsible production methods. Our goal is not just to make great shoes, but to make a positive impact on the world.
          </p>
          <h2>Our Promise</h2>
          <p>
            We promise to continue delivering exceptional footwear that exceeds your expectations. Whether you're looking for formal shoes for the office, casual sneakers for weekend adventures, or comfortable slides for relaxing at home, we've got you covered.
          </p>
        </div>
      </div>
    </div>
  );
}
