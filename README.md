# Create directory structure
mkdir -p src/{pages,hooks,utils,contexts,services,assets}
mkdir -p src/components/{layout,recipe,user,forms}
mkdir -p src/assets/{images,icons}
mkdir -p src/{components,pages,hooks,utils,context,services,assets}
mkdir -p src/components/{auth}
mkdir -p src/pages/{home,recipes,chefs,auth}

# Create placeholder files
touch src/components/layout/Header.jsx
touch src/components/layout/Footer.jsx
touch src/components/layout/Layout.jsx
touch src/components/common/Loading.jsx
touch src/components/common/ErrorBoundary.jsx
touch src/components/recipe/RecipeCard.jsx
touch src/components/recipe/RecipeList.jsx
touch src/pages/Home.jsx
touch src/pages/Recipes.jsx
touch src/pages/RecipeDetail.jsx
touch src/pages/Profile.jsx
touch src/hooks/useAuth.js
touch src/hooks/useRecipes.js
touch src/contexts/AuthContext.jsx
touch src/services/api.js
touch src/utils/constants.js
touch src/utils/helpers.js

// Using your custom colors
<div className="bg-primary text-white">Primary Button</div>
<div className="bg-primary-light text-secondary">Light Background</div>
<div className="bg-secondary text-primary-light">Dark Background</div>
<div className="text-primary-dark">Dark Text</div>

// Using the brand scale
<div className="bg-brand-500 hover:bg-brand-600">Hover Effect</div>
<div className="from-brand-400 to-brand-700">Gradient</div>