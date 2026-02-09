# Domizan v3 - Nihai Mimari Dokümantasyonu

**Versiyon:** 3.0  
**Tarih:** 2026-02-05  
**Durum:** Tasarım Aşaması

---

## 📚 Dokümantasyon İçeriği

Bu klasör Domizan v3'ün tam mimari dokümantasyonunu içerir.

| Dosya | Açıklama |
|-------|----------|
| [01-GENEL-BAKIS.md](./01-GENEL-BAKIS.md) | Sistem genel görünümü ve temel kavramlar |
| [02-SISTEM-MIMARISI.md](./02-SISTEM-MIMARISI.md) | Teknik mimari, bileşenler, veri akışı |
| [03-TOKEN-YONETIMI.md](./03-TOKEN-YONETIMI.md) | Token maliyeti, loglama, kota yönetimi |
| [04-COK-KULLANICI.md](./04-COK-KULLANICI.md) | Çoklu kullanıcı, paylaşımlı inbox, lisans |
| [05-TELEGRAM-ERISIM.md](./05-TELEGRAM-ERISIM.md) | Telegram bot çoklu kullanıcı erişimi |
| [06-OGRENME-SISTEMI.md](./06-OGRENME-SISTEMI.md) | Federatif öğrenme mimarisi |
| [07-OFFLINE-MOD.md](./07-OFFLINE-MOD.md) | Zayıf internet, offline çalışma |
| [08-VERI-MODELLERI.md](./08-VERI-MODELLERI.md) | Tüm JSON şemaları ve veri yapıları |
| [09-API-REFERANS.md](./09-API-REFERANS.md) | Backend API endpoint dokümantasyonu |
| [10-UYGULAMA-PLANI.md](./10-UYGULAMA-PLANI.md) | Fazlar ve zaman çizelgesi |

---

## 🎯 Temel Kararlar

1. **Tek API Key Modeli:** Tüm müşteriler senin Gemini key'ini kullanır
2. **Federatif Öğrenme:** Düzeltmeler anonim olarak paylaşılır
3. **Çoklu Kullanıcı:** Tek lisans, birden fazla kullanıcı (ofis ortamı)
4. **Paylaşımlı Inbox:** Ağdaki tüm PC'ler aynı klasörü izler
5. **Telegram Erişimi:** Yetkili kullanıcılar whitelist ile

---

## 🔗 Hızlı Başvuru

- **Backend URL:** `https://api.domizan.com/v1/`
- **Telegram Bot:** `@Acero_Musavir_Bot`
- **Minimum İnternet:** 1 Mbps (önerilen: 5 Mbps)
- **Token Maliyeti:** ~₺0.05/belge (ortalama)
