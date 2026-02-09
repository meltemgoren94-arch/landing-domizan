import React, { useState } from "react";
import { Upload, Brain, FolderCheck, CheckCircle2 } from "lucide-react";

interface TabContent {
    title: string;
    description: string;
    features: string[];
    icon: React.ReactNode;
}

// Son kullanıcı odaklı içerikler
const tabContents: TabContent[] = [
    {
        title: "Evrak Yükle",
        description: "Ortak klasöre dosyalarınızı bırakın. Sistem otomatik olarak algılar ve işleme alır.",
        features: [
            "Sürükle bırak ile kolay yükleme",
            "PDF, fotoğraf ve Excel desteği",
            "Birden fazla dosyayı aynı anda yükleyin",
            "Otomatik dosya algılama"
        ],
        icon: <Upload className="w-8 h-8" />
    },
    {
        title: "AI Analiz Etsin",
        description: "Yapay zeka belgenizi okur, vergi numarasını ve mükellef bilgisini otomatik çıkarır.",
        features: [
            "Fatura, dekont, beyanname otomatik tanınır",
            "Vergi numarası ile mükellef eşleştirme",
            "Tarih ve tutar bilgisi çıkarma",
            "Analiz güvenilirlik puanı gösterimi"
        ],
        icon: <Brain className="w-8 h-8" />
    },
    {
        title: "Otomatik Klasörle",
        description: "Belge doğru mükellef klasörüne otomatik taşınır. Hiçbir evrak kaybolmaz.",
        features: [
            "Mükellefi bulur, klasörüne yerleştirir",
            "Tüm işlemler kayıt altına alınır",
            "Hatalı eşleşmeleri tek tıkla düzeltin",
            "Sistem düzeltmelerden öğrenir"
        ],
        icon: <FolderCheck className="w-8 h-8" />
    }
];

export const StepTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const currentTab = tabContents[activeTab];

    return (
        <div className="max-w-5xl mx-auto">
            {/* Tab Headers */}
            <div className="flex justify-center gap-2 sm:gap-4 mb-8">
                {tabContents.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-sm sm:text-base transition-all ${activeTab === index
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600"
                            }`}
                    >
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${activeTab === index ? "bg-white/20" : "bg-slate-100"
                            }`}>
                            {index + 1}
                        </span>
                        <span className="hidden sm:inline">{tab.title}</span>
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${activeTab === 0 ? "bg-blue-100 text-blue-600" :
                                activeTab === 1 ? "bg-purple-100 text-purple-600" :
                                    "bg-green-100 text-green-600"
                            }`}>
                            {currentTab.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">
                            {activeTab + 1}. {currentTab.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed mb-6">
                            {currentTab.description}
                        </p>
                        <ul className="space-y-3">
                            {currentTab.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-slate-600">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Visual representation */}
                    <div className="bg-slate-50 rounded-2xl p-8 flex items-center justify-center min-h-[280px]">
                        <div className={`text-center ${activeTab === 0 ? "text-blue-500" :
                                activeTab === 1 ? "text-purple-500" :
                                    "text-green-500"
                            }`}>
                            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-current/10 flex items-center justify-center">
                                {activeTab === 0 && <Upload className="w-12 h-12" />}
                                {activeTab === 1 && <Brain className="w-12 h-12" />}
                                {activeTab === 2 && <FolderCheck className="w-12 h-12" />}
                            </div>
                            <div className="text-lg font-bold text-slate-900">{currentTab.title}</div>
                            <div className="text-sm text-slate-400 mt-1">
                                {activeTab === 0 && "Dosyalar kuyruğa alındı"}
                                {activeTab === 1 && "Analiz ediliyor..."}
                                {activeTab === 2 && "Klasöre taşındı ✓"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepTabs;
