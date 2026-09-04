/**
 * NANYANG ARTISTS SOCIETY — GRADE EXAMINATION 3D & MOTION UX MODULE
 * Gallery-grade, restrained animations adhering to cultural institution standards.
 * Supports:
 * - Subtle 3D perspective tilt on hover (max 6deg)
 * - Scroll-triggered ink-reveal and fade-up animations
 * - Reduced motion preference honoring
 * - Cinematic quick intro (under 1s, skippable)
 */

export class GradeAnimationEngine {
  constructor() {
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  init() {
    if (this.prefersReducedMotion) {
      document.body.classList.add('reduced-motion');
      return;
    }

    this.initScrollReveals();
    this.initCard3DTilt();
    this.initParallaxInk();
  }

  /**
   * IntersectionObserver for staggered content reveals
   */
  initScrollReveals() {
    const revealElements = document.querySelectorAll('.grade-reveal, .grade-card-3d, .grade-artwork-card');
    if (!revealElements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('is-revealed');
          }, idx * 60);
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => observer.observe(el));
  }

  /**
   * Subtle 3D Perspective Card Tilt on Mouse Move (Desktop Only)
   */
  initCard3DTilt() {
    if (this.hasTouch || this.prefersReducedMotion) return;

    const cards = document.querySelectorAll('.grade-card-3d, .grade-artwork-card');
    cards.forEach(card => {
      let bounds = null;

      const onMouseEnter = () => {
        bounds = card.getBoundingClientRect();
      };

      const onMouseMove = (e) => {
        if (!bounds) bounds = card.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;

        const halfWidth = bounds.width / 2;
        const halfHeight = bounds.height / 2;

        const deltaX = (mouseX - halfWidth) / halfWidth;
        const deltaY = (mouseY - halfHeight) / halfHeight;

        // Strict limit: maximum 5 degrees tilt
        const rotateX = (-deltaY * 5).toFixed(2);
        const rotateY = (deltaX * 5).toFixed(2);

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        card.style.boxShadow = `0 16px 32px rgba(17, 24, 39, 0.08), 0 4px 8px rgba(184, 51, 42, 0.04)`;
      };

      const onMouseLeave = () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        card.style.boxShadow = '';
        bounds = null;
      };

      card.addEventListener('mouseenter', onMouseEnter, { passive: true });
      card.addEventListener('mousemove', onMouseMove, { passive: true });
      card.addEventListener('mouseleave', onMouseLeave, { passive: true });
    });
  }

  /**
   * Subtle Parallax Background Layer
   */
  initParallaxInk() {
    if (this.hasTouch || this.prefersReducedMotion) return;

    const inkLayers = document.querySelectorAll('.grade-ink-parallax');
    if (!inkLayers.length) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.pageYOffset || document.documentElement.scrollTop;
          inkLayers.forEach(layer => {
            const speed = parseFloat(layer.getAttribute('data-parallax-speed') || '0.04');
            layer.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /**
   * Cinematic Intro Sequence (under 900ms, skippable)
   */
  static playQuickIntro(containerId = 'grade-cinematic-intro') {
    const el = document.getElementById(containerId);
    if (!el) return;

    // Skip if user requested reduced motion or previously dismissed in this session
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || sessionStorage.getItem('nas_grade_intro_seen')) {
      el.remove();
      return;
    }

    sessionStorage.setItem('nas_grade_intro_seen', '1');

    // Auto dismiss after 850ms
    setTimeout(() => {
      el.classList.add('fade-out');
      setTimeout(() => el.remove(), 300);
    }, 850);

    const skipBtn = el.querySelector('.intro-skip-btn');
    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        el.classList.add('fade-out');
        setTimeout(() => el.remove(), 200);
      });
    }
  }
}
