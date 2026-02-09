import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NavLink } from '@/types';

interface MobileNavProps {
    links: NavLink[];
    logo: string;
}

/**
 * MobileNav - Responsive hamburger menu for mobile devices
 * Appears on screens < 1024px (lg breakpoint)
 */
export const MobileNav: React.FC<MobileNavProps> = ({ links, logo }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <div className="lg:hidden">
            {/* Hamburger Button */}
            <button
                onClick={toggleMenu}
                className="p-2 text-slate-600 hover:text-blue-600 transition-colors"
                aria-label={isOpen ? 'Menüyü kapat' : 'Menüyü aç'}
                aria-expanded={isOpen}
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-white z-40"
                            onClick={closeMenu}
                            aria-hidden="true"
                        />

                        {/* Slide-in Menu */}
                        <motion.nav
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 shadow-2xl"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Mobil menü"
                        >
                            <div className="flex flex-col h-full">
                                {/* Header */}
                                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                                    <img src={logo} alt="DOMiZAN" className="h-6 object-contain" />
                                    <button
                                        onClick={closeMenu}
                                        className="p-2 text-slate-600 hover:text-blue-600 transition-colors"
                                        aria-label="Menüyü kapat"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Navigation Links */}
                                <div className="flex-1 py-6">
                                    {links.map((link, index) => (
                                        <motion.a
                                            key={link.href}
                                            href={link.href}
                                            onClick={closeMenu}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="block px-6 py-4 text-lg font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all"
                                        >
                                            {link.label}
                                        </motion.a>
                                    ))}
                                </div>

                                {/* CTA Buttons */}
                                <div className="p-6 border-t border-slate-100 space-y-3">
                                    <button className="w-full text-sm font-semibold text-slate-600 hover:text-blue-600 py-3">
                                        Dokümantasyon
                                    </button>
                                    <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
                                        Hemen Başla
                                    </button>
                                </div>
                            </div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MobileNav;
