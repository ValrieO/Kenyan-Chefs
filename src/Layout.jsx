
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, Search, BookOpen, Grid3x3, User, Heart, LogOut } from "lucide-react";
import { User as AuthUser } from "@/entities/User";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const navigationItems = [
  { title: "Home", url: createPageUrl("Landing"), icon: Home },
  { title: "Recipes", url: createPageUrl("Recipes"), icon: BookOpen },
  { title: "Categories", url: createPageUrl("Categories"), icon: Grid3x3 },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await AuthUser.me();
        setCurrentUser(user);
      } catch (e) {
        // User not logged in or error fetching user
        setCurrentUser(null);
      } finally {
        setIsLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogin = async () => {
    try {
      await AuthUser.login();
      // Optionally re-fetch user or handle redirect after successful login
      const user = await AuthUser.me();
      setCurrentUser(user);
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error (e.g., show a toast message)
    }
  };

  const handleLogout = async () => {
    try {
      await AuthUser.logout();
      setCurrentUser(null);
      window.location.reload(); // Reload to clear any user-specific data or routes
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle logout error
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 relative">
      <style>{`
        :root {
          --brand-50: #f0f9ff;
          --brand-100: #e0f2fe;
          --brand-200: #bae6fd;
          --brand-300: #7dd3fc;
          --brand-400: #38bdf8;
          --brand-500: #2E8BC0;
          --brand-600: #145DA0;
          --brand-700: #0C2D48;
          --brand-800: #075985;
          --brand-900: #0c4a6e;
        }
        
        .neumorphic {
          box-shadow: 8px 8px 16px rgba(163, 177, 198, 0.6), 
                      -8px -8px 16px rgba(255, 255, 255, 0.5);
        }
        
        .neumorphic-inset {
          box-shadow: inset 8px 8px 16px rgba(163, 177, 198, 0.6), 
                      inset -8px -8px 16px rgba(255, 255, 255, 0.5);
        }
        
        .neumorphic-soft {
          box-shadow: 4px 4px 8px rgba(163, 177, 198, 0.4), 
                      -4px -4px 8px rgba(255, 255, 255, 0.3);
        }
        
        .neumorphic-button {
          box-shadow: 6px 6px 12px rgba(163, 177, 198, 0.5), 
                      -6px -6px 12px rgba(255, 255, 255, 0.4);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .neumorphic-button:hover {
          box-shadow: 10px 10px 20px rgba(163, 177, 198, 0.6), 
                      -10px -10px 20px rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
        }
        
        .neumorphic-button:active {
          box-shadow: inset 4px 4px 8px rgba(163, 177, 198, 0.5), 
                      inset -4px -4px 8px rgba(255, 255, 255, 0.4);
          transform: translateY(0);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, var(--brand-600), var(--brand-400));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .brand-shadow {
          box-shadow: 0 20px 40px rgba(46, 139, 192, 0.15);
        }
      `}</style>
      
      {/* Header */}
      <header className="relative z-10 bg-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to={createPageUrl("Landing")} className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-200 rounded-2xl neumorphic-soft flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-brand-600" />
            </div>
            <span className="text-2xl font-bold gradient-text">RecipeApp</span>
          </Link>
          
          <nav className="hidden md:flex space-x-2">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                to={item.url}
                className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  location.pathname === item.url
                    ? "bg-brand-500 text-white brand-shadow"
                    : "bg-gray-200 text-gray-700 neumorphic-button hover:text-brand-600"
                }`}
              >
                <span className="flex items-center space-x-2">
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </span>
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-3">
            <button className="w-12 h-12 bg-gray-200 rounded-2xl neumorphic-button flex items-center justify-center">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <button className="w-12 h-12 bg-gray-200 rounded-2xl neumorphic-button flex items-center justify-center">
              <Heart className="w-5 h-5 text-gray-600" />
            </button>
            
            {isLoadingUser ? (
                <div className="w-12 h-12 bg-gray-200 rounded-2xl neumorphic-button flex items-center justify-center animate-pulse">
                    <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                </div>
            ) : currentUser ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="w-12 h-12 bg-gray-200 rounded-2xl neumorphic-button flex items-center justify-center">
                            <User className="w-5 h-5 text-brand-600" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="neumorphic-soft bg-gray-200 border-none mr-4 mt-2">
                        <DropdownMenuLabel>Welcome, {currentUser.full_name.split(' ')[0]}</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-gray-300/50" />
                        <DropdownMenuItem className="cursor-pointer hover:!bg-gray-300/50 focus:!bg-gray-300/50">My Profile</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:!bg-gray-300/50 focus:!bg-gray-300/50">My Recipes</DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-300/50" />
                        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 hover:!bg-red-100 focus:!bg-red-100">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log Out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <button onClick={handleLogin} className="w-12 h-12 bg-gray-200 rounded-2xl neumorphic-button flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-0">
        {children}
      </main>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-200 px-6 py-4 z-20">
        <div className="bg-gray-200 rounded-3xl neumorphic p-2">
          <div className="flex justify-around">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                to={item.url}
                className={`p-3 rounded-2xl transition-all duration-300 ${
                  location.pathname === item.url
                    ? "bg-brand-500 text-white brand-shadow"
                    : "text-gray-600 hover:text-brand-600"
                }`}
              >
                <item.icon className="w-6 h-6" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
