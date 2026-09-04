/**
 * NANYANG ARTISTS SOCIETY — DYNAMIC ARTICLE & EVENT READER CONTROLLER
 * Reads ?id= and ?type= to dynamically render News articles or Event dossiers.
 */

import { dataAdapter } from './services/dataAdapter.js';
import { i18n } from './services/i18n.js';

export class ArticleReaderController {
  constructor() {
    this.itemId = null;
    this.itemType = 'news'; // 'news' or 'event'
    this.item = null;
  }

  async init() {
    const params = new URLSearchParams(window.location.search);
    this.itemId = params.get('id') || params.get('slug');
    this.itemType = params.get('type') || 'news';

    try {
      if (this.itemType === 'event') {
        const events = await dataAdapter.getTable('Events');
        const clean = (this.itemId || '').toLowerCase().trim();
        this.item = events.find(e => 
          (e.id && e.id.toLowerCase() === clean) ||
          (e.slug && e.slug.toLowerCase() === clean)
        ) || events[0];
        this.renderEvent();
      } else {
        const news = await dataAdapter.getTable('News');
        const clean = (this.itemId || '').toLowerCase().trim();
        this.item = news.find(n => 
          (n.id && n.id.toLowerCase() === clean) ||
          (n.slug && n.slug.toLowerCase() === clean)
        ) || news[0];
        this.renderNews();
      }
    } catch (err) {
      console.error('[ArticleReaderController] Init error:', err);
    }
  }

  resolveImg(url) {
    if (!url) return 'assets/logo/logo.png';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
    if (url.startsWith('./') || url.startsWith('/')) return url;
    return url.replace(/^\.\.\//, '');
  }

  renderNews() {
    const n = this.item;
    if (!n) return;

    document.title = `${n.title} | Singapore Nanyang Artists Society`;

    const breadcrumb = document.getElementById('breadcrumb-article-title');
    if (breadcrumb) breadcrumb.textContent = n.title;

    const badge = document.getElementById('article-category-badge');
    if (badge) badge.textContent = n.category || 'News Dispatch';

    const date = document.getElementById('article-meta-date');
    if (date) date.textContent = `📅 ${n.published_at || n.date || '2026-08-15'}`;

    const author = document.getElementById('article-meta-author');
    if (author) author.textContent = `✍️ ${n.author || 'Society Secretariat'}`;

    const titleEn = document.getElementById('article-title-en');
    if (titleEn) titleEn.textContent = n.title;

    const titleZh = document.getElementById('article-title-zh');
    if (titleZh) titleZh.textContent = n.title_zh || '';

    const heroImg = document.getElementById('article-hero-image');
    if (heroImg) {
      heroImg.src = this.resolveImg(n.image);
      heroImg.alt = n.title;
    }

    const bodyContent = document.getElementById('article-body-content');
    if (bodyContent) {
      const contentText = n.content || n.excerpt || '';
      bodyContent.innerHTML = contentText.split('\n\n').map(para => `
        <p style="font-size: 15px; line-height: 1.75; color: var(--color-ink-charcoal); margin-bottom: 18px;">
          ${para}
        </p>
      `).join('');
    }
  }

  renderEvent() {
    const e = this.item;
    if (!e) return;

    document.title = `${e.title} | Society Event | Singapore Nanyang Artists Society`;

    const breadcrumb = document.getElementById('breadcrumb-article-title');
    if (breadcrumb) breadcrumb.textContent = e.title;

    const badge = document.getElementById('article-category-badge');
    if (badge) {
      badge.textContent = e.eventType || 'Society Event';
      badge.className = 'seal-badge seal-badge-cobalt';
    }

    const date = document.getElementById('article-meta-date');
    if (date) date.textContent = `📅 ${e.date} (${e.time || '10:00 AM – 1:00 PM'})`;

    const author = document.getElementById('article-meta-author');
    if (author) author.textContent = `📍 ${e.location || 'Jurong East Secretariat'}`;

    const titleEn = document.getElementById('article-title-en');
    if (titleEn) titleEn.textContent = e.title;

    const titleZh = document.getElementById('article-title-zh');
    if (titleZh) titleZh.textContent = e.title_zh || '';

    const heroImg = document.getElementById('article-hero-image');
    if (heroImg) {
      heroImg.src = this.resolveImg(e.image);
      heroImg.alt = e.title;
    }

    const bodyContent = document.getElementById('article-body-content');
    if (bodyContent) {
      bodyContent.innerHTML = `
        <div style="background: var(--color-warm-ivory); border: 1px solid var(--color-paper-border); border-radius: var(--radius-md); padding: 20px; margin-bottom: 24px;">
          <h4 style="font-size: 16px; margin: 0 0 12px;">Event Information & Logistics</h4>
          <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: var(--color-ink-charcoal); line-height: 1.7;">
            <li><strong>Date & Time:</strong> ${e.date} · ${e.time || '10:00 AM – 1:00 PM'}</li>
            <li><strong>Venue:</strong> ${e.location || 'Blk 135 Jurong Gateway Rd #03-333/335, Singapore 600135'}</li>
            <li><strong>Format:</strong> ${e.format || 'In-Person Studio Masterclass / Forum'}</li>
            <li><strong>Audience:</strong> ${e.targetAudience || 'Open to Members, Students & Public'}</li>
          </ul>
        </div>
        <div style="font-size: 15px; line-height: 1.75; color: var(--color-ink-charcoal); margin-bottom: 24px;">
          ${(e.description || '').split('\n\n').map(p => `<p style="margin-bottom: 16px;">${p}</p>`).join('')}
        </div>
        <div style="margin-top: 24px;">
          <a href="contact.html?type=enquiry&subject=${encodeURIComponent('RSVP: ' + e.title)}" class="btn btn-primary btn-lg">
            RSVP / Register for Event →
          </a>
        </div>
      `;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ArticleReaderController().init();
});
