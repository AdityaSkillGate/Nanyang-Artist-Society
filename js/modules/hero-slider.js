/**
 * NANYANG ARTISTS SOCIETY — HERO MEDIA SEQUENCE SLIDER
 * 5-Slide Curated Artwork Narrative (Artist Painting, Calligraphy, Youth Art, Exhibition, Studio)
 * Smooth crossfade, subtle Ken Burns, next/prev controls, pagination dots, pause/play toggle,
 * keyboard accessibility, and prefers-reduced-motion compliance.
 */

export const HERO_SLIDES = [
  {
    id: 1,
    title: "Master Ink Landscape & Asian Heritage",
    title_zh: "融古开今 · 名家水墨山水与非遗传承",
    eyebrow: "Pioneer Liu Kang Inscribed · 既然成立当勉其难",
    desc: "Explore classical Chinese painting, brushwork mastery, and traditional aesthetics rooted in Southeast Asian heritage.",
    desc_zh: "探索中国传统水墨书画的笔墨神韵与南洋艺术先驱的深厚文化积淀。",
    image: "assets/images/art-works/art-21.png",
    alt: "Master Chinese Ink Landscape Painting"
  },
  {
    id: 2,
    title: "Standardized Chinese Calligraphy Syllabus",
    title_zh: "正统书道 · 硬笔与软笔全国考级体系",
    eyebrow: "National Visual Arts Assessment · Grades 1 to 9",
    desc: "Nine progressive levels in Hard-Pen and Soft-Pen calligraphy, standardizing copybook imitation and classical creation.",
    desc_zh: "涵盖硬笔与软笔书法的全国1至9级标准化考核体系，从基础笔画到自主创作层层递进。",
    image: "assets/images/grade/soft-pen/level-1.png",
    alt: "Chinese Calligraphy Classical Model Plate"
  },
  {
    id: 3,
    title: "International Youth Art & Creative Growth",
    title_zh: "童心筑梦 · “南洋之星”国际少儿美术大赛",
    eyebrow: "Nanyang Star Youth Excellence · Global Recognition",
    desc: "Empowering next-generation visionaries through international competitions, gala exhibitions, and creative fine arts.",
    desc_zh: "汇聚全球青少年优秀美术佳作，通过高规格国际展赛与典藏画册激发无尽可能。",
    image: "assets/images/art-works/art-11.png",
    alt: "Award-winning Youth Painting Artwork"
  },
  {
    id: 4,
    title: "Digital Art Gallery & Online Museum",
    title_zh: "数字美术馆 · 典雅沙龙与线上美术馆藏",
    eyebrow: "Permanent Collection & Laureate Showcase",
    desc: "An immersive digital exhibition celebrating master educators, student laureates, and historic society retrospectives.",
    desc_zh: "高精度全景呈现名家导师馆藏、历届获奖佳作与国际巡展珍贵历史档案。",
    image: "assets/images/looking-into-the-future-2020-panner.png",
    alt: "Looking Into the Future Exhibition Banner"
  },
  {
    id: 5,
    title: "Academic Studio Mentorship & Mastery",
    title_zh: "名家亲炙 · 学院派绘画与少儿手工造型",
    eyebrow: "Studio Apprenticeship & Certified Faculty",
    desc: "From foundational sketching and 3D origami to advanced oil painting studios taught by Singapore master artists.",
    desc_zh: "严谨的小班制工作室教学，涵盖西方素描油画、色彩理论及专利立体手工造型。",
    image: "assets/images/art-works/art-25.png",
    alt: "Visual Arts Studio Workshop Masterpiece"
  }
];

export class HeroSlider {
  constructor(containerId = 'hero-slider-wrap') {
    this.container = null;
    this.containerId = containerId;
    this.currentIndex = 0;
    this.totalSlides = HERO_SLIDES.length;
    this.autoplayInterval = 6000;
    this.timer = null;
    this.isPaused = false;
    this.prefersReducedMotion = false;
  }

  init() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) return;

    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.renderSlides();
    this.bindControls();

    if (!this.prefersReducedMotion && !this.isPaused) {
      this.startAutoplay();
    }
  }

  renderSlides() {
    const track = this.container.querySelector('#hero-slider-track');
    const dotsContainer = this.container.querySelector('#hero-pagination-dots');
    if (!track) return;

    track.innerHTML = HERO_SLIDES.map((slide, idx) => `
      <div class="hero-slide ${idx === 0 ? 'is-active' : ''}" data-slide-index="${idx}">
        <img src="${slide.image}" alt="${slide.alt}" class="hero-slide-img" loading="${idx === 0 ? 'eager' : 'lazy'}">
        <div class="hero-slide-overlay"></div>
      </div>
    `).join('');

    if (dotsContainer) {
      dotsContainer.innerHTML = HERO_SLIDES.map((_, idx) => `
        <button type="button" class="hero-dot ${idx === 0 ? 'is-active' : ''}" data-dot-index="${idx}" aria-label="Go to slide ${idx + 1}" role="tab" aria-selected="${idx === 0}">
        </button>
      `).join('');
    }
  }

  bindControls() {
    const prevBtn = this.container.querySelector('#hero-prev-btn');
    const nextBtn = this.container.querySelector('#hero-next-btn');
    const pauseBtn = this.container.querySelector('#hero-pause-btn');
    const dotsContainer = this.container.querySelector('#hero-pagination-dots');

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.prevSlide();
        this.restartAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.nextSlide();
        this.restartAutoplay();
      });
    }

    if (pauseBtn) {
      pauseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.togglePause();
      });
    }

    if (dotsContainer) {
      dotsContainer.addEventListener('click', (e) => {
        const dot = e.target.closest('.hero-dot');
        if (dot) {
          const index = parseInt(dot.getAttribute('data-dot-index'), 10);
          if (!isNaN(index)) {
            this.goToSlide(index);
            this.restartAutoplay();
          }
        }
      });
    }

    // Keyboard support when container has focus
    this.container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.prevSlide();
        this.restartAutoplay();
      } else if (e.key === 'ArrowRight') {
        this.nextSlide();
        this.restartAutoplay();
      }
    });

    // Pause on hover
    this.container.addEventListener('mouseenter', () => {
      if (!this.prefersReducedMotion && !this.isPaused) {
        clearInterval(this.timer);
      }
    });

    this.container.addEventListener('mouseleave', () => {
      if (!this.prefersReducedMotion && !this.isPaused) {
        this.startAutoplay();
      }
    });
  }

  goToSlide(index) {
    this.currentIndex = (index + this.totalSlides) % this.totalSlides;
    this.updateDOM();
  }

  nextSlide() {
    this.goToSlide(this.currentIndex + 1);
  }

  prevSlide() {
    this.goToSlide(this.currentIndex - 1);
  }

  startAutoplay() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.nextSlide();
    }, this.autoplayInterval);
  }

  restartAutoplay() {
    if (!this.prefersReducedMotion && !this.isPaused) {
      this.startAutoplay();
    }
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    const pauseBtn = this.container.querySelector('#hero-pause-btn');
    if (this.isPaused) {
      clearInterval(this.timer);
      if (pauseBtn) {
        pauseBtn.innerHTML = '▶';
        pauseBtn.setAttribute('aria-label', 'Play Auto Scroll');
      }
    } else {
      this.startAutoplay();
      if (pauseBtn) {
        pauseBtn.innerHTML = '⏸';
        pauseBtn.setAttribute('aria-label', 'Pause Auto Scroll');
      }
    }
  }

  updateDOM() {
    const slides = this.container.querySelectorAll('.hero-slide');
    const dots = this.container.querySelectorAll('.hero-dot');
    const slideData = HERO_SLIDES[this.currentIndex];

    slides.forEach((slide, idx) => {
      const active = idx === this.currentIndex;
      slide.classList.toggle('is-active', active);
    });

    dots.forEach((dot, idx) => {
      const active = idx === this.currentIndex;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-selected', active.toString());
    });

    // Layered text update with smooth reveal
    const slideTagEl = document.getElementById('hero-slide-tag');
    if (slideTagEl && slideData) {
      slideTagEl.textContent = `${slideData.id}/5 · ${slideData.eyebrow}`;
    }
  }
}

export const heroSlider = new HeroSlider();
