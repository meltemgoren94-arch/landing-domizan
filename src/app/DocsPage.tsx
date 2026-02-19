import React, { useState, useEffect } from "react";
import { Book, FileText, Users, BarChart3, HelpCircle, ChevronRight, Menu, X, Home } from "lucide-react";
import logoWide from "@/assets/logo-icon-3d.png";
import docsImage1 from "@/assets/docs/docs-image-1.png";
import docsImage2 from "@/assets/docs/docs-image-2.png";
import docsImage3 from "@/assets/docs/docs-image-3.png";
import docsImage4 from "@/assets/docs/docs-image-4.png";
import docsUploadConfirm from "@/assets/docs/docs-upload-confirm.png";

interface MenuItem {
    id: string;
    label: string;
    icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
    { id: "hızlı-başlangıç", label: "Hızlı Başlangıç", icon: <Book className="w-4 h-4" /> },
    { id: "panel-genel-bakış", label: "Panel Genel Bakış", icon: <Home className="w-4 h-4" /> },
    { id: "günlük-kullanım", label: "Günlük Kullanım", icon: <FileText className="w-4 h-4" /> },
    { id: "mükellef-yönetimi", label: "Mükellef Yönetimi", icon: <Users className="w-4 h-4" /> },
    { id: "raporlama", label: "Raporlama", icon: <BarChart3 className="w-4 h-4" /> },
    { id: "sık-sorulan-sorular", label: "Sık Sorulan Sorular", icon: <HelpCircle className="w-4 h-4" /> },
];

const DocsPage: React.FC = () => {
    const [activeSection, setActiveSection] = useState("hızlı-başlangıç");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const sections = menuItems.map((item) => document.getElementById(item.id));
            const scrollPosition = window.scrollY + 100;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(menuItems[i].id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setMobileMenuOpen(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <a href="#/" className="flex items-center gap-2">
                            <img src={logoWide} alt="Domizan" className="h-6 object-contain" />
                        </a>
                        <span className="text-slate-300">|</span>
                        <span className="text-sm font-semibold text-slate-600">Dokümantasyon</span>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </header>

            <div className="flex pt-16">
                {/* Sidebar - Desktop */}
                <aside className="hidden lg:block w-64 fixed left-0 top-16 bottom-0 overflow-y-auto border-r border-slate-200 bg-slate-50 p-6">
                    <nav className="space-y-1">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${activeSection === item.id
                                    ? "bg-blue-50 text-blue-600 border-l-2 border-blue-600"
                                    : "text-slate-600 hover:bg-slate-100"
                                    }`}
                            >
                                {item.icon}
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Mobile menu overlay */}
                {mobileMenuOpen && (
                    <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileMenuOpen(false)}>
                        <aside className="w-64 h-full bg-white p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                            <nav className="space-y-1 mt-4">
                                {menuItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${activeSection === item.id
                                            ? "bg-blue-50 text-blue-600"
                                            : "text-slate-600 hover:bg-slate-100"
                                            }`}
                                    >
                                        {item.icon}
                                        {item.label}
                                    </button>
                                ))}
                            </nav>
                        </aside>
                    </div>
                )}

                {/* Main content */}
                <main className="flex-1 lg:ml-64 px-4 sm:px-8 lg:px-12 py-8 max-w-4xl">
                    {/* Hızlı Başlangıç */}
                    <section id="hızlı-başlangıç" className="mb-16 scroll-mt-24">
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Domizan Dokümantasyon</h1>
                        <p className="text-slate-500 mb-8">Mali Müşavirler için AI destekli belge yönetim platformu.</p>

                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Book className="w-6 h-6 text-blue-600" />
                            Hızlı Başlangıç
                        </h2>

                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Kurulum Rehberi</h3>
                                    <p className="text-sm text-slate-500">Video ile adım adım kurulum</p>
                                </div>
                            </div>
                            <div className="aspect-video bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 overflow-hidden">
                                <img src={docsImage4} alt="Uygulama Kurulum Rehberi" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">1</div>
                                <div>
                                    <h4 className="font-semibold text-slate-900 mb-1">Domizan'ı İndirin</h4>
                                    <p className="text-slate-600">Resmi web sitesinden işletim sisteminize uygun versiyonu indirin.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">2</div>
                                <div>
                                    <h4 className="font-semibold text-slate-900 mb-1">Lisans Anahtarınızı Girin</h4>
                                    <p className="text-slate-600">Size e-posta ile gönderilen lisans anahtarını giriş ekranına yapıştırın.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">3</div>
                                <div>
                                    <h4 className="font-semibold text-slate-900 mb-1">Gelen Kutusu Klasörünü Belirleyin</h4>
                                    <p className="text-slate-600">Evrakların bırakılacağı ortak klasörü seçin (örn: \\SUNUCU\GelenKutusu).</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">4</div>
                                <div>
                                    <h4 className="font-semibold text-slate-900 mb-1">Mükellef Listenizi Aktarın</h4>
                                    <p className="text-slate-600">Mevcut mükellef listenizi Excel veya JSON formatında içe aktarın.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                            <ChevronRight className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                            <p className="text-sm text-amber-800">
                                <strong>İpucu:</strong> Ağ sürücüsü kullanıyorsanız, Domizan'ın kurulu olduğu bilgisayarın her zaman açık olduğundan emin olun.
                            </p>
                        </div>
                    </section>

                    {/* Panel Genel Bakış */}
                    <section id="panel-genel-bakış" className="mb-16 scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Home className="w-6 h-6 text-blue-600" />
                            Panel Genel Bakış
                        </h2>

                        <div className="aspect-video bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 mb-8 border border-slate-200 overflow-hidden">
                            <img src={docsImage1} alt="Panel Genel Bakış" className="w-full h-full object-cover" />
                        </div>

                        <h3 className="text-lg font-semibold text-slate-900 mb-4">Ana Ekran Bileşenleri</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="text-left px-4 py-3 font-semibold text-slate-900">Alan</th>
                                        <th className="text-left px-4 py-3 font-semibold text-slate-900">Açıklama</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    <tr><td className="px-4 py-3 font-medium">Gelen Kutusu</td><td className="px-4 py-3 text-slate-600">Yeni eklenen ve işlem bekleyen belgeler</td></tr>
                                    <tr><td className="px-4 py-3 font-medium">Son İşlemler</td><td className="px-4 py-3 text-slate-600">Son taşınan dosyaların listesi</td></tr>
                                    <tr><td className="px-4 py-3 font-medium">Kota Durumu</td><td className="px-4 py-3 text-slate-600">Aylık token kullanımınız</td></tr>
                                    <tr><td className="px-4 py-3 font-medium">Hızlı Erişim</td><td className="px-4 py-3 text-slate-600">Sık kullanılan mükellef klasörleri</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-lg font-semibold text-slate-900 mt-8 mb-4">Durum Göstergeleri</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm">
                                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                                <span className="font-medium">Çevrimiçi</span>
                                <span className="text-slate-500">- Sistem normal çalışıyor</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                                <span className="font-medium">Senkronize Ediliyor</span>
                                <span className="text-slate-500">- Bekleyen işlemler işleniyor</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                                <span className="font-medium">Çevrimdışı</span>
                                <span className="text-slate-500">- İnternet bağlantısı yok</span>
                            </div>
                        </div>
                    </section>

                    {/* Günlük Kullanım */}
                    <section id="günlük-kullanım" className="mb-16 scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <FileText className="w-6 h-6 text-blue-600" />
                            Günlük Kullanım
                        </h2>

                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
                            <h3 className="font-semibold text-slate-900 mb-4">Belge Yükleme ve Onaylama</h3>
                            <div className="aspect-video bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 overflow-hidden">
                                <img src={docsUploadConfirm} alt="Belge Yükleme ve Onaylama" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h4 className="font-semibold text-slate-900 mb-2">Adım 1: Belgeyi Gelen Kutusuna Bırakın</h4>
                                <p className="text-slate-600">PDF, JPG, PNG veya Excel dosyasını sürükleyip gelen kutusu klasörüne bırakın.</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-900 mb-2">Adım 2: AI Analiz Eder</h4>
                                <p className="text-slate-600 mb-3">Domizan belgeyi otomatik olarak analiz eder:</p>
                                <ul className="list-disc list-inside text-slate-600 space-y-1">
                                    <li>Belge türünü tanır (fatura, dekont, beyanname vb.)</li>
                                    <li>VKN/TC numarası çıkarır</li>
                                    <li>Tarihleri ve tutarları tespit eder</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-900 mb-3">Adım 3: Doğrulama Popup'ı</h4>
                                <div className="aspect-video bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 mb-4 border border-slate-200 overflow-hidden">
                                    <img src={docsImage2} alt="Doğrulama Popup Ekranı" className="w-full h-full object-cover" />
                                </div>
                                <p className="text-slate-600">Popup'ta belge türü, mükellef, dosyalama tarihi, hedef klasör ve güven skorunu göreceksiniz.</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-900 mb-2">Adım 4: Onaylayın veya Düzeltin</h4>
                                <div className="flex flex-wrap gap-3">
                                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-medium">✅ Onayla</span>
                                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">✏️ Düzelt</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4">
                            <p className="text-sm text-blue-800">
                                <strong>Not:</strong> Yaptığınız düzeltmeler sisteme öğretilir. Aynı tip belgeler için bir daha aynı hatayı yapmaz.
                            </p>
                        </div>
                    </section>

                    {/* Mükellef Yönetimi */}
                    <section id="mükellef-yönetimi" className="mb-16 scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Users className="w-6 h-6 text-blue-600" />
                            Mükellef Yönetimi
                        </h2>

                        <h3 className="text-lg font-semibold text-slate-900 mb-4">Yeni Mükellef Ekleme</h3>
                        <ol className="list-decimal list-inside text-slate-600 space-y-2 mb-8">
                            <li>Ana panelden <strong>"Mükellef Ekle"</strong> butonuna tıklayın</li>
                            <li>Firma bilgilerini girin (Firma Adı, VKN/TC, Vergi Dairesi)</li>
                            <li><strong>"Kaydet"</strong> butonuna tıklayın</li>
                        </ol>

                        <h3 className="text-lg font-semibold text-slate-900 mb-4">Toplu Mükellef Aktarımı</h3>
                        <p className="text-slate-600 mb-4">Excel dosyanız şu sütunları içermelidir:</p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="text-left px-4 py-3 font-semibold text-slate-900">Sütun</th>
                                        <th className="text-left px-4 py-3 font-semibold text-slate-900">Zorunlu</th>
                                        <th className="text-left px-4 py-3 font-semibold text-slate-900">Açıklama</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    <tr><td className="px-4 py-3 font-mono text-sm">firma_adi</td><td className="px-4 py-3">✅</td><td className="px-4 py-3 text-slate-600">Firma veya kişi adı</td></tr>
                                    <tr><td className="px-4 py-3 font-mono text-sm">vergi_no</td><td className="px-4 py-3">⚠️</td><td className="px-4 py-3 text-slate-600">VKN (10 hane)</td></tr>
                                    <tr><td className="px-4 py-3 font-mono text-sm">tc_no</td><td className="px-4 py-3">⚠️</td><td className="px-4 py-3 text-slate-600">TC Kimlik No (11 hane)</td></tr>
                                    <tr><td className="px-4 py-3 font-mono text-sm">vergi_dairesi</td><td className="px-4 py-3">❌</td><td className="px-4 py-3 text-slate-600">Bağlı olduğu vergi dairesi</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Raporlama */}
                    <section id="raporlama" className="mb-16 scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <BarChart3 className="w-6 h-6 text-blue-600" />
                            Raporlama
                        </h2>

                        <h3 className="text-lg font-semibold text-slate-900 mb-4">Token Kullanım Raporu</h3>
                        <div className="aspect-video bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 mb-6 border border-slate-200 overflow-hidden">
                            <img src={docsImage3} alt="Token Kullanım Grafiği" className="w-full h-full object-cover" />
                        </div>

                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6">
                            <h4 className="font-semibold text-slate-900 mb-2">Token Nedir?</h4>
                            <p className="text-slate-600 mb-4">Domizan, belge analizi için yapay zeka tokenleri kullanır.</p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="bg-white rounded-lg p-4 border border-slate-200">
                                    <div className="text-2xl font-bold text-slate-900">~5.000</div>
                                    <div className="text-sm text-slate-500">Standart belge</div>
                                </div>
                                <div className="bg-white rounded-lg p-4 border border-slate-200">
                                    <div className="text-2xl font-bold text-slate-900">~8.000</div>
                                    <div className="text-sm text-slate-500">Karmaşık beyanname</div>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-lg font-semibold text-slate-900 mb-4">İşlem Geçmişi</h3>
                        <p className="text-slate-600">Tüm taşınan belgeler loglanır: kaynak dosya, hedef klasör, işlem tarihi, mükellef bilgisi, AI güven skoru ve yapılan düzeltmeler.</p>
                    </section>

                    {/* SSS */}
                    <section id="sık-sorulan-sorular" className="mb-16 scroll-mt-24">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <HelpCircle className="w-6 h-6 text-blue-600" />
                            Sık Sorulan Sorular
                        </h2>

                        <div className="space-y-6">
                            <div className="border-b border-slate-200 pb-6">
                                <h4 className="font-semibold text-slate-900 mb-2">İnternet kesilirse ne olur?</h4>
                                <p className="text-slate-600">Belgeler yerel kuyruğa alınır. İnternet bağlantısı geldiğinde otomatik olarak işlenir.</p>
                            </div>
                            <div className="border-b border-slate-200 pb-6">
                                <h4 className="font-semibold text-slate-900 mb-2">Verilerim nerede saklanıyor?</h4>
                                <p className="text-slate-600">Tüm belgeleriniz kendi bilgisayarınızda kalır. Sunucuya yalnızca belge metni gönderilir.</p>
                            </div>
                            <div className="border-b border-slate-200 pb-6">
                                <h4 className="font-semibold text-slate-900 mb-2">Hangi dosya formatları destekleniyor?</h4>
                                <p className="text-slate-600">PDF, JPG, PNG ve Excel (.xlsx) dosyaları desteklenmektedir.</p>
                            </div>
                            <div className="border-b border-slate-200 pb-6">
                                <h4 className="font-semibold text-slate-900 mb-2">Sistem gereksinimleri nelerdir?</h4>
                                <p className="text-slate-600">Windows 10/11 veya macOS 12+, minimum 4 GB RAM, 1 Mbps internet bağlantısı.</p>
                            </div>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="border-t border-slate-200 pt-8 mt-16">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h4 className="font-semibold text-slate-900 mb-1">Destek</h4>
                                <p className="text-sm text-slate-500">📧 destek@domizan.com | 📞 0850 123 45 67</p>
                            </div>
                            <p className="text-xs text-slate-400">Son güncelleme: Şubat 2026</p>
                        </div>
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default DocsPage;
