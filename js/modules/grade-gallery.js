/**
 * NANYANG ARTISTS SOCIETY — GRADE EXAMINATION ARTWORK REFERENCE & GALLERY MODULE
 * Supports:
 * - Single and Multi-image levels (1 plate, 2 plates with 1/2 counter, 3+ carousel)
 * - Interactive Lightbox / Modal with pan/zoom (+, -, 100% reset)
 * - Keyboard navigation (ArrowLeft, ArrowRight, Escape)
 * - Accessible focus trap & ARIA attributes
 * - Metadata panel: Grade, Track, Chinese/English Title, Provenance
 */

export class GradeGalleryViewer {
  constructor() {
    this.modalEl = null;
    this.currentImages = [];
    this.currentIndex = 0;
    this.zoomLevel = 1.0;
    this.currentMeta = null;
    this.isPanning = false;
    this.panStart = { x: 0, y: 0 };
    this.panOffset = { x: 0, y: 0 };
  }

  init() {
    this.ensureModalDOM();
    this.bindGlobalEvents();
  }

  ensureModalDOM() {
    if (document.getElementById('grade-artwork-modal')) {
      this.modalEl = document.getElementById('grade-artwork-modal');
      return;
    }

    const modal = document.createElement('div');
    modal.id = 'grade-artwork-modal';
    modal.className = 'grade-modal-backdrop';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Calligraphy Reference Artwork Inspector');
    modal.style.display = 'none';

    modal.innerHTML = `
      <div class="grade-modal-container">
        <!-- Top Toolbar -->
        <div class="grade-modal-header">
          <div class="grade-modal-titles">
            <span class="grade-modal-badge" id="modal-track-badge">Hard-Pen</span>
            <h3 id="modal-art-title" style="margin: 0; font-size: 16px; font-weight: 700; color: #FFFFFF;">Artwork Reference</h3>
            <span id="modal-art-counter" class="grade-modal-counter">1 / 1</span>
          </div>
          <div class="grade-modal-actions">
            <button type="button" class="grade-modal-btn" id="modal-zoom-in" title="Zoom In (+)" aria-label="Zoom in">+</button>
            <button type="button" class="grade-modal-btn" id="modal-zoom-out" title="Zoom Out (-)" aria-label="Zoom out">&minus;</button>
            <button type="button" class="grade-modal-btn" id="modal-zoom-reset" title="Reset (100%)" aria-label="Reset zoom">100%</button>
            <button type="button" class="grade-modal-btn" id="modal-fullscreen" title="Fullscreen" aria-label="Toggle fullscreen">⛶</button>
            <button type="button" class="grade-modal-close" id="modal-close-btn" title="Close (ESC)" aria-label="Close modal">&times;</button>
          </div>
        </div>

        <!-- Canvas Area -->
        <div class="grade-modal-stage" id="modal-viewport">
          <button type="button" class="grade-nav-btn grade-nav-prev" id="modal-prev-btn" title="Previous Plate" aria-label="Previous plate">&#10094;</button>
          
          <div class="grade-canvas-wrapper" id="modal-canvas-wrapper">
            <img id="modal-art-img" src="" alt="Calligraphy reference" class="grade-modal-img" draggable="false">
          </div>

          <button type="button" class="grade-nav-btn grade-nav-next" id="modal-next-btn" title="Next Plate" aria-label="Next plate">&#10095;</button>
        </div>

        <!-- Metadata Info Drawer -->
        <div class="grade-modal-footer">
          <div class="grade-modal-meta-content">
            <p id="modal-art-desc" style="margin: 0 0 6px; font-size: 13px; color: #E5E7EB; line-height: 1.5;"></p>
            <div id="modal-poem-info" style="display: none; font-size: 12px; color: #FCD34D;"></div>
          </div>
          <div class="grade-modal-thumbnails" id="modal-thumbnails-strip"></div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.modalEl = modal;
    this.bindModalControls();
  }

  bindGlobalEvents() {
    document.addEventListener('keydown', (e) => {
      if (!this.modalEl || this.modalEl.style.display === 'none') return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
      if (e.key === '+' || e.key === '=') this.zoomIn();
      if (e.key === '-' || e.key === '_') this.zoomOut();
      if (e.key === '0') this.resetZoom();
    });

    // Close on backdrop click outside content
    this.modalEl.addEventListener('click', (e) => {
      if (e.target === this.modalEl) this.close();
    });
  }

  bindModalControls() {
    const closeBtn = document.getElementById('modal-close-btn');
    const prevBtn = document.getElementById('modal-prev-btn');
    const nextBtn = document.getElementById('modal-next-btn');
    const zoomInBtn = document.getElementById('modal-zoom-in');
    const zoomOutBtn = document.getElementById('modal-zoom-out');
    const zoomResetBtn = document.getElementById('modal-zoom-reset');
    const fsBtn = document.getElementById('modal-fullscreen');

    if (closeBtn) closeBtn.addEventListener('click', () => this.close());
    if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
    if (nextBtn) nextBtn.addEventListener('click', () => this.next());
    if (zoomInBtn) zoomInBtn.addEventListener('click', () => this.zoomIn());
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => this.zoomOut());
    if (zoomResetBtn) zoomResetBtn.addEventListener('click', () => this.resetZoom());

    if (fsBtn) {
      fsBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          this.modalEl.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      });
    }

    // Pan interactions on canvas wrapper
    const canvas = document.getElementById('modal-canvas-wrapper');
    const img = document.getElementById('modal-art-img');

    if (canvas && img) {
      canvas.addEventListener('mousedown', (e) => {
        if (this.zoomLevel <= 1.0) return;
        this.isPanning = true;
        this.panStart = { x: e.clientX - this.panOffset.x, y: e.clientY - this.panOffset.y };
        canvas.style.cursor = 'grabbing';
      });

      window.addEventListener('mousemove', (e) => {
        if (!this.isPanning) return;
        this.panOffset = { x: e.clientX - this.panStart.x, y: e.clientY - this.panStart.y };
        this.updateImageTransform();
      });

      window.addEventListener('mouseup', () => {
        if (this.isPanning) {
          this.isPanning = false;
          canvas.style.cursor = this.zoomLevel > 1.0 ? 'grab' : 'default';
        }
      });

      // Wheel zoom
      canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY < 0) this.zoomIn();
        else this.zoomOut();
      }, { passive: false });
    }
  }

  /**
   * Opens modal displaying images for a grade level
   */
  open(gradeData, startIndex = 0) {
    this.ensureModalDOM();
    this.currentMeta = gradeData;
    this.currentImages = gradeData.referenceImages || [];
    this.currentIndex = Math.max(0, Math.min(startIndex, this.currentImages.length - 1));
    this.zoomLevel = 1.0;
    this.panOffset = { x: 0, y: 0 };

    this.modalEl.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    this.renderCurrentPlate();
    this.renderThumbnails();

    const closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn) closeBtn.focus();
  }

  close() {
    if (!this.modalEl) return;
    this.modalEl.style.display = 'none';
    document.body.style.overflow = '';
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }

  next() {
    if (this.currentImages.length <= 1) return;
    this.currentIndex = (this.currentIndex + 1) % this.currentImages.length;
    this.resetZoom();
    this.renderCurrentPlate();
  }

  prev() {
    if (this.currentImages.length <= 1) return;
    this.currentIndex = (this.currentIndex - 1 + this.currentImages.length) % this.currentImages.length;
    this.resetZoom();
    this.renderCurrentPlate();
  }

  zoomIn() {
    if (this.zoomLevel >= 3.0) return;
    this.zoomLevel = +(this.zoomLevel + 0.25).toFixed(2);
    this.updateImageTransform();
  }

  zoomOut() {
    if (this.zoomLevel <= 0.75) return;
    this.zoomLevel = +(this.zoomLevel - 0.25).toFixed(2);
    if (this.zoomLevel <= 1.0) this.panOffset = { x: 0, y: 0 };
    this.updateImageTransform();
  }

  resetZoom() {
    this.zoomLevel = 1.0;
    this.panOffset = { x: 0, y: 0 };
    this.updateImageTransform();
  }

  updateImageTransform() {
    const img = document.getElementById('modal-art-img');
    const canvas = document.getElementById('modal-canvas-wrapper');
    if (img) {
      img.style.transform = `translate(${this.panOffset.x}px, ${this.panOffset.y}px) scale(${this.zoomLevel})`;
    }
    if (canvas) {
      canvas.style.cursor = this.zoomLevel > 1.0 ? (this.isPanning ? 'grabbing' : 'grab') : 'default';
    }
  }

  renderCurrentPlate() {
    const img = document.getElementById('modal-art-img');
    const title = document.getElementById('modal-art-title');
    const counter = document.getElementById('modal-art-counter');
    const badge = document.getElementById('modal-track-badge');
    const desc = document.getElementById('modal-art-desc');
    const poemInfo = document.getElementById('modal-poem-info');
    const prevBtn = document.getElementById('modal-prev-btn');
    const nextBtn = document.getElementById('modal-next-btn');

    const total = this.currentImages.length;
    const currentSrc = this.currentImages[this.currentIndex];

    if (img) {
      img.src = currentSrc;
      img.alt = `Calligraphy Reference Plate ${this.currentIndex + 1}`;
    }

    if (badge && this.currentMeta) {
      badge.textContent = this.currentMeta.track === 'hard-pen' ? '硬笔书法 Hard-Pen' : '软笔书法 Soft-Pen';
    }

    if (title && this.currentMeta) {
      const artObj = (this.currentMeta.artworks && this.currentMeta.artworks[this.currentIndex]) || null;
      title.textContent = artObj ? `${artObj.title_zh || artObj.title}` : `Grade ${this.currentMeta.grade} Reference Plate ${this.currentIndex + 1}`;
    }

    if (counter) {
      counter.textContent = total > 1 ? `Plate ${this.currentIndex + 1} / ${total}` : 'Single Plate';
    }

    if (desc && this.currentMeta) {
      const artObj = (this.currentMeta.artworks && this.currentMeta.artworks[this.currentIndex]) || null;
      desc.textContent = artObj ? artObj.description : `${this.currentMeta.task_zh} (${this.currentMeta.writingTools_zh}, ${this.currentMeta.paperSize_zh})`;
    }

    if (poemInfo && this.currentMeta) {
      const artObj = (this.currentMeta.artworks && this.currentMeta.artworks[this.currentIndex]) || null;
      if (artObj && artObj.poemTitle) {
        poemInfo.style.display = 'block';
        poemInfo.innerHTML = `📜 <strong>Theme:</strong> ${artObj.poemTitle}`;
      } else {
        poemInfo.style.display = 'none';
      }
    }

    // Hide or show nav arrows
    if (prevBtn && nextBtn) {
      const showArrows = total > 1;
      prevBtn.style.display = showArrows ? 'flex' : 'none';
      nextBtn.style.display = showArrows ? 'flex' : 'none';
    }

    this.updateThumbnailActiveState();
    this.updateImageTransform();
  }

  renderThumbnails() {
    const strip = document.getElementById('modal-thumbnails-strip');
    if (!strip) return;

    if (this.currentImages.length <= 1) {
      strip.innerHTML = '';
      strip.style.display = 'none';
      return;
    }

    strip.style.display = 'flex';
    strip.innerHTML = this.currentImages.map((src, idx) => `
      <button type="button" class="grade-thumb-btn ${idx === this.currentIndex ? 'active' : ''}" data-thumb-index="${idx}" aria-label="View plate ${idx + 1}">
        <img src="${src}" alt="Plate ${idx + 1}">
        <span class="grade-thumb-label">Plate ${idx + 1}</span>
      </button>
    `).join('');

    strip.querySelectorAll('.grade-thumb-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-thumb-index'), 10);
        this.currentIndex = idx;
        this.resetZoom();
        this.renderCurrentPlate();
      });
    });
  }

  updateThumbnailActiveState() {
    const strip = document.getElementById('modal-thumbnails-strip');
    if (!strip) return;
    const btns = strip.querySelectorAll('.grade-thumb-btn');
    btns.forEach((btn, idx) => {
      if (idx === this.currentIndex) btn.classList.add('active');
      else btn.classList.remove('active');
    });
  }
}

export const gradeGalleryViewer = new GradeGalleryViewer();
