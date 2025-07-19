import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

export default function WelcomeHeader({ user, isLoading }) {
    if (isLoading) {
        return (
            <div>
                <Skeleton className="h-9 w-64 mb-2" />
                <Skeleton className="h-5 w-80" />
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-sky-800">
                Karibu, {user?.full_name.split(' ')[0] || 'Chef'}!
            </h1>
            <p className="text-sky-600 mt-1">Ready to cook up something amazing today?</p>
        </div>
    );
}