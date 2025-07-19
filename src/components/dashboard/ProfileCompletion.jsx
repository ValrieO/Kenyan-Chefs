import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export default function ProfileCompletion() {
    return (
        <Card className="bg-gradient-to-r from-sky-500/80 to-sky-600/80 border-none text-white">
            <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Sparkles className="h-8 w-8 text-white/80" />
                    <div>
                        <h3 className="font-bold">Complete Your Profile!</h3>
                        <p className="text-sm text-white/90">Add a bio and location to connect with other chefs.</p>
                    </div>
                </div>
                <Button variant="secondary" className="bg-white text-sky-600 hover:bg-white/90 shrink-0">
                    Update Profile
                </Button>
            </CardContent>
        </Card>
    );
}