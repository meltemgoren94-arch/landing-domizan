# Domizan Dokümantasyon

Mali Müşavirler için AI destekli belge yönetim platformu.

---

## İçindekiler

1. [Hızlı Başlangıç](#hızlı-başlangıç)
2. [Panel Genel Bakış](#panel-genel-bakış)
3. [Günlük Kullanım](#günlük-kullanım)
4. [Mükellef Yönetimi](#mükellef-yönetimi)
5. [Raporlama](#raporlama)
6. [Sık Sorulan Sorular](#sık-sorulan-sorular)

---

## Hızlı Başlangıç

### Kurulum Adımları

[VIDEO: Uygulama Kurulum Rehberi]

**1. Domizan'ı İndirin**
Resmi web sitesinden işletim sisteminize uygun versiyonu indirin.

**2. Lisans Anahtarınızı Girin**
Size e-posta ile gönderilen lisans anahtarını giriş ekranına yapıştırın.

**3. Gelen Kutusu Klasörünü Belirleyin**
Evrakların bırakılacağı ortak klasörü seçin (örn: `\\SUNUCU\GelenKutusu`).

**4. Mükellef Listenizi Aktarın**
Mevcut mükellef listenizi Excel veya JSON formatında içe aktarın.

[IMAGE: Kurulum Ekranı]

> **İpucu:** Ağ sürücüsü kullanıyorsanız, Domizan'ın kurulu olduğu bilgisayarın her zaman açık olduğundan emin olun.

---

## Panel Genel Bakış

[IMAGE: Panel Genel Bakış]

### Ana Ekran Bileşenleri

| Alan | Açıklama |
|------|----------|
| **Gelen Kutusu** | Yeni eklenen ve işlem bekleyen belgeler |
| **Son İşlemler** | Son taşınan dosyaların listesi |
| **Kota Durumu** | Aylık token kullanımınız |
| **Hızlı Erişim** | Sık kullanılan mükellef klasörleri |

### Durum Göstergeleri

- 🟢 **Çevrimiçi** - Sistem normal çalışıyor
- 🟡 **Senkronize Ediliyor** - Bekleyen işlemler işleniyor
- 🔴 **Çevrimdışı** - İnternet bağlantısı yok (belgeler kuyruğa alınır)

---

## Günlük Kullanım

### Belge Yükleme

[VIDEO: Belge Yükleme ve Onaylama]

**Adım 1: Belgeyi Gelen Kutusuna Bırakın**
PDF, JPG, PNG veya Excel dosyasını sürükleyip gelen kutusu klasörüne bırakın.

**Adım 2: AI Analiz Eder**
Domizan belgeyi otomatik olarak analiz eder:
- Belge türünü tanır (fatura, dekont, beyanname vb.)
- VKN/TC numarası çıkarır
- Tarihleri ve tutarları tespit eder

**Adım 3: Doğrulama Popup'ı**

[IMAGE: Doğrulama Popup Ekranı]

Popup'ta şunları göreceksiniz:
- **Belge Türü** - AI'ın tespit ettiği belge tipi
- **Mükellef** - VKN/TC ile eşleşen firma
- **Dosyalama Tarihi** - Belgenin hangi aya ait olduğu
- **Hedef Klasör** - Dosyanın taşınacağı yer
- **Güven Skoru** - AI'ın analizden ne kadar emin olduğu (%)

**Adım 4: Onaylayın veya Düzeltin**
- ✅ **Onayla** - Belge otomatik olarak hedef klasöre taşınır
- ✏️ **Düzelt** - Herhangi bir alanı değiştirin, sonra onaylayın

> **Not:** Yaptığınız düzeltmeler sisteme öğretilir. Aynı tip belgeler için bir daha aynı hatayı yapmaz.

---

## Mükellef Yönetimi

### Yeni Mükellef Ekleme

1. Ana panelden **"Mükellef Ekle"** butonuna tıklayın
2. Firma bilgilerini girin:
   - Firma Adı
   - VKN veya TC Kimlik No
   - Vergi Dairesi
   - İletişim Bilgileri (opsiyonel)
3. **"Kaydet"** butonuna tıklayın

### Toplu Mükellef Aktarımı

Excel dosyanız şu sütunları içermelidir:

| Sütun | Zorunlu | Açıklama |
|-------|---------|----------|
| firma_adi | ✅ | Firma veya kişi adı |
| vergi_no | ⚠️ | VKN (10 hane) - birinden biri zorunlu |
| tc_no | ⚠️ | TC Kimlik No (11 hane) - birinden biri zorunlu |
| vergi_dairesi | ❌ | Bağlı olduğu vergi dairesi |
| telefon | ❌ | İletişim numarası |
| email | ❌ | E-posta adresi |

---

## Raporlama

### Token Kullanım Raporu

[IMAGE: Token Kullanım Grafiği]

**Token Nedir?**
Domizan, belge analizi için yapay zeka tokenleri kullanır. Her belge işlemi bir miktar token harcar.

**Ortalama Tüketim:**
- Standart belge: ~5.000 token
- Karmaşık beyanname: ~8.000 token

**Kota Takibi:**
Panel üzerinden anlık olarak şunları görebilirsiniz:
- Bu ay kullanılan token miktarı
- Kalan token hakkınız
- Tahmini belge kapasitesi

### İşlem Geçmişi

Tüm taşınan belgeler loglanır:
- Kaynak dosya adı
- Hedef klasör
- İşlem tarihi
- Mükellef bilgisi
- AI güven skoru
- Yapılan düzeltmeler (varsa)

---

## Sık Sorulan Sorular

### Genel

**S: İnternet kesilirse ne olur?**
C: Belgeler yerel kuyruğa alınır. İnternet bağlantısı geldiğinde otomatik olarak işlenir.

**S: Verilerim nerede saklanıyor?**
C: Tüm belgeleriniz kendi bilgisayarınızda kalır. Sunucuya yalnızca belge metni gönderilir, dosya kendisi yüklenmez.

**S: Aynı lisansı birden fazla kişi kullanabilir mi?**
C: Domizan sadece 1 bilgisayarda çalışır. Ancak ortak ağ klasörüne tüm ofis çalışanları dosya bırakabilir.

### Teknik

**S: Hangi dosya formatları destekleniyor?**
C: PDF, JPG, PNG ve Excel (.xlsx) dosyaları desteklenmektedir.

**S: Maksimum dosya boyutu nedir?**
C: Tek dosya için 50 MB limit uygulanmaktadır.

**S: Sistem gereksinimleri nelerdir?**
C: Windows 10/11 veya macOS 12+, minimum 4 GB RAM, 1 Mbps internet bağlantısı.

---

## Destek

Sorularınız için:
- 📧 destek@domizan.com
- 📞 0850 123 45 67
- 💬 Uygulama içi destek butonu

---

*Son güncelleme: Şubat 2026*
