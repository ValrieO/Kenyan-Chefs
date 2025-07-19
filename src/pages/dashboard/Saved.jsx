import React, { useState, useEffect } from 'react';
import { Recipe } from '@/entities/Recipe';  
import { Heart, BookOpen, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RecipeCard from '@/components/recipes/RecipeCard';

export default function Saved() {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [collections, setCollections] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadSavedData();
    }, []);

    const loadSavedData = async () => {
        setIsLoading(true);
        try {
            // For now, we'll show all published recipes as an example
            // In a real app, you'd have a saved recipes relationship
            const recipes = await Recipe.filter({ status: 'published' }, '-created_date', 10);
            setSavedRecipes(recipes);
        } catch (error) {
            console.error('Failed to load saved recipes:', error);
        }
        setIsLoading(false);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-sky-800 mb-2">My Saved Recipes</h1>
                <p className="text-sky-600">Your collection of favorite recipes</p>
            </div>

            <Tabs defaultValue="recipes" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2 bg-sky-100">
                    <TabsTrigger value="recipes" className="data-[state=active]:bg-sky-600 data-[state=active]:text-white">
                        <Heart className="h-4 w-4 mr-2" />
                        Saved Recipes
                    </TabsTrigger>
                    <TabsTrigger value="collections" className="data-[state=active]:bg-sky-600 data-[state=active]:text-white">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Collections
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="recipes" className="space-y-6">
                    <Card className="border-sky-200">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-sky-800">Saved Recipes ({savedRecipes.length})</CardTitle>
                            <Button variant="outline" className="border-sky-200 text-sky-700 hover:bg-sky-50">
                                <Filter className="h-4 w-4 mr-2" />
                                Filter
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {isLoading ? (
                                    Array(8).fill(0).map((_, i) => <RecipeCard key={i} isLoading={true} />)
                                ) : (
                                    savedRecipes.map(recipe => (
                                        <RecipeCard key={recipe.id} recipe={recipe} />
                                    ))
                                )}
                            </div>
                            {!isLoading && savedRecipes.length === 0 && (
                                <div className="text-center py-16">
                                    <Heart className="h-16 w-16 text-sky-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-sky-700 mb-2">No saved recipes yet</h3>
                                    <p className="text-sky-600">Start saving recipes you love to see them here!</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="collections" className="space-y-6">
                    <Card className="border-sky-200">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-sky-800">My Collections</CardTitle>
                            <Button className="bg-sky-600 hover:bg-sky-700">
                                Create Collection
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-16">
                                <BookOpen className="h-16 w-16 text-sky-300 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-sky-700 mb-2">No collections yet</h3>
                                <p className="text-sky-600">Create collections to organize your favorite recipes!</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}