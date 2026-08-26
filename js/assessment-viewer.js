/**
 * NANYANG ARTISTS SOCIETY — EDUCATIONAL ARTWORK ASSESSMENT VIEWER
 * Interactive zoom, pan, fullscreen, dual comparison mode (Artwork A vs Artwork B),
 * scoring rubrics breakdown, and faculty critique commentary.
 */

import { dataAdapter } from './services/dataAdapter.js';

export class AssessmentViewer {
  constructor() {
    this.artworks = [];
    this.currentArtwork = null;
    this.comparisonArtwork = null;
    this.isComparisonMode = false;
    this.zoomLevel = 1.0;
    this.panX = 0;
    this.panY = 0;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
  }

  async init() {
    try {
      this.artworks = await dataAdapter.getTable('SampleArtworks');
      
      const params = new URLSearchParams(window.location.search);
      const artId = params.get('id') || 'ART-CLG-05';
      
      this.currentArtwork = this.artworks.find(a => a.id === artId) || this.artworks[0];
      if (this.currentArtwork && this.currentArtwork.comparisonPairId) {
        this.comparisonArtwork = this.artworks.find(a => a.id === this.currentArtwork.comparisonPairId) || this.artworks[1];
      }

      this.renderTray();
      this.renderCurrentArtwork();
      this.bindEvents();
    } catch (err) {
      console.error('[AssessmentViewer] Init error:', err);
    }
  }

  renderTray() {
    const tray = document.getElementById('viewer-artworks-tray');
    if (!tray) return;

    tray.innerHTML = this.artworks.map(art => `
      <button type="button" class="btn ${art.id === this.currentArtwork.id ? 'btn-primary' : 'btn-outline'} btn-sm" data-art-id="${art.id}" style="white-space: nowrap;">
        ${art.discipline} (Grade ${art.grade})
      </button>
    `).join('');

    const buttons = tray.querySelectorAll('[data-art-id]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-art-id');
        this.selectArtwork(id);
      });
    });
  }

  selectArtwork(id) {
    this.currentArtwork = this.artworks.find(a => a.id === id) || this.artworks[0];
    if (this.currentArtwork && this.currentArtwork.comparisonPairId) {
      this.comparisonArtwork = this.artworks.find(a => a.id === this.currentArtwork.comparisonPairId) || this.artworks[0];
    }
    this.resetTransform();
    this.renderTray();
    this.renderCurrentArtwork();
  }

  renderCurrentArtwork() {
    const art = this.currentArtwork;
    if (!art) return;

    // Document Title
    document.title = `${art.title} | Educational Artwork Assessment Viewer`;

    // Viewport Mode Check
    const singleViewport = document.getElementById('viewer-single-viewport');
    const compGrid = document.getElementById('viewer-comparison-grid');

    if (this.isComparisonMode) {
      if (singleViewport) singleViewport.style.display = 'none';
      if (compGrid) {
        compGrid.style.display = 'grid';
        this.renderComparisonMode();
      }
    } else {
      if (compGrid) compGrid.style.display = 'none';
      if (singleViewport) {
        singleViewport.style.display = 'flex';
        const canvasImg = document.getElementById('viewer-canvas-img');
        if (canvasImg) {
          canvasImg.src = art.imageUrl;
          canvasImg.alt = `${art.title} - Candidate ${art.candidate}`;
        }
      }
    }

    // Metadata Details
    const titleEl = document.getElementById('viewer-art-title');
    const titleZhEl = document.getElementById('viewer-art-title-zh');
    const candEl = document.getElementById('viewer-art-candidate');
    const discEl = document.getElementById('viewer-art-disc');
    const tierEl = document.getElementById('viewer-art-tier');
    const mediumEl = document.getElementById('viewer-art-medium');
    const dimEl = document.getElementById('viewer-art-dimensions');

    if (titleEl) titleEl.textContent = art.title;
    if (titleZhEl) titleZhEl.textContent = art.title_zh;
    if (candEl) candEl.textContent = art.candidate;
    if (discEl) discEl.textContent = art.discipline;
    if (tierEl) tierEl.textContent = art.tier;
    if (mediumEl) mediumEl.textContent = art.medium;
    if (dimEl) dimEl.textContent = `${art.dimensions} (${art.year})`;

    // Rubric Breakdown
    const rubricContainer = document.getElementById('viewer-rubric-container');
    if (rubricContainer && art.criteriaScores) {
      rubricContainer.innerHTML = art.criteriaScores.map(c => `
        <div class="viewer-rubric-item">
          <div class="viewer-rubric-header">
            <span>${c.item} <small style="color: var(--color-ink-muted);">(${c.weight})</small></span>
            <span style="color: var(--color-cinnabar); font-weight: 700;">${c.score} / 100</span>
          </div>
          <div class="viewer-rubric-track">
            <div class="viewer-rubric-fill" style="width: ${c.score}%;"></div>
          </div>
          <p style="font-size: 11px; color: var(--color-ink-muted); margin: 2px 0 0;">${c.desc}</p>
        </div>
      `).join('');
    }

    // Instructor Critique Notes
    const critiqueNotesEl = document.getElementById('viewer-instructor-notes');
    if (critiqueNotesEl) {
      critiqueNotesEl.textContent = art.instructorNotes;
    }

    // Comparison Callout Notes
    const compBox = document.getElementById('viewer-comparison-notice');
    if (compBox) {
      if (this.isComparisonMode && this.comparisonArtwork) {
        compBox.style.display = 'block';
        compBox.innerHTML = `
          <strong style="color: var(--color-cobalt); display: block; margin-bottom: 4px;">⚖️ Developmental Benchmark Comparison:</strong>
          <span style="font-size: 13px; color: var(--color-ink-charcoal); line-height: 1.5;">${art.comparisonNotes || ''}</span>
        `;
      } else {
        compBox.style.display = 'none';
      }
    }
  }

  renderComparisonMode() {
    const compGrid = document.getElementById('viewer-comparison-grid');
    if (!compGrid) return;

    const artA = this.currentArtwork;
    const artB = this.comparisonArtwork || this.artworks[1];

    compGrid.innerHTML = `
      <!-- Pane A -->
      <div class="viewer-comparison-pane">
        <span class="viewer-pane-badge">Artwork A: Grade ${artA.grade} (${artA.discipline})</span>
        <img src="${artA.imageUrl}" alt="${artA.title}" style="max-width: 85%; max-height: 380px; object-fit: contain; border-radius: var(--radius-sm);" onerror="this.onerror=null; this.src='../assets/logo/logo.png';">
        <div style="margin-top: 10px; text-align: center; color: #FFFFFF; font-size: 12px;">
          <strong>${artA.title}</strong>
          <p style="font-size: 11px; color: #9CA3AF; margin: 2px 0 0;">${artA.candidate} · ${artA.tier}</p>
        </div>
      </div>

      <!-- Pane B -->
      <div class="viewer-comparison-pane">
        <span class="viewer-pane-badge" style="border-color: var(--color-cinnabar);">Artwork B: Grade ${artB.grade} (${artB.discipline})</span>
        <img src="${artB.imageUrl}" alt="${artB.title}" style="max-width: 85%; max-height: 380px; object-fit: contain; border-radius: var(--radius-sm);" onerror="this.onerror=null; this.src='../assets/logo/logo.png';">
        <div style="margin-top: 10px; text-align: center; color: #FFFFFF; font-size: 12px;">
          <strong>${artB.title}</strong>
          <p style="font-size: 11px; color: #9CA3AF; margin: 2px 0 0;">${artB.candidate} · ${artB.tier}</p>
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Zoom Buttons
    const zoomInBtn = document.getElementById('viewer-zoom-in-btn');
    const zoomOutBtn = document.getElementById('viewer-zoom-out-btn');
    const zoomResetBtn = document.getElementById('viewer-zoom-reset-btn');
    const fullscreenBtn = document.getElementById('viewer-fullscreen-btn');
    const compareToggleBtn = document.getElementById('viewer-compare-toggle-btn');

    if (zoomInBtn) zoomInBtn.addEventListener('click', () => this.zoom(0.25));
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => this.zoom(-0.25));
    if (zoomResetBtn) zoomResetBtn.addEventListener('click', () => this.resetTransform());
    if (fullscreenBtn) fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
    if (compareToggleBtn) {
      compareToggleBtn.addEventListener('click', () => {
        this.isComparisonMode = !this.isComparisonMode;
        compareToggleBtn.textContent = this.isComparisonMode ? '🔍 Single Artwork View' : '⚖️ Compare A vs B Mode';
        this.renderCurrentArtwork();
      });
    }

    // Drag / Pan Events
    const canvasImg = document.getElementById('viewer-canvas-img');
    const viewport = document.getElementById('viewer-single-viewport');

    if (viewport && canvasImg) {
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
      if (e.key === '+' || e.key === '=') {
        this.zoom(0.25);
      } else if (e.key === '-' || e.key === '_') {
        this.zoom(-0.25);
      } else if (e.key === '0') {
        this.resetTransform();
      } else if (e.key === 'f' || e.key === 'F') {
        this.toggleFullscreen();
      } else if (e.key === 'Escape') {
        const stage = document.getElementById('viewer-stage');
        if (stage && stage.classList.contains('is-fullscreen')) {
          this.toggleFullscreen();
        }
      }
    });
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
    const canvasImg = document.getElementById('viewer-canvas-img');
    const badge = document.getElementById('viewer-zoom-level-badge');
    if (canvasImg) {
      canvasImg.style.transform = `translate(${this.panX}px, ${this.panY}px) scale(${this.zoomLevel})`;
    }
    if (badge) {
      badge.textContent = `${Math.round(this.zoomLevel * 100)}%`;
    }
  }

  toggleFullscreen() {
    const stage = document.getElementById('viewer-stage');
    if (!stage) return;

    stage.classList.toggle('is-fullscreen');
    const isFull = stage.classList.contains('is-fullscreen');
    const btn = document.getElementById('viewer-fullscreen-btn');
    if (btn) {
      btn.innerHTML = isFull ? '✕ Exit Fullscreen' : '⛶ Fullscreen';
    }
  }
}

export const assessmentViewer = new AssessmentViewer();

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    assessmentViewer.init();
  });
}
