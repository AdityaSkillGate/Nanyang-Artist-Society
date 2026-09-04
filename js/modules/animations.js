/**
 * NANYANG ARTISTS SOCIETY — CREATIVE MOTION & ANIMATIONS ENGINE
 * Comprehensive Motion System:
 * 1. Smooth Scrolling, In-Page Anchor Interceptor & Dynamic Scroll Progress Indicator
 * 2. Floating Back-to-Top Controller & Ambient Floating Micro-Interactions
 * 3. Page Transition & Automatic Universal Section/Card Scroll Reveals
 * 4. Desktop 3D Perspective Tilt & Touch Tap Optimization
 * 5. Strict prefers-reduced-motion Accessibility Compliance
 */

export class AnimationsEngine {
  constructor() {
    this.prefersReducedMotion = false;
    this.isTouchDevice = false;
    this.observer = null;
    this.progressBar = null;
    this.scrollTopBtn = null;
    this.isTicking = false;
  }

  init() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    // 1. Page Entrance Transition
    this.initPageEntrance();

    // 2. Scroll Progress Bar & Floating Back-to-Top Button
    this.initScrollDynamics();

    // 3. Smooth In-Page Anchor Link Interceptor
    this.initSmoothAnchorScrolling();

    // 4. Subnavigation ScrollSpy & Active Indicator (Fixes Issue 3)
    this.initSubnavScrollSpy();

    // 5. Scroll-Triggered Progressive Reveals
    this.initScrollReveals();

    // 6. Desktop 3D Tilt (Clamped <= 4 deg)
    if (!this.prefersReducedMotion && !this.isTouchDevice) {
      this.init3DTilt();
    }

    // 7. Mobile Touch Tap Feedback
    this.initTouchCardInteractions();

    // 8. Media Query Listener
    this.listenToMediaChanges();
  }

  listenToMediaChanges() {
    try {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      mediaQuery.addEventListener('change', (e) => {
        this.prefersReducedMotion = e.matches;
        if (this.progressBar) {
          this.progressBar.style.display = e.matches ? 'none' : 'block';
        }
      });
    } catch (err) {
      // Fallback for older browsers
    }
  }

  /**
   * 1. Universal Page Load Entrance Glide
   */
  initPageEntrance() {
    if (document.body) {
      document.body.classList.add('page-loaded');
    } else {
      window.addEventListener('DOMContentLoaded', () => {
        document.body.classList.add('page-loaded');
      });
    }
  }

  /**
   * 2. Scroll Progress Bar & Floating Back-to-Top Button
   */
  initScrollDynamics() {
    // Mount Scroll Progress Bar if not present
    if (!document.getElementById('nas-scroll-progress-bar') && !this.prefersReducedMotion) {
      this.progressBar = document.createElement('div');
      this.progressBar.id = 'nas-scroll-progress-bar';
      this.progressBar.className = 'scroll-progress-bar';
      this.progressBar.setAttribute('aria-hidden', 'true');
      document.body.appendChild(this.progressBar);
    } else {
      this.progressBar = document.getElementById('nas-scroll-progress-bar');
    }

    // Mount Floating Back to Top Button if not present
    if (!document.getElementById('nas-scroll-top-btn')) {
      this.scrollTopBtn = document.createElement('button');
      this.scrollTopBtn.id = 'nas-scroll-top-btn';
      this.scrollTopBtn.className = 'scroll-top-float-btn';
      this.scrollTopBtn.setAttribute('type', 'button');
      this.scrollTopBtn.setAttribute('aria-label', 'Scroll back to top');
      this.scrollTopBtn.title = 'Back to top (回到顶部)';
      this.scrollTopBtn.innerHTML = '↑';
      document.body.appendChild(this.scrollTopBtn);

      this.scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: this.prefersReducedMotion ? 'auto' : 'smooth'
        });
      });
    } else {
      this.scrollTopBtn = document.getElementById('nas-scroll-top-btn');
    }

    // Passive Scroll Listener
    window.addEventListener('scroll', () => {
      if (!this.isTicking) {
        window.requestAnimationFrame(() => {
          this.handleScrollUpdate();
          this.isTicking = false;
        });
        this.isTicking = true;
      }
    }, { passive: true });

    // Initial update
    this.handleScrollUpdate();
  }

  handleScrollUpdate() {
    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    // Update progress bar
    if (this.progressBar && docHeight > 0) {
      const progress = Math.min(Math.max(scrollY / docHeight, 0), 1);
      this.progressBar.style.transform = `scaleX(${progress.toFixed(4)})`;
    }

    // Toggle Back to Top Button
    if (this.scrollTopBtn) {
      const shouldShow = scrollY > 320;
      this.scrollTopBtn.classList.toggle('is-visible', shouldShow);
    }
  }

  /**
   * 3. Smooth In-Page Anchor Link Interceptor
   * Ensures clicking `#target` anchors glides smoothly with sticky header offset
   */
  initSmoothAnchorScrolling() {
    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#' || hash.startsWith('#!')) return;

      const targetEl = document.querySelector(hash);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 90; // Header clearance
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: this.prefersReducedMotion ? 'auto' : 'smooth'
        });

        // Set accessibility focus
        targetEl.setAttribute('tabindex', '-1');
        targetEl.focus({ preventScroll: true });

        // Update URL hash smoothly without jump
        if (history.pushState) {
          history.pushState(null, null, hash);
        } else {
          location.hash = hash;
        }
      }
    });
  }

  /**
   * 4. Universal Subnavigation ScrollSpy & Active Indicator
   * Solves Issue 3: Dynamically syncs subnavigation highlight pills (.comp-anchor-bar, .about-subnav)
   * with current viewport scroll position, user clicks, and URL hash anchors.
   */
  initSubnavScrollSpy() {
    const subnavBars = document.querySelectorAll('.comp-anchor-bar, .about-subnav, [aria-label*="Sections"], [aria-label*="Navigation"]');
    if (!subnavBars.length) return;

    subnavBars.forEach(bar => {
      const links = Array.from(bar.querySelectorAll('a[href^="#"]'));
      if (!links.length) return;

      const targetMap = links.map(link => {
        const hash = link.getAttribute('href');
        const section = (hash && hash !== '#' && !hash.startsWith('#!')) ? document.querySelector(hash) : null;
        return { link, hash, section };
      }).filter(item => item.section);

      let currentActiveLink = bar.querySelector('.active') || null;

      const setActive = (activeLink, centerButton = false) => {
        if (!activeLink || activeLink === currentActiveLink) return;
        currentActiveLink = activeLink;

        links.forEach(l => {
          l.classList.remove('active');
          l.removeAttribute('aria-current');
        });
        activeLink.classList.add('active');
        activeLink.setAttribute('aria-current', 'true');

        // CRITICAL FIX: NEVER call activeLink.scrollIntoView() during page scrolling!
        // That was the root cause of the scroll stutter / stop.
        // Only adjust the subnav container horizontally when explicitly clicked or needed.
        if (centerButton) {
          const scrollContainer = bar.querySelector('.container') || bar;
          if (scrollContainer && scrollContainer.scrollWidth > scrollContainer.clientWidth) {
            const containerRect = scrollContainer.getBoundingClientRect();
            const linkRect = activeLink.getBoundingClientRect();
            const targetScrollLeft = scrollContainer.scrollLeft + (linkRect.left - containerRect.left) - (scrollContainer.clientWidth / 2) + (linkRect.width / 2);
            scrollContainer.scrollTo({ left: Math.max(0, targetScrollLeft), behavior: 'smooth' });
          }
        }
      };

      // A. Click Listener: Instant visual feedback + center button in horizontal bar
      links.forEach(link => {
        link.addEventListener('click', () => {
          setActive(link, true);
        });
      });

      // B. Initial URL Hash Check
      if (window.location.hash) {
        const matchingLink = links.find(l => l.getAttribute('href') === window.location.hash);
        if (matchingLink) {
          setActive(matchingLink, false);
        }
      }

      // C. IntersectionObserver ScrollSpy
      if (typeof IntersectionObserver !== 'undefined' && targetMap.length) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const matched = targetMap.find(item => item.section === entry.target);
              if (matched) {
                setActive(matched.link, false);
              }
            }
          });
        }, {
          root: null,
          rootMargin: '-10% 0px -50% 0px',
          threshold: 0.05
        });

        targetMap.forEach(item => observer.observe(item.section));
      }
    });
  }

  /**
   * 5. Universal Progressive Scroll Reveals
   * Automatically observes explicit motion classes and major layout sections across all pages
   */
  initScrollReveals() {
    const selectors = [
      '.reveal-up',
      '.reveal-fade',
      '.mask-reveal',
      '.ink-reveal',
      '.soft-scale',
      '.text-stagger',
      '.section-enter',
      '.section-header',
      '.gate-card',
      '.card-lift',
      '.grade-detail-card',
      '.quiz-card-box',
      '.course-card',
      '.form-card',
      '.comp-division-card',
      '.gallery-item',
      '.news-card',
      '.milestone-item'
    ];

    const elements = document.querySelectorAll(selectors.join(', '));

    if (this.prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      elements.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -30px 0px',
      threshold: 0.08
    };

    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          // If the element has children with stagger, reveal them
          if (entry.target.classList.contains('text-stagger')) {
            entry.target.classList.add('is-revealed');
          }
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    elements.forEach(el => {
      // Ensure elements without explicit classes get default reveal-up behavior
      if (!el.classList.contains('reveal-up') &&
          !el.classList.contains('reveal-fade') &&
          !el.classList.contains('mask-reveal') &&
          !el.classList.contains('ink-reveal') &&
          !el.classList.contains('soft-scale') &&
          !el.classList.contains('text-stagger')) {
        el.classList.add('reveal-up');
      }
      this.observer.observe(el);
    });
  }

  /**
   * 5. Subtle Desktop 3D Perspective Mouse Tilt (max 4-5 degrees)
   */
  init3DTilt() {
    const tiltCards = document.querySelectorAll('.tilt-card, [data-3d-tilt="true"], .gate-card');
    tiltCards.forEach(card => {
      let isHovered = false;

      card.addEventListener('mouseenter', () => {
        isHovered = true;
      });

      card.addEventListener('mousemove', (e) => {
        if (!isHovered || this.prefersReducedMotion) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -3.5; // Max 3.5 deg
        const rotateY = ((x - centerX) / centerX) * 3.5;  // Max 3.5 deg

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        isHovered = false;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  /**
   * 6. Mobile Touch Tap Support for Interactive Cards
   */
  initTouchCardInteractions() {
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.artwork-interactive-card, .card-lift');
      if (!card) {
        document.querySelectorAll('.is-tapped').forEach(c => c.classList.remove('is-tapped'));
        return;
      }

      if (this.isTouchDevice) {
        card.classList.toggle('is-tapped');
      }
    });
  }
}

export const animationsEngine = new AnimationsEngine();

// Auto-run on DOM ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => animationsEngine.init());
  } else {
    animationsEngine.init();
  }
}
