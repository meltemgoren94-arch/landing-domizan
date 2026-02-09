# Domizan Project - Agent Reference Guide

## Overview

This document serves as the master reference for the Domizan React + Vite migration and SEO/GEO/AEO enhancement project.

---

## Quick Links to Reports

| Report | Description | Location |
|--------|-------------|----------|
| Project Analysis | Current structure, tech stack, issues | [01-project-analysis.md](./01-project-analysis.md) |
| SEO/GEO/AEO Requirements | Meta tags, Schema.org, voice search | [02-seo-geo-aeo-requirements.md](./02-seo-geo-aeo-requirements.md) |
| Feature Breakdown | 55 tasks across 9 features | [03-feature-breakdown.md](./03-feature-breakdown.md) |

---

## Project Summary

### What We're Building
A refactored version of the Domizan landing page that:
- Maintains **exact same visual design**
- Runs on **port 5173** via Vite
- Uses **React + Vite best practices** folder structure
- Implements **SEO, GEO, and AEO** compliance
- Is fully **responsive** with mobile navigation
- Integrates **BMAD-METHOD** development workflows

### Technology Stack
- **React** 18.3.1
- **Vite** 6.3.5
- **Tailwind CSS** 4.1.12
- **Framer Motion** 12.31.1
- **Radix UI** (48 components)
- **Lucide React** icons

---

## BMAD-METHOD Integration

The project includes BMAD-METHOD-main for agile development.

### Key Commands
```bash
# Get help on what to do next
/bmad-help

# Quick spec for analyzing codebase
/quick-spec

# Implement a story
/dev-story

# Validate code quality
/code-review
```

### Recommended Workflow
1. `/quick-spec` - Analyze and produce tech-spec with stories
2. `/dev-story` - Implement each story
3. `/code-review` - Validate quality

---

## Key Decisions

### 1. UI Preservation
No changes to visual design. Colors, spacing, typography, animations remain identical.

### 2. Component Extraction
4 inline components from App.tsx will be extracted:
- ProblemCard → `src/components/shared/ProblemCard.tsx`
- StepItem → `src/components/shared/StepItem.tsx`
- FeatureItem → `src/components/shared/FeatureItem.tsx`
- SecurityCard → `src/components/shared/SecurityCard.tsx`

### 3. SEO Strategy
- **SEO**: Meta tags, semantic HTML, alt texts
- **GEO**: Schema.org structured data (Organization, SoftwareApplication)
- **AEO**: FAQPage schema, HowTo schema, conversational content

### 4. Mobile Navigation
Hamburger menu appears at < 1024px (lg breakpoint)

---

## Folder Structure

```
src/
├── app/
│   ├── App.tsx
│   └── components/
│       ├── layout/          # Header, Footer, MobileNav
│       ├── seo/             # StructuredData
│       ├── shared/          # Reusable card components
│       └── ui/              # Radix UI components (existing)
├── types/                   # TypeScript interfaces
├── styles/                  # CSS files
└── main.tsx
```

---

## Verification Checklist

| Check | Command/Method | Expected |
|-------|----------------|----------|
| Build | `npm run build` | No errors |
| Dev Server | `npm run dev` | Port 5173 |
| TypeScript | `npx tsc --noEmit` | No errors |
| Lighthouse SEO | Chrome DevTools | Score ≥ 90 |
| Schema | validator.schema.org | No errors |
| Mobile Nav | 375px viewport | Hamburger visible |
| Visual Match | Side-by-side | Identical UI |

---

## File Change Summary

### Modified Files
1. `vite.config.ts` - Add port 5173 config
2. `index.html` - Add meta tags, structured data
3. `App.tsx` - Semantic HTML, import extracted components

### New Files
1. `src/types/index.ts`
2. `src/components/shared/ProblemCard.tsx`
3. `src/components/shared/StepItem.tsx`
4. `src/components/shared/FeatureItem.tsx`
5. `src/components/shared/SecurityCard.tsx`
6. `src/components/layout/MobileNav.tsx`
7. `src/components/seo/StructuredData.tsx`
8. `public/robots.txt`
9. `public/sitemap.xml`

---

## Contact & Resources

- **Email**: info@domizan.com
- **Phone**: 0850 123 45 67
- **BMAD-METHOD Docs**: [docs.bmad-method.org](http://docs.bmad-method.org)

---

*Last Updated: 2026-02-05*
