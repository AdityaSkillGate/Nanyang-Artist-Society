/**
 * NANYANG ARTISTS SOCIETY — ARTWORK DETAIL CONTROLLER
 * Loads dynamic artwork by ?id= from GalleryArtworks or SampleArtworks.
 * Provides high-resolution inspection, division badge, and related masterworks.
 */

import { dataAdapter } from './services/dataAdapter.js';

export class ArtworkDetailController {
  constructor() {
    this.artworkId = null;
    this.artwork = null;
    this.allArtworks = [];
    this.zoomLevel = 1.0;
  }

  async init() {
    const params = new URLSearchParams(window.location.search);
    this.artworkId = params.get('id') || params.get('artId') || 'art-1';

    try {
      this.allArtworks = await dataAdapter.getTable('GalleryArtworks');
      const cleanTarget = this.artworkId.toLowerCase().trim();

      this.artwork = this.allArtworks.find(a => 
        (a.id && a.id.toLowerCase() === cleanTarget) ||
        (a.title && a.title.toLowerCase().includes(cleanTarget))
      ) || this.allArtworks[0];

      if (this.artwork) {
        this.renderArtwork();
        this.renderRelatedArtworks();
        this.bindZoom();
      }
    } catch (err) {
      console.error('[ArtworkDetailController] Init error:', err);
    }
  }

  resolveImg(url) {
    if (!url) return 'assets/logo/logo.png';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
    if (url.startsWith('./') || url.startsWith('/')) return url;
    return url.replace(/^\.\.\//, '');
  }

  renderArtwork() {
    const a = this.artwork;
    document.title = `${a.title} (${a.title_zh || ''}) | Digital Gallery | Nanyang Artists Society`;

    const breadcrumb = document.getElementById('breadcrumb-art-title');
    if (breadcrumb) breadcrumb.textContent = a.title;

    const img = document.getElementById('artwork-main-img');
    if (img) {
      img.src = this.resolveImg(a.highResUrl || a.imageUrl || a.image);
      img.alt = a.title;
    }

    const titleEl = document.getElementById('artwork-title');
    if (titleEl) titleEl.textContent = a.title;

    const titleZhEl = document.getElementById('artwork-title-zh');
    if (titleZhEl) titleZhEl.textContent = a.title_zh || '';

    const artistEl = document.getElementById('artwork-artist');
    if (artistEl) artistEl.textContent = `${a.artist || 'Master Faculty'} ${a.artist_zh ? '(' + a.artist_zh + ')' : ''}`;

    const mediumEl = document.getElementById('artwork-medium');
    if (mediumEl) mediumEl.textContent = a.medium || a.discipline || 'Traditional Media';

    const dimsEl = document.getElementById('artwork-dimensions');
    if (dimsEl) dimsEl.textContent = a.dimensions || 'Studio Standard Substrate';

    const yearEl = document.getElementById('artwork-year');
    if (yearEl) yearEl.textContent = a.year || '2024';

    const divisionEl = document.getElementById('artwork-division-badge');
    if (divisionEl) {
      divisionEl.textContent = a.division || 'Official Permanent Collection';
    }

    const awardEl = document.getElementById('artwork-award-badge');
    if (awardEl) {
      if (a.award) {
        awardEl.textContent = `🏅 ${a.award}`;
        awardEl.style.display = 'inline-block';
      } else {
        awardEl.style.display = 'none';
      }
    }

    const descEl = document.getElementById('artwork-description');
    if (descEl) {
      descEl.textContent = a.description || 'Exemplary work embodying Nanyang artistic synthesis, disciplined brush dynamic, and regional cultural inspiration.';
    }
  }

  renderRelatedArtworks() {
    const container = document.getElementById('artwork-related-grid');
    if (!container) return;

    const related = this.allArtworks
      .filter(other => other.id !== this.artwork.id)
      .slice(0, 4);

    container.innerHTML = related.map(rel => `
      <div class="card" style="display: flex; flex-direction: column; overflow: hidden;">
        <a href="artwork.html?id=${rel.id}" style="display: block; aspect-ratio: 4/3; overflow: hidden; background: var(--color-warm-ivory);">
          <img src="${this.resolveImg(rel.imageUrl || rel.image)}" alt="${rel.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform var(--transition-medium);" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" onerror="this.onerror=null; this.src='assets/logo/logo.png';">
        </a>
        <div style="padding: 16px;">
          <span class="seal-badge" style="font-size: 10px; margin-bottom: 6px;">${rel.discipline || 'Fine Arts'}</span>
          <h4 style="font-size: 15px; margin: 0 0 2px;">
            <a href="artwork.html?id=${rel.id}" style="color: inherit; text-decoration: none;">${rel.title}</a>
          </h4>
          <h5 style="font-size: 12px; color: var(--color-cinnabar); font-weight: 600; margin: 0 0 8px;">${rel.title_zh || ''}</h5>
          <p style="font-size: 12px; color: var(--color-ink-muted); margin: 0;">${rel.artist} (${rel.year})</p>
        </div>
      </div>
    `).join('');
  }

  bindZoom() {
    const zoomIn = document.getElementById('zoom-in-btn');
    const zoomOut = document.getElementById('zoom-out-btn');
    const zoomReset = document.getElementById('zoom-reset-btn');
    const img = document.getElementById('artwork-main-img');

    if (!img) return;

    if (zoomIn) {
      zoomIn.addEventListener('click', () => {
        this.zoomLevel = Math.min(3.0, this.zoomLevel + 0.3);
        img.style.transform = `scale(${this.zoomLevel})`;
      });
    }

    if (zoomOut) {
      zoomOut.addEventListener('click', () => {
        this.zoomLevel = Math.max(1.0, this.zoomLevel - 0.3);
        img.style.transform = `scale(${this.zoomLevel})`;
      });
    }

    if (zoomReset) {
      zoomReset.addEventListener('click', () => {
        this.zoomLevel = 1.0;
        img.style.transform = 'scale(1)';
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ArtworkDetailController().init();
});
