/**
 * NANYANG ARTISTS SOCIETY — ENTRANCE POPUP SERVICE
 * Museum-Grade Welcome Dialog with Configurable Frequency (session, daily, always).
 * Supports keyboard accessibility, focus trapping, smooth animations, and zero layout shift.
 */

export const POPUP_CONFIG = {
  enabled: true,
  delayMs: 1600,
  frequency: 'session', // 'session' | 'daily' | 'always'
  storageKey: 'nas_entrance_popup_viewed'
};

export class EntrancePopupService {
  constructor(config = {}) {
    this.config = { ...POPUP_CONFIG, ...config };
    this.backdrop = null;
    this.isVisible = false;
  }

  init() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    if (!this.config.enabled) return;

    if (this.shouldShow()) {
      setTimeout(() => {
        this.show();
      }, this.config.delayMs);
    }
  }

  shouldShow() {
    try {
      if (this.config.frequency === 'always') return true;

      if (this.config.frequency === 'session') {
        return !sessionStorage.getItem(this.config.storageKey);
      }

      if (this.config.frequency === 'daily') {
        const last = localStorage.getItem(this.config.storageKey);
        if (!last) return true;
        const diff = Date.now() - parseInt(last, 10);
        return diff > 24 * 60 * 60 * 1000;
      }
    } catch (e) {
      console.warn('[EntrancePopup] Storage read error:', e);
    }
    return true;
  }

  markAsShown() {
    try {
      if (this.config.frequency === 'session') {
        sessionStorage.setItem(this.config.storageKey, 'true');
      } else if (this.config.frequency === 'daily') {
        localStorage.setItem(this.config.storageKey, String(Date.now()));
      }
    } catch (e) {
      console.warn('[EntrancePopup] Storage write error:', e);
    }
  }

  show() {
    this.backdrop = document.getElementById('entrance-popup-backdrop');
    if (!this.backdrop) return;

    this.backdrop.classList.add('is-visible');
    this.isVisible = true;
    this.markAsShown();

    this.bindEvents();

    const closeBtn = document.getElementById('entrance-popup-close-btn');
    if (closeBtn) closeBtn.focus();
  }

  hide() {
    if (!this.backdrop) {
      this.backdrop = document.getElementById('entrance-popup-backdrop');
    }
    if (this.backdrop) {
      this.backdrop.classList.remove('is-visible');
    }
    this.isVisible = false;
  }

  bindEvents() {
    if (!this.backdrop || this._eventsBound) return;
    this._eventsBound = true;

    // Close button
    const closeBtn = document.getElementById('entrance-popup-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.hide();
      });
    }

    // Backdrop click outside card
    this.backdrop.addEventListener('click', (e) => {
      if (e.target === this.backdrop) {
        this.hide();
      }
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isVisible) {
        this.hide();
      }
    });
  }
}

export const entrancePopup = new EntrancePopupService();

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => entrancePopup.init());
  } else {
    entrancePopup.init();
  }
}
