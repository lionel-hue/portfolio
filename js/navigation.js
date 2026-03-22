/**
 * navigation.js
 * Handles navbar scroll effect, active link, mobile menu,
 * smooth scrolling, and back-to-top button.
 */

const Navigation = (() => {
  const navbar = document.getElementById('navbar')
  const hamburger = document.querySelector('.nav__hamburger')
  const mobileNav = document.querySelector('.nav__mobile')
  const navLinks = document.querySelectorAll('.nav__link[data-section]')
  const backToTop = document.getElementById('back-to-top')
  const progressBar = document.getElementById('scroll-progress')

  let lastScroll = 0

  // ── Scroll Effects ───────────────────────────────────────
  function onScroll () {
    const scrollY = window.scrollY
    const maxScroll = document.body.scrollHeight - window.innerHeight

    // Navbar background
    if (scrollY > 60) {
      navbar.classList.add('scrolled')
    } else {
      navbar.classList.remove('scrolled')
    }

    // Progress bar
    if (progressBar) {
      const pct = maxScroll > 0 ? scrollY / maxScroll : 0
      progressBar.style.transform = `scaleX(${pct})`
    }

    // Back to top visibility
    if (backToTop) {
      if (scrollY > 500) {
        backToTop.classList.add('visible')
      } else {
        backToTop.classList.remove('visible')
      }
    }

    // Active nav link
    updateActiveLink()

    lastScroll = scrollY
  }

  function updateActiveLink () {
    const sections = ['home', 'projects', 'contact']
    const scrollMid = window.scrollY + window.innerHeight * 0.45

    let current = 'home'
    for (const id of sections) {
      const el = document.getElementById(id)
      if (!el) continue
      if (scrollMid >= el.offsetTop) current = id
    }

    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current)
    })
  }

  // ── Smooth Scroll ────────────────────────────────────────
  function scrollTo (targetId) {
    const target = document.getElementById(targetId)
    if (!target) return

    const offset =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--nav-height'
        )
      ) || 72

    const top = target.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  function attachScrollLinks () {
    // All anchors with data-scroll attribute
    document.querySelectorAll('[data-scroll]').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault()
        scrollTo(el.dataset.scroll)
        closeMobileNav()
      })
    })

    // Nav links with data-section
    navLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault()
        scrollTo(link.dataset.section)
      })
    })

    // Back to top
    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
    }
  }

  // ── Mobile Navigation ────────────────────────────────────
  function openMobileNav () {
    hamburger.classList.add('open')
    mobileNav.classList.add('open')
    mobileNav.style.display = 'block'
    document.body.style.overflow = 'hidden'
  }

  function closeMobileNav () {
    hamburger.classList.remove('open')
    mobileNav.classList.remove('open')
    document.body.style.overflow = ''
    setTimeout(() => {
      if (!mobileNav.classList.contains('open')) {
        mobileNav.style.display = ''
      }
    }, 400)
  }

  function attachMobileNav () {
    if (!hamburger || !mobileNav) return

    hamburger.addEventListener('click', () => {
      hamburger.classList.contains('open') ? closeMobileNav() : openMobileNav()
    })

    // Close on backdrop click
    mobileNav.addEventListener('click', e => {
      if (e.target === mobileNav) closeMobileNav()
    })

    // Mobile links
    document.querySelectorAll('.nav__mobile-link').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault()
        scrollTo(link.dataset.scroll)
        closeMobileNav()
      })
    })

    // Close on escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMobileNav()
    })
  }

  // ── Init ─────────────────────────────────────────────────
  function init () {
    window.addEventListener('scroll', onScroll, { passive: true })
    attachScrollLinks()
    attachMobileNav()
    onScroll() // run once on load
  }

  return { init, scrollTo }
})()
