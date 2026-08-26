/**
 * NANYANG ARTISTS SOCIETY — COMPETITION ARCHIVE & WINNERS ENGINE
 * Multi-criteria filter engine, historical edition browser, winner cards renderer, and official poster zoom/download modal.
 */

import { dataAdapter } from './services/dataAdapter.js';

export class CompetitionArchive {
  constructor() {
    this.competitions = [];
    this.winners = [];
    this.filters = {
      query: '',
      year: 'all',
      competitionId: 'all',
      awardTier: 'all',
      ageGroup: 'all'
    };
    this.posterZoom = 1.0;
    this.posterPanX = 0;
    this.posterPanY = 0;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
  }

  async init() {
    try {
      this.competitions = await dataAdapter.getTable('Competitions');
      this.winners = await dataAdapter.getTable('CompetitionWinners');

      this.bindInputs();
      this.renderCompetitionEditions();
      this.applyFilters();
    } catch (err) {
      console.error('[CompetitionArchive] Init error:', err);
    }
  }

  bindInputs() {
    const qInput = document.getElementById('archive-search-input');
    const yearSelect = document.getElementById('archive-year-select');
    const compSelect = document.getElementById('archive-competition-select');
    const awardSelect = document.getElementById('archive-award-select');
    const ageSelect = document.getElementById('archive-age-select');
    const resetBtn = document.getElementById('archive-reset-btn');

    if (qInput) {
      qInput.addEventListener('input', (e) => {
        this.filters.query = e.target.value.trim();
        this.applyFilters();
      });
    }

    if (yearSelect) {
      yearSelect.addEventListener('change', (e) => {
        this.filters.year = e.target.value;
        this.applyFilters();
      });
    }

    if (compSelect) {
      compSelect.addEventListener('change', (e) => {
        this.filters.competitionId = e.target.value;
        this.applyFilters();
      });
    }

    if (awardSelect) {
      awardSelect.addEventListener('change', (e) => {
        this.filters.awardTier = e.target.value;
        this.applyFilters();
      });
    }

    if (ageSelect) {
      ageSelect.addEventListener('change', (e) => {
        this.filters.ageGroup = e.target.value;
        this.applyFilters();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.filters = { query: '', year: 'all', competitionId: 'all', awardTier: 'all', ageGroup: 'all' };
        if (qInput) qInput.value = '';
        if (yearSelect) yearSelect.value = 'all';
        if (compSelect) compSelect.value = 'all';
        if (awardSelect) awardSelect.value = 'all';
        if (ageSelect) ageSelect.value = 'all';
        this.applyFilters();
      });
    }

    // Modal Events
    const closeBtn = document.getElementById('poster-modal-close');
    const modal = document.getElementById('poster-modal');
    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => this.closePosterModal());
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closePosterModal();
      });
    }

    const zoomInBtn = document.getElementById('poster-zoom-in-btn');
    const zoomOutBtn = document.getElementById('poster-zoom-out-btn');
    const zoomResetBtn = document.getElementById('poster-zoom-reset-btn');

    if (zoomInBtn) zoomInBtn.addEventListener('click', () => this.zoomPoster(0.25));
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => this.zoomPoster(-0.25));
    if (zoomResetBtn) zoomResetBtn.addEventListener('click', () => this.resetPosterTransform());

    // Poster Pan
    const viewport = document.getElementById('poster-modal-viewport');
    if (viewport) {
      viewport.addEventListener('mousedown', (e) => {
        if (this.posterZoom <= 1.0) return;
        this.isDragging = true;
        this.startX = e.clientX - this.posterPanX;
        this.startY = e.clientY - this.posterPanY;
      });

      window.addEventListener('mousemove', (e) => {
        if (!this.isDragging) return;
        this.posterPanX = e.clientX - this.startX;
        this.posterPanY = e.clientY - this.startY;
        this.applyPosterTransform();
      });

      window.addEventListener('mouseup', () => {
        this.isDragging = false;
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closePosterModal();
    });
  }

  renderCompetitionEditions() {
    const container = document.getElementById('archive-editions-container');
    if (!container) return;

    container.innerHTML = this.competitions.map(c => `
      <div class="card" style="padding: 24px; display: flex; flex-direction: column; ${c.year === 2020 ? 'border: 2px solid var(--color-gold);' : ''}">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
          <span class="seal-badge ${c.status === 'open_for_submissions' ? '' : 'seal-badge-gold'}">
            ${c.status === 'open_for_submissions' ? '🟢 Open for Entries' : 'Concluded Salon'}
          </span>
          <span style="font-size: 20px; font-weight: 800; color: var(--color-gold);">${c.year}</span>
        </div>

        <h3 style="font-size: 18px; margin: 0 0 2px;">${c.title}</h3>
        <h4 style="font-size: 13px; color: var(--color-cinnabar); font-weight: 600; margin: 0 0 10px;">${c.title_zh}</h4>
        
        <p style="font-size: 13px; color: var(--color-ink-charcoal); line-height: 1.5; margin: 0 0 14px; flex-grow: 1;">
          <strong>Theme:</strong> “${c.theme}” (${c.theme_zh})<br>
          <span style="color: var(--color-ink-muted); font-size: 12px;">${c.description}</span>
        </p>

        <!-- Age Groups Breakdown -->
        <div style="background: var(--color-warm-ivory); border-radius: var(--radius-xs); padding: 10px; font-size: 11px; color: var(--color-ink-charcoal); line-height: 1.4; margin-bottom: 16px; border: 1px solid var(--color-paper-border);">
          <strong style="color: var(--color-ink-black); display: block; margin-bottom: 4px;">Verified Age Categories (${c.year}):</strong>
          ${c.ageGroups.map(ag => `<div>• <strong>${ag.groupName}:</strong> ${ag.ageRange} <span style="color: var(--color-ink-muted);">(${ag.desc})</span></div>`).join('')}
        </div>

        <!-- Poster & Specification Actions -->
        <div style="display: flex; gap: 8px; margin-top: auto; flex-wrap: wrap;">
          <button type="button" class="btn btn-outline btn-sm" data-view-poster="${c.poster}" data-poster-title="${c.title} Official Poster" style="font-size: 11px;">
            🖼️ View Official Poster
          </button>
          <a href="${c.poster}" download="Nanyang-Star-${c.year}-Official-Poster.jpg" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="font-size: 11px;">
            ⬇️ Download Poster
          </a>
        </div>
      </div>
    `).join('');

    // Bind Poster View
    const posterBtns = container.querySelectorAll('[data-view-poster]');
    posterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const url = btn.getAttribute('data-view-poster');
        const title = btn.getAttribute('data-poster-title');
        this.openPosterModal(url, title);
      });
    });
  }

  applyFilters() {
    const q = this.filters.query.toLowerCase();
    const yr = this.filters.year;
    const comp = this.filters.competitionId;
    const awd = this.filters.awardTier;
    const age = this.filters.ageGroup;

    const filtered = this.winners.filter(w => {
      // 1. Text Query
      let matchQuery = true;
      if (q) {
        const matchName = w.name && w.name.toLowerCase().includes(q);
        const matchZh = w.chineseName && w.chineseName.toLowerCase().includes(q);
        const matchArt = w.artwork && w.artwork.title && w.artwork.title.toLowerCase().includes(q);
        const matchArtZh = w.artwork && w.artwork.title_zh && w.artwork.title_zh.toLowerCase().includes(q);
        const matchSchool = w.school && w.school.toLowerCase().includes(q);
        const matchRegion = w.region && w.region.toLowerCase().includes(q);
        matchQuery = matchName || matchZh || matchArt || matchArtZh || matchSchool || matchRegion;
      }

      // 2. Year Match
      const matchYear = yr === 'all' || w.year.toString() === yr;

      // 3. Competition Match
      const matchComp = comp === 'all' || w.competitionId === comp;

      // 4. Award Tier Match
      const matchAward = awd === 'all' || w.awardTier.toLowerCase() === awd.toLowerCase();

      // 5. Age Group Match
      const matchAge = age === 'all' || w.ageGroup.toLowerCase().includes(age.toLowerCase());

      return matchQuery && matchYear && matchComp && matchAward && matchAge;
    });

    this.renderWinners(filtered);
  }

  renderWinners(results) {
    const container = document.getElementById('archive-winners-grid');
    const badge = document.getElementById('archive-winners-count');

    if (badge) {
      badge.textContent = `Showing ${results.length} laureate artwork${results.length === 1 ? '' : 's'}`;
    }

    if (!container) return;

    if (results.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 48px 24px; text-align: center; background: var(--color-gallery-white); border: 1px dashed var(--color-paper-border-dark); border-radius: var(--radius-md);">
          <div style="font-size: 38px; margin-bottom: 8px;">🎨</div>
          <h3 style="font-size: 18px; margin-bottom: 4px;">No Laureates Found</h3>
          <p style="font-size: 13px; color: var(--color-ink-muted); max-width: 460px; margin: 0 auto 16px;">
            We could not find any winning artworks matching your specific criteria. Please adjust your filters or reset search.
          </p>
          <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('archive-reset-btn').dispatchEvent(new Event('click'))">
            ↺ Reset Filters
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = results.map(w => `
      <div class="comp-laureate-card">
        <div style="position: relative; overflow: hidden;">
          <img src="${w.artwork.imageUrl}" alt="${w.artwork.title}" class="comp-laureate-img" data-view-poster="${w.artwork.imageUrl}" data-poster-title="${w.artwork.title} - ${w.name}" onerror="this.onerror=null; this.src='../assets/logo/logo.png';">
          <span class="comp-award-pill ${w.awardTier === 'Grand Prize' ? 'comp-award-grand' : 'comp-award-gold'}" style="position: absolute; top: 12px; right: 12px;">
            ${w.award.split(' (')[0]}
          </span>
          <span style="position: absolute; bottom: 10px; left: 10px; background: rgba(18, 19, 22, 0.85); color: #FFFFFF; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 2px;">
            ${w.year}
          </span>
        </div>

        <div style="padding: 18px; display: flex; flex-direction: column; flex-grow: 1;">
          <h4 style="font-size: 16px; margin: 0 0 2px;">${w.artwork.title}</h4>
          <h5 style="font-size: 12px; color: var(--color-cinnabar); font-weight: 600; margin: 0 0 10px;">${w.artwork.title_zh}</h5>

          <div style="font-size: 12px; color: var(--color-ink-charcoal); line-height: 1.4; margin-bottom: 12px;">
            <p style="margin: 0 0 2px;">👤 <strong>Candidate:</strong> ${w.name} (${w.chineseName})</p>
            <p style="margin: 0 0 2px;">🏫 <strong>School/City:</strong> ${w.school} (${w.region})</p>
            <p style="margin: 0 0 2px;">🎨 <strong>Medium:</strong> ${w.artwork.medium}</p>
            <p style="margin: 0;">🏅 <strong>Age Category:</strong> <strong>${w.ageGroup}</strong></p>
          </div>
        </div>
      </div>
    `).join('');

    // Bind Winner Artwork Zoom
    const artworkImgs = container.querySelectorAll('[data-view-poster]');
    artworkImgs.forEach(img => {
      img.addEventListener('click', () => {
        const url = img.getAttribute('data-view-poster');
        const title = img.getAttribute('data-poster-title');
        this.openPosterModal(url, title);
      });
    });
  }

  openPosterModal(url, title) {
    const modal = document.getElementById('poster-modal');
    const img = document.getElementById('poster-modal-img');
    const cap = document.getElementById('poster-modal-caption');
    const dl = document.getElementById('poster-modal-download-btn');

    if (modal && img) {
      img.src = url;
      if (cap) cap.textContent = title || 'Official Competition Visual';
      if (dl) {
        dl.href = url;
        dl.download = 'Nanyang-Artists-Society-Poster.jpg';
      }
      this.resetPosterTransform();
      modal.style.display = 'flex';
    }
  }

  closePosterModal() {
    const modal = document.getElementById('poster-modal');
    if (modal) modal.style.display = 'none';
  }

  zoomPoster(delta) {
    this.posterZoom = Math.max(1.0, Math.min(3.5, this.posterZoom + delta));
    if (this.posterZoom === 1.0) {
      this.posterPanX = 0;
      this.posterPanY = 0;
    }
    this.applyPosterTransform();
  }

  resetPosterTransform() {
    this.posterZoom = 1.0;
    this.posterPanX = 0;
    this.posterPanY = 0;
    this.applyPosterTransform();
  }

  applyPosterTransform() {
    const img = document.getElementById('poster-modal-img');
    const badge = document.getElementById('poster-zoom-badge');
    if (img) {
      img.style.transform = `translate(${this.posterPanX}px, ${this.posterPanY}px) scale(${this.posterZoom})`;
    }
    if (badge) {
      badge.textContent = `${Math.round(this.posterZoom * 100)}%`;
    }
  }
}

export const competitionArchive = new CompetitionArchive();

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    competitionArchive.init();
  });
}
