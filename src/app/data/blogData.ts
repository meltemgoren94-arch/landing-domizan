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
    {
        id: 6,
        title: "Finansman Gider Kısıtlaması Hesaplama",
        description: "İşletmelerin kullandıkları yabancı kaynakların, öz kaynaklarını aşması durumunda aşan kısma isabet eden giderlerin %10'u vergi matrahından indirilemez.",
        content: `İşletmelerin kullandıkları yabancı kaynakların, öz kaynaklarını aşması durumunda aşan kısma isabet eden giderlerin %10'u vergi matrahından indirilemez. Bu uygulama, işletmeleri borçlanma yerine öz sermaye ile finansmana teşvik etmeyi amaçlayan bir vergi güvenlik müessesesidir.

Finansman gider kısıtlaması, özellikle yüksek borçluluğu olan firmalarda her geçici vergi döneminde detaylı bir bilanço analizi gerektirir. Domizan, bilgisayarınızda kayıtlı olan mizanları, bilanço dökümanlarını ve konuyla ilgili indirdiğiniz uygulama rehberlerini saniyeler içinde tarayarak kısıtlamaya tabi tutarları belirlemenize yardımcı olur. Ofis dışında, bir mükellef toplantısındayken akıllı telefonunuzdan Domizan’a ulaşıp, yerel arşivinizdeki o firmaya ait finansal dökümanlar üzerinden kısıtlama riskini sorgulayabilir ve mobilite sayesinde anında profesyonel görüş bildirebilirsiniz.`,
        labels: ["Finansman", "Gider Kısıtlaması", "Vergi", "Bilanço"],
        date: "06 Şubat 2026",
    },
    {
        id: 7,
        title: "Transfer Fiyatlandırması ve İlişkili Kişi İşlemleri",
        description: "İlişkili kişilerle yapılan mal veya hizmet alım-satım işlemlerinde fiyatın, 'emsallere uygunluk' ilkesine göre belirlenmesi zorunludur.",
        content: `İlişkili kişilerle yapılan mal veya hizmet alım-satım işlemlerinde fiyatın, "emsallere uygunluk" ilkesine göre belirlenmesi zorunludur. Emsalinden farklı bedelle yapılan işlemler, örtülü kazanç dağıtımı sayılarak cezalı tarhiyata neden olabilir.

Transfer fiyatlandırması raporları ve ilişkili kişi listeleri, mali müşavirlerin yerel disklerinde en çok yer tutan ve gizliliği en yüksek dökümanlar arasındadır. Domizan, bilgisayarınızdaki geçmiş yıl transfer fiyatlandırması raporlarını ve ilişkili şirketler arasındaki sözleşmeleri inceleyerek, emsal bedel tespitinde kullandığınız yöntemleri size hatırlatır. Dışarıdayken, Telegram üzerinden Domizan'a bağlanarak yerel arşivinizdeki emsal karşılaştırma notlarınıza ulaşabilir, verinizi dış dünyaya sızdırmadan kendi özel dökümanlarınızın gücüyle mobil analiz yapabilirsiniz.`,
        labels: ["Transfer Fiyatlandırması", "Vergi", "Emsal Bedel", "İlişkili Kişi"],
        date: "05 Şubat 2026",
    },
    {
        id: 8,
        title: "Vergi İncelemesi Süreci ve Uzlaşma Hakları",
        description: "Vergi incelemesi, mükelleflerin beyanlarının doğruluğunu araştırmak amacıyla müfettişler tarafından yürütülen yasal bir denetim sürecidir.",
        content: `Vergi incelemesi, mükelleflerin beyanlarının doğruluğunu araştırmak amacıyla müfettişler tarafından yürütülen yasal bir denetim sürecidir. İnceleme sonucunda ortaya çıkan tarhiyatlar için mükelleflerin uzlaşma veya ceza indirimi haklarını kullanma yetkisi bulunur.

İnceleme aşamasında en kritik nokta, geçmiş yıllara ait dökümanlara ve savunma dayanaklarına hızlı erişimdir. Domizan, bilgisayarınızdaki vergi inceleme tutanaklarını, savunma dilekçesi taslaklarını ve ilgili yıllara ait Resmi Gazete arşivlerini tarayarak size yasal dayanaklar sunar. İnceleme sürerken veya bir uzlaşma görüşmesi öncesinde yoldayken, Domizan’ın mobil erişimi sayesinde bilgisayarınızdaki o spesifik muktezayı veya dökümanı sorgulayıp savunmanızı mobiliteyle güçlendirebilirsiniz.`,
        labels: ["Vergi İncelemesi", "Uzlaşma", "Hukuk", "Denetim"],
        date: "04 Şubat 2026",
    },
    {
        id: 9,
        title: "Vergi Affı ve Yapılandırma Kanunları Uygulaması",
        description: "Türkiye'de belirli periyotlarla çıkarılan yapılandırma yasaları, kesinleşmiş borçların faizlerinin silinmesini ve taksitlendirilmesini sağlar.",
        content: `Türkiye'de belirli periyotlarla çıkarılan yapılandırma yasaları, kesinleşmiş borçların faizlerinin silinmesini ve taksitlendirilmesini sağlar. Matrah artırımı uygulamasıyla da mükellefler geçmiş yıllar için vergi incelemesinden muafiyet kazanabilirler.

Yapılandırma süreçlerinde hata yapmamak için yasanın uygulama tebliğlerini satır satır okumak gerekir. Domizan, bilgisayarınıza indirdiğiniz yapılandırma kılavuzlarını ve mükellefleriniz için hazırladığınız özel hesaplama tablolarını analiz ederek hangi mükellefin hangi kapsamda olduğunu size raporlar. Bir mükellefiniz sizi arayıp yapılandırma durumunu sorduğunda, bilgisayarınızda kayıtlı olan başvuru dilekçelerine ve ödeme tablolarına mobil üzerinden Domizan aracılığıyla erişip anında doğru bilgi verebilirsiniz.`,
        labels: ["Vergi Affı", "Yapılandırma", "Matrah Artırımı", "Mevzuat"],
        date: "03 Şubat 2026",
    },
    {
        id: 10,
        title: "Geçici Vergi Hesaplaması ve %10 Yanılma Payı",
        description: "Gerçek ve tüzel kişiler, cari yıl kazançları üzerinden üçer aylık dönemler itibarıyla geçici vergi öderler.",
        content: `Gerçek ve tüzel kişiler, cari yıl kazançları üzerinden üçer aylık dönemler itibarıyla geçici vergi öderler. Hesaplanan geçici verginin, asıl beyan edilmesi gereken tutardan %10’dan fazla eksik olması durumunda vergi ziyaı cezası uygulanır.

Geçici vergi dönemlerindeki yoğunlukta, her mükellefin özel durumuna dair notlara erişmek zaman alır. Domizan, bilgisayarınızdaki mizanları, amortisman tablolarını ve KKEG listelerini tarayarak yanılma payı riskini yönetmenize asistanlık yapar. Ofis dışında olduğunuz anlarda bile, yerel diskteki güncel mizan verilerine Domizan üzerinden mobil erişim sağlayarak geçici vergi matrahı üzerindeki riskli kalemleri sorgulayabilir ve zaman baskısını mobiliteyle yönetebilirsiniz.`,
        labels: ["Geçici Vergi", "Beyanname", "Vergi Cezası", "Muhasebe"],
        date: "02 Şubat 2026",
    },
    {
        id: 11,
        title: "Amortisman ve Yeniden Değerleme İşlemleri",
        description: "İşletme aktifindeki iktisadi kıymetlerin aşınma paylarını ifade eden amortismanlar, VUK md. 315 uyarınca faydalı ömürlerine göre hesaplanır.",
        content: `İşletme aktifindeki iktisadi kıymetlerin aşınma paylarını ifade eden amortismanlar, VUK md. 315 uyarınca faydalı ömürlerine göre hesaplanır. 2026 yılı itibarıyla, enflasyon düzeltmesi sonrası oluşan yeni değerler üzerinden amortisman ayırma süreci mali müşavirler için en kritik dönem sonu işlemlerindendir.

Domizan, bilgisayarınızda kayıtlı olan demirbaş listelerini, amortisman tablolarını ve Gelir İdaresi’nin yayımladığı güncel faydalı ömür listelerini saniyeler içinde tarayarak hangi kıymet için hangi oranın uygulanması gerektiğini size söyler. Saha denetiminde veya bir mükellef ziyaretinde, bilgisayarınızda bulunan o firmaya ait geçmiş amortisman kayıtlarına mobil üzerinden Telegram aracılığıyla ulaşıp, "Bu makinenin itfa süresi ne zaman doluyor?" gibi sorulara yerel dökümanlarınızın gücüyle anında cevap verebilirsiniz.`,
        labels: ["Amortisman", "Yeniden Değerleme", "Demirbaş", "Muhasebe"],
        date: "01 Şubat 2026",
    },
    {
        id: 12,
        title: "e-Fatura ve e-Arşiv Fatura Geçiş Zorunlulukları",
        description: "Gelir İdaresi Başkanlığı, dijitalleşme vizyonu doğrultusunda e-fatura ve e-arşiv fatura zorunluluk limitlerini her yıl aşağı çekmektedir.",
        content: `Gelir İdaresi Başkanlığı, dijitalleşme vizyonu doğrultusunda e-fatura ve e-arşiv fatura zorunluluk limitlerini her yıl aşağı çekmektedir. 2026 yılı için belirlenen ciro limitlerini aşan mükelleflerin belirlenen süre içinde bu sisteme dahil olmaları yasal bir zorunluluktur.

Domizan, yerel diskinizde bulunan mükellef mizanlarını ve önceki yıla ait ciro dökümlerini analiz ederek, hangi müşterilerinizin e-dönüşüm kapsamına girdiğini hızlıca tespit etmenize yardımcı olur. Ofis dışında olduğunuzda, bir müşterinizin "Biz e-faturaya geçmek zorunda mıyız?" sorusuna, bilgisayarınızda kayıtlı olan o mükellefin yıllık satış rakamlarını mobil üzerinden sorgulayarak, dökümanlarınızdaki kesin verilerle yanıt verebilirsiniz.`,
        labels: ["e-Fatura", "e-Arşiv", "e-Dönüşüm", "Mevzuat"],
        date: "31 Ocak 2026",
    },
    {
        id: 13,
        title: "İhbar ve Kıdem Tazminatı Hesaplama Esasları",
        description: "İş hukukunda personelin işten ayrılma sürecinde ödenen kıdem ve ihbar tazminatları, her 6 ayda bir güncellenen kıdem tazminatı tavanı ve personelin giydirilmiş brüt ücreti üzerinden hesaplanır.",
        content: `İş hukukunda personelin işten ayrılma sürecinde ödenen kıdem ve ihbar tazminatları, her 6 ayda bir güncellenen kıdem tazminatı tavanı ve personelin giydirilmiş brüt ücreti üzerinden hesaplanır. Bu hesaplamalarda yemek, yol ve diğer yan ödemelerin dahil edilip edilmeyeceği meslek mensupları arasında en çok tartışılan konulardandır.

Domizan, bilgisayarınızda tuttuğunuz personel özlük dosyalarını, ücret bordrosu taslaklarını ve kıdem tavanına ilişkin indirdiğiniz resmi yazıları tarayarak en karmaşık tazminat hesaplamalarında size rehberlik eder. Mobilite avantajı sayesinde, bir iş davası veya personel çıkış görüşmesi sırasında, bilgisayarınızda kayıtlı olan o çalışana ait güncel yan ödeme notlarına Telegram üzerinden erişip hatasız bir tazminat ön hesabı yapabilirsiniz.`,
        labels: ["Kıdem Tazminatı", "İhbar Tazminatı", "Bordro", "İş Hukuku"],
        date: "30 Ocak 2026",
    },
    {
        id: 14,
        title: "Serbest Meslek Makbuzu (e-SMM) ve Stopaj Uygulaması",
        description: "Serbest meslek erbaplarının tahsilat esaslı düzenlediği e-SMM, %20 stopaj ve %20 KDV tevkifatı gibi teknik detaylar içerir.",
        content: `Serbest meslek erbaplarının tahsilat esaslı düzenlediği e-SMM, %20 stopaj ve %20 KDV tevkifatı gibi teknik detaylar içerir. 2026 yılında mali müşavirlerin kendi makbuzlarını düzenlerken kullandıkları özel onaylı yazılımlar ve entegrasyon süreçleri operasyonel yükün bir parçasıdır.

Domizan, bilgisayarınızdaki geçmiş dönem makbuz dökümlerini, serbest meslek kazanç defteri kayıtlarını ve konuyla ilgili yerel mevzuat notlarınızı inceleyerek makbuz kesme süreçlerindeki hataları önler. Bir müşterinizde olduğunuz sırada, bilgisayarınızdaki arşivinizde kayıtlı olan eski bir makbuza veya bir muktezaya mobil üzerinden ulaşıp, stopaj oranındaki tereddütleri yerel verilerinizin doğruluğuyla yerinde giderebilirsiniz.`,
        labels: ["e-SMM", "Serbest Meslek", "Stopaj", "KDV"],
        date: "29 Ocak 2026",
    },
    {
        id: 15,
        title: "Şirket Kuruluşu ve Tür Değişikliği Süreçleri",
        description: "Limited şirketten anonim şirkete dönüşüm veya yeni bir şirket kuruluşu; ana sözleşme hazırlığı, ticaret sicil işlemleri ve vergi dairesi bildirimleri gibi çok aşamalı prosedürler içerir.",
        content: `Limited şirketten anonim şirkete dönüşüm veya yeni bir şirket kuruluşu; ana sözleşme hazırlığı, ticaret sicil işlemleri ve vergi dairesi bildirimleri gibi çok aşamalı prosedürler içerir. Her türün kendine has sermaye ve sorumluluk kuralları, meslek mensuplarının en çok danışmanlık verdiği alanlardır.

Domizan, yerel arşivinizde bulunan ana sözleşme taslaklarını, tür değişikliği raporlarını ve Ticaret Sicil Gazetesi nüshalarını tarayarak süreç takibinde asistanlık yapar. Bir yatırımcı ile görüşme halindeyken, bilgisayarınızda kayıtlı olan benzer bir şirketin kuruluş dosyasındaki detaylara mobil üzerinden erişebilir, prosedürleri ve gerekli belgeleri dökümanlarınızdaki gerçek örneklere dayanarak hızlıca paylaşabilirsiniz.`,
        labels: ["Şirket Kuruluşu", "Tür Değişikliği", "Ticaret Sicili", "Mevzuat"],
        date: "28 Ocak 2026",
    },
    {
        id: 16,
        title: "SMMM Staja Giriş Sınavı (SGS) Hazırlık ve Mevzuat Takibi",
        description: "SMMM olma yolundaki ilk adım olan SGS; finansal muhasebe, maliyet muhasebesi, vergi hukuku ve genel yetenek konularını kapsayan kapsamlı bir sınavdır.",
        content: `SMMM olma yolundaki ilk adım olan SGS; finansal muhasebe, maliyet muhasebesi, vergi hukuku ve genel yetenek konularını kapsayan kapsamlı bir sınavdır. Adayların binlerce sayfalık kanun metni ve çıkmış sorular arasında boğulmadan, güncel mevzuata uygun dökümanlarla çalışması başarıyı belirleyen en temel unsurdur.

Domizan, bilgisayarınızdaki geçmiş yıllara ait çıkmış sınav sorularını, ders notlarınızı ve konuyla ilgili PDF kitaplarını sizin için organize eder. Kütüphanenizde aradığınız bir terimi veya soruyu saniyeler içinde bulan Domizan, çalışma verimliliğinizi artırır. Mobilite sayesinde, kütüphanede veya dışarıda çalışırken bilgisayarınızda yüklü olan o kapsamlı "Vergi Hukuku" özetine Telegram üzerinden ulaşabilir, yerel dökümanlarınızdaki kritik bilgileri dilediğiniz her yerde tekrar edebilirsiniz.`,
        labels: ["SMMM", "SGS", "Staj", "Eğitim"],
        date: "27 Ocak 2026",
    },
    {
        id: 17,
        title: "SMMM Yeterlilik Sınavı Konuları ve Geçmiş Soru Analizleri",
        description: "Staj dönemini tamamlayan adayların girdiği yeterlilik sınavı; finansal raporlama, denetim, meslek hukuku ve maliyet muhasebesi gibi 7-8 ana branşta klasik usulde yapılır.",
        content: `Staj dönemini tamamlayan adayların girdiği yeterlilik sınavı; finansal raporlama, denetim, meslek hukuku ve maliyet muhasebesi gibi 7-8 ana branşta klasik usulde yapılır. Bu süreçte adayların kendi notları ve daha önce indirdikleri çözümlü örnekler üzerinden strateji geliştirmesi esastır.

Domizan, bilgisayarınızdaki branşlara göre ayrılmış dökümanları ve sınav komisyonunun geçmiş yıllardaki çözüm anahtarlarını tarayarak size rehberlik eder. Ofis dışında olduğunuz veya kısa bir mola verdiğiniz anlarda, bilgisayarınızda kayıtlı olan o zorlu "Konsolide Bilanço" çözümüne veya "Denetim Standartları" notunuza mobil üzerinden erişebilirsiniz. Domizan, yerel arşivinizdeki bilgiyi mobilitenin gücüyle birleştirerek sınav stresini yönetmenize asistanlık yapar.`,
        labels: ["SMMM Yeterlilik", "Finansal Raporlama", "Denetim", "Eğitim"],
        date: "26 Ocak 2026",
    },
    {
        id: 18,
        title: "KGK Bağımsız Denetçi Eğitimleri ve Yetkilendirme Süreçleri",
        description: "Kamu Gözetimi Kurumu (KGK) tarafından verilen bağımsız denetçi lisansı için gerekli olan eğitimler ve sınavlar, Uluslararası Finansal Raporlama Standartları (UFRS) ve Bağımsız Denetim Standartları (BDS) üzerine yoğunlaşır.",
        content: `Kamu Gözetimi Kurumu (KGK) tarafından verilen bağımsız denetçi lisansı için gerekli olan eğitimler ve sınavlar, Uluslararası Finansal Raporlama Standartları (UFRS) ve Bağımsız Denetim Standartları (BDS) üzerine yoğunlaşır. Meslek mensuplarının bu yoğun standart metinleri arasında aradığı bilgiye hızlıca ulaşması, yetkilendirme sürecini hızlandırır.

Domizan, bilgisayarınıza indirdiğiniz yüzlerce sayfalık Türkiye Denetim Standartları (TDS) metinlerini ve KGK eğitim materyallerini tarayarak spesifik bir standart hakkındaki bilgiyi saniyeler içinde karşınıza getirir. Mobil cihazınızdan Telegram aracılığıyla Domizan'a bağlanarak, bilgisayarınızda kayıtlı olan "Hasılat Standartları (TFRS 15)" veya "Stoklar (TMS 2)" hakkındaki özel notlarınıza ulaşıp sınav öncesi veya uygulama sırasında hızlıca bilgi tazeleyebilirsiniz.`,
        labels: ["KGK", "Bağımsız Denetim", "UFRS", "Eğitim"],
        date: "25 Ocak 2026",
    },
    {
        id: 19,
        title: "TÜRMOB Sürekli Mesleki Geliştirme Eğitimi (SYME) Yükümlülüğü",
        description: "Mali müşavirlerin mesleki bilgilerini güncel tutmaları için zorunlu olan sürekli eğitimler, belirli bir kredi puanının toplanmasını gerektirir.",
        content: `Mali müşavirlerin mesleki bilgilerini güncel tutmaları için zorunlu olan sürekli eğitimler, belirli bir kredi puanının toplanmasını gerektirir. Bu süreçte takip edilen eğitim dökümanlarının ve katılım belgelerinin arşivlenmesi, mesleki sicilin korunması açısından önemlidir.

Domizan, bilgisayarınızdaki eğitim katılım sertifikalarını, SYME ders dökümanlarını ve TÜRMOB tarafından yayımlanan eğitim takvimlerini düzenli bir şekilde takip etmenize yardımcı olur. Dışarıdayken kaç kredi eksiğinizin kaldığını veya bilgisayarınızda kayıtlı olan son eğitimin içeriğini merak ettiğinizde, mobil üzerinden Domizan'a sorarak dökümanlarınızdaki güncel duruma anında ulaşabilirsiniz.`,
        labels: ["TÜRMOB", "Sürekli Eğitim", "SYME", "Mevzuat"],
        date: "24 Ocak 2026",
    },
    {
        id: 20,
        title: "YMM (Yeminli Mali Müşavirlik) Sınavlarına Hazırlık Süreci",
        description: "SMMM olarak 10 yılını tamamlayan meslek mensuplarının girebildiği YMM sınavları, mesleğin en zorlu ve prestijli aşamalarından biridir.",
        content: `SMMM olarak 10 yılını tamamlayan meslek mensuplarının girebildiği YMM sınavları, mesleğin en zorlu ve prestijli aşamalarından biridir. İleri düzey vergi denetimi, revizyon ve yönetim muhasebesi konularında derinlemesine bilgi sahibi olmayı gerektiren bu süreçte, kişisel bilgi bankasının yönetimi hayati önem taşır.

Domizan, bilgisayarınızdaki geniş vergi kütüphanesini, önceki yıllara ait revizyon sınavı kağıtlarını ve yerel diskteki özel mukteza arşivinizi tarayarak YMM adaylarına asistanlık yapar. Sınav kampı döneminde veya yoğun çalışma temposunda, bilgisayarınızda bulunan o kapsamlı "Transfer Fiyatlandırması Revizyonu" örneğine mobil üzerinden erişebilir, yerel verilerinizin gizliliğini koruyarak her yerde ders çalışma özgürlüğüne sahip olabilirsiniz.`,
        labels: ["YMM", "Vergi Denetimi", "Revizyon", "Kariyer"],
        date: "23 Ocak 2026",
    },
    {
        id: 21,
        title: "Yeminli Mali Müşavirlik Sınavı ve SMMM’den Farkı",
        description: "Yeminli Mali Müşavirlik (YMM) sınavı, SMMM’den farklı olarak tasdik yetkisi odaklıdır ve sınav konuları ileri düzey maliyet muhasebesi, denetim teknikleri ile revizyon işlemlerini kapsar.",
        content: `Yeminli Mali Müşavirlik (YMM) sınavı, SMMM’den farklı olarak tasdik yetkisi odaklıdır ve sınav konuları ileri düzey maliyet muhasebesi, denetim teknikleri ile revizyon işlemlerini kapsar. 3568 sayılı Kanun çerçevesinde YMM adayları, sınavda sadece teknik bilgi değil, tam tasdik raporu hazırlama ve denetim etiği konularında da test edilirler.

YMM sınav süreci, mesleki kariyerin en üst basamağı olarak kabul edilir ve SMMM sınavlarından inceleme yetkisinin kapsamı yönüyle ayrılır. Domizan, bilgisayarınızda yüklü olan geçmiş yıllara ait YMM çıkmış sorularını ve revizyon ders notlarını tarayarak, sınav hazırlık sürecinde size özel bir kütüphane asistanı olur. Mobilite avantajıyla, ofisinizdeki bilgisayarda kayıtlı olan o kapsamlı "Vergi Uygulamaları" veya "Muhasebe Denetimi" standartlarına Telegram üzerinden anında ulaşabilir; dökümanlarınızdaki kritik bilgileri istediğiniz her yerde sınav hazırlığı için kullanabilirsiniz.`,
        labels: ["YMM", "Sınav", "Kariyer", "Denetim"],
        date: "22 Ocak 2026",
    },
    {
        id: 22,
        title: "Mesleki Eğitimde Teknoloji Kullanımı ve Dijital Dönüşüm",
        description: "Mali müşavirlik eğitimlerinde teknoloji kullanımı artık bir seçenek değil, Excel ve muhasebe yazılımları üzerinden veri analizi yapabilme zorunluluğudur.",
        content: `Mali müşavirlik eğitimlerinde teknoloji kullanımı artık bir seçenek değil, Excel ve muhasebe yazılımları üzerinden veri analizi yapabilme zorunluluğudur. 2026 yılı eğitim takvimleri, dijital dönüşüm ve e-dönüşüm ağırlıklı olup, meslek mensuplarının veriyi sadece kaydetmesini değil, analiz etmesini de hedeflemektedir.

Mesleki eğitimde dijitalleşme, özellikle karmaşık mevzuat metinlerinin yönetilmesinde teknolojik araçların kullanımını gerektirir. Domizan, bilgisayarınıza indirdiğiniz MUHEL programı eğitim materyalleri, ileri Excel rehberleri ve muhasebe yazılımı kullanım kılavuzlarını analiz ederek teknik gelişiminizde size asistanlık yapar. Dışarıdayken veya bir seminerdeyken, bilgisayarınızda kayıtlı olan o spesifik "Veri Analizi" dökümanına veya teknoloji notuna mobil üzerinden erişebilir, Domizan’ın sunduğu yerel veri gücüyle dijital yetkinliğinizi her an taze tutabilirsiniz.`,
        labels: ["Dijital Dönüşüm", "Teknoloji", "Eğitim", "Veri Analizi"],
        date: "21 Ocak 2026",
    },
    {
        id: 23,
        title: "KDV Beyannamesi Değişiklikleri ve e-Beyan Süreçleri",
        description: "KDV Beyannamesi, tebliğlerle sıkça güncellenen ve 2026 itibarıyla tecil-terkin gibi özel sürelerin takibini gerektiren en dinamik beyan türüdür.",
        content: `KDV Beyannamesi, tebliğlerle sıkça güncellenen ve 2026 itibarıyla tecil-terkin gibi özel sürelerin takibini gerektiren en dinamik beyan türüdür. e-Beyanname üzerinden gönderilen bu formlarda, yabancı paraların değerlemesi ve dahilde işleme izinleri gibi teknik detaylar hatalı işlem riskini artırmaktadır.

KDV Genel Uygulama Tebliği’ndeki değişiklikleri takip etmek, binlerce sayfa dökümanın taranmasını gerektirir. Domizan, bilgisayarınızdaki KDV tebliğ arşivini, özel sirkülerleri ve önceki aylara ait e-beyanname PDF’lerini tarayarak güncel kodlar ve matrah hesaplamaları konusunda size rehberlik eder. Mobilite odaklı yapısı sayesinde, ofis dışında bir mükellefinizle KDV iadesi veya istisnası konuşurken, bilgisayarınızda kayıtlı olan o son tebliğ değişikliğine Telegram üzerinden ulaşıp hatasız bilgi verebilirsiniz.`,
        labels: ["KDV", "Beyanname", "e-Beyan", "Mevzuat"],
        date: "20 Ocak 2026",
    },
    {
        id: 24,
        title: "Ücret ve Yurt Dışı Gelirlerde Gelir Vergisi Beyanı",
        description: "Gelir Vergisi Beyannamesi, özellikle yıllık sınırı aşan ücret geliri elde edenler ve yurt dışı işverenlerden gelir sağlayan mükellefler için karmaşık bir beyan süreci içerir.",
        content: `Gelir Vergisi Beyannamesi, özellikle yıllık sınırı aşan ücret geliri elde edenler ve yurt dışı işverenlerden gelir sağlayan mükellefler için karmaşık bir beyan süreci içerir. 2026 yılı yeniden değerleme oranları ile güncellenen dilimler, hangi gelirin beyan edileceğinin belirlenmesinde temel kriterdir.

GVK 67. ve 103. maddeleri kapsamındaki sınırları takip etmek için güncel mevzuat notlarına hızlı erişim şarttır. Domizan, yerel diskinizde sakladığınız gelir vergisi rehberlerini, ücret bordrosu analizlerini ve yurt dışı kazançlara ilişkin indirdiğiniz özel muktezaları sizin için tarar. Mobil erişim sayesinde, bir müşterinizin "Yurt dışı gelirim için beyanname vermeli miyim?" sorusuna, bilgisayarınızdaki o spesifik sınır tablosuna Telegram üzerinden bakarak anında ve döküman bazlı yanıt verebilirsiniz.`,
        labels: ["Gelir Vergisi", "Ücret", "Yurt Dışı Gelir", "Beyanname"],
        date: "19 Ocak 2026",
    },
    {
        id: 25,
        title: "Muhtasar ve Prim Hizmet Beyannamesi Entegrasyonu",
        description: "Muhtasar ve Prim Hizmet Beyannamesi (MPHB), vergi dairesi ve SGK verilerinin tek bir e-beyan üzerinden birleştirildiği, hata payı düşük olması gereken bir uygulamadır.",
        content: `Muhtasar ve Prim Hizmet Beyannamesi (MPHB), vergi dairesi ve SGK verilerinin tek bir e-beyan üzerinden birleştirildiği, hata payı düşük olması gereken bir uygulamadır. 2026 yılındaki güncellemelerle birlikte, SGK prim borçlarının mahsup süreçleri ve dijital onay mekanizmaları daha kritik hale gelmiştir.

MPHB süreçlerinde SGK genelgeleri ile vergi tebliğlerini aynı anda yönetmek zordur. Domizan, bilgisayarınızdaki SGK genelge arşivini, muhtasar beyanname düzenleme kılavuzlarını ve personel prim listelerini saniyeler içinde analiz eder. Saha ziyaretinde veya dışarıda bir toplantıda, bilgisayarınızda kayıtlı olan o mükellefin son prim hizmet detaylarına mobil üzerinden erişerek, mahsup işlemleri veya ceza riskleri hakkında yerel verilerinizle desteklenen kesin bilgiler sunabilirsiniz.`,
        labels: ["Muhtasar", "SGK", "Prim Hizmet", "Beyanname"],
        date: "18 Ocak 2026",
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
