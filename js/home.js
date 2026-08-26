/**
 * NANYANG ARTISTS SOCIETY — HOMEPAGE INTERACTIVE CONTROLLER
 * Handles Dynamic Course Feeds, Category Filters, Grade 1-9 Progression Strip,
 * Curated Gallery Preview, and Faculty Spotlights.
 */

import { dataAdapter } from './services/dataAdapter.js';
import { i18n } from './services/i18n.js';

// Grade Progression Rubric Data (Verified 6 Disciplines Standard)
const GRADE_CRITERIA_MAP = {
  1: {
    level: "Foundation Grade 1 (初级一阶)",
    age: "Ages 4–7 / Beginners",
    calligraphy: "Fundamental brush grip, vertical & horizontal straight strokes (横、竖基本笔画及执笔规范)",
    painting: "Basic ink wash tonality, dotting and line tracing of fruit/vegetables (水墨浓淡初阶、蔬果写意点染)",
    sketch: "Simple geometric cube/sphere contouring and basic light-shadow division (几何单体线描与基本明暗区分)",
    duration: "60 mins",
    paperSize: "4-Foot Half Sheet (四尺对开) / A4"
  },
  2: {
    level: "Foundation Grade 2 (初级二阶)",
    age: "Ages 6–9 / Junior",
    calligraphy: "Combining strokes: Pie (撇) and Na (捺), regular spacing on grid paper (撇捺舒展与九宫格结构平衡)",
    painting: "Small birds, aquatic animals (goldfish/shrimp) with two-tone ink grading (游鱼小鸟写意与双色接染)",
    sketch: "Combined two-geometric solids with cast shadow and mid-tone rendering (组合几何形体结构与投影表现)",
    duration: "75 mins",
    paperSize: "4-Foot Half Sheet / A4"
  },
  3: {
    level: "Junior Grade 3 (初阶三级)",
    age: "Ages 7–11",
    calligraphy: "Four-character auspicious phrases in Standard Regular Script (楷书四字吉语与落款章法)",
    painting: "Traditional Orchid and Bamboo ink brushwork with rhythmic bone-strokes (四君子之兰竹墨法与骨法用笔)",
    sketch: "Complex polyhedron and simple still-life stoneware (多面体与简单陶罐明暗全因素素描)",
    duration: "90 mins",
    paperSize: "4-Foot Half Sheet / A3"
  },
  4: {
    level: "Intermediate Grade 4 (中级四阶)",
    age: "Ages 8–13",
    calligraphy: "Tang Dynasty poetry quatrains (20 characters) with side inscription (五言绝句楷书整幅与穷款)",
    painting: "Chrysanthemum and Plum Blossom compositions with mineral color wash (四君子之梅菊写意与石色点缀)",
    sketch: "Still life ceramic vase, fruit group, and draped fabric textures (陶瓷静物组合与衬布质感空间表现)",
    duration: "90 mins",
    paperSize: "4-Foot 4-Cut Sheet (四尺四开) / A3"
  },
  5: {
    level: "Intermediate Grade 5 (中级五阶)",
    age: "Ages 9–15",
    calligraphy: "Clerical Script (隶书) intro or Cursive (行书) single-line balance (隶书汉碑意趣或行书连笔初阶)",
    painting: "Classic Shanshui landscape: tree rocks, riverbanks, and distant misty mountain (山水树石勾勒与远山云烟)",
    sketch: "Complex still life group with reflective glassware and metallic elements (玻璃金属高反光质感组合)",
    duration: "120 mins",
    paperSize: "4-Foot 3-Cut Sheet / A3"
  },
  6: {
    level: "Proficiency Grade 6 (中阶六级)",
    age: "Ages 10–16",
    calligraphy: "Seven-character Tang poem in Yan or Liu Regular style with full seal placement (七言绝句正体与双印章法)",
    painting: "Lingnan style flower-and-bird (Peony / Lotus) with nuanced color gradations (岭南没骨牡丹荷花与折枝构图)",
    sketch: "Plaster facial features (David's eye, nose, mouth, ear) with anatomical accuracy (石膏五官切面与骨骼比例)",
    duration: "120 mins",
    paperSize: "4-Foot Sheet (四尺整纸) / Half Imperial"
  },
  7: {
    level: "Advanced Grade 7 (高级七阶)",
    age: "Ages 12+ / Youth & Adult",
    calligraphy: "Semi-cursive Running Script (行书) poem scrolls with rhythmic tempo (行书唐宋诗词条幅与气脉贯通)",
    painting: "Comprehensive landscape scroll: multi-layered cun-wrinkle textures (全景山水披麻或斧劈皴法)",
    sketch: "Plaster bust classical portrait (Agrippa / Voltaire / Venus) structural lighting (阿格里巴/伏尔泰石膏头像)",
    duration: "150 mins",
    paperSize: "4-Foot Sheet / Half Imperial"
  },
  8: {
    level: "Mastery Grade 8 (高级八阶)",
    age: "Ages 14+ / Advanced",
    calligraphy: "Dual scripts: Choice of Seal/Clerical + Running cursive couplet (篆隶/行草对联创作与长题自作诗)",
    painting: "Freehand Large Ink (大写意) or Fine Brush Meticulous (工笔花鸟) with multi-glazes (大写意泼墨或工笔设色)",
    sketch: "Live model head portrait and hand studies from life (真人头部写生与骨骼肌肉动态捕捉)",
    duration: "180 mins",
    paperSize: "4-Foot Sheet / Full Imperial"
  },
  9: {
    level: "Apex Grade 9 (专业九级 · 毕业段位)",
    age: "Ages 15+ / Pre-Academy",
    calligraphy: "Master classical creation scroll with artistic personal style, seal carving, and critique (自选经典书体大幅创作与名印题评)",
    painting: "Original composition major work: Full landscape / Bird-and-Flower thematic piece (主题性大型中国画创作与诗书画印合一)",
    sketch: "Full academic live model bust/torso with tonal harmony and spatial mastery (真人半身胸像与全因素学术写生)",
    duration: "210 mins",
    paperSize: "6-Foot Sheet (六尺宣纸) / Full Imperial"
  }
};

export class HomePage {
  constructor() {
    this.currentCategory = 'all';
    this.currentGrade = 1;
    this.allCourses = [];
  }

  async init() {
    await this.renderFeaturedCourses();
    this.initCategoryFilters();
    this.initGradeProgression();
    await this.renderFacultySpotlight();

    // Listen to Language Change Event for dynamic re-renders
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

    const filtered = this.currentCategory === 'all'
      ? courses.slice(0, 6)
      : courses.filter(c => c.category_slug === this.currentCategory || c.target_group === this.currentCategory);

    grid.innerHTML = filtered.map(c => {
      const title = i18n.getField(c, 'title') || c.title_en || c.title || '';
      const summary = i18n.getField(c, 'short_summary') || i18n.getField(c, 'shortDescription') || c.short_summary || c.shortDescription || '';
      const viewSyllabusText = i18n.t('btn.view_details', 'View Syllabus');
      const enquireText = i18n.t('btn.enquire', 'Enquire');

      return `
        <div class="card course-card">
          <div class="card-media">
            <img src="${c.thumbnail_url || c.image}" alt="${title}" loading="lazy" onerror="this.onerror=null; this.src='assets/logo/logo.png';">
            <span class="course-badge">${c.age_range || 'All Ages'}</span>
          </div>
          <div class="card-body">
            <span class="seal-badge" style="margin-bottom: 6px; align-self: flex-start;">${c.discipline || 'Fine Arts'}</span>
            <h3 class="card-title" style="font-size: 18px; margin-bottom: 4px;">${title}</h3>
            ${c.title_zh ? `<p style="font-size: 13px; color: var(--color-cinnabar); font-weight: 600; margin-bottom: 8px;">${c.title_zh}</p>` : ''}
            <p class="card-text">${summary}</p>
            
            <div class="course-meta-grid">
              <div><strong>Format:</strong> ${c.class_format || 'Studio'}</div>
              <div><strong>Capacity:</strong> ${c.max_class_size || '8'} pax</div>
            </div>
            <div style="margin-top: 12px; display: flex; gap: 8px;">
              <a href="courses/detail.html?id=${c.id}" class="btn btn-outline btn-sm" style="flex: 1;">${viewSyllabusText}</a>
              <a href="contact/index.html?course=${encodeURIComponent(c.title_en || title)}" class="btn btn-primary btn-sm">${enquireText}</a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  /**
   * Initializes Course Category Tabs
   */
  initCategoryFilters() {
    const tabs = document.querySelectorAll('#course-filter-tabs .filter-pill');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentCategory = tab.getAttribute('data-category');
        if (this.allCourses) {
          this.displayCourses(this.allCourses);
        }
      });
    });
  }

  /**
   * Initializes Grade 1-9 Visual Progression Strip
   */
  initGradeProgression() {
    const nodeBtns = document.querySelectorAll('.grade-node-btn');
    const updateGradeDisplay = (gradeNum) => {
      const data = GRADE_CRITERIA_MAP[gradeNum];
      if (!data) return;

      nodeBtns.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-grade') === String(gradeNum));
      });

      const titleEl = document.getElementById('grade-preview-title');
      const ageEl = document.getElementById('grade-preview-age');
      const calligEl = document.getElementById('grade-preview-calligraphy');
      const paintEl = document.getElementById('grade-preview-painting');
      const sketchEl = document.getElementById('grade-preview-sketch');
      const durEl = document.getElementById('grade-preview-duration');
      const paperEl = document.getElementById('grade-preview-paper');
      const btnLink = document.getElementById('grade-preview-link');

      if (titleEl) titleEl.textContent = data.level;
      if (ageEl) ageEl.textContent = data.age;
      if (calligEl) calligEl.textContent = data.calligraphy;
      if (paintEl) paintEl.textContent = data.painting;
      if (sketchEl) sketchEl.textContent = data.sketch;
      if (durEl) durEl.textContent = data.duration;
      if (paperEl) paperEl.textContent = data.paperSize;
      if (btnLink) btnLink.href = `grade-examination/discipline.html?grade=${gradeNum}`;
    };

    nodeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const grade = parseInt(btn.getAttribute('data-grade'), 10);
        this.currentGrade = grade;
        updateGradeDisplay(grade);
      });
    });

    // Default Grade 1
    updateGradeDisplay(1);
  }

  /**
   * Dynamically renders faculty spotlight cards
   */
  async renderFacultySpotlight() {
    const container = document.getElementById('faculty-spotlight-grid');
    if (!container) return;

    try {
      const people = await dataAdapter.getTable('People');
      container.innerHTML = people.slice(0, 4).map(p => {
        const name = i18n.getField(p, 'name') || p.name_en || p.name || '';
        const role = i18n.getField(p, 'role_title') || p.role_title_en || p.role || '';
        const bio = i18n.getField(p, 'bio') || p.bio_en || p.bio || '';

        return `
          <div class="card" style="padding: 24px;">
            <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 16px;">
              <img src="${p.photo_url}" alt="${name}" style="width: 64px; height: 64px; border-radius: var(--radius-full); object-fit: cover; border: 2px solid var(--color-cinnabar);" onerror="this.onerror=null; this.src='assets/logo/logo.png';">
              <div>
                <span class="seal-badge" style="font-size: 11px;">${role}</span>
                <h3 style="font-size: 17px; margin: 4px 0 2px;">${name}</h3>
                ${p.name_zh ? `<p style="font-size: 13px; color: var(--color-cinnabar); margin: 0; font-weight: 600;">${p.name_zh}</p>` : ''}
              </div>
            </div>
            <p style="font-size: 13px; color: var(--color-ink-muted); line-height: 1.5; margin-bottom: 12px;">${bio}</p>
            <div style="border-top: 1px solid var(--color-paper-border); padding-top: 8px; font-size: 12px; color: var(--color-ink-charcoal);">
              <strong>Specialty:</strong> ${p.discipline_specialty || p.discipline || ''}
            </div>
          </div>
        `;
      }).join('');
    } catch (err) {
      console.error('[HomePage] Failed to render faculty:', err);
    }
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
