import React, { useState, useEffect } from 'react';
import { User } from '@/entities/User';
import { Recipe } from '@/entities/Recipe';
import WelcomeHeader from '@/components/dashboard/WelcomeHeader';
import StatCard from '@/components/dashboard/StatCard';
import MyRecipes from '@/components/dashboard/MyRecipes';
import ProfileCompletion from '@/components/dashboard/ProfileCompletion';
import { Soup, Heart, Users } from 'lucide-react';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const currentUser = await User.me();
                setUser(currentUser);
                const userRecipes = await Recipe.filter({ created_by: currentUser.email }, '-created_date', 5);
                setRecipes(userRecipes);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            }
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const profileIsComplete = user?.profile?.bio && user?.profile?.location;
    
    // Aggregate stats for display
    const likesReceived = recipes.reduce((acc, recipe) => acc + (recipe.engagement?.likesCount || 0), 0);

    return (
        <div className="space-y-8">
            <WelcomeHeader user={user} isLoading={isLoading} />

            {!profileIsComplete && !isLoading && (
                <ProfileCompletion />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard 
                    icon={Soup} 
                    label="My Recipes" 
                    value={user?.stats?.recipesCount || recipes.length} 
                    color="primary"
                    isLoading={isLoading}
                />
                <StatCard 
                    icon={Heart} 
                    label="Likes Received" 
                    value={user?.stats?.likesReceived || likesReceived}
                    color="secondary"
                    isLoading={isLoading}
                />
                <StatCard 
                    icon={Users} 
                    label="Followers" 
                    value={user?.social?.followersCount || 0}
                    color="accent"
                    isLoading={isLoading}
                />
            </div>
            
            <MyRecipes recipes={recipes} isLoading={isLoading} />
        </div>
    );
}
