# 10 - Uygulama Planı

## 📅 Zaman Çizelgesi Özeti

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        DOMİZAN v3 YOLCULUĞU                                 │
│                                                                             │
│  FAZ 1         FAZ 2           FAZ 3          FAZ 4         FAZ 5          │
│  Backend       Desktop         Telegram       Öğrenme       İyileştirme    │
│  Temeli        Entegrasyonu    Çoklu Kullanıcı Sistemi      ve Ölçekleme   │
│                                                                             │
│  ████████      ████████        ████████       ████████      ████████       │
│  Hafta 1-2     Hafta 3-4       Hafta 5-6      Hafta 7-8     Hafta 9-12      │
│                                                                             │
│  ──────────────────────────────────────────────────────────────────────────│
│  • API Proxy   • BackendClient • Kayıt akışı  • Correction  • Monitoring   │
│  • Token Log   • Offline Queue • Çoklu bildrim • Pattern    • Analytics    │
│  • Lisans API  • Kapsamlı Popup• Komutlar     • Dağıtım     • Optimizasyon │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Faz 1: Backend Temeli (Hafta 1-2)

### Hedef
API Proxy ve token takip sistemini kurmak.

### Görevler

| # | Görev | Öncelik | Tahmini Süre |
|---|-------|---------|--------------|
| 1.1 | Backend proje yapısı oluştur | 🔴 | 2 saat |
| 1.2 | Health endpoint | 🔴 | 1 saat |
| 1.3 | Lisans doğrulama middleware | 🔴 | 4 saat |
| 1.4 | `/ai/analyze` proxy endpoint | 🔴 | 4 saat |
| 1.5 | Gemini API entegrasyonu | 🔴 | 3 saat |
| 1.6 | Token sayma ve loglama | 🔴 | 4 saat |
| 1.7 | `/usage/my` endpoint | 🟡 | 2 saat |
| 1.8 | Kota kontrol sistemi | 🟡 | 3 saat |
| 1.9 | Rate limiting | 🟡 | 2 saat |
| 1.10 | Lisans CRUD API | 🟡 | 4 saat |

### Çıktılar
- [ ] Çalışan backend API (Node.js/Express veya Python/FastAPI)
- [ ] Token kullanım logları (JSONL)
- [ ] Lisans doğrulama sistemi
- [ ] Kota aşım koruması

### Test Kriterleri
```
✅ /health 200 döner
✅ Geçersiz lisansla 401 döner
✅ Belge analizi başarılı, token loglanır
✅ Kota aşıldığında 402 döner
```

---

## 🖥️ Faz 2: Desktop Entegrasyonu (Hafta 3-4)

### Hedef
Desktop uygulamasını backend'e bağlamak ve kapsamlı popup geliştirmek.

### Görevler

| # | Görev | Öncelik | Tahmini Süre |
|---|-------|---------|--------------|
| 2.1 | `backend-client.js` modülü | 🔴 | 4 saat |
| 2.2 | Lokal Gemini çağrısını kaldır | 🔴 | 2 saat |
| 2.3 | `offline-queue.js` modülü | 🔴 | 4 saat |
| 2.4 | `connection-manager.js` | 🟡 | 3 saat |
| 2.5 | Kapsamlı popup UI tasarımı | 🔴 | 6 saat |
| 2.6 | Popup'ta tüm alanlar düzenlenebilir | 🔴 | 8 saat |
| 2.7 | Düzeltme kaydı gönderimi | 🔴 | 3 saat |
| 2.8 | Pattern cache sistemi | 🟡 | 4 saat |
| 2.9 | Cihaz kaydı / tek cihaz kontrolü | 🟡 | 3 saat |
| 2.10 | Kullanım bilgisi gösterimi | 🟢 | 2 saat |

### Çıktılar
- [ ] Desktop → Backend entegrasyonu tam
- [ ] Kapsamlı doğrulama popup'ı
- [ ] Offline kuyruk sistemi
- [ ] Düzeltme kaydı akışı

### Popup Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│  📄 Yeni Belge Doğrulama                             [X]        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────────────────────────┐  │
│  │                 │  │ BELGE BİLGİLERİ                     │  │
│  │    [PDF]        │  │                                      │  │
│  │   ÖNİZLEME      │  │ Tür: [Banka Dekontu ▼]              │  │
│  │                 │  │                                      │  │
│  │                 │  │ Kaynak: Garanti Bankası              │  │
│  │                 │  │                                      │  │
│  └─────────────────┘  │ Güven: ████████░░ 85%               │  │
│                       └─────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ TARİHLER                                                 │   │
│  │                                                          │   │
│  │ İşlem Tarihi:    [12.01.2026 📅]                         │   │
│  │ Valör Tarihi:    [12.01.2026 📅]                         │   │
│  │                                                          │   │
│  │ 📂 DOSYALAMA:    [Ocak 2026 ▼] ← AI'ın önerisi          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ KİMLİKLER                                                │   │
│  │ ┌─────────────────────────────────────────────────────┐ │   │
│  │ │ VKN: 1234567890 │ HESAP_SAHIBI │ [✅ Eşleşti]       │ │   │
│  │ ├─────────────────────────────────────────────────────┤ │   │
│  │ │ VKN: 9876543210 │ KARŞI_TARAF  │ [DB'de yok]        │ │   │
│  │ └─────────────────────────────────────────────────────┘ │   │
│  │                                                          │   │
│  │ MÜKELLEF: [ABC LTD ŞTİ (1234567890) ▼]                  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ TUTAR ve DETAYLAR                                        │   │
│  │                                                          │   │
│  │ Tutar: [₺5.000,00   ]  Açıklama: [Kira ödemesi      ]   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ HEDEF KLASÖR                                             │   │
│  │                                                          │   │
│  │ 📁 Domizan/Müşteriler/ABC LTD (1234567890)/             │   │
│  │    04-Banka/Dekontlar/2026/01-Ocak/                     │   │
│  │                                          [📂 Değiştir]  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ZENGİNLEŞTİRME (opsiyonel)                               │   │
│  │                                                          │   │
│  │ ☐ Eksik telefon ekle: 0312 123 45 67                     │   │
│  │ ☐ Eksik email ekle: info@abc.com                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ═══════════════════════════════════════════════════════════   │
│                                                                 │
│         [❌ İptal]                    [✅ Onayla ve Taşı]       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📱 Faz 3: Telegram Çoklu Kullanıcı (Hafta 5-6)

### Hedef
Birden fazla kullanıcının Telegram'dan erişimini sağlamak.

### Görevler

| # | Görev | Öncelik | Tahmini Süre |
|---|-------|---------|--------------|
| 3.1 | Telegram bot webhook kurulumu | 🔴 | 3 saat |
| 3.2 | `/kayit` komutu ve kod doğrulama | 🔴 | 4 saat |
| 3.3 | Kullanıcı-lisans bağlama | 🔴 | 3 saat |
| 3.4 | Çoklu kullanıcıya bildirim gönderimi | 🔴 | 4 saat |
| 3.5 | Onay/Red callback butonları | 🔴 | 4 saat |
| 3.6 | Desktop'a SSE ile bildirim | 🔴 | 4 saat |
| 3.7 | Telegram komutları (/bekleyen, /kota) | 🟡 | 4 saat |
| 3.8 | Desktop'ta kullanıcı yönetim UI | 🟡 | 4 saat |
| 3.9 | Rolbasert yetkilendirme | 🟡 | 3 saat |

### Çıktılar
- [ ] Telegram bot çoklu kullanıcı desteği
- [ ] Kayıt kodu sistemi
- [ ] Tüm yetkilere bildirim
- [ ] Telegram'dan onay/red

---

## 🧠 Faz 4: Öğrenme Sistemi (Hafta 7-8)

### Hedef
Federatif öğrenme altyapısını kurmak.

### Görevler

| # | Görev | Öncelik | Tahmini Süre |
|---|-------|---------|--------------|
| 4.1 | `/learning/correction` endpoint | 🔴 | 3 saat |
| 4.2 | Correction database yapısı | 🔴 | 2 saat |
| 4.3 | Düzeltme gruplandırma algoritması | 🔴 | 6 saat |
| 4.4 | Pattern oluşturma engine | 🔴 | 8 saat |
| 4.5 | `/learning/patterns` endpoint | 🟡 | 2 saat |
| 4.6 | Desktop pattern sync | 🟡 | 3 saat |
| 4.7 | Prompt'a pattern hint ekleme | 🟡 | 4 saat |
| 4.8 | Pattern feedback sistemi | 🟢 | 4 saat |

### Çıktılar
- [ ] Düzeltme toplama ve saklama
- [ ] Otomatik pattern oluşturma
- [ ] Pattern dağıtımı
- [ ] AI prompt zenginleştirme

---

## 📊 Faz 5: İyileştirme ve Ölçekleme (Hafta 9-12)

### Hedef
Sistemi production-ready hale getirmek.

### Görevler

| # | Görev | Öncelik | Tahmini Süre |
|---|-------|---------|--------------|
| 5.1 | Monitoring ve alerting | 🟡 | 6 saat |
| 5.2 | Admin dashboard | 🟡 | 12 saat |
| 5.3 | Performans optimizasyonu | 🟡 | 8 saat |
| 5.4 | Hata loglama ve raporlama | 🟡 | 4 saat |
| 5.5 | Kullanıcı analytics | 🟢 | 6 saat |
| 5.6 | Load testing | 🟢 | 4 saat |
| 5.7 | Dokümantasyon son hali | 🟢 | 4 saat |
| 5.8 | Beta test koordinasyonu | 🟢 | 8 saat |

---

## ✅ Başarı Kriterleri

### Faz 1 Sonunda
- [ ] Backend 99.9% uptime
- [ ] Token logları eksiksiz
- [ ] Kota sistemi çalışıyor

### Faz 2 Sonunda
- [ ] Offline mod sorunsuz çalışıyor
- [ ] Popup'ta tüm düzeltmeler yapılabiliyor
- [ ] Düzeltmeler backend'e kaydediliyor

### Faz 3 Sonunda
- [ ] 3 farklı kullanıcı aynı lisansı kullanabiliyor
- [ ] Telegram'dan onay çalışıyor
- [ ] Bildirimler tüm yetkililere gidiyor

### Faz 4 Sonunda
- [ ] İlk pattern'lar oluşuyor
- [ ] Pattern'lar AI sonuçlarını iyileştiriyor
- [ ] Düzeltme oranı ilk haftaya göre %30 azalmış

### Faz 5 Sonunda
- [ ] 10+ müşteri production'da
- [ ] Sistem 1000+ belge/gün işleyebiliyor
- [ ] Ortalama hata oranı < %5

---

## 🛠️ Teknoloji Stack

### Backend
- **Runtime:** Node.js 20 veya Python 3.11
- **Framework:** Express.js veya FastAPI
- **Database:** SQLite (başlangıç) → PostgreSQL (scale)
- **Cache:** Redis (opsiyonel)
- **Hosting:** Railway / Render / VPS

### Desktop
- **Framework:** Electron 28+
- **UI:** React 18+
- **State:** Zustand veya Redux
- **Build:** electron-builder

### Telegram
- **Library:** node-telegram-bot-api veya python-telegram-bot
- **Webhook:** HTTPS required

---

## 📞 Destek ve İletişim

Her faz sonunda:
1. Demo/review toplantısı
2. Geri bildirim toplama
3. Sonraki faz planı güncelleme

---

## 🎯 Öncelik Matrisi

```
                    YÜKSEK ETKİ
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         │   ÖNCE YAP    │   HEMEN YAP   │
         │   (Planlı)    │   (Kritik)    │
         │               │               │
         │ • Öğrenme     │ • Backend API │
DÜŞÜK ───┼───────────────┼───────────────┼─── YÜKSEK
ACELE    │               │               │    ACELE
         │   SONRA YAP   │   DELEGe ET   │
         │   (Nice-have) │   (Opsiyonel) │
         │               │               │
         │ • Admin panel │ • Analytics   │
         │ • Monitoring  │ • Load test   │
         │               │               │
         └───────────────┼───────────────┘
                         │
                    DÜŞÜK ETKİ
```
