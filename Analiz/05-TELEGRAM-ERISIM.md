# 05 - Telegram Erişimi

## 📱 Çoklu Kullanıcı Telegram Yapısı

### Genel Mimari

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         TELEGRAM API                                         │
│                                                                             │
│                    @Acero_Musavir_Bot                                        │
│                         │                                                   │
│                         │ Webhook                                           │
│                         ▼                                                   │
│              ┌─────────────────────┐                                        │
│              │   DOMIZAN BACKEND   │                                        │
│              │   /telegram/webhook │                                        │
│              └──────────┬──────────┘                                        │
│                         │                                                   │
│         ┌───────────────┼───────────────┐                                   │
│         │               │               │                                   │
│         ▼               ▼               ▼                                   │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                           │
│  │ Lisans A    │ │ Lisans B    │ │ Lisans C    │                           │
│  │ DMZ-aaa     │ │ DMZ-bbb     │ │ DMZ-ccc     │                           │
│  │             │ │             │ │             │                           │
│  │ 👤 Patron   │ │ 👤 Ali      │ │ 👤 Veli     │                           │
│  │ 👤 Ayşe     │ │ 👤 Fatma    │ │             │                           │
│  │ 👤 Mehmet   │ │             │ │             │                           │
│  └─────────────┘ └─────────────┘ └─────────────┘                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔐 Kullanıcı Kayıt Akışı

### Adım 1: Desktop'tan Kayıt Kodu Al

```
Desktop App'te:
┌─────────────────────────────────────────────────────────────────┐
│           👥 KULLANICI YÖNETİMİ > TELEGRAM BAĞLA                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Telegram'da @Acero_Musavir_Bot'u açın                       │
│  2. /kayit komutunu gönderin                                    │
│  3. Size verilen kodu aşağıya girin                             │
│                                                                 │
│  Kayıt Kodu: ┌────────────────────┐                             │
│              │ ABCD1234           │                             │
│              └────────────────────┘                             │
│                                                                 │
│  ⏱️ Kod 30 dakika geçerli                                      │
│                                                                 │
│             [✓ Doğrula ve Bağla]                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Adım 2: Telegram'da Kayıt

```
Telegram Konuşması:
┌─────────────────────────────────────────────────────────────────┐
│  @Acero_Musavir_Bot                                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  └─ Kullanıcı: /kayit                                          │
│                                                                 │
│  ┌─ Bot:                                                        │
│  │ 🔐 Domizan'a Hoş Geldiniz!                                   │
│  │                                                              │
│  │ Hesabınızı bağlamak için lütfen                              │
│  │ Domizan Desktop'tan aldığınız                                │
│  │ 8 haneli kayıt kodunu girin.                                 │
│  │                                                              │
│  │ Örnek: ABCD1234                                              │
│  └───────────────────────────────────────────────────────────   │
│                                                                 │
│  └─ Kullanıcı: ABCD1234                                        │
│                                                                 │
│  ┌─ Bot:                                                        │
│  │ ✅ Başarıyla kayıt oldunuz!                                  │
│  │                                                              │
│  │ 📋 Bilgileriniz:                                             │
│  │ • Lisans: Acero Muhasebe                                     │
│  │ • Rol: Operatör                                              │
│  │ • Telegram ID: 123456789                                     │
│  │                                                              │
│  │ Artık belge bildirimleri alacaksınız.                        │
│  │ Komutlar için /yardim yazın.                                 │
│  └───────────────────────────────────────────────────────────   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Kayıt Akış Diyagramı

```
Kullanıcı      Desktop        Backend        Telegram Bot
    │             │              │                 │
    │ "Telegram   │              │                 │
    │  bağla" tık │              │                 │
    │────────────►│              │                 │
    │             │              │                 │
    │             │ POST /user/telegram-code       │
    │             │─────────────►│                 │
    │             │              │                 │
    │             │◄─────────────│                 │
    │             │ { code: "ABCD1234",            │
    │             │   expires_in: 1800 }           │
    │◄────────────│              │                 │
    │ Kodu göster │              │                 │
    │             │              │                 │
    │                            │                 │
    │ Telegram'da /kayit         │                 │
    │───────────────────────────────────────────►│
    │                            │                 │
    │◄───────────────────────────────────────────│
    │ "Kod girin"                │                 │
    │                            │                 │
    │ ABCD1234                   │                 │
    │───────────────────────────────────────────►│
    │                            │                 │
    │                            │◄────────────────│
    │                            │ Kod doğrula     │
    │                            │────────────────►│
    │                            │                 │
    │                            │ User kaydet     │
    │                            │ telegram_id=123 │
    │                            │────────┐        │
    │                            │◄───────┘        │
    │                            │                 │
    │                            │────────────────►│
    │◄───────────────────────────────────────────│
    │ "Kayıt başarılı"           │                 │
```

---

## 📬 Bildirim Gönderme

### Bildirim Türleri

| Tür | Kimin Alacak | İçerik |
|-----|--------------|--------|
| Yeni Belge | Tüm OPERATOR + OWNER | Belge özeti + onay butonları |
| Onay Gerekli | Tüm OPERATOR + OWNER | Düşük güvenli belge uyarısı |
| Günlük Özet | Sadece OWNER | Günün işlem özeti |
| Kota Uyarısı | Sadece OWNER | Token tükeniyor |
| Hata | Sadece OWNER | Sistem hatası |

### Bildirim Gönderme Akışı

```javascript
// telegram-notifier.js

class TelegramNotifier {
    async sendDocumentNotification(licenseId, documentInfo) {
        // 1. Bu lisansa bağlı tüm yetkili kullanıcıları bul
        const users = await this.getAuthorizedUsers(licenseId);
        
        // 2. Mesaj hazırla
        const message = this.formatDocumentMessage(documentInfo);
        const buttons = this.createApprovalButtons(documentInfo.doc_id);
        
        // 3. Her kullanıcıya gönder
        for (const user of users) {
            if (user.telegram_id && user.role !== 'VIEWER') {
                await this.bot.sendMessage(user.telegram_id, message, {
                    parse_mode: 'HTML',
                    reply_markup: buttons
                });
            }
        }
    }
    
    getAuthorizedUsers(licenseId) {
        return db.collection('licenses')
            .doc(licenseId)
            .get()
            .then(doc => doc.data().users.filter(u => 
                u.telegram_id && 
                ['OWNER', 'OPERATOR'].includes(u.role)
            ));
    }
}
```

### Telegram Mesaj Formatı

```
┌─────────────────────────────────────────────────────────────────┐
│  @Acero_Musavir_Bot                                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─ Bot:                                                        │
│  │ 📄 Yeni Belge Algılandı                                      │
│  │ ─────────────────────────                                    │
│  │                                                              │
│  │ 📁 Dosya: garanti_dekont_12ocak.pdf                          │
│  │ 📋 Tür: Banka Dekontu                                        │
│  │ 🏢 Mükellef: ABC LTD ŞTİ                                     │
│  │ 📅 Tarih: 12.01.2026                                         │
│  │ 💰 Tutar: ₺5.000,00                                          │
│  │                                                              │
│  │ 📂 Hedef:                                                    │
│  │ Müşteriler/ABC LTD/Banka/2026/01-Ocak                        │
│  │                                                              │
│  │ 🎯 Güven: ████████░░ 85%                                     │
│  │                                                              │
│  │ ┌─────────────────────────────────────────────┐              │
│  │ │  ✅ Onayla    │    ❌ Reddet    │    ✏️ Düzelt │             │
│  │ └─────────────────────────────────────────────┘              │
│  │                                                              │
│  └───────────────────────────────────────────────────────────   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## ⌨️ Telegram Komutları

### Tüm Kullanıcılar

| Komut | Açıklama |
|-------|----------|
| `/start` | Botu başlat, hakkında bilgi |
| `/kayit <KOD>` | Hesap bağlama |
| `/yardim` | Komut listesi |
| `/durum` | Bağlantı durumu, lisans bilgisi |
| `/bekleyen` | Onay bekleyen belgeler |

### Sadece OWNER

| Komut | Açıklama |
|-------|----------|
| `/kota` | Token kullanımı ve kalan |
| `/kullanicilar` | Bağlı kullanıcı listesi |
| `/cikar @username` | Kullanıcıyı çıkar |
| `/rapor` | Günlük/haftalık özet |

### Örnek Komut Yanıtları

```
/bekleyen

┌─ Bot:
│ 📋 Onay Bekleyen Belgeler (3)
│ ─────────────────────────────
│
│ 1️⃣ fatura_abc_2301.pdf
│    └ ABC LTD • Fatura • 23.01.2026
│
│ 2️⃣ dekont_xyz_2401.pdf
│    └ XYZ AŞ • Dekont • 24.01.2026
│
│ 3️⃣ beyanname_muhtasar.pdf
│    └ DEF LTD • Beyanname • Ocak 2026
│
│ Onaylamak için belge numarasına tıklayın.
└───────────────────────────────────────────
```

```
/kota

┌─ Bot:
│ 📊 Token Kullanımı
│ ─────────────────────
│
│ Paket: PREMIUM
│ Dönem: Şubat 2026
│
│ Kullanılan: 127.500 / 500.000
│ ████████░░░░░░░░░░░░ 25.5%
│
│ Kalan: 372.500 token
│ Tahmini: ~124 belge
│
│ Dönem Sonu: 28 Şubat 2026
└───────────────────────────────
```

---

## 🔄 Callback Butonları

### Onay/Red Akışı

```
Kullanıcı      Telegram       Backend         Desktop
    │             │              │                │
    │ [Onayla]    │              │                │
    │────────────►│              │                │
    │             │              │                │
    │             │ callback_query               │
    │             │ data: "approve_doc123"       │
    │             │─────────────►│                │
    │             │              │                │
    │             │              │ WebSocket/SSE  │
    │             │              │───────────────►│
    │             │              │                │
    │             │              │                │ Dosya taşı
    │             │              │                │──────┐
    │             │              │                │◄─────┘
    │             │              │                │
    │             │              │◄───────────────│
    │             │              │ Sonuç          │
    │             │              │                │
    │             │◄─────────────│                │
    │◄────────────│              │                │
    │ "Belge      │              │                │
    │  taşındı"   │              │                │
```

### Callback Data Formatı

```javascript
const CALLBACKS = {
    approve: 'A_{doc_id}',    // A_doc123
    reject: 'R_{doc_id}',     // R_doc123
    edit: 'E_{doc_id}',       // E_doc123 -> Web panel açar
    details: 'D_{doc_id}'     // D_doc123 -> Detay göster
};
```

---

## 📡 Backend → Desktop İletişimi

Telegram'dan onay geldiğinde Desktop'a nasıl iletilir?

### Seçenek A: Polling (Basit)

```javascript
// Desktop her 5 saniyede backend'i sorgular
setInterval(async () => {
    const pending = await backend.getPendingApprovals(licenseId);
    for (const approval of pending.approved) {
        await documentFlow.processApproval(approval);
    }
}, 5000);
```

### Seçenek B: WebSocket (Gerçek Zamanlı)

```javascript
// Desktop WebSocket bağlantısı kurar
const ws = new WebSocket('wss://api.domizan.com/realtime');

ws.on('message', (data) => {
    const event = JSON.parse(data);
    if (event.type === 'TELEGRAM_APPROVAL') {
        documentFlow.processApproval(event.payload);
    }
});
```

### Seçenek C: SSE - Server Sent Events (Önerilen)

```javascript
// Desktop SSE bağlantısı kurar
const eventSource = new EventSource(
    'https://api.domizan.com/events?license=' + licenseId
);

eventSource.addEventListener('telegram_action', (e) => {
    const event = JSON.parse(e.data);
    documentFlow.processTelegramAction(event);
});

eventSource.addEventListener('error', () => {
    // Yeniden bağlan
    setTimeout(() => reconnect(), 5000);
});
```

---

## ⚠️ Güvenlik Kontrolleri

```javascript
// Telegram callback işleme

async function handleCallback(callbackQuery) {
    const telegramId = callbackQuery.from.id;
    const data = callbackQuery.data;
    
    // 1. Kullanıcı kayıtlı mı?
    const user = await findUserByTelegramId(telegramId);
    if (!user) {
        return answerCallback(callbackQuery.id, '❌ Kayıtlı değilsiniz');
    }
    
    // 2. Kullanıcı bu belgeye erişebilir mi?
    const docId = data.split('_')[1];
    const doc = await getDocument(docId);
    
    if (doc.license_id !== user.license_id) {
        return answerCallback(callbackQuery.id, '❌ Yetkiniz yok');
    }
    
    // 3. Kullanıcı rolü yeterli mi?
    if (user.role === 'VIEWER') {
        return answerCallback(callbackQuery.id, '❌ Görüntüleyici onay yapamaz');
    }
    
    // 4. İşlemi gerçekleştir
    // ...
}
```
