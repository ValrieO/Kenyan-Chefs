import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import headerImage from '../assets/images/fried-chicken-breast-with-vegetables.jpg';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to a backend or email service.
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-gray-50">
      <div className="relative bg-black text-white">
        <img 
          src={headerImage}
          alt="Contact background"
          className="w-full h-80 object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold">Contact Us</h1>
            <p className="text-xl mt-4">We'd love to hear from you!</p>
          </div>
        </div>
      </div>

      <div className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              <p className="text-gray-600">
                Have a question, a recipe to share, or just want to say hello? 
                Use the form or contact us directly.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="bg-[#0E86D4]/10 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-[#0E86D4]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <a href="mailto:hello@kenyachefs.com" className="text-gray-600 hover:text-[#0E86D4]">hello@kenyachefs.com</a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-[#0E86D4]/10 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-[#0E86D4]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <a href="tel:+254700000000" className="text-gray-600 hover:text-[#0E86D4]">+254 700 000 000</a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-[#0E86D4]/10 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-[#0E86D4]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Office</h3>
                  <p className="text-gray-600">123 Ngong Road, Nairobi, Kenya</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#0E86D4] focus:border-[#0E86D4]" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#0E86D4] focus:border-[#0E86D4]" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input type="text" name="subject" id="subject" required value={formData.subject} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#0E86D4] focus:border-[#0E86D4]" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea name="message" id="message" rows="6" required value={formData.message} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#0E86D4] focus:border-[#0E86D4]"></textarea>
              </div>
              <div>
                <button type="submit" className="flex items-center justify-center w-full bg-[#0E86D4] hover:bg-[#055C9D] text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}