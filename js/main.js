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

  // ── GitHub Stats (public API) ────────────────────────────
  fetchGitHubStats()
})

// ── GitHub Stats ─────────────────────────────────────────────
async function fetchGitHubStats () {
  try {
    // Fetch profile data (repos, followers)
    const userRes = await fetch('https://api.github.com/users/lionel-hue')
    if (userRes.ok) {
      const userData = await userRes.json()
      
      // Update UI for repos and followers
      const repoEl = document.getElementById('gh-repos')
      const cardRepoEl = document.getElementById('card-repos')
      const follEl = document.getElementById('gh-followers')
      
      if (repoEl && userData.public_repos) repoEl.textContent = userData.public_repos + '+'
      if (cardRepoEl && userData.public_repos) cardRepoEl.textContent = userData.public_repos + '+'
      if (follEl && userData.followers) follEl.textContent = userData.followers
    }

    // Fetch commit count (last year)
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
    const dateStr = oneYearAgo.toISOString().split('T')[0]
    
    const commitRes = await fetch(`https://api.github.com/search/commits?q=author:lionel-hue+committer-date:>${dateStr}`)
    if (commitRes.ok) {
      const commitData = await commitRes.json()
      const totalCommits = commitData.total_count
      
      if (totalCommits) {
        const commitEl = document.getElementById('gh-contributions')
        const cardCommitEl = document.getElementById('card-contributions')
        
        // Format with commas
        const formatted = new Intl.NumberFormat().format(totalCommits)
        
        if (commitEl) commitEl.textContent = formatted
        if (cardCommitEl) cardCommitEl.textContent = formatted
      }
    }
  } catch (err) {
    console.warn('GitHub stats fetch failed:', err)
    // Fail silently – static values remain displayed
  }
}
