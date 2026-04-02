# 💻 Lionel Sisso — Full-Stack Architect Portfolio

A premium, fully responsive, glassmorphic portfolio designed with a **Hacker/Coder Green Theme**.
Built with pure HTML5, CSS3, and Vanilla JavaScript — zero frameworks, maximum performance.

---

## 📁 File Structure

```
portfolio/
├── index.html                ← Main HTML entry point
├── css/
│   ├── variables.css         ← Global CSS tokens (Hacker Green palette, typography)
│   ├── animations.css        ← Keyframes, scroll-reveal, preloader, lightbox
│   ├── style.css             ← Main component and glassmorphism styles
│   └── responsive.css        ← Media queries (mobile → large desktop)
├── js/
│   ├── main.js               ← Initialises modules, fetches GitHub stats
│   ├── navigation.js         ← Navbar scroll, active links, mobile menu
│   ├── animations.js         ← IntersectionObserver, carousels, particles
│   └── card-download.js      ← Logic for QR code generation and contact card download
├── assets/
│   ├── profile/
│   │   ├── profile-pic.jpg   ← About section portrait
│   │   └── profile-pic-2.jpeg← Hero section portrait
│   └── tulk/                 ← Tulk App Screenshots
│       ├── home.png
│       ├── discussions.png
│       ├── profile.png
│       └── profile-detail.png
├── template.png              ← Base subtle motherboard background texture
└── README.md
```

---

## 🚀 Getting Started

1. **Open** `index.html` in any modern browser — no build step needed.
2. Ensure you have internet connection for the CDN libraries (`html2canvas` and `qrcode.js`) to load.

For local development with a live-reload server:
```bash
# Using Python:
python3 -m http.server 9000
# Then open http://localhost:9000
```
*(Or use PHP: `php -S localhost:9000`)*

---

## ✨ Features

- **Hacker Green Glassmorphism:** Deep dark #010409 gradients mixed with #39d353 neon green accents over a subtle animated motherboard background.
- **Terminal Preloader:** A sleek, animated `<LS />` typing sequence before site entry.
- **Circuit Decorators:** Pulsing SVG layout traces creating section divisions.
- **Fully Responsive:** Beautifully scaled components across 4 distinct mobile/tablet breakpoints.
- **Scroll-Triggered Reveals:** Smooth `IntersectionObserver` fading elements in as you scroll.
- **Tulk Showcase:** Interactive image carousel showing off the live Tulk Next.js platform.
- **Downloadable Contact Card:** 
  - Entire contact segment replaced by a professional, downloadable `.png` "Trading Card".
  - Uses `qrcode.js` to render a link back to the live site.
  - Generates the image client-side via `html2canvas`.
- **Social Grid:** Complete 8-platform social networking grid including TikTok, YouTube, WhatsApp, and GitHub.
- **Zero Dependencies:** Pure Vanilla HTML/JS/CSS without Node.js or webpack build chains.

---

## 🛠 Built By

Crafted for **Lionel Sisso**, République du Bénin 🌍.
*Full-Stack Developer & Software Architect*
