import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  HelpCircle, 
  BookOpen, 
  Video, 
  FileText, 
  Users, 
  Send,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

const ContactSupport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
    priority: 'medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      contact: '+233 XX XXX XXXX',
      availability: 'Mon-Fri, 8AM-6PM GMT',
      color: 'blue'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us a detailed message',
      contact: 'support@edughana.com',
      availability: 'Response within 24 hours',
      color: 'green'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant help from our team',
      contact: 'Available on website',
      availability: 'Mon-Fri, 9AM-5PM GMT',
      color: 'purple'
    },
    {
      icon: MapPin,
      title: 'Office Location',
      description: 'Visit us in person',
      contact: 'Accra, Ghana',
      availability: 'Mon-Fri, 9AM-5PM GMT',
      color: 'orange'
    }
  ];

  const supportCategories = [
    {
      icon: HelpCircle,
      title: 'General Help',
      description: 'Common questions and basic support',
      articles: 25,
      color: 'blue'
    },
    {
      icon: BookOpen,
      title: 'Using the Platform',
      description: 'Guides on navigating and using features',
      articles: 18,
      color: 'green'
    },
    {
      icon: Users,
      title: 'Account & Billing',
      description: 'Subscription, payments, and account issues',
      articles: 12,
      color: 'purple'
    },
    {
      icon: Video,
      title: 'Technical Issues',
      description: 'Troubleshooting and technical problems',
      articles: 15,
      color: 'red'
    }
  ];

  const faqs = [
    {
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot Password" on the login page, enter your email address, and follow the instructions sent to your email.',
      category: 'Account'
    },
    {
      question: 'Can I download content for offline use?',
      answer: 'Yes, Premium subscribers can download lesson notes, assessments, and other resources for offline access.',
      category: 'Features'
    },
    {
      question: 'How do I cancel my subscription?',
      answer: 'Go to your account settings, select "Subscription", and click "Cancel Subscription". You\'ll retain access until the end of your billing period.',
      category: 'Billing'
    },
    {
      question: 'Is the content aligned with Ghana\'s curriculum?',
      answer: 'Yes, all our educational content is carefully aligned with Ghana\'s approved curriculum standards for all educational levels.',
      category: 'Content'
    },
    {
      question: 'How do I contact a teacher or tutor?',
      answer: 'Premium subscribers can access live tutoring sessions through the "Live Sessions" section in their dashboard.',
      category: 'Features'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept Mobile Money (MTN, Vodafone, AirtelTigo) and major credit/debit cards (Visa, MasterCard).',
      category: 'Billing'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: '',
        priority: 'medium'
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const getColorClasses = (color, type = 'bg') => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-600',
        icon: 'text-blue-600'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-600',
        icon: 'text-green-600'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-600',
        icon: 'text-purple-600'
      },
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        text: 'text-orange-600',
        icon: 'text-orange-600'
      },
      red: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-600',
        icon: 'text-red-600'
      }
    };
    return colors[color][type];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Contact & Support</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to help! Get in touch with our support team or find answers 
            to your questions in our comprehensive help center.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div
                key={index}
                className={`${getColorClasses(method.color, 'bg')} ${getColorClasses(method.color, 'border')} border rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-200`}
              >
                <Icon className={`h-12 w-12 ${getColorClasses(method.color, 'icon')} mx-auto mb-4`} />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                <div className={`font-medium ${getColorClasses(method.color, 'text')} mb-2`}>
                  {method.contact}
                </div>
                <div className="text-xs text-gray-500">{method.availability}</div>
              </div>
            );
          })}
        </div>

        {/* Contact Form and Support Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-green-800">Your message has been sent successfully! We'll get back to you soon.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a category</option>
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing & Subscription</option>
                    <option value="content">Content & Curriculum</option>
                    <option value="account">Account Issues</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description of your issue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Please provide detailed information about your inquiry..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Support Categories */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Help Center</h2>
            <div className="space-y-4">
              {supportCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div
                    key={index}
                    className={`${getColorClasses(category.color, 'bg')} ${getColorClasses(category.color, 'border')} border rounded-lg p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer`}
                  >
                    <div className="flex items-start">
                      <Icon className={`h-8 w-8 ${getColorClasses(category.color, 'icon')} mr-4 mt-1`} />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                        <div className={`text-sm ${getColorClasses(category.color, 'text')} font-medium`}>
                          {category.articles} articles available
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center">
                  <FileText className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="text-gray-900">Download User Guide</span>
                </button>
                <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center">
                  <Video className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="text-gray-900">Watch Tutorial Videos</span>
                </button>
                <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center">
                  <Users className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="text-gray-900">Join Community Forum</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm mb-2">{faq.answer}</p>
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {faq.category}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              View All FAQs
            </button>
          </div>
        </div>

        {/* Support Hours */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white text-center">
          <Clock className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Support Hours</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <h4 className="font-semibold mb-2">Phone & Live Chat</h4>
              <p className="text-blue-100">Monday - Friday</p>
              <p className="text-blue-100">8:00 AM - 6:00 PM GMT</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Email Support</h4>
              <p className="text-blue-100">24/7 Submission</p>
              <p className="text-blue-100">Response within 24 hours</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Emergency Support</h4>
              <p className="text-blue-100">Critical Issues Only</p>
              <p className="text-blue-100">Available 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;

