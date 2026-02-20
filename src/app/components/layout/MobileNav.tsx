import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, ArrowRight } from 'lucide-react';
import { NavLink } from '@/types';

interface MobileNavProps {
    links: NavLink[];
    logo: string;
}

const menuVariants = {
    closed: {
        opacity: 0,
        x: "100%",
        transition: {
            duration: 0.2,
            type: "tween",
            ease: "easeInOut",
            when: "afterChildren"
        }
    },
    open: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.3,
            type: "tween",
            ease: "easeInOut",
            when: "beforeChildren",
            staggerChildren: 0.1
        }
    }
};

const linkVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
};

export const MobileNav: React.FC<MobileNavProps> = ({ links, logo }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <div className="lg:hidden">
            <button
                onClick={toggleMenu}
                className="relative z-50 p-2 -mr-2 text-slate-600 hover:text-slate-900 transition-colors"
                aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
            >
                {isOpen ? (
                    <div className="p-1 bg-white rounded-full shadow-sm">
                        <X className="w-6 h-6" />
                    </div>
                ) : (
                    <Menu className="w-6 h-6" />
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        className="fixed inset-0 z-40 bg-white flex flex-col h-[100dvh]"
                    >
                        {/* Header Area */}
                        <div className="flex items-center justify-between px-6 h-20 border-b border-slate-100/50">
                            <motion.img
                                src={logo}
                                alt="Domizan"
                                className="h-8 object-contain"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            />
                        </div>

                        {/* Links Container */}
                        <div className="flex-1 overflow-y-auto py-8 px-6 flex flex-col justify-center">
                            <nav className="flex flex-col gap-6">
                                {links.map((link) => (
                                    <motion.a
                                        key={link.href}
                                        href={link.href}
                                        onClick={closeMenu}
                                        variants={linkVariants}
                                        className="group flex items-center justify-between text-2xl font-bold text-slate-800 hover:text-blue-600 transition-colors"
                                    >
                                        {link.label}
                                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                                    </motion.a>
                                ))}
                            </nav>

                            <motion.div
                                variants={linkVariants}
                                className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100"
                            >
                                <h4 className="font-semibold text-slate-900 mb-2">Hemen Başlayın</h4>
                                <p className="text-sm text-slate-500 mb-4">Domizan'ı ücretsiz indirin ve ofisinizi dijitalleştirin.</p>
                                <a
                                    href="#/download"
                                    onClick={closeMenu}
                                    className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-600/20"
                                >
                                    Ücretsiz Dene
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </motion.div>
                        </div>

                        {/* Footer Area */}
                        <motion.div
                            variants={linkVariants}
                            className="px-6 py-8 border-t border-slate-100 text-center"
                        >
                            <p className="text-xs text-slate-400 font-medium">
                                © 2026 Domizan Teknoloji A.Ş.
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MobileNav;

