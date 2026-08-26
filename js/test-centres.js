/**
 * NANYANG ARTISTS SOCIETY — TEST CENTRES QUERY CONTROLLER
 * Multi-parameter search engine for accredited examination venues by Name, Location, Postal Code, Discipline, and Grade.
 */

import { dataAdapter } from './services/dataAdapter.js';

export class TestCentresSearch {
  constructor() {
    this.centres = [];
    this.filters = {
      query: '',
      discipline: 'all',
      gradeTier: 'all'
    };
  }

  async init() {
    try {
      this.centres = await dataAdapter.getTable('TestCentres');
      this.bindInputs();

      // Check URL parameters for preset queries
      const params = new URLSearchParams(window.location.search);
      const qParam = params.get('q');
      const discParam = params.get('disc');
      const gradeParam = params.get('grade');

      if (qParam) {
        this.filters.query = qParam;
        const qInput = document.getElementById('centre-search-input');
        if (qInput) qInput.value = qParam;
      }

      if (discParam) {
        this.filters.discipline = discParam;
        const discSelect = document.getElementById('centre-discipline-select');
        if (discSelect) discSelect.value = discParam;
      }

      if (gradeParam) {
        this.filters.gradeTier = gradeParam;
        const gradeSelect = document.getElementById('centre-grade-select');
        if (gradeSelect) gradeSelect.value = gradeParam;
      }

      this.applyFilters();
    } catch (err) {
      console.error('[TestCentresSearch] Init error:', err);
      this.renderError();
    }
  }

  bindInputs() {
    const qInput = document.getElementById('centre-search-input');
    const discSelect = document.getElementById('centre-discipline-select');
    const gradeSelect = document.getElementById('centre-grade-select');
    const resetBtn = document.getElementById('centre-reset-btn');

    if (qInput) {
      qInput.addEventListener('input', (e) => {
        this.filters.query = e.target.value.trim();
        this.applyFilters();
      });
    }

    if (discSelect) {
      discSelect.addEventListener('change', (e) => {
        this.filters.discipline = e.target.value;
        this.applyFilters();
      });
    }

    if (gradeSelect) {
      gradeSelect.addEventListener('change', (e) => {
        this.filters.gradeTier = e.target.value;
        this.applyFilters();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.filters = { query: '', discipline: 'all', gradeTier: 'all' };
        if (qInput) qInput.value = '';
        if (discSelect) discSelect.value = 'all';
        if (gradeSelect) gradeSelect.value = 'all';
        this.applyFilters();
      });
    }

    // Quick chip buttons (Postal codes / regions)
    const chips = document.querySelectorAll('[data-quick-search]');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const val = chip.getAttribute('data-quick-search');
        this.filters.query = val;
        if (qInput) qInput.value = val;
        this.applyFilters();
      });
    });
  }

  applyFilters() {
    const q = this.filters.query.toLowerCase();
    const disc = this.filters.discipline;
    const tier = this.filters.gradeTier;

    const filtered = this.centres.filter(c => {
      // 1. Text match: Name, Chinese Name, District, Region, Postal Code, Address
      let matchQuery = true;
      if (q) {
        const matchName = c.name_en && c.name_en.toLowerCase().includes(q);
        const matchZh = c.name_zh && c.name_zh.toLowerCase().includes(q);
        const matchPostal = c.postalCode && c.postalCode.includes(q);
        const matchDistrict = c.district && c.district.toLowerCase().includes(q);
        const matchRegion = c.region && c.region.toLowerCase().includes(q);
        const matchAddr = c.address_en && c.address_en.toLowerCase().includes(q);
        matchQuery = matchName || matchZh || matchPostal || matchDistrict || matchRegion || matchAddr;
      }

      // 2. Discipline match
      let matchDisc = true;
      if (disc !== 'all') {
        matchDisc = c.supportedDisciplineIds && c.supportedDisciplineIds.includes(disc);
      }

      // 3. Grade tier match
      let matchTier = true;
      if (tier !== 'all') {
        if (tier === 'foundation') {
          matchTier = c.minGrade <= 3;
        } else if (tier === 'intermediate') {
          matchTier = c.minGrade <= 6 && c.maxGrade >= 4;
        } else if (tier === 'advanced') {
          matchTier = c.maxGrade >= 7;
        }
      }

      return matchQuery && matchDisc && matchTier;
    });

    this.renderResults(filtered);
  }

  renderResults(results) {
    const container = document.getElementById('test-centres-grid');
    const badge = document.getElementById('test-centres-count-badge');

    if (badge) {
      badge.textContent = `Showing ${results.length} accredited test venue${results.length === 1 ? '' : 's'} in Singapore`;
    }

    if (!container) return;

    if (results.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; background: var(--color-gallery-white); border: 1px dashed var(--color-paper-border-dark); border-radius: var(--radius-md); padding: 48px 24px; text-align: center;">
          <div style="font-size: 42px; margin-bottom: 12px;">📍</div>
          <h3 style="font-size: 20px; margin-bottom: 6px;">No Matching Test Centres Found</h3>
          <p style="font-size: 14px; color: var(--color-ink-muted); max-width: 500px; margin: 0 auto 20px;">
            We could not find an examination venue matching your search criteria. Please try another postal code, region, or reset filters.
          </p>
          <button type="button" class="btn btn-outline" onclick="document.getElementById('centre-reset-btn').dispatchEvent(new Event('click'))">
            ↺ Reset Search & Filters
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = results.map(c => `
      <div class="card" style="padding: 24px; display: flex; flex-direction: column; ${c.isHQ ? 'border: 2px solid var(--color-cinnabar);' : ''}">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
          <div style="display: flex; gap: 6px; align-items: center;">
            <span class="seal-badge ${c.isHQ ? '' : 'seal-badge-cobalt'}">${c.isHQ ? 'National HQ Test Centre' : 'Accredited Studio'}</span>
            <span style="font-size: 11px; font-weight: 700; color: var(--color-ink-muted); background: var(--color-warm-ivory); padding: 2px 6px; border-radius: 2px;">
              Postal ${c.postalCode}
            </span>
          </div>
          <span style="font-size: 12px; font-weight: 700; color: var(--color-cobalt);">
            ${c.region} Region (${c.district})
          </span>
        </div>

        <h3 style="font-size: 19px; margin: 0 0 2px;">${c.name_en}</h3>
        <h4 style="font-size: 13px; color: var(--color-cinnabar); font-weight: 600; margin: 0 0 14px;">${c.name_zh}</h4>

        <!-- Venue Metadata -->
        <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13px; color: var(--color-ink-charcoal); line-height: 1.5; margin-bottom: 16px; flex-grow: 1;">
          <p style="margin: 0;">📍 <strong>Address:</strong> ${c.address_en}</p>
          <p style="margin: 0;">🚇 <strong>Transit:</strong> ${c.mrt}</p>
          <p style="margin: 0;">⏱️ <strong>Operating Hours:</strong> ${c.openingHours}</p>
          <p style="margin: 0;">🎨 <strong>Supported Disciplines:</strong> ${c.disciplinesSupported}</p>
          <p style="margin: 0;">🏅 <strong>Exam Levels:</strong> <strong>${c.gradesSupportedText}</strong></p>
        </div>

        <!-- Next Intake Banner -->
        <div style="background: var(--color-warm-ivory); border: 1px solid var(--color-paper-border); border-radius: var(--radius-xs); padding: 8px 12px; font-size: 12px; color: var(--color-cinnabar); font-weight: 600; margin-bottom: 16px;">
          📅 Next Session: ${c.nextExamDate}
        </div>

        <!-- One-Tap Mobile Contact Actions (Call, WhatsApp, Maps) -->
        <div class="grid grid-cols-3" style="gap: 8px; margin-top: auto; border-top: 1px solid var(--color-paper-border); padding-top: 16px;">
          <a href="tel:${c.phoneRaw}" class="btn btn-outline btn-sm" title="Call Test Centre Secretariat" style="font-size: 11px;">
            📞 Call
          </a>
          <a href="https://wa.me/${c.whatsappPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Nanyang Artists Society, I would like to enquire about examination seating at ' + c.name_en)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="font-size: 11px; color: #16A34A; border-color: #16A34A;" title="WhatsApp Consultation">
            💬 WhatsApp
          </a>
          <a href="${c.mapsQuery}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="font-size: 11px;" title="Open Google Maps Navigation">
            🗺️ Directions
          </a>
        </div>
      </div>
    `).join('');
  }

  renderError() {
    const container = document.getElementById('test-centres-grid');
    if (container) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 32px; text-align: center; color: var(--color-cinnabar);">
          <p>⚠️ Unable to load examination test centres. Please check your connection and refresh.</p>
        </div>
      `;
    }
  }
}

export const testCentresSearch = new TestCentresSearch();

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    testCentresSearch.init();
  });
}
