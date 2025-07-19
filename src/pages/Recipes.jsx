import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Recipe } from "@/entities/Recipe";
import { Search, Filter, Clock, Users, Star, Grid, List, ChefHat } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("rating");

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "breakfast", label: "Breakfast" },
    { value: "lunch", label: "Lunch" },
    { value: "dinner", label: "Dinner" },
    { value: "dessert", label: "Dessert" },
    { value: "snack", label: "Snack" },
    { value: "appetizer", label: "Appetizer" }
  ];

  const difficulties = [
    { value: "all", label: "All Levels" },
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" }
  ];

  const sortOptions = [
    { value: "rating", label: "Rating" },
    { value: "prep_time", label: "Prep Time" },
    { value: "created_date", label: "Newest" },
    { value: "title", label: "Name" }
  ];

  useEffect(() => {
    loadRecipes();
  }, []);

  useEffect(() => {
    filterRecipes();
  }, [recipes, searchTerm, selectedCategory, selectedDifficulty, sortBy]);

  const loadRecipes = async () => {
    try {
      const data = await Recipe.list("-rating", 50);
      setRecipes(data);
    } catch (error) {
      console.error("Error loading recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterRecipes = () => {
    let filtered = recipes.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || recipe.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === "all" || recipe.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });

    // Sort recipes
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "prep_time":
          return (a.prep_time || 0) - (b.prep_time || 0);
        case "created_date":
          return new Date(b.created_date) - new Date(a.created_date);
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredRecipes(filtered);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy": return "text-green-600 bg-green-100";
      case "medium": return "text-yellow-600 bg-yellow-100";
      case "hard": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 pb-20">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold gradient-text mb-4">Recipe Collection</h1>
            <p className="text-gray-600 text-lg">Discover your next favorite dish</p>
          </motion.div>

          {/* Search and Filters */}
          <div className="bg-gray-200 rounded-3xl neumorphic p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 bg-gray-200 rounded-2xl neumorphic-inset p-4">
                <div className="flex items-center space-x-3">
                  <Search className="w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search recipes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 bg-gray-200 rounded-2xl neumorphic-inset text-gray-700 outline-none"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>

                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-4 py-3 bg-gray-200 rounded-2xl neumorphic-inset text-gray-700 outline-none"
                >
                  {difficulties.map(diff => (
                    <option key={diff.value} value={diff.value}>{diff.label}</option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-gray-200 rounded-2xl neumorphic-inset text-gray-700 outline-none"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>Sort by {option.label}</option>
                  ))}
                </select>
              </div>

              {/* View Mode */}
              <div className="flex bg-gray-200 rounded-2xl neumorphic-inset p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    viewMode === "grid" 
                      ? "bg-brand-500 text-white brand-shadow" 
                      : "text-gray-600 hover:text-brand-600"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    viewMode === "list" 
                      ? "bg-brand-500 text-white brand-shadow" 
                      : "text-gray-600 hover:text-brand-600"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>
      </div>

      {/* Recipe Grid/List */}
      <div className="px-6">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className={`grid ${viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}>
              {Array(6).fill(0).map((_, index) => (
                <div key={index} className="bg-gray-200 rounded-3xl neumorphic p-6 animate-pulse">
                  <div className={`w-full ${viewMode === "grid" ? "h-48" : "h-32"} bg-gray-300 rounded-2xl mb-4`}></div>
                  <div className="h-6 bg-gray-300 rounded-xl mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded-lg mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-300 rounded-lg w-20"></div>
                    <div className="h-4 bg-gray-300 rounded-lg w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={viewMode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`grid ${viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}
              >
                {filteredRecipes.map((recipe, index) => (
                  <motion.div
                    key={recipe.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-gray-200 rounded-3xl neumorphic p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                  >
                    <Link to={createPageUrl(`Recipe?id=${recipe.id}`)} className="block">
                      <div className={`flex ${viewMode === "list" ? "flex-row space-x-6" : "flex-col"}`}>
                        <div className={`${viewMode === "list" ? "w-32 h-32" : "w-full h-48"} bg-gray-300 rounded-2xl mb-4 overflow-hidden flex-shrink-0`}>
                          <img
                            src={recipe.image_url || `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop`}
                            alt={recipe.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-bold text-gray-800 group-hover:text-brand-600 transition-colors">
                              {recipe.title}
                            </h3>
                            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                              {recipe.difficulty}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-600">{(recipe.prep_time || 0) + (recipe.cook_time || 0)} min</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-600">{recipe.servings || 4}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm text-gray-600">{recipe.rating || 4.5}</span>
                            </div>
                          </div>
                          
                          {recipe.chef_name && (
                            <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-gray-300">
                              <ChefHat className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600">by {recipe.chef_name}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {!isLoading && filteredRecipes.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-200 rounded-3xl neumorphic-soft flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No recipes found</h3>
              <p className="text-gray-600">Try adjusting your search terms or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}