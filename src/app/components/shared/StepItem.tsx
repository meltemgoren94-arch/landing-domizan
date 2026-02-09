import React from 'react';
import { StepItemProps } from '@/types';

/**
 * StepItem - Displays a numbered step in the process flow
 * Used in the Steps section of the landing page
 */
export const StepItem: React.FC<StepItemProps> = ({ number, title, active = false }) => (
    <div className="flex flex-col items-center gap-4 relative z-10">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center font-bold text-xl border-4 ${active ? 'bg-blue-600 border-blue-100 text-white shadow-xl shadow-blue-600/30' : 'bg-white border-slate-50 text-slate-300 shadow-sm'
            }`}>
            {number}
        </div>
        <span className={`font-bold ${active ? 'text-blue-600' : 'text-slate-400'}`}>{title}</span>
    </div>
);

export default StepItem;
