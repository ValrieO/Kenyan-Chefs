
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from "@/components/ui/skeleton";

export default function StatCard({ icon: Icon, label, value, color, isLoading }) {
    if (isLoading) {
        return (
            <Card className="border-sky-200">
                <CardContent className="p-6 flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-lg" />
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-8 w-12" />
                    </div>
                </CardContent>
            </Card>
        );
    }
    
    const getColorClasses = (color) => {
        switch(color) {
            case 'secondary':
                return { icon: 'text-sky-700', bg: 'bg-sky-100' };
            case 'accent':
                return { icon: 'text-sky-800', bg: 'bg-sky-100' };
            case 'primary':
            default:
                return { icon: 'text-sky-600', bg: 'bg-sky-100' };
        }
    };

    const colors = getColorClasses(color);

    return (
        <Card className="hover:shadow-lg transition-shadow duration-300 border-sky-200 bg-white">
            <CardContent className="p-6 flex items-center gap-4">
                <div className={`p-3 rounded-lg ${colors.bg}`}>
                    <Icon className={`h-6 w-6 ${colors.icon}`} />
                </div>
                <div>
                    <p className="text-sm font-medium text-sky-600">{label}</p>
                    <p className="text-2xl font-bold text-sky-800">{value}</p>
                </div>
            </CardContent>
        </Card>
    );
}
