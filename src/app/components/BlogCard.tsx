import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
import type { BlogArticle } from "../data/blogData";

interface BlogCardProps {
    article: BlogArticle;
    index: number;
}

export const BlogCard: React.FC<BlogCardProps> = ({ article, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-blue-600/5 transition-all duration-300 hover:-translate-y-1 flex flex-col"
        >
            {/* Gradient accent bar */}
            <div className="h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="p-6 flex flex-col flex-1">
                {/* Date */}
                {article.date && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{article.date}</span>
                    </div>
                )}

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200 leading-snug mb-2">
                    {article.title || <span className="text-slate-300 italic">Başlık eklenecek...</span>}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1">
                    {article.description || <span className="text-slate-300 italic">Açıklama eklenecek...</span>}
                </p>

                {/* Labels */}
                {article.labels.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {article.labels.map((label, i) => (
                            <span
                                key={i}
                                className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-600 border border-blue-100"
                            >
                                {label}
                            </span>
                        ))}
                    </div>
                )}

                {/* Expandable Content */}
                {article.content && (
                    <>
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors mt-auto pt-2 border-t border-slate-100"
                        >
                            {isExpanded ? (
                                <>
                                    Kapat <ChevronUp className="w-3.5 h-3.5" />
                                </>
                            ) : (
                                <>
                                    Devamını Oku <ChevronDown className="w-3.5 h-3.5" />
                                </>
                            )}
                        </button>

                        {isExpanded && (
                            <Motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-3 pt-3 border-t border-slate-100"
                            >
                                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                                    {article.content}
                                </p>
                            </Motion.div>
                        )}
                    </>
                )}
            </div>
        </Motion.article>
    );
};
