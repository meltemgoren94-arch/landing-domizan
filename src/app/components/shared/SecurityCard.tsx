import React from 'react';
import { SecurityCardProps } from '@/types';

/**
 * SecurityCard - Displays a security feature with icon, title and description
 * Used in the Security section of the landing page
 */
export const SecurityCard: React.FC<SecurityCardProps> = ({ title, description, icon }) => (
    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center hover:bg-white/10 transition-colors group cursor-pointer">
        <div className="flex items-center gap-6">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                {icon}
            </div>
            <div>
                <h5 className="font-bold text-lg">{title}</h5>
                <p className="text-slate-500 text-sm">{description}</p>
            </div>
        </div>
    </div>
);

export default SecurityCard;
