import React, { useState, useEffect, useMemo } from "react";
import { motion as Motion } from "framer-motion";
import {
    Download,
    Apple,
    Monitor,
    CheckCircle2,
    Loader2,
    AlertCircle,
    ArrowLeft,
    Shield,
    Tag,
    FileText,
    Sparkles,
} from "lucide-react";
import logoGradient from "@/assets/logo-icon-gradient.png";
import logoHeader from "@/assets/logo-text-blue.png";

// ─── Types ───────────────────────────────────────────────────
type OS = "mac" | "windows";
type FormStatus = "idle" | "submitting" | "success" | "error";

interface ReleaseNote {
    version: string;
    date: string;
    highlights: string[];
    isCurrent?: boolean;
}

// ─── Release data (static for now) ──────────────────────────
const CURRENT_VERSION = "1.0.0-beta";
const releaseNotes: ReleaseNote[] = [
    {
        version: "1.0.0-beta",
        date: "17 Şubat 2026",
        highlights: [
            "AI destekli akıllı belge analizi",
            "Otomatik mükellef dosya tasnifi",
            "Telegram sabah brifingi entegrasyonu",
            "Resmi Gazete mevzuat takibi",
            "256-bit şifreleme ile yerel depolama",
        ],
        isCurrent: true,
    },
];

// ─── Validation helpers (same as LeadFormModal) ──────────────
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
function formatPhone(raw: string): string {
    const digits = raw.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 4) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
    if (digits.length <= 9) return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 9)} ${digits.slice(9)}`;
}

// ─── OS detection ────────────────────────────────────────────
function detectOS(): OS {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("mac")) return "mac";
    return "windows";
}

// ─── Component ───────────────────────────────────────────────
const DownloadPage: React.FC = () => {
    const detectedOS = useMemo(() => detectOS(), []);
    const [selectedOS, setSelectedOS] = useState<OS>(detectedOS);
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
    const [fieldErrors, setFieldErrors] = useState({ name: "", email: "", phone: "" });
    const [touched, setTouched] = useState({ name: false, email: false, phone: false });

    // Scroll to top on mount
    useEffect(() => { window.scrollTo(0, 0); }, []);

    // ── Handlers ──
    const handleBlur = (field: "name" | "email" | "phone") => {
        setTouched(prev => ({ ...prev, [field]: true }));
        const validators = { name: validateName, email: validateEmail, phone: validatePhone };
        setFieldErrors(prev => ({ ...prev, [field]: validators[field](formData[field]) }));
    };

    const handlePhoneChange = (raw: string) => {
        const formatted = formatPhone(raw);
        setFormData(prev => ({ ...prev, phone: formatted }));
        if (touched.phone) setFieldErrors(prev => ({ ...prev, phone: validatePhone(formatted) }));
    };

    const isFormValid = useMemo(() => {
        return (
            formData.name.trim() !== "" &&
            formData.email.trim() !== "" &&
            formData.phone.trim() !== "" &&
            !validateName(formData.name) &&
            !validateEmail(formData.email) &&
            !validatePhone(formData.phone)
        );
    }, [formData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
            // Redirect to download after a short delay
            setTimeout(() => {
                window.location.href = `https://download.domizan.com?os=${selectedOS}`;
            }, 2000);
        } catch (err) {
            setErrorMessage(err instanceof Error ? err.message : "Bağlantı hatası. Lütfen tekrar deneyin.");
            setStatus("error");
        }
    };

    const inputBase = "w-full px-4 py-3.5 rounded-xl border outline-none transition-all text-sm";
    const inputOk = "border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white";
    const inputErr = "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 bg-red-50/40";

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
            {/* Minimal Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <a href="#/" aria-label="Ana sayfaya git">
                            <img src={logoHeader} alt="Domizan" className="h-7 object-contain" />
                        </a>
                    </div>
                    <a
                        href="#/"
                        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Ana Sayfa
                    </a>
                </div>
            </header>

            {/* Main Content — Centered like Notion */}
            <main className="pt-28 pb-20 px-6">
                <div className="max-w-md mx-auto">
                    {/* Logo & Heading */}
                    <Motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-10"
                    >
                        <Motion.img
                            src={logoGradient}
                            alt="Domizan"
                            className="w-16 h-16 mx-auto mb-5 object-contain"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                            Domizan'ı İndirin
                        </h1>
                        <p className="text-slate-500 text-sm">
                            AI destekli mali müşavir asistanınızı hemen kurun.
                        </p>
                    </Motion.div>

                    {/* OS Selector */}
                    <Motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-6"
                    >
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 text-center">
                            İşletim Sistemi
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setSelectedOS("mac")}
                                className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl border-2 text-sm font-semibold transition-all ${selectedOS === "mac"
                                        ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                                    }`}
                            >
                                <Apple className="w-5 h-5" />
                                macOS
                                {detectedOS === "mac" && (
                                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-600">
                                        Algılandı
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={() => setSelectedOS("windows")}
                                className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-xl border-2 text-sm font-semibold transition-all ${selectedOS === "windows"
                                        ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                                    }`}
                            >
                                <Monitor className="w-5 h-5" />
                                Windows
                                {detectedOS === "windows" && (
                                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-600">
                                        Algılandı
                                    </span>
                                )}
                            </button>
                        </div>
                    </Motion.div>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-slate-200" />
                        <span className="text-xs text-slate-400 font-medium">bilgilerinizi girin</span>
                        <div className="flex-1 h-px bg-slate-200" />
                    </div>

                    {/* Form */}
                    <Motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {status === "success" ? (
                            <Motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center text-center py-12"
                            >
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">İndirme Başlıyor!</h3>
                                <p className="text-slate-500 text-sm">
                                    Yönlendiriliyorsunuz...
                                </p>
                            </Motion.div>
                        ) : (
                            <>
                                {status === "error" && (
                                    <Motion.div
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-2 p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
                                    >
                                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                        {errorMessage}
                                    </Motion.div>
                                )}

                                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                                    {/* Ad Soyad */}
                                    <div>
                                        <label htmlFor="dl-name" className="block text-sm font-medium text-slate-700 mb-1.5">
                                            Ad Soyad
                                        </label>
                                        <input
                                            type="text"
                                            id="dl-name"
                                            autoComplete="name"
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
                                        <label htmlFor="dl-email" className="block text-sm font-medium text-slate-700 mb-1.5">
                                            E-posta Adresi
                                        </label>
                                        <input
                                            type="email"
                                            id="dl-email"
                                            autoComplete="email"
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
                                        <label htmlFor="dl-phone" className="block text-sm font-medium text-slate-700 mb-1.5">
                                            Telefon Numarası
                                        </label>
                                        <input
                                            type="tel"
                                            id="dl-phone"
                                            autoComplete="tel"
                                            inputMode="numeric"
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

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={status === "submitting" || !isFormValid}
                                        className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
                                    >
                                        {status === "submitting" ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Gönderiliyor...
                                            </>
                                        ) : (
                                            <>
                                                <Download className="w-5 h-5" />
                                                {selectedOS === "mac" ? "macOS için İndir" : "Windows için İndir"}
                                            </>
                                        )}
                                    </button>
                                </form>

                                {/* Security note */}
                                <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                                    <Shield className="w-3 h-3" />
                                    Bilgileriniz güvendedir. Üçüncü kişilerle paylaşılmaz.
                                </div>
                            </>
                        )}
                    </Motion.div>
                </div>

                {/* ─── Version & Release Notes Section ─── */}
                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="max-w-lg mx-auto mt-20"
                >
                    <div className="border-t border-slate-100 pt-10">
                        <div className="flex items-center gap-2 mb-6">
                            <FileText className="w-4 h-4 text-slate-400" />
                            <h2 className="text-sm font-bold text-slate-700">Sürüm Notları</h2>
                        </div>

                        {releaseNotes.map((release) => (
                            <div
                                key={release.version}
                                className="mb-6 last:mb-0"
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="flex items-center gap-1.5">
                                        <Tag className="w-3.5 h-3.5 text-blue-500" />
                                        <span className="text-sm font-bold text-slate-800">v{release.version}</span>
                                    </div>
                                    {release.isCurrent && (
                                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                                            Güncel
                                        </span>
                                    )}
                                    <span className="text-xs text-slate-400 ml-auto">{release.date}</span>
                                </div>
                                <ul className="space-y-2">
                                    {release.highlights.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                            <Sparkles className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </Motion.div>
            </main>

            {/* Minimal Footer */}
            <footer className="border-t border-slate-100 py-8 px-6">
                <div className="max-w-md mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
                    <span>© 2026 Domizan. Tüm hakları saklıdır.</span>
                    <div className="flex items-center gap-4">
                        <a href="#/" className="hover:text-blue-600 transition-colors">Ana Sayfa</a>
                        <a href="#/blog" className="hover:text-blue-600 transition-colors">Blog</a>
                        <a href="#/docs" className="hover:text-blue-600 transition-colors">Dokümantasyon</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default DownloadPage;
