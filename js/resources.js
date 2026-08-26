/**
 * NANYANG ARTISTS SOCIETY — RESOURCES & DOCUMENT ARCHIVE CONTROLLER
 * 9-Category Document Repository, Universal Search, Multi-Year Filters,
 * Strict Historical Archive Labeling, and Interactive Document Preview Modal.
 */

import { dataAdapter } from './services/dataAdapter.js';

export class ResourcesArchiveController {
  constructor() {
    this.documents = [];
    this.filteredDocs = [];
    this.filters = {
      query: '',
      category: 'all',
      year: 'all'
    };
  }

  async init() {
    try {
      this.documents = await dataAdapter.getTable('Documents');
      this.filteredDocs = [...this.documents];

      this.bindInputs();
      this.bindCategoryPills();
      this.renderDocuments();
    } catch (err) {
      console.error('[ResourcesArchiveController] Init error:', err);
    }
  }

  bindInputs() {
    const qInput = document.getElementById('resources-search-input');
    const ySelect = document.getElementById('resources-year-select');
    const resetBtn = document.getElementById('resources-reset-btn');

    if (qInput) {
      qInput.addEventListener('input', (e) => {
        this.filters.query = e.target.value.trim();
        this.applyFilters();
      });
    }

    if (ySelect) {
      ySelect.addEventListener('change', (e) => {
        this.filters.year = e.target.value;
        this.applyFilters();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.filters = { query: '', category: 'all', year: 'all' };
        if (qInput) qInput.value = '';
        if (ySelect) ySelect.value = 'all';

        const pills = document.querySelectorAll('.doc-category-pill');
        pills.forEach(p => p.classList.toggle('active', p.getAttribute('data-category') === 'all'));

        this.applyFilters();
      });
    }
  }

  bindCategoryPills() {
    const pills = document.querySelectorAll('.doc-category-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        this.filters.category = pill.getAttribute('data-category');
        this.applyFilters();
      });
    });
  }

  applyFilters() {
    const q = this.filters.query.toLowerCase();
    const cat = this.filters.category;
    const yr = this.filters.year;

    this.filteredDocs = this.documents.filter(doc => {
      // 1. Text Query
      let matchQuery = true;
      if (q) {
        const matchTitle = doc.title && doc.title.toLowerCase().includes(q);
        const matchZh = doc.title_zh && doc.title_zh.toLowerCase().includes(q);
        const matchDesc = doc.description && doc.description.toLowerCase().includes(q);
        const matchCat = doc.category && doc.category.toLowerCase().includes(q);
        matchQuery = matchTitle || matchZh || matchDesc || matchCat;
      }

      // 2. Category
      const matchCategory = cat === 'all' || doc.category.toLowerCase() === cat.toLowerCase() || (doc.category_id && doc.category_id === cat);

      // 3. Year
      const matchYear = yr === 'all' || doc.year.toString() === yr;

      return matchQuery && matchCategory && matchYear;
    });

    this.renderDocuments();
  }

  renderDocuments() {
    const container = document.getElementById('documents-grid-container');
    const badge = document.getElementById('documents-count-badge');

    if (badge) {
      badge.textContent = `Showing ${this.filteredDocs.length} publication${this.filteredDocs.length === 1 ? '' : 's'}`;
    }

    if (!container) return;

    if (this.filteredDocs.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 48px 24px; text-align: center; background: var(--color-gallery-white); border: 1px dashed var(--color-paper-border-dark); border-radius: var(--radius-md);">
          <div style="font-size: 38px; margin-bottom: 8px;">📂</div>
          <h3 style="font-size: 18px; margin-bottom: 4px;">No Publications Found</h3>
          <p style="font-size: 13px; color: var(--color-ink-muted); max-width: 460px; margin: 0 auto 16px;">
            We could not find any archived documents matching your filter criteria. Please reset your search.
          </p>
          <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('resources-reset-btn').dispatchEvent(new Event('click'))">
            ↺ Reset All Filters
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = this.filteredDocs.map(doc => {
      const isArchived = doc.status === 'historical_archive';
      let formatClass = 'doc-format-badge';
      if (doc.fileFormat === 'PDF') formatClass += ' doc-format-pdf';
      else if (doc.fileFormat === 'ZIP') formatClass += ' doc-format-zip';

      return `
        <div class="doc-card">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; gap: 8px; flex-wrap: wrap;">
            <div style="display: flex; gap: 6px; align-items: center;">
              <span class="${formatClass}">${doc.fileFormat} · ${doc.fileSize}</span>
              <span style="font-size: 11px; font-weight: 700; color: var(--color-ink-muted);">📅 ${doc.year}</span>
            </div>
            <span class="rel-badge ${isArchived ? 'rel-badge-pending' : 'rel-badge-partner'}" style="font-size: 10px;">
              ${isArchived ? 'Historical Archive (历届)' : 'Current Official (现行)'}
            </span>
          </div>

          <h3 style="font-size: 16px; line-height: 1.4; margin: 0 0 4px; color: var(--color-ink-black);">
            ${doc.title}
          </h3>
          <h4 style="font-size: 12px; color: var(--color-cinnabar); font-weight: 600; margin: 0 0 10px; line-height: 1.4;">
            ${doc.title_zh}
          </h4>

          <div style="font-size: 11px; color: var(--color-cobalt); font-weight: 600; margin-bottom: 10px;">
            📁 Category: ${doc.category}
          </div>

          <p style="font-size: 12px; color: var(--color-ink-charcoal); line-height: 1.5; margin: 0 0 16px; flex-grow: 1;">
            ${doc.description}
          </p>

          <div style="margin-top: auto; border-top: 1px solid var(--color-paper-border); padding-top: 14px; display: flex; justify-content: space-between; align-items: center; gap: 8px;">
            <button type="button" class="btn btn-outline btn-sm" style="font-size: 11px; padding: 4px 10px;" data-action="preview-doc" data-doc-id="${doc.id}">
              👁️ Preview
            </button>
            <a href="${doc.downloadUrl}" download class="btn btn-primary btn-sm" style="font-size: 11px; padding: 4px 12px;" onclick="event.stopPropagation();">
              ⬇️ Download (${doc.fileFormat})
            </a>
          </div>
        </div>
      `;
    }).join('');

    // Bind preview buttons
    const previewBtns = container.querySelectorAll('[data-action="preview-doc"]');
    previewBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-doc-id');
        this.openPreviewModal(id);
      });
    });
  }

  openPreviewModal(docId) {
    const doc = this.documents.find(d => d.id === docId);
    if (!doc) return;

    const modalRoot = document.getElementById('doc-preview-modal-root');
    if (!modalRoot) return;

    const isArchived = doc.status === 'historical_archive';

    modalRoot.innerHTML = `
      <div class="doc-preview-modal-overlay" id="doc-modal-overlay">
        <div class="doc-preview-modal-content">
          <button type="button" id="doc-modal-close-btn" style="position: absolute; right: 20px; top: 20px; background: none; border: none; font-size: 24px; cursor: pointer; color: var(--color-ink-muted);">✕</button>

          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; border-bottom: 2px solid var(--color-paper-border); padding-bottom: 16px; flex-wrap: wrap; gap: 12px;">
            <div>
              <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 6px;">
                <span class="doc-format-badge doc-format-pdf">${doc.fileFormat}</span>
                <span class="rel-badge ${isArchived ? 'rel-badge-pending' : 'rel-badge-partner'}">${doc.statusLabel}</span>
                <span style="font-size: 12px; color: var(--color-ink-muted);">Year: ${doc.year} · ${doc.fileSize}</span>
              </div>
              <h2 style="font-size: 20px; margin: 0 0 2px;">${doc.title}</h2>
              <h3 style="font-size: 13px; color: var(--color-cinnabar); font-weight: 600; margin: 0;">${doc.title_zh}</h3>
            </div>
          </div>

          ${isArchived ? `
            <div style="background: #FEF7E0; border: 1px solid #FEEFC3; border-left: 4px solid var(--color-gold); border-radius: var(--radius-xs); padding: 12px 16px; font-size: 12px; color: #7A4100; margin-bottom: 20px;">
              ⚠️ <strong>Historical Archival Document Notice:</strong> This document reflects the historical rules, fees, or specifications of the ${doc.year} session. It is maintained strictly for academic and archival reference and does not represent current society guidelines.
            </div>
          ` : ''}

          <!-- Simulated Multi-Page Document Frame -->
          <div style="background: #E8EAED; border-radius: var(--radius-sm); padding: 24px; text-align: center; margin-bottom: 24px;">
            <div style="background: #FFFFFF; max-width: 580px; min-height: 380px; margin: 0 auto; box-shadow: 0 4px 16px rgba(0,0,0,0.15); border-radius: 2px; padding: 40px; text-align: left; position: relative;">
              <div style="border-bottom: 2px solid var(--color-cinnabar); padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
                <div style="font-size: 11px; font-weight: 800; color: var(--color-ink-black); letter-spacing: 0.05em;">SINGAPORE NANYANG ARTISTS SOCIETY</div>
                <div style="font-size: 11px; color: var(--color-ink-muted);">REF: ${doc.id}</div>
              </div>

              <h1 style="font-size: 18px; margin: 0 0 8px; color: var(--color-ink-black);">${doc.title}</h1>
              <h2 style="font-size: 13px; color: var(--color-cinnabar); margin: 0 0 16px;">${doc.title_zh}</h2>

              <p style="font-size: 12px; color: var(--color-ink-charcoal); line-height: 1.6; margin-bottom: 16px;">
                ${doc.description}
              </p>

              <div style="background: var(--color-warm-ivory); padding: 14px; border-radius: 4px; font-size: 11px; color: var(--color-ink-muted); margin-bottom: 20px;">
                <strong>Document Manifest:</strong><br>
                • Category: ${doc.category}<br>
                • Publication Year: ${doc.year}<br>
                • Security Level: Public Official Repository<br>
                • Verification: Singapore Federation of Art Societies Certified
              </div>

              <div style="position: absolute; bottom: 20px; left: 40px; right: 40px; display: flex; justify-content: space-between; font-size: 10px; color: var(--color-ink-muted); border-top: 1px solid var(--color-paper-border); padding-top: 8px;">
                <span>Page 1 of 1 (Document Simulation)</span>
                <span>Nanyang Artists Society Official Archive</span>
              </div>
            </div>
          </div>

          <!-- Modal Action Bar -->
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
            <button type="button" class="btn btn-outline" id="doc-modal-cancel-btn">
              ← Return to Archive Grid
            </button>
            <div style="display: flex; gap: 10px;">
              <button type="button" class="btn btn-outline" onclick="window.print()">
                🖨️ Print Document
              </button>
              <a href="${doc.downloadUrl}" download class="btn btn-primary">
                ⬇️ Download Official File (${doc.fileFormat} · ${doc.fileSize})
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    const overlay = document.getElementById('doc-modal-overlay');
    const closeBtn = document.getElementById('doc-modal-close-btn');
    const cancelBtn = document.getElementById('doc-modal-cancel-btn');

    const closeModal = () => { modalRoot.innerHTML = ''; };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
      });
    }

    const escHandler = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  }
}

export const resourcesArchive = new ResourcesArchiveController();

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    resourcesArchive.init();
  });
}
