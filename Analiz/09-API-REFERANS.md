# 09 - Backend API Referansı

## 🌐 Genel Bilgiler

**Base URL:** `https://api.domizan.com`  
**API Versiyonu:** `v1`  
**Protokol:** HTTPS  
**Format:** JSON  
**Encoding:** UTF-8

### Kimlik Doğrulama

Tüm isteklerde `X-License-Key` header'ı zorunludur:

```http
X-License-Key: DMZ-XyZ12345AbC
```

### Ortak Response Formatı

**Başarılı:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Hata:**
```json
{
  "success": false,
  "error": {
    "code": "QUOTA_EXCEEDED",
    "message": "Aylık token kotanız doldu",
    "details": { ... }
  }
}
```

---

## 📑 Endpoint Listesi

| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `/v1/health` | GET | Sunucu durumu |
| `/v1/ai/analyze` | POST | Belge analizi |
| `/v1/ai/analyze-batch` | POST | Toplu belge analizi |
| `/v1/usage/my` | GET | Kullanım bilgisi |
| `/v1/usage/daily` | GET | Günlük detay |
| `/v1/learning/correction` | POST | Düzeltme kaydet |
| `/v1/learning/patterns` | GET | Pattern listesi |
| `/v1/license/validate` | POST | Lisans doğrula |
| `/v1/license/users` | GET/POST | Kullanıcı yönetimi |
| `/v1/telegram/registration-code` | POST | Telegram kayıt kodu |
| `/v1/telegram/webhook` | POST | Telegram webhook |
| `/v1/events` | GET (SSE) | Real-time events |

---

## 1️⃣ Health Check

### `GET /v1/health`

Sunucu durumunu kontrol eder.

**Request:**
```http
GET /v1/health HTTP/1.1
Host: api.domizan.com
```

**Response:**
```json
{
  "status": "healthy",
  "version": "3.0.1",
  "timestamp": "2026-02-05T01:40:00Z",
  "services": {
    "database": "ok",
    "gemini": "ok",
    "telegram": "ok"
  }
}
```

---

## 2️⃣ Belge Analizi

### `POST /v1/ai/analyze`

Tek bir belgeyi AI ile analiz eder.

**Request:**
```http
POST /v1/ai/analyze HTTP/1.1
Host: api.domizan.com
X-License-Key: DMZ-xyz
Content-Type: application/json
Content-Encoding: gzip

{
  "content": "... belge metin içeriği ...",
  "filename": "fatura_abc.pdf",
  "content_type": "application/pdf",
  "hint": {
    "detected_type": "fatura",
    "source_hints": ["e-fatura"]
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "analysis": {
      "belge_turu": "fatura",
      "belge_aciklama": "E-Fatura",
      "kimlikler": [
        {
          "tip": "VKN",
          "numara": "1234567890",
          "baglam": "SATICI",
          "firma_adi": "ABC LTD ŞTİ"
        }
      ],
      "dosyalama": {
        "tarih": "2026-02-01",
        "yil": 2026,
        "ay": 2,
        "ay_adi": "Şubat"
      },
      "guven_skoru": 92
    },
    "pattern_applied": "pattern_045",
    "tokens": {
      "input": 3800,
      "output": 720,
      "total": 4520
    },
    "processing_time_ms": 2450
  }
}
```

**Hata Durumları:**

| Kod | Durum | Açıklama |
|-----|-------|----------|
| 401 | `INVALID_LICENSE` | Geçersiz lisans |
| 402 | `QUOTA_EXCEEDED` | Kota aşıldı |
| 429 | `RATE_LIMITED` | Çok fazla istek |
| 500 | `ANALYSIS_FAILED` | AI analiz hatası |

---

### `POST /v1/ai/analyze-batch`

Birden fazla belgeyi toplu analiz eder (yavaş bağlantı için).

**Request:**
```json
{
  "items": [
    {
      "id": "batch_001",
      "content": "...",
      "filename": "fatura1.pdf"
    },
    {
      "id": "batch_002", 
      "content": "...",
      "filename": "dekont1.pdf"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "results": [
      { "id": "batch_001", "success": true, "analysis": { ... } },
      { "id": "batch_002", "success": true, "analysis": { ... } }
    ],
    "total_tokens": 9040,
    "processing_time_ms": 4200
  }
}
```

---

## 3️⃣ Kullanım Bilgisi

### `GET /v1/usage/my`

Mevcut ayın kullanım özeti.

**Request:**
```http
GET /v1/usage/my HTTP/1.1
X-License-Key: DMZ-xyz
```

**Response:**
```json
{
  "success": true,
  "data": {
    "license_id": "DMZ-xyz",
    "package": "PREMIUM",
    "period": {
      "start": "2026-02-01",
      "end": "2026-02-28",
      "days_remaining": 23
    },
    "quota": {
      "monthly_limit": 500000,
      "used": 127500,
      "remaining": 372500,
      "percentage": 25.5
    },
    "today": {
      "limit": 50000,
      "used": 3200,
      "remaining": 46800
    },
    "cost": {
      "current_month_usd": 0.15,
      "current_month_try": 5.70,
      "average_per_document_try": 0.038
    },
    "stats": {
      "documents_processed": 150,
      "corrections_made": 12,
      "patterns_applied": 89
    },
    "alerts": []
  }
}
```

### `GET /v1/usage/daily`

Son N günün detaylı istatistikleri.

**Request:**
```http
GET /v1/usage/daily?days=7 HTTP/1.1
X-License-Key: DMZ-xyz
```

**Response:**
```json
{
  "success": true,
  "data": {
    "days": [
      {
        "date": "2026-02-05",
        "requests": 42,
        "tokens": 189000,
        "cost_try": 0.72,
        "by_type": {
          "fatura": 18,
          "banka-dekontu": 15,
          "beyanname": 9
        }
      }
    ]
  }
}
```

---

## 4️⃣ Öğrenme Sistemi

### `POST /v1/learning/correction`

Kullanıcı düzeltmesi kaydet.

**Request:**
```json
{
  "document_context": {
    "type": "banka-dekontu",
    "source_hints": ["garanti", "havale"],
    "keywords": ["valör", "işlem tarihi"]
  },
  "correction": {
    "field": "dosyalama.ay",
    "ai_value": 12,
    "user_value": 1,
    "ai_confidence": 75
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "correction_id": "corr_abc123",
    "similar_corrections": 14,
    "pattern_status": "pending"
  }
}
```

### `GET /v1/learning/patterns`

Güncel pattern listesi.

**Request:**
```http
GET /v1/learning/patterns?since=2026-02-01T00:00:00Z HTTP/1.1
X-License-Key: DMZ-xyz
```

**Response:**
```json
{
  "success": true,
  "data": {
    "patterns": [
      {
        "id": "pattern_001",
        "version": "2026-02-05",
        "trigger": {
          "document_type": "banka-dekontu",
          "source_contains": ["garanti"],
          "content_contains": ["valör"]
        },
        "action": {
          "field": "dosyalama_tarihi",
          "rule": "USE_ISLEM_TARIHI",
          "description": "Garanti dekontlarında işlem tarihini kullan"
        }
      }
    ],
    "version": "2026-02-05T10:30:00Z",
    "total_patterns": 156
  }
}
```

---

## 5️⃣ Lisans Yönetimi

### `POST /v1/license/validate`

Lisans geçerliliğini kontrol et ve cihaz kaydet.

**Request:**
```json
{
  "device_fingerprint": "fp_abc123def456"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "valid": true,
    "license": {
      "license_id": "DMZ-xyz",
      "package": "PREMIUM",
      "owner": "Acero Muhasebe",
      "expires_at": "2027-01-01T00:00:00Z",
      "status": "active"
    },
    "device_registered": true,
    "features": ["telegram", "learning"]
  }
}
```

### `GET /v1/license/users`

Lisansa bağlı kullanıcı listesi.

**Response:**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "user_001",
        "name": "Ahmet Yılmaz",
        "role": "OWNER",
        "telegram_connected": true
      },
      {
        "id": "user_002",
        "name": "Ayşe Kaya",
        "role": "OPERATOR",
        "telegram_connected": true
      }
    ],
    "max_users": 3,
    "can_add_more": true
  }
}
```

### `POST /v1/license/users`

Yeni kullanıcı ekle.

**Request:**
```json
{
  "name": "Mehmet Demir",
  "role": "OPERATOR"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user_id": "user_003",
    "registration_code": "ABCD1234",
    "code_expires_at": "2026-02-05T02:10:00Z"
  }
}
```

---

## 6️⃣ Telegram

### `POST /v1/telegram/registration-code`

Telegram kayıt kodu oluştur.

**Request:**
```json
{
  "user_id": "user_003"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "code": "ABCD1234",
    "expires_in_seconds": 1800,
    "expires_at": "2026-02-05T02:10:00Z"
  }
}
```

### `POST /v1/telegram/webhook`

Telegram bot webhook (Telegram'dan gelir).

Bu endpoint Telegram tarafından çağrılır, Desktop'tan değil.

---

## 7️⃣ Real-time Events (SSE)

### `GET /v1/events`

Server-Sent Events stream.

**Request:**
```http
GET /v1/events HTTP/1.1
X-License-Key: DMZ-xyz
Accept: text/event-stream
```

**Event Types:**

```
event: telegram_action
data: {"type":"approve","doc_id":"doc_123","user":"Ahmet"}

event: quota_alert
data: {"percentage":80,"remaining":100000}

event: pattern_update
data: {"new_patterns":2,"version":"2026-02-05"}
```

**JavaScript Kullanımı:**
```javascript
const eventSource = new EventSource(
  'https://api.domizan.com/v1/events',
  { 
    headers: { 'X-License-Key': 'DMZ-xyz' }
  }
);

eventSource.addEventListener('telegram_action', (e) => {
  const data = JSON.parse(e.data);
  console.log('Telegram action:', data);
});
```

---

## 🔒 Rate Limiting

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/ai/analyze` | 60 | 1 dakika |
| `/ai/analyze-batch` | 10 | 1 dakika |
| `/learning/*` | 100 | 1 dakika |
| `/usage/*` | 30 | 1 dakika |
| Diğer | 120 | 1 dakika |

**Rate Limit Aşıldığında:**
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMITED",
    "message": "Çok fazla istek. 45 saniye bekleyin.",
    "retry_after": 45
  }
}
```

---

## 📦 SDK Örnekleri

### JavaScript/Node.js

```javascript
class DomizanClient {
  constructor(licenseKey) {
    this.baseUrl = 'https://api.domizan.com/v1';
    this.licenseKey = licenseKey;
  }

  async analyze(content, filename) {
    const response = await fetch(`${this.baseUrl}/ai/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-License-Key': this.licenseKey
      },
      body: JSON.stringify({ content, filename })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error.message);
    }

    return response.json();
  }

  async getUsage() {
    const response = await fetch(`${this.baseUrl}/usage/my`, {
      headers: { 'X-License-Key': this.licenseKey }
    });
    return response.json();
  }

  async submitCorrection(correction) {
    const response = await fetch(`${this.baseUrl}/learning/correction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-License-Key': this.licenseKey
      },
      body: JSON.stringify(correction)
    });
    return response.json();
  }
}

// Kullanım
const client = new DomizanClient('DMZ-xyz');
const result = await client.analyze(pdfContent, 'fatura.pdf');
```
