export // Footer Component
const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    // Handle newsletter subscription
    console.log('Subscribing email:', email);
    setEmail('');
  };

  return (
    <footer id="contact" className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <ChefHat className="w-6 h-6 text-orange-500" />
              <span className="text-xl font-bold">Kenyan Chefs</span>
            </div>
            <p className="text-gray-400">
              Connecting Kenyan food lovers through authentic recipes and shared culinary experiences.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Menu</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#home" className="hover:text-orange-500 transition-colors">Home</a></li>
              <li><a href="#recipes" className="hover:text-orange-500 transition-colors">Recipes</a></li>
              <li><a href="#chefs" className="hover:text-orange-500 transition-colors">Chefs</a></li>
              <li><a href="#about" className="hover:text-orange-500 transition-colors">About</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#breakfast" className="hover:text-orange-500 transition-colors">Breakfast</a></li>
              <li><a href="#lunch" className="hover:text-orange-500 transition-colors">Lunch</a></li>
              <li><a href="#dinner" className="hover:text-orange-500 transition-colors">Dinner</a></li>
              <li><a href="#desserts" className="hover:text-orange-500 transition-colors">Desserts</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">Stay updated with our latest recipes and cooking tips.</p>
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
                className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-r-lg transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Kenyan Chefs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer