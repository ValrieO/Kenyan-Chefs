import Footer from '../components/common/Footer';
import CTASection from '../components/common/CTA';
import CommunitySection from '../components/common/Community';
import RecipeCard from '../components/common/Recipe-Card';
import Header from '../components/common/Header';


// Hero Section Component
const HeroSection = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-black/70 to-black/50 absolute z-10"></div>
        <img 
          src="./assets/images/background.png" 
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
          Discover authentic Kenyan recipes, connect with local chefs,<br />
          and share the flavors of home
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105">
            Explore Recipes
          </button>
          <button className="border-2 border-white hover:bg-white hover:text-black px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300">
            Join Community
          </button>
        </div>
      </div>
    </section>
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
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
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

// About Section Component
const AboutSection = () => {
  return (
    <section id="about" className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="/api/placeholder/600/400" 
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
              Each dish tells a story about our traditions, bringing families together 
              around the dinner table. We're dedicated to preserving and sharing authentic 
              Kenyan flavors with the world.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Landing Page Component
const KenyanChefsLanding = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <FeaturedRecipesSection />
      <AboutSection />
      <CommunitySection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default KenyanChefsLanding;