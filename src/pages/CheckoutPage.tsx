import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { CreditCard, Smartphone, Banknote, Lock } from 'lucide-react';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getCartTotal } = useCart();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    zipCode: '',
    deliveryMethod: 'standard',
    paymentMethod: 'card',
  });

  const shippingCost = formData.deliveryMethod === 'express' ? 20 : getCartTotal() >= 100 ? 0 : 10;
  const total = getCartTotal() + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handlePlaceOrder = () => {
    const orderNumber = Math.random().toString(36).substring(2, 10).toUpperCase();
    navigate(`/order-confirmation/${orderNumber}`);
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {[1, 2, 3].map((s, i) => (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step >= s
                        ? 'bg-blue-900 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {s}
                  </div>
                  <span className="text-xs mt-2 hidden sm:block">
                    {s === 1 ? 'Shipping' : s === 2 ? 'Delivery' : 'Payment'}
                  </span>
                </div>
                {i < 2 && (
                  <div
                    className={`h-1 w-16 sm:w-32 mx-2 ${
                      step > s ? 'bg-blue-900' : 'bg-gray-300'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 md:p-8">
              {/* Step 1: Shipping Details */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl mb-6">Shipping Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="region">State/Region</Label>
                      <Input
                        id="region"
                        name="region"
                        value={formData.region}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Delivery Method */}
              {step === 2 && (
                <div>
                  <h2 className="text-2xl mb-6">Delivery Method</h2>
                  <RadioGroup
                    value={formData.deliveryMethod}
                    onValueChange={(value) =>
                      setFormData({ ...formData, deliveryMethod: value })
                    }
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-900">
                        <RadioGroupItem value="standard" id="standard" />
                        <label htmlFor="standard" className="flex-1 cursor-pointer">
                          <div className="font-medium">Standard Delivery</div>
                          <div className="text-sm text-gray-600">5-7 business days</div>
                        </label>
                        <div className="font-semibold">
                          {getCartTotal() >= 100 ? 'FREE' : '$10.00'}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-900">
                        <RadioGroupItem value="express" id="express" />
                        <label htmlFor="express" className="flex-1 cursor-pointer">
                          <div className="font-medium">Express Delivery</div>
                          <div className="text-sm text-gray-600">2-3 business days</div>
                        </label>
                        <div className="font-semibold">$20.00</div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div>
                  <h2 className="text-2xl mb-6">Payment Method</h2>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) =>
                      setFormData({ ...formData, paymentMethod: value })
                    }
                  >
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-900">
                        <RadioGroupItem value="card" id="card" />
                        <CreditCard className="h-5 w-5 text-gray-600" />
                        <label htmlFor="card" className="flex-1 cursor-pointer font-medium">
                          Credit / Debit Card
                        </label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-900">
                        <RadioGroupItem value="mobile" id="mobile" />
                        <Smartphone className="h-5 w-5 text-gray-600" />
                        <label htmlFor="mobile" className="flex-1 cursor-pointer font-medium">
                          Mobile Money (MTN, Vodafone, AirtelTigo)
                        </label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-900">
                        <RadioGroupItem value="cod" id="cod" />
                        <Banknote className="h-5 w-5 text-gray-600" />
                        <label htmlFor="cod" className="flex-1 cursor-pointer font-medium">
                          Pay on Delivery
                        </label>
                      </div>
                    </div>

                    {formData.paymentMethod === 'card' && (
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" />
                          </div>
                        </div>
                      </div>
                    )}

                    {formData.paymentMethod === 'mobile' && (
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <Label htmlFor="mobileNumber">Mobile Money Number</Label>
                          <Input id="mobileNumber" placeholder="0XX XXX XXXX" />
                        </div>
                        <div>
                          <Label htmlFor="provider">Provider</Label>
                          <select
                            id="provider"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                          >
                            <option>MTN Mobile Money</option>
                            <option>Vodafone Cash</option>
                            <option>AirtelTigo Money</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </RadioGroup>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePreviousStep}
                  disabled={step === 1}
                  className="border-gray-300"
                >
                  Previous
                </Button>
                {step < 3 ? (
                  <Button onClick={handleNextStep} className="bg-blue-900 hover:bg-blue-800">
                    Next Step
                  </Button>
                ) : (
                  <Button
                    onClick={handlePlaceOrder}
                    className="bg-blue-900 hover:bg-blue-800"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Place Order
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {items.map(item => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-gray-600">
                        Qty: {item.quantity} | Size: {item.size}
                      </p>
                      <p className="text-sm font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="border-t border-gray-300 pt-2 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
