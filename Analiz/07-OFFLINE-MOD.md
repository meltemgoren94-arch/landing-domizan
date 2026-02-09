# 07 - Zayıf Internet ve Offline Mod

## 🌐 Ağ Durumu Senaryoları

| Senaryo | Bant Genişliği | Davranış |
|---------|----------------|----------|
| Normal | > 5 Mbps | Anlık analiz, gerçek zamanlı sync |
| Yavaş | 1-5 Mbps | Analiz yavaşlar, kuyruk oluşabilir |
| Çok Yavaş | 256 Kbps - 1 Mbps | Kuyruk modu, batch işleme |
| Offline | 0 | Lokal kuyruk, internet gelince sync |

---

## 📊 Bant Genişliği Gereksinimleri

### Tipik Bir Belge Analizi

```
UPLOAD (Desktop → Backend):
├── İstek metadata:     ~1 KB
├── Belge metin içeriği: ~10-50 KB (PDF'den çıkarılmış)
└── TOPLAM UPLOAD:      ~50 KB

DOWNLOAD (Backend → Desktop):
├── Analiz sonucu JSON: ~2 KB
└── TOPLAM DOWNLOAD:    ~2 KB

TOPLAM:                 ~52 KB / belge
```

### Farklı Bağlantılarda Süre

| Bağlantı | Hız | Belge Süresi | 10 Belge |
|----------|-----|--------------|----------|
| Fiber | 100 Mbps | ~1 saniye | ~10 saniye |
| ADSL | 10 Mbps | ~2 saniye | ~20 saniye |
| 4G | 5 Mbps | ~3 saniye | ~30 saniye |
| 3G | 1 Mbps | ~10 saniye | ~100 saniye |
| Yavaş 3G | 256 Kbps | ~40 saniye | ~7 dakika |

> ⚠️ Not: Yukarıdaki süreler sadece ağ transferi içindir. Gemini API yanıt süresi (~2-5 saniye) ayrıca eklenir.

---

## 🔄 Offline Kuyruk Sistemi

### Akış Diyagramı

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           OFFLINE QUEUE SYSTEM                              │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                         DOSYA GELİR                                  │  │
│   └────────────────────────────────┬────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                      İNTERNET VAR MI?                                │  │
│   └────────────────────────────────┬────────────────────────────────────┘  │
│                                    │                                        │
│              ┌─────────────────────┼─────────────────────┐                 │
│              │ EVET                │                     │ HAYIR           │
│              ▼                     │                     ▼                 │
│   ┌─────────────────────┐          │          ┌─────────────────────┐      │
│   │ Normal işleme       │          │          │ Kuyruğa ekle        │      │
│   │ Backend'e gönder    │          │          │ offline-queue.json  │      │
│   └─────────────────────┘          │          └──────────┬──────────┘      │
│                                    │                     │                 │
│                                    │                     ▼                 │
│                                    │          ┌─────────────────────┐      │
│                                    │          │ Kullanıcıya bildir  │      │
│                                    │          │ "Beklemede: 3 belge"│      │
│                                    │          └──────────┬──────────┘      │
│                                    │                     │                 │
│                                    │                     │                 │
│                                    │          İNTERNET GELDİĞİNDE:         │
│                                    │                     │                 │
│                                    │                     ▼                 │
│                                    │          ┌─────────────────────┐      │
│                                    │          │ Kuyruktan al        │      │
│                                    │          │ Sırayla işle        │      │
│                                    │          └─────────────────────┘      │
│                                    │                                        │
└────────────────────────────────────┴────────────────────────────────────────┘
```

### Kuyruk Dosya Yapısı

```json
// offline-queue.json
{
  "version": 1,
  "last_check": "2026-02-05T01:40:00Z",
  "items": [
    {
      "id": "queue_001",
      "added_at": "2026-02-05T01:35:00Z",
      "file_path": "C:\\GelenKutusu\\fatura_abc.pdf",
      "file_hash": "sha256:abc123...",
      "status": "pending",
      "retry_count": 0,
      "extracted_content": "... PDF'den çıkarılmış metin ..."
    },
    {
      "id": "queue_002",
      "added_at": "2026-02-05T01:36:00Z",
      "file_path": "C:\\GelenKutusu\\dekont_xyz.pdf",
      "file_hash": "sha256:def456...",
      "status": "pending",
      "retry_count": 0,
      "extracted_content": "..."
    }
  ]
}
```

---

## 🔌 Bağlantı Durumu Yönetimi

### Bağlantı Kontrolü

```javascript
// connection-manager.js

class ConnectionManager {
    constructor() {
        this.isOnline = true;
        this.lastCheck = null;
        this.checkInterval = null;
    }
    
    start() {
        // İlk kontrol
        this.check();
        
        // Periyodik kontrol (30 saniye)
        this.checkInterval = setInterval(() => {
            this.check();
        }, 30000);
        
        // Electron'un network durumu
        require('electron').ipcRenderer.on('online-status', (e, status) => {
            this.handleStatusChange(status);
        });
    }
    
    async check() {
        try {
            const response = await fetch('https://api.domizan.com/health', {
                method: 'HEAD',
                timeout: 5000
            });
            this.setOnline(response.ok);
        } catch {
            this.setOnline(false);
        }
    }
    
    setOnline(status) {
        const wasOffline = !this.isOnline;
        this.isOnline = status;
        this.lastCheck = new Date();
        
        if (wasOffline && status) {
            // İnternet geri geldi!
            this.emit('online');
            this.processOfflineQueue();
        } else if (!status) {
            this.emit('offline');
        }
    }
    
    async processOfflineQueue() {
        const queue = await OfflineQueue.getAll();
        console.log(`[Connection] Processing ${queue.length} queued items`);
        
        for (const item of queue) {
            try {
                await DocumentFlow.processQueueItem(item);
                await OfflineQueue.remove(item.id);
            } catch (error) {
                item.retry_count++;
                if (item.retry_count >= 3) {
                    item.status = 'failed';
                }
                await OfflineQueue.update(item);
            }
        }
    }
}
```

### UI Durum Göstergesi

```
┌─────────────────────────────────────────────────────────────────┐
│                    DOMIZAN DESKTOP                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Bağlantı: 🟢 Çevrimiçi                                  │   │
│  │  Son kontrol: 5 saniye önce                              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│                      veya                                       │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Bağlantı: 🔴 Çevrimdışı                                 │   │
│  │  Bekleyen belgeler: 5                                    │   │
│  │  İnternet bağlantısı geldiğinde işlenecek               │   │
│  │                                                          │   │
│  │  [📋 Kuyruğu Görüntüle]                                  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## ⚡ Yavaş Bağlantı Optimizasyonları

### 1. İçerik Sıkıştırma

```javascript
// backend-client.js

async function analyzeDocument(content) {
    // Gzip sıkıştırma
    const compressed = await gzip(JSON.stringify({ content }));
    
    const response = await fetch('/api/v1/ai/analyze', {
        method: 'POST',
        headers: {
            'Content-Encoding': 'gzip',
            'Accept-Encoding': 'gzip'
        },
        body: compressed
    });
    
    // ~%70 boyut azalması sağlanır
}
```

### 2. Öncelik Sıralaması

```javascript
// Belgeler önceliklerine göre sıralanır
const PRIORITIES = {
    'beyanname': 1,    // En yüksek öncelik
    'tahakkuk': 2,
    'fatura': 3,
    'banka-dekontu': 4,
    'diger': 5         // En düşük öncelik
};

class OfflineQueue {
    async add(item) {
        item.priority = PRIORITIES[item.detected_type] || 5;
        // Kuyruğa ekle ve sırala
    }
    
    async getNext() {
        // Önceliğe göre al
        return this.items.sort((a, b) => a.priority - b.priority)[0];
    }
}
```

### 3. Batch İşleme

```javascript
// Yavaş bağlantıda tek tek yerine toplu gönder
async function processBatch() {
    const items = await OfflineQueue.getAll();
    
    if (items.length > 5 && connectionSpeed < 1_000_000) { // 1 Mbps altı
        // Batch modunda gönder
        const batch = items.slice(0, 10);
        const results = await backend.analyzeBatch(batch);
        
        for (let i = 0; i < results.length; i++) {
            await handleResult(batch[i], results[i]);
        }
    }
}
```

---

## 💾 Lokal Cache Stratejisi

### Pattern Cache

```
Pattern'lar lokal'de cache'lenir:
- Son sync: pattern-cache.json
- Offline'da çalışmaya devam eder
- Sadece yeni pattern'lar eksik olur
```

### Mükellef Cache

```
Mükellef veritabanı zaten lokal:
- mukellefler.json
- VKN/TC eşleştirmesi offline çalışır
- Yeni mükellef eklenemez (sync gerekir)
```

### Analiz Cache

```javascript
// Aynı belge tekrar gelirse cache'den oku
const analysisCache = new LRUCache({
    max: 100,                    // 100 belge
    maxAge: 24 * 60 * 60 * 1000  // 24 saat
});

function getCacheKey(fileHash) {
    return `analysis_${fileHash}`;
}

async function getAnalysis(filePath) {
    const hash = await calculateFileHash(filePath);
    const cached = analysisCache.get(getCacheKey(hash));
    
    if (cached) {
        console.log('[Cache] Analiz cache\'den alındı');
        return cached;
    }
    
    // Yeni analiz yap
    const result = await backend.analyze(filePath);
    analysisCache.set(getCacheKey(hash), result);
    return result;
}
```

---

## 🔄 Sync Stratejisi

### Ne Zaman Sync Yapılır?

| Olay | Sync Türü |
|------|-----------|
| Uygulama başlangıcı | Tam sync (pattern, lisans, kota) |
| İnternet geri geldi | Kuyruk işle + pattern sync |
| Her 6 saat | Pattern sync |
| Her 1 saat | Kota sync |
| Belge işlendi | Düzeltme gönder (anlık) |

### Sync Öncelikleri

```
1. Kuyruklanmış belgeler (en kritik)
2. Bekleyen düzeltmeler
3. Pattern güncellemeleri
4. Kota bilgisi
5. Lisans durumu
```

---

## ⚠️ Hata Senaryoları

### Timeout Yönetimi

```javascript
const TIMEOUTS = {
    normal: 30000,      // 30 saniye (normal bağlantı)
    slow: 60000,        // 60 saniye (yavaş bağlantı)
    very_slow: 120000   // 120 saniye (çok yavaş)
};

async function analyzeWithRetry(content) {
    const timeout = getTimeoutForConnectionSpeed();
    
    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            return await fetchWithTimeout('/analyze', {
                body: content,
                timeout: timeout * attempt  // Her denemede artır
            });
        } catch (error) {
            if (error.name === 'AbortError' && attempt < 3) {
                console.log(`[Retry] Attempt ${attempt} timed out, retrying...`);
                continue;
            }
            throw error;
        }
    }
}
```

### Kullanıcı Bildirimi

```
┌─────────────────────────────────────────────────────────────────┐
│  ⚠️ Yavaş Bağlantı Algılandı                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  İnternet bağlantınız yavaş görünüyor.                          │
│  Belge analizi normalden uzun sürebilir.                        │
│                                                                 │
│  Mevcut hız: ~500 Kbps                                          │
│  Tahmini süre: ~45 saniye/belge                                 │
│                                                                 │
│  Seçenekler:                                                    │
│  [🔄 Yine de devam et]  [⏸️ Bağlantı düzelene kadar bekle]      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```
