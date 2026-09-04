# Vishnu Pratap Singh — Ransomware Solutions & Data Recovery Services

A premium, high-end cybersecurity and data recovery consultancy website built for **Vishnu Pratap Singh**, based in Lucknow, Uttar Pradesh.

Live GitHub Pages URL: **[https://rahul2003-debug-code.github.io/vishnu/](https://rahul2003-debug-code.github.io/vishnu/)**

---

## 🛡️ Features & Highlights

- **Aesthetic**: Deep midnight navy, metallic champagne gold typography & accents, glassmorphic translucent panels, and cyber telemetry indicators.
- **Hero Section**:
  - High-impact tagline: `RECOVER. PROTECT. RESTORE.`
  - Direct services summary and contact card (Lucknow, UP | +91 9170409556).
  - High-resolution portrait framed in a luxury gold circular bezel with multi-layer animated cyber HUD rings and floating security badges.
- **Interactive Background**: HTML5 Canvas particle/grid node network with cursor interaction and `prefers-reduced-motion` compliance.
- **Core Sections**:
  1. **Navbar**: Dynamic glassmorphism header with mobile hamburger drawer.
  2. **Hero**: Two-column layout with instant hotline trigger and service exploration.
  3. **Services**: 4 structured cards covering Ransomware Decryption, Ransomware Analysis, Data Recovery, and Threat Prevention.
  4. **Why Choose Us**: 4 institutional-grade pillars (Confidential Handling, Technical Expertise, Recovery-Focused Approach, Security First).
  5. **Recovery Process**: Visual 4-stage connected workflow (Assessment → Analysis → Recovery → Protection).
  6. **Technical Expertise**: Capability domains without fabricated percentage statistics.
  7. **About**: Professional profile strictly based on verified facts.
  8. **Emergency CTA**: Full-width urgent incident response banner with direct calling.
  9. **Contact & Inquiry**: Direct phone hotline, one-click WhatsApp chat, and a client-side inquiry form that seamlessly formats case details and launches the user's email client.
  10. **Footer**: Quick navigation, location credentials, and back-to-top scroll.
- **Standards & SEO**:
  - Semantic HTML5, Schema.org `ProfessionalService` JSON-LD metadata, OpenGraph & Twitter Cards.
  - Zero heavy framework dependencies — pure HTML5, modern CSS3, and vanilla JavaScript.
  - 100% relative paths for seamless GitHub Pages subpath compatibility (`/vishnu/`).

---

## 📁 Repository Structure

```
vishnu/
├── index.html              # Main single-page HTML5 document
├── style.css               # Luxury cybersecurity styling & responsive rules
├── script.js               # Canvas particle grid, mobile drawer, scrollspy, contact handler
├── 404.html                # Cybersecurity-themed 404 fallback page
├── .nojekyll               # Prevents Jekyll asset filtering on GitHub Pages
├── README.md               # Project documentation and deployment guide
├── .github/
│   └── workflows/
│       └── deploy.yml      # Automated GitHub Actions deployment to Pages
└── assets/
    ├── vishnu-pratap-singh.jpg  # High-resolution portrait asset
    ├── favicon.svg              # Custom gold VPS cyber shield SVG icon
    └── site.webmanifest         # Mobile web manifest metadata
```

---

## 💻 Local Testing

You can test this website locally with any static web server:

### Using Python:
```bash
python3 -m http.server 8000
```
Open your browser at: `http://localhost:8000`

---

## 🚀 How to Push to GitHub & Enable GitHub Pages

### 1. Initialize & Push to GitHub:
If git is installed on your workstation, run:
```bash
git init
git add .
git commit -m "feat: complete premium cybersecurity website for Vishnu Pratap Singh"
git branch -M main
git remote add origin https://github.com/rahul2003-debug-code/vishnu.git
git push -u origin main --force
```

### 2. Enable GitHub Pages in Repository Settings:
1. Go to your GitHub repository: [https://github.com/rahul2003-debug-code/vishnu](https://github.com/rahul2003-debug-code/vishnu)
2. Click **Settings** (top right tab).
3. On the left sidebar, click **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch` (or choose `GitHub Actions` to use `.github/workflows/deploy.yml`).
   - **Branch**: Select `main`, folder `/ (root)`, and click **Save**.
5. Within 1–2 minutes, your website will be live at:
   **https://rahul2003-debug-code.github.io/vishnu/**
