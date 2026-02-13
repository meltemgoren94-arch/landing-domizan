import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Loader2, Send, AlertCircle } from "lucide-react";

interface LeadFormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

// --- Validation helpers ---
const REGEX_NAME = /^[a-zA-ZçÇğĞıİöÖşŞüÜâÂîÎûÛ\s]{2,}$/;
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const REGEX_PHONE = /^0\d{3} \d{3} \d{2} \d{2}$/;

function validateName(val: string): string {
    if (!val.trim()) return "Ad Soyad boş bırakılamaz.";
    if (val.trim().split(/\s+/).length < 2) return "Lütfen ad ve soyadınızı girin.";
    if (!REGEX_NAME.test(val.trim())) return "Ad Soyad yalnızca harf içermelidir.";
    return "";
}

function validateEmail(val: string): string {
    if (!val.trim()) return "E-posta adresi boş bırakılamaz.";
    if (!REGEX_EMAIL.test(val.trim())) return "Geçerli bir e-posta adresi girin.";
    return "";
}

function validatePhone(val: string): string {
    if (!val.trim()) return "Telefon numarası boş bırakılamaz.";
    if (!REGEX_PHONE.test(val)) return "Geçerli bir telefon numarası girin (0XXX XXX XX XX).";
    return "";
}

/** Auto-format phone: only digits, insert spaces as 0XXX XXX XX XX */
function formatPhone(raw: string): string {
    const digits = raw.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 4) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
    if (digits.length <= 9) return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 9)} ${digits.slice(9)}`;
}

// --- Component ---
export const LeadFormModal: React.FC<LeadFormModalProps> = ({ isOpen, onClose }) => {
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
    const [fieldErrors, setFieldErrors] = useState({ name: "", email: "", phone: "" });
    const [touched, setTouched] = useState({ name: false, email: false, phone: false });

    // Reset everything when modal closes
    useEffect(() => {
        if (!isOpen) {
            const timer = setTimeout(() => {
                setStatus("idle");
                setErrorMessage("");
                setFormData({ name: "", email: "", phone: "" });
                setFieldErrors({ name: "", email: "", phone: "" });
                setTouched({ name: false, email: false, phone: false });
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        if (isOpen) document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    // Validate on blur
    const handleBlur = (field: "name" | "email" | "phone") => {
        setTouched(prev => ({ ...prev, [field]: true }));
        const validators = { name: validateName, email: validateEmail, phone: validatePhone };
        setFieldErrors(prev => ({ ...prev, [field]: validators[field](formData[field]) }));
    };

    // Phone auto-format
    const handlePhoneChange = (raw: string) => {
        const formatted = formatPhone(raw);
        setFormData(prev => ({ ...prev, phone: formatted }));
        if (touched.phone) setFieldErrors(prev => ({ ...prev, phone: validatePhone(formatted) }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate all fields
        const errors = {
            name: validateName(formData.name),
            email: validateEmail(formData.email),
            phone: validatePhone(formData.phone),
        };
        setFieldErrors(errors);
        setTouched({ name: true, email: true, phone: true });
        if (errors.name || errors.email || errors.phone) return;

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
            setTimeout(() => onClose(), 2500);
        } catch (err) {
            setErrorMessage(err instanceof Error ? err.message : "Bağlantı hatası. Lütfen tekrar deneyin.");
            setStatus("error");
        }
    };

    const inputBase = "w-full px-4 py-3 rounded-xl border outline-none transition-all";
    const inputOk = "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20";
    const inputErr = "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 bg-red-50/40";

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
                    >
                        <button onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-10">
                            <X className="w-5 h-5" />
                        </button>

                        <div className="p-8">
                            <AnimatePresence mode="wait">
                                {status === "success" ? (
                                    <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center text-center py-8">
                                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                            <CheckCircle2 className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Talebiniz Alınmıştır!</h3>
                                        <p className="text-slate-600">En kısa sürede sizinle iletişime geçeceğiz.</p>
                                    </motion.div>
                                ) : (
                                    <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                        <div className="text-center mb-8">
                                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Ön Talep Oluştur</h3>
                                            <p className="text-slate-600">Bilgilerinizi bırakın, size özel teklifimizle dönüş yapalım.</p>
                                        </div>

                                        {status === "error" && (
                                            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                                                className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                                {errorMessage}
                                            </motion.div>
                                        )}

                                        <form onSubmit={handleSubmit} noValidate className="space-y-4">
                                            {/* Ad Soyad */}
                                            <div>
                                                <label htmlFor="lead-name" className="block text-sm font-medium text-slate-700 mb-1">Ad Soyad</label>
                                                <input
                                                    type="text" id="lead-name" autoComplete="off"
                                                    className={`${inputBase} ${touched.name && fieldErrors.name ? inputErr : inputOk}`}
                                                    placeholder="Adınız Soyadınız"
                                                    value={formData.name}
                                                    onChange={e => {
                                                        setFormData(prev => ({ ...prev, name: e.target.value }));
                                                        if (touched.name) setFieldErrors(prev => ({ ...prev, name: validateName(e.target.value) }));
                                                    }}
                                                    onBlur={() => handleBlur("name")}
                                                    disabled={status === "submitting"}
                                                />
                                                {touched.name && fieldErrors.name && (
                                                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                                        <AlertCircle className="w-3 h-3" />{fieldErrors.name}
                                                    </p>
                                                )}
                                            </div>

                                            {/* E-posta */}
                                            <div>
                                                <label htmlFor="lead-email" className="block text-sm font-medium text-slate-700 mb-1">E-posta Adresi</label>
                                                <input
                                                    type="text" id="lead-email" autoComplete="off"
                                                    className={`${inputBase} ${touched.email && fieldErrors.email ? inputErr : inputOk}`}
                                                    placeholder="ornek@sirket.com"
                                                    value={formData.email}
                                                    onChange={e => {
                                                        setFormData(prev => ({ ...prev, email: e.target.value }));
                                                        if (touched.email) setFieldErrors(prev => ({ ...prev, email: validateEmail(e.target.value) }));
                                                    }}
                                                    onBlur={() => handleBlur("email")}
                                                    disabled={status === "submitting"}
                                                />
                                                {touched.email && fieldErrors.email && (
                                                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                                        <AlertCircle className="w-3 h-3" />{fieldErrors.email}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Telefon */}
                                            <div>
                                                <label htmlFor="lead-phone" className="block text-sm font-medium text-slate-700 mb-1">Telefon Numarası</label>
                                                <input
                                                    type="tel" id="lead-phone" autoComplete="off" inputMode="numeric"
                                                    className={`${inputBase} ${touched.phone && fieldErrors.phone ? inputErr : inputOk}`}
                                                    placeholder="0555 555 55 55"
                                                    value={formData.phone}
                                                    onChange={e => handlePhoneChange(e.target.value)}
                                                    onBlur={() => handleBlur("phone")}
                                                    disabled={status === "submitting"}
                                                    maxLength={14}
                                                />
                                                {touched.phone && fieldErrors.phone && (
                                                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                                                        <AlertCircle className="w-3 h-3" />{fieldErrors.phone}
                                                    </p>
                                                )}
                                            </div>

                                            <button type="submit" disabled={status === "submitting"}
                                                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6">
                                                {status === "submitting" ? (
                                                    <><Loader2 className="w-5 h-5 animate-spin" />Gönderiliyor...</>
                                                ) : (
                                                    <><Send className="w-5 h-5" />Gönder</>
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
