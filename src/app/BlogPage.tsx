import React, { useState, useMemo } from "react";
import { motion as Motion } from "framer-motion";
import { Search, Tag, X, BookOpen, ArrowLeft } from "lucide-react";
import { blogArticles, getAllLabels, getPublishedArticles } from "./data/blogData";
import { BlogCard } from "./components/BlogCard";
import logoHeader from "@/assets/logo-text-blue.png";

const BlogPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

    const publishedArticles = useMemo(() => getPublishedArticles(), []);
    const allLabels = useMemo(() => getAllLabels(), []);

    const filteredArticles = useMemo(() => {
        let articles = publishedArticles;

        if (selectedLabel) {
            articles = articles.filter((a) => a.labels.includes(selectedLabel));
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            articles = articles.filter(
                (a) =>
                    a.title.toLowerCase().includes(q) ||
                    a.description.toLowerCase().includes(q) ||
                    a.labels.some((l) => l.toLowerCase().includes(q))
            );
        }

        return articles;
    }, [publishedArticles, searchQuery, selectedLabel]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
            {/* Navigation */}
            <header role="banner">
                <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <a href="#/" aria-label="Ana sayfaya git">
                                <img src={logoHeader} alt="Domizan" className="h-8 object-contain" />
                            </a>
                            <a
                                href="#/"
                                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Ana Sayfa
                            </a>
                        </div>
                        <div className="flex items-center gap-4">
                            <a href="#/docs" className="hidden sm:block text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
                                Dokümantasyon
                            </a>
                            <button className="hidden sm:block bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                                Ücretsiz Dene
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            <main role="main">
                {/* Hero Banner */}
                <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
                    {/* Decorative blurs */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-cyan-500/15 rounded-full blur-[100px]" />

                    <div className="max-w-7xl mx-auto text-center relative z-10">
                        <Motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-sm font-medium mb-6">
                                <BookOpen className="w-4 h-4" />
                                Domizan Blog
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                                Bilgi <span className="text-blue-400">Merkezi</span>
                            </h1>
                            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                                Mali müşavirlik, yapay zeka ve iş yönetimi hakkında güncel içerikler.
                            </p>
                        </Motion.div>
                    </div>
                </section>

                {/* Search & Filter Bar */}
                <section className="sticky top-20 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 py-4 px-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Search Input */}
                        <div className="relative mb-3">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Makale ara..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Label Filters */}
                        {allLabels.length > 0 && (
                            <div className="flex items-center gap-2 flex-wrap">
                                <Tag className="w-4 h-4 text-slate-400 shrink-0" />
                                <button
                                    onClick={() => setSelectedLabel(null)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${selectedLabel === null
                                            ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                        }`}
                                >
                                    Tümü
                                </button>
                                {allLabels.map((label) => (
                                    <button
                                        key={label}
                                        onClick={() => setSelectedLabel(selectedLabel === label ? null : label)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${selectedLabel === label
                                                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                            }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Articles Grid */}
                <section className="py-12 px-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Results Count */}
                        <p className="text-sm text-slate-500 mb-6">
                            {filteredArticles.length > 0
                                ? `${filteredArticles.length} makale bulundu`
                                : publishedArticles.length === 0
                                    ? "Henüz yayınlanmış makale yok — blogData.ts dosyasına içerik ekleyin."
                                    : "Aramanızla eşleşen makale bulunamadı."}
                        </p>

                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredArticles.map((article, index) => (
                                <BlogCard key={article.id} article={article} index={index} />
                            ))}
                        </div>

                        {/* Empty state for no published articles */}
                        {publishedArticles.length === 0 && (
                            <Motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-20"
                            >
                                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-blue-50 flex items-center justify-center">
                                    <BookOpen className="w-10 h-10 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-700 mb-2">Blog Hazırlanıyor</h3>
                                <p className="text-slate-500 max-w-md mx-auto">
                                    Makaleler yakında burada yayınlanacak.{" "}
                                    <code className="text-xs bg-slate-100 px-2 py-1 rounded font-mono">
                                        src/app/data/blogData.ts
                                    </code>{" "}
                                    dosyasına içerik ekleyerek başlayabilirsiniz.
                                </p>
                            </Motion.div>
                        )}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer role="contentinfo" className="bg-slate-950 text-white py-12 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
                    <div>© 2026 Domizan. Tüm hakları saklıdır. | KVKK Uyumlu</div>
                    <div className="flex items-center gap-6">
                        <a href="#/" className="hover:text-blue-400 transition-colors">Ana Sayfa</a>
                        <a href="#/docs" className="hover:text-blue-400 transition-colors">Dokümantasyon</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default BlogPage;
