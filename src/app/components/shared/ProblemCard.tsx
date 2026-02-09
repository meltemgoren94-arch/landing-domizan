import React from 'react';
import { ProblemCardProps } from '@/types';

/**
 * ProblemCard - Displays a pain point with icon, title and description
 * Used in the Problems section of the landing page
 */
export const ProblemCard: React.FC<ProblemCardProps> = ({ icon, title, description }) => (
    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
        <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="text-slate-500 leading-relaxed text-sm">{description}</p>
    </div>
);

export default ProblemCard;
