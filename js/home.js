/**
 * NANYANG ARTISTS SOCIETY — HOMEPAGE INTERACTIVE CONTROLLER
 * Handles Dynamic Course Feeds, Category Filters, Nine-Level Journey Filtering,
 * Faculty Spotlights, Hero Media Sequence (5 slides), Creative Animations, and Entrance Popup.
 *
 * NOTE: The Grade Examination section on the homepage is a STATIC promotional pathway.
 * Grade state is strictly isolated to grade.html & grade-detail.html.
 */

import { dataAdapter } from './services/dataAdapter.js';
import { i18n } from './services/i18n.js';
import { heroSlider } from './modules/hero-slider.js';
import { animationsEngine } from './modules/animations.js';
import { entrancePopup } from './modules/popup.js';

const LOCAL_THUMBNAILS = {
  'CRS-OIL-01': 'assets/images/art-works/oil-panting.png',
  'CRS-SKT-01': 'assets/images/art-works/sketch-art.png',
  'CRS-WTC-01': 'assets/images/art-works/art-1.png',
  'CRS-CLG-01': 'assets/images/art-works/art-21.png',
  'CRS-CHP-01': 'assets/images/art-works/oil-panting.png',
  'CRS-CHD-01': 'assets/images/art-works/chinese-children-art.png',
  'CRS-CTN-01': 'assets/images/art-works/Creative-Cartoon-art.png',
  'CRS-TCH-01': 'assets/images/art-works/art-11.png',
  'CRS-CIA': 'assets/images/art-works/chinese-children-art.png',
  'CRS-CTN': 'assets/images/art-works/Creative-Cartoon-art.png',
  'CRS-HDC': 'assets/images/art-works/art-11.png',
  'CRS-CHP': 'assets/images/art-works/oil-panting.png',
  'CRS-SKT': 'assets/images/art-works/sketch-art.png',
  'CRS-SHU': 'assets/images/art-works/art-1.png'
};

const COURSE_HIGHLIGHTS = {
  'CRS-OIL-01': {
    en: ['Classical Grisaille & Underpainting', 'Direct Alla Prima & Impasto Knife Technique', 'Color Temperature & Canvas Preparation'],
    zh: ['古典油画单色起稿与多层罩染', '直接画法与调色刀肌理表现', '色温冷暖把控与整幅布面创作']
  },
  'CRS-SKT-01': {
    en: ['Academic Chiaroscuro & Value Scale', 'Geometric Solids & Classical Plaster Busts', 'Master Portrait Anatomy & Line Discipline'],
    zh: ['严谨学院派三大面五大调光影', '石膏几何体到经典名家石膏胸像', '真人头像结构解剖与写生精修']
  },
  'CRS-WTC-01': {
    en: ['Transparent Glazes & Wet-on-Wet Dynamics', 'Plein-Air Composition & Light Reflection', 'Botanical Precision & Cityscape Rendering'],
    zh: ['透明水彩叠色与湿画法气韵', '户外写生构图与光影折射捕捉', '植物花卉精微刻画与城市速写']
  },
  'CRS-CLG-01': {
    en: ['Dual-Track Hard-Pen & Soft-Brush Instruction', 'Yan / Liu / Zhao Standard Regular Script', 'Tang Rubbings & Harmonic Balance'],
    zh: ['硬笔毛笔双轨名师亲授', '颜柳欧赵经典正楷到行草气韵', '章法布局与碑帖集字创作']
  },
  'CRS-CHP-01': {
    en: ['Classical Xieyi & Gongbi Line Mastery', 'Five-Shade Ink Modulation (Pomo Technique)', 'Poetic Inscription & Traditional Seal Usage'],
    zh: ['写意花鸟与青绿山水正统法度', '墨分五色运笔施墨虚实相生', '诗画一律与传统题款铃印']
  },
  'CRS-CHD-01': {
    en: ['Cognitive Visual Awakening (Ages 2–6)', 'Memory Drawing & Spatial Imagination', 'Sensory Materials & Color Harmonization'],
    zh: ['0-7岁大脑神经元激活启蒙', '记忆联想画与空间感官探索', '综合媒材感知与色彩搭配']
  },
  'CRS-CTN-01': {
    en: ['Exaggerated Character Design & Storyboards', 'Dynamic Anatomy & Action Poses', 'Marker & Ink Fine Rendering'],
    zh: ['动漫造型夸张与角色设计', '分镜脚本与生动视觉叙事', '马克笔与勾线色彩渲染']
  },
  'CRS-TCH-01': {
    en: ['Pedagogy & Classroom Curriculums', 'Grade Examination Preparation Standards', 'Studio Management & Student Mentorship'],
    zh: ['美术专业教法与进阶教案编写', '国家级考级评审标准深入解析', '画室运营管理与学员因材施教']
  },
  'CRS-CIA': {
    en: ['Cognitive Visual Awakening (Ages 2–6)', 'Memory Drawing & Spatial Imagination', 'Sensory Materials & Color Harmonization'],
    zh: ['0-7岁大脑神经元激活启蒙', '记忆联想画与空间感官探索', '综合媒材感知与色彩搭配']
  },
  'CRS-CTN': {
    en: ['Exaggerated Character Design & Storyboards', 'Dynamic Anatomy & Action Poses', 'Marker & Ink Fine Rendering'],
    zh: ['动漫造型夸张与角色设计', '分镜脚本与生动视觉叙事', '马克笔与勾线色彩渲染']
  },
  'CRS-HDC': {
    en: ['Master Jason Koh 30+ Yrs Mentorship', 'Patented Creative 3D Plastic Origami', 'Tactile Clay Modeling & Ceramic Form'],
    zh: ['30年名师亲授立体泥塑与陶艺', '自创专利环保立体塑料折纸工艺', '精细动作与三维审美培养']
  },
  'CRS-CHP': {
    en: ['Classical Xieyi & Gongbi Line Mastery', 'Five-Shade Ink Modulation (Pomo Technique)', 'Poetic Inscription & Traditional Seal Usage'],
    zh: ['写意花鸟与青绿山水正统法度', '墨分五色运笔施墨虚实相生', '诗画一律与传统题款铃印']
  },
  'CRS-SKT': {
    en: ['Academic Chiaroscuro & Tone Harmony', 'Geometric Plaster Casts to Classic Busts', 'Master Life Portraiture & Anatomy'],
    zh: ['严谨学院派三大面五大调光影', '石膏几何体到经典名画石膏胸像', '真人头像结构解剖与写生精修']
  },
  'CRS-SHU': {
    en: ['Dual-Track Hard-Pen & Soft-Brush Instruction', 'Yan / Liu / Zhao Standard Regular Script', 'Tang Rubbings & Harmonic Composition'],
    zh: ['硬笔毛笔双轨名师亲授', '颜柳欧赵经典正楷到行草气韵', '章法布局与碑帖集字创作']
  }
};

const CATEGORY_NAMES = {
  'fine_arts': { en: 'Academic Fine Arts', zh: '学院专业美术' },
  'fine-arts': { en: 'Academic Fine Arts', zh: '学院专业美术' },
  'CAT-FINE': { en: 'Academic Fine Arts', zh: '学院专业美术' },
  'heritage_arts': { en: 'Classical Heritage', zh: '传统书画精粹' },
  'heritage-arts': { en: 'Classical Heritage', zh: '传统书画精粹' },
  'CAT-HRTG': { en: 'Classical Heritage', zh: '传统书画精粹' },
  'youth_arts': { en: 'Youth & Foundation', zh: '少儿美育启智' },
  'youth-arts': { en: 'Youth & Foundation', zh: '少儿美育启智' },
  'CAT-YTH': { en: 'Youth & Foundation', zh: '少儿美育启智' },
  'professional_certification': { en: 'Educator Certification', zh: '师资专业研修' }
};

export class HomePage {
  constructor() {
    this.currentCategory = 'all';
    this.currentJourneyStage = 'all';
    this.allCourses = [];
  }

  async init() {
    // 1. Initialize Hero 5-slide Media Sequence
    heroSlider.init();

    // 2. Initialize Creative Scroll Reveals & 3D Tilt
    animationsEngine.init();

    // 3. Initialize Visitor Entrance Popup
    entrancePopup.init();

    // 4. Load Featured Courses & Category Filters
    await this.renderFeaturedCourses();
    this.initCategoryFilters();

    // 5. Initialize Nine-Level Journey Stage Filter Tabs
    this.initJourneyStageFilters();

    // 6. Load Faculty Spotlight
    await this.renderFacultySpotlight();

    // 7. Listen to Language Change Event for dynamic re-renders
    window.addEventListener('nas:languageChanged', () => {
      if (this.allCourses && this.allCourses.length) {
        this.displayCourses(this.allCourses);
      }
      this.renderFacultySpotlight();
    });
  }

  /**
   * Renders courses dynamically from dataAdapter
   */
  async renderFeaturedCourses() {
    const grid = document.getElementById('featured-courses-grid');
    if (!grid) return;

    try {
      const courses = await dataAdapter.getTable('Courses');
      this.allCourses = courses;
      this.displayCourses(courses);
    } catch (err) {
      console.error('[HomePage] Failed to render courses:', err);
    }
  }

  displayCourses(courses) {
    const grid = document.getElementById('featured-courses-grid');
    if (!grid || !courses) return;

    const lang = i18n.currentLanguage || (typeof i18n.getCurrentLanguage === 'function' ? i18n.getCurrentLanguage() : 'en');
    const isZh = (lang || '').startsWith('zh');

    let filtered = courses;
    if (this.currentCategory !== 'all') {
      const cat = (this.currentCategory || '').toLowerCase();
      const catClean = cat.replace(/[_-]/g, '');

      filtered = courses.filter(c => {
        const cCat = (c.category || '').toLowerCase().replace(/[_-]/g, '');
        const cSlug = (c.category_slug || '').toLowerCase().replace(/[_-]/g, '');
        const cId = (c.id || '').toLowerCase();
        const titleEn = (c.title_en || c.title || '').toLowerCase();
        const titleZh = (c.title_zh || '').toLowerCase();

        if (catClean.includes('youth')) {
          return cCat.includes('youth') || cSlug.includes('youth') || cId.includes('chd') || cId.includes('ctn') || cId.includes('cia') || cId.includes('hdc') || titleEn.includes('children') || titleZh.includes('儿童');
        }
        if (catClean.includes('heritage') || catClean.includes('ink') || catClean.includes('calligraphy')) {
          return cCat.includes('heritage') || cSlug.includes('heritage') || cId.includes('clg') || cId.includes('chp') || cId.includes('shu') || titleEn.includes('calligraphy') || titleEn.includes('chinese painting') || titleZh.includes('书法') || titleZh.includes('国画');
        }
        if (catClean.includes('fine') || catClean.includes('western') || catClean.includes('sketch')) {
          return cCat.includes('fine') || cSlug.includes('fine') || cId.includes('oil') || cId.includes('skt') || cId.includes('wtc') || titleEn.includes('sketch') || titleEn.includes('oil') || titleZh.includes('素描') || titleZh.includes('油画');
        }
        return cCat === catClean || cSlug === catClean;
      });
    }

    grid.innerHTML = filtered.slice(0, 6).map(c => {
      const title = isZh && c.title_zh ? c.title_zh : (c.title_en || c.title || '');
      const altTitle = isZh ? (c.title_en || '') : (c.title_zh || '');
      const summary = isZh && (c.translations?.zh?.summary || c.short_summary_zh || c.description_zh || c.tagline_zh)
        ? (c.translations?.zh?.summary || c.short_summary_zh || c.description_zh || c.tagline_zh)
        : (c.shortDescription || c.short_summary || c.tagline_en || c.description_en || c.summary || '');
      
      const ageLabel = isZh
        ? (c.age_range ? c.age_range.replace('Ages ', '').replace('Adults', '成人') : (c.age_min ? `适合: ${c.age_min}–${c.age_max >= 99 ? '成人' : c.age_max}岁` : '全年龄段'))
        : (c.age_range || (c.age_min ? `Ages ${c.age_min}–${c.age_max >= 99 ? 'Adults' : c.age_max}` : 'All Ages'));

      const catMeta = CATEGORY_NAMES[c.category] || CATEGORY_NAMES[c.category_slug] || CATEGORY_NAMES[c.category_id] || { en: 'Visual Arts', zh: '专业艺术' };
      const catLabel = isZh ? catMeta.zh : catMeta.en;

      const scheduleLabel = isZh
        ? (c.schedule ? c.schedule.split('/')[0] : (c.duration || '学期制精品课'))
        : (c.duration || c.schedule_days || 'Studio Term');

      const highlights = (COURSE_HIGHLIGHTS[c.id] && COURSE_HIGHLIGHTS[c.id][isZh ? 'zh' : 'en']) || [
        isZh ? '正规学院派体系化教研大纲' : 'Standardized Academic Studio Syllabus',
        isZh ? '资深名师小班授课 (限8–12人)' : 'Mentorship in Small Groups (Max 8–12 Pax)',
        isZh ? '直接衔接国家级考级与国际大赛' : 'Direct Link to National Exams & Contests'
      ];

      const exploreBtnText = isZh ? '查看完整大纲 →' : 'Explore Syllabus →';
      const imgSrc = LOCAL_THUMBNAILS[c.id] || c.thumbnail_url || c.image || 'assets/logo/logo.png';

      return `
        <div class="course-card-premium reveal-up">
          <div class="course-media-wrap">
            <img src="${imgSrc}" alt="${title}" class="course-media-img" onerror="this.onerror=null; this.src='assets/logo/logo.png';">
            <div class="course-badge-overlay">
              <span class="seal-badge seal-badge-gold">${ageLabel}</span>
              <span class="seal-badge" style="background: rgba(18, 19, 22, 0.85); color: #FFFFFF; border: 1px solid rgba(255, 255, 255, 0.2);">${catLabel}</span>
            </div>
          </div>
          <div class="course-body-content">
            <h3 class="course-title-main">${title}</h3>
            ${altTitle ? `<div class="course-title-zh">${altTitle}</div>` : ''}
            <p class="course-desc-text">${summary}</p>
            <ul class="course-highlights-list">
              ${highlights.map(h => `
                <li class="course-highlight-item">
                  <span class="course-highlight-icon">✓</span>
                  <span>${h}</span>
                </li>
              `).join('')}
            </ul>
          </div>
          <div class="course-card-bottom">
            <span class="course-schedule-tag">⏱️ ${scheduleLabel}</span>
            <a href="courses.html" class="btn btn-outline btn-sm">${exploreBtnText}</a>
          </div>
        </div>
      `;
    }).join('');

    // Re-trigger scroll reveal for newly added course cards
    if (animationsEngine && typeof animationsEngine.initScrollReveals === 'function') {
      animationsEngine.initScrollReveals();
    }
  }

  /**
   * Initializes Category Filter Tabs
   */
  initCategoryFilters() {
    const tabs = document.querySelectorAll('#course-filter-tabs .filter-pill, .course-filter-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentCategory = tab.getAttribute('data-category') || 'all';
        if (this.allCourses) {
          this.displayCourses(this.allCourses);
        }
      });
    });
  }

  /**
   * Initializes Nine-Level Journey Stage Filter Tabs
   */
  initJourneyStageFilters() {
    const stagePills = document.querySelectorAll('#journey-stage-tabs .nine-level-stage-pill');
    const gradeCards = document.querySelectorAll('#journey-cards-grid .grade-journey-card, .grade-journey-card');

    if (!stagePills.length || !gradeCards.length) return;

    stagePills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        stagePills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const targetStage = pill.getAttribute('data-stage') || 'all';
        this.currentJourneyStage = targetStage;

        gradeCards.forEach(card => {
          const cardStage = card.getAttribute('data-stage');
          if (targetStage === 'all' || cardStage === targetStage) {
            card.style.display = 'flex';
            card.style.opacity = '1';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /**
   * Dynamically renders/updates the CEO & Founder Executive Showcase (Dr. Teng Jiashu)
   */
  async renderFacultySpotlight() {
    // Section 8 is now the prestigious Executive Showcase for CEO / Director Dr. Teng Jiashu.
    // Content is bound to data-i18n and updates on language toggle.
    const section = document.getElementById('ceo-spotlight-section');
    if (!section) return;
  }
}

export const homePage = new HomePage();

// Auto-run on DOM Ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => homePage.init());
  } else {
    homePage.init();
  }
}

