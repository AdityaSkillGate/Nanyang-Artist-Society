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

    if (countBadge) {
      countBadge.textContent = `Showing ${this.filteredCourses.length} of ${this.courses.length} courses`;
    }

    if (this.filteredCourses.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 64px 20px; background: var(--color-gallery-white); border: 1px solid var(--color-paper-border); border-radius: var(--radius-md);">
          <div style="font-size: 48px; margin-bottom: 12px;">🎨</div>
          <h3 style="font-size: 20px; margin-bottom: 8px;">No matching art courses found</h3>
          <p style="font-size: 14px; color: var(--color-ink-muted); margin-bottom: 24px; max-width: 460px; margin-left: auto; margin-right: auto;">
            We couldn't find any courses matching your specific search and filter criteria. Try adjusting or clearing your filters.
          </p>
          <button type="button" class="btn btn-primary btn-sm" id="empty-reset-btn">Clear All Filters</button>
        </div>
      `;
      const emptyReset = document.getElementById('empty-reset-btn');
      if (emptyReset) emptyReset.addEventListener('click', () => this.resetFilters());
      return;
    }

    const viewCourseText = i18n.t('btn.view_details', 'View Course →');
    const enquireText = i18n.t('btn.enquire', 'Enquire');

    grid.innerHTML = this.filteredCourses.map(c => {
      const title = i18n.getField(c, 'title') || c.title_en || c.title || '';
      const summary = i18n.getField(c, 'shortDescription') || i18n.getField(c, 'short_summary') || c.shortDescription || c.short_summary || '';

      return `
        <div class="card course-card">
          <div class="card-media">
            <img src="${c.thumbnail_url || c.image}" alt="${title}" loading="lazy" onerror="this.onerror=null; this.src='../assets/logo/logo.png';">
            <span class="course-badge">${c.age_range || 'All Ages'}</span>
          </div>
          <div class="card-body">
            <div style="display: flex; gap: 6px; margin-bottom: 6px; flex-wrap: wrap;">
              <span class="seal-badge">${c.discipline || 'Fine Arts'}</span>
              ${c.contentStatus === 'client_confirmation_required' ? '<span class="seal-badge seal-badge-gold" style="font-size: 10px;">Client Confirmation</span>' : ''}
            </div>

            <h3 class="card-title" style="font-size: 18px; margin-bottom: 4px;">${title}</h3>
            ${c.title_zh ? `<p style="font-size: 13px; color: var(--color-cinnabar); font-weight: 600; margin-bottom: 8px;">${c.title_zh}</p>` : ''}
            <p class="card-text">${summary}</p>
            
            <div class="course-meta-grid">
              <div><strong>Level:</strong> <span style="text-transform: capitalize;">${c.skillLevel || 'All'}</span></div>
              <div><strong>Format:</strong> ${c.class_format || 'Studio'}</div>
            </div>
            
            <div style="margin-top: 12px; display: flex; gap: 8px;">
              <a href="detail.html?id=${c.id}" class="btn btn-outline btn-sm" style="flex: 1;">${viewCourseText}</a>
              <a href="../contact/index.html?course=${encodeURIComponent(c.title_en || title)}" class="btn btn-primary btn-sm">${enquireText}</a>
            </div>
          </div>
        </div>
      `;
    }).join('');
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
