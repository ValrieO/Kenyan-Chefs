import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  Heart,
  Clock,
  Users,
  Star,
  Share2,
  ChefHat,
  Menu,
  X,
} from "lucide-react";
import { featuredRecipes } from "@/data/featuredRecipes.js";
import { motion } from "framer-motion";
import Header from "@/components/common/Header";
import BackgroundImg from "@/assets/images/Background.png";
import headerImage from '../assets/images/fried-chicken-breast-with-vegetables.jpg';


function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    console.log("Subscribing email:", email);
    setEmail("");
  };

  const RecipeCard = ({ recipe }) => {
    const [isLiked, setIsLiked] = useState(false);

    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative">
          <img
            src={
              recipe.image_url ||
              `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop`
            }
            alt={recipe.title}
            className="w-full h-48 object-cover"
          />
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full p-2 hover:bg-black/80 transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${
                isLiked ? "text-red-500 fill-red-500" : "text-white"
              }`}
            />
          </button>
          <div className="absolute bottom-4 left-4 bg-[#0E86D4] text-white px-3 py-1 rounded-full text-sm font-semibold">
            {recipe.category}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
          <p className="text-gray-600 mb-4">
            by {recipe.chef_name || "Anonymous Chef"}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>
                  {(recipe.prep_time || 0) + (recipe.cook_time || 0)} min
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{recipe.difficulty}</span>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold">{recipe.rating}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-[#0E86D4]">
              <Heart className="w-4 h-4" />
              <span className="text-sm">{recipe.total_reviews || 0}</span>
            </div>
            <button className="flex items-center space-x-1 text-gray-600 hover:text-[#0E86D4] transition-colors">
              <Share2 className="w-4 h-4" />
              <span className="text-sm">Share</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const communityPosts = [
    {
      id: 1,
      title: "Mukimo wa Kienyeji",
      author: "Catherine Njeri",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b577?w=40&h=40&fit=crop&crop=face",
      image:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=250&h=180&fit=crop",
      description:
        "I love to use my mother's Mukimo recipe to connect with my roots. Every time I make it, it feels like getting a warm hug from home.",
      likes: 42,
      shares: 8,
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Tilapia wa Nazi",
      author: "Ali Mwangi",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      image:
        "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=250&h=180&fit=crop",
      description:
        "The flavors from Lake Victoria! Nothing beats a whole chicken, beef curry, or fish cooked the way my grandmother taught me.",
      likes: 38,
      shares: 12,
      time: "4 hours ago",
    },
    {
      id: 3,
      title: "Mandazi za Asali",
      author: "Fatuma Said",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=250&h=180&fit=crop",
      description:
        "My grandma from Lamu taught me this recipe. The honey gives it that special sweetness that makes it unique.",
      likes: 56,
      shares: 15,
      time: "6 hours ago",
    },
    {
      id: 4,
      title: "Chapati za Ufuta",
      author: "Samuel Kimani",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      image:
        "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=250&h=180&fit=crop",
      description:
        "The perfect chapati requires patience and the right technique. Here's how my mother taught me to make them soft and fluffy.",
      likes: 29,
      shares: 6,
      time: "8 hours ago",
    },
  ];

  const CommunityPost = ({ post }) => {
    const [isLiked, setIsLiked] = useState(false);

    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover"
        />

        <div className="p-6">
          <div className="flex items-center mb-4">
            <img
              src={post.avatar}
              alt={post.author}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h4 className="font-bold text-lg">{post.title}</h4>
              <p className="text-gray-600 text-sm">{post.author}</p>
            </div>
          </div>

          <p className="text-gray-700 mb-4 leading-relaxed">
            {post.description}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="flex items-center space-x-1 hover:text-[#0E86D4] transition-colors"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isLiked ? "text-red-500 fill-red-500" : ""
                  }`}
                />
                <span>{post.likes}</span>
              </button>
              <div className="flex items-center space-x-1">
                <Share2 className="w-4 h-4" />
                <span>{post.shares}</span>
              </div>
            </div>
            <span>{post.time}</span>
          </div>
        </div>
      </div>
    );
  };

  // Featured Recipes Section
  const FeaturedRecipesSection = () => {
    return (
      <section id="recipes" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Discover, Create, Share
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Check out these popular recipes of the week
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              See All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-12"
    >
      <div className="min-h-screen bg-gray-50">
        <Header />
        {/* Hero Section */}
        <section
          id="home"
          className="relative h-screen flex items-center justify-center text-white"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-gradient-to-br from-black/70 to-black/50 absolute z-10"></div>
            <img
              src={BackgroundImg}
              alt="Kenyan cuisine background"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
              KENYAN CHEFS
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed animate-slide-up">
              Discover authentic Kenyan recipes, connect with local chefs,
              <br />
              and share the flavors of home
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link
                to={createPageUrl("Recipes")}
                className="bg-[#0E86D4] hover:bg-[#055C9D] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Explore Recipes
              </Link>
              <button className="border-2 border-white hover:bg-white hover:text-[#003060] px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300">
                Join Community
              </button>
            </div>
          </div>
        </section>

        {/* Featured Recipes Section */}
        <section id="recipes" className="py-16 px-6">
          <FeaturedRecipesSection />
        </section>

        {/* About Section */}
        <section id="about" className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src={headerImage}
                  alt="Kenyan cooking"
                  className="rounded-2xl shadow-lg"
                />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  About Us
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Our recipes are the heart and soul of our culinary heritage.
                  Each dish tells a story about our traditions, bringing
                  families together around the dinner table. We're dedicated to
                  preserving and sharing authentic Kenyan flavors with the
                  world.
                </p>
                <button className="bg-[#0E86D4] hover:bg-[#055C9D] text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                From Our Community
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {communityPosts.map((post) => (
                <CommunityPost key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-[#68BBE3] to-[#0E86D4] text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Embrace the joy of cooking with us!
            </h2>
            <p className="text-xl mb-8">
              Join our community of passionate Kenyan chefs and food lovers.
              Your culinary adventure begins now!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#0E86D4] hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors">
                Get Started
              </button>
              <button className="border-2 border-white hover:bg-white hover:text-[#0E86D4] px-8 py-4 rounded-lg font-semibold transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="bg-[#003060] text-white py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <ChefHat className="w-6 h-6 text-[#68BBE3]" />
                  <span className="text-xl font-bold">Kenyan Chefs</span>
                </div>
                <p className="text-gray-400">
                  Connecting Kenyan food lovers through authentic recipes and
                  shared culinary experiences.
                </p>
              </div>

              <div>
                <h4 className="font-bold mb-4">Menu</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link
                      to={createPageUrl("Landing")}
                      className="hover:text-[#68BBE3] transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={createPageUrl("Recipes")}
                      className="hover:text-[#68BBE3] transition-colors"
                    >
                      Recipes
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={createPageUrl("Categories")}
                      className="hover:text-[#68BBE3] transition-colors"
                    >
                      Categories
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#about"
                      className="hover:text-[#68BBE3] transition-colors"
                    >
                      About
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4">Categories</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a
                      href="#breakfast"
                      className="hover:text-[#68BBE3] transition-colors"
                    >
                      Breakfast
                    </a>
                  </li>
                  <li>
                    <a
                      href="#lunch"
                      className="hover:text-[#68BBE3] transition-colors"
                    >
                      Lunch
                    </a>
                  </li>
                  <li>
                    <a
                      href="#dinner"
                      className="hover:text-[#68BBE3] transition-colors"
                    >
                      Dinner
                    </a>
                  </li>
                  <li>
                    <a
                      href="#desserts"
                      className="hover:text-[#68BBE3] transition-colors"
                    >
                      Desserts
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-4">Newsletter</h4>
                <p className="text-gray-400 mb-4">
                  Stay updated with our latest recipes and cooking tips.
                </p>
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 px-4 py-2 rounded-l-lg text-gray-900"
                  />
                  <button
                    onClick={handleSubscribe}
                    className="bg-[#0E86D4] hover:bg-[#055C9D] px-4 py-2 rounded-r-lg transition-colors"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-[#055C9D] mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Kenyan Chefs. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </motion.div>
  );
}

export default Landing;
