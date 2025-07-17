# Create directory structure
mkdir -p src/{components,pages,hooks,utils,contexts,services,assets}
mkdir -p src/components/{common,layout,recipe,user,forms}
mkdir -p src/assets/{images,icons}

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