import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  FileSearch,
  FolderCheck,
  Send,
  Newspaper,
  Lock,
  HardDrive,
  EyeOff,
  ShieldAlert,
  Presentation
} from "lucide-react";
import { AgentAnimation } from "./components/AgentAnimation";
import { CountdownTimer } from "./components/CountdownTimer";
import { PresentationModal } from "./components/PresentationModal";
import { LeadFormModal } from "./components/LeadFormModal";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { MobileNav } from "./components/layout/MobileNav";
import { StructuredData } from "./components/seo/StructuredData";
import { ProblemCard } from "./components/shared/ProblemCard";
import { StepTabs } from "./components/StepTabs";
import { FeatureItem } from "./components/shared/FeatureItem";
import { SecurityCard } from "./components/shared/SecurityCard";
import logoHeader from "@/assets/logo-text-blue.png";
import logoGradient from "@/assets/logo-icon-gradient.png";
import { NavLink } from "@/types";

// Navigation links used in both desktop and mobile nav
const navLinks: NavLink[] = [
  { href: "#problems", label: "Sorunlar" },
  { href: "#how-it-works", label: "Nasıl Çalışır?" },
  { href: "#features", label: "Özellikler" },
  { href: "#security", label: "Güvenlik" },
];

const App: React.FC = () => {
  const [isPresentationModalOpen, setIsPresentationModalOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  return (
    <>
      {/* SEO Structured Data - JSON-LD */}
      <StructuredData />

      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
        {/* Navigation */}
        <header role="banner">
          <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200" aria-label="Ana navigasyon">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
              <div className="flex items-center gap-12">
                <a href="/" aria-label="Ana sayfaya git">
                  <img src={logoHeader} alt="Domizan - AI Destekli Mali Müşavir Asistanı" className="h-8 object-contain" />
                </a>
                <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
                  {navLinks.map((link) => (
                    <a key={link.href} href={link.href} className="hover:text-blue-600 transition-colors">
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <a href="#/blog" className="hidden sm:block text-sm font-semibold text-slate-600 hover:text-blue-600">Blog</a>
                <a href="#/docs" className="hidden sm:block text-sm font-semibold text-slate-600 hover:text-blue-600">Dokümantasyon</a>
                <button
                  onClick={() => setIsLeadModalOpen(true)}
                  className="hidden sm:block bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                >
                  Ücretsiz Dene
                </button>
                {/* Mobile Navigation */}
                <MobileNav links={navLinks} logo={logoHeader} />
              </div>
            </div>
          </nav>
        </header>

        <main role="main">
          {/* Hero Section */}
          <section id="hero" aria-labelledby="hero-title" className="pt-40 pb-20 px-6 overflow-hidden bg-white">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
              <Motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 id="hero-title" className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] text-slate-900">
                  Haftalık <br />
                  Rapor İşini <br />
                  <span className="inline-flex items-baseline gap-1 flex-wrap">
                    <CountdownTimer />'e
                  </span> <br />
                  İndirin
                </h1>
                <p className="mt-8 text-lg text-slate-600 leading-relaxed max-w-xl">
                  Domizan evrakları otomatik ayrıştırsın, mükellef dosyalarını hatasız yönetsin.
                  Artık beyanname takibi ve anlık bilgi sorgulama işlemleri için bilgisayara bağlı kalmayın.
                  Telegram üzerinden sistemimizle konuşun, ofisinizi mobil özgürlükle yönetin.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <button
                    onClick={() => setIsLeadModalOpen(true)}
                    className="bg-blue-600 text-white px-8 sm:px-10 py-4 rounded-2xl text-lg font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-xl shadow-blue-600/20"
                  >
                    Ücretsiz Dene
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => setIsPresentationModalOpen(true)}
                    className="bg-white text-slate-700 border border-slate-200 px-8 sm:px-10 py-4 rounded-2xl text-lg font-bold hover:bg-slate-50 transition-all flex items-center gap-2"
                  >
                    <Presentation className="w-5 h-5" aria-hidden="true" />
                    Domizan Nedir?
                  </button>
                </div>
                <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-center opacity-60">
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-green-500" aria-hidden="true" />
                    Veriler Sizin Bilgisayarınızda
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-green-500" aria-hidden="true" />
                    KVKK Uyumlu
                  </div>
                </div>
              </Motion.div>

              <Motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="hidden lg:flex justify-center lg:justify-end"
              >
                <AgentAnimation />
              </Motion.div>
            </div>
          </section>

          {/* Problem Section */}
          <section id="problems" aria-labelledby="problems-title" className="py-24 px-6 bg-slate-50">
            <div className="max-w-7xl mx-auto text-center mb-16">
              <h2 id="problems-title" className="text-3xl md:text-4xl font-bold">Beyanname Dönemi <span className="text-red-500">Kabusu mu?</span></h2>
              <p className="mt-4 text-slate-500 max-w-2xl mx-auto">Mali müşavirlerin en büyük sorunlarını çözüyoruz.</p>
            </div>

            <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProblemCard
                icon={<Clock className="w-6 h-6 text-red-500" />}
                title="Sürekli Hatırlatma"
                description="Mükelleflerinize vade hatırlatması yapmak için saatler harcıyorsunuz. Her gün aynı sorular, aynı telefonlar."
              />
              <ProblemCard
                icon={<FolderCheck className="w-6 h-6 text-red-500" />}
                title="Evrak Karmaşası"
                description="Dosyaları düzgünce toplamak, mükellef klasörlerine ayırmak saatler sürüyor. Evrak kaybı her an bir risk."
              />
              <ProblemCard
                icon={<ShieldAlert className="w-6 h-6 text-red-500" />}
                title="Mevzuat Takibi"
                description="Değişiklikleri kaçırma korkusu. Her gün Resmi Gazete'yi takip etmek, yeni düzenlemeleri öğrenmek zorunda hissediyorsunuz."
              />
            </div>

            <div className="mt-12 flex flex-col items-center">
              <h3 className="text-2xl font-bold text-slate-800 mb-8">
                Domizan ile bu sorunlar son buluyor
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="#/blog"
                  className="bg-white text-slate-700 border border-slate-200 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
                >
                  Blog
                </a>
                <button
                  onClick={() => setIsPresentationModalOpen(true)}
                  className="bg-white text-slate-700 border border-slate-200 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
                >
                  <Presentation className="w-5 h-5 text-blue-600" />
                  Nasıl Çalışır?
                </button>
                <a
                  href="#/docs"
                  className="bg-white text-slate-700 border border-slate-200 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
                >
                  Dokümantasyon
                </a>
              </div>
            </div>
          </section>

          {/* Steps Section */}
          <section id="how-it-works" aria-labelledby="steps-title" className="py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto text-center mb-12">
              <h2 id="steps-title" className="text-3xl md:text-4xl font-bold">3 Adımda <span className="text-blue-600">Akıllı Muhasebe</span></h2>
              <p className="mt-4 text-slate-500">Evrakları sürükleyin, AI analiz etsin, mükellef klasörlerine otomatik kaydetsin. Gerisini Domizan halleder.</p>
            </div>

            <StepTabs />

            {/* 2 CTA Buttons */}
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <a href="#/docs" className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-slate-50 transition-all">
                Dokümantasyon
              </a>
              <button
                onClick={() => setIsLeadModalOpen(true)}
                className="bg-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20"
              >
                Ücretsiz Dene
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </section>

          {/* Feature Grid */}
          <section id="features" aria-labelledby="features-title" className="py-24 px-6 bg-slate-50">
            <div className="max-w-7xl mx-auto text-center mb-16">
              <h2 id="features-title" className="text-3xl md:text-4xl font-bold">Kullandıkça Öğrenen, <span className="text-blue-600">Her Gün Daha Akıllı</span></h2>
              <p className="mt-4 text-slate-500">Bir müşterinin düzeltmesi tüm sisteme katkı sağlar. %94 tutarlılıkla pattern oluşturur, hata oranını her gün düşürür.</p>
            </div>

            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
              <FeatureItem
                icon={<FileSearch className="text-blue-600" />}
                title="Akıllı Belge Analizi"
                description="PDF, Fotoğraf, Excel dosyalarını AI otomatik okur. Vergi numarası, tutar, tarih gibi kritik bilgileri saniyeler içinde çıkarır."
              />
              <FeatureItem
                icon={<FolderCheck className="text-blue-600" />}
                title="Otomatik Tasnif"
                description="Vergi no veya TC no ile mükellefi bulur, belgeyi ilgili klasöre otomatik kopyalar. Hiçbir evrak kaybolmaz."
              />
              <FeatureItem
                icon={<Send className="text-blue-600" />}
                title="Telegram Sabah Brifingi"
                description="Her sabah size Telegram'dan mesaj atar. Bugünkü beyannameleri, yaklaşan vadeleri, gecikmiş ödemeleri ve yeni belgeleri."
              />
              <FeatureItem
                icon={<Newspaper className="text-blue-600" />}
                title="Resmi Gazete Takibi"
                description="Mevzuatı dakika dakika takip eder, size özel özetler. Yeni düzenlemelerden haberiniz kalmasın."
              />
            </div>
          </section>

          {/* Security Section */}
          <section id="security" aria-labelledby="security-title" className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 blur-[120px]" aria-hidden="true" />

            <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
              <h2 id="security-title" className="text-3xl md:text-4xl font-bold">Verileriniz <span className="text-blue-400">Sizin</span></h2>
              <p className="mt-4 text-slate-400 max-w-2xl mx-auto">Mülkiyet bulutta değil, sizin kontrolünüzde. Verileriniz sizin bilgisayarınızda güvende.</p>
            </div>

            <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
              <SecurityCard title="Local First" description="Verileriniz önce yerel bilgisayarınızda işlem görür." icon={<HardDrive className="w-5 h-5 text-blue-400" />} />
              <SecurityCard title="Device Lock" description="Sadece izin verdiğiniz cihazlardan erişim." icon={<Lock className="w-5 h-5 text-blue-400" />} />
              <SecurityCard title="Encryption" description="Uçtan uca 256-bit şifreleme." icon={<ShieldCheck className="w-5 h-5 text-blue-400" />} />
              <SecurityCard title="Compliance" description="KVKK ve GDPR tam uyumlu." icon={<ShieldAlert className="w-5 h-5 text-blue-400" />} />
              <SecurityCard title="Privacy" description="Dosya içeriği sunucuya gönderilmez, sadece metin analizi." icon={<EyeOff className="w-5 h-5 text-blue-400" />} />
              <SecurityCard title="Token Takibi" description="Tüm API kullanımları loglanır, şeffaf maliyet takibi." icon={<FileSearch className="w-5 h-5 text-blue-400" />} />
            </div>

            <div className="mt-16 flex flex-wrap justify-center gap-8 items-center opacity-60 grayscale brightness-200">
              <span className="text-xs font-bold tracking-widest">LOCAL STORAGE</span>
              <span className="text-xs font-bold tracking-widest">KVKK READY</span>
              <span className="text-xs font-bold tracking-widest">GDPR READY</span>
            </div>

          </section>
        </main>

        {/* Footer */}
        <footer role="contentinfo" className="bg-slate-950 text-white py-20 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
            <div className="col-span-1 sm:col-span-2">
              <Motion.img
                src={logoGradient}
                alt="Domizan"
                className="h-24 w-24 object-contain mb-4"
                animate={{ y: [0, -5, 0], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <p className="text-slate-500 max-w-sm mb-6">
                Yapay zeka destekli mali müşavir asistanı.
                İşlerinizi otomatikleştirin, zaman kazanın.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs">
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                Verileriniz tam kapsamlı güvende
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6">KAYNAKLAR</h4>
              <ul className="space-y-4 text-slate-500 text-sm" role="list">
                <li><a href="#/blog" className="hover:text-blue-400 transition-colors">Blog</a></li>
                <li><a href="#/docs" className="hover:text-blue-400 transition-colors">Dokümantasyon</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Hızlı Başlangıç</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">SSS</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">İLETİŞİM</h4>
              <ul className="space-y-4 text-slate-500 text-sm" role="list">
                <li><a href="mailto:info@domizan.com" className="hover:text-blue-400 transition-colors">info@domizan.com</a></li>
                <li><a href="tel:08501234567" className="hover:text-blue-400 transition-colors">0850 123 45 67</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
            <div>© 2026 Domizan. Tüm hakları saklıdır. | KVKK Uyumlu</div>
            <button
              onClick={() => setIsLeadModalOpen(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition-all"
            >
              Ücretsiz Dene
            </button>
          </div>
        </footer>

        {/* Presentation Modal */}
        <PresentationModal
          isOpen={isPresentationModalOpen}
          onClose={() => setIsPresentationModalOpen(false)}
        />

        {/* Lead Form Modal */}
        <LeadFormModal
          isOpen={isLeadModalOpen}
          onClose={() => setIsLeadModalOpen(false)}
        />
      </div>
    </>
  );
};

export default App;
