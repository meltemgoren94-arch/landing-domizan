# 04 - Çok Kullanıcı ve Paylaşımlı Gelen Kutusu

## 🏢 Ofis Senaryosu

Mali müşavirlik ofislerinde tipik durum:
- 1 Lisans sahibi (ofis sahibi)
- 2-5 Çalışan (operatör)
- Ortak ağ sürücüsü (paylaşımlı klasör)
- Tek Domizan kurulumu (ana bilgisayar)

---

## 🖥️ Fiziksel Kurulum

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           OFİS AĞI (192.168.1.0/24)                         │
│                                                                             │
│   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐    │
│   │    PC1      │   │    PC2      │   │    PC3      │   │   SUNUCU    │    │
│   │   Ayşe      │   │   Mehmet    │   │   Zeynep    │   │   (NAS)     │    │
│   │192.168.1.10 │   │192.168.1.11 │   │192.168.1.12 │   │192.168.1.5  │    │
│   └──────┬──────┘   └──────┬──────┘   └──────┬──────┘   └──────┬──────┘    │
│          │                 │                 │                  │           │
│          │                 │                 │                  │           │
│          └─────────────────┴─────────────────┴──────────────────┘           │
│                                    │                                        │
│                                    │ SMB/CIFS                               │
│                                    ▼                                        │
│                    ┌───────────────────────────────┐                        │
│                    │    PAYLAŞIMLI KLASÖR          │                        │
│                    │    \\SUNUCU\GelenKutusu       │                        │
│                    │                               │                        │
│                    │  📁 Ayşe dosya bırakır        │                        │
│                    │  📁 Mehmet dosya bırakır      │                        │
│                    │  📁 Zeynep dosya bırakır      │                        │
│                    └───────────────────────────────┘                        │
│                                    │                                        │
│                                    │ File System                            │
│                                    ▼                                        │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                    ANA BİLGİSAYAR (Patron/Yönetici PC)               │  │
│   │                                                                      │  │
│   │   ┌─────────────────────────────────────────────────────────────┐   │  │
│   │   │                    DOMIZAN DESKTOP                           │   │  │
│   │   │                                                              │   │  │
│   │   │   • InboxWatcher: \\SUNUCU\GelenKutusu izliyor               │   │  │
│   │   │   • Tek lisans: DMZ-xyz                                      │   │  │
│   │   │   • Tüm işlemler bu PC'den yapılır                           │   │  │
│   │   │                                                              │   │  │
│   │   └─────────────────────────────────────────────────────────────┘   │  │
│   │                                                                      │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 👥 Kullanıcı Yönetimi

### Lisans Yapısı

```json
{
  "license_id": "DMZ-xyz123",
  "owner": {
    "name": "Acero Muhasebe",
    "email": "patron@acero.com",
    "phone": "+90532..."
  },
  "package": "PREMIUM",
  "limits": {
    "max_users": 3,
    "monthly_tokens": 500000
  },
  "users": [
    {
      "id": "user_1",
      "name": "Ahmet Patron",
      "role": "OWNER",
      "telegram_id": "123456789",
      "permissions": ["all"]
    },
    {
      "id": "user_2", 
      "name": "Ayşe Operatör",
      "role": "OPERATOR",
      "telegram_id": "234567890",
      "permissions": ["approve", "view"]
    },
    {
      "id": "user_3",
      "name": "Mehmet Stajyer",
      "role": "VIEWER",
      "telegram_id": null,
      "permissions": ["view"]
    }
  ],
  "created_at": "2026-01-01T00:00:00Z",
  "expires_at": "2026-12-31T23:59:59Z"
}
```

### Roller ve Yetkiler

| Rol | Popup Onay | Düzeltme | Telegram | Ayarlar | Kullanıcı Yönetimi |
|-----|------------|----------|----------|---------|-------------------|
| OWNER | ✅ | ✅ | ✅ | ✅ | ✅ |
| OPERATOR | ✅ | ✅ | ✅ | ❌ | ❌ |
| VIEWER | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## 📂 Paylaşımlı Inbox Konfigürasyonu

### Ayar Ekranı

```
┌─────────────────────────────────────────────────────────────────┐
│                    ⚙️ GELEN KUTUSU AYARLARI                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📁 Gelen Kutusu Yolu:                                         │
│  ┌─────────────────────────────────────────────┬───────────┐   │
│  │ \\SUNUCU\GelenKutusu                        │ 📂 Seç    │   │
│  └─────────────────────────────────────────────┴───────────┘   │
│                                                                 │
│  ℹ️ Bu klasöre tüm ofis çalışanları dosya bırakabilir.         │
│     Domizan bu klasörü otomatik izleyecektir.                   │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  ⚠️ ÖNEMLİ: Ağ sürücüsü erişimi için:                          │
│  • Klasör tam erişim izni verilmeli                             │
│  • Domizan Desktop her zaman açık olmalı                        │
│  • Ağ bağlantısı koptuğunda işlemler kuyrukta bekler            │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  🔄 Otomatik Başlat:  [✓] Windows açıldığında Domizan'ı başlat │
│                                                                 │
│  📊 Durum: ● İzleniyor (Son 5 dakikada 3 dosya işlendi)        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Ağ Klasörü İzleme Teknik Detay

```javascript
// inbox-watcher.js - Ağ sürücüsü desteği

class InboxWatcher {
    constructor() {
        this.watcher = null;
        this.retryInterval = null;
        this.isNetworkPath = false;
    }

    async start(inboxPath) {
        // Ağ yolu mu kontrol et
        this.isNetworkPath = inboxPath.startsWith('\\\\') || 
                             inboxPath.match(/^[A-Z]:\\/i);
        
        if (this.isNetworkPath) {
            // Ağ klasörü için ek kontroller
            await this.checkNetworkAccess(inboxPath);
        }

        this.watcher = chokidar.watch(inboxPath, {
            ignored: /(^|[\/\\])\../,
            persistent: true,
            // Ağ sürücüleri için özel ayarlar
            usePolling: this.isNetworkPath,      // Polling kullan
            interval: 2000,                       // 2 saniyede bir kontrol
            binaryInterval: 5000,
            awaitWriteFinish: {
                stabilityThreshold: 3000,         // Dosya tamamlanana kadar bekle
                pollInterval: 500
            }
        });

        this.watcher.on('add', this.handleNewFile.bind(this));
        this.watcher.on('error', this.handleError.bind(this));
    }

    async checkNetworkAccess(path) {
        try {
            await fs.access(path, fs.constants.R_OK | fs.constants.W_OK);
            console.log('[InboxWatcher] Ağ klasörü erişimi OK');
        } catch (error) {
            console.error('[InboxWatcher] Ağ klasörü erişim hatası:', error);
            throw new Error('Ağ klasörüne erişilemiyor');
        }
    }

    handleError(error) {
        if (error.code === 'ENOENT' || error.code === 'ECONNRESET') {
            console.warn('[InboxWatcher] Ağ bağlantısı koptu, yeniden denenecek...');
            this.startRetry();
        }
    }

    startRetry() {
        if (this.retryInterval) return;
        
        this.retryInterval = setInterval(async () => {
            try {
                await this.checkNetworkAccess(this.inboxPath);
                clearInterval(this.retryInterval);
                this.retryInterval = null;
                await this.start(this.inboxPath);
                console.log('[InboxWatcher] Ağ bağlantısı yeniden kuruldu');
            } catch {
                console.log('[InboxWatcher] Ağ hala erişilemez, bekleniyor...');
            }
        }, 10000); // 10 saniyede bir dene
    }
}
```

---

## 🔐 Kullanıcı Ekleme Akışı

### UI Akışı

```
┌─────────────────────────────────────────────────────────────────┐
│                    👥 KULLANICI YÖNETİMİ                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Mevcut Kullanıcılar (2/3):                                     │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 👤 Ahmet Patron          OWNER     📱 Telegram ✓    🗑️  │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │ 👤 Ayşe Operatör         OPERATOR  📱 Telegram ✓    🗑️  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  ➕ Yeni Kullanıcı Ekle                                  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  YENİ KULLANICI EKLE:                                           │
│                                                                 │
│  Ad Soyad:  ┌────────────────────────────────────────┐         │
│             │ Mehmet Stajyer                         │         │
│             └────────────────────────────────────────┘         │
│                                                                 │
│  Rol:       [OPERATOR ▼]                                        │
│                                                                 │
│  Telegram:  ┌────────────────────────────────────────┐         │
│             │ (Telegram'dan /kayit komutu ile)       │         │
│             └────────────────────────────────────────┘         │
│                                                                 │
│             📝 Bu kişinin Telegram hesabını bağlamak için:     │
│             1. Telegram'da @Acero_Musavir_Bot'u açın            │
│             2. /kayit komutunu gönderin                         │
│             3. Size verilen kodu buraya girin                   │
│                                                                 │
│             [➕ Kullanıcı Ekle]                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Backend API

```http
POST /api/v1/license/users
X-License-Key: DMZ-xyz

{
  "name": "Mehmet Stajyer",
  "role": "OPERATOR"
}

Response:
{
  "user_id": "user_3",
  "registration_code": "ABCD1234",  // Telegram kayıt için
  "expires_in_minutes": 30
}
```

---

## 🔢 Sınır Kontrolleri

### Kullanıcı Limiti

```javascript
// Backend: Kullanıcı ekleme kontrolü

async function addUser(licenseId, userData) {
    const license = await getLicense(licenseId);
    const currentUsers = license.users.length;
    const maxUsers = PACKAGES[license.package].max_users;
    
    if (currentUsers >= maxUsers) {
        throw new LimitExceededError(
            `Maksimum ${maxUsers} kullanıcı ekleyebilirsiniz. ` +
            `Daha fazla kullanıcı için paketinizi yükseltin.`
        );
    }
    
    // Kullanıcı ekle...
}
```

### Desktop Kullanım Sınırı

Desktop uygulaması sadece 1 PC'de çalışır:

```javascript
// main.js - Tek cihaz kontrolü

async function validateSingleDevice() {
    const deviceId = await generateDeviceFingerprint();
    const license = await licenseManager.getLicense();
    
    if (license.active_device && license.active_device !== deviceId) {
        dialog.showErrorBox(
            'Cihaz Sınırı',
            'Bu lisans başka bir bilgisayarda aktif.\n' +
            'Önce diğer bilgisayardan çıkış yapın veya\n' +
            'destek ile iletişime geçin.'
        );
        app.quit();
    }
    
    // Cihazı kaydet
    await backend.registerDevice(license.license_id, deviceId);
}
```

---

## 📊 Çoklu Kullanım Senaryoları

### Senaryo 1: Normal Akış

```
Ayşe (PC2)                   Domizan (Ana PC)              Backend
    │                              │                          │
    │ Dosya bırak                  │                          │
    │ \\SUNUCU\GelenKutusu\fatura.pdf                        │
    │───────────────────────────►  │                          │
    │                              │                          │
    │                              │ Algıla                   │
    │                              │──────┐                   │
    │                              │◄─────┘                   │
    │                              │                          │
    │                              │ Analiz iste              │
    │                              │─────────────────────────►│
    │                              │                          │
    │                              │◄─────────────────────────│
    │                              │ Sonuç                    │
    │                              │                          │
    │                              │ Popup göster             │
    │                              │ (Ana PC'de)              │
    │                              │──────┐                   │
    │                              │◄─────┘                   │
    │                              │                          │
    │                       [PATRON ONAYLAR]                  │
    │                              │                          │
    │                              │ Dosya taşı               │
    │                              │──────┐                   │
    │                              │◄─────┘                   │
```

### Senaryo 2: Telegram Bildirimi

```
Mehmet (PC3)     Domizan      Backend      Telegram
    │               │            │             │
    │ Dosya bırak   │            │             │
    │──────────────►│            │             │
    │               │            │             │
    │               │ Analiz     │             │
    │               │───────────►│             │
    │               │            │             │
    │               │◄───────────│             │
    │               │            │             │
    │               │            │ Bildirim    │
    │               │            │────────────►│
    │               │            │             │
    │               │            │             │ Telegram mesaj
    │               │            │             │ (tüm yetkililere)
    │               │            │             │──────►👤 Patron
    │               │            │             │──────►👤 Ayşe
```

---

## ⚠️ Dikkat Edilmesi Gerekenler

1. **Ağ Sürücüsü Performansı:**
   - `usePolling: true` CPU kullanır
   - Büyük klasörlerde yavaşlama olabilir
   - Önerilen: GelenKutusu'nda max 100 dosya

2. **Tek Domizan Kuralı:**
   - Sadece 1 PC'de Domizan çalışmalı
   - Diğer PC'ler sadece dosya bırakır
   - İkinci kurulum engellenir

3. **Kullanıcı Senkronizasyonu:**
   - Kullanıcı listesi backend'de tutulur
   - Desktop her başlangıçta senkronize eder
   - Offline'da son bilinen liste kullanılır
