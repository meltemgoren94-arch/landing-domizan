import React from 'react';
import { FeatureItemProps } from '@/types';

/**
 * FeatureItem - Displays an AI feature with icon, title and description
 * Used in the Features section of the landing page
 */
export const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => (
    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 flex flex-col items-start gap-6 hover:shadow-lg transition-all group">
        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
            {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6" })}
        </div>
        <div>
            <h4 className="text-xl font-bold mb-3">{title}</h4>
            <p className="text-slate-500 leading-relaxed text-sm">{description}</p>
        </div>
    </div>
);

export default FeatureItem;
