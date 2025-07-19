
import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Recipe } from "@/entities/Recipe";
import { ArrowLeft, Clock, Users, Star, ChefHat, BookOpen, Heart, Share2, Printer } from "lucide-react";
import { motion } from "framer-motion";

export default function RecipeDetail() {
  const [searchParams] = useSearchParams();
  const recipeId = searchParams.get("id");
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ingredients");
  const [servings, setServings] = useState(4);

  useEffect(() => {
    if (recipeId) {
      loadRecipe();
    }
  }, [recipeId]);

  const loadRecipe = async () => {
    try {
      const recipes = await Recipe.filter({ id: recipeId });
      if (recipes.length > 0) {
        setRecipe(recipes[0]);
        setServings(recipes[0].servings || 4);
      }
    } catch (error) {
      console.error("Error loading recipe:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const adjustIngredientAmount = (originalAmount, originalServings) => {
    if (!originalAmount || !originalServings) return originalAmount;
    const multiplier = servings / originalServings;
    const numericAmount = parseFloat(originalAmount);
    if (isNaN(numericAmount)) return originalAmount;
    return (numericAmount * multiplier).toFixed(2).replace(/\.?0+$/, '');
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy": return "text-green-600 bg-green-100";
      case "medium": return "text-yellow-600 bg-yellow-100";
      case "hard": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-200 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-200 rounded-3xl neumorphic p-8 animate-pulse">
            <div className="w-full h-64 bg-gray-300 rounded-2xl mb-6"></div>
            <div className="h-8 bg-gray-300 rounded-xl mb-4"></div>
            <div className="h-6 bg-gray-300 rounded-lg mb-6"></div>
            <div className="grid grid-cols-3 gap-4">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-16 bg-gray-300 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-200 px-6 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gray-200 rounded-3xl neumorphic p-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Recipe Not Found</h1>
            <p className="text-gray-600 mb-8">The recipe you're looking for doesn't exist.</p>
            <Link
              to={createPageUrl("Recipes")}
              className="px-6 py-3 bg-brand-500 text-white rounded-2xl font-semibold brand-shadow hover:bg-brand-600 transition-all duration-300"
            >
              Browse Recipes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 pb-20">
      {/* Header */}
      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <Link
              to={createPageUrl("Recipes")}
              className="w-12 h-12 bg-gray-200 rounded-2xl neumorphic-button flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Recipe Details</h1>
          </motion.div>

          {/* Recipe Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gray-200 rounded-3xl neumorphic p-8 mb-8"
          >
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="w-full h-64 bg-gray-300 rounded-2xl overflow-hidden">
                <img
                  src={recipe.image_url || `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop`}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">{recipe.title}</h2>
                  <p className="text-gray-600 text-lg">{recipe.description}</p>
                </div>

                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-xl text-sm font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                    {recipe.difficulty}
                  </span>
                  <span className="px-3 py-1 bg-gray-300 text-gray-700 rounded-xl text-sm font-medium">
                    {recipe.category}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-200 rounded-2xl neumorphic-soft p-4 text-center">
                    <Clock className="w-6 h-6 text-brand-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Total Time</p>
                    <p className="font-semibold text-gray-800">{(recipe.prep_time || 0) + (recipe.cook_time || 0)} min</p>
                  </div>
                  <div className="bg-gray-200 rounded-2xl neumorphic-soft p-4 text-center">
                    <Users className="w-6 h-6 text-brand-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Servings</p>
                    <p className="font-semibold text-gray-800">{recipe.servings || 4}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-semibold text-gray-800">{recipe.rating || 4.5}</span>
                    <span className="text-gray-600">({recipe.total_reviews || 0} reviews)</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="w-10 h-10 bg-gray-200 rounded-xl neumorphic-button flex items-center justify-center">
                      <Heart className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="w-10 h-10 bg-gray-200 rounded-xl neumorphic-button flex items-center justify-center">
                      <Share2 className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="w-10 h-10 bg-gray-200 rounded-xl neumorphic-button flex items-center justify-center">
                      <Printer className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                {recipe.chef_name && (
                  <div className="flex items-center space-x-3 pt-4 border-t border-gray-300">
                    <ChefHat className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-600">Recipe by <span className="font-semibold">{recipe.chef_name}</span></span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Recipe Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-200 rounded-3xl neumorphic p-8"
          >
            {/* Tabs */}
            <div className="flex mb-8">
              <div className="bg-gray-200 rounded-2xl neumorphic-inset p-1 flex">
                <button
                  onClick={() => setActiveTab("ingredients")}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === "ingredients"
                      ? "bg-brand-500 text-white brand-shadow"
                      : "text-gray-600 hover:text-brand-600"
                  }`}
                >
                  Ingredients
                </button>
                <button
                  onClick={() => setActiveTab("instructions")}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === "instructions"
                      ? "bg-brand-500 text-white brand-shadow"
                      : "text-gray-600 hover:text-brand-600"
                  }`}
                >
                  Instructions
                </button>
                <button
                  onClick={() => setActiveTab("nutrition")}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === "nutrition"
                      ? "bg-brand-500 text-white brand-shadow"
                      : "text-gray-600 hover:text-brand-600"
                  }`}
                >
                  Nutrition
                </button>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === "ingredients" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">Ingredients</h3>
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-600">Servings:</span>
                    <div className="flex items-center bg-gray-200 rounded-xl neumorphic-inset">
                      <button
                        onClick={() => setServings(Math.max(1, servings - 1))}
                        className="p-2 rounded-xl hover:bg-gray-300 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-4 font-semibold text-gray-800">{servings}</span>
                      <button
                        onClick={() => setServings(servings + 1)}
                        className="p-2 rounded-xl hover:bg-gray-300 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {recipe.ingredients?.map((ingredient, index) => (
                    <div key={index} className="bg-gray-200 rounded-2xl neumorphic-soft p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-800">{ingredient.name}</span>
                        <span className="text-gray-600">
                          {adjustIngredientAmount(ingredient.amount, recipe.servings)} {ingredient.unit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "instructions" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800">Instructions</h3>
                <div className="space-y-4">
                  {recipe.instructions?.map((instruction, index) => (
                    <div key={index} className="bg-gray-200 rounded-2xl neumorphic-soft p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-brand-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {instruction.step}
                        </div>
                        <p className="text-gray-700 flex-1">{instruction.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "nutrition" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800">Nutritional Information</h3>
                {recipe.nutritional_info ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gray-200 rounded-2xl neumorphic-soft p-6 text-center">
                      <p className="text-2xl font-bold text-brand-600 mb-2">{recipe.nutritional_info.calories}</p>
                      <p className="text-gray-600">Calories</p>
                    </div>
                    <div className="bg-gray-200 rounded-2xl neumorphic-soft p-6 text-center">
                      <p className="text-2xl font-bold text-brand-600 mb-2">{recipe.nutritional_info.protein}g</p>
                      <p className="text-gray-600">Protein</p>
                    </div>
                    <div className="bg-gray-200 rounded-2xl neumorphic-soft p-6 text-center">
                      <p className="text-2xl font-bold text-brand-600 mb-2">{recipe.nutritional_info.carbs}g</p>
                      <p className="text-gray-600">Carbs</p>
                    </div>
                    <div className="bg-gray-200 rounded-2xl neumorphic-soft p-6 text-center">
                      <p className="text-2xl font-bold text-brand-600 mb-2">{recipe.nutritional_info.fat}g</p>
                      <p className="text-gray-600">Fat</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-200 rounded-2xl neumorphic-soft p-8 text-center">
                    <p className="text-gray-600">Nutritional information not available</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
