/**
 * NANYANG ARTISTS SOCIETY — HOMEPAGE INTERACTIVE CONTROLLER
 * Handles Dynamic Course Feeds, Category Filters, Faculty Spotlights,
 * Hero Media Sequence (5 slides), Creative Animations, and Entrance Popup.
 *
 * NOTE: The Grade Examination section on the homepage is a STATIC promotional pathway.
 * Grade state is strictly isolated to grade.html & grade-detail.html.
 */

import { dataAdapter } from './services/dataAdapter.js';
import { i18n } from './services/i18n.js';
import { heroSlider } from './modules/hero-slider.js';
import { animationsEngine } from './modules/animations.js';
import { entrancePopup } from './modules/popup.js';

export class HomePage {
  constructor() {
    this.currentCategory = 'all';
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

    // 5. Load Faculty Spotlight
    await this.renderFacultySpotlight();

    // 6. Listen to Language Change Event for dynamic re-renders
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
      ? courses
      : courses.filter(c => c.category === this.currentCategory || c.age_group === this.currentCategory);

    grid.innerHTML = filtered.slice(0, 6).map(c => {
      const title = i18n.getField(c, 'title') || c.title_en || c.title || '';
      const summary = i18n.getField(c, 'summary') || c.summary_en || c.summary || '';
      const ageGroup = i18n.getField(c, 'age_group') || c.age_group || '';
      const duration = c.duration || '';

      return `
        <div class="card card-lift reveal-up" style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="position: relative; overflow: hidden; border-radius: var(--radius-sm); margin-bottom: 16px; aspect-ratio: 16/9; background: #222;">
              <img src="${c.thumbnail_url || 'assets/logo/logo.png'}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease;" onerror="this.onerror=null; this.src='assets/logo/logo.png';">
              <span class="seal-badge seal-badge-gold" style="position: absolute; top: 12px; left: 12px; z-index: 2;">${ageGroup}</span>
            </div>
            <h3 style="font-size: 18px; margin-bottom: 8px; line-height: 1.3;">${title}</h3>
            ${c.title_zh ? `<h4 style="font-size: 14px; color: var(--color-cinnabar); margin-bottom: 12px; font-weight: 500;">${c.title_zh}</h4>` : ''}
            <p style="font-size: 13px; color: var(--color-ink-muted); line-height: 1.6; margin-bottom: 16px;">
              ${summary}
            </p>
          </div>
          <div style="border-top: 1px solid var(--color-paper-border); padding-top: 12px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 12px; color: var(--color-ink-muted);">${duration}</span>
            <a href="courses.html" class="btn btn-outline btn-sm">Explore Syllabus →</a>
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
    const tabs = document.querySelectorAll('.course-filter-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
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
          <div class="card card-lift reveal-up" style="padding: 24px;">
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
