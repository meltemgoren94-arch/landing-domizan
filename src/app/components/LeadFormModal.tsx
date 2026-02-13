import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Loader2, Send, AlertCircle } from "lucide-react";

interface LeadFormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export const LeadFormModal: React.FC<LeadFormModalProps> = ({ isOpen, onClose }) => {
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
    });

    // Reset form when modal opens/closes
    useEffect(() => {
        if (!isOpen) {
            // Small delay to reset after animation
            const timer = setTimeout(() => {
                setStatus("idle");
                setErrorMessage("");
                setFormData({ name: "", email: "", phone: "" });
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        setErrorMessage("");

        try {
            const response = await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.error || "Bir hata oluştu.");
            }

            setStatus("success");

            // Auto close after success
            setTimeout(() => {
                onClose();
            }, 2500);
        } catch (err) {
            setErrorMessage(
                err instanceof Error ? err.message : "Bağlantı hatası. Lütfen tekrar deneyin."
            );
            setStatus("error");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="p-8">
                            <AnimatePresence mode="wait">
                                {status === "success" ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center text-center py-8"
                                    >
                                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                            <CheckCircle2 className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Talebiniz Alınmıştır!</h3>
                                        <p className="text-slate-600">
                                            En kısa sürede sizinle iletişime geçeceğiz.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <div className="text-center mb-8">
                                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Ön Talep Oluştur</h3>
                                            <p className="text-slate-600">
                                                Bilgilerinizi bırakın, size özel teklifimizle dönüş yapalım.
                                            </p>
                                        </div>

                                        {/* Error message */}
                                        {status === "error" && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
                                            >
                                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                                {errorMessage}
                                            </motion.div>
                                        )}

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                                                    Ad Soyad
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    required
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                                    placeholder="Adınız Soyadınız"
                                                    value={formData.name}
                                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                    disabled={status === "submitting"}
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                                                    E-posta Adresi
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    required
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                                    placeholder="ornek@sirket.com"
                                                    value={formData.email}
                                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                    disabled={status === "submitting"}
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                                                    Telefon Numarası
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    required
                                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                                    placeholder="0555 555 55 55"
                                                    value={formData.phone}
                                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                    disabled={status === "submitting"}
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={status === "submitting"}
                                                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
                                            >
                                                {status === "submitting" ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        Gönderiliyor...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="w-5 h-5" />
                                                        Gönder
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
