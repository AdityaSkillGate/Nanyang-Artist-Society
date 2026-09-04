/**
 * NANYANG ARTISTS SOCIETY — NANYANG STAR FLAGSHIP COMPETITION CONTROLLER
 * Historical editions timeline, laureates gallery filters, spotlight modal, and entry registration handler.
 */

import { dataAdapter } from './services/dataAdapter.js';

// Helper: normalise a CompetitionWinners row from DB_DATA to the shape this controller needs
function normaliseWinner(w) {
  if (!w) return null;
  // Support both the flat structure (if ever updated) and the nested artwork structure in DB_DATA
  return {
    ...w,
    // Artwork fields (nested under w.artwork in DB_DATA)
    artworkTitle_en: w.artworkTitle_en || (w.artwork && w.artwork.title) || '',
    artworkTitle_zh: w.artworkTitle_zh || (w.artwork && w.artwork.title_zh) || '',
    imageUrl:        w.imageUrl        || (w.artwork && w.artwork.imageUrl) || '',
    medium:          w.medium          || (w.artwork && w.artwork.medium)   || '',
    // Candidate fields
    candidateName_en: w.candidateName_en || w.name        || '',
    candidateName_zh: w.candidateName_zh || w.chineseName  || '',
    // School / city
    schoolCity: w.schoolCity || w.school || w.region || '',
    // Division / category — derived from ageGroup if not present
    division:  w.division  || w.ageGroup || '',
    category:  w.category  || (w.artwork && w.artwork.medium) || '',
    // Award
    awardTier: w.awardTier || w.award || '',
    awardRank: w.awardRank || w.awardTier || w.award || '',
    // Jury comment
    juryComment_en: w.juryComment_en || 'A distinguished work recognised by the international jury panel for its exceptional creativity and technical mastery.',
    // Spotlight flag — treat Grand Prize winner(s) as spotlight by default
    isSpotlight: w.isSpotlight || (w.awardTier === 'Grand Prize') || (w.award && w.award.includes('Grand Trophy')),
  };
}

export class NanyangStarController {
  constructor() {
    this.competitions = [];
    this.winners = [];
    this.activeYear = 2024;
    this.filterDivision = 'all';
    this.filterCategory = 'all';
  }

  resolveImgUrl(url) {
    const isRoot = !window.location.pathname.includes('/competitions/');
    const fallback = isRoot ? 'assets/logo/logo.png' : '../assets/logo/logo.png';
    if (!url) return fallback;
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
    if (url.startsWith('./') || url.startsWith('/')) return url;
    if (isRoot) {
      return url.replace(/^\.\.\//, '');
    } else {
      if (url.startsWith('../')) return url;
      return '../' + url;
    }
  }

  async init() {
    try {
      this.competitions = await dataAdapter.getTable('Competitions');
      const rawWinners = await dataAdapter.getTable('CompetitionWinners');
      this.winners = rawWinners.map(normaliseWinner).filter(Boolean);

      // Prefer the most recent concluded year that has winners
      const years = [...new Set(this.winners.map(w => w.year))].sort((a, b) => b - a);
      if (years.length) this.activeYear = years[0];

      this.renderTimelineTabs();
      this.renderSpotlightMasterpiece();
      this.renderLaureates();
      this.bindEvents();

      // Listen to Language Change Event
      window.addEventListener('nas:languageChanged', () => {
        this.renderTimelineTabs();
        this.renderEditionDetails();
        this.renderSpotlightMasterpiece();
        this.renderLaureates();
      });
    } catch (err) {
      console.error('[NanyangStarController] Init error:', err);
    }
  }

  /** Resolve the display title for a competition record regardless of field name variant */
  _compTitle(comp) {
    return comp.title_en || comp.title || '';
  }

  /** Resolve the theme label for a competition record */
  _compTheme(comp) {
    return comp.theme_en || comp.theme || '';
  }

  renderTimelineTabs() {
    const container = document.getElementById('comp-timeline-tabs-container');
    if (!container) return;

    container.innerHTML = this.competitions.map(c => `
      <button type="button" class="comp-timeline-tab ${c.year === this.activeYear ? 'active' : ''}" data-year="${c.year}">
        ${c.year} · ${this._compTheme(c)}
      </button>
    `).join('');

    const tabs = container.querySelectorAll('[data-year]');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.activeYear = parseInt(tab.getAttribute('data-year'), 10);
        this.renderTimelineTabs();
        this.renderEditionDetails();
        this.renderLaureates();
      });
    });

    this.renderEditionDetails();
  }

  renderEditionDetails() {
    const comp = this.competitions.find(c => c.year === this.activeYear);
    const detailContainer = document.getElementById('comp-edition-details');
    if (!detailContainer || !comp) return;

    detailContainer.innerHTML = `
      <div style="background: var(--color-gallery-white); border: 1px solid var(--color-paper-border); border-radius: var(--radius-md); padding: 28px; box-shadow: var(--shadow-card);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 16px;">
          <div>
            <span class="seal-badge ${comp.status === 'open_for_submissions' ? '' : 'seal-badge-gold'}" style="margin-bottom: 6px;">
              ${comp.status === 'open_for_submissions' ? '🟢 2026 Open for Entries' : 'Concluded Official Salon'}
            </span>
            <h3 style="font-size: 22px; margin: 0 0 2px;">${this._compTitle(comp)}</h3>
            <h4 style="font-size: 14px; color: var(--color-cinnabar); font-weight: 600; margin: 0;">${comp.title_zh || ''}</h4>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 28px; font-weight: 800; color: var(--color-gold);">${comp.year}</span>
          </div>
        </div>

        <div class="grid grid-cols-3" style="gap: 16px; font-size: 13px; color: var(--color-ink-charcoal); line-height: 1.5; margin-bottom: 16px;">
          <div>
            <strong style="color: var(--color-ink-black); display: block;">🏆 Theme / 比赛主题:</strong>
            ${this._compTheme(comp)}${comp.theme_zh ? ' (' + comp.theme_zh + ')' : ''}
          </div>
          <div>
            <strong style="color: var(--color-ink-black); display: block;">📍 Exhibition Venue:</strong>
            ${comp.exhibitionVenue || comp.exhibitionDate || ''}
          </div>
          <div>
            <strong style="color: var(--color-ink-black); display: block;">🌐 Global Participation:</strong>
            ${comp.totalEntries ? `${comp.totalEntries.toLocaleString()} Entries across ${comp.countriesCount} Countries` : 'International Open Call'}
          </div>
        </div>
      </div>
    `;
  }

  renderSpotlightMasterpiece() {
    const spotlight = this.winners.find(w => w.isSpotlight) || this.winners[0];
    const container = document.getElementById('comp-spotlight-container');
    if (!container) {
      return;
    }
    if (!spotlight) {
      container.innerHTML = `<div style="padding:40px; text-align:center; color: var(--color-ink-muted);">No spotlight artwork available.</div>`;
      return;
    }

    container.innerHTML = `
      <div style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 32px; align-items: center;">
        <div style="border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-card-hover); border: 2px solid var(--color-gold); background: var(--color-warm-ivory-dark);">
          <img src="${this.resolveImgUrl(spotlight.imageUrl)}" alt="${spotlight.artworkTitle_en}" style="width: 100%; height: 380px; object-fit: cover;" onerror="this.onerror=null; this.src='../assets/logo/logo.png';">
        </div>
        <div>
          <span class="comp-award-pill comp-award-grand" style="margin-bottom: 10px;">🏆 ${spotlight.awardTier}</span>
          <h3 style="font-size: 24px; margin: 0 0 4px;">${spotlight.artworkTitle_en}</h3>
          <h4 style="font-size: 15px; color: var(--color-cinnabar); font-weight: 600; margin: 0 0 16px;">${spotlight.artworkTitle_zh}</h4>

          <div style="background: var(--color-warm-ivory); border-radius: var(--radius-sm); padding: 14px; font-size: 13px; color: var(--color-ink-charcoal); line-height: 1.6; margin-bottom: 16px; border: 1px solid var(--color-paper-border);">
            <p style="margin: 0 0 4px;">👤 <strong>Artist:</strong> ${spotlight.candidateName_en}${spotlight.candidateName_zh ? ' (' + spotlight.candidateName_zh + ')' : ''}</p>
            <p style="margin: 0 0 4px;">🏫 <strong>Institution:</strong> ${spotlight.schoolCity || '—'}</p>
            <p style="margin: 0 0 4px;">🎨 <strong>Medium:</strong> ${spotlight.medium || '—'}</p>
            <p style="margin: 0;">🏅 <strong>Division:</strong> ${spotlight.division || spotlight.ageGroup || '—'}</p>
          </div>

          <div style="border-left: 3px solid var(--color-cinnabar); padding-left: 12px; font-size: 13px; color: var(--color-ink-charcoal); line-height: 1.5; font-style: italic;">
            "${spotlight.juryComment_en}"
            <span style="display: block; font-style: normal; font-weight: 700; font-size: 11px; color: var(--color-cinnabar); margin-top: 4px;">— Grand Jury Citation</span>
          </div>
        </div>
      </div>
    `;
  }

  renderLaureates() {
    const container = document.getElementById('comp-winners-grid') || document.getElementById('comp-laureates-grid');
    if (!container) return;

    const isZh = (typeof localStorage !== 'undefined' && (localStorage.getItem('nas_user_language_pref') === 'zh-SG' || localStorage.getItem('nas_user_language_pref') === 'zh'));

    const divFilter = this.filterDivision;
    const catFilter = this.filterCategory;

    const filtered = this.winners.filter(w => {
      const divStr = (w.division || w.ageGroup || '').toString();
      const catStr = (w.category || w.medium || '').toString();
      const matchDiv = divFilter === 'all' || divStr.toLowerCase().includes(divFilter.toLowerCase());
      const matchCat = catFilter === 'all' || catStr.toLowerCase().includes(catFilter.toLowerCase());
      return matchDiv && matchCat;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 48px; text-align: center; background: var(--color-gallery-white); border: 1px dashed var(--color-paper-border-dark); border-radius: var(--radius-md);">
          <p style="color: var(--color-ink-muted);">${isZh ? '暂无匹配当前筛选条件的获奖作品。' : 'No laureate artworks match the selected filters. Please adjust your criteria.'}</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(w => {
      const primaryTitle = isZh ? (w.artworkTitle_zh || w.artworkTitle_en) : w.artworkTitle_en;
      const secondaryTitle = isZh ? (w.artworkTitle_en ? `<p style="font-size: 11px; color: var(--color-ink-muted); margin: 0 0 10px;">${w.artworkTitle_en}</p>` : '') : (w.artworkTitle_zh ? `<h5 style="font-size: 12px; color: var(--color-cinnabar); font-weight: 600; margin: 0 0 10px;">${w.artworkTitle_zh}</h5>` : '');
      const primaryArtist = isZh ? (w.candidateName_zh || w.candidateName_en) : w.candidateName_en;
      const secondaryArtist = isZh ? (w.candidateName_en ? ` (${w.candidateName_en})` : '') : (w.candidateName_zh ? ` (${w.candidateName_zh})` : '');
      const awardTierClean = (w.awardTier || '').split(' (')[0];
      const awardDisplay = isZh ? (awardTierClean === 'Grand Prize' ? '特等奖' : awardTierClean === 'Gold' ? '金奖' : awardTierClean === 'Silver' ? '银奖' : awardTierClean) : awardTierClean;

      return `
        <div class="comp-laureate-card">
          <div style="position: relative; overflow: hidden; background: var(--color-warm-ivory-dark);">
            <img src="${this.resolveImgUrl(w.imageUrl)}" alt="${primaryTitle}" class="comp-laureate-img" data-img-zoom="${this.resolveImgUrl(w.imageUrl)}" data-img-title="${primaryTitle} - ${primaryArtist}" onerror="this.onerror=null; this.src='assets/logo/logo.png';">
            <span class="comp-award-pill ${(w.awardTier || '').toLowerCase().includes('grand') ? 'comp-award-grand' : 'comp-award-gold'}" style="position: absolute; top: 12px; right: 12px;">
              ${awardDisplay}
            </span>
          </div>
          <div style="padding: 18px; display: flex; flex-direction: column; flex-grow: 1;">
            <h4 style="font-size: 16px; margin: 0 0 2px;">${primaryTitle}</h4>
            ${secondaryTitle}

            <div style="font-size: 12px; color: var(--color-ink-muted); line-height: 1.4; margin-bottom: 12px;">
              <p style="margin: 0 0 2px;"><strong>${primaryArtist}</strong>${secondaryArtist}</p>
              <p style="margin: 0 0 2px;">${w.schoolCity || w.school || w.region || '—'}</p>
              <p style="margin: 0;">${w.medium || '—'}</p>
            </div>

            <div style="margin-top: auto; border-top: 1px solid var(--color-paper-border); padding-top: 10px; font-size: 11px; color: var(--color-ink-charcoal); font-style: italic;">
              "${w.juryComment_en}"
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Bind Image Zoom Click
    const zoomableImgs = container.querySelectorAll('[data-img-zoom]');
    zoomableImgs.forEach(img => {
      img.addEventListener('click', () => {
        const src = img.getAttribute('data-img-zoom');
        const title = img.getAttribute('data-img-title');
        this.openLightbox(src, title);
      });
    });
  }

  bindEvents() {
    // Division Filter
    const divSelect = document.getElementById('comp-division-filter');
    if (divSelect) {
      divSelect.addEventListener('change', (e) => {
        this.filterDivision = e.target.value;
        this.renderLaureates();
      });
    }

    // Category Filter
    const catSelect = document.getElementById('comp-category-filter');
    if (catSelect) {
      catSelect.addEventListener('change', (e) => {
        this.filterCategory = e.target.value;
        this.renderLaureates();
      });
    }

    // Lightbox Close
    const closeBtn = document.getElementById('comp-lightbox-close');
    const modal = document.getElementById('comp-lightbox-modal');
    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => this.closeLightbox());
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeLightbox();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeLightbox();
    });

    // Registration Form Handler
    const form = document.getElementById('comp-registration-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;

        const resultNotice = document.getElementById('comp-registration-success');
        if (resultNotice) {
          resultNotice.style.display = 'block';
          form.reset();
        }
      });
    }
  }

  openLightbox(src, title) {
    const modal = document.getElementById('comp-lightbox-modal');
    const modalImg = document.getElementById('comp-lightbox-img');
    const modalCaption = document.getElementById('comp-lightbox-caption');

    if (modal && modalImg) {
      modalImg.src = src;
      if (modalCaption) modalCaption.textContent = title || '';
      modal.style.display = 'flex';
    }
  }

  closeLightbox() {
    const modal = document.getElementById('comp-lightbox-modal');
    if (modal) modal.style.display = 'none';
  }
}

export const nanyangStarController = new NanyangStarController();

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => nanyangStarController.init());
  } else {
    nanyangStarController.init();
  }
}
