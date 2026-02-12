import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import type { BlogArticle } from "../data/blogData";

interface BlogCardProps {
    article: BlogArticle;
    index: number;
}

export const BlogCard: React.FC<BlogCardProps> = ({ article, index }) => {
    return (
        <Motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-blue-600/5 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
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
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200 leading-snug mb-2 line-clamp-2">
                    {article.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1 line-clamp-3">
                    {article.description}
                </p>

                {/* Labels */}
                {article.labels.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
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

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                    <span className="text-xs text-slate-500 font-medium">
                        5 dk okuma
                    </span>
                    {article.slug ? (
                        <a
                            href={`#/blog/${article.slug}`}
                            className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group/btn"
                        >
                            Devamını Oku
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                    ) : (
                        <span className="text-sm font-bold text-slate-400 cursor-not-allowed flex items-center gap-1">
                            Yakında
                        </span>
                    )}
                </div>
            </div>
        </Motion.article>
    );
};
