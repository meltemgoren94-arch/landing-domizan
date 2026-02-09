import React from 'react';
import { FAQItem } from '@/types';

/**
 * FAQ data for the landing page
 */
const faqItems: FAQItem[] = [
    {
        question: "Domizan nedir?",
        answer: "Domizan, mali müşavirler için geliştirilmiş yapay zeka destekli bir asistan yazılımıdır. Evrak analizi, otomatik klasörleme ve beyanname takibi gibi işlemleri otomatikleştirir."
    },
    {
        question: "Domizan güvenli mi?",
        answer: "Evet, Domizan KVKK ve GDPR uyumludur. Verileriniz bulutta değil, kendi bilgisayarınızda saklanır. 256-bit şifreleme kullanılır."
    },
    {
        question: "Domizan nasıl çalışır?",
        answer: "3 basit adımda: 1) Evrakları sürükle bırak ile yükleyin. 2) Yapay zeka otomatik analiz etsin. 3) Belgeler otomatik olarak ilgili mükellef klasörüne kaydedilsin."
    },
    {
        question: "Domizan'ın fiyatı nedir?",
        answer: "Domizan'ı ücretsiz deneyebilirsiniz. Detaylı fiyatlandırma için bizimle iletişime geçin."
    }
];

/**
 * Generates all JSON-LD structured data for SEO, GEO, and AEO
 */
const getStructuredData = () => {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Domizan",
        "url": "https://domizan.com",
        "logo": "https://domizan.com/logo.png",
        "description": "Yapay zeka destekli mali müşavir asistanı",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "0850 123 45 67",
            "email": "info@domizan.com",
            "contactType": "customer support",
            "availableLanguage": "Turkish"
        },
        "sameAs": []
    };

    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Domizan",
        "operatingSystem": "Windows, macOS",
        "applicationCategory": "BusinessApplication",
        "description": "Yapay zeka destekli mali müşavir asistanı. Evrak analizi, otomatik klasörleme ve beyanname takibi.",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "TRY"
        },
        "featureList": [
            "Akıllı Belge Analizi",
            "Otomatik Tasnif",
            "Telegram Sabah Brifingi",
            "Resmi Gazete Takibi"
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "150"
        }
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };

    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "Domizan ile Evrak Nasıl Tasnif Edilir",
        "description": "Domizan kullanarak evrakları 3 adımda otomatik tasnif edin.",
        "step": [
            {
                "@type": "HowToStep",
                "position": 1,
                "name": "Evrak Yükle",
                "text": "PDF, fotoğraf veya Excel dosyasını sürükle bırak ile yükleyin."
            },
            {
                "@type": "HowToStep",
                "position": 2,
                "name": "AI Analiz Etsin",
                "text": "Yapay zeka otomatik olarak vergi numarası, tutar ve tarih bilgilerini çıkarır."
            },
            {
                "@type": "HowToStep",
                "position": 3,
                "name": "Otomatik Klasörle",
                "text": "Belge otomatik olarak ilgili mükellef klasörüne kaydedilir."
            }
        ]
    };

    return [organizationSchema, softwareSchema, faqSchema, howToSchema];
};

/**
 * StructuredData - Injects JSON-LD structured data for SEO/GEO/AEO
 * Should be included in the document head
 */
export const StructuredData: React.FC = () => {
    const schemas = getStructuredData();

    return (
        <>
            {schemas.map((schema, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
        </>
    );
};

export default StructuredData;
