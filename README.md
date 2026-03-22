# 🍫 Lionel Sisso — Portfolio Website

A stunning, fully responsive portfolio website with a **Chocolate Theme**.
Built with pure HTML5, CSS3, and Vanilla JavaScript — no frameworks required.

---

## 📁 File Structure

```
portfolio/
├── index.html                ← Main HTML entry point
├── css/
│   ├── variables.css         ← All CSS custom properties (colors, fonts, spacing)
│   ├── animations.css        ← Keyframes, scroll-reveal, continuous animations
│   ├── style.css             ← Main component styles
│   └── responsive.css        ← Media queries (mobile → large desktop)
├── js/
│   ├── main.js               ← Initialises modules, fetches GitHub stats
│   ├── navigation.js         ← Navbar scroll, active links, mobile menu
│   ├── animations.js         ← IntersectionObserver, carousels, particles
│   └── form.js               ← Form validation and submission
├── assets/
│   ├── profile/
│   │   └── profile-pic.jpg   ← ⬅ ADD YOUR PHOTO HERE
│   └── tulk/
│       ├── img1.jpg          ← ⬅ Tulk dashboard screenshot
│       ├── img2.jpg          ← ⬅ Tulk features screenshot
│       └── img3.jpg          ← ⬅ Tulk auth/community screenshot
└── README.md
```

---

## 🚀 Getting Started

1. **Open** `index.html` in any modern browser — no build step needed.
2. **Add your profile photo** to `assets/profile/profile-pic.jpg`.
3. **Add Tulk screenshots** to `assets/tulk/img1.jpg`, `img2.jpg`, `img3.jpg`.
4. The site gracefully shows emoji placeholders until real images are added.

For local development with a live-reload server:
```bash
# Using VS Code Live Server (recommended)
# or Python:
python3 -m http.server 8080
# then open http://localhost:8080
```

---

## 🎨 Customisation

### Colors
Edit `css/variables.css` — all colors are CSS custom properties.

### Adding More Projects
Copy the project card block in `index.html` (search for `PROJECT: TULK`)
and fill in the details. The grid auto-adjusts.

### Contact Form
The form currently shows a success simulation. To send real emails:
- Connect to [EmailJS](https://www.emailjs.com/) (free tier available)
- Or use [Formspree](https://formspree.io/)
- Replace the `await new Promise(...)` block in `js/form.js` with your API call.

---

## ✨ Features

- 🍫 Rich chocolate color theme throughout
- 📱 Fully responsive (mobile-first, 4 breakpoints)
- 🎬 Scroll-triggered reveal animations (Intersection Observer)
- 🎠 Auto-playing image carousel with touch/swipe support
- 🍔 Animated hamburger + slide-in mobile navigation
- 📊 Live GitHub stats via public API
- ✅ Contact form with real-time validation + honeypot spam protection
- 📈 Page scroll progress bar
- ⬆ Back-to-top button
- ♿ Accessible (ARIA labels, keyboard navigation)
- ⚡ Zero dependencies — no npm, no build tools

---

## 🖼 Image Placeholders

Images fail gracefully with emoji placeholders until you add real files:
- Profile: `👨‍💻` placeholder
- Project screenshots: contextual placeholders (`🖥`, `👤`, `🔐`)

---

Crafted with ☕ for Lionel Sisso, République du Bénin.
