/**
 * form.js
 * Contact form: validation, honeypot, submission, feedback.
 */

const ContactForm = (() => {
  function init () {
    const form = document.getElementById('contact-form')
    const textarea = document.getElementById('msg-field')
    const charCount = document.getElementById('char-count')
    const submitBtn = document.getElementById('submit-btn')
    const feedback = document.getElementById('form-feedback')

    if (!form) return

    // ── Character counter ────────────────────────────────
    if (textarea && charCount) {
      textarea.addEventListener('input', () => {
        const len = textarea.value.length
        charCount.textContent = `${len} / 1000`
        charCount.style.color = len > 900 ? '#f87171' : ''
      })
    }

    // ── Real-time validation ─────────────────────────────
    const inputs = form.querySelectorAll('.form__input, .form__textarea')
    inputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input))
      input.addEventListener('input', () => {
        if (input.dataset.invalid === 'true') validateField(input)
      })
    })

    function validateField (field) {
      const val = field.value.trim()
      let error = ''

      if (field.required && !val) {
        error = 'This field is required.'
      } else if (
        field.type === 'email' &&
        val &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
      ) {
        error = 'Please enter a valid email address.'
      } else if (
        field.id === 'msg-field' &&
        val.length < 10 &&
        val.length > 0
      ) {
        error = 'Message must be at least 10 characters.'
      }

      // Inline error display
      let errEl = field.parentElement.querySelector('.form__error')
      if (error) {
        field.dataset.invalid = 'true'
        field.style.borderColor = '#f87171'
        if (!errEl) {
          errEl = document.createElement('p')
          errEl.className = 'form__error'
          errEl.style.cssText =
            'font-size:0.78rem;color:#f87171;margin-top:6px;font-family:var(--font-mono)'
          field.parentElement.appendChild(errEl)
        }
        errEl.textContent = error
      } else {
        field.dataset.invalid = 'false'
        field.style.borderColor = ''
        if (errEl) errEl.remove()
      }

      return !error
    }

    function validateAll () {
      let valid = true
      inputs.forEach(input => {
        if (!validateField(input)) valid = false
      })
      return valid
    }

    // ── Submission ───────────────────────────────────────
    form.addEventListener('submit', async e => {
      e.preventDefault()

      // Honeypot check
      if (form.querySelector('[name="website"]')?.value) return

      if (!validateAll()) return

      // Loading state
      submitBtn.classList.add('btn--loading')
      submitBtn.textContent = 'Sending'
      feedback.className = 'form__feedback'

      // Simulate async sending (replace with real API call as needed)
      await new Promise(r => setTimeout(r, 1800))

      // Success
      submitBtn.classList.remove('btn--loading')
      submitBtn.textContent = 'Send Message ✓'
      feedback.className = 'form__feedback success'
      feedback.innerHTML = "✅ Message sent! I'll be in touch soon."

      // Reset form after delay
      setTimeout(() => {
        form.reset()
        submitBtn.textContent = 'Send Message'
        feedback.className = 'form__feedback'
        if (charCount) charCount.textContent = '0 / 1000'
        inputs.forEach(input => {
          input.style.borderColor = ''
          input.dataset.invalid = ''
        })
      }, 4000)
    })
  }

  return { init }
})()
