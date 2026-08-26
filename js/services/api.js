/**
 * NANYANG ARTISTS SOCIETY — API HTTP CLIENT
 * Handles network requests with timeout, error handling, and payload encoding.
 */

import { SITE_CONFIG } from '../config/site.js';

class ApiService {
  constructor() {
    this.endpointKey = SITE_CONFIG.api.gasEndpointStorageKey;
  }

  getEndpoint() {
    if (typeof localStorage === 'undefined') return SITE_CONFIG.api.defaultEndpoint;
    return localStorage.getItem(this.endpointKey) || SITE_CONFIG.api.defaultEndpoint;
  }

  setEndpoint(url) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.endpointKey, url);
    }
  }

  async fetch(sheetName) {
    const endpoint = this.getEndpoint();
    if (!endpoint) {
      throw new Error('No GAS endpoint configured. Use local dataAdapter.');
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    try {
      const res = await window.fetch(`${endpoint}?action=read&sheet=${encodeURIComponent(sheetName)}`, {
        signal: controller.signal
      });
      clearTimeout(timeout);
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const data = await res.json();
      return data;
    } catch (err) {
      clearTimeout(timeout);
      throw err;
    }
  }

  async post(action, payload) {
    const endpoint = this.getEndpoint();
    if (!endpoint) {
      console.warn('[API Service] No endpoint configured. Simulating offline submit:', payload);
      return { status: 'success', message: 'Demo submission recorded.' };
    }

    const res = await window.fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, data: payload })
    });
    return await res.json();
  }
}

export const api = new ApiService();
