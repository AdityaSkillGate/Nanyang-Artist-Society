/**
 * NANYANG ARTISTS SOCIETY — ART COURSES DISCOVERY CONTROLLER
 * Multi-criteria filter engine, fuzzy search, URL parameter syncing, and state views.
 */

import { dataAdapter } from './services/dataAdapter.js';
import { i18n } from './services/i18n.js';

export class CoursesDiscovery {
  constructor() {
    this.courses = [];
    this.filteredCourses = [];
    this.filters = {
      search: '',
      category: 'all',
      ageGroup: 'all',
      skillLevel: 'all',
      goal: 'all',
      featuredOnly: false
    };
  }

  async init() {
    this.parseUrlParams();
    this.bindEvents();
    await this.loadCourses();

    // Listen to Language Change Event
    window.addEventListener('nas:languageChanged', () => {
      this.renderResults();
    });
  }

  parseUrlParams() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('q')) this.filters.search = params.get('q');
    if (params.has('cat')) {
      const cat = params.get('cat').replace('-', '_');
      this.filters.category = cat;
    }
    if (params.has('age')) this.filters.ageGroup = params.get('age');
    if (params.has('level')) this.filters.skillLevel = params.get('level');
    if (params.has('goal')) this.filters.goal = params.get('goal');
    if (params.has('featured')) this.filters.featuredOnly = params.get('featured') === 'true';
  }

  bindEvents() {
    const searchInput = document.getElementById('course-search-input');
    const categoryPills = document.querySelectorAll('[data-filter-cat]');
    const ageSelect = document.getElementById('filter-age-select');
    const levelSelect = document.getElementById('filter-level-select');
    const goalSelect = document.getElementById('filter-goal-select');
    const featuredToggle = document.getElementById('filter-featured-toggle');
    const resetBtn = document.getElementById('reset-filters-btn');

    // Search Input with Debounce
    if (searchInput) {
      if (this.filters.search) searchInput.value = this.filters.search;
      let debounceTimer;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          this.filters.search = e.target.value.trim().toLowerCase();
          this.applyFilters();
        }, 180);
      });
    }

    // Category Filter Pills
    categoryPills.forEach(pill => {
      const cat = pill.getAttribute('data-filter-cat');
      if (this.filters.category === cat) {
        categoryPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
      }
      pill.addEventListener('click', () => {
        categoryPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.filters.category = cat;
        this.applyFilters();
      });
    });

    // Age Select
    if (ageSelect) {
      if (this.filters.ageGroup !== 'all') ageSelect.value = this.filters.ageGroup;
      ageSelect.addEventListener('change', (e) => {
        this.filters.ageGroup = e.target.value;
        this.applyFilters();
      });
    }

    // Level Select
    if (levelSelect) {
      if (this.filters.skillLevel !== 'all') levelSelect.value = this.filters.skillLevel;
      levelSelect.addEventListener('change', (e) => {
        this.filters.skillLevel = e.target.value;
        this.applyFilters();
      });
    }

    // Goal Select
    if (goalSelect) {
      if (this.filters.goal !== 'all') goalSelect.value = this.filters.goal;
      goalSelect.addEventListener('change', (e) => {
        this.filters.goal = e.target.value;
        this.applyFilters();
      });
    }

    // Featured Toggle
    if (featuredToggle) {
      if (this.filters.featuredOnly) featuredToggle.checked = true;
      featuredToggle.addEventListener('change', (e) => {
        this.filters.featuredOnly = e.target.checked;
        this.applyFilters();
      });
    }

    // Reset Button
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.resetFilters());
    }
  }

  async loadCourses() {
    this.renderLoadingState();
    try {
      this.courses = await dataAdapter.getTable('Courses');
      this.applyFilters();
    } catch (err) {
      console.error('[CoursesDiscovery] Failed to load courses:', err);
      this.renderErrorState();
    }
  }

  applyFilters() {
    this.syncUrlParams();

    this.filteredCourses = this.courses.filter(course => {
      // 1. Search filter
      if (this.filters.search) {
        const query = this.filters.search;
        const matchTitleEn = (course.title_en || '').toLowerCase().includes(query);
        const matchTitleZh = (course.title_zh || '').toLowerCase().includes(query);
        const matchDisc = (course.discipline || '').toLowerCase().includes(query);
        const matchDesc = (course.shortDescription || '').toLowerCase().includes(query);
        const matchInst = (course.instructor || '').toLowerCase().includes(query);
        if (!matchTitleEn && !matchTitleZh && !matchDisc && !matchDesc && !matchInst) {
          return false;
        }
      }

      // 2. Category filter
      if (this.filters.category !== 'all') {
        const cat = this.filters.category.replace('-', '_');
        if (course.category !== cat && course.category_slug !== this.filters.category) {
          return false;
        }
      }

      // 3. Age Group filter
      if (this.filters.ageGroup !== 'all') {
        if (course.ageGroup !== this.filters.ageGroup) {
          return false;
        }
      }

      // 4. Skill Level filter
      if (this.filters.skillLevel !== 'all') {
        if (course.skillLevel !== this.filters.skillLevel) {
          return false;
        }
      }

      // 5. Goal filter
      if (this.filters.goal !== 'all') {
        if (course.goal !== this.filters.goal) {
          return false;
        }
      }

      // 6. Featured filter
      if (this.filters.featuredOnly) {
        if (!course.featured) return false;
      }

      return true;
    });

    this.renderResults();
  }

  syncUrlParams() {
    const params = new URLSearchParams();
    if (this.filters.search) params.set('q', this.filters.search);
    if (this.filters.category !== 'all') params.set('cat', this.filters.category.replace('_', '-'));
    if (this.filters.ageGroup !== 'all') params.set('age', this.filters.ageGroup);
    if (this.filters.skillLevel !== 'all') params.set('level', this.filters.skillLevel);
    if (this.filters.goal !== 'all') params.set('goal', this.filters.goal);
    if (this.filters.featuredOnly) params.set('featured', 'true');

    const newQuery = params.toString() ? `?${params.toString()}` : window.location.pathname;
    window.history.replaceState(null, '', newQuery);
  }

  renderResults() {
    const grid = document.getElementById('courses-catalog-grid');
    const countBadge = document.getElementById('courses-count-badge');
    if (!grid) return;

    const isZh = (i18n.getLanguage() === 'zh-SG' || i18n.getLanguage() === 'zh');

    if (countBadge) {
      countBadge.textContent = isZh 
        ? `共显示 ${this.courses.length} 门专业课程中的 ${this.filteredCourses.length} 门`
        : `Showing ${this.filteredCourses.length} of ${this.courses.length} courses`;
    }

    if (this.filteredCourses.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 64px 20px; background: var(--color-gallery-white); border: 1px solid var(--color-paper-border); border-radius: var(--radius-md);">
          <div style="font-size: 48px; margin-bottom: 12px;">🎨</div>
          <h3 style="font-size: 20px; margin-bottom: 8px;">${isZh ? '未找到符合条件的艺术课程' : 'No matching art courses found'}</h3>
          <p style="font-size: 14px; color: var(--color-ink-muted); margin-bottom: 24px; max-width: 460px; margin-left: auto; margin-right: auto;">
            ${isZh ? '当前筛选条件下暂无课程，请尝试重置筛选或调整搜索关键词。' : "We couldn't find any courses matching your specific search and filter criteria. Try adjusting or clearing your filters."}
          </p>
          <button type="button" class="btn btn-primary btn-sm" id="empty-reset-btn">${isZh ? '重置全部筛选' : 'Clear All Filters'}</button>
        </div>
      `;
      const emptyReset = document.getElementById('empty-reset-btn');
      if (emptyReset) emptyReset.addEventListener('click', () => this.resetFilters());
      return;
    }

    const viewCourseText = isZh ? '查看详情 →' : i18n.t('btn.view_details', 'View Details →');
    const enquireText = isZh ? '课程咨询' : i18n.t('btn.enquire', 'Enquire Course');
    const levelLabel = isZh ? '难度等级:' : 'Level:';
    const formatLabel = isZh ? '授课形式:' : 'Format:';

    const isRoot = !window.location.pathname.includes('/courses/');
    const detailPrefix = isRoot ? 'course-detail.html' : 'detail.html';
    const contactPrefix = isRoot ? 'contact.html' : '../contact/index.html';
    const fallbackLogo = isRoot ? 'assets/logo/logo.png' : '../assets/logo/logo.png';

    grid.innerHTML = this.filteredCourses.map(c => {
      const primaryTitle = isZh ? (c.title_zh || c.title) : (c.title_en || c.title || '');
      const secondaryTitle = isZh 
        ? (c.title_en ? `<p style="font-size: 12.5px; color: var(--color-ink-muted); margin-bottom: 8px;">${c.title_en}</p>` : '')
        : (c.title_zh ? `<p style="font-size: 13px; color: var(--color-cinnabar); font-weight: 600; margin-bottom: 8px;">${c.title_zh}</p>` : '');

      const summary = isZh
        ? (c.shortDescription_zh || c.short_summary_zh || c.excerpt_zh || c.shortDescription || c.short_summary || '')
        : (c.shortDescription || c.short_summary || '');

      const ageBadge = this._formatAge(c.age_range, isZh);
      const disciplineBadge = this._formatDiscipline(c.discipline, isZh);
      const levelText = this._formatLevel(c.skillLevel, isZh);
      const formatText = this._formatFormat(c.class_format, isZh);

      return `
        <div class="card course-card">
          <div class="card-media">
            <img src="${c.thumbnail_url || c.image}" alt="${primaryTitle}" loading="lazy" onerror="this.onerror=null; this.src='${fallbackLogo}';">
            <span class="course-badge">${ageBadge}</span>
          </div>
          <div class="card-body">
            <div style="display: flex; gap: 6px; margin-bottom: 8px; flex-wrap: wrap;">
              <span class="seal-badge">${disciplineBadge}</span>
              ${c.contentStatus === 'client_confirmation_required' ? `<span class="seal-badge seal-badge-gold" style="font-size: 10px;">${isZh ? '官方核准' : 'Client Confirmation'}</span>` : ''}
            </div>

            <h3 class="card-title">${primaryTitle}</h3>
            ${secondaryTitle}
            <p class="card-text">${summary}</p>
            
            <div class="course-meta-grid">
              <div><strong>${levelLabel}</strong> <span>${levelText}</span></div>
              <div><strong>${formatLabel}</strong> <span>${formatText}</span></div>
            </div>
            
            <div class="course-card-actions">
              <a href="${detailPrefix}?id=${c.id}" class="btn btn-outline btn-sm" style="flex: 1;">${viewCourseText}</a>
              <a href="${contactPrefix}?course=${encodeURIComponent(c.title_en || primaryTitle)}" class="btn btn-primary btn-sm">${enquireText}</a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  _formatAge(ageStr, isZh) {
    if (!ageStr) return isZh ? '全年龄' : 'All Ages';
    if (!isZh) return ageStr;
    const map = {
      'Ages 13+ / Adults': '13岁+ / 成人',
      'Ages 9+ / Teens & Adults': '9岁+ / 青少年与成人',
      'Ages 8+ / Teens': '8岁+ / 青少年',
      'Ages 8+ / Teens & Adults': '8岁+ / 青少年与成人',
      'Ages 7+ to Adults': '7岁+ / 青少年与成人',
      'Ages 7–12 / Primary': '7–12岁 / 少儿进阶',
      'Ages 4–8 / Children': '4–8岁 / 儿童启智',
      'Ages 3–8 Years': '3–8岁 / 少儿启蒙',
      'Ages 3-8 Years': '3–8岁 / 少儿启蒙',
      'Ages 16+ / Educators': '16岁+ / 师资研修'
    };
    return map[ageStr] || ageStr;
  }

  _formatDiscipline(disc, isZh) {
    if (!disc) return isZh ? '纯美术' : 'Fine Arts';
    if (!isZh) return disc;
    const map = {
      'Oil Painting': '油画研习',
      'Academic Sketching': '学院派素描',
      'Watercolor & Gouache': '水彩水粉',
      'Chinese Calligraphy': '中国书法',
      'Chinese Ink & Shanshui': '水墨山水',
      'Children Intellectual Art': '少儿启智美术',
      'Art Educator Certification': '师资认证'
    };
    return map[disc] || disc;
  }

  _formatLevel(lvl, isZh) {
    if (!lvl) return isZh ? '全阶段' : 'All Levels';
    if (!isZh) return lvl.charAt(0).toUpperCase() + lvl.slice(1);
    const map = {
      'beginner': '入门基础',
      'intermediate': '进阶研习',
      'advanced': '高阶研修',
      'all': '全阶段'
    };
    return map[lvl.toLowerCase()] || lvl;
  }

  _formatFormat(fmt, isZh) {
    if (!fmt) return isZh ? '工作室制' : 'Studio';
    if (!isZh) return fmt;
    const map = {
      'Studio Masterclass': '大师工作室',
      'Studio Practical': '实践工坊',
      'Studio Workshop': '研习工作坊',
      'Specialized Studio': '专业工作室',
      'Foundational Workshop': '基础启蒙班'
    };
    return map[fmt] || fmt;
  }


  renderLoadingState() {
    const grid = document.getElementById('courses-catalog-grid');
    if (!grid) return;

    grid.innerHTML = Array(6).fill(0).map(() => `
      <div class="card" style="opacity: 0.6;">
        <div style="aspect-ratio: 16/10; background: var(--color-warm-ivory-dark);"></div>
        <div style="padding: 20px;">
          <div style="height: 16px; width: 40%; background: var(--color-paper-border); border-radius: 2px; margin-bottom: 12px;"></div>
          <div style="height: 22px; width: 80%; background: var(--color-paper-border); border-radius: 2px; margin-bottom: 8px;"></div>
          <div style="height: 14px; width: 60%; background: var(--color-paper-border); border-radius: 2px; margin-bottom: 16px;"></div>
          <div style="height: 38px; width: 100%; background: var(--color-paper-border); border-radius: 4px;"></div>
        </div>
      </div>
    `).join('');
  }

  renderErrorState() {
    const grid = document.getElementById('courses-catalog-grid');
    if (!grid) return;

    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 64px 20px; background: var(--color-gallery-white); border: 1px solid var(--color-cinnabar); border-radius: var(--radius-md);">
        <div style="font-size: 48px; margin-bottom: 12px; color: var(--color-cinnabar);">⚠️</div>
        <h3 style="font-size: 20px; margin-bottom: 8px;">Unable to load courses</h3>
        <p style="font-size: 14px; color: var(--color-ink-muted); margin-bottom: 24px;">An unexpected error occurred while querying studio courses.</p>
        <button type="button" class="btn btn-primary btn-sm" id="retry-courses-btn">Retry Loading</button>
      </div>
    `;

    const retryBtn = document.getElementById('retry-courses-btn');
    if (retryBtn) retryBtn.addEventListener('click', () => this.loadCourses());
  }

  resetFilters() {
    this.filters = {
      search: '',
      category: 'all',
      ageGroup: 'all',
      skillLevel: 'all',
      goal: 'all',
      featuredOnly: false
    };

    const searchInput = document.getElementById('course-search-input');
    const categoryPills = document.querySelectorAll('[data-filter-cat]');
    const ageSelect = document.getElementById('filter-age-select');
    const levelSelect = document.getElementById('filter-level-select');
    const goalSelect = document.getElementById('filter-goal-select');
    const featuredToggle = document.getElementById('filter-featured-toggle');

    if (searchInput) searchInput.value = '';
    categoryPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-filter-cat') === 'all'));
    if (ageSelect) ageSelect.value = 'all';
    if (levelSelect) levelSelect.value = 'all';
    if (goalSelect) goalSelect.value = 'all';
    if (featuredToggle) featuredToggle.checked = false;

    this.applyFilters();
  }
}

export const coursesDiscovery = new CoursesDiscovery();

// Auto-run on DOM Ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      coursesDiscovery.init();
    });
  } else {
    coursesDiscovery.init();
  }
}
