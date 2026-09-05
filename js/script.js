document.getElementById('year').textContent = new Date().getFullYear();

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Sticky header */
(function headerScroll() {
  const header = document.getElementById('siteHeader');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 0);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* Mobile menu */
(function mobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    });
  });
})();

/* Hero parallax */
(function heroParallax() {
  if (prefersReducedMotion) return;
  const media = document.querySelector('[data-parallax]');
  if (!media) return;

  let ticking = false;
  function update() {
    const offset = Math.min(window.scrollY * 0.15, 80);
    media.style.transform = `translateY(${offset}px)`;
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
})();

/* Reveal animation */
(function revealOnScroll() {
  const targets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || targets.length === 0) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
})();

/* Impact statistics */
(function impactStats() {
  const grid = document.getElementById('statsGrid');
  const note = document.getElementById('statsNote');
  const statEls = grid.querySelectorAll('.stat');

  let statsData = null;
  let hasAnimated = false;

  function animateCount(el, target) {
    if (prefersReducedMotion) {
      el.textContent = target.toLocaleString('en-IN');
      return;
    }
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(eased * target);
      el.textContent = value.toLocaleString('en-IN');
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function renderStats() {
    if (!statsData || hasAnimated) return;
    hasAnimated = true;
    statEls.forEach((statEl) => {
      const key = statEl.dataset.key;
      const numberEl = statEl.querySelector('.stat-number');
      const value = Number(statsData[key]) || 0;
      animateCount(numberEl, value);
    });
  }

  fetch('data/stats.json')
    .then((response) => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then((data) => { statsData = data; })
    .catch((error) => {
      console.error('Could not load impact statistics:', error);
      note.textContent = 'Impact statistics are temporarily unavailable.';
    });

  if ('IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const waitForData = setInterval(() => {
              if (statsData) {
                clearInterval(waitForData);
                renderStats();
              }
            }, 80);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    statsObserver.observe(grid);
  } else {
    const waitForData = setInterval(() => {
      if (statsData) {
        clearInterval(waitForData);
        renderStats();
      }
    }, 80);
  }
})();

/* Involvement options */
(function optionPills() {
  const pills = document.querySelectorAll('.option-pill');
  const chips = document.querySelectorAll('.chip');
  const interestInput = document.getElementById('interest');

  function selectChipByValue(value) {
    chips.forEach((chip) => {
      const isMatch = chip.dataset.value === value;
      chip.classList.toggle('is-selected', isMatch);
    });
    interestInput.value = value;
    interestInput.dispatchEvent(new Event('input'));
  }

  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      pills.forEach((p) => p.classList.remove('is-active'));
      pill.classList.add('is-active');
      selectChipByValue(pill.dataset.option);
      document.getElementById('involved').scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      document.getElementById('fullName').focus({ preventScroll: true });
    });
  });
})();

/* Involvement form */
(function involvedForm() {
  const form = document.getElementById('involvedForm');
  const successMsg = document.getElementById('formSuccess');
  const chips = document.querySelectorAll('.chip');
  const interestInput = document.getElementById('interest');
  const interestFieldset = document.getElementById('interestChips').closest('.chip-fieldset');

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('is-selected'));
      chip.classList.add('is-selected');
      interestInput.value = chip.dataset.value;
      if (interestInput.value) {
        interestFieldset.classList.remove('has-error');
        document.getElementById('err-interest').textContent = '';
      }
    });
  });

  const validators = {
    fullName: (value) => value.trim().length > 0,
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
    interest: (value) => value.trim().length > 0,
    message: (value) => value.trim().length > 0,
  };

  const errorMessages = {
    fullName: 'Please tell us your name.',
    email: 'Please enter a valid email address.',
    interest: 'Please choose how you would like to help.',
    message: 'Please add a short message.',
  };

  function setFieldState(fieldName, isValid) {
    const field = form.elements[fieldName];
    const errorEl = document.getElementById(`err-${fieldName}`);

    if (fieldName === 'interest') {
      interestFieldset.classList.toggle('has-error', !isValid);
    } else {
      field.closest('.form-row').classList.toggle('has-error', !isValid);
      field.setAttribute('aria-invalid', String(!isValid));
    }
    errorEl.textContent = isValid ? '' : errorMessages[fieldName];
  }

  function validateField(fieldName) {
    const field = form.elements[fieldName];
    const isValid = validators[fieldName](field.value);
    setFieldState(fieldName, isValid);
    return isValid;
  }

  ['fullName', 'email', 'message'].forEach((fieldName) => {
    const field = form.elements[fieldName];
    field.addEventListener('blur', () => validateField(fieldName));
    field.addEventListener('input', () => {
      if (field.closest('.form-row').classList.contains('has-error')) {
        validateField(fieldName);
      }
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    successMsg.hidden = true;

    const results = Object.keys(validators).map(validateField);
    const allValid = results.every(Boolean);

    if (!allValid) {
      const firstInvalidRow = form.querySelector('.form-row.has-error, .chip-fieldset.has-error');
      if (firstInvalidRow) {
        const focusable = firstInvalidRow.querySelector('input, textarea, button');
        focusable?.focus();
      }
      return;
    }

    successMsg.hidden = false;
    form.reset();
    chips.forEach((c) => c.classList.remove('is-selected'));
    document.querySelectorAll('.option-pill').forEach((p) => p.classList.remove('is-active'));
    interestInput.value = '';
    Object.keys(validators).forEach((fieldName) => setFieldState(fieldName, true));
    successMsg.focus();
  });
})();
