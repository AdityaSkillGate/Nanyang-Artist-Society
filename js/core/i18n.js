/**
 * NANYANG ARTISTS SOCIETY — I18N ENGINE
 */

import { en } from '../locales/en.js';
import { zh } from '../locales/zh.js';
import { ms } from '../locales/ms.js';
import { ta } from '../locales/ta.js';
import { store } from './store.js';

const dictionaries = { en, zh, ms, ta };

class I18nEngine {
  constructor() {
    this.currentLang = store.getState().currentLang || 'en';
    window.addEventListener('nas:lang_change', (e) => {
      this.currentLang = e.detail.lang;
      this.translateDOM();
    });
  }

  t(key) {
    const dict = dictionaries[this.currentLang] || dictionaries.en;
    return dict[key] || dictionaries.en[key] || key;
  }

  translateDOM() {
    const elements = document.querySelectorAll('[data-i18n]');
    for (const el of elements) {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);
      if (translation) {
        if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
          el.placeholder = translation;
        } else {
          el.textContent = translation;
        }
      }
    }

    // Update active state on language buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    for (const btn of langButtons) {
      if (btn.getAttribute('data-lang') === this.currentLang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }
  }

  init() {
    this.translateDOM();
    document.addEventListener('click', (e) => {
      const langBtn = e.target.closest('.lang-btn');
      if (langBtn) {
        const lang = langBtn.getAttribute('data-lang');
        if (lang) {
          store.setLanguage(lang);
        }
      }
    });
  }
}

export const i18n = new I18nEngine();
