/**
 * NANYANG ARTISTS SOCIETY — GLOBAL SHARED EXPERIENCE BOOTLOADER
 * Handles Component Mounting, Marquee Ticker, Sticky Header, Mobile Drawer,
 * Focus Trapping, Universal Search, and Language Synchronization.
 */

import { i18n } from '../services/i18n.js';
import { search } from '../services/search.js';
import { assistant } from '../services/assistant.js';
import { animationsEngine } from '../modules/animations.js';
import { SITE_CONFIG } from '../config/site.js';

export class AppBootloader {
  constructor() {
    this.basePath = this.calculateBasePath();
    this.isDrawerOpen = false;
    this.isSearchOpen = false;
    this.isMarqueePaused = false;
    this.activeSearchFilter = 'all';
    this._searchBound = false;
    this._drawerBound = false;
    this._langBound = false;
    this._announcementBound = false;
  }

  /**
   * Calculates the relative base path based on directory depth
   */
  calculateBasePath() {
    const pathname = window.location.pathname.replace(/\\/g, '/');
    const segments = pathname.split('/').filter(Boolean);
    const hasFile = segments.length > 0 && (segments[segments.length - 1].includes('.') || segments[segments.length - 1].includes('?'));
    const dirCount = hasFile ? segments.length - 1 : segments.length;

    const nasIndex = segments.findIndex(s => s.toLowerCase() === 'nanyang-artist-society');
    if (nasIndex !== -1) {
      const subSegments = segments.slice(nasIndex + 1);
      const subDirCount = (hasFile ? subSegments.length - 1 : subSegments.length);
      return subDirCount > 0 ? '../'.repeat(subDirCount) : './';
    }

    return dirCount > 0 ? '../'.repeat(dirCount) : './';
  }

  /**
   * Fetches a component HTML template and replaces {{BASE_PATH}}
   */
  async fetchComponent(componentName) {
    const url = `${this.basePath}components/${componentName}.html`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status} loading component ${url}`);
      let html = await res.text();
      return html.replace(/\{\{BASE_PATH\}\}/g, this.basePath);
    } catch (err) {
      console.error(`[AppBootloader] Failed to load component: ${componentName}`, err);
      return '';
    }
  }

  /**
   * Mounts all shared UI components into their placeholder roots
   */
  async mountComponents() {
    // 1. Mount Announcement Marquee Bar
    const announcementRoot = document.getElementById('announcement-root');
    if (announcementRoot) {
      const isDismissed = localStorage.getItem('nas_ann_dismissed_' + SITE_CONFIG.announcement.id);
      if (!isDismissed) {
        const html = await this.fetchComponent('announcement');
        if (html) announcementRoot.innerHTML = html;
      }
    }

    // 2. Mount Site Header
    const headerRoot = document.getElementById('header-root');
    if (headerRoot) {
      const html = await this.fetchComponent('header');
      if (html) headerRoot.innerHTML = html;
    }

    // 3. Mount Mobile Navigation Drawer
    let mobileNavRoot = document.getElementById('mobile-nav-root');
    if (!mobileNavRoot) {
      mobileNavRoot = document.createElement('div');
      mobileNavRoot.id = 'mobile-nav-root';
      document.body.appendChild(mobileNavRoot);
    }
    const mobileHtml = await this.fetchComponent('mobile-navigation');
    if (mobileHtml) mobileNavRoot.innerHTML = mobileHtml;

    // 4. Mount Universal Search Modal
    let searchModalRoot = document.getElementById('search-modal-root');
    if (!searchModalRoot) {
      searchModalRoot = document.createElement('div');
      searchModalRoot.id = 'search-modal-root';
      document.body.appendChild(searchModalRoot);
    }
    const searchHtml = await this.fetchComponent('search-modal');
    if (searchHtml) searchModalRoot.innerHTML = searchHtml;

    // 5. Mount Floating AI Art Assistant Widget
    let assistantRoot = document.getElementById('nas-assistant-root');
    if (!assistantRoot) {
      assistantRoot = document.createElement('div');
      assistantRoot.id = 'nas-assistant-root';
      document.body.appendChild(assistantRoot);
    }
    const assistantHtml = await this.fetchComponent('assistant-widget');
    if (assistantHtml) assistantRoot.innerHTML = assistantHtml;

    // 6. Mount Site Footer
    const footerRoot = document.getElementById('footer-root');
    if (footerRoot) {
      const html = await this.fetchComponent('footer');
      if (html) footerRoot.innerHTML = html;
    }

    // 7. Mount Entrance Popup Modal
    let popupRoot = document.getElementById('entrance-popup-root');
    if (popupRoot) {
      const popupHtml = await this.fetchComponent('entrance-popup');
      if (popupHtml) popupRoot.innerHTML = popupHtml;
    }
  }


  /**
   * Highlights active navigation link and sets aria-current="page"
   */
  highlightActiveNavigation() {
    const currentPath = window.location.pathname.toLowerCase().replace(/\\/g, '/');
    const navLinks = document.querySelectorAll('.main-nav .nav-link, .main-nav .dropdown-link, .mobile-nav-link, .mobile-sublink');

    navLinks.forEach(link => {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    });

    // Check for Home route
    const isHome = currentPath === '/' || 
                   currentPath.endsWith('/index.html') ||
                   currentPath.endsWith('/nanyang-artist-society/') ||
                   currentPath.endsWith('/nanyang-artist-society');

    const isRootIndex = isHome && !['/about', '/courses', '/grade', '/competitions', '/gallery', '/news', '/events', '/contact'].some(sub => currentPath.includes(sub));

    if (isRootIndex) {
      document.querySelectorAll('[data-route="home"]').forEach(link => {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      });
      return;
    }

    // Determine active route name from root V2 filenames and legacy subpaths
    const routeRules = [
      { route: 'about', match: ['about.html', '/about'] },
      { route: 'courses', match: ['courses.html', 'course-detail.html', '/courses'] },
      { route: 'grade', match: ['grade.html', 'grade-detail.html', '/grade-examination'] },
      { route: 'nanyang-star', match: ['nanyang-star.html', '/competitions'] },
      { route: 'gallery', match: ['gallery.html', 'artwork.html', '/gallery'] },
      { route: 'news-events', match: ['news-events.html', 'article.html', '/news', '/events'] },
      { route: 'contact', match: ['contact.html', '/contact'] }
    ];

    let matchedRoute = null;
    for (const rule of routeRules) {
      if (rule.match.some(m => currentPath.includes(m))) {
        matchedRoute = rule.route;
        break;
      }
    }

    if (matchedRoute) {
      document.querySelectorAll(`[data-route="${matchedRoute}"]`).forEach(link => {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
        const parentNavItem = link.closest('.nav-item');
        if (parentNavItem) {
          const parentNavLink = parentNavItem.querySelector('.nav-link');
          if (parentNavLink) {
            parentNavLink.classList.add('active');
            parentNavLink.setAttribute('aria-current', 'page');
          }
        }
      });
    }
  }

  /**
   * Initializes Header Scroll Compact Behavior
   */
  initScrollBehavior() {
    const header = document.getElementById('site-header');
    if (!header) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 40) {
            header.classList.add('header-compact');
          } else {
            header.classList.remove('header-compact');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /**
   * Initializes Announcement Marquee Controls
   */
  initAnnouncementControls() {
    const bar = document.getElementById('announcement-bar');
    const textSpan = document.getElementById('announcement-text');
    if (!bar) return;

    const updateAnnouncementText = () => {
      if (!textSpan) return;
      const lang = i18n.getLanguage ? i18n.getLanguage() : 'en';
      if (lang === 'zh') textSpan.textContent = SITE_CONFIG.announcement.textZh;
      else if (lang === 'ms') textSpan.textContent = SITE_CONFIG.announcement.textMs;
      else if (lang === 'ta') textSpan.textContent = SITE_CONFIG.announcement.textTa;
      else textSpan.textContent = SITE_CONFIG.announcement.textEn;
    };
    updateAnnouncementText();
    window.addEventListener('nas:languageChanged', updateAnnouncementText);

    if (this._announcementBound) return;
    this._announcementBound = true;

    document.addEventListener('click', (e) => {
      const pauseBtn = e.target.closest('#announcement-pause-btn');
      if (pauseBtn) {
        const announcementBar = document.getElementById('announcement-bar');
        const pauseIcon = pauseBtn.querySelector('.icon-pause');
        const playIcon = pauseBtn.querySelector('.icon-play');
        this.isMarqueePaused = !this.isMarqueePaused;
        if (announcementBar) announcementBar.classList.toggle('is-paused', this.isMarqueePaused);
        pauseBtn.setAttribute('aria-label', this.isMarqueePaused ? 'Play announcement animation' : 'Pause announcement animation');
        if (pauseIcon) pauseIcon.style.display = this.isMarqueePaused ? 'none' : 'inline';
        if (playIcon) playIcon.style.display = this.isMarqueePaused ? 'inline' : 'none';
        return;
      }

      const dismissBtn = e.target.closest('#announcement-dismiss-btn');
      if (dismissBtn) {
        const announcementBar = document.getElementById('announcement-bar');
        if (announcementBar) announcementBar.style.display = 'none';
        localStorage.setItem('nas_ann_dismissed_' + SITE_CONFIG.announcement.id, 'true');
        return;
      }
    });
  }

  /**
   * Initializes Mobile Navigation Drawer and Accordions
   */
  initMobileDrawer() {
    if (this._drawerBound) return;
    this._drawerBound = true;

    const openDrawer = () => {
      this.isDrawerOpen = true;
      const drawerWrapper = document.getElementById('mobile-nav-wrapper');
      const hamburgerBtn = document.getElementById('mobile-hamburger-btn');
      const drawerCloseBtn = document.getElementById('mobile-drawer-close');

      if (drawerWrapper) {
        drawerWrapper.classList.add('drawer-active', 'is-open');
        drawerWrapper.setAttribute('aria-hidden', 'false');
      }
      if (hamburgerBtn) {
        hamburgerBtn.classList.add('is-active');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
      }
      document.body.classList.add('drawer-scroll-locked');
      if (drawerCloseBtn) setTimeout(() => drawerCloseBtn.focus(), 100);
    };

    const closeDrawer = () => {
      this.isDrawerOpen = false;
      const drawerWrapper = document.getElementById('mobile-nav-wrapper');
      const hamburgerBtn = document.getElementById('mobile-hamburger-btn');

      if (drawerWrapper) {
        drawerWrapper.classList.remove('drawer-active', 'is-open');
        drawerWrapper.setAttribute('aria-hidden', 'true');
      }
      if (hamburgerBtn) {
        hamburgerBtn.classList.remove('is-active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        hamburgerBtn.focus();
      }
      document.body.classList.remove('drawer-scroll-locked');
    };

    document.addEventListener('click', (e) => {
      // Toggle hamburger
      if (e.target.closest('#mobile-hamburger-btn, .mobile-hamburger-btn')) {
        e.preventDefault();
        if (this.isDrawerOpen) closeDrawer();
        else openDrawer();
        return;
      }

      // Close button
      if (e.target.closest('#mobile-drawer-close, .mobile-drawer-close')) {
        e.preventDefault();
        closeDrawer();
        return;
      }

      // Backdrop
      if (e.target.closest('#mobile-drawer-backdrop, .mobile-drawer-backdrop')) {
        e.preventDefault();
        closeDrawer();
        return;
      }

      // Accordion Toggle
      const accordionToggle = e.target.closest('.mobile-accordion-toggle');
      if (accordionToggle) {
        e.preventDefault();
        const isExpanded = accordionToggle.getAttribute('aria-expanded') === 'true';
        const panel = accordionToggle.nextElementSibling;
        accordionToggle.setAttribute('aria-expanded', (!isExpanded).toString());
        if (panel) panel.hidden = isExpanded;
        return;
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isDrawerOpen) {
        closeDrawer();
      }
    });
  }

  /**
   * Initializes Universal Search Interaction
   */
  initSearchInteraction() {
    if (this._searchBound) return;
    this._searchBound = true;

    const openSearch = () => {
      this.isSearchOpen = true;
      const searchModal = document.getElementById('search-modal');
      const searchInput = document.getElementById('search-input');
      const searchResults = document.getElementById('search-results');
      if (searchModal) {
        searchModal.style.display = 'flex';
        document.body.classList.add('modal-scroll-locked');
        if (searchInput) {
          searchInput.value = '';
          setTimeout(() => searchInput.focus(), 60);
        }
        if (searchResults) {
          searchResults.innerHTML = '<p class="search-placeholder-msg">Type to search across all courses, grade criteria, test centres, and archives...</p>';
        }
      }
    };

    const closeSearch = () => {
      this.isSearchOpen = false;
      const searchModal = document.getElementById('search-modal');
      if (searchModal) {
        searchModal.style.display = 'none';
        document.body.classList.remove('modal-scroll-locked');
      }
    };

    const performSearch = async () => {
      const searchInput = document.getElementById('search-input');
      const searchResults = document.getElementById('search-results');
      if (!searchResults) return;

      const q = searchInput ? searchInput.value : '';
      const matches = await search.query(q, this.activeSearchFilter);

      if (!q.trim() && this.activeSearchFilter === 'all') {
        searchResults.innerHTML = '<p class="search-placeholder-msg">Type to search across all courses, grade criteria, test centres, and archives...</p>';
        return;
      }

      if (matches.length === 0) {
        searchResults.innerHTML = `<p class="search-placeholder-msg">No results found for "${q}" in ${this.activeSearchFilter.toUpperCase()}. Try switching category filters.</p>`;
        return;
      }

      searchResults.innerHTML = matches.map(m => `
        <a href="${this.basePath}${m.url}" class="search-result-item" style="display: flex; gap: 12px; padding: 12px; text-decoration: none; border-bottom: 1px solid var(--color-paper-border); color: inherit; border-radius: var(--radius-sm); margin-bottom: 4px; transition: background-color var(--transition-fast);">
          ${m.thumbnail ? `<img src="${m.thumbnail}" alt="${m.title}" style="width: 48px; height: 48px; object-fit: cover; border-radius: 4px; flex-shrink: 0;">` : ''}
          <div style="flex-grow: 1; min-width: 0;">
            <span style="font-size: 10px; font-weight: 700; color: var(--color-cinnabar); text-transform: uppercase;">${m.type}</span>
            <h4 style="font-size: 14px; font-weight: 700; color: var(--color-ink-black); margin: 2px 0 4px;">${m.title}</h4>
            <p style="font-size: 12px; color: var(--color-ink-muted); margin: 0; line-height: 1.4;">${m.snippet}</p>
          </div>
        </a>
      `).join('');
    };

    // Delegated click listeners
    document.addEventListener('click', (e) => {
      // Open Search Trigger
      if (e.target.closest('[data-search-trigger], .search-trigger-btn')) {
        e.preventDefault();
        openSearch();
        return;
      }

      // Close Search
      if (e.target.closest('#search-modal-close, .search-modal-close')) {
        e.preventDefault();
        closeSearch();
        return;
      }

      // Click on backdrop
      const modal = document.getElementById('search-modal');
      if (e.target === modal) {
        closeSearch();
        return;
      }

      // Filter Pill
      const filterPill = e.target.closest('.search-filter-pill');
      if (filterPill) {
        document.querySelectorAll('.search-filter-pill').forEach(p => p.classList.remove('active'));
        filterPill.classList.add('active');
        this.activeSearchFilter = filterPill.getAttribute('data-filter') || 'all';
        performSearch();
        return;
      }

      // Quick Search Chip
      const chip = e.target.closest('.search-chip');
      if (chip) {
        const query = chip.getAttribute('data-query') || chip.textContent.trim();
        const searchInput = document.getElementById('search-input');
        if (searchInput && query) {
          searchInput.value = query;
          performSearch();
        }
        return;
      }
    });

    // Real-Time Search input handler
    document.addEventListener('input', (e) => {
      if (e.target.id === 'search-input') {
        performSearch();
      }
    });

    // Global Shortcut: Cmd/Ctrl + K and Escape
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (this.isSearchOpen) closeSearch();
        else openSearch();
      }
      if (e.key === 'Escape' && this.isSearchOpen) {
        closeSearch();
      }
    });
  }

  /**
   * Initializes Multi-Language Switcher (EN, ZH, MS, TA) with Dropdown
   */
  initLanguageSwitcher() {
    if (this._langBound) return;
    this._langBound = true;

    const langCodeMap = {
      en: 'EN',
      'zh-SG': '中文',
      zh: '中文'
    };

    const updateActiveButtons = (currentLang) => {
      const isZh = (currentLang === 'zh-SG' || currentLang === 'zh');
      // 1. Update text label on header dropdown button
      const codeLabels = document.querySelectorAll('#lang-current-code, .lang-current-code');
      codeLabels.forEach(el => {
        el.textContent = isZh ? '中文' : 'EN';
      });

      // 2. Update active class on dropdown items & standard buttons
      const langItems = document.querySelectorAll('.lang-dropdown-item, .lang-btn, [data-lang]');
      langItems.forEach(item => {
        const lang = item.getAttribute('data-lang');
        const isActive = (lang === currentLang) || (isZh && (lang === 'zh-SG' || lang === 'zh'));
        item.classList.toggle('active', isActive);
        item.setAttribute('aria-current', isActive ? 'true' : 'false');
      });
    };

    const closeAllDropdowns = () => {
      const wrappers = document.querySelectorAll('.lang-dropdown-wrapper');
      wrappers.forEach(w => {
        w.classList.remove('is-open');
        const btn = w.querySelector('.lang-dropdown-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    };

    const currentLang = i18n.getLanguage ? i18n.getLanguage() : 'en';
    updateActiveButtons(currentLang);

    // Global Click Handler for dropdown toggle and language switching
    document.addEventListener('click', (e) => {
      // Toggle dropdown button
      const toggleBtn = e.target.closest('#lang-dropdown-toggle, .lang-dropdown-btn');
      if (toggleBtn) {
        e.preventDefault();
        e.stopPropagation();
        const wrapper = toggleBtn.closest('.lang-dropdown-wrapper');
        if (wrapper) {
          const isOpen = wrapper.classList.toggle('is-open');
          toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }
        return;
      }

      // Select language item from dropdown or buttons
      const langBtn = e.target.closest('.lang-dropdown-item, .lang-btn, [data-lang]');
      if (langBtn) {
        e.preventDefault();
        const targetLang = langBtn.getAttribute('data-lang');
        if (targetLang) {
          i18n.setLanguage(targetLang);
          updateActiveButtons(i18n.getLanguage());
          closeAllDropdowns();
        }
        return;
      }

      // Close dropdown if clicked outside
      if (!e.target.closest('.lang-dropdown-wrapper')) {
        closeAllDropdowns();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAllDropdowns();
      }
    });

    window.addEventListener('nas:languageChanged', (e) => {
      const lang = e.detail && e.detail.language ? e.detail.language : i18n.getLanguage();
      updateActiveButtons(lang);
      i18n.translateDOM();
    });
  }

  /**
   * Main Bootloader Execution Entry
   */
  async init() {
    await this.mountComponents();
    this.highlightActiveNavigation();
    this.initScrollBehavior();
    this.initAnnouncementControls();
    this.initMobileDrawer();
    this.initSearchInteraction();
    this.initLanguageSwitcher();
    if (i18n && typeof i18n.init === 'function') i18n.init();
    if (assistant && typeof assistant.init === 'function') assistant.init();
    if (animationsEngine && typeof animationsEngine.init === 'function') animationsEngine.init();
  }
}

export const app = new AppBootloader();

// Auto-run immediately or on DOM Ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      app.init();
    });
  } else {
    app.init();
  }
}


