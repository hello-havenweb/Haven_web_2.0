/**
 * EMBER & OAK — Wood-Fired Hearth & Dining Room
 * Interactive Experience Runtime
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. NAVBAR SCROLL TRANSFORMATION
  const navWrap = document.querySelector('.ember-nav-wrap');
  
  function handleNavScroll() {
    if (!navWrap) return;
    if (window.scrollY > 40) {
      navWrap.classList.add('scrolled');
    } else {
      navWrap.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // 2. MOBILE MENU DRAWER
  const navToggle = document.querySelector('.ember-nav-toggle');
  const mobileDrawer = document.querySelector('.ember-mobile-drawer');
  const mobileClose = document.querySelector('.ember-mobile-close');
  const mobileLinks = document.querySelectorAll('.ember-mobile-link, .ember-mobile-drawer a');

  function openDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (navToggle) navToggle.addEventListener('click', openDrawer);
  if (mobileClose) mobileClose.addEventListener('click', closeDrawer);
  mobileLinks.forEach(link => link.addEventListener('click', closeDrawer));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('active')) {
      closeDrawer();
    }
  });

  // 3. MENU CATEGORY TAB SWITCHER
  const menuTabs = document.querySelectorAll('.ember-menu-tab');
  const menuViews = document.querySelectorAll('.ember-menu-view');

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetCat = tab.getAttribute('data-tab');

      menuTabs.forEach(t => t.classList.remove('active'));
      menuViews.forEach(v => v.classList.remove('active'));

      tab.classList.add('active');
      const targetView = document.getElementById(`menu-${targetCat}`);
      if (targetView) {
        targetView.classList.add('active');
      }
    });
  });

  // 4. INTERACTIVE RESERVATIONS FORM (DEMO)
  const resForm = document.getElementById('ember-reservation-form');
  const resFeedback = document.getElementById('ember-reservation-feedback');
  const resDetailsSummary = document.getElementById('ember-res-summary');
  const resResetBtn = document.getElementById('ember-res-reset');

  // Set default date to tomorrow
  const dateInput = document.getElementById('res-date');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
    dateInput.min = new Date().toISOString().split('T')[0];
  }

  if (resForm) {
    resForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const date = document.getElementById('res-date')?.value || 'Upcoming Date';
      const time = document.getElementById('res-time')?.value || '7:00 PM';
      const guests = document.getElementById('res-guests')?.value || '2 Guests';
      const name = document.getElementById('res-name')?.value || 'Guest';

      if (resDetailsSummary) {
        resDetailsSummary.innerHTML = `Table confirmed for <strong>${escapeHtml(name)}</strong> for <strong>${escapeHtml(guests)}</strong> on <strong>${escapeHtml(date)}</strong> at <strong>${escapeHtml(time)}</strong>.<br><span style="font-size:0.85rem;color:var(--eo-sand);margin-top:0.5rem;display:inline-block;">(Fictional Studio Preview Demo — A simulated reservation confirmation has been prepared.)</span>`;
      }

      resForm.style.display = 'none';
      if (resFeedback) {
        resFeedback.classList.add('active');
        resFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  if (resResetBtn && resForm && resFeedback) {
    resResetBtn.addEventListener('click', () => {
      resFeedback.classList.remove('active');
      resForm.reset();
      resForm.style.display = 'block';
    });
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // 5. INTERSECTION OBSERVER REVEAL ANIMATIONS
  const revealElements = document.querySelectorAll('.ember-reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // 6. ACTIVE NAV LINK SPY
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.ember-nav-link');

  function updateActiveNav() {
    let scrollPos = window.scrollY + 120;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
});
