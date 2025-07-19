import { Share2 } from "lucide-react";
import { Heart } from "lucide-react";
import { useState } from "react";

const communityPosts = [
  {
    id: 1,
    title: "Mukimo wa Kienyeji",
    author: "Catherine Njeri",
    avatar: "/api/placeholder/40/40",
    image: "/api/placeholder/250/180",
    description: "I love to use my mother's Mukimo recipe to connect with my roots. Every time I make it, it feels like getting a warm hug from home.",
    likes: 42,
    shares: 8,
    time: "2 hours ago"
  },
  {
    id: 2,
    title: "Tilapia wa Nazi",
    author: "Ali Mwangi",
    avatar: "/api/placeholder/40/40",
    image: "/api/placeholder/250/180",
    description: "The flavors from Lake Victoria! Nothing beats a whole chicken, beef curry, or fish cooked the way my grandmother taught me.",
    likes: 38,
    shares: 12,
    time: "4 hours ago"
  },
  {
    id: 3,
    title: "Mandazi za Asali",
    author: "Fatuma Said",
    avatar: "/api/placeholder/40/40",
    image: "/api/placeholder/250/180",
    description: "My grandma from Lamu taught me this recipe. The honey gives it that special sweetness that makes it unique.",
    likes: 56,
    shares: 15,
    time: "6 hours ago"
  },
  {
    id: 4,
    title: "Chapati za Ufuta",
    author: "Samuel Kimani",
    avatar: "/api/placeholder/40/40",
    image: "/api/placeholder/250/180",
    description: "The perfect chapati requires patience and the right technique. Here's how my mother taught me to make them soft and fluffy.",
    likes: 29,
    shares: 6,
    time: "8 hours ago"
  }
];

const CommunityPost = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <img 
        src={post.image} 
        alt={post.title} 
        className="w-full h-48 object-cover"
      />
      
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img 
            src={post.avatar} 
            alt={post.author} 
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h4 className="font-bold text-lg">{post.title}</h4>
            <p className="text-gray-600 text-sm">{post.author}</p>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4 leading-relaxed">
          {post.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className="flex items-center space-x-1 hover:text-orange-500 transition-colors"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'text-red-500 fill-red-500' : ''}`} />
              <span>{post.likes}</span>
            </button>
            <div className="flex items-center space-x-1">
              <Share2 className="w-4 h-4" />
              <span>{post.shares}</span>
            </div>
          </div>
          <span>{post.time}</span>
        </div>
      </div>
    </div>
  );
};

// Community Section Component
const CommunitySection = () => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            From Our Community
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {communityPosts.map((post) => (
            <CommunityPost key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection