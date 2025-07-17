import { 
    ChefHat, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black/80 backdrop-blur-sm text-white py-4 px-6 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ChefHat className="w-8 h-8 text-orange-500" />
          <span className="text-2xl font-bold">Kenyan Chefs</span>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <a href="#home" className="hover:text-orange-500 transition-colors">Home</a>
          <a href="#recipes" className="hover:text-orange-500 transition-colors">Recipes</a>
          <a href="#chefs" className="hover:text-orange-500 transition-colors">Chefs</a>
          <a href="#about" className="hover:text-orange-500 transition-colors">About</a>
          <a href="#contact" className="hover:text-orange-500 transition-colors">Contact</a>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg transition-colors">
            Sign Up
          </button>
          <button className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-4 py-2 rounded-lg transition-colors">
            Log In
          </button>
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
            <a href="#home" className="hover:text-orange-500 transition-colors">Home</a>
            <a href="#recipes" className="hover:text-orange-500 transition-colors">Recipes</a>
            <a href="#chefs" className="hover:text-orange-500 transition-colors">Chefs</a>
            <a href="#about" className="hover:text-orange-500 transition-colors">About</a>
            <a href="#contact" className="hover:text-orange-500 transition-colors">Contact</a>
            <div className="flex flex-col space-y-2 pt-4">
              <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg transition-colors">
                Sign Up
              </button>
              <button className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-4 py-2 rounded-lg transition-colors">
                Log In
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header