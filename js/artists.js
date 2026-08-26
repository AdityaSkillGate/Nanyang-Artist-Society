/**
 * NANYANG ARTISTS SOCIETY — ARTISTS & INSTRUCTOR DIRECTORY CONTROLLER
 * 6-Category filter tabs, multi-discipline query, and profile navigation.
 */

import { dataAdapter } from './services/dataAdapter.js';

export class ArtistsDirectory {
  constructor() {
    this.people = [];
    this.filters = {
      query: '',
      category: 'all',
      discipline: 'all'
    };
  }

  async init() {
    try {
      this.people = await dataAdapter.getTable('People');
      this.bindControls();
      this.applyFilters();
    } catch (err) {
      console.error('[ArtistsDirectory] Init error:', err);
    }
  }

  bindControls() {
    // Search input
    const qInput = document.getElementById('artist-search-input');
    if (qInput) {
      qInput.addEventListener('input', (e) => {
        this.filters.query = e.target.value.trim();
        this.applyFilters();
      });
    }

    // Category Tabs & Select
    const catTabs = document.querySelectorAll('[data-artist-category]');
    catTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const cat = tab.getAttribute('data-artist-category');
        this.filters.category = cat;
        catTabs.forEach(t => t.classList.toggle('active', t === tab));
        this.applyFilters();
      });
    });

    const discSelect = document.getElementById('artist-discipline-select');
    if (discSelect) {
      discSelect.addEventListener('change', (e) => {
        this.filters.discipline = e.target.value;
        this.applyFilters();
      });
    }

    const resetBtn = document.getElementById('artist-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.filters = { query: '', category: 'all', discipline: 'all' };
        if (qInput) qInput.value = '';
        if (discSelect) discSelect.value = 'all';
        catTabs.forEach((t, i) => t.classList.toggle('active', i === 0));
        this.applyFilters();
      });
    }
  }

  applyFilters() {
    const q = this.filters.query.toLowerCase();
    const cat = this.filters.category;
    const disc = this.filters.discipline;

    const filtered = this.people.filter(p => {
      // 1. Text Query
      let matchQuery = true;
      if (q) {
        const matchName = p.name_en && p.name_en.toLowerCase().includes(q);
        const matchZh = p.name_zh && p.name_zh.toLowerCase().includes(q);
        const matchRole = p.role_title_en && p.role_title_en.toLowerCase().includes(q);
        const matchRoleZh = p.role_title_zh && p.role_title_zh.toLowerCase().includes(q);
        const matchDisc = p.discipline_specialty && p.discipline_specialty.toLowerCase().includes(q);
        matchQuery = matchName || matchZh || matchRole || matchRoleZh || matchDisc;
      }

      // 2. Category
      let matchCategory = true;
      if (cat !== 'all') {
        if (cat === 'artists') {
          matchCategory = p.category === 'executive_board' || p.category === 'teachers' || p.category === 'artists';
        } else {
          matchCategory = p.category === cat;
        }
      }

      // 3. Discipline
      const matchDiscipline = disc === 'all' || (p.discipline_specialty && p.discipline_specialty.toLowerCase().includes(disc.toLowerCase()));

      return matchQuery && matchCategory && matchDiscipline;
    });

    this.renderDirectory(filtered);
  }

  renderDirectory(results) {
    const container = document.getElementById('artists-grid-container');
    const countBadge = document.getElementById('artists-count-badge');

    if (countBadge) {
      countBadge.textContent = `Showing ${results.length} artist / educator${results.length === 1 ? '' : 's'}`;
    }

    if (!container) return;

    if (results.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 48px 24px; text-align: center; background: var(--color-gallery-white); border: 1px dashed var(--color-paper-border-dark); border-radius: var(--radius-md);">
          <div style="font-size: 38px; margin-bottom: 8px;">🎨</div>
          <h3 style="font-size: 18px; margin-bottom: 4px;">No Artists Found</h3>
          <p style="font-size: 13px; color: var(--color-ink-muted); max-width: 460px; margin: 0 auto 16px;">
            We could not find any members matching your filters. Please try searching with different keywords.
          </p>
          <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('artist-reset-btn').dispatchEvent(new Event('click'))">
            ↺ Reset Filters
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = results.map(p => `
      <div class="card" style="padding: 24px; display: flex; flex-direction: column; height: 100%;">
        <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 14px;">
          <img src="${p.photo_url}" alt="${p.name_en}" style="width: 76px; height: 76px; border-radius: 50%; object-fit: cover; border: 2px solid var(--color-paper-border); flex-shrink: 0;" onerror="this.onerror=null; this.src='../assets/logo/logo.png';">
          <div>
            <span class="seal-badge ${p.category === 'executive_board' ? 'seal-badge-gold' : 'seal-badge-cobalt'}" style="margin-bottom: 4px;">
              ${p.category === 'executive_board' ? 'Executive Board' : (p.category === 'teachers' ? 'Faculty Instructor' : 'Academic Council')}
            </span>
            <h3 style="font-size: 17px; margin: 0 0 2px;">${p.name_en}</h3>
            <h4 style="font-size: 13px; color: var(--color-cinnabar); font-weight: 600; margin: 0 0 2px;">${p.name_zh}</h4>
            <p style="font-size: 11px; color: var(--color-ink-muted); margin: 0;">${p.role_title_en}</p>
          </div>
        </div>

        <div style="background: var(--color-warm-ivory); border-radius: var(--radius-xs); padding: 10px; font-size: 11px; color: var(--color-ink-charcoal); line-height: 1.4; margin-bottom: 14px; border: 1px solid var(--color-paper-border);">
          <strong style="color: var(--color-ink-black); display: block; margin-bottom: 2px;">Specialization:</strong>
          ${p.discipline_specialty}
        </div>

        <p style="font-size: 12px; color: var(--color-ink-charcoal); line-height: 1.5; margin: 0 0 16px; flex-grow: 1; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
          ${p.bio_en}
        </p>

        <div style="margin-top: auto; pt-3; border-top: 1px solid var(--color-paper-border); padding-top: 12px;">
          <a href="detail.html?id=${p.slug || p.id}" class="btn btn-outline btn-sm" style="width: 100%; text-align: center; font-size: 11px;">
            View Biography & Masterworks →
          </a>
        </div>
      </div>
    `).join('');
  }
}

export const artistsDirectory = new ArtistsDirectory();

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    artistsDirectory.init();
  });
}
