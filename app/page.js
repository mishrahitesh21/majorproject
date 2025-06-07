// File: app/page.js
"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      title: "Crop Recommendation",
      description: "Get personalized crop recommendations based on soil conditions, climate, and market trends.",
      icon: "🌾",
      benefits: ["Soil analysis", "Climate optimization", "Market insights"]
    },
    {
      title: "Fish Farming",
      description: "Optimize your aquaculture operations with AI-powered insights and monitoring.",
      icon: "🐟",
      benefits: ["Water quality monitoring", "Feed optimization", "Disease prevention"]
    },
    {
      title: "Insect Detection",
      description: "Early detection and identification of harmful insects to protect your crops.",
      icon: "🔍",
      benefits: ["Real-time detection", "Species identification", "Treatment recommendations"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🌱</span>
              <span className="text-xl font-bold text-green-700">SmartNexus</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-700 hover:text-green-600 transition-colors">
                Features
              </Link>
              <Link href="#about" className="text-gray-700 hover:text-green-600 transition-colors">
                About
              </Link>
              <Link href="#contact" className="text-gray-700 hover:text-green-600 transition-colors">
                Contact
              </Link>
            
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <Link href="#features" className="text-gray-700 hover:text-green-600">Features</Link>
                <Link href="#about" className="text-gray-700 hover:text-green-600">About</Link>
                <Link href="#contact" className="text-gray-700 hover:text-green-600">Contact</Link>
                <Link 
                  href="/admin" 
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-center"
                >
                  Login as Admin
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Smart Agriculture
            <span className="text-green-600"> Solutions</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Revolutionize your farming with AI-powered crop recommendations, 
            fish farming optimization, and intelligent insect detection systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/dashboard" 
              className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-green-700 transition-colors shadow-lg"
            >
              Get Started
            </Link>
            <Link 
              href="#features" 
              className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-green-50 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Solutions</h2>
            <p className="text-xl text-gray-600">Comprehensive tools for modern agriculture</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <span className="text-green-500 mr-2">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-green-600 text-white">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-green-100">Farmers Helped</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-green-100">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-green-100">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">About SmartNexus</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            SmartNexus combines cutting-edge AI technology with agricultural expertise to provide 
            farmers with intelligent solutions for crop management, aquaculture, and pest control. 
            Our mission is to make farming more efficient, sustainable, and profitable through 
            data-driven insights and recommendations.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Farm?</h2>
          <p className="text-xl mb-8">Join thousands of farmers who trust SmartNexus for their agricultural needs.</p>
          <Link 
            href="/dashboard" 
            className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors shadow-lg inline-block"
          >
            Start Your Journey
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 text-white py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🌱</span>
                <span className="text-xl font-bold">SmartNexus</span>
              </div>
              <p className="text-gray-400">
                Empowering farmers with AI-driven agricultural solutions.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Crop Recommendation</li>
                <li>Fish Farming</li>
                <li>Insect Detection</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>Email: info@SmartNexus.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Address: 123 Farm St, Agriculture City</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} SmartNexus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}