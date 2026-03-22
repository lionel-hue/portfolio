/**
 * main.js
 * Entry point – initialises all modules after DOM ready.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ── Preloader ────────────────────────────────────────────
  const preloader = document.getElementById('preloader')
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('hidden'), 600)
    })
    // Fallback: hide after 3s regardless
    setTimeout(() => preloader.classList.add('hidden'), 3000)
  }

  // ── Dynamic year in footer ───────────────────────────────
  const yearEl = document.getElementById('year')
  if (yearEl) yearEl.textContent = new Date().getFullYear()

  // ── Initialise modules ───────────────────────────────────
  Navigation.init()
  Animations.init()
  ContactForm.init()

  // ── GitHub Stats (public API) ────────────────────────────
  fetchGitHubStats()
})

// ── GitHub Stats ─────────────────────────────────────────────
async function fetchGitHubStats () {
  try {
    const res = await fetch('https://api.github.com/users/lionel-hue')
    if (!res.ok) return
    const data = await res.json()

    // Update any elements that show live stats
    const repoEl = document.getElementById('gh-repos')
    const follEl = document.getElementById('gh-followers')
    if (repoEl && data.public_repos)
      repoEl.textContent = data.public_repos + '+'
    if (follEl && data.followers) follEl.textContent = data.followers
  } catch {
    // Fail silently – static values remain displayed
  }
}
