import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, Tag, Clock } from 'lucide-react';
import { blogArticles } from './data/blogData';

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState(true);

    const article = blogArticles.find(a => a.slug === slug);

    useEffect(() => {
        const loadContent = async () => {
            if (!slug) return;
            try {
                // Dynamically import the markdown file
                // Vite's import.meta.glob or direct import with variable needs careful handling
                // For simplicity with variable imports in Vite, we often use import.meta.glob
                // However, detailed plan suggested: import(`./blog-posts/${slug}.md?raw`)
                // This might need specific Vite config or just work if the files exist.

                // Using a switch or map for safety if dynamic import is tricky without glob
                let importedContent = '';

                // Using dynamic import
                const module = await import(`./blog-posts/${slug}.md?raw`);
                importedContent = module.default;

                setContent(importedContent);
            } catch (error) {
                console.error("Error loading blog post:", error);
                setContent("# Makale bulunamadı\nAradığınız içerik yüklenemedi veya mevcut değil.");
            } finally {
                setLoading(false);
            }
        };

        if (article) {
            loadContent();
        } else {
            setLoading(false);
            setContent("# Makale bulunamadı");
        }

    }, [slug, article]);

    if (!article) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-slate-800 mb-4">Makale Bulunamadı</h1>
                    <Link to="/blog" className="text-blue-600 hover:underline">Blog'a Dön</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-blue-900 pb-20">
            {/* Navigation Bar */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link to="/blog" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors group">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Blog'a Dön</span>
                    </Link>
                    <div className="text-sm font-semibold text-slate-400">Domizan Blog</div>
                </div>
            </nav>

            <article className="max-w-4xl mx-auto px-6 mt-12">
                {/* Header */}
                <header className="mb-12 text-center">
                    <div className="flex items-center justify-center gap-4 text-sm text-slate-500 mb-6">
                        <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                            <Calendar className="w-4 h-4 text-blue-500" />
                            {article.date}
                        </span>
                        <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                            <Clock className="w-4 h-4 text-amber-500" />
                            5 dk okuma
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                        {article.title}
                    </h1>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {article.labels.map(label => (
                            <span key={label} className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
                                <Tag className="w-3 h-3" />
                                {label}
                            </span>
                        ))}
                    </div>
                </header>

                {/* Featured Image (Optional / Placeholder) */}
                {/* Featured Image Removed */}

                {/* Content */}
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
                    {loading ? (
                        <div className="animate-pulse space-y-4">
                            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                            <div className="h-4 bg-slate-200 rounded w-full"></div>
                            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                        </div>
                    ) : (
                        <div className="prose prose-lg prose-slate prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-strong:text-slate-900 max-w-none">
                            <ReactMarkdown>{content}</ReactMarkdown>
                        </div>
                    )}
                </div>
            </article>
        </div>
    );
};

export default BlogPost;
