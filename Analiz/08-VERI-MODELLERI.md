# 08 - Veri Modelleri ve JSON Şemaları

## 📊 Veri Modeli Genel Haritası

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           VERİ MODELİ HARİTASI                              │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                          BACKEND                                     │  │
│   │                                                                      │  │
│   │   ┌───────────────┐   ┌───────────────┐   ┌───────────────┐         │  │
│   │   │   LICENSE     │   │    USAGE      │   │   LEARNING    │         │  │
│   │   │               │   │               │   │               │         │  │
│   │   │ • Paket       │   │ • Token log   │   │ • Corrections │         │  │
│   │   │ • Kullanıcılar│   │ • Kota        │   │ • Patterns    │         │  │
│   │   │ • Cihaz       │   │ • Rapor       │   │ • Feedback    │         │  │
│   │   └───────────────┘   └───────────────┘   └───────────────┘         │  │
│   │                                                                      │  │
│   │   ┌───────────────┐   ┌───────────────┐                              │  │
│   │   │   TELEGRAM    │   │  PENDING DOCS │                              │  │
│   │   │               │   │               │                              │  │
│   │   │ • Kayıtlar    │   │ • Bekleyen    │                              │  │
│   │   │ • Kodlar      │   │ • Onaylananlar│                              │  │
│   │   └───────────────┘   └───────────────┘                              │  │
│   │                                                                      │  │
│   └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                          DESKTOP (LOKAL)                             │  │
│   │                                                                      │  │
│   │   ┌───────────────┐   ┌───────────────┐   ┌───────────────┐         │  │
│   │   │   CONFIG      │   │  MUKELLEFLER  │   │  ROUTING LOG  │         │  │
│   │   │               │   │               │   │               │         │  │
│   │   │ • Ayarlar     │   │ • Firma bilgi │   │ • Taşıma log  │         │  │
│   │   │ • Paths       │   │ • VKN/TC      │   │ • İstatistik  │         │  │
│   │   └───────────────┘   └───────────────┘   └───────────────┘         │  │
│   │                                                                      │  │
│   │   ┌───────────────┐   ┌───────────────┐                              │  │
│   │   │ OFFLINE QUEUE │   │ PATTERN CACHE │                              │  │
│   │   │               │   │               │                              │  │
│   │   │ • Bekleyenler │   │ • Lokal copy  │                              │  │
│   │   └───────────────┘   └───────────────┘                              │  │
│   │                                                                      │  │
│   └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 1️⃣ Lisans (License)

### Şema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "License",
  "type": "object",
  "required": ["license_id", "owner", "package", "created_at", "expires_at"],
  "properties": {
    "license_id": {
      "type": "string",
      "pattern": "^DMZ-[A-Za-z0-9]{8,}$",
      "description": "Benzersiz lisans kimliği"
    },
    "owner": {
      "type": "object",
      "required": ["name", "email"],
      "properties": {
        "name": { "type": "string" },
        "email": { "type": "string", "format": "email" },
        "phone": { "type": "string" },
        "company": { "type": "string" }
      }
    },
    "package": {
      "type": "string",
      "enum": ["BASIC", "PREMIUM", "ENTERPRISE"]
    },
    "limits": {
      "type": "object",
      "properties": {
        "max_users": { "type": "integer", "minimum": 1 },
        "monthly_tokens": { "type": "integer" },
        "daily_limit": { "type": ["integer", "null"] }
      }
    },
    "users": {
      "type": "array",
      "items": { "$ref": "#/definitions/User" }
    },
    "active_device": {
      "type": ["string", "null"],
      "description": "Aktif cihaz fingerprint"
    },
    "features": {
      "type": "array",
      "items": { "type": "string" },
      "description": "Aktif özellikler: telegram, learning, priority_support"
    },
    "created_at": { "type": "string", "format": "date-time" },
    "expires_at": { "type": "string", "format": "date-time" },
    "status": {
      "type": "string",
      "enum": ["active", "expired", "suspended", "trial"]
    }
  },
  "definitions": {
    "User": {
      "type": "object",
      "required": ["id", "name", "role"],
      "properties": {
        "id": { "type": "string" },
        "name": { "type": "string" },
        "role": { "type": "string", "enum": ["OWNER", "OPERATOR", "VIEWER"] },
        "telegram_id": { "type": ["string", "null"] },
        "registration_code": { "type": ["string", "null"] },
        "code_expires_at": { "type": ["string", "null"], "format": "date-time" },
        "permissions": {
          "type": "array",
          "items": { "type": "string" }
        },
        "created_at": { "type": "string", "format": "date-time" }
      }
    }
  }
}
```

### Örnek

```json
{
  "license_id": "DMZ-XyZ12345AbC",
  "owner": {
    "name": "Ahmet Yılmaz",
    "email": "ahmet@aceromuhasebe.com",
    "phone": "+905321234567",
    "company": "Acero Muhasebe"
  },
  "package": "PREMIUM",
  "limits": {
    "max_users": 3,
    "monthly_tokens": 500000,
    "daily_limit": 50000
  },
  "users": [
    {
      "id": "user_001",
      "name": "Ahmet Yılmaz",
      "role": "OWNER",
      "telegram_id": "123456789",
      "permissions": ["all"],
      "created_at": "2026-01-01T00:00:00Z"
    },
    {
      "id": "user_002",
      "name": "Ayşe Kaya",
      "role": "OPERATOR",
      "telegram_id": "987654321",
      "permissions": ["approve", "view"],
      "created_at": "2026-01-15T00:00:00Z"
    }
  ],
  "active_device": "fp_abc123def456",
  "features": ["telegram", "learning"],
  "created_at": "2026-01-01T00:00:00Z",
  "expires_at": "2027-01-01T00:00:00Z",
  "status": "active"
}
```

---

## 2️⃣ Token Kullanım Logu (Usage Log)

### Şema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "UsageLog",
  "type": "object",
  "required": ["id", "license_id", "timestamp", "operation", "tokens"],
  "properties": {
    "id": { "type": "string" },
    "license_id": { "type": "string" },
    "timestamp": { "type": "string", "format": "date-time" },
    "operation": {
      "type": "string",
      "enum": ["document_analysis", "pattern_sync", "batch_analysis"]
    },
    "tokens": {
      "type": "object",
      "required": ["input", "output", "total"],
      "properties": {
        "input": { "type": "integer" },
        "output": { "type": "integer" },
        "total": { "type": "integer" }
      }
    },
    "cost_usd": { "type": "number" },
    "document_type": { "type": "string" },
    "pattern_applied": { "type": ["string", "null"] },
    "success": { "type": "boolean" },
    "error": { "type": ["string", "null"] }
  }
}
```

### Örnek (JSONL formatı)

```jsonl
{"id":"log_001","license_id":"DMZ-xyz","timestamp":"2026-02-05T01:40:00Z","operation":"document_analysis","tokens":{"input":4200,"output":850,"total":5050},"cost_usd":0.00057,"document_type":"banka-dekontu","pattern_applied":"pattern_001","success":true,"error":null}
{"id":"log_002","license_id":"DMZ-xyz","timestamp":"2026-02-05T01:41:00Z","operation":"document_analysis","tokens":{"input":3800,"output":720,"total":4520},"cost_usd":0.00050,"document_type":"fatura","pattern_applied":null,"success":true,"error":null}
```

---

## 3️⃣ AI Analiz Sonucu (Analysis Result)

### Şema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "AnalysisResult",
  "type": "object",
  "required": ["belge_turu", "kimlikler", "dosyalama"],
  "properties": {
    "belge_turu": { "type": "string" },
    "belge_aciklama": { "type": "string" },
    
    "kimlikler": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["tip", "numara", "baglam"],
        "properties": {
          "tip": { "type": "string", "enum": ["VKN", "TC"] },
          "numara": { "type": "string" },
          "baglam": { 
            "type": "string",
            "enum": ["HESAP_SAHIBI", "SATICI", "ALICI", "VERGİ_SORUMLUSU", "DÜZENLEYEN", "ALACAKLI", "BORÇLU", "DİĞER"]
          },
          "firma_adi": { "type": "string" },
          "oncelik": { "type": "integer" }
        }
      }
    },
    
    "tarihler": {
      "type": "object",
      "properties": {
        "islem_tarihi": { "type": ["string", "null"], "format": "date" },
        "fatura_tarihi": { "type": ["string", "null"], "format": "date" },
        "duzenleme_tarihi": { "type": ["string", "null"], "format": "date" },
        "donem_baslangic": { "type": ["string", "null"], "format": "date" },
        "donem_bitis": { "type": ["string", "null"], "format": "date" },
        "vade_tarihi": { "type": ["string", "null"], "format": "date" }
      }
    },
    
    "dosyalama": {
      "type": "object",
      "required": ["yil", "ay"],
      "properties": {
        "tarih": { "type": "string", "format": "date" },
        "yil": { "type": "integer" },
        "ay": { "type": "integer", "minimum": 1, "maximum": 12 },
        "ay_adi": { "type": "string" },
        "aciklama": { "type": "string" }
      }
    },
    
    "ozet_bilgiler": {
      "type": "object",
      "properties": {
        "tutar": { "type": "number" },
        "para_birimi": { "type": "string", "default": "TRY" },
        "kdv": { "type": "number" },
        "islem_turu": { "type": "string" },
        "aciklama": { "type": "string" }
      }
    },
    
    "iletisim": {
      "type": "object",
      "properties": {
        "telefonlar": { "type": "array", "items": { "type": "string" } },
        "emailler": { "type": "array", "items": { "type": "string" } },
        "adres": { "type": ["string", "null"] }
      }
    },
    
    "ek_bilgiler": {
      "type": "object",
      "properties": {
        "banka_adi": { "type": ["string", "null"] },
        "hesap_no": { "type": ["string", "null"] },
        "iban": { "type": ["string", "null"] },
        "ticaret_sicil": { "type": ["string", "null"] },
        "vergi_dairesi": { "type": ["string", "null"] },
        "faaliyet_kodu": { "type": ["string", "null"] }
      }
    },
    
    "guven_skoru": { "type": "integer", "minimum": 0, "maximum": 100 }
  }
}
```

---

## 4️⃣ Düzeltme Kaydı (Correction)

### Şema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Correction",
  "type": "object",
  "required": ["id", "timestamp", "document_context", "correction"],
  "properties": {
    "id": { "type": "string" },
    "timestamp": { "type": "string", "format": "date-time" },
    
    "document_context": {
      "type": "object",
      "required": ["type"],
      "properties": {
        "type": { "type": "string" },
        "source_hints": { "type": "array", "items": { "type": "string" } },
        "content_hash": { "type": "string" },
        "keywords": { "type": "array", "items": { "type": "string" } }
      }
    },
    
    "correction": {
      "type": "object",
      "required": ["field", "ai_value", "user_value"],
      "properties": {
        "field": { "type": "string" },
        "ai_value": {},
        "user_value": {},
        "ai_confidence": { "type": "integer" },
        "reason_detected": { "type": ["string", "null"] }
      }
    },
    
    "metadata": {
      "type": "object",
      "properties": {
        "license_id": { "type": "string" },
        "user_role": { "type": "string" },
        "total_corrections_in_session": { "type": "integer" }
      }
    }
  }
}
```

---

## 5️⃣ Pattern

### Şema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Pattern",
  "type": "object",
  "required": ["id", "version", "status", "trigger", "action"],
  "properties": {
    "id": { "type": "string" },
    "version": { "type": "string" },
    "status": { "type": "string", "enum": ["active", "pending", "disabled"] },
    
    "trigger": {
      "type": "object",
      "required": ["document_type"],
      "properties": {
        "document_type": { "type": "string" },
        "source_contains": { "type": "array", "items": { "type": "string" } },
        "content_contains": { "type": "array", "items": { "type": "string" } }
      }
    },
    
    "action": {
      "type": "object",
      "required": ["field", "rule"],
      "properties": {
        "field": { "type": "string" },
        "rule": { "type": "string" },
        "description": { "type": "string" }
      }
    },
    
    "statistics": {
      "type": "object",
      "properties": {
        "based_on_corrections": { "type": "integer" },
        "consistency": { "type": "number", "minimum": 0, "maximum": 1 },
        "first_seen": { "type": "string", "format": "date-time" },
        "last_updated": { "type": "string", "format": "date-time" },
        "positive_feedback": { "type": "integer" },
        "negative_feedback": { "type": "integer" }
      }
    }
  }
}
```

---

## 6️⃣ Mükellef (lokal)

### Şema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Mukellef",
  "type": "object",
  "required": ["id", "firma_adi"],
  "properties": {
    "id": { "type": "string" },
    "firma_adi": { "type": "string" },
    "vergi_no": { "type": ["string", "null"] },
    "tc_no": { "type": ["string", "null"] },
    "vergi_dairesi": { "type": ["string", "null"] },
    "telefon": { "type": ["string", "null"] },
    "email": { "type": ["string", "null"] },
    "adres": { "type": ["string", "null"] },
    "ticaret_sicil_no": { "type": ["string", "null"] },
    "faaliyet_kodu": { "type": ["string", "null"] },
    "kategori": { "type": ["string", "null"] },
    "notlar": { "type": ["string", "null"] },
    "aktif": { "type": "boolean", "default": true },
    "olusturma_tarihi": { "type": "string", "format": "date-time" },
    "guncelleme_tarihi": { "type": "string", "format": "date-time" }
  }
}
```

---

## 7️⃣ Routing Log (lokal)

### Şema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "RoutingLog",
  "type": "object",
  "required": ["id", "timestamp", "source_path", "target_path", "status"],
  "properties": {
    "id": { "type": "string" },
    "timestamp": { "type": "string", "format": "date-time" },
    "source_path": { "type": "string" },
    "target_path": { "type": "string" },
    "file_name": { "type": "string" },
    "file_hash": { "type": "string" },
    "file_size": { "type": "integer" },
    "document_type": { "type": "string" },
    "mukellef_id": { "type": ["string", "null"] },
    "mukellef_name": { "type": ["string", "null"] },
    "analysis_confidence": { "type": "integer" },
    "corrections_made": { "type": "integer" },
    "pattern_applied": { "type": ["string", "null"] },
    "tokens_used": { "type": "integer" },
    "processing_time_ms": { "type": "integer" },
    "status": { "type": "string", "enum": ["success", "failed", "cancelled"] },
    "error": { "type": ["string", "null"] },
    "approved_by": { "type": ["string", "null"] },
    "approval_source": { "type": "string", "enum": ["popup", "telegram", "auto"] }
  }
}
```

---

## 8️⃣ Offline Queue (lokal)

### Şema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "OfflineQueue",
  "type": "object",
  "required": ["version", "items"],
  "properties": {
    "version": { "type": "integer" },
    "last_check": { "type": "string", "format": "date-time" },
    "items": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["id", "added_at", "file_path", "status"],
        "properties": {
          "id": { "type": "string" },
          "added_at": { "type": "string", "format": "date-time" },
          "file_path": { "type": "string" },
          "file_hash": { "type": "string" },
          "file_name": { "type": "string" },
          "extracted_content": { "type": "string" },
          "detected_type": { "type": ["string", "null"] },
          "priority": { "type": "integer" },
          "status": { "type": "string", "enum": ["pending", "processing", "failed"] },
          "retry_count": { "type": "integer" },
          "last_error": { "type": ["string", "null"] }
        }
      }
    }
  }
}
```
