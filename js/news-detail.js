/**
 * NANYANG ARTISTS SOCIETY — ARTICLE DETAIL RESOLVER
 * Dynamic Reader loaded by ?id=article-slug with Author Bio, Social Share, and Related News.
 */

import { dataAdapter } from './services/dataAdapter.js';

export class NewsDetailController {
  constructor() {
    this.article = null;
    this.allArticles = [];
  }

  async init() {
    try {
      this.allArticles = await dataAdapter.getTable('News');
      const params = new URLSearchParams(window.location.search);
      const slug = params.get('id') || '5th-nanyang-star-international-competition-call-for-entries';

      this.article = this.allArticles.find(a => a.slug === slug || a.id === slug) || this.allArticles[0];
      if (!this.article) return;

      this.renderArticle();
      this.renderRelatedArticles();
    } catch (err) {
      console.error('[NewsDetailController] Init error:', err);
    }
  }

  renderArticle() {
    document.title = `${this.article.title} | Nanyang Artists Society`;

    const titleEnEl = document.getElementById('article-title-en');
    const titleZhEl = document.getElementById('article-title-zh');
    const metaDateEl = document.getElementById('article-meta-date');
    const metaAuthorEl = document.getElementById('article-meta-author');
    const metaCategoryEl = document.getElementById('article-category-badge');
    const imageEl = document.getElementById('article-hero-image');
    const contentEl = document.getElementById('article-body-content');
    const tagsContainer = document.getElementById('article-tags-container');

    if (titleEnEl) titleEnEl.textContent = this.article.title;
    if (titleZhEl) titleZhEl.textContent = this.article.title_zh;
    if (metaDateEl) metaDateEl.textContent = `📅 ${this.article.date} · ⏱️ ${this.article.readTime}`;
    if (metaAuthorEl) metaAuthorEl.textContent = `✍️ ${this.article.author}`;
    if (metaCategoryEl) metaCategoryEl.textContent = this.article.category;
    if (imageEl) {
      imageEl.src = this.article.image;
      imageEl.alt = this.article.title;
    }

    if (contentEl) {
      contentEl.innerHTML = `
        <div style="font-size: 15px; line-height: 1.8; color: var(--color-ink-charcoal); margin-bottom: 32px;">
          ${this.article.content}
        </div>

        <div style="background: var(--color-warm-ivory); border-left: 4px solid var(--color-cinnabar); padding: 20px; border-radius: var(--radius-xs); margin-bottom: 32px;">
          <h4 style="font-size: 14px; color: var(--color-cinnabar); margin: 0 0 8px; font-weight: 700;">中文公告摘要 (Official Chinese Dispatch):</h4>
          <div style="font-size: 14px; line-height: 1.8; color: var(--color-ink-charcoal);">
            ${this.article.content_zh}
          </div>
        </div>
      `;
    }

    if (tagsContainer && this.article.tags) {
      tagsContainer.innerHTML = this.article.tags.map(t => `
        <span style="font-size: 11px; background: var(--color-warm-ivory-dark); padding: 4px 10px; border-radius: 9999px; color: var(--color-ink-muted);">
          #${t}
        </span>
      `).join('');
    }
  }

  renderRelatedArticles() {
    const container = document.getElementById('related-articles-container');
    if (!container) return;

    const related = this.allArticles.filter(a => a.id !== this.article.id).slice(0, 3);
    if (related.length === 0) return;

    container.innerHTML = related.map(art => `
      <div class="news-card">
        <a href="detail.html?id=${art.slug}" style="display: block; overflow: hidden; height: 160px;">
          <img src="${art.image}" alt="${art.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='../assets/logo/logo.png';">
        </a>
        <div style="padding: 16px; display: flex; flex-direction: column; flex-grow: 1;">
          <span style="font-size: 10px; color: var(--color-ink-muted); margin-bottom: 4px;">📅 ${art.date}</span>
          <h4 style="font-size: 14px; line-height: 1.4; margin: 0 0 4px;">
            <a href="detail.html?id=${art.slug}" style="color: var(--color-ink-black); text-decoration: none;">${art.title}</a>
          </h4>
          <a href="detail.html?id=${art.slug}" style="font-size: 11px; font-weight: 700; color: var(--color-cinnabar); text-decoration: none; margin-top: auto;">
            Read Story →
          </a>
        </div>
      </div>
    `).join('');
  }
}

export const newsDetail = new NewsDetailController();

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    newsDetail.init();
  });
}
