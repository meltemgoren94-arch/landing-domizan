# 06 - Federatif Öğrenme Sistemi

## 🎯 Amaç

Tüm müşterilerin yaptığı düzeltmelerden öğrenerek zamanla daha akıllı hale gelen bir sistem.

**Prensip:** Bir müşterinin düzeltmesi, diğer müşterilere fayda sağlar.

---

## 🔄 Genel Akış

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ÖĞRENME DÖNGÜSÜ                                   │
│                                                                             │
│   ┌──────────────────────────────────────────────────────────────────────┐ │
│   │                         MÜŞTERİLER                                    │ │
│   │                                                                       │ │
│   │   Müşteri A          Müşteri B          Müşteri C                     │ │
│   │   ┌─────────┐       ┌─────────┐       ┌─────────┐                     │ │
│   │   │ Belge   │       │ Belge   │       │ Belge   │                     │ │
│   │   │ Analiz  │       │ Analiz  │       │ Analiz  │                     │ │
│   │   └────┬────┘       └────┬────┘       └────┬────┘                     │ │
│   │        │                 │                 │                          │ │
│   │        ▼                 ▼                 ▼                          │ │
│   │   ┌─────────┐       ┌─────────┐       ┌─────────┐                     │ │
│   │   │ Düzeltme│       │ Düzeltme│       │ Düzeltme│                     │ │
│   │   │ (Popup) │       │ (Popup) │       │ (Popup) │                     │ │
│   │   └────┬────┘       └────┬────┘       └────┬────┘                     │ │
│   │        │                 │                 │                          │ │
│   └────────┼─────────────────┼─────────────────┼──────────────────────────┘ │
│            │                 │                 │                            │
│            └─────────────────┼─────────────────┘                            │
│                              │ Düzeltmeler (anonim)                         │
│                              ▼                                              │
│   ┌──────────────────────────────────────────────────────────────────────┐ │
│   │                      DOMIZAN BACKEND                                  │ │
│   │                                                                       │ │
│   │   ┌─────────────────────────────────────────────────────────────┐    │ │
│   │   │                  CORRECTION DATABASE                         │    │ │
│   │   │                                                              │    │ │
│   │   │  ┌──────────────────────────────────────────────────────┐   │    │ │
│   │   │  │ Garanti Dekont + "valör" → işlem_tarihi kullan (x15) │   │    │ │
│   │   │  │ Ziraat Dekont + "referans" → işlem_tarihi (x8)       │   │    │ │
│   │   │  │ Fatura + "vade" → fatura_tarihi (x22)                │   │    │ │
│   │   │  └──────────────────────────────────────────────────────┘   │    │ │
│   │   └─────────────────────────────────────────────────────────────┘    │ │
│   │                              │                                        │ │
│   │                              │ 10+ benzer düzeltme                    │ │
│   │                              ▼                                        │ │
│   │   ┌─────────────────────────────────────────────────────────────┐    │ │
│   │   │                    PATTERN ENGINE                            │    │ │
│   │   │                                                              │    │ │
│   │   │  ➜ Pattern oluştur: "Garanti dekontlarında valör kelimesi   │    │ │
│   │   │    varsa dosyalama tarihi olarak işlem tarihini kullan"     │    │ │
│   │   └─────────────────────────────────────────────────────────────┘    │ │
│   │                              │                                        │ │
│   └──────────────────────────────┼────────────────────────────────────────┘ │
│                                  │                                          │
│                                  │ Pattern dağıtımı                         │
│                                  ▼                                          │
│   ┌──────────────────────────────────────────────────────────────────────┐ │
│   │                         TÜM MÜŞTERİLER                                │ │
│   │                                                                       │ │
│   │   Müşteri A          Müşteri B          Müşteri C          Müşteri D  │ │
│   │   ┌─────────┐       ┌─────────┐       ┌─────────┐       ┌─────────┐   │ │
│   │   │ Pattern │       │ Pattern │       │ Pattern │       │ Pattern │   │ │
│   │   │ Cache   │       │ Cache   │       │ Cache   │       │ Cache   │   │ │
│   │   │   ↓     │       │   ↓     │       │   ↓     │       │   ↓     │   │ │
│   │   │ Artık   │       │ Artık   │       │ Artık   │       │ Daha    │   │ │
│   │   │ hatasız │       │ hatasız │       │ hatasız │       │ akıllı! │   │ │
│   │   └─────────┘       └─────────┘       └─────────┘       └─────────┘   │ │
│   └──────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📝 Düzeltme Verisi Yapısı

### Düzeltme Nesnesini Ne Zaman Oluşturuyoruz?

```
Popup'ta kullanıcı bir alanı değiştirdiğinde:

AI Çıktısı:                    Kullanıcı Düzeltmesi:
┌─────────────────────────┐    ┌─────────────────────────┐
│ dosyalama.ay: 12        │ ➜  │ dosyalama.ay: 1         │
│ dosyalama.yil: 2025     │ ➜  │ dosyalama.yil: 2026     │
└─────────────────────────┘    └─────────────────────────┘

                    ▼ DÜZELTME KAYDI OLUŞTUR
```

### Düzeltme JSON Yapısı

```json
{
  "id": "corr_1707091200_abc123",
  "timestamp": "2026-02-05T01:40:00Z",
  
  "document_context": {
    "type": "banka-dekontu",
    "source_hints": ["garanti", "havale"],
    "content_hash": "sha256:abc123...",
    "keywords": ["valör", "işlem tarihi", "referans no"]
  },
  
  "correction": {
    "field": "dosyalama.ay",
    "ai_value": 12,
    "user_value": 1,
    "ai_confidence": 75,
    "reason_detected": "valör_vs_islem_tarihi"
  },
  
  "metadata": {
    "license_id": "DMZ-xxx",
    "user_role": "OPERATOR",
    "total_corrections_in_session": 1
  }
}
```

### Anonim Veri - Ne Paylaşılmaz

| Alan | Paylaşılır | Paylaşılmaz |
|------|------------|-------------|
| Belge türü | ✅ | |
| Anahtar kelimeler | ✅ | |
| Düzeltme alanı/değer | ✅ | |
| Kaynak ipuçları (banka adı) | ✅ | |
| VKN/TC | | ❌ |
| Firma adı | | ❌ |
| Tutarlar | | ❌ |
| Belge içeriği | | ❌ |
| Lisans sahibi adı | | ❌ |

---

## 🧠 Pattern Oluşturma

### Pattern Engine Algoritması

```javascript
// pattern-engine.js

class PatternEngine {
    constructor() {
        this.MIN_OCCURRENCES = 10;      // Minimum düzeltme sayısı
        this.CONFIDENCE_THRESHOLD = 0.8; // Minimum tutarlılık
    }
    
    async generatePatterns() {
        // 1. Tüm düzeltmeleri grupla
        const groups = await this.groupCorrections();
        
        // 2. Her grup için pattern kontrolü
        for (const group of groups) {
            if (group.corrections.length >= this.MIN_OCCURRENCES) {
                const consistency = this.calculateConsistency(group);
                
                if (consistency >= this.CONFIDENCE_THRESHOLD) {
                    await this.createPattern(group);
                }
            }
        }
    }
    
    groupCorrections() {
        // Benzer düzeltmeleri grupla
        // Kriterler:
        // - Aynı belge türü
        // - Aynı düzeltme alanı
        // - Benzer anahtar kelimeler
        return db.aggregate([
            {
                $group: {
                    _id: {
                        doc_type: "$document_context.type",
                        field: "$correction.field",
                        source: { $arrayElemAt: ["$document_context.source_hints", 0] }
                    },
                    corrections: { $push: "$$ROOT" },
                    count: { $sum: 1 }
                }
            },
            { $match: { count: { $gte: this.MIN_OCCURRENCES } } }
        ]);
    }
    
    calculateConsistency(group) {
        // Düzeltmelerin ne kadar tutarlı olduğunu hesapla
        // Örnek: 15 düzeltmeden 14'ü aynı yöndeyse = %93 tutarlılık
        
        const corrections = group.corrections;
        const directions = corrections.map(c => ({
            from: c.correction.ai_value,
            to: c.correction.user_value
        }));
        
        // En yaygın düzeltme yönünü bul
        const directionCounts = {};
        for (const d of directions) {
            const key = JSON.stringify(d);
            directionCounts[key] = (directionCounts[key] || 0) + 1;
        }
        
        const maxCount = Math.max(...Object.values(directionCounts));
        return maxCount / corrections.length;
    }
}
```

### Pattern Yapısı

```json
{
  "id": "pattern_001",
  "version": "2026-02-05",
  "status": "active",
  
  "trigger": {
    "document_type": "banka-dekontu",
    "source_contains": ["garanti"],
    "content_contains": ["valör", "işlem tarihi"]
  },
  
  "action": {
    "field": "dosyalama_tarihi",
    "rule": "USE_ISLEM_TARIHI_NOT_VALOR",
    "description": "Garanti dekontlarında valör yerine işlem tarihini kullan"
  },
  
  "statistics": {
    "based_on_corrections": 47,
    "consistency": 0.94,
    "first_seen": "2026-01-15T00:00:00Z",
    "last_updated": "2026-02-05T00:00:00Z"
  }
}
```

---

## 📤 Pattern Dağıtımı

### Desktop Pattern Sync

```javascript
// learning-cache.js

class LearningCache {
    constructor() {
        this.patterns = [];
        this.lastSync = null;
        this.SYNC_INTERVAL = 6 * 60 * 60 * 1000; // 6 saat
    }
    
    async syncPatterns() {
        try {
            const response = await backend.get('/learning/patterns', {
                params: { since: this.lastSync }
            });
            
            if (response.data.patterns.length > 0) {
                this.patterns = [
                    ...this.patterns.filter(p => 
                        !response.data.patterns.find(np => np.id === p.id)
                    ),
                    ...response.data.patterns
                ];
                
                await this.saveToFile();
                console.log(`[LearningCache] ${response.data.patterns.length} pattern güncellendi`);
            }
            
            this.lastSync = new Date().toISOString();
        } catch (error) {
            console.warn('[LearningCache] Sync başarısız, cache kullanılıyor');
        }
    }
    
    findMatchingPattern(documentContext) {
        for (const pattern of this.patterns) {
            if (this.matchesTrigger(documentContext, pattern.trigger)) {
                return pattern;
            }
        }
        return null;
    }
    
    matchesTrigger(doc, trigger) {
        // Belge türü eşleşmeli
        if (trigger.document_type !== doc.type) return false;
        
        // Kaynak ipuçları kontrolü
        if (trigger.source_contains) {
            const hasSource = trigger.source_contains.some(s => 
                doc.source_hints?.some(h => h.toLowerCase().includes(s))
            );
            if (!hasSource) return false;
        }
        
        // İçerik kontrolü
        if (trigger.content_contains) {
            const hasContent = trigger.content_contains.every(c =>
                doc.keywords?.some(k => k.toLowerCase().includes(c))
            );
            if (!hasContent) return false;
        }
        
        return true;
    }
}
```

### Pattern Uygulama Akışı

```
Yeni Belge                  DocumentFlow               LearningCache
    │                            │                          │
    │ İşlenecek                  │                          │
    │───────────────────────────►│                          │
    │                            │                          │
    │                            │ Pattern ara              │
    │                            │─────────────────────────►│
    │                            │                          │
    │                            │ ◄─────────────────────────│
    │                            │ pattern_001 bulundu      │
    │                            │                          │
    │                            │ AI Prompt'a hint ekle:   │
    │                            │ "Bu Garanti dekontu,     │
    │                            │  valör yerine işlem      │
    │                            │  tarihini kullan"        │
    │                            │                          │
    │                            │ Backend'e gönder         │
    │                            │─────────────────────────►│
    │                            │                          │
    │                            │      ... analiz ...      │
```

---

## 🔍 Prompt'a Pattern Hint Ekleme

### Önce (Pattern yok)

```
Sen bir Türk mali müşavir asistanısın. Bu belgeyi analiz et...
[Belge içeriği]
```

### Sonra (Pattern var)

```
Sen bir Türk mali müşavir asistanısın. Bu belgeyi analiz et...

⚠️ ÖĞRENİLMİŞ KURAL:
Bu belge Garanti Bankası dekontu olarak görünüyor.
Daha önce yapılan analizlerde öğrenildi:
- "valör tarihi" ve "işlem tarihi" farklı olabilir
- Dosyalama için İŞLEM TARİHİ'ni kullan, valör tarihini değil
- Bu kural %94 tutarlılıkla 47 belgeden öğrenildi

[Belge içeriği]
```

---

## 📊 Öğrenme Metrikleri

### Admin Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│                    📈 ÖĞRENME İSTATİSTİKLERİ                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📊 GENEL DURUM                                                 │
│  ┌─────────────┬─────────────┬─────────────┬─────────────┐     │
│  │ Toplam      │ Aktif       │ Bekleyen    │ Bu Ay       │     │
│  │ Düzeltme    │ Pattern     │ Pattern     │ Düzeltme    │     │
│  │             │             │             │             │     │
│  │   12.450    │    156      │    23       │   2.180     │     │
│  └─────────────┴─────────────┴─────────────┴─────────────┘     │
│                                                                 │
│  🏆 EN ETKİLİ PATTERN'LAR                                       │
│  ┌───────────────────────────────────────────────┬──────────┐  │
│  │ Pattern                                        │ Etki     │  │
│  ├───────────────────────────────────────────────┼──────────┤  │
│  │ Garanti dekont valör/işlem tarihi             │ 2.340    │  │
│  │ Ziraat EFT referans numarası                  │ 1.890    │  │
│  │ E-fatura vade tarihi çıkarımı                 │ 1.560    │  │
│  └───────────────────────────────────────────────┴──────────┘  │
│                                                                 │
│  📈 HAFTALIK DÜZELTME TRENDİ                                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │       ▄▄▄                                                │   │
│  │      ▄███▄     ▄▄▄                                       │   │
│  │     ▄█████▄   ▄███▄    ▄▄                               │   │
│  │    ▄███████▄ ▄█████▄  ▄██▄   ▄▄                         │   │
│  │   Hft1  Hft2  Hft3  Hft4  Hft5                          │   │
│  │                                                          │   │
│  │   ↓ Düzeltme azalıyor = Sistem öğreniyor! ✅             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛡️ Güvenlik ve Onay

### Pattern Onay Süreci (Opsiyonel)

```
Otomatik Onay:
- Düzeltme sayısı >= 20
- Tutarlılık >= 95%
- Hiç geri bildirim şikayeti yok

Manuel Onay Gerektiren:
- Düzeltme sayısı 10-20
- Tutarlılık 80-95%
- Kritik alanları etkiliyor (VKN, tutar)
```

### Feedback Mekanizması

```
Popup'ta yanlış pattern uygulandıysa:

┌─────────────────────────────────────────────────────────────────┐
│  ⚠️ Bu analiz öğrenilmiş bir kurala dayanıyor                   │
│                                                                 │
│  "Garanti dekontlarında valör yerine işlem tarihini kullan"     │
│                                                                 │
│  Bu kural yanlış mı uygulandı?                                  │
│  [👎 Bu kural bu belge için yanlış]  [👍 Kural doğru]           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Negatif feedback → Pattern güvenliği düşer → Belirli eşiğin altına
düşerse pattern deaktive edilir veya manuel incelemeye alınır.
```
