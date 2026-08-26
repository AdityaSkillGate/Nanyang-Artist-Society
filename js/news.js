/**
 * NANYANG ARTISTS SOCIETY — NEWS & EDITORIAL MAGAZINE CONTROLLER
 * Featured Hero Article Spotlight, 5 Editorial Categories, Search, and Grid.
 */

import { dataAdapter } from './services/dataAdapter.js';
import { i18n } from './services/i18n.js';

export class NewsController {
  constructor() {
    this.articles = [];
    this.filteredArticles = [];
    this.filters = {
      query: '',
      category: 'all',
      sort: 'newest'
    };
  }

  async init() {
    try {
      this.articles = await dataAdapter.getTable('News');
      this.filteredArticles = [...this.articles];

      this.bindInputs();
      this.bindCategoryTabs();
      this.renderFeaturedHero();
      this.renderNewsGrid();

      // Listen to Language Change Event
      window.addEventListener('nas:languageChanged', () => {
        this.renderFeaturedHero();
        this.renderNewsGrid();
      });
    } catch (err) {
      console.error('[NewsController] Init error:', err);
    }
  }

  bindInputs() {
    const qInput = document.getElementById('news-search-input');
    const sortSelect = document.getElementById('news-sort-select');

    if (qInput) {
      qInput.addEventListener('input', (e) => {
        this.filters.query = e.target.value.trim();
        this.applyFilters();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.filters.sort = e.target.value;
        this.applyFilters();
      });
    }
  }

  bindCategoryTabs() {
    const tabs = document.querySelectorAll('.news-category-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        this.filters.category = tab.getAttribute('data-category');
        this.applyFilters();
      });
    });
  }

  applyFilters() {
    const q = this.filters.query.toLowerCase();
    const cat = this.filters.category;
    const sort = this.filters.sort;

    this.filteredArticles = this.articles.filter(art => {
      let matchQuery = true;
      if (q) {
        const matchTitle = art.title && art.title.toLowerCase().includes(q);
        const matchZh = art.title_zh && art.title_zh.toLowerCase().includes(q);
        const matchExcerpt = art.excerpt && art.excerpt.toLowerCase().includes(q);
        const matchCat = art.category && art.category.toLowerCase().includes(q);
        matchQuery = matchTitle || matchZh || matchExcerpt || matchCat;
      }

      const matchCategory = cat === 'all' || (art.category && art.category.toLowerCase() === cat.toLowerCase());

      return matchQuery && matchCategory;
    });

    if (sort === 'newest') {
      this.filteredArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sort === 'oldest') {
      this.filteredArticles.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    this.renderNewsGrid();
  }

  renderFeaturedHero() {
    const container = document.getElementById('news-featured-hero-container');
    if (!container) return;

    const featured = this.articles.find(a => a.featured) || this.articles[0];
    if (!featured) return;

    const title = i18n.getField(featured, 'title') || featured.title || '';
    const excerpt = i18n.getField(featured, 'excerpt') || featured.excerpt || '';
    const readFullText = i18n.t('btn.read_more', 'Read Full Article →');

    container.innerHTML = `
      <div class="news-hero-card">
        <div style="position: relative; overflow: hidden; min-height: 320px;">
          <img src="${featured.image}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='../assets/logo/logo.png';">
          <span style="position: absolute; top: 16px; left: 16px;" class="seal-badge seal-badge-gold">⭐ Featured Editorial</span>
        </div>

        <div style="padding: 36px 32px; display: flex; flex-direction: column; justify-content: center;">
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 12px; font-size: 12px; color: var(--color-ink-muted);">
            <span class="seal-badge seal-badge-cobalt" style="font-size: 10px;">${featured.category}</span>
            <span>📅 ${featured.date}</span>
            <span>• ${featured.readTime}</span>
          </div>

          <h2 style="font-size: 24px; line-height: 1.3; margin: 0 0 6px; color: var(--color-ink-black);">
            <a href="detail.html?id=${featured.slug}" style="color: inherit; text-decoration: none;">${title}</a>
          </h2>
          ${featured.title_zh ? `
            <h3 style="font-size: 14px; color: var(--color-cinnabar); font-weight: 600; margin: 0 0 16px;">
              ${featured.title_zh}
            </h3>
          ` : ''}

          <p style="font-size: 13px; color: var(--color-ink-charcoal); line-height: 1.6; margin: 0 0 24px;">
            ${excerpt}
          </p>

          <div>
            <a href="detail.html?id=${featured.slug}" class="btn btn-primary">
              ${readFullText}
            </a>
          </div>
        </div>
      </div>
    `;
  }

  renderNewsGrid() {
    const container = document.getElementById('news-grid-container');
    const badge = document.getElementById('news-count-badge');

    if (badge) {
      badge.textContent = `Showing ${this.filteredArticles.length} article${this.filteredArticles.length === 1 ? '' : 's'}`;
    }

    if (!container) return;

    if (this.filteredArticles.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 48px 24px; text-align: center; background: var(--color-gallery-white); border: 1px dashed var(--color-paper-border-dark); border-radius: var(--radius-md);">
          <div style="font-size: 38px; margin-bottom: 8px;">📰</div>
          <h3 style="font-size: 18px; margin-bottom: 4px;">No Articles Found</h3>
          <p style="font-size: 13px; color: var(--color-ink-muted); max-width: 460px; margin: 0 auto 16px;">
            No news articles match your search criteria. Please adjust your filters.
          </p>
        </div>
      `;
      return;
    }

    const readMoreText = i18n.t('btn.read_more', 'Read More →');

    container.innerHTML = this.filteredArticles.map(art => {
      const title = i18n.getField(art, 'title') || art.title || '';
      const excerpt = i18n.getField(art, 'excerpt') || art.excerpt || '';

      return `
        <div class="news-card">
          <a href="detail.html?id=${art.slug}" style="display: block; overflow: hidden; height: 180px; position: relative;">
            <img src="${art.image}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform var(--transition-normal);" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" onerror="this.onerror=null; this.src='../assets/logo/logo.png';">
            <span style="position: absolute; top: 12px; left: 12px;" class="seal-badge seal-badge-cobalt">${art.category}</span>
          </a>

          <div style="padding: 20px; display: flex; flex-direction: column; flex-grow: 1;">
            <div style="font-size: 11px; color: var(--color-ink-muted); margin-bottom: 8px;">
              📅 ${art.date} · ⏱️ ${art.readTime}
            </div>

            <h3 style="font-size: 16px; line-height: 1.4; margin: 0 0 4px;">
              <a href="detail.html?id=${art.slug}" style="color: var(--color-ink-black); text-decoration: none;">${title}</a>
            </h3>
            ${art.title_zh ? `
              <h4 style="font-size: 12px; color: var(--color-cinnabar); font-weight: 600; margin: 0 0 10px;">
                ${art.title_zh}
              </h4>
            ` : ''}

            <p style="font-size: 12px; color: var(--color-ink-charcoal); line-height: 1.5; margin: 0 0 16px; flex-grow: 1;">
              ${excerpt}
            </p>

            <div style="margin-top: auto; border-top: 1px solid var(--color-paper-border); padding-top: 12px; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 11px; color: var(--color-ink-muted);">✍️ ${art.author}</span>
              <a href="detail.html?id=${art.slug}" style="font-size: 12px; font-weight: 700; color: var(--color-cinnabar); text-decoration: none;">
                ${readMoreText}
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
}

export const newsController = new NewsController();

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => newsController.init());
  } else {
    newsController.init();
  }
}
