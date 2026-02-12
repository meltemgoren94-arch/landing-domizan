export interface BlogArticle {
    id: number;
    title: string;
    description: string;
    content: string;
    labels: string[];
    date: string;
    slug?: string; // Optional for now, but used for markdown mapping
}

export const blogArticles: BlogArticle[] = [
    {
        id: 1,
        title: "KDV İndirimi ve İstisnaları Uygulaması",
        description: "KDV indirim hakkı, mal veya hizmetin fatura karşılığında teslim alınıp ilgili takvim yılını takip eden yılın sonuna kadar kullanılabilir.",
        content: `KDV indirim hakkı, mal veya hizmetin fatura karşılığında teslim alınmasıyla doğar ve ilgili takvim yılını takip eden yılın sonuna kadar kullanılabilir. İhracat ve eğitim gibi tam istisnalarda yüklenilen KDV iade alınabilirken, kısmi istisnalarda indirim yasağına dikkat edilmelidir.

KDV Kanunu'nun 29. maddesi uyarınca indirim süreci, mükellefin belgelerini yasal defterlere süresinde kaydetmesine bağlıdır. Domizan, bilgisayarınıza indirdiğiniz Resmi Gazete nüshaları veya özel sirkülerler arasında akıllı arama yaparak, belirli bir sektöre ait KDV istisnasının güncel detaylarını saniyeler içinde bulup çıkarır. Özellikle ofis dışındayken, yerel arşivinizdeki binlerce sayfa döküman arasından ilgili maddeyi bulmak yerine, Telegram üzerinden Domizan'a sormanız yeterlidir; o, sizin dökümanlarınızı tarayarak doğru yanıtı mobil cihazınıza getirir.`,
        labels: ["Vergi", "KDV", "İstisna", "Mevzuat"],
        date: "11 Şubat 2026",
        slug: "kdv-indirimi-ve-istisnalari"
    },
    {
        id: 2,
        title: "Enflasyon Muhasebesi ve Vergi Etkisi",
        description: "2024 yılında hayatımıza giren ve 2026'da devam eden enflasyon düzeltmesi, parasal olmayan kıymetlerin satın alma gücündeki değişime göre güncellenmesidir.",
        content: `2024 yılında hayatımıza giren ve 2026'da devam eden enflasyon düzeltmesi, parasal olmayan kıymetlerin satın alma gücündeki değişime göre güncellenmesidir. Bu işlem sonucunda oluşan farklar doğrudan vergi matrahını etkilemekte, bazı işletmelerde ek vergi yükü yaratırken bazılarında vergi avantajı sağlamaktadır.

VUK Geçici 33. madde çerçevesinde uygulanan bu süreç, teknik dökümanların ve tebliğlerin sıkça taranmasını gerektirir. Domizan, bilgisayarınızdaki enflasyon muhasebesi çalışma notlarını, uygulama tebliğlerini ve Excel tablolarınızdaki verileri analiz ederek size rehberlik eder. Dış dünyada, örneğin bir müşteri ziyaretindeyken, bilgisayarınızda kayıtlı olan "enflasyon düzeltme farkları" ile ilgili özel bir notunuza veya indirdiğiniz bir rehbere mobil üzerinden anında ulaşıp karmaşık soruları yanıtlayabilirsiniz.`,
        labels: ["Muhasebe", "Enflasyon", "VUK", "Vergi"],
        date: "10 Şubat 2026",
        slug: "enflasyon-muhasebesi"
    },
    {
        id: 3,
        title: "Kurumlar Vergisi İstisnaları ve Teşvikler",
        description: "Kurumlar vergisi mükellefleri; iştirak kazançları, taşınmaz satış kazancı, Ar-Ge indirimleri ve yatırım teşvik belgeli harcamalar üzerinden ciddi vergi indirimlerinden yararlanabilirler.",
        content: `Kurumlar vergisi mükellefleri; iştirak kazançları, taşınmaz satış kazancı, Ar-Ge indirimleri ve yatırım teşvik belgeli harcamalar üzerinden ciddi vergi indirimlerinden yararlanabilirler. Ayrıca genç girişimci istisnası gibi uygulamalar, yeni kurulan işletmeler için 3 yıl boyunca önemli bir kazanç muafiyeti sağlar.

Kurumlar Vergisi Kanunu 5. ve 10. maddeleri kapsamındaki teşvikler, genellikle her mükellef için farklı dökümanlarda (Yatırım Teşvik Belgeleri, Ar-Ge Merkezi Raporları vb.) saklanır. Domizan, kendi yerel klasörlerinizde tuttuğunuz bu özel teşvik belgelerini ve raporları okuyarak, hangi mükellefin ne kadar indirim hakkı kaldığını veya hangi şartlara tabi olduğunu sizin için özetler. Mobilite avantajı sayesinde, ofisinizdeki bilgisayarda kayıtlı olan bu özel belgelere dışarıdayken Telegram üzerinden erişip kritik bilgileri sorgulayabilirsiniz.`,
        labels: ["Kurumlar Vergisi", "Teşvik", "Ar-Ge", "Girişimcilik"],
        date: "09 Şubat 2026",
        slug: "kurumlar-vergisi-istisnalari"
    },
    {
        id: 4,
        title: "Gelir Vergisi Dilimleri ve Ücret Bordrosu Stopajı",
        description: "Ücretliler ve şahıs işletmeleri için uygulanan gelir vergisi tarifesi, her yıl yeniden değerleme oranında güncellenerek artan oranlı bir yapıda tahsil edilir.",
        content: `Ücretliler ve şahıs işletmeleri için uygulanan gelir vergisi tarifesi, her yıl yeniden değerleme oranında güncellenerek artan oranlı bir yapıda tahsil edilir. İşverenler, çalışanlarına ödedikleri ücretler üzerinden gelir vergisi stopajı yaparak muhtasar beyanname ile vergi dairesine ödemekle yükümlüdür.

Her yıl güncellenen gelir vergisi dilimleri, mali müşavirlerin arşivlediği tebliğlerde yer alır. Domizan, bilgisayarınızdaki 2026 yılına ait güncel vergi tarifesi dökümanlarını veya bordro uygulama esaslarını içeren PDF'leri tarayarak size net bilgi verir. Bir çalışanınızın veya müşterinizin vergi dilimi sorusuna, bilgisayarınızda kayıtlı olan resmi belgeleri temel alarak, mobil üzerinden saniyeler içinde ve hata payı sıfır olacak şekilde yanıt verebilirsiniz.`,
        labels: ["Gelir Vergisi", "Bordro", "Stopaj", "Mevzuat"],
        date: "08 Şubat 2026",
        slug: "gelir-vergisi-dilimleri"
    },
    {
        id: 5,
        title: "Şüpheli ve Değersiz Alacakların Muhasebeleştirilmesi",
        description: "Tahsil edilemeyen veya tahsili şüpheli hale gelen alacaklar için dava veya icra takibi başlatılması şartıyla karşılık ayrılabilir ve bu tutar gider olarak kaydedilebilir.",
        content: `Tahsil edilemeyen veya tahsili şüpheli hale gelen alacaklar için dava veya icra takibi başlatılması şartıyla karşılık ayrılabilir ve bu tutar gider olarak kaydedilebilir. 2026 yılı için belirlenen küçük alacak sınırı dahilindeki alacaklar için ise dava açma şartı aranmaksızın doğrudan karşılık ayrılması mümkündür.

VUK 323. madde kapsamındaki şüpheli alacak süreçleri, genellikle avukat yazışmaları veya icra takip dökümanları ile belgelenir. Domizan, kullanıcının bilgisayarında bulunan icra dosyalarını, dava dilekçelerini veya konuyla ilgili indirilmiş özel muktezaları inceleyerek, hangi alacak için karşılık ayrılabileceğine dair döküman bazlı kanıtlar sunar. Mobil cihazınızdan Domizan'a eriştiğinizde, yerel arşivinizdeki bu hukuki dökümanların durumunu sorgulayabilir ve sahadayken dahi karar verme sürecinizi hızlandırabilirsiniz.`,
        labels: ["Muhasebe", "Alacaklar", "VUK", "Hukuk"],
        date: "07 Şubat 2026",
        slug: "supheli-alacaklar"
    },
    {
        id: 6,
        title: "Finansman Gider Kısıtlaması Hesaplama",
        description: "İşletmelerin kullandıkları yabancı kaynakların, öz kaynaklarını aşması durumunda aşan kısma isabet eden giderlerin %10'u vergi matrahından indirilemez.",
        content: "",
        labels: ["Finansman", "Gider Kısıtlaması", "Vergi", "Bilanço"],
        date: "06 Şubat 2026",
        slug: "finansman-gider-kisitlamasi"
    },
    {
        id: 7,
        title: "Transfer Fiyatlandırması ve İlişkili Kişi İşlemleri",
        description: "İlişkili kişilerle yapılan mal veya hizmet alım-satım işlemlerinde fiyatın, 'emsallere uygunluk' ilkesine göre belirlenmesi zorunludur.",
        content: "",
        labels: ["Transfer Fiyatlandırması", "Vergi", "Emsal Bedel", "İlişkili Kişi"],
        date: "05 Şubat 2026",
        slug: "transfer-fiyatlandirmasi"
    },
    {
        id: 8,
        title: "Vergi İncelemesi Süreci ve Uzlaşma Hakları",
        description: "Vergi incelemesi, mükelleflerin beyanlarının doğruluğunu araştırmak amacıyla müfettişler tarafından yürütülen yasal bir denetim sürecidir.",
        content: "",
        labels: ["Vergi İncelemesi", "Uzlaşma", "Hukuk", "Denetim"],
        date: "04 Şubat 2026",
        slug: "vergi-incelemesi-sureci"
    },
    {
        id: 9,
        title: "Vergi Affı ve Yapılandırma Kanunları Uygulaması",
        description: "Türkiye'de belirli periyotlarla çıkarılan yapılandırma yasaları, kesinleşmiş borçların faizlerinin silinmesini ve taksitlendirilmesini sağlar.",
        content: "",
        labels: ["Vergi Affı", "Yapılandırma", "Matrah Artırımı", "Mevzuat"],
        date: "03 Şubat 2026",
        slug: "vergi-affi-ve-yapilandirma"
    },
    {
        id: 10,
        title: "Geçici Vergi Hesaplaması ve %10 Yanılma Payı",
        description: "Gerçek ve tüzel kişiler, cari yıl kazançları üzerinden üçer aylık dönemler itibarıyla geçici vergi öderler.",
        content: "",
        labels: ["Geçici Vergi", "Beyanname", "Vergi Cezası", "Muhasebe"],
        date: "02 Şubat 2026",
        slug: "gecici-vergi-hesaplamasi"
    },
    {
        id: 11,
        title: "Amortisman ve Yeniden Değerleme İşlemleri",
        description: "İşletme aktifindeki iktisadi kıymetlerin aşınma paylarını ifade eden amortismanlar, VUK md. 315 uyarınca faydalı ömürlerine göre hesaplanır.",
        content: "",
        labels: ["Amortisman", "Yeniden Değerleme", "Demirbaş", "Muhasebe"],
        date: "01 Şubat 2026",
        slug: "amortisman-yeniden-degerleme"
    },
    {
        id: 12,
        title: "e-Fatura ve e-Arşiv Fatura Geçiş Zorunlulukları",
        description: "Gelir İdaresi Başkanlığı, dijitalleşme vizyonu doğrultusunda e-fatura ve e-arşiv fatura zorunluluk limitlerini her yıl aşağı çekmektedir.",
        content: "",
        labels: ["e-Fatura", "e-Arşiv", "e-Dönüşüm", "Mevzuat"],
        date: "31 Ocak 2026",
        slug: "e-fatura-gecis-zorunluluklari"
    },
    {
        id: 13,
        title: "İhbar ve Kıdem Tazminatı Hesaplama Esasları",
        description: "İş hukukunda personelin işten ayrılma sürecinde ödenen kıdem ve ihbar tazminatları, her 6 ayda bir güncellenen kıdem tazminatı tavanı üzerinden hesaplanır.",
        content: "",
        labels: ["Kıdem Tazminatı", "İhbar Tazminatı", "Bordro", "İş Hukuku"],
        date: "30 Ocak 2026",
        slug: "ihbar-kidem-tazminati"
    },
    {
        id: 14,
        title: "Serbest Meslek Makbuzu (e-SMM) ve Stopaj Uygulaması",
        description: "Serbest meslek erbaplarının tahsilat esaslı düzenlediği e-SMM, %20 stopaj ve %20 KDV tevkifatı gibi teknik detaylar içerir.",
        content: "",
        labels: ["e-SMM", "Serbest Meslek", "Stopaj", "KDV"],
        date: "29 Ocak 2026",
        slug: "serbest-meslek-makbuzu"
    },
    {
        id: 15,
        title: "Şirket Kuruluşu ve Tür Değişikliği Süreçleri",
        description: "Limited şirketten anonim şirkete dönüşüm veya yeni bir şirket kuruluşu; ana sözleşme hazırlığı, ticaret sicil işlemleri ve vergi dairesi bildirimleri gibi çok aşamalı prosedürler içerir.",
        content: "",
        labels: ["Şirket Kuruluşu", "Tür Değişikliği", "Ticaret Sicili", "Mevzuat"],
        date: "28 Ocak 2026",
        slug: "sirket-kurulusu-tur-degisikligi"
    },
    {
        id: 16,
        title: "SMMM Staja Giriş Sınavı (SGS) Hazırlık ve Mevzuat Takibi",
        description: "SMMM olma yolundaki ilk adım olan SGS; finansal muhasebe, maliyet muhasebesi, vergi hukuku ve genel yetenek konularını kapsayan kapsamlı bir sınavdır.",
        content: "",
        labels: ["SMMM", "SGS", "Staj", "Eğitim"],
        date: "27 Ocak 2026",
        slug: "smmm-sgs-hazirlik"
    },
    {
        id: 17,
        title: "SMMM Yeterlilik Sınavı Konuları ve Geçmiş Soru Analizleri",
        description: "Staj dönemini tamamlayan adayların girdiği yeterlilik sınavı; finansal raporlama, denetim, meslek hukuku ve maliyet muhasebesi gibi 7-8 ana branşta klasik usulde yapılır.",
        content: "",
        labels: ["SMMM Yeterlilik", "Finansal Raporlama", "Denetim", "Eğitim"],
        date: "26 Ocak 2026",
        slug: "smmm-yeterlilik-sinavi"
    },
    {
        id: 18,
        title: "KGK Bağımsız Denetçi Eğitimleri ve Yetkilendirme Süreçleri",
        description: "Kamu Gözetimi Kurumu (KGK) tarafından verilen bağımsız denetçi lisansı için gerekli olan eğitimler ve sınavlar, Uluslararası Finansal Raporlama Standartları (UFRS) üzerine yoğunlaşır.",
        content: "",
        labels: ["KGK", "Bağımsız Denetim", "UFRS", "Eğitim"],
        date: "25 Ocak 2026",
        slug: "kgk-bagimsiz-denetci"
    },
    {
        id: 19,
        title: "TÜRMOB Sürekli Mesleki Geliştirme Eğitimi (SYME) Yükümlülüğü",
        description: "Mali müşavirlerin mesleki bilgilerini güncel tutmaları için zorunlu olan sürekli eğitimler, belirli bir kredi puanının toplanmasını gerektirir.",
        content: "",
        labels: ["TÜRMOB", "Sürekli Eğitim", "SYME", "Mevzuat"],
        date: "24 Ocak 2026",
        slug: "turmob-syme-egitimi"
    },
    {
        id: 20,
        title: "YMM (Yeminli Mali Müşavirlik) Sınavlarına Hazırlık Süreci",
        description: "SMMM olarak 10 yılını tamamlayan meslek mensuplarının girebildiği YMM sınavları, mesleğin en zorlu ve prestijli aşamalarından biridir.",
        content: "",
        labels: ["YMM", "Vergi Denetimi", "Revizyon", "Kariyer"],
        date: "23 Ocak 2026",
        slug: "ymm-sinavlarina-hazirlik"
    },
    {
        id: 21,
        title: "Yeminli Mali Müşavirlik Sınavı ve SMMM’den Farkı",
        description: "Yeminli Mali Müşavirlik (YMM) sınavı, SMMM’den farklı olarak tasdik yetkisi odaklıdır ve sınav konuları ileri düzey maliyet muhasebesi, denetim teknikleri ile revizyon işlemlerini kapsar.",
        content: "",
        labels: ["YMM", "Sınav", "Kariyer", "Denetim"],
        date: "22 Ocak 2026",
        slug: "ymm-ve-smmm-farki"
    },
    {
        id: 22,
        title: "Mesleki Eğitimde Teknoloji Kullanımı ve Dijital Dönüşüm",
        description: "Mali müşavirlik eğitimlerinde teknoloji kullanımı artık bir seçenek değil, Excel ve muhasebe yazılımları üzerinden veri analizi yapabilme zorunluluğudur.",
        content: "",
        labels: ["Dijital Dönüşüm", "Teknoloji", "Eğitim", "Veri Analizi"],
        date: "21 Ocak 2026",
        slug: "mesleki-egitimde-teknoloji"
    },
    {
        id: 23,
        title: "KDV Beyannamesi Değişiklikleri ve e-Beyan Süreçleri",
        description: "KDV Beyannamesi, tebliğlerle sıkça güncellenen ve 2026 itibarıyla tecil-terkin gibi özel sürelerin takibini gerektiren en dinamik beyan türüdür.",
        content: "",
        labels: ["KDV", "Beyanname", "e-Beyan", "Mevzuat"],
        date: "20 Ocak 2026",
        slug: "kdv-beyannamesi-degisiklikleri"
    },
    {
        id: 24,
        title: "Ücret ve Yurt Dışı Gelirlerde Gelir Vergisi Beyanı",
        description: "Gelir Vergisi Beyannamesi, özellikle yıllık sınırı aşan ücret geliri elde edenler ve yurt dışı işverenlerden gelir sağlayan mükellefler için karmaşık bir beyan süreci içerir.",
        content: "",
        labels: ["Gelir Vergisi", "Ücret", "Yurt Dışı Gelir", "Beyanname"],
        date: "19 Ocak 2026",
        slug: "ucret-yurt-disi-gelir-beyani"
    },
    {
        id: 25,
        title: "Muhtasar ve Prim Hizmet Beyannamesi Entegrasyonu",
        description: "Muhtasar ve Prim Hizmet Beyannamesi (MPHB), vergi dairesi ve SGK verilerinin tek bir e-beyan üzerinden birleştirildiği, hata payı düşük olması gereken bir uygulamadır.",
        content: "",
        labels: ["Muhtasar", "SGK", "Prim Hizmet", "Beyanname"],
        date: "18 Ocak 2026",
        slug: "muhtasar-prim-hizmet-entegrasyonu"
    },
];

/**
 * Tüm makalelerden benzersiz etiketleri toplar (boş string hariç).
 */
export function getAllLabels(): string[] {
    const labelSet = new Set<string>();
    blogArticles.forEach((article) => {
        article.labels.forEach((label) => {
            if (label.trim()) labelSet.add(label.trim());
        });
    });
    return Array.from(labelSet).sort();
}

/**
 * Sadece dolu (title'ı olan) makaleleri döndürür.
 */
export function getPublishedArticles(): BlogArticle[] {
    return blogArticles.filter((a) => a.title.trim() !== "");
}
