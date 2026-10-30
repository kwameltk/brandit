/* client-only JS: mobile hamburger, aria handling, smooth scroll, close on outside click */
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.getElementById('primary-nav');
  const body = document.body;

  if (navToggle && mainNav) {
    const setOpen = (open) => {
      navToggle.setAttribute('aria-expanded', String(open));
      body.classList.toggle('nav-open', open);
    };

    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      setOpen(!isOpen);
    });

    mainNav.querySelectorAll('a[href^="#"], a[href$=".html"]').forEach((a) => {
      a.addEventListener('click', () => {
        if (window.innerWidth <= 1000) setOpen(false);
      });
    });

    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 1000 && body.classList.contains('nav-open')) {
        if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
          setOpen(false);
        }
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && body.classList.contains('nav-open')) setOpen(false);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
