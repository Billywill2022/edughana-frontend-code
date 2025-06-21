import React, { useState } from 'react';
import { Check, X, Star, CreditCard, Smartphone, Shield, Users, BookOpen, Trophy, Zap, Crown, Gift } from 'lucide-react';

const SubscriptionPlans = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for getting started with basic educational resources',
      color: 'gray',
      popular: false,
      features: [
        { name: 'Access to basic curriculum resources', included: true },
        { name: 'Limited assessment questions (10 per month)', included: true },
        { name: 'Basic lesson notes', included: true },
        { name: 'News and updates', included: true },
        { name: 'Community forum access', included: true },
        { name: 'Premium teaching packs', included: false },
        { name: 'Unlimited mock exams', included: false },
        { name: 'Downloadable content', included: false },
        { name: 'Priority support', included: false },
        { name: 'Offline access', included: false },
        { name: 'Advanced analytics', included: false },
        { name: 'Live tutoring sessions', included: false }
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: { monthly: 25, yearly: 250 },
      description: 'Complete access to all educational resources and premium features',
      color: 'blue',
      popular: true,
      features: [
        { name: 'Access to basic curriculum resources', included: true },
        { name: 'Unlimited assessment questions', included: true },
        { name: 'Premium lesson notes and teaching packs', included: true },
        { name: 'News and updates', included: true },
        { name: 'Community forum access', included: true },
        { name: 'Premium teaching packs', included: true },
        { name: 'Unlimited mock exams', included: true },
        { name: 'Downloadable content', included: true },
        { name: 'Priority support', included: true },
        { name: 'Offline access', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Live tutoring sessions', included: true }
      ]
    }
  ];

  const paymentMethods = [
    {
      id: 'momo',
      name: 'Mobile Money',
      description: 'Pay with MTN, Vodafone, or AirtelTigo',
      icon: Smartphone,
      popular: true
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Visa, MasterCard, and other major cards',
      icon: CreditCard,
      popular: false
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Akosua Mensah',
      role: 'Mathematics Teacher, Accra',
      content: 'EduGhana Premium has transformed how I prepare my lessons. The comprehensive resources save me hours every week.',
      rating: 5,
      avatar: '👩‍🏫'
    },
    {
      id: 2,
      name: 'Kwame Asante',
      role: 'SHS Student, Kumasi',
      content: 'The mock exams and practice questions helped me improve my grades significantly. Worth every pesewa!',
      rating: 5,
      avatar: '👨‍🎓'
    },
    {
      id: 3,
      name: 'Dr. Ama Osei',
      role: 'Education Consultant',
      content: 'As an education professional, I appreciate the quality and alignment with Ghana\'s curriculum standards.',
      rating: 5,
      avatar: '👩‍💼'
    }
  ];

  const stats = [
    { label: 'Active Subscribers', value: '15,000+', icon: Users },
    { label: 'Success Rate', value: '94%', icon: Trophy },
    { label: 'Resources Available', value: '5,000+', icon: BookOpen },
    { label: 'Student Satisfaction', value: '4.9/5', icon: Star }
  ];

  const getPlanColor = (color, type = 'bg') => {
    const colors = {
      gray: {
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        button: 'bg-gray-600 hover:bg-gray-700',
        text: 'text-gray-600'
      },
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        button: 'bg-blue-600 hover:bg-blue-700',
        text: 'text-blue-600'
      }
    };
    return colors[color][type];
  };

  const getCurrentPrice = (plan) => {
    return billingCycle === 'yearly' ? plan.price.yearly : plan.price.monthly;
  };

  const getSavings = (plan) => {
    if (billingCycle === 'yearly' && plan.price.monthly > 0) {
      const yearlyTotal = plan.price.monthly * 12;
      const savings = yearlyTotal - plan.price.yearly;
      return savings;
    }
    return 0;
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Crown className="h-8 w-8 text-yellow-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Subscription Plans</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your educational journey. Unlock premium content, 
            advanced features, and unlimited access to Ghana's most comprehensive educational platform.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-md">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
                  billingCycle === 'monthly'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 relative ${
                  billingCycle === 'yearly'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Save 17%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-lg p-6 text-center shadow-md">
                <Icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                plan.popular ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className={`p-8 ${getPlanColor(plan.color, 'bg')}`}>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900">
                        GH₵{getCurrentPrice(plan)}
                      </span>
                      <span className="text-gray-600 ml-2">
                        /{billingCycle === 'yearly' ? 'year' : 'month'}
                      </span>
                    </div>
                    {getSavings(plan) > 0 && (
                      <div className="text-green-600 text-sm mt-2">
                        Save GH₵{getSavings(plan)} per year
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors duration-200 ${getPlanColor(
                      plan.color,
                      'button'
                    )}`}
                  >
                    {plan.id === 'free' ? 'Get Started Free' : 'Start Premium Trial'}
                  </button>
                </div>
              </div>

              <div className="p-8">
                <h4 className="font-semibold text-gray-900 mb-4">What's included:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={feature.included ? 'text-gray-900' : 'text-gray-500'}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <div className="text-center mb-8">
            <Shield className="h-8 w-8 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Secure Payment Methods</h3>
            <p className="text-gray-600">
              Choose your preferred payment method. All transactions are encrypted and secure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.id}
                  className={`border-2 rounded-lg p-6 cursor-pointer transition-colors duration-200 hover:border-blue-500 ${
                    method.popular ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <Icon className="h-8 w-8 text-blue-600 mr-3" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{method.name}</h4>
                      {method.popular && (
                        <span className="text-blue-600 text-sm font-medium">Most Popular</span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{method.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <div className="flex items-center justify-center text-sm text-gray-500">
              <Shield className="h-4 w-4 mr-2" />
              <span>256-bit SSL encryption • PCI DSS compliant • Money-back guarantee</span>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h3>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied students and teachers across Ghana
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="text-2xl mr-3">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Can I cancel my subscription anytime?</h4>
              <p className="text-gray-600 text-sm mb-4">
                Yes, you can cancel your subscription at any time. You'll continue to have access to premium features until the end of your billing period.
              </p>

              <h4 className="font-semibold text-gray-900 mb-2">Is there a free trial for Premium?</h4>
              <p className="text-gray-600 text-sm mb-4">
                Yes, we offer a 7-day free trial for new Premium subscribers. No credit card required to start.
              </p>

              <h4 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h4>
              <p className="text-gray-600 text-sm">
                We accept Mobile Money (MTN, Vodafone, AirtelTigo) and major credit/debit cards (Visa, MasterCard).
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Can I upgrade or downgrade my plan?</h4>
              <p className="text-gray-600 text-sm mb-4">
                Yes, you can change your plan at any time. Changes will be reflected in your next billing cycle.
              </p>

              <h4 className="font-semibold text-gray-900 mb-2">Do you offer student discounts?</h4>
              <p className="text-gray-600 text-sm mb-4">
                Yes, we offer special discounts for verified students. Contact our support team for more information.
              </p>

              <h4 className="font-semibold text-gray-900 mb-2">Is my data secure?</h4>
              <p className="text-gray-600 text-sm">
                Absolutely. We use industry-standard encryption and security measures to protect your personal information and payment data.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white text-center">
          <Gift className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Learning?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of students and teachers who are already using EduGhana to achieve their educational goals. 
            Start your journey today with our 7-day free trial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200">
              Start Free Trial
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200">
              View Free Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;

