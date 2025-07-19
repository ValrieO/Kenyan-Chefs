import { categories } from "@/data/categories";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Recipe } from "@/entities/Recipe";
import { Search, ChefHat, Clock, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

function Categories() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      const data = await Recipe.list("-rating", 100);
      setRecipes(data);
    } catch (error) {
      console.error("Error loading recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryStats = (categoryName) => {
    const categoryRecipes = recipes.filter(recipe => recipe.category === categoryName);
    const totalRecipes = categoryRecipes.length;
    const avgRating = categoryRecipes.reduce((sum, recipe) => sum + (recipe.rating || 0), 0) / totalRecipes || 0;
    const avgTime = categoryRecipes.reduce((sum, recipe) => sum + ((recipe.prep_time || 0) + (recipe.cook_time || 0)), 0) / totalRecipes || 0;
    
    return {
      totalRecipes,
      avgRating: avgRating.toFixed(1),
      avgTime: Math.round(avgTime)
    };
  };

  const filteredCategories = categories.filter(category =>
    category.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const popularCategories = categories
    .map(category => ({
      ...category,
      recipeCount: recipes.filter(recipe => recipe.category === category.name).length
    }))
    .sort((a, b) => b.recipeCount - a.recipeCount)
    .slice(0, 3);

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
            <h1 className="text-4xl font-bold gradient-text mb-4">Recipe Categories</h1>
            <p className="text-gray-600 text-lg">Explore recipes by category</p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gray-200 rounded-3xl neumorphic p-6 mb-8"
          >
            <div className="max-w-md mx-auto bg-gray-200 rounded-2xl neumorphic-inset p-4">
              <div className="flex items-center space-x-3">
                <Search className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Popular Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-brand-500" />
              <h2 className="text-2xl font-bold text-gray-800">Most Popular</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {popularCategories.map((category, index) => {
                const stats = getCategoryStats(category.name);
                return (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="bg-gray-200 rounded-3xl neumorphic p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                  >
                    <Link to={createPageUrl(`Recipes?category=${category.name}`)}>
                      <div className="text-center space-y-4">
                        <div className="text-5xl mb-3">
                          <img src={category.image} alt={category.label} className="w-full h-64" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-brand-600 transition-colors">
                          {category.label}
                        </h3>
                        <p className="text-gray-600 text-sm">{category.description}</p>
                        <div className="flex justify-center items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <ChefHat className="w-4 h-4" />
                            {stats.totalRecipes}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {stats.avgTime}m
                          </span>
                        </div>
                        <div className="w-full bg-gray-300 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full bg-gradient-to-r ${category.color}`}
                            style={{ width: `${Math.min(100, (stats.totalRecipes / 20) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* All Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">All Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {filteredCategories.map((category, index) => {
                const stats = getCategoryStats(category.name);
                return (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.05 }}
                    className="bg-gray-200 rounded-3xl neumorphic-button p-6 text-center cursor-pointer group hover:shadow-2xl transition-all duration-300"
                  >
                    <Link to={createPageUrl(`Recipes?category=${category.name}`)}>
                      <div className="space-y-3">
                        <div className="text-4xl mb-3">
                          <img src={category.image} alt={category.label} className="w-full h-44" />
                        </div>
                        <h3 className="font-bold text-gray-800 group-hover:text-brand-600 transition-colors">
                          {category.label}
                        </h3>
                        <p className="text-sm text-gray-600">{category.description}</p>
                        <div className="flex justify-center items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <ChefHat className="w-3 h-3" />
                            {stats.totalRecipes}
                          </span>
                          {stats.avgRating > 0 && (
                            <span className="flex items-center gap-1">
                              <span className="text-yellow-500">★</span>
                              {stats.avgRating}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-200 rounded-3xl neumorphic-soft flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No categories found</h3>
              <p className="text-gray-600">Try adjusting your search term</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default Categories;