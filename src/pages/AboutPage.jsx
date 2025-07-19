import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ChefHat, Leaf, Heart, Users } from 'lucide-react';

const teamMembers = [
  {
    name: 'Asha Juma',
    role: 'Founder & Head Chef',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=face',
    bio: 'Asha started Kenyan Chefs to share the rich, diverse flavors of her homeland with the world, inspired by her grandmother\'s recipes.'
  },
  {
    name: 'David Otieno',
    role: 'Lead Recipe Developer',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=120&h=120&fit=crop&crop=face',
    bio: 'David travels across Kenya to discover traditional cooking techniques and ingredients, ensuring every recipe is authentic and delicious.'
  },
  {
    name: 'Fatima Ali',
    role: 'Community Manager',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face',
    bio: 'Fatima connects with our community of food lovers, sharing their stories and celebrating the joy of Kenyan cooking together.'
  }
];

export default function About() {
  return (
    <div className="">
      {/* Hero Section */}
      <div className="relative h-80 bg-black text-white">
        <img 
          src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&h=600&fit=crop" 
          alt="A spread of delicious food"
          className="w-full h-80 object-cover opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold">About Kenyan Chefs</h1>
            <p className="text-xl mt-4">Sharing the Heart and Soul of Kenyan Cuisine</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 px-6 max-w-7xl mx-auto">
        {/* Our Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Kenyan Chefs was born from a simple idea: to create a space where the vibrant, diverse, and delicious recipes of Kenya could be celebrated and shared. Our journey began in a family kitchen, filled with the aromas of spices and the warmth of shared meals. We wanted to bottle that feeling and share it with the world.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We believe that food is more than just sustenance; it's a connection to our heritage, a way to tell stories, and a bridge between generations. Each recipe on our platform has been carefully curated, tested, and loved, ensuring that you get an authentic taste of Kenya with every dish you create.
            </p>
          </div>
          <div>
            <img 
              src="https://th.bing.com/th/id/R.5c364c969e5e6c074c09879784cd08da?rik=cHKXLC%2bYbp2AWQ&riu=http%3a%2f%2fvanderbiltpoliticalreview.com%2fwp-content%2fuploads%2fiStock-589415708.jpg&ehk=%2b0MRvSSJuol2WvNq9hlellc%2bTqihFUn3S%2fNhqE6ICrU%3d&risl=1&pid=ImgRaw&r=0" 
              alt="Ingredients for Kenyan cooking" 
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>

        {/* Our Mission */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <Heart className="w-12 h-12 text-[#0E86D4] mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Preserve Heritage</h3>
              <p>To document and preserve the rich culinary traditions of Kenya for future generations.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <Users className="w-12 h-12 text-[#0E86D4] mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Build Community</h3>
              <p>To connect food lovers, home cooks, and professional chefs who share a passion for Kenyan food.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <Leaf className="w-12 h-12 text-[#0E86D4] mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Inspire Creativity</h3>
              <p>To inspire you to explore new flavors and create delicious, memorable meals in your own kitchen.</p>
            </div>
          </div>
        </div>

        {/* Meet the Team */}
        <div>
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Meet the Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamMembers.map(member => (
              <div key={member.name} className="text-center">
                <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg"/>
                <h3 className="text-2xl font-bold">{member.name}</h3>
                <p className="text-[#0E86D4] font-semibold mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}