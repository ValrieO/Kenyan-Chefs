import React, { useState, useEffect } from 'react';
import { User } from '@/entities/User';
import { Recipe } from '@/entities/Recipe';
import { Camera, MapPin, Calendar, Edit3, Users, Soup, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RecipeCard from '@/components/recipes/RecipeCard';
import { format } from 'date-fns';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [userRecipes, setUserRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadProfileData();
    }, []);

    const loadProfileData = async () => {
        setIsLoading(true);
        try {
            const currentUser = await User.me();
            setUser(currentUser);
            const recipes = await Recipe.filter({ created_by: currentUser.email }, '-created_date');
            setUserRecipes(recipes);
        } catch (error) {
            console.error('Failed to load profile data:', error);
        }
        setIsLoading(false);
    };

    if (isLoading) {
        return (
            <div className="space-y-8">
                <div className="h-32 bg-sky-100 animate-pulse rounded-lg"></div>
                <div className="h-64 bg-white animate-pulse rounded-lg"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Profile Header */}
            <Card className="border-sky-200 overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-sky-400 to-sky-600"></div>
                <CardContent className="relative pt-0 pb-6">
                    <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16">
                        <div className="relative">
                            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                                <AvatarImage src={user?.profile?.avatar} alt={user?.full_name} />
                                <AvatarFallback className="bg-sky-500 text-white text-3xl">
                                    {user?.full_name?.[0]?.toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <Button size="icon" className="absolute bottom-0 right-0 h-8 w-8 bg-sky-600 hover:bg-sky-700">
                                <Camera className="h-4 w-4" />
                            </Button>
                        </div>
                        
                        <div className="flex-1 md:pb-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-sky-800">{user?.full_name}</h1>
                                    {user?.profile?.verified && (
                                        <Badge className="bg-sky-100 text-sky-700 mt-1">Verified Chef</Badge>
                                    )}
                                    <div className="flex items-center gap-4 mt-2 text-sm text-sky-600">
                                        {user?.profile?.location && (
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" />
                                                <span>{user.profile.location}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            <span>Joined {format(new Date(user?.created_date), 'MMMM yyyy')}</span>
                                        </div>
                                    </div>
                                </div>
                                <Button className="bg-sky-600 hover:bg-sky-700">
                                    <Edit3 className="h-4 w-4 mr-2" />
                                    Edit Profile
                                </Button>
                            </div>
                            
                            {user?.profile?.bio && (
                                <p className="mt-4 text-sky-700">{user.profile.bio}</p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-sky-200">
                    <CardContent className="p-6 text-center">
                        <Soup className="h-8 w-8 text-sky-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-sky-800">{userRecipes.length}</div>
                        <div className="text-sm text-sky-600">Recipes</div>
                    </CardContent>
                </Card>
                <Card className="border-sky-200">
                    <CardContent className="p-6 text-center">
                        <Users className="h-8 w-8 text-sky-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-sky-800">{user?.social?.followersCount || 0}</div>
                        <div className="text-sm text-sky-600">Followers</div>
                    </CardContent>
                </Card>
                <Card className="border-sky-200">
                    <CardContent className="p-6 text-center">
                        <Heart className="h-8 w-8 text-sky-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-sky-800">{user?.stats?.likesReceived || 0}</div>
                        <div className="text-sm text-sky-600">Likes Received</div>
                    </CardContent>
                </Card>
            </div>

            {/* Profile Content */}
            <Tabs defaultValue="recipes" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2 bg-sky-100">
                    <TabsTrigger value="recipes" className="data-[state=active]:bg-sky-600 data-[state=active]:text-white">
                        My Recipes
                    </TabsTrigger>
                    <TabsTrigger value="about" className="data-[state=active]:bg-sky-600 data-[state=active]:text-white">
                        About
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="recipes" className="space-y-6">
                    <Card className="border-sky-200">
                        <CardHeader>
                            <CardTitle className="text-sky-800">My Recipes ({userRecipes.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {userRecipes.map(recipe => (
                                    <RecipeCard key={recipe.id} recipe={recipe} />
                                ))}
                            </div>
                            {userRecipes.length === 0 && (
                                <div className="text-center py-16">
                                    <Soup className="h-16 w-16 text-sky-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-sky-700 mb-2">No recipes yet</h3>
                                    <p className="text-sky-600">Share your first recipe with the community!</p>
                                    <Button className="mt-4 bg-sky-600 hover:bg-sky-700">
                                        Create Recipe
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="about" className="space-y-6">
                    <Card className="border-sky-200">
                        <CardHeader>
                            <CardTitle className="text-sky-800">About Me</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {user?.profile?.bio ? (
                                <p className="text-sky-700">{user.profile.bio}</p>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-sky-600">No bio added yet.</p>
                                    <Button className="mt-4 bg-sky-600 hover:bg-sky-700">
                                        Add Bio
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}