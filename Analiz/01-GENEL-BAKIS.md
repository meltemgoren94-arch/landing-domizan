# 01 - Genel Bakış

## 🎯 Vizyon

Domizan v3, mali müşavirlik ofislerinin belge yönetimini tamamen otomatize eden akıllı bir sistemdir.

**Hedef:** Herhangi bir kaynaktan gelen herhangi bir belgeyi %100 doğrulukla anlayıp doğru yere taşımak.

---

## 🏢 Kullanım Senaryosu

```
┌─────────────────────────────────────────────────────────────────┐
│                    MALİ MÜŞAVİRLİK OFİSİ                        │
│                                                                 │
│   ┌─────────┐   ┌─────────┐   ┌─────────┐                      │
│   │   PC1   │   │   PC2   │   │   PC3   │                      │
│   │ Ayşe    │   │ Mehmet  │   │ Zeynep  │                      │
│   └────┬────┘   └────┬────┘   └────┬────┘                      │
│        │             │             │                            │
│        └─────────────┼─────────────┘                            │
│                      │                                          │
│                      ▼                                          │
│        ┌─────────────────────────┐                              │
│        │   PAYLAŞIMLI KLASÖR     │                              │
│        │   \\server\GelenKutusu  │                              │
│        │   (Ortak Ağ Sürücüsü)   │                              │
│        └───────────┬─────────────┘                              │
│                    │                                            │
│                    ▼                                            │
│        ┌─────────────────────────┐                              │
│        │   DOMIZAN DESKTOP       │                              │
│        │   (Ana Bilgisayar)      │                              │
│        │   Tek Lisans            │                              │
│        └───────────┬─────────────┘                              │
│                    │                                            │
└────────────────────┼────────────────────────────────────────────┘
                     │
                     ▼ HTTPS
┌─────────────────────────────────────────────────────────────────┐
│                    DOMIZAN BACKEND                              │
│   - AI Analiz (Gemini Proxy)                                    │
│   - Token Takibi                                                │
│   - Federatif Öğrenme                                           │
│   - Telegram Bot                                                │
└─────────────────────────────────────────────────────────────────┘
```

---

## 👥 Kullanıcı Rolleri

| Rol | Açıklama | Yetkiler |
|-----|----------|----------|
| **Lisans Sahibi** | Ofis sahibi/yöneticisi | Tüm ayarlar, kullanıcı yönetimi |
| **Operatör** | Ofis çalışanı | Belge onaylama, Telegram erişimi |
| **İzleyici** | Stajyer/yardımcı | Sadece görüntüleme |

---

## 📦 Paket Tipleri

| Paket | Token/Ay | Kullanıcı | Telegram | Fiyat/Ay |
|-------|----------|-----------|----------|----------|
| BASIC | 50.000 | 1 | ❌ | ₺99 |
| PREMIUM | 500.000 | 3 | ✅ | ₺299 |
| ENTERPRISE | ∞ | 10 | ✅ | ₺999 |

**Token ≈ Belge Dönüşümü:**
- Ortalama belge: ~3.000 token
- BASIC: ~16 belge/gün
- PREMIUM: ~160 belge/gün

---

## 🔄 Temel Akış

```
1. DOSYA GELİR
   └─→ Kullanıcı belgeyi GelenKutusu'na bırakır

2. ALGILAMA
   └─→ Domizan Desktop dosyayı algılar (chokidar)

3. ANALİZ
   └─→ Backend'e gönderilir → Gemini analiz eder
   └─→ Öğrenme DB kontrol edilir (benzer pattern var mı?)

4. DOĞRULAMA
   └─→ Popup gösterilir (tüm bilgiler düzenlenebilir)
   └─→ Kullanıcı onaylar veya düzeltir

5. ÖĞRENME
   └─→ Düzeltme varsa backend'e kaydedilir
   └─→ Pattern oluşturulur (10+ düzeltme sonrası)

6. TAŞIMA
   └─→ Dosya doğru klasöre taşınır
   └─→ Log kaydedilir

7. BİLDİRİM (Opsiyonel)
   └─→ Telegram'dan bildirim gider
```

---

## 🌐 Ağ Gereksinimleri

| Senaryo | Minimum | Önerilen | Davranış |
|---------|---------|----------|----------|
| Normal | 1 Mbps | 5 Mbps | Anlık analiz |
| Yavaş | 256 Kbps | 1 Mbps | Kuyrukta bekler |
| Offline | - | - | Yerel kuyruk, sonra sync |

---

## 🔐 Güvenlik Prensipleri

1. **Veri Yerelde Kalır:** Belgeler backend'e yüklenmez, sadece metin içeriği
2. **Anonim Öğrenme:** VKN, TC, firma adı gibi bilgiler paylaşılmaz
3. **Şifreli İletişim:** Tüm API çağrıları HTTPS
4. **Lisans Doğrulama:** Her istek license key ile doğrulanır
