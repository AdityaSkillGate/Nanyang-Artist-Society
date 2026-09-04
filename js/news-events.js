/**
 * NANYANG ARTISTS SOCIETY — UNIFIED NEWS & EVENTS CONTROLLER
 * Combines News editorial articles and Events calendar items into a unified feed.
 * Filter tabs: All, News, Events, Announcements, Exhibitions.
 */

import { dataAdapter } from './services/dataAdapter.js';
import { i18n } from './services/i18n.js';

export class NewsEventsController {
  constructor() {
    this.news = [];
    this.events = [];
    this.allItems = [];
    this.filteredItems = [];
    this.activeFilter = 'all';
    this.searchQuery = '';
  }

  async init() {
    try {
      const [newsData, eventsData] = await Promise.all([
        dataAdapter.getTable('News'),
        dataAdapter.getTable('Events')
      ]);

      this.news = Array.isArray(newsData) ? newsData.map(n => ({
        ...n,
        itemType: 'news',
        categoryTag: n.category || 'News',
        displayDate: n.published_at || n.date || '2026-08-15',
        titleEn: n.title,
        titleZh: n.title_zh,
        summary: n.excerpt || n.excerpt_zh || n.content || '',
        imageSrc: n.image || 'assets/logo/logo.png',
        targetUrl: `article.html?type=news&id=${n.slug || n.id}`
      })) : [];

      this.events = Array.isArray(eventsData) ? eventsData.map(e => ({
        ...e,
        itemType: 'event',
        categoryTag: e.eventType || 'Event',
        displayDate: e.date || '2026-09-01',
        titleEn: e.title,
        titleZh: e.title_zh,
        summary: `📅 ${e.date} · ⏰ ${e.time || '10:00 AM'} · 📍 ${e.location || 'Jurong East HQ'}`,
        imageSrc: e.image || 'assets/logo/logo.png',
        targetUrl: `article.html?type=event&id=${e.slug || e.id}`
      })) : [];

      this.allItems = [...this.news, ...this.events].sort((a, b) => {
        return new Date(b.displayDate) - new Date(a.displayDate);
      });

      this.filteredItems = [...this.allItems];

      this.bindControls();
      this.renderFeaturedItem();
      this.renderFeed();

      window.addEventListener('nas:languageChanged', () => {
        this.renderFeaturedItem();
        this.renderFeed();
      });
    } catch (err) {
      console.error('[NewsEventsController] Init error:', err);
    }
  }

  resolveImg(url) {
    if (!url) return 'assets/logo/logo.png';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
    if (url.startsWith('./') || url.startsWith('/')) return url;
    return url.replace(/^\.\.\//, '');
  }

  bindControls() {
    const filterTabs = document.querySelectorAll('[data-feed-filter]');
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.activeFilter = tab.getAttribute('data-feed-filter');
        this.applyFilter();
      });
    });

    const searchInput = document.getElementById('feed-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        this.applyFilter();
      });
    }
  }

  applyFilter() {
    const f = this.activeFilter;
    const q = this.searchQuery;

    this.filteredItems = this.allItems.filter(item => {
      let matchesTab = true;
      if (f === 'news') matchesTab = item.itemType === 'news';
      else if (f === 'events') matchesTab = item.itemType === 'event';
      else if (f === 'announcements') {
        const cat = (item.categoryTag || '').toLowerCase();
        matchesTab = cat.includes('announcement') || cat.includes('notice') || cat.includes('call');
      } else if (f === 'exhibitions') {
        const cat = (item.categoryTag || '').toLowerCase();
        matchesTab = cat.includes('exhibition') || cat.includes('gallery') || cat.includes('showcase');
      }

      let matchesSearch = true;
      if (q) {
        const t1 = (item.titleEn || '').toLowerCase();
        const t2 = (item.titleZh || '').toLowerCase();
        const s = (item.summary || '').toLowerCase();
        matchesSearch = t1.includes(q) || t2.includes(q) || s.includes(q);
      }

      return matchesTab && matchesSearch;
    });

    this.renderFeed();
  }

  renderFeaturedItem() {
    const hero = document.getElementById('feed-featured-hero');
    if (!hero) return;

    const featured = this.allItems.find(item => item.isFeatured) || this.allItems[0];
    if (!featured) return;

    hero.innerHTML = `
      <div style="display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 32px; align-items: center; background: var(--color-gallery-white); border: 1px solid var(--color-paper-border); border-radius: var(--radius-lg); padding: 28px; box-shadow: var(--shadow-card);">
        <div style="border-radius: var(--radius-md); overflow: hidden; aspect-ratio: 16/10; background: var(--color-warm-ivory);">
          <img src="${this.resolveImg(featured.imageSrc)}" alt="${featured.titleEn}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='assets/logo/logo.png';">
        </div>
        <div>
          <div style="display: flex; gap: 8px; margin-bottom: 12px; align-items: center;">
            <span class="seal-badge seal-badge-gold">Featured Spotlight</span>
            <span class="seal-badge ${featured.itemType === 'event' ? 'seal-badge-cobalt' : ''}">${featured.categoryTag}</span>
            <span style="font-size: 12px; color: var(--color-ink-muted);">${featured.displayDate}</span>
          </div>
          <h2 style="font-size: 24px; margin: 0 0 6px;">
            <a href="${featured.targetUrl}" style="color: inherit; text-decoration: none;">${featured.titleEn}</a>
          </h2>
          <h3 style="font-size: 15px; color: var(--color-cinnabar); font-weight: 600; margin: 0 0 14px;">${featured.titleZh || ''}</h3>
          <p style="font-size: 14px; color: var(--color-ink-charcoal); line-height: 1.6; margin: 0 0 20px;">
            ${featured.summary.slice(0, 220)}${featured.summary.length > 220 ? '...' : ''}
          </p>
          <a href="${featured.targetUrl}" class="btn btn-primary btn-sm">Read Full Story / Register →</a>
        </div>
      </div>
    `;
  }

  renderFeed() {
    const grid = document.getElementById('feed-cards-grid');
    const countBadge = document.getElementById('feed-results-count');
    if (!grid) return;

    if (countBadge) {
      countBadge.textContent = `Showing ${this.filteredItems.length} update${this.filteredItems.length === 1 ? '' : 's'}`;
    }

    if (this.filteredItems.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: var(--color-gallery-white); border: 1px solid var(--color-paper-border); border-radius: var(--radius-md);">
          <div style="font-size: 36px; margin-bottom: 8px;">📰</div>
          <h4 style="font-size: 18px; margin-bottom: 6px;">No updates found</h4>
          <p style="font-size: 13px; color: var(--color-ink-muted);">Try adjusting your search keywords or switching filter tabs.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = this.filteredItems.map(item => `
      <div class="card" style="display: flex; flex-direction: column; overflow: hidden;">
        <a href="${item.targetUrl}" style="display: block; aspect-ratio: 16/10; overflow: hidden; background: var(--color-warm-ivory);">
          <img src="${this.resolveImg(item.imageSrc)}" alt="${item.titleEn}" style="width: 100%; height: 100%; object-fit: cover; transition: transform var(--transition-medium);" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'" onerror="this.onerror=null; this.src='assets/logo/logo.png';">
        </a>
        <div style="padding: 20px; display: flex; flex-direction: column; flex-grow: 1;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span class="seal-badge ${item.itemType === 'event' ? 'seal-badge-cobalt' : ''}" style="font-size: 10px;">${item.categoryTag}</span>
            <span style="font-size: 11px; color: var(--color-ink-muted);">${item.displayDate}</span>
          </div>
          <h3 style="font-size: 17px; margin: 0 0 4px;">
            <a href="${item.targetUrl}" style="color: inherit; text-decoration: none;">${item.titleEn}</a>
          </h3>
          <h4 style="font-size: 13px; color: var(--color-cinnabar); font-weight: 600; margin: 0 0 10px;">${item.titleZh || ''}</h4>
          <p style="font-size: 13px; color: var(--color-ink-charcoal); line-height: 1.55; margin: 0 0 16px; flex-grow: 1;">
            ${item.summary.slice(0, 130)}${item.summary.length > 130 ? '...' : ''}
          </p>
          <a href="${item.targetUrl}" class="btn btn-outline btn-sm" style="align-self: flex-start;">
            ${item.itemType === 'event' ? 'Event Details & RSVP →' : 'Read Article →'}
          </a>
        </div>
      </div>
    `).join('');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new NewsEventsController().init();
});
