/**
 * NANYANG ARTISTS SOCIETY — UNIFIED NEWS & EVENTS CONTROLLER
 * Rendered using the exact premium homepage card standard (event-card-premium):
 * Calendar badges, floating category pills, 16:9 media wrap with zoom,
 * serif titles, cinnabar subtitles, location pins, and status pill + action arrow.
 */

import { dataAdapter } from './services/dataAdapter.js';
import { i18n } from './services/i18n.js';
import { animationsEngine } from './modules/animations.js';

export class NewsEventsController {
  constructor() {
    this.news = [];
    this.events = [];
    this.allItems = [];
    this.filteredItems = [];
    this.activeFilter = 'all';
    this.searchQuery = '';
  }

  isChinese() {
    const lang = (i18n && typeof i18n.getLang === 'function')
      ? i18n.getLang()
      : (document.documentElement.getAttribute('lang') || 'zh-SG');
    return String(lang).startsWith('zh');
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
        displayDate: n.date || n.published_at || '2026-08-15',
        titleEn: n.title,
        titleZh: n.title_zh,
        summary: n.excerpt || n.excerpt_zh || n.content || '',
        imageSrc: this.resolveArtwork(n),
        targetUrl: 'article.html?type=news&id=' + (n.slug || n.id)
      })) : [];

      this.events = Array.isArray(eventsData) ? eventsData.map(e => ({
        ...e,
        itemType: 'event',
        categoryTag: e.eventType || 'Event',
        displayDate: e.date || e.startDate || '2026-09-01',
        titleEn: e.title,
        titleZh: e.title_zh,
        summary: e.description || e.description_zh || ('📅 ' + e.date + ' · ⏰ ' + (e.time || '10:00 AM') + ' · 📍 ' + (e.location || 'Jurong East HQ')),
        imageSrc: this.resolveArtwork(e),
        targetUrl: this.resolveEventTargetUrl(e)
      })) : [];

      // Sort chronologically (latest dispatches first)
      this.allItems = [...this.news, ...this.events].sort((a, b) => {
        const timeA = new Date(a.displayDate.replace(/^[0-9]+[–\-][0-9]+\s*/, '')).getTime() || 0;
        const timeB = new Date(b.displayDate.replace(/^[0-9]+[–\-][0-9]+\s*/, '')).getTime() || 0;
        return timeB - timeA;
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

  resolveArtwork(item) {
    const id = (item.id || '').toUpperCase();
    const slug = (item.slug || '').toLowerCase();

    // Specific verified art asset mappings
    if (id === 'EVT-2026-04' || slug.includes('laureates')) return 'assets/images/art-works/art-21.png';
    if (id === 'EVT-2026-03' || slug.includes('fan') || slug.includes('origami')) return 'assets/images/art-works/chinese-children-art.png';
    if (id === 'EVT-2026-02' || slug === 'national-grade-examination-summer-session') return 'assets/images/art-works/art-1.png';
    if (id === 'EVT-2026-01' || slug.includes('deadline')) return 'assets/images/art-works/art-11.png';
    if (id === 'EVT-2026-05' || slug.includes('teacher')) return 'assets/images/art-works/sketch-art.png';

    if (id === 'NEWS-2026-01' || slug.includes('call-for-entries')) return 'assets/images/art-works/Creative-Cartoon-art.png';
    if (id === 'NEWS-2026-02' || slug.includes('dates-released')) return 'assets/images/art-works/water-paint-art.png';
    if (id === 'NEWS-2026-03' || slug.includes('teng')) return 'assets/images/art-works/oil-panting.png';

    // General fallback
    if (item.image && !item.image.includes('unsplash.com')) return item.image;
    return 'assets/images/art-works/art-3.png';
  }

  resolveEventTargetUrl(item) {
    const slug = (item.slug || '').toLowerCase();
    const title = (item.title || '').toLowerCase();
    if (slug.includes('star') || title.includes('star')) return 'nanyang-star.html';
    if (slug.includes('grade') || slug.includes('exam')) return 'grade.html';
    if (slug.includes('origami') || slug.includes('fan') || slug.includes('workshop')) return 'courses.html';
    if (slug.includes('teacher') || title.includes('teacher')) return 'courses.html';
    return 'article.html?type=event&id=' + (item.slug || item.id);
  }

  parseDateBadge(dateStr) {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    if (!dateStr) return { month: 'NAS', day: '26' };

    // Format: 'YYYY-MM-DD'
    if (/^\d{4}-\d{2}-\d{2}/.test(dateStr)) {
      const parts = dateStr.split('-');
      const m = parseInt(parts[1], 10) - 1;
      const d = parseInt(parts[2], 10);
      return {
        month: months[m] || 'NAS',
        day: isNaN(d) ? '01' : (d < 10 ? '0' + d : String(d))
      };
    }

    // Format: '31 August 2026' or '12–13 September 2026' or '26 September 2026'
    const dayMatch = dateStr.match(/^(\d{1,2})/);
    const monthMatch = dateStr.match(/(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/i);

    let month = 'NAS';
    if (monthMatch) {
      const raw = monthMatch[1].slice(0, 3).toUpperCase();
      if (months.includes(raw)) month = raw;
    }

    let day = '15';
    if (dayMatch) {
      const d = parseInt(dayMatch[1], 10);
      day = d < 10 ? '0' + d : String(d);
    }

    return { month, day };
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
        const l = (item.location || item.location_zh || '').toLowerCase();
        matchesSearch = t1.includes(q) || t2.includes(q) || s.includes(q) || l.includes(q);
      }

      return matchesTab && matchesSearch;
    });

    this.renderFeed();
  }

  getMetaDetails(item, isZh) {
    const dateBadge = this.parseDateBadge(item.displayDate);

    let categoryLabel = item.categoryTag;
    let locationIcon = '📍';
    let locationText = item.location || 'Jurong East HQ, Singapore';
    let statusIcon = '🟢';
    let statusLabel = isZh ? '开放登记' : 'Registration Open';
    let statusStyle = 'color: #15803D; background: #F0FDF4; border-color: #BBF7D0;';
    let actionLabel = isZh ? '查看详情' : 'View Details';

    if (item.itemType === 'event') {
      const et = (item.eventType || '').toLowerCase();
      const slug = (item.slug || '').toLowerCase();

      if (et.includes('comp') || slug.includes('star')) {
        categoryLabel = isZh ? '国际旗舰赛事' : 'Flagship Competition';
        statusIcon = '🏆';
        statusLabel = isZh ? '全球公开征稿' : 'Global Open Call';
        statusStyle = 'color: #B45309; background: #FFFBEB; border-color: #FDE68A;';
        actionLabel = isZh ? '大赛详情' : 'Competition Details';
        locationText = isZh ? (item.location_zh || '新加坡旧国会大厦艺术之家 / 线上展厅') : (item.location || 'The Arts House & Online Portal');
      } else if (et.includes('grade') || et.includes('exam') || slug.includes('grade')) {
        categoryLabel = isZh ? '官方等级统考' : 'Official Examination';
        statusIcon = '🟢';
        statusLabel = isZh ? '双季考务报名' : 'Registration Open';
        statusStyle = 'color: #15803D; background: #F0FDF4; border-color: #BBF7D0;';
        actionLabel = isZh ? '考级日程' : 'Intake Schedule';
        locationText = isZh ? (item.location_zh || '裕廊东总院及5大认证考点') : (item.location || '5 Accredited Singapore Test Centres');
      } else if (et.includes('work') || slug.includes('workshop') || slug.includes('fan')) {
        categoryLabel = isZh ? '亲子创意工坊' : 'Creative Workshop';
        statusIcon = '🔥';
        statusLabel = isZh ? '席位有限 · 预约' : 'Limited Seats (RSVP)';
        statusStyle = 'color: #BA1B1D; background: #FEF2F2; border-color: #FECACA;';
        actionLabel = isZh ? '工坊预约' : 'Reserve Seat';
        locationText = isZh ? (item.location_zh || '南洋美术家协会第一画室 (裕廊东)') : (item.location || 'Society Studio A (Jurong East)');
      } else if (et.includes('exhib') || slug.includes('exhibition')) {
        categoryLabel = isZh ? '学术大展' : 'Grand Exhibition';
        statusIcon = '🎨';
        statusLabel = isZh ? '公众免票入场' : 'Free Public Admission';
        statusStyle = 'color: #1D4ED8; background: #EFF6FF; border-color: #BFDBFE;';
        actionLabel = isZh ? '观展指南' : 'Exhibition Guide';
        locationText = isZh ? (item.location_zh || '新加坡美术总会中央展厅 (友诺士)') : (item.location || 'Singapore FAS Grand Gallery');
      } else if (et.includes('course') || slug.includes('teacher')) {
        categoryLabel = isZh ? '名家进修班' : 'Academic Masterclass';
        statusIcon = '🎓';
        statusLabel = isZh ? '专业认证研修' : 'Accredited Practicum';
        statusStyle = 'color: #854D0E; background: #FEFCE8; border-color: #FEF08A;';
        actionLabel = isZh ? '报名简章' : 'Course Syllabus';
        locationText = isZh ? (item.location_zh || '协会总院多功能研讨厅 (裕廊东)') : (item.location || 'Society Jurong East HQ Theatre');
      } else {
        locationText = isZh ? (item.location_zh || item.location || '新加坡裕廊东总院') : (item.location || 'Jurong East HQ, Singapore');
      }
    } else {
      // News items
      locationIcon = '🏛️';
      locationText = isZh ? '新加坡南洋美术家协会官方发布' : 'Society Secretariat Official Dispatch';

      const cat = (item.category || '').toLowerCase();
      if (cat.includes('comp')) {
        categoryLabel = isZh ? '展赛资讯' : 'Competition Dispatch';
        statusIcon = '🏆';
        statusLabel = isZh ? '全球征稿' : 'Open Call Active';
        statusStyle = 'color: #B45309; background: #FFFBEB; border-color: #FDE68A;';
        actionLabel = isZh ? '阅读全篇' : 'Read Full Story';
      } else if (cat.includes('announc')) {
        categoryLabel = isZh ? '官方通告' : 'Official Notice';
        statusIcon = '📢';
        statusLabel = isZh ? '考务发布' : 'Official Release';
        statusStyle = 'color: #1D4ED8; background: #EFF6FF; border-color: #BFDBFE;';
        actionLabel = isZh ? '查阅公告' : 'Read Notice';
      } else if (cat.includes('salon')) {
        categoryLabel = isZh ? '名家讲座' : 'Academic Salon';
        statusIcon = '🎓';
        statusLabel = isZh ? '名家回顾' : 'Master Keynote';
        statusStyle = 'color: #854D0E; background: #FEFCE8; border-color: #FEF08A;';
        actionLabel = isZh ? '讲座综述' : 'Read Summary';
      } else {
        categoryLabel = isZh ? '协会动态' : 'Official Dispatch';
        statusIcon = '📰';
        statusLabel = isZh ? '最新动态' : 'Society Update';
        statusStyle = 'color: #15803D; background: #F0FDF4; border-color: #BBF7D0;';
        actionLabel = isZh ? '阅读报道' : 'Read Article';
      }
    }

    return { dateBadge, categoryLabel, locationIcon, locationText, statusIcon, statusLabel, statusStyle, actionLabel };
  }

  renderFeaturedItem() {
    const hero = document.getElementById('feed-featured-hero');
    if (!hero) return;

    const isZh = this.isChinese();
    const featured = this.allItems.find(item => item.featured || item.isFeatured) || this.allItems[0];
    if (!featured) return;

    const meta = this.getMetaDetails(featured, isZh);
    const titleMain = isZh ? (featured.titleZh || featured.titleEn) : featured.titleEn;
    const titleSub = isZh ? (featured.titleEn || '') : (featured.titleZh || '');
    const descRaw = isZh ? (featured.description_zh || featured.excerpt_zh || featured.summary) : (featured.description || featured.excerpt || featured.summary);
    const descClean = (descRaw || '').replace(/<[^>]*>?/gm, '').trim();

    hero.innerHTML = `
      <div class="feed-featured-card reveal-up is-revealed">
        <div class="event-media-wrap" style="height: 100%; min-height: 280px; position: relative;">
          <a href="${featured.targetUrl}" style="display: block; width: 100%; height: 100%;">
            <img src="${featured.imageSrc}" alt="${featured.titleEn}" class="event-media-img" onerror="this.onerror=null; this.src='assets/logo/logo.png';">
          </a>
          <div class="event-calendar-badge">
            <div class="event-cal-month">${meta.dateBadge.month}</div>
            <div class="event-cal-day">${meta.dateBadge.day}</div>
          </div>
          <span class="event-type-pill" style="background: var(--color-cinnabar, #BA1B1D); border-color: transparent;">
            ★ ${isZh ? '特别聚焦' : 'Featured Spotlight'}
          </span>
        </div>
        <div class="event-body-content" style="padding: 28px 32px; justify-content: center;">
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 12px; flex-wrap: wrap;">
            <span class="seal-badge seal-badge-gold">${meta.categoryLabel}</span>
            <span style="font-size: 12px; color: var(--color-ink-muted);">📅 ${featured.displayDate}</span>
          </div>
          <h2 class="event-title-main" style="font-size: 22px; margin-bottom: 6px; line-height: 1.35;">
            <a href="${featured.targetUrl}" style="color: inherit; text-decoration: none;">${titleMain}</a>
          </h2>
          <div class="event-title-zh" style="font-size: 14px; margin-bottom: 12px;">${titleSub}</div>
          <div class="event-meta-location" style="margin-bottom: 14px; font-size: 13px;">
            <span>${meta.locationIcon}</span> <span>${meta.locationText}</span>
          </div>
          <p class="event-desc-text" style="font-size: 13.5px; line-height: 1.65; margin-bottom: 20px;">
            ${descClean.slice(0, 210)}${descClean.length > 210 ? '...' : ''}
          </p>
          <div class="event-card-bottom" style="padding-top: 16px;">
            <span class="event-status-pill" style="${meta.statusStyle}; padding: 3px 10px; font-size: 11.5px;">
              <span>${meta.statusIcon}</span> <span>${meta.statusLabel}</span>
            </span>
            <a href="${featured.targetUrl}" class="btn btn-primary btn-sm" style="margin-left: auto;">
              ${meta.actionLabel} →
            </a>
          </div>
        </div>
      </div>
    `;
  }

  renderFeed() {
    const grid = document.getElementById('feed-cards-grid');
    const countBadge = document.getElementById('feed-results-count');
    if (!grid) return;

    const isZh = this.isChinese();

    if (countBadge) {
      countBadge.textContent = isZh
        ? ('显示 ' + this.filteredItems.length + ' 条资讯与考务活动')
        : ('Showing ' + this.filteredItems.length + ' update' + (this.filteredItems.length === 1 ? '' : 's'));
    }

    if (this.filteredItems.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: var(--color-gallery-white); border: 1px solid var(--color-paper-border); border-radius: var(--radius-md);">
          <div style="font-size: 36px; margin-bottom: 8px;">📰</div>
          <h4 style="font-size: 18px; margin-bottom: 6px;">${isZh ? '暂无匹配资讯' : 'No updates found'}</h4>
          <p style="font-size: 13px; color: var(--color-ink-muted);">${isZh ? '请尝试切换分类标签或调整搜索关键字。' : 'Try adjusting your search keywords or switching filter tabs.'}</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = this.filteredItems.map(item => {
      const meta = this.getMetaDetails(item, isZh);
      const titleMain = isZh ? (item.titleZh || item.titleEn) : item.titleEn;
      const titleSub = isZh ? (item.titleEn || '') : (item.titleZh || '');
      const descRaw = isZh ? (item.description_zh || item.excerpt_zh || item.summary) : (item.description || item.excerpt || item.summary);
      const descClean = (descRaw || '').replace(/<[^>]*>?/gm, '').trim();

      return `
        <div class="event-card-premium reveal-up is-revealed">
          <div class="event-media-wrap">
            <a href="${item.targetUrl}" style="display: block; width: 100%; height: 100%;">
              <img src="${item.imageSrc}" alt="${item.titleEn}" class="event-media-img" onerror="this.onerror=null; this.src='assets/logo/logo.png';">
            </a>
            <div class="event-calendar-badge">
              <div class="event-cal-month">${meta.dateBadge.month}</div>
              <div class="event-cal-day">${meta.dateBadge.day}</div>
            </div>
            <span class="event-type-pill">${meta.categoryLabel}</span>
          </div>
          <div class="event-body-content">
            <h3 class="event-title-main">
              <a href="${item.targetUrl}" style="color: inherit; text-decoration: none;">${titleMain}</a>
            </h3>
            <div class="event-title-zh">${titleSub}</div>
            <div class="event-meta-location">
              <span>${meta.locationIcon}</span> <span>${meta.locationText}</span>
            </div>
            <p class="event-desc-text">
              ${descClean.slice(0, 130)}${descClean.length > 130 ? '...' : ''}
            </p>
            <div class="event-card-bottom">
              <span class="event-status-pill" style="${meta.statusStyle}">
                <span>${meta.statusIcon}</span> <span>${meta.statusLabel}</span>
              </span>
              <a href="${item.targetUrl}" class="event-action-link">
                <span>${meta.actionLabel}</span> →
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (animationsEngine && typeof animationsEngine.initScrollReveals === 'function') {
      animationsEngine.initScrollReveals();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new NewsEventsController().init();
});
