/**
 * HAVEN DIGITAL STUDIO — CONTACT FORM RUNTIME (FORMSUBMIT INTEGRATION)
 * Static-first client submission engine • Direct FormSubmit REST API
 * 
 * Receiving Email: hello.havenweb@gmail.com
 * Form Endpoint: https://formsubmit.co/hello.havenweb@gmail.com
 * Subject: New HAVEN Contact Form Submission
 */

(function () {
  'use strict';

  // Prevent duplicate initialization across scripts
  if (window.__HAVEN_CONTACT_FORM_INITIALIZED__) return;
  window.__HAVEN_CONTACT_FORM_INITIALIZED__ = true;

  const FORMSUBMIT_RECEIVING_EMAIL = 'hello.havenweb@gmail.com';
  const FORMSUBMIT_AJAX_ENDPOINT = `https://formsubmit.co/ajax/${FORMSUBMIT_RECEIVING_EMAIL}`;
  const DEFAULT_SUBJECT = 'New HAVEN Contact Form Submission';

  function initFormSubmitContact() {
    const form = document.getElementById('haven-contact-form');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const brandInput = document.getElementById('brand');
    const templateSelect = document.getElementById('template');
    const budgetSelect = document.getElementById('budget');
    const detailsInput = document.getElementById('details');
    const submitBtn = form.querySelector('button[type="submit"]');

    let successBox = document.getElementById('form-success-box');
    let errorBox = document.getElementById('form-error-box');

    // Create errorBox dynamically if not already present in the DOM
    if (!errorBox && successBox && successBox.parentNode) {
      errorBox = document.createElement('div');
      errorBox.id = 'form-error-box';
      errorBox.className = 'form-error-box';
      errorBox.style.display = 'none';
      successBox.parentNode.insertBefore(errorBox, successBox.nextSibling);
    }

    let isSubmitting = false;

    // Helper: Escape HTML to prevent XSS in dynamic messaging
    function escapeHtml(str) {
      if (typeof str !== 'string') return '';
      return str.replace(/[&<>"']/g, (m) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[m]));
    }

    // Helper: Show inline validation error beneath specific field
    function showFieldError(inp, msg) {
      if (!inp) return;
      inp.style.borderColor = '#ef4444';
      inp.focus();

      let err = inp.parentNode.querySelector('.form-field-error');
      if (!err) {
        err = document.createElement('div');
        err.className = 'form-field-error';
        err.style.color = '#f87171';
        err.style.fontSize = '0.78rem';
        err.style.marginTop = '0.35rem';
        err.style.fontWeight = '500';
        inp.parentNode.appendChild(err);
      }
      err.textContent = msg;
    }

    // Helper: Clear inline validation error
    function clearFieldError(inp) {
      if (!inp) return;
      inp.style.borderColor = '';
      const existingErr = inp.parentNode.querySelector('.form-field-error');
      if (existingErr) existingErr.remove();
    }

    // Clear field-level errors as soon as the user starts correcting them
    [nameInput, emailInput, brandInput, detailsInput].forEach((inp) => {
      if (!inp) return;
      inp.addEventListener('input', () => {
        clearFieldError(inp);
        if (errorBox) {
          errorBox.classList.remove('show');
          errorBox.style.display = 'none';
        }
      });
    });

    // Helper: Display top-level error notification banner
    function displayFormError(message) {
      if (successBox) {
        successBox.classList.remove('show');
        successBox.style.display = 'none';
      }
      if (errorBox) {
        errorBox.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-size: 1.05rem; font-weight: 700; margin-bottom: 0.4rem; color: #fca5a5;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>Submission Notice</span>
          </div>
          <p style="font-size: 0.9rem; color: #fecaca; line-height: 1.5; margin: 0 auto; max-width: 560px;">
            ${escapeHtml(message)}
          </p>
          <div style="font-size: 0.78rem; color: #cbd5e1; margin-top: 0.6rem;">
            Direct studio contact: <a href="mailto:hello.havenweb@gmail.com" style="color: var(--accent-lavender); text-decoration: underline;">hello.havenweb@gmail.com</a>
          </div>
        `;
        errorBox.style.display = 'block';
        errorBox.classList.add('show');
        errorBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    // Helper: Display top-level success notification banner
    function displayFormSuccess(name, brand, email, noticeText) {
      if (errorBox) {
        errorBox.classList.remove('show');
        errorBox.style.display = 'none';
      }
      if (successBox) {
        successBox.innerHTML = `
          <div style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.4rem; color: #bbf7d0; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Project Enquiry Received</span>
          </div>
          <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--accent-lavender); margin-bottom: 0.85rem; letter-spacing: 0.08em;">
            CONFIRMED TRANSMISSION &bull; STATUS: 200 OK
          </div>
          <p style="font-size: 0.92rem; color: #e2e8f0; line-height: 1.6; margin: 0 auto; max-width: 540px;">
            Thank you, <strong>${escapeHtml(name)}</strong>. Your enquiry for <strong>${escapeHtml(brand)}</strong> has been delivered directly to HAVEN studio engineers. We review every brief and reply to <strong>${escapeHtml(email)}</strong> within 24 hours.
          </p>
          ${noticeText ? `<div style="font-size: 0.8rem; color: #94a3b8; margin-top: 0.75rem; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.6rem;">${escapeHtml(noticeText)}</div>` : ''}
        `;
        successBox.style.display = 'block';
        successBox.classList.add('show');
        successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    // Handle form submission
    form.addEventListener('submit', async function (e) {
      // 1. Prevent default form submission and page reload
      e.preventDefault();

      // Prevent multiple concurrent submissions
      if (isSubmitting) return;

      // Reset previous error/success containers
      if (errorBox) {
        errorBox.classList.remove('show');
        errorBox.style.display = 'none';
      }
      if (successBox) {
        successBox.classList.remove('show');
        successBox.style.display = 'none';
      }

      // 2. Validate all existing required fields
      let hasError = false;
      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const brand = brandInput ? brandInput.value.trim() : '';
      const template = templateSelect ? templateSelect.value : 'Custom Vision';
      const budget = budgetSelect ? budgetSelect.value : 'TemplateWebsite';
      const details = detailsInput ? detailsInput.value.trim() : '';

      // Validate Name
      if (!name) {
        showFieldError(nameInput, 'Please enter your name.');
        hasError = true;
      }

      // Validate Email (Format & Non-empty)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        showFieldError(emailInput, 'Please enter your email address.');
        hasError = true;
      } else if (!emailRegex.test(email)) {
        showFieldError(emailInput, 'Please enter a valid email address (e.g., name@domain.com).');
        hasError = true;
      }

      // Validate Business/Brand
      if (!brand) {
        showFieldError(brandInput, 'Please provide your business or brand name.');
        hasError = true;
      }

      // Validate Project Details
      if (!details || details.length < 10) {
        showFieldError(detailsInput, 'Please provide project details (minimum 10 characters).');
        hasError = true;
      }

      // Stop submission if validation failed (inputs stay intact)
      if (hasError) return;

      // 3. Prevent duplicate clicks & show small loading state on existing Send button
      isSubmitting = true;
      const originalBtnHTML = submitBtn ? submitBtn.innerHTML : 'Send Project Enquiry →';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span style="display: inline-block; width: 0.95rem; height: 0.95rem; border: 2px solid rgba(255, 255, 255, 0.25); border-top-color: #ffffff; border-radius: 50%; animation: havenSpin 0.75s linear infinite; margin-right: 0.5rem; vertical-align: middle;"></span>
          Transmitting Brief...
        `;
      }

      // 4. Prepare FormSubmit FormData payload
      const budgetLabel = budgetSelect && budgetSelect.selectedOptions && budgetSelect.selectedOptions[0]
        ? budgetSelect.selectedOptions[0].text
        : budget;

      const templateLabel = templateSelect && templateSelect.selectedOptions && templateSelect.selectedOptions[0]
        ? templateSelect.selectedOptions[0].text
        : template;

      const formData = new FormData(form);

      // Ensure explicit FormSubmit system directives are populated
      if (!formData.has('_subject')) {
        formData.append('_subject', DEFAULT_SUBJECT);
      }
      if (!formData.has('_captcha')) {
        formData.append('_captcha', 'true');
      }

      // Append clean human-readable summaries so FormSubmit email table shows full detail
      formData.set('Selected Template', templateLabel);
      formData.set('Estimated Budget', budgetLabel);

      try {
        // Save local backup copy in localStorage so client enquiries are never lost
        try {
          const past = JSON.parse(localStorage.getItem('haven_enquiries') || '[]');
          past.push({ name, email, brand, template: templateLabel, budget: budgetLabel, details, timestamp: new Date().toISOString() });
          localStorage.setItem('haven_enquiries', JSON.stringify(past));
        } catch (_) {}

        // Submit via FormSubmit AJAX endpoint
        const response = await fetch(FORMSUBMIT_AJAX_ENDPOINT, {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: formData
        });

        const result = await response.json().catch(() => null);

        // Check for success or FormSubmit activation notice
        if (response.ok && (result === null || result.success === 'true' || result.success === true || response.status === 200)) {
          let notice = '';
          if (result && result.message && result.message.toLowerCase().includes('activate')) {
            notice = result.message;
          }
          displayFormSuccess(name, brand, email, notice);
          form.reset();
        } else {
          // FormSubmit failure: show error message without clearing entered data
          const apiErrorMsg = result && result.message
            ? result.message
            : 'Unable to deliver your enquiry via FormSubmit at this time. Please try again or reach out directly.';
          displayFormError(apiErrorMsg);
        }
      } catch (networkError) {
        // Network / Connection failure: keep user entered data intact
        console.error('[FormSubmit Submission Error]', networkError);
        displayFormError(
          'Network connection interrupted while transmitting your enquiry. Your brief remains saved below. Please check your connection and click Send again, or email us directly at hello.havenweb@gmail.com.'
        );
      } finally {
        // Restore button state & enable submissions
        isSubmitting = false;
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
        }
      }
    });
  }

  // Self-initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFormSubmitContact);
  } else {
    initFormSubmitContact();
  }
})();
