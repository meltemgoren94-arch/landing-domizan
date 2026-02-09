# SEO, GEO & AEO Requirements Specification

## Overview

This document outlines the requirements for implementing:
- **SEO** (Search Engine Optimization)
- **GEO** (Generative Engine Optimization) - Optimization for AI search engines like ChatGPT, Bard, Perplexity
- **AEO** (Answer Engine Optimization) - Optimization for featured snippets and voice search

---

## 1. SEO Requirements

### 1.1 Meta Tags

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Domizan: Yapay zeka destekli mali müşavir asistanı. Evrak analizi, otomatik klasörleme ve beyanname takibini 10 saatten 60 saniyeye indirin. KVKK uyumlu, verileriniz sizde.">
<meta name="keywords" content="mali müşavir yazılımı, muhasebe otomasyon, yapay zeka muhasebe, KVKK, evrak yönetimi, beyanname takibi, telegram entegrasyonu">
<meta name="author" content="Domizan">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://domizan.com">
```

### 1.2 Open Graph Tags

```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://domizan.com">
<meta property="og:title" content="Domizan - AI Destekli Mali Müşavir Asistanı">
<meta property="og:description" content="Haftada 10 saatlik rapor işini 60 saniyeye indirin. Yapay zeka destekli evrak analizi ve otomatik klasörleme.">
<meta property="og:image" content="https://domizan.com/og-image.png">
<meta property="og:locale" content="tr_TR">
```

### 1.3 Twitter Card Tags

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Domizan - AI Destekli Mali Müşavir Asistanı">
<meta name="twitter:description" content="Haftada 10 saatlik rapor işini 60 saniyeye indirin.">
<meta name="twitter:image" content="https://domizan.com/og-image.png">
```

### 1.4 Semantic HTML Structure

```html
<header role="banner">      <!-- Navigation -->
<main role="main">          <!-- Main content -->
  <section aria-labelledby="hero-title">
  <section aria-labelledby="problems-title">
  <section aria-labelledby="steps-title">
  <section aria-labelledby="features-title">
  <section aria-labelledby="security-title">
</main>
<footer role="contentinfo"> <!-- Footer -->
```

---

## 2. GEO Requirements (Generative Engine Optimization)

### 2.1 Content Structure for AI Comprehension

- **Clear Headers**: Use H1 → H2 → H3 hierarchy
- **Concise Answers**: Lead paragraphs should answer questions directly
- **Factual Claims**: Include statistics and credible data
- **Table Format**: Use tables for comparative data

### 2.2 Schema.org Markup

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Domizan",
  "operatingSystem": "Windows, macOS",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "TRY"
  },
  "description": "AI destekli mali müşavir asistanı",
  "featureList": [
    "Akıllı Belge Analizi",
    "Otomatik Tasnif",
    "Telegram Entegrasyonu",
    "Resmi Gazete Takibi"
  ]
}
```

### 2.3 Organization Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Domizan",
  "url": "https://domizan.com",
  "logo": "https://domizan.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "0850 123 45 67",
    "email": "info@domizan.com",
    "contactType": "customer support"
  }
}
```

---

## 3. AEO Requirements (Answer Engine Optimization)

### 3.1 FAQ Schema

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Domizan nedir?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Domizan, mali müşavirler için geliştirilmiş yapay zeka destekli bir asistan yazılımıdır. Evrak analizi, otomatik klasörleme ve beyanname takibi gibi işlemleri otomatikleştirir."
      }
    },
    {
      "@type": "Question",
      "name": "Domizan güvenli mi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Evet, Domizan KVKK ve GDPR uyumludur. Verileriniz bulutta değil, kendi bilgisayarınızda saklanır. 256-bit şifreleme kullanılır."
      }
    },
    {
      "@type": "Question",
      "name": "Domizan nasıl çalışır?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "3 basit adımda: 1) Evrakları sürükle bırak ile yükleyin. 2) Yapay zeka otomatik analiz etsin. 3) Belgeler otomatik olarak ilgili mükellef klasörüne kaydedilsin."
      }
    }
  ]
}
```

### 3.2 HowTo Schema

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Domizan ile Evrak Nasıl Tasnif Edilir",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Evrak Yükle",
      "text": "PDF, fotoğraf veya Excel dosyasını sürükle bırak ile yükleyin."
    },
    {
      "@type": "HowToStep",
      "name": "AI Analiz Etsin",
      "text": "Yapay zeka otomatik olarak vergi numarası, tutar ve tarih bilgilerini çıkarır."
    },
    {
      "@type": "HowToStep",
      "name": "Otomatik Klasörle",
      "text": "Belge otomatik olarak ilgili mükellef klasörüne kaydedilir."
    }
  ]
}
```

### 3.3 Voice Search Optimization

- Use natural language (conversational tone)
- Answer questions directly in first 2-3 sentences
- Use question-based headings where appropriate

---

## 4. Technical SEO Checklist

| Requirement | Status | Priority |
|-------------|--------|----------|
| Title tag (50-60 chars) | ❌ | High |
| Meta description (150-160 chars) | ❌ | High |
| H1 tag (single) | ✅ | High |
| H2-H6 hierarchy | ✅ | High |
| Image alt texts | ❌ | Medium |
| Canonical URL | ❌ | Medium |
| robots.txt | ❌ | Medium |
| sitemap.xml | ❌ | Low |
| SSL certificate | N/A | High |
| Mobile responsive | ⚠️ | High |
| Page speed (Core Web Vitals) | ⚠️ | Medium |
| Schema.org markup | ❌ | High |
| Open Graph tags | ❌ | Medium |
| Twitter Cards | ❌ | Low |

---

## 5. Implementation Priority

### Phase 1: Essential (Immediate)
1. Meta tags (title, description)
2. Semantic HTML structure
3. Image alt texts
4. Mobile navigation

### Phase 2: Important (High Impact)
5. Schema.org markup (Organization, SoftwareApplication)
6. FAQPage schema
7. Open Graph tags
8. robots.txt

### Phase 3: Enhancement (Future)
9. Twitter Cards
10. sitemap.xml
11. HowTo schema
12. Speakable markup for voice search
