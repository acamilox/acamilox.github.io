(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('[data-reveal]');

  const applyDelay = (el) => {
    const delay = el.dataset.delay;
    if (delay) {
      el.style.setProperty('--reveal-delay', delay);
    }
  };

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(applyDelay);
    revealEls.forEach((el) => el.classList.add('is-in'));
  } else {
    revealEls.forEach(applyDelay);
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px 40% 0px' });
    revealEls.forEach((el) => revealObserver.observe(el));

    let revealTicking = false;
    const revealPassed = () => {
      revealEls.forEach((el) => {
        if (!el.classList.contains('is-in') && el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add('is-in');
        }
      });
      revealTicking = false;
    };
    window.addEventListener('scroll', () => {
      if (!revealTicking) {
        revealTicking = true;
        window.requestAnimationFrame(revealPassed);
      }
    }, { passive: true });
  }

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navMenu.classList.toggle('is-open', !isOpen);
    });
    navMenu.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
      }
    });
  }

  const progressBar = document.querySelector('.progress');
  if (progressBar) {
    let ticking = false;
    const updateProgress = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      progressBar.style.transform = `scaleX(${progress})`;
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateProgress);
      }
    }, { passive: true });
    updateProgress();
  }

  const heroPhoto = document.querySelector('.hero-photo');
  const heroFigure = document.querySelector('.hero-figure');
  if (heroPhoto && heroFigure && !reduceMotion) {
    let parallaxTicking = false;
    const updateParallax = () => {
      if (window.scrollY > 0) {
        const offset = Math.min(window.scrollY * 0.08, 90);
        heroPhoto.style.translate = `0 ${offset}px`;
      } else {
        heroPhoto.style.translate = '';
      }
      parallaxTicking = false;
    };
    window.addEventListener('scroll', () => {
      if (!parallaxTicking) {
        parallaxTicking = true;
        window.requestAnimationFrame(updateParallax);
      }
    }, { passive: true });
    updateParallax();
  }

  const statEls = document.querySelectorAll('.stat');
  if (statEls.length) {
    const animateCount = (numEl) => {
      const target = parseInt(numEl.dataset.count, 10) || 0;
      const suffix = numEl.dataset.suffix || '';
      if (reduceMotion || target <= 0) {
        numEl.textContent = String(target) + suffix;
        return;
      }
      const duration = 1100;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        numEl.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) {
          window.requestAnimationFrame(tick);
        }
      };
      window.requestAnimationFrame(tick);
    };
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const numEl = entry.target.querySelector('.stat-num');
          if (numEl) {
            animateCount(numEl);
          }
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statEls.forEach((el) => statObserver.observe(el));
  }
})();