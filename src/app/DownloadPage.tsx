import React, { useEffect, useMemo, useState } from "react";
import { motion as Motion } from "framer-motion";
import {
  AlertCircle,
  Apple,
  ArrowLeft,
  CheckCircle2,
  Download,
  FileText,
  Loader2,
  Monitor,
  Shield,
  Sparkles,
  Tag
} from "lucide-react";

import logoGradient from "@/assets/logo-icon-gradient.png";
import logoHeader from "@/assets/logo-text-blue.png";

type OS = "mac" | "windows";
type MacArchitecture = "arm64" | "x64";
type FormStatus = "idle" | "submitting" | "success" | "error";
type ReleaseStatus = "loading" | "ready" | "error";

interface DesktopReleaseAsset {
  name: string;
  size: number;
  updatedAt: string;
  fileType: string;
  browserDownloadUrl: string;
  platform: OS;
  architecture: "arm64" | "x64" | null;
}

interface DesktopReleaseCatalog {
  available: boolean;
  owner: string;
  repo: string;
  error: string | null;
  release: null | {
    tagName: string;
    version: string;
    name: string;
    publishedAt: string;
    prerelease: boolean;
    htmlUrl: string;
    notes: string[];
  };
  assets: {
    windows: DesktopReleaseAsset | null;
    macArm64: DesktopReleaseAsset | null;
    macX64: DesktopReleaseAsset | null;
  };
}

const REGEX_NAME = /^[a-zA-ZçÇğĞıİöÖşŞüÜâÂîÎûÛ\s]{2,}$/;
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const REGEX_PHONE = /^0\d{3} \d{3} \d{2} \d{2}$/;

const validateName = (value: string) => {
  if (!value.trim()) return "Ad Soyad boş bırakılamaz.";
  if (value.trim().split(/\s+/).length < 2) return "Lütfen ad ve soyadınızı girin.";
  if (!REGEX_NAME.test(value.trim())) return "Ad Soyad yalnızca harf içermelidir.";
  return "";
};

const validateEmail = (value: string) => {
  if (!value.trim()) return "E-posta adresi boş bırakılamaz.";
  if (!REGEX_EMAIL.test(value.trim())) return "Geçerli bir e-posta adresi girin.";
  return "";
};

const validatePhone = (value: string) => {
  if (!value.trim()) return "Telefon numarası boş bırakılamaz.";
  if (!REGEX_PHONE.test(value)) return "Geçerli bir telefon numarası girin (0XXX XXX XX XX).";
  return "";
};

const formatPhone = (rawValue: string) => {
  const digits = rawValue.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 4) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  if (digits.length <= 9) return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;

  return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 9)} ${digits.slice(9)}`;
};

const detectInitialOS = (): OS => {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes("mac") ? "mac" : "windows";
};

const formatReleaseDate = (isoDate: string) =>
  new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(isoDate));

const formatAssetSize = (size: number) => {
  const sizeInMb = size / (1024 * 1024);
  return `${sizeInMb.toFixed(1)} MB`;
};

const getArchitectureLabel = (architecture: MacArchitecture) =>
  architecture === "arm64" ? "Apple Silicon" : "Intel";

const buildDownloadPath = (selectedOS: OS, selectedMacArchitecture: MacArchitecture) => {
  const search = new URLSearchParams({
    platform: selectedOS
  });

  if (selectedOS === "mac") {
    search.set("arch", selectedMacArchitecture);
  }

  return `/api/download?${search.toString()}`;
};

const DownloadPage: React.FC = () => {
  const initialOS = useMemo(() => detectInitialOS(), []);

  const [selectedOS, setSelectedOS] = useState<OS>(initialOS);
  const [selectedMacArchitecture, setSelectedMacArchitecture] = useState<MacArchitecture>("arm64");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [releaseStatus, setReleaseStatus] = useState<ReleaseStatus>("loading");
  const [catalog, setCatalog] = useState<DesktopReleaseCatalog | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [fieldErrors, setFieldErrors] = useState({ name: "", email: "", phone: "" });
  const [touched, setTouched] = useState({ name: false, email: false, phone: false });

  useEffect(() => {
    window.scrollTo(0, 0);

    const controller = new AbortController();

    const loadCatalog = async () => {
      try {
        setReleaseStatus("loading");

        const response = await fetch("/api/downloads", {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error("İndirme bilgisi alınamadı. Lütfen birkaç dakika sonra tekrar deneyin.");
        }

        const data = (await response.json()) as DesktopReleaseCatalog;

        setCatalog(data);
        setReleaseStatus("ready");
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setCatalog(null);
        setReleaseStatus("error");
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "İndirme bilgisi alınırken beklenmeyen bir hata oluştu."
        );
      }
    };

    void loadCatalog();

    return () => controller.abort();
  }, []);

  const selectedAsset = useMemo(() => {
    if (!catalog) {
      return null;
    }

    if (selectedOS === "windows") {
      return catalog.assets.windows;
    }

    return selectedMacArchitecture === "x64" ? catalog.assets.macX64 : catalog.assets.macArm64;
  }, [catalog, selectedMacArchitecture, selectedOS]);

  const manualDownloadPath = useMemo(
    () => buildDownloadPath(selectedOS, selectedMacArchitecture),
    [selectedMacArchitecture, selectedOS]
  );

  const isFormValid = useMemo(
    () =>
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.phone.trim() !== "" &&
      !validateName(formData.name) &&
      !validateEmail(formData.email) &&
      !validatePhone(formData.phone),
    [formData]
  );

  const canSubmit =
    releaseStatus === "ready" &&
    Boolean(catalog?.available) &&
    Boolean(selectedAsset) &&
    isFormValid &&
    status !== "submitting";

  const handleBlur = (field: keyof typeof fieldErrors) => {
    setTouched((previous) => ({ ...previous, [field]: true }));

    const validators = {
      name: validateName,
      email: validateEmail,
      phone: validatePhone
    };

    setFieldErrors((previous) => ({
      ...previous,
      [field]: validators[field](formData[field])
    }));
  };

  const handlePhoneChange = (rawValue: string) => {
    const formatted = formatPhone(rawValue);

    setFormData((previous) => ({ ...previous, phone: formatted }));

    if (touched.phone) {
      setFieldErrors((previous) => ({
        ...previous,
        phone: validatePhone(formatted)
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const errors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone)
    };

    setFieldErrors(errors);
    setTouched({ name: true, email: true, phone: true });

    if (errors.name || errors.email || errors.phone) {
      return;
    }

    if (!catalog?.available || !catalog.release || !selectedAsset) {
      setStatus("error");
      setErrorMessage(
        catalog?.error ?? "İndirilebilir bir kurulum paketi henüz yayınlanmadı."
      );
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          platform: selectedOS,
          architecture: selectedOS === "mac" ? selectedMacArchitecture : "x64",
          releaseVersion: catalog.release.version
        })
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Bir hata oluştu.");
      }

      setStatus("success");

      window.setTimeout(() => {
        window.location.assign(manualDownloadPath);
      }, 1200);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Bağlantı hatası. Lütfen tekrar deneyin."
      );
    }
  };

  const inputBase =
    "w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition-all";
  const inputOk =
    "border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white";
  const inputErr =
    "border-red-300 bg-red-50/40 focus:border-red-500 focus:ring-2 focus:ring-red-500/20";

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-100 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a href="#/" aria-label="Ana sayfaya git">
            <img src={logoHeader} alt="Domizan" className="h-7 object-contain" />
          </a>
          <a
            href="#/"
            className="flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Ana Sayfa
          </a>
        </div>
      </header>

      <main className="px-6 pb-20 pt-28">
        <div className="mx-auto max-w-3xl">
          <Motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-md text-center"
          >
            <Motion.img
              src={logoGradient}
              alt="Domizan"
              className="mx-auto mb-5 h-16 w-16 object-contain"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <h1 className="mb-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Domizan&apos;ı İndirin
            </h1>
            <p className="text-sm text-slate-500">
              Bilgilerinizi bırakın, doğru kurulum paketini hemen indirin.
            </p>
          </Motion.div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
            <Motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_-48px_rgba(37,99,235,0.45)]"
            >
              <div className="mb-6">
                <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                  İşletim Sistemi
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setSelectedOS("mac")}
                    className={`flex items-center justify-center gap-2.5 rounded-2xl border-2 py-3.5 text-sm font-semibold transition-all ${
                      selectedOS === "mac"
                        ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <Apple className="h-5 w-5" />
                    macOS
                    {initialOS === "mac" ? (
                      <span className="rounded-full bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-600">
                        Algılandı
                      </span>
                    ) : null}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedOS("windows")}
                    className={`flex items-center justify-center gap-2.5 rounded-2xl border-2 py-3.5 text-sm font-semibold transition-all ${
                      selectedOS === "windows"
                        ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <Monitor className="h-5 w-5" />
                    Windows
                    {initialOS === "windows" ? (
                      <span className="rounded-full bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-600">
                        Algılandı
                      </span>
                    ) : null}
                  </button>
                </div>
              </div>

              {selectedOS === "mac" ? (
                <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                      Mac Çipi
                    </p>
                    <span className="text-[11px] text-slate-500">
                      M serisi: Apple Silicon
                    </span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {(["arm64", "x64"] as const).map((architecture) => {
                      const asset =
                        architecture === "arm64" ? catalog?.assets.macArm64 : catalog?.assets.macX64;

                      return (
                        <button
                          key={architecture}
                          type="button"
                          onClick={() => setSelectedMacArchitecture(architecture)}
                          className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                            selectedMacArchitecture === architecture
                              ? "border-blue-500 bg-white shadow-sm"
                              : "border-slate-200 bg-white/70 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <div className="text-sm font-semibold text-slate-800">
                                {getArchitectureLabel(architecture)}
                              </div>
                              <div className="mt-1 text-xs text-slate-500">
                                {architecture === "arm64"
                                  ? "M1, M2, M3 ve M4 işlemciler"
                                  : "Eski Intel tabanlı Mac modelleri"}
                              </div>
                            </div>
                            <span
                              className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                                asset
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-slate-200 text-slate-500"
                              }`}
                            >
                              {asset ? "Hazır" : "Bekliyor"}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs font-medium text-slate-400">bilgilerinizi girin</span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {status === "success" ? (
                <Motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-slate-900">İndirme Başlıyor</h3>
                  <p className="text-sm text-slate-500">
                    Tarayıcı yönlendiriliyor. Başlamazsa aşağıdaki bağlantıyı kullanın.
                  </p>
                  <a
                    href={manualDownloadPath}
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    <Download className="h-4 w-4" />
                    Kurulum paketini şimdi indir
                  </a>
                </Motion.div>
              ) : (
                <>
                  {status === "error" && errorMessage ? (
                    <Motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                    >
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      {errorMessage}
                    </Motion.div>
                  ) : null}

                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div>
                      <label htmlFor="download-name" className="mb-1.5 block text-sm font-medium text-slate-700">
                        Ad Soyad
                      </label>
                      <input
                        id="download-name"
                        type="text"
                        autoComplete="name"
                        className={`${inputBase} ${touched.name && fieldErrors.name ? inputErr : inputOk}`}
                        placeholder="Adınız Soyadınız"
                        value={formData.name}
                        onChange={(event) => {
                          const value = event.target.value;
                          setFormData((previous) => ({ ...previous, name: value }));

                          if (touched.name) {
                            setFieldErrors((previous) => ({
                              ...previous,
                              name: validateName(value)
                            }));
                          }
                        }}
                        onBlur={() => handleBlur("name")}
                        disabled={status === "submitting"}
                      />
                      {touched.name && fieldErrors.name ? (
                        <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                          <AlertCircle className="h-3 w-3" />
                          {fieldErrors.name}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label htmlFor="download-email" className="mb-1.5 block text-sm font-medium text-slate-700">
                        E-posta Adresi
                      </label>
                      <input
                        id="download-email"
                        type="email"
                        autoComplete="email"
                        className={`${inputBase} ${touched.email && fieldErrors.email ? inputErr : inputOk}`}
                        placeholder="ornek@sirket.com"
                        value={formData.email}
                        onChange={(event) => {
                          const value = event.target.value;
                          setFormData((previous) => ({ ...previous, email: value }));

                          if (touched.email) {
                            setFieldErrors((previous) => ({
                              ...previous,
                              email: validateEmail(value)
                            }));
                          }
                        }}
                        onBlur={() => handleBlur("email")}
                        disabled={status === "submitting"}
                      />
                      {touched.email && fieldErrors.email ? (
                        <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                          <AlertCircle className="h-3 w-3" />
                          {fieldErrors.email}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label htmlFor="download-phone" className="mb-1.5 block text-sm font-medium text-slate-700">
                        Telefon Numarası
                      </label>
                      <input
                        id="download-phone"
                        type="tel"
                        autoComplete="tel"
                        inputMode="numeric"
                        className={`${inputBase} ${touched.phone && fieldErrors.phone ? inputErr : inputOk}`}
                        placeholder="0555 555 55 55"
                        value={formData.phone}
                        onChange={(event) => handlePhoneChange(event.target.value)}
                        onBlur={() => handleBlur("phone")}
                        disabled={status === "submitting"}
                        maxLength={14}
                      />
                      {touched.phone && fieldErrors.phone ? (
                        <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                          <AlertCircle className="h-3 w-3" />
                          {fieldErrors.phone}
                        </p>
                      ) : null}
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                            Seçili Paket
                          </p>
                          <p className="mt-2 text-sm font-semibold text-slate-800">
                            {selectedOS === "windows"
                              ? "Windows 64-bit"
                              : `macOS ${getArchitectureLabel(selectedMacArchitecture)}`}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {selectedAsset
                              ? `${selectedAsset.name} • ${formatAssetSize(selectedAsset.size)}`
                              : "Bu paket henüz yayınlanmadı."}
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                            selectedAsset
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {selectedAsset ? "Hazır" : "Bekleniyor"}
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Gönderiliyor...
                        </>
                      ) : (
                        <>
                          <Download className="h-5 w-5" />
                          {selectedOS === "windows"
                            ? "Windows için indir"
                            : `macOS ${getArchitectureLabel(selectedMacArchitecture)} indir`}
                        </>
                      )}
                    </button>
                  </form>

                  <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                    <Shield className="h-3 w-3" />
                    Bilgileriniz güvendedir. Üçüncü kişilerle paylaşılmaz.
                  </div>
                </>
              )}
            </Motion.section>
            <Motion.aside
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <section className="rounded-[28px] border border-slate-200 bg-slate-950 p-6 text-white shadow-[0_32px_80px_-44px_rgba(15,23,42,0.85)]">
                <div className="mb-6 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-300" />
                  <h2 className="text-sm font-bold">En Son Yayın</h2>
                </div>

                {releaseStatus === "loading" ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Release bilgisi yükleniyor...
                  </div>
                ) : null}

                {releaseStatus === "error" ? (
                  <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">
                    {errorMessage || "İndirme bilgisi alınamadı."}
                  </div>
                ) : null}

                {releaseStatus === "ready" && catalog && catalog.release ? (
                  <>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4 text-blue-300" />
                            <span className="text-sm font-semibold text-white">
                              v{catalog.release.version}
                            </span>
                            {catalog.release.prerelease ? (
                              <span className="rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                                Ön Sürüm
                              </span>
                            ) : (
                              <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                                Güncel
                              </span>
                            )}
                          </div>
                          <p className="mt-2 text-lg font-bold text-white">{catalog.release.name}</p>
                          <p className="mt-1 text-xs text-slate-400">
                            {formatReleaseDate(catalog.release.publishedAt)}
                          </p>
                        </div>
                        <a
                          href={catalog.release.htmlUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:border-white/20 hover:bg-white/5"
                        >
                          GitHub Release
                        </a>
                      </div>

                      <div className="mt-5 grid gap-3 sm:grid-cols-3">
                        {[
                          {
                            label: "Windows",
                            value: catalog.assets.windows ? "Hazır" : "Yok"
                          },
                          {
                            label: "mac Apple Silicon",
                            value: catalog.assets.macArm64 ? "Hazır" : "Yok"
                          },
                          {
                            label: "mac Intel",
                            value: catalog.assets.macX64 ? "Hazır" : "Yok"
                          }
                        ].map((item) => (
                          <div
                            key={item.label}
                            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                          >
                            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                              {item.label}
                            </div>
                            <div className="mt-2 text-sm font-semibold text-white">{item.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-slate-200 bg-white p-6 text-slate-900 shadow-[0_24px_70px_-48px_rgba(15,23,42,0.32)]">
                      <div className="mb-4 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-amber-500" />
                        <h3 className="text-sm font-bold text-slate-700">Sürüm Notları</h3>
                      </div>
                      <ul className="space-y-3">
                        {catalog.release.notes.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                            <Sparkles className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-amber-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : null}

                {releaseStatus === "ready" && catalog && !catalog.release ? (
                  <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-100">
                    {catalog.error}
                  </div>
                ) : null}
              </section>
            </Motion.aside>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-100 px-6 py-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-3 text-xs text-slate-400 sm:flex-row">
          <span>© 2026 Domizan. Tüm hakları saklıdır.</span>
          <div className="flex items-center gap-4">
            <a href="#/" className="transition-colors hover:text-blue-600">
              Ana Sayfa
            </a>
            <a href="#/blog" className="transition-colors hover:text-blue-600">
              Blog
            </a>
            <a href="#/docs" className="transition-colors hover:text-blue-600">
              Dokümantasyon
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DownloadPage;
