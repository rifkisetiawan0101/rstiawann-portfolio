import React from 'react';
import SectionTitle from '@/components/ui/SectionTitle';

const DevlogPage = () => {
    return (
        <main className="container mx-auto px-4 min-h-screen flex items-center justify-center">
            <div className="text-center">
                <SectionTitle 
                    title="Developer Log" 
                    subtitle="Coming Soon!" 
                />
                <p className="text-slate-400">
                    This section is currently under construction. Stay tuned for updates!
                </p>
            </div>
        </main>
    );
};

export default DevlogPage;
