
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Heart, Star } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

export default function RecipeCard({ recipe, isLoading }) {
    if (isLoading) {
        return (
            <Card className="overflow-hidden border-sky-200">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4 space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="flex justify-between pt-2">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-16" />
                    </div>
                </CardContent>
            </Card>
        );
    }
    
    const totalTime = (recipe.metadata?.prepTime || 0) + (recipe.metadata?.cookTime || 0);

    return (
        <Card className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-sky-200">
            <div className="relative">
                <img 
                    src={recipe.images?.[0] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop'}
                    alt={recipe.title}
                    className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full">
                    <Heart className="h-5 w-5 text-sky-600 hover:text-sky-700 hover:fill-current transition-colors" />
                </div>
                 {recipe.metadata?.difficulty && (
                    <Badge className="absolute bottom-2 left-2 bg-sky-500 text-white hover:bg-sky-600">{recipe.metadata.difficulty}</Badge>
                )}
            </div>
            <CardContent className="p-4 bg-white">
                <h3 className="font-bold text-lg text-sky-800 truncate group-hover:text-sky-600">{recipe.title}</h3>
                <p className="text-sm text-sky-600 line-clamp-2 h-10">{recipe.description}</p>
                <div className="flex justify-between items-center mt-4 pt-2 border-t border-sky-100">
                    <div className="flex items-center gap-1 text-sm text-sky-500">
                        <Clock className="h-4 w-4" />
                        <span>{totalTime} min</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium text-sky-600">
                        <Star className="h-4 w-4 fill-current" />
                        <span>{recipe.engagement?.averageRating?.toFixed(1) || 'New'}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

