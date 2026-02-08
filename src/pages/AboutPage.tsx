import React from 'react';
import { Award, Heart, Truck, Users } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl mb-6">About Pamper Your Feet (PYF)</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pamper Your Feet (PYF), established in 2022, is a growing footwear brand focused on comfort, style, and affordability. What started as a simple idea to fill a market gap has grown into a trusted brand serving customers nationwide.
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
            <p className="text-gray-600">Quick and reliable delivery nationwide</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Users className="h-8 w-8 text-blue-900" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-gray-600">Join thousands of satisfied customers</p>
          </div>
        </div>

        <div className="prose prose-lg max-w-4xl mx-auto mb-20">
          <h2>Our Mission</h2>
          <p>
            At PYF, we believe everyone deserves quality footwear that combines durability with comfort — without breaking the bank. Our mission is simple: to deliver products that make you feel confident, comfortable, and proud with every step.
          </p>
          <p className="text-2xl font-semibold text-blue-900 text-center my-10">
            Pamper Your Feet.
          </p>
        </div>

        <div className="border-t border-gray-200 pt-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">Founder</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto items-center">
          <div className="aspect-square max-w-sm mx-auto md:mx-0">
  <img 
    src="https://res.cloudinary.com/dccucbwx6/image/upload/v1770549089/IMG-20260208-WA0018_yizwsv.jpg"
    alt="Emmanuel Nemi, Founder of PYF"
    className="w-full h-full object-cover rounded-full"
  />
</div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Emmanuel Nemi</h3>
              <p className="text-gray-600">
                Emmanuel Nemi is the founder of Pamper Your Feet (PYF), established in 2022. With an entrepreneurial mindset and a passion for identifying opportunities, he built PYF to address a clear market gap — providing stylish, comfortable, and affordable footwear to students and young professionals.
              </p>
              <p className="text-gray-600">
                What began as a simple idea has grown into a trusted brand serving customers nationwide. Through consistency, resilience, and customer-focused service, Emmanuel has positioned PYF as more than just a footwear brand — but a growing business built on trust, quality, and vision.
              </p>
              <p className="text-gray-600">
                He believes in growth, innovation, and creating lasting value through every venture he builds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
