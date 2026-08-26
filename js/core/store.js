/**
 * NANYANG ARTISTS SOCIETY — REACTIVE CLIENT STORE
 */

import { SEED_DATA } from '../data/seed-data.js';

class StateStore {
  constructor() {
    this.state = {
      currentLang: localStorage.getItem('nas_lang') || 'en',
      courses: SEED_DATA.Courses || [],
      disciplines: SEED_DATA.GradeDisciplines || [],
      centres: SEED_DATA.ExamCentres || [],
      people: SEED_DATA.People || [],
      consultants: SEED_DATA.Consultants || [],
      settings: SEED_DATA.Settings || [],
      searchQuery: '',
      isSearchOpen: false,
      isAssistantOpen: false
    };
    this.listeners = new Set();
  }

  getState() {
    return this.state;
  }

  setState(partialState) {
    this.state = { ...this.state, ...partialState };
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  setLanguage(lang) {
    if (['en', 'zh', 'ms', 'ta'].includes(lang)) {
      this.setState({ currentLang: lang });
      localStorage.setItem('nas_lang', lang);
      document.documentElement.lang = lang;
      window.dispatchEvent(new CustomEvent('nas:lang_change', { detail: { lang } }));
    }
  }
}

export const store = new StateStore();
