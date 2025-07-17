import { Heart, Clock, Users, Star, Share2 } from 'lucide-react';

const RecipeCard = ({ recipe }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-48 object-cover"
        />
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full p-2 hover:bg-black/80 transition-colors"
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-red-500' : 'text-white'}`} />
        </button>
        <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {recipe.region}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
        <p className="text-gray-600 mb-4">by {recipe.author}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{recipe.time}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{recipe.difficulty}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">{recipe.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-orange-500">
            <Heart className="w-4 h-4" />
            <span className="text-sm">{recipe.likes}</span>
          </div>
          <button className="flex items-center space-x-1 text-gray-600 hover:text-orange-500 transition-colors">
            <Share2 className="w-4 h-4" />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard