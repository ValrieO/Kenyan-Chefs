import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  ChefHat,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowLeft,
} from "lucide-react";
import backgroundImage from "@/assets/images/register.jpg";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!formData.agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    setIsLoading(true);

    // Simulate signup process
    setTimeout(() => {
      console.log("Signup attempt:", formData);
      setIsLoading(false);
      alert("Registration functionality would be implemented here");
    }, 1000);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-8"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <style>{`
 :root {
          --brand-50: #f0f9ff;
          --brand-100: #e0f2fe;
          --brand-200: #bae6fd;
          --brand-300: #7dd3fc;
          --brand-400: #38bdf8;
          --brand-500: #2E8BC0;
          --brand-600: #145DA0;
          --brand-700: #0C2D48;
          --brand-800: #075985;
          --brand-900: #0c4a6e;
        }
        
        .neumorphic-inset {
          box-shadow: inset 6px 6px 12px rgba(163, 177, 198, 0.4), 
                      inset -6px -6px 12px rgba(255, 255, 255, 0.8);
        }
        
        .neumorphic-button {
          box-shadow: 6px 6px 12px rgba(163, 177, 198, 0.4), 
                      -6px -6px 12px rgba(255, 255, 255, 0.8);
          transition: all 0.3s ease;
        }
        
        .neumorphic-button:hover {
          box-shadow: 3px 3px 6px rgba(163, 177, 198, 0.4), 
                      -3px -3px 6px rgba(255, 255, 255, 0.8);
        }
        
        .neumorphic-button:active {
          box-shadow: inset 3px 3px 6px rgba(163, 177, 198, 0.4), 
                      inset -3px -3px 6px rgba(255, 255, 255, 0.8);
        }
        
        .brand-shadow {
          box-shadow: 6px 6px 16px rgba(46, 139, 192, 0.3);
        }
        
        .input-neumorphic {
          box-shadow: inset 4px 4px 8px rgba(163, 177, 198, 0.3), 
                      inset -4px -4px 8px rgba(255, 255, 255, 0.7);
          background: linear-gradient(145deg, #e6e6e6, #ffffff);
        }
        
        .input-neumorphic:focus {
          box-shadow: inset 4px 4px 8px rgba(163, 177, 198, 0.4), 
                      inset -4px -4px 8px rgba(255, 255, 255, 0.8),
                      0 0 0 2px var(--brand-400);
        }
      `}</style>
      <div className="bg-gray-300 rounded-3xl p-10 max-w-2xl w-full neumorphic">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-brand-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="text-center mb-8">
          <Link
            to="/signup"
            className="flex items-center justify-center space-x-2 mb-6"
          >
            <div className="w-16 h-16 bg-gray-300 rounded-2xl neumorphic-button flex items-center justify-center">
              <ChefHat className="w-8 h-8 text-brand-600" />
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Join Kenyan Chefs
          </h1>
          <p className="text-gray-600">Create your account and start cooking</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-3"
            >
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-gray-200 border-0 rounded-2xl input-neumorphic text-gray-800 placeholder-gray-500 focus:outline-none transition-all duration-300"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-3"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-gray-200 border-0 rounded-2xl input-neumorphic text-gray-800 placeholder-gray-500 focus:outline-none transition-all duration-300"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-3"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-4 bg-gray-200 border-0 rounded-2xl input-neumorphic text-gray-800 placeholder-gray-500 focus:outline-none transition-all duration-300"
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-3"
            >
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-4 bg-gray-200 border-0 rounded-2xl input-neumorphic text-gray-800 placeholder-gray-500 focus:outline-none transition-all duration-300"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="agreeToTerms"
              name="agreeToTerms"
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
              required
            />
            <label
              htmlFor="agreeToTerms"
              className="ml-2 block text-sm text-gray-700"
            >
              I agree to the{" "}
              <button
                type="button"
                className="text-brand-600 hover:text-brand-700 transition-colors"
              >
                Terms of Service
              </button>{" "}
              and{" "}
              <button
                type="button"
                className="text-brand-600 hover:text-brand-700 transition-colors"
              >
                Privacy Policy
              </button>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand-600 text-white py-4 px-6 rounded-2xl font-semibold hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 brand-shadow"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-200 text-gray-500">
                Or sign up with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="w-full bg-gray-200 py-3 px-4 rounded-2xl font-medium text-gray-700 neumorphic-button hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2">
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
                className="w-5 h-5"
              />
              <span>Google</span>
            </button>
            <button className="w-full bg-gray-200 py-3 px-4 rounded-2xl font-medium text-gray-700 neumorphic-button hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to={createPageUrl("SignIn")}
              className="font-medium text-brand-600 hover:text-brand-700 transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
