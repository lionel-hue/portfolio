/**
 * animations.js
 * IntersectionObserver-based scroll reveal + carousel logic.
 */

const Animations = (() => {
  // ── Scroll Reveal ────────────────────────────────────────
  function initScrollReveal () {
    const targets = document.querySelectorAll('.anim-target')
    if (!targets.length) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    )

    targets.forEach(el => observer.observe(el))
  }

  // ── Skill Bar Reveal ─────────────────────────────────────
  function initSkillBars () {
    const bars = document.querySelectorAll('.skill-bar__fill[data-width]')
    if (!bars.length) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const bar = entry.target
            setTimeout(() => {
              bar.style.width = bar.dataset.width
            }, 200)
            observer.unobserve(bar)
          }
        })
      },
      { threshold: 0.3 }
    )

    bars.forEach(bar => observer.observe(bar))
  }

  // ── Image Carousel ───────────────────────────────────────
  function initCarousels () {
    const carousels = document.querySelectorAll('.project-card__carousel')

    carousels.forEach(carousel => {
      const slidesTrack = carousel.querySelector('.carousel__slides')
      const dots = carousel.querySelectorAll('.carousel__dot')
      const prevBtn = carousel.querySelector('.carousel__btn--prev')
      const nextBtn = carousel.querySelector('.carousel__btn--next')

      if (!slidesTrack || !dots.length) return

      let current = 0
      let autoTimer = null
      const total = dots.length

      function goTo (idx) {
        current = (idx + total) % total
        slidesTrack.style.transform = `translateX(-${current * 100}%)`
        dots.forEach((d, i) => d.classList.toggle('active', i === current))
      }

      function startAuto () {
        stopAuto()
        autoTimer = setInterval(() => goTo(current + 1), 3500)
      }

      function stopAuto () {
        if (autoTimer) {
          clearInterval(autoTimer)
          autoTimer = null
        }
      }

      dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
          goTo(i)
          stopAuto()
        })
      })

      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          goTo(current - 1)
          stopAuto()
        })
      }
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          goTo(current + 1)
          stopAuto()
        })
      }

      // Touch / swipe support
      let touchStartX = 0
      carousel.addEventListener(
        'touchstart',
        e => {
          touchStartX = e.touches[0].clientX
          stopAuto()
        },
        { passive: true }
      )

      carousel.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX
        if (Math.abs(diff) > 40) {
          goTo(diff > 0 ? current + 1 : current - 1)
        }
      })

      // Pause auto on hover
      carousel.addEventListener('mouseenter', stopAuto)
      carousel.addEventListener('mouseleave', startAuto)

      // Kick off
      goTo(0)
      startAuto()
    })
  }

  // ── Button Ripple ────────────────────────────────────────
  function initRipple () {
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        const x = e.clientX - rect.left - size / 2
        const y = e.clientY - rect.top - size / 2

        const ripple = document.createElement('span')
        ripple.className = 'ripple'
        ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`
        this.appendChild(ripple)

        ripple.addEventListener('animationend', () => ripple.remove())
      })
    })
  }

  // ── Floating particles in hero ───────────────────────────
  function initParticles () {
    const container = document.querySelector('.hero__bg')
    if (!container) return

    const items = ['🍫', '☕', '⚡', '💻', '🔮', '✦', '◆', '▲']
    const count = 12

    for (let i = 0; i < count; i++) {
      const p = document.createElement('span')
      p.className = 'hero__particle'
      p.textContent = items[i % items.length]
      p.style.cssText = `
        left:   ${Math.random() * 100}%;
        top:    ${Math.random() * 100}%;
        font-size: ${0.6 + Math.random() * 1.4}rem;
        animation-duration:  ${8 + Math.random() * 12}s;
        animation-delay:    -${Math.random() * 12}s;
      `
      container.appendChild(p)
    }
  }

  // ── Typewriter for hero title ────────────────────────────
  function initTypewriter () {
    const el = document.querySelector('[data-typewriter]')
    if (!el) return

    const texts = el.dataset.typewriter.split('|')
    let textIdx = 0
    let charIdx = 0
    let deleting = false

    el.style.borderRight = '2px solid var(--color-accent)'
    el.style.display = 'inline-block'

    function tick () {
      const full = texts[textIdx]

      if (!deleting) {
        el.textContent = full.slice(0, charIdx + 1)
        charIdx++
        if (charIdx === full.length) {
          deleting = true
          setTimeout(tick, 1800)
          return
        }
      } else {
        el.textContent = full.slice(0, charIdx - 1)
        charIdx--
        if (charIdx === 0) {
          deleting = false
          textIdx = (textIdx + 1) % texts.length
        }
      }

      const speed = deleting ? 40 : 80
      setTimeout(tick, speed)
    }

    setTimeout(tick, 1000)
  }

  // ── Init ─────────────────────────────────────────────────
  function init () {
    initScrollReveal()
    initSkillBars()
    initCarousels()
    initRipple()
    initParticles()
    initTypewriter()
  }

  return { init }
})()
