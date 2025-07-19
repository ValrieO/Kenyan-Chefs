import { createPageUrl } from '@/utils';
import { 
    ChefHat, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
      <header className="bg-black/80 backdrop-blur-sm text-white py-4 px-6 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ChefHat className="w-8 h-8 text-[#68BBE3]" />
            <span className="text-2xl font-bold">Kenyan Chefs</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link
              to='/'
              className="hover:text-[#68BBE3] transition-colors"
            >
              Home
            </Link>
            <Link
              to='/recipes'
              className="hover:text-[#68BBE3] transition-colors"
            >
              Recipes
            </Link>
            <Link
              to='/categories'
              className="hover:text-[#68BBE3] transition-colors"
            >
              Categories
            </Link>
            <a href="/about" className="hover:text-[#68BBE3] transition-colors">
              About
            </a>
            <a
              href="/contact"
              className="hover:text-[#68BBE3] transition-colors"
            >
              Contact
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/signup" className="bg-[#0E86D4] hover:bg-[#055C9D] px-4 py-2 rounded-lg transition-colors"
            >
              Sign Up
            </Link>
            <Link to="/login" className="border border-[#0E86D4] text-[#0E86D4] hover:bg-[#0E86D4] hover:text-white px-4 py-2 rounded-lg transition-colors">
              Log In
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 mt-4 py-4 px-6 rounded-lg">
            <nav className="flex flex-col space-y-4">
              <Link
                to={createPageUrl("Landing")}
                className="hover:text-[#68BBE3] transition-colors"
              >
                Home
              </Link>
              <Link
                to={createPageUrl("Recipes")}
                className="hover:text-[#68BBE3] transition-colors"
              >
                Recipes
              </Link>
              <Link
                to={createPageUrl("Categories")}
                className="hover:text-[#68BBE3] transition-colors"
              >
                Categories
              </Link>
              <a
                href="#about"
                className="hover:text-[#68BBE3] transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="hover:text-[#68BBE3] transition-colors"
              >
                Contact
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <button className="bg-[#0E86D4] hover:bg-[#055C9D] px-4 py-2 rounded-lg transition-colors">
                  Sign Up
                </button>
                <button className="border border-[#0E86D4] text-[#0E86D4] hover:bg-[#0E86D4] hover:text-white px-4 py-2 rounded-lg transition-colors">
                  Log In
                </button>
              </div>
            </nav>
          </div>
        )}
    </header>
  );
};

export default Header;