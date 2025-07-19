import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import RecipeCard from '@/components/recipes/RecipeCard';
import { Skeleton } from "@/components/ui/skeleton";

export default function MyRecipes({ recipes, isLoading }) {
    return (
        <Card className="border-none bg-transparent shadow-none">
            <CardHeader className="px-0 flex flex-row items-center justify-between">
                <CardTitle className="text-2xl font-bold text-gray-800">My Recent Recipes</CardTitle>
                <Button variant="ghost" className="text-primary hover:text-primary">
                    View All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="px-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {isLoading 
                        ? Array(4).fill(0).map((_, i) => <RecipeCard key={i} isLoading={true} />)
                        : recipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)
                    }
                </div>
                 {!isLoading && recipes.length === 0 && (
                    <div className="text-center py-16 bg-white rounded-xl">
                        <p className="text-gray-500">You haven't created any recipes yet.</p>
                        <Button className="mt-4">Create Your First Recipe</Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}