import React, { useState, useEffect } from 'react';
import { Recipe } from '@/entities/Recipe';
import { Search, Filter, TrendingUp, Clock, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import RecipeCard from '@/components/recipes/RecipeCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function Discover() {
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [selectedRegion, setSelectedRegion] = useState('all');

    const regions = ['all', 'Coastal', 'Central', 'Western', 'Nyanza', 'Eastern'];

    useEffect(() => {
        loadRecipes();
    }, []);

    const loadRecipes = async () => {
        setIsLoading(true);
        try {
            const allRecipes = await Recipe.filter({ status: 'published' }, '-created_date', 20);
            setRecipes(allRecipes);
        } catch (error) {
            console.error('Failed to load recipes:', error);
        }
        setIsLoading(false);
    };

    const filteredRecipes = recipes.filter(recipe => {
        const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             recipe.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRegion = selectedRegion === 'all' || recipe.metadata?.region === selectedRegion;
        return matchesSearch && matchesRegion;
    });

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-sky-800 mb-2">Discover Amazing Recipes</h1>
                <p className="text-sky-600">Explore authentic Kenyan dishes from talented home chefs</p>
            </div>

            {/* Search and Filters */}
            <Card className="border-sky-200">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-400 h-4 w-4" />
                            <Input
                                placeholder="Search recipes..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 border-sky-200 focus:ring-sky-500"
                            />
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {regions.map(region => (
                                <Button
                                    key={region}
                                    variant={selectedRegion === region ? "default" : "outline"}
                                    onClick={() => setSelectedRegion(region)}
                                    className={selectedRegion === region ? "bg-sky-600 hover:bg-sky-700" : "border-sky-200 text-sky-700 hover:bg-sky-50"}
                                >
                                    {region === 'all' ? 'All Regions' : region}
                                </Button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Featured Section */}
            <Card className="border-sky-200 bg-gradient-to-r from-sky-500/10 to-sky-600/10">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sky-800">
                        <TrendingUp className="h-5 w-5" />
                        Trending This Week
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {isLoading ? (
                            Array(3).fill(0).map((_, i) => <RecipeCard key={i} isLoading={true} />)
                        ) : (
                            filteredRecipes.slice(0, 3).map(recipe => (
                                <RecipeCard key={recipe.id} recipe={recipe} />
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* All Recipes */}
            <Card className="border-sky-200">
                <CardHeader>
                    <CardTitle className="text-sky-800">All Recipes ({filteredRecipes.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {isLoading ? (
                            Array(8).fill(0).map((_, i) => <RecipeCard key={i} isLoading={true} />)
                        ) : (
                            filteredRecipes.map(recipe => (
                                <RecipeCard key={recipe.id} recipe={recipe} />
                            ))
                        )}
                    </div>
                    {!isLoading && filteredRecipes.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-sky-600">No recipes found matching your criteria.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
