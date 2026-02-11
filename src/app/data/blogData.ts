export interface BlogArticle {
    id: number;
    title: string;
    description: string;
    content: string;
    labels: string[];
    date: string;
}

export const blogArticles: BlogArticle[] = [
    {
        id: 1,
        title: "KDV İndirimi ve İstisnaları Uygulaması",
        description: "KDV indirim hakkı, mal veya hizmetin fatura karşılığında teslim alınmasıyla doğar ve ilgili takvim yılını takip eden yılın sonuna kadar kullanılabilir.",
        content: `KDV indirim hakkı, mal veya hizmetin fatura karşılığında teslim alınmasıyla doğar ve ilgili takvim yılını takip eden yılın sonuna kadar kullanılabilir. İhracat ve eğitim gibi tam istisnalarda yüklenilen KDV iade alınabilirken, kısmi istisnalarda indirim yasağına dikkat edilmelidir.

KDV Kanunu'nun 29. maddesi uyarınca indirim süreci, mükellefin belgelerini yasal defterlere süresinde kaydetmesine bağlıdır. Domizan, bilgisayarınıza indirdiğiniz Resmi Gazete nüshaları veya özel sirkülerler arasında akıllı arama yaparak, belirli bir sektöre ait KDV istisnasının güncel detaylarını saniyeler içinde bulup çıkarır. Özellikle ofis dışındayken, yerel arşivinizdeki binlerce sayfa döküman arasından ilgili maddeyi bulmak yerine, Telegram üzerinden Domizan'a sormanız yeterlidir; o, sizin dökümanlarınızı tarayarak doğru yanıtı mobil cihazınıza getirir.`,
        labels: ["Vergi", "KDV", "İstisna", "Mevzuat"],
        date: "11 Şubat 2026",
    },
    {
        id: 2,
        title: "Enflasyon Muhasebesi ve Vergi Etkisi",
        description: "2024 yılında hayatımıza giren ve 2026'da devam eden enflasyon düzeltmesi, parasal olmayan kıymetlerin satın alma gücündeki değişime göre güncellenmesidir.",
        content: `2024 yılında hayatımıza giren ve 2026'da devam eden enflasyon düzeltmesi, parasal olmayan kıymetlerin satın alma gücündeki değişime göre güncellenmesidir. Bu işlem sonucunda oluşan farklar doğrudan vergi matrahını etkilemekte, bazı işletmelerde ek vergi yükü yaratırken bazılarında vergi avantajı sağlamaktadır.

VUK Geçici 33. madde çerçevesinde uygulanan bu süreç, teknik dökümanların ve tebliğlerin sıkça taranmasını gerektirir. Domizan, bilgisayarınızdaki enflasyon muhasebesi çalışma notlarını, uygulama tebliğlerini ve Excel tablolarınızdaki verileri analiz ederek size rehberlik eder. Dış dünyada, örneğin bir müşteri ziyaretindeyken, bilgisayarınızda kayıtlı olan "enflasyon düzeltme farkları" ile ilgili özel bir notunuza veya indirdiğiniz bir rehbere mobil üzerinden anında ulaşıp karmaşık soruları yanıtlayabilirsiniz.`,
        labels: ["Muhasebe", "Enflasyon", "VUK", "Vergi"],
        date: "10 Şubat 2026",
    },
    {
        id: 3,
        title: "Kurumlar Vergisi İstisnaları ve Teşvikler",
        description: "Kurumlar vergisi mükellefleri; iştirak kazançları, taşınmaz satış kazancı, Ar-Ge indirimleri ve yatırım teşvik belgeli harcamalar üzerinden ciddi vergi indirimlerinden yararlanabilirler.",
        content: `Kurumlar vergisi mükellefleri; iştirak kazançları, taşınmaz satış kazancı, Ar-Ge indirimleri ve yatırım teşvik belgeli harcamalar üzerinden ciddi vergi indirimlerinden yararlanabilirler. Ayrıca genç girişimci istisnası gibi uygulamalar, yeni kurulan işletmeler için 3 yıl boyunca önemli bir kazanç muafiyeti sağlar.

Kurumlar Vergisi Kanunu 5. ve 10. maddeleri kapsamındaki teşvikler, genellikle her mükellef için farklı dökümanlarda (Yatırım Teşvik Belgeleri, Ar-Ge Merkezi Raporları vb.) saklanır. Domizan, kendi yerel klasörlerinizde tuttuğunuz bu özel teşvik belgelerini ve raporları okuyarak, hangi mükellefin ne kadar indirim hakkı kaldığını veya hangi şartlara tabi olduğunu sizin için özetler. Mobilite avantajı sayesinde, ofisinizdeki bilgisayarda kayıtlı olan bu özel belgelere dışarıdayken Telegram üzerinden erişip kritik bilgileri sorgulayabilirsiniz.`,
        labels: ["Kurumlar Vergisi", "Teşvik", "Ar-Ge", "Girişimcilik"],
        date: "09 Şubat 2026",
    },
    {
        id: 4,
        title: "Gelir Vergisi Dilimleri ve Ücret Bordrosu Stopajı",
        description: "Ücretliler ve şahıs işletmeleri için uygulanan gelir vergisi tarifesi, her yıl yeniden değerleme oranında güncellenerek artan oranlı bir yapıda tahsil edilir.",
        content: `Ücretliler ve şahıs işletmeleri için uygulanan gelir vergisi tarifesi, her yıl yeniden değerleme oranında güncellenerek artan oranlı bir yapıda tahsil edilir. İşverenler, çalışanlarına ödedikleri ücretler üzerinden gelir vergisi stopajı yaparak muhtasar beyanname ile vergi dairesine ödemekle yükümlüdür.

Her yıl güncellenen gelir vergisi dilimleri, mali müşavirlerin arşivlediği tebliğlerde yer alır. Domizan, bilgisayarınızdaki 2026 yılına ait güncel vergi tarifesi dökümanlarını veya bordro uygulama esaslarını içeren PDF'leri tarayarak size net bilgi verir. Bir çalışanınızın veya müşterinizin vergi dilimi sorusuna, bilgisayarınızda kayıtlı olan resmi belgeleri temel alarak, mobil üzerinden saniyeler içinde ve hata payı sıfır olacak şekilde yanıt verebilirsiniz.`,
        labels: ["Gelir Vergisi", "Bordro", "Stopaj", "Mevzuat"],
        date: "08 Şubat 2026",
    },
    {
        id: 5,
        title: "Şüpheli ve Değersiz Alacakların Muhasebeleştirilmesi",
        description: "Tahsil edilemeyen veya tahsili şüpheli hale gelen alacaklar için dava veya icra takibi başlatılması şartıyla karşılık ayrılabilir ve bu tutar gider olarak kaydedilebilir.",
        content: `Tahsil edilemeyen veya tahsili şüpheli hale gelen alacaklar için dava veya icra takibi başlatılması şartıyla karşılık ayrılabilir ve bu tutar gider olarak kaydedilebilir. 2026 yılı için belirlenen küçük alacak sınırı dahilindeki alacaklar için ise dava açma şartı aranmaksızın doğrudan karşılık ayrılması mümkündür.

VUK 323. madde kapsamındaki şüpheli alacak süreçleri, genellikle avukat yazışmaları veya icra takip dökümanları ile belgelenir. Domizan, kullanıcının bilgisayarında bulunan icra dosyalarını, dava dilekçelerini veya konuyla ilgili indirilmiş özel muktezaları inceleyerek, hangi alacak için karşılık ayrılabileceğine dair döküman bazlı kanıtlar sunar. Mobil cihazınızdan Domizan'a eriştiğinizde, yerel arşivinizdeki bu hukuki dökümanların durumunu sorgulayabilir ve sahadayken dahi karar verme sürecinizi hızlandırabilirsiniz.`,
        labels: ["Muhasebe", "Alacaklar", "VUK", "Hukuk"],
        date: "07 Şubat 2026",
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
