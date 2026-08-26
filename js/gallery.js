/**
 * NANYANG ARTISTS SOCIETY — DIGITAL ART GALLERY & ONLINE MUSEUM CONTROLLER
 * 3 Museum Modes (Masonry, Editorial, Fullscreen), 7-Axis Filtering Engine,
 * 30 Division Artworks Support, and Keyboard-Driven High-Resolution Pan/Zoom Lightbox.
 */

import { dataAdapter } from './services/dataAdapter.js';
import { i18n } from './services/i18n.js';

export class DigitalGallery {
  constructor() {
    this.artworks = [];
    this.filteredArtworks = [];
    this.currentMode = 'masonry'; // 'masonry' | 'editorial' | 'fullscreen'
    this.currentLightboxIndex = 0;
    this.zoomLevel = 1.0;
    this.panX = 0;
    this.panY = 0;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;

    this.filters = {
      query: '',
      category: 'all',
      artistType: 'all',
      year: 'all',
      discipline: 'all',
      competition: 'all',
      exhibition: 'all'
    };
  }

  async init() {
    try {
      this.artworks = await dataAdapter.getTable('GalleryArtworks');
      this.filteredArtworks = [...this.artworks];

      this.bindControls();
      this.applyFilters();

      // Listen to Language Change Event
      window.addEventListener('nas:languageChanged', () => {
        this.applyFilters();
      });
    } catch (err) {
      console.error('[DigitalGallery] Init error:', err);
    }
  }

  resolveImgUrl(url) {
    if (!url) return '../assets/logo/logo.png';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
    if (url.startsWith('../') || url.startsWith('./')) return url;
    if (url.startsWith('/')) return url;
    return '../' + url;
  }

  bindControls() {
    // Mode Switcher
    const modeBtns = document.querySelectorAll('[data-gallery-mode]');
    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-gallery-mode');
        this.setMode(mode);
      });
    });

    // 7-Axis Filter Inputs
    const qInput = document.getElementById('gallery-search-input');
    const catSelect = document.getElementById('gallery-category-select');
    const artistTypeSelect = document.getElementById('gallery-artist-type-select');
    const yearSelect = document.getElementById('gallery-year-select');
    const discSelect = document.getElementById('gallery-discipline-select');
    const compSelect = document.getElementById('gallery-competition-select');
    const exhSelect = document.getElementById('gallery-exhibition-select');
    const resetBtn = document.getElementById('gallery-reset-btn');

    if (qInput) {
      qInput.addEventListener('input', (e) => {
        this.filters.query = e.target.value.trim();
        this.applyFilters();
      });
    }

    if (catSelect) {
      catSelect.addEventListener('change', (e) => {
        this.filters.category = e.target.value;
        this.applyFilters();
      });
    }

    if (artistTypeSelect) {
      artistTypeSelect.addEventListener('change', (e) => {
        this.filters.artistType = e.target.value;
        this.applyFilters();
      });
    }

    if (yearSelect) {
      yearSelect.addEventListener('change', (e) => {
        this.filters.year = e.target.value;
        this.applyFilters();
      });
    }

    if (discSelect) {
      discSelect.addEventListener('change', (e) => {
        this.filters.discipline = e.target.value;
        this.applyFilters();
      });
    }

    if (compSelect) {
      compSelect.addEventListener('change', (e) => {
        this.filters.competition = e.target.value;
        this.applyFilters();
      });
    }

    if (exhSelect) {
      exhSelect.addEventListener('change', (e) => {
        this.filters.exhibition = e.target.value;
        this.applyFilters();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.filters = { query: '', category: 'all', artistType: 'all', year: 'all', discipline: 'all', competition: 'all', exhibition: 'all' };
        if (qInput) qInput.value = '';
        if (catSelect) catSelect.value = 'all';
        if (artistTypeSelect) artistTypeSelect.value = 'all';
        if (yearSelect) yearSelect.value = 'all';
        if (discSelect) discSelect.value = 'all';
        if (compSelect) compSelect.value = 'all';
        if (exhSelect) exhSelect.value = 'all';
        this.applyFilters();
      });
    }

    // Lightbox Controls
    const prevBtn = document.getElementById('lightbox-prev-btn');
    const nextBtn = document.getElementById('lightbox-next-btn');
    const closeBtn = document.getElementById('lightbox-close-btn');
    const zoomInBtn = document.getElementById('lightbox-zoom-in-btn');
    const zoomOutBtn = document.getElementById('lightbox-zoom-out-btn');
    const zoomResetBtn = document.getElementById('lightbox-zoom-reset-btn');
    const fsBtn = document.getElementById('lightbox-fullscreen-btn');

    if (prevBtn) prevBtn.addEventListener('click', () => this.prevArtwork());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextArtwork());
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeLightbox());
    if (zoomInBtn) zoomInBtn.addEventListener('click', () => this.zoom(0.25));
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => this.zoom(-0.25));
    if (zoomResetBtn) zoomResetBtn.addEventListener('click', () => this.resetTransform());
    if (fsBtn) fsBtn.addEventListener('click', () => this.toggleFullscreen());

    // Drag to Pan
    const viewport = document.getElementById('lightbox-viewport');
    if (viewport) {
      viewport.addEventListener('mousedown', (e) => {
        if (this.zoomLevel <= 1.0) return;
        this.isDragging = true;
        this.startX = e.clientX - this.panX;
        this.startY = e.clientY - this.panY;
      });

      window.addEventListener('mousemove', (e) => {
        if (!this.isDragging) return;
        this.panX = e.clientX - this.startX;
        this.panY = e.clientY - this.startY;
        this.applyTransform();
      });

      window.addEventListener('mouseup', () => {
        this.isDragging = false;
      });
    }

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
      const modal = document.getElementById('gallery-lightbox-modal');
      if (!modal || modal.style.display !== 'flex') return;

      if (e.key === 'ArrowRight') {
        this.nextArtwork();
      } else if (e.key === 'ArrowLeft') {
        this.prevArtwork();
      } else if (e.key === '+' || e.key === '=') {
        this.zoom(0.25);
      } else if (e.key === '-' || e.key === '_') {
        this.zoom(-0.25);
      } else if (e.key === '0') {
        this.resetTransform();
      } else if (e.key === 'f' || e.key === 'F') {
        this.toggleFullscreen();
      } else if (e.key === 'Escape') {
        this.closeLightbox();
      }
    });
  }

  setMode(mode) {
    this.currentMode = mode;
    const modeBtns = document.querySelectorAll('[data-gallery-mode]');
    modeBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-gallery-mode') === mode);
    });
    this.renderActiveMode();
  }

  applyFilters() {
    const q = this.filters.query.toLowerCase();
    const cat = this.filters.category;
    const artistType = this.filters.artistType;
    const yr = this.filters.year;
    const disc = this.filters.discipline;
    const comp = this.filters.competition;
    const exh = this.filters.exhibition;

    this.filteredArtworks = this.artworks.filter(art => {
      // 1. Query
      let matchQuery = true;
      if (q) {
        const matchTitle = art.title && art.title.toLowerCase().includes(q);
        const matchTitleZh = art.title_zh && art.title_zh.toLowerCase().includes(q);
        const matchArtist = art.artist && art.artist.toLowerCase().includes(q);
        const matchArtistZh = art.artist_zh && art.artist_zh.toLowerCase().includes(q);
        const matchDesc = art.description && art.description.toLowerCase().includes(q);
        const matchDiv = art.division && art.division.toLowerCase().includes(q);
        matchQuery = matchTitle || matchTitleZh || matchArtist || matchArtistZh || matchDesc || matchDiv;
      }

      // 2. Category
      const matchCat = cat === 'all' || art.category === cat;

      // 3. Artist Type
      const matchArtistType = artistType === 'all' || art.artistType === artistType;

      // 4. Year
      const matchYear = yr === 'all' || (art.year && art.year.toString() === yr);

      // 5. Discipline
      const matchDisc = disc === 'all' || (art.discipline && art.discipline.toLowerCase().includes(disc.toLowerCase()));

      // 6. Competition / Division
      let matchComp = true;
      if (comp !== 'all') {
        const compLower = comp.toLowerCase();
        const artComp = (art.competition || '').toLowerCase();
        const artDiv = (art.division || '').toLowerCase();
        const artDivSlug = (art.division_slug || '').toLowerCase();
        matchComp = artComp.includes(compLower) || artDiv.includes(compLower) || artDivSlug.includes(compLower);
      }

      // 7. Exhibition
      const matchExh = exh === 'all' || (art.exhibition && art.exhibition.toLowerCase().includes(exh.toLowerCase()));

      return matchQuery && matchCat && matchArtistType && matchYear && matchDisc && matchComp && matchExh;
    });

    const countBadge = document.getElementById('gallery-results-count');
    if (countBadge) {
      countBadge.textContent = `Showing ${this.filteredArtworks.length} masterpiece${this.filteredArtworks.length === 1 ? '' : 's'}`;
    }

    this.renderActiveMode();
  }

  renderActiveMode() {
    const container = document.getElementById('gallery-stage-container');
    if (!container) return;

    if (this.filteredArtworks.length === 0) {
      container.innerHTML = `
        <div style="padding: 60px 24px; text-align: center; background: var(--color-gallery-white); border: 1px dashed var(--color-paper-border-dark); border-radius: var(--radius-md);">
          <div style="font-size: 42px; margin-bottom: 8px;">🖼️</div>
          <h3 style="font-size: 20px; margin-bottom: 4px;">No Artworks Found</h3>
          <p style="font-size: 14px; color: var(--color-ink-muted); max-width: 480px; margin: 0 auto 16px;">
            No artworks match your selected 7-axis filters. Please try relaxing your parameters or resetting filters.
          </p>
          <button type="button" class="btn btn-outline" onclick="document.getElementById('gallery-reset-btn').dispatchEvent(new Event('click'))">
            ↺ Reset Filters
          </button>
        </div>
      `;
      return;
    }

    if (this.currentMode === 'masonry') {
      this.renderMasonry(container);
    } else if (this.currentMode === 'editorial') {
      this.renderEditorial(container);
    } else if (this.currentMode === 'fullscreen') {
      this.renderFullscreenMode(container);
    }
  }

  renderMasonry(container) {
    container.innerHTML = `
      <div class="gallery-masonry-grid">
        ${this.filteredArtworks.map((art, idx) => `
          <div class="gallery-masonry-item">
            <div style="position: relative; overflow: hidden; background: var(--color-warm-ivory-dark);">
              <img src="${this.resolveImgUrl(art.imageUrl)}" alt="${art.title}" class="gallery-masonry-img" loading="lazy" data-art-index="${idx}" onerror="this.onerror=null; this.src='../assets/logo/logo.png';">
              <span class="seal-badge ${art.awardTier === 'Grand Prize' ? 'seal-badge-gold' : 'seal-badge-cobalt'}" style="position: absolute; top: 12px; left: 12px;">
                ${art.award || 'Laureate'}
              </span>
            </div>
            <div style="padding: 16px;">
              <h4 style="font-size: 16px; margin: 0 0 2px;">${art.title}</h4>
              <h5 style="font-size: 12px; color: var(--color-cinnabar); font-weight: 600; margin: 0 0 8px;">${art.title_zh}</h5>
              <p style="font-size: 12px; color: var(--color-ink-muted); margin: 0 0 6px;">
                <strong>${art.artist}</strong> (${art.artist_zh}) · ${art.year}
              </p>
              <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--color-ink-charcoal); margin: 0;">
                <span>${art.discipline}</span>
                <span style="color: var(--color-cinnabar); font-weight: 600;">${art.division || ''}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    this.bindArtworkClicks(container);
  }

  renderEditorial(container) {
    container.innerHTML = `
      <div class="gallery-editorial-list">
        ${this.filteredArtworks.map((art, idx) => `
          <div class="gallery-editorial-card">
            <div style="position: relative; border-radius: var(--radius-sm); overflow: hidden; box-shadow: var(--shadow-card); background: var(--color-warm-ivory-dark);">
              <img src="${this.resolveImgUrl(art.imageUrl)}" alt="${art.title}" style="width: 100%; height: 380px; object-fit: cover; cursor: pointer;" loading="lazy" data-art-index="${idx}" onerror="this.onerror=null; this.src='../assets/logo/logo.png';">
              <span class="seal-badge ${art.awardTier === 'Grand Prize' ? 'seal-badge-gold' : 'seal-badge-cobalt'}" style="position: absolute; top: 12px; left: 12px;">
                ${art.award || 'Laureate Showcase'}
              </span>
            </div>
            <div>
              <div style="display: flex; gap: 6px; margin-bottom: 8px; flex-wrap: wrap;">
                <span class="seal-badge seal-badge-cobalt">${art.discipline}</span>
                <span class="seal-badge seal-badge-gold">${art.division || ''}</span>
                <span style="font-size: 11px; font-weight: 700; color: var(--color-ink-muted); background: var(--color-warm-ivory); padding: 2px 8px; border-radius: 2px;">${art.year}</span>
              </div>
              <h3 style="font-size: 22px; margin: 0 0 2px;">${art.title}</h3>
              <h4 style="font-size: 14px; color: var(--color-cinnabar); font-weight: 600; margin: 0 0 14px;">${art.title_zh}</h4>

              <div style="background: var(--color-warm-ivory); border-radius: var(--radius-xs); padding: 12px; font-size: 12px; color: var(--color-ink-charcoal); line-height: 1.5; margin-bottom: 16px; border: 1px solid var(--color-paper-border);">
                <p style="margin: 0 0 4px;">👤 <strong>Artist:</strong> ${art.artist} (${art.artist_zh})</p>
                <p style="margin: 0 0 4px;">🎨 <strong>Medium:</strong> ${art.medium}</p>
                <p style="margin: 0 0 4px;">📐 <strong>Dimensions:</strong> ${art.dimensions}</p>
                ${art.award ? `<p style="margin: 0; color: var(--color-cinnabar);">🏅 <strong>Honour:</strong> ${art.award}</p>` : ''}
              </div>

              <p style="font-size: 13px; color: var(--color-ink-charcoal); line-height: 1.6; margin-bottom: 16px;">
                ${art.description}
              </p>

              <button type="button" class="btn btn-outline btn-sm" data-art-index="${idx}">
                🔍 Inspect High-Resolution Scan
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    this.bindArtworkClicks(container);
  }

  renderFullscreenMode(container) {
    container.innerHTML = `
      <div class="gallery-fullscreen-stage">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <div>
            <span class="seal-badge seal-badge-gold">Museum Immersion View</span>
            <h3 style="font-size: 20px; color: #FFFFFF; margin: 4px 0 0;">Virtual Salon Showcase</h3>
          </div>
          <span style="font-size: 12px; color: #9CA3AF;">Click any artwork to enter darkroom zoom</span>
        </div>

        <div class="gallery-fullscreen-grid">
          ${this.filteredArtworks.map((art, idx) => `
            <div class="gallery-fullscreen-card" data-art-index="${idx}">
              <img src="${this.resolveImgUrl(art.imageUrl)}" alt="${art.title}" style="width: 100%; height: 260px; object-fit: cover;" loading="lazy" onerror="this.onerror=null; this.src='../assets/logo/logo.png';">
              <div style="padding: 14px;">
                <h4 style="font-size: 14px; color: #FFFFFF; margin: 0 0 2px;">${art.title}</h4>
                <p style="font-size: 11px; color: #9CA3AF; margin: 0;">${art.artist} (${art.year}) · ${art.award || ''}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    this.bindArtworkClicks(container);
  }

  bindArtworkClicks(container) {
    const clickable = container.querySelectorAll('[data-art-index]');
    clickable.forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-art-index'), 10);
        this.openLightbox(idx);
      });
    });
  }

  openLightbox(index) {
    this.currentLightboxIndex = index;
    const modal = document.getElementById('gallery-lightbox-modal');
    if (!modal) return;

    this.renderLightboxContent();
    this.resetTransform();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    const modal = document.getElementById('gallery-lightbox-modal');
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  nextArtwork() {
    this.currentLightboxIndex = (this.currentLightboxIndex + 1) % this.filteredArtworks.length;
    this.renderLightboxContent();
    this.resetTransform();
  }

  prevArtwork() {
    this.currentLightboxIndex = (this.currentLightboxIndex - 1 + this.filteredArtworks.length) % this.filteredArtworks.length;
    this.renderLightboxContent();
    this.resetTransform();
  }

  renderLightboxContent() {
    const art = this.filteredArtworks[this.currentLightboxIndex];
    if (!art) return;

    const img = document.getElementById('lightbox-canvas-img');
    const titleEl = document.getElementById('lightbox-art-title');
    const metaEl = document.getElementById('lightbox-art-meta');
    const countBadge = document.getElementById('lightbox-index-badge');

    if (img) {
      img.src = this.resolveImgUrl(art.highResUrl || art.imageUrl);
      img.alt = art.title;
    }

    if (titleEl) {
      titleEl.innerHTML = `${art.title} <span style="color: var(--color-cinnabar); font-size: 14px;">(${art.title_zh})</span>`;
    }

    if (metaEl) {
      metaEl.textContent = `${art.artist} (${art.artist_zh}) · ${art.medium} · ${art.dimensions} (${art.year}) · ${art.division || ''}`;
    }

    if (countBadge) {
      countBadge.textContent = `${this.currentLightboxIndex + 1} / ${this.filteredArtworks.length}`;
    }
  }

  zoom(delta) {
    this.zoomLevel = Math.max(1.0, Math.min(3.5, this.zoomLevel + delta));
    if (this.zoomLevel === 1.0) {
      this.panX = 0;
      this.panY = 0;
    }
    this.applyTransform();
  }

  resetTransform() {
    this.zoomLevel = 1.0;
    this.panX = 0;
    this.panY = 0;
    this.applyTransform();
  }

  applyTransform() {
    const img = document.getElementById('lightbox-canvas-img');
    const badge = document.getElementById('lightbox-zoom-badge');
    if (img) {
      img.style.transform = `translate(${this.panX}px, ${this.panY}px) scale(${this.zoomLevel})`;
    }
    if (badge) {
      badge.textContent = `${Math.round(this.zoomLevel * 100)}%`;
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }
}

export const digitalGallery = new DigitalGallery();

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      digitalGallery.init();
    });
  } else {
    digitalGallery.init();
  }
}
