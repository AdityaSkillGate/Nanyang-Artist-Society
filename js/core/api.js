/**
 * NANYANG ARTISTS SOCIETY — API CLIENT
 * Supports live Google Apps Script Web App API + Local Verified Seed Data Fallback
 */

import { SEED_DATA } from '../data/seed-data.js';

class ApiClient {
  constructor() {
    this.endpointUrl = localStorage.getItem('nas_gas_endpoint') || '';
    this.cachePrefix = 'nas_cache_';
  }

  setEndpoint(url) {
    this.endpointUrl = url;
    localStorage.setItem('nas_gas_endpoint', url);
  }

  async getTable(tableName) {
    // 1. Try Live GAS API if configured
    if (this.endpointUrl) {
      try {
        const response = await fetch(`${this.endpointUrl}?action=read&sheet=${encodeURIComponent(tableName)}`);
        if (response.ok) {
          const json = await response.json();
          if (json.status === 'success' && Array.isArray(json.data)) {
            localStorage.setItem(this.cachePrefix + tableName, JSON.stringify(json.data));
            return json.data;
          }
        }
      } catch (err) {
        console.warn(`[NAS API] Live fetch failed for ${tableName}, using local fallback.`, err);
      }
    }

    // 2. Try Cached data
    const cached = localStorage.getItem(this.cachePrefix + tableName);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {}
    }

    // 3. Verified Seed Data Fallback
    return SEED_DATA[tableName] || [];
  }

  async submitForm(action, payload) {
    if (!this.endpointUrl) {
      console.log(`[NAS Mock Submission] Action: ${action}`, payload);
      // Simulate successful network receipt in demo/offline mode
      return { status: 'success', message: 'Form submitted successfully (Demo/Local Mode)' };
    }

    try {
      const response = await fetch(this.endpointUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, data: payload })
      });
      return await response.json();
    } catch (err) {
      console.error(`[NAS API Submit Error]`, err);
      return { status: 'error', message: 'Submission failed. Please contact society office directly.' };
    }
  }
}

export const api = new ApiClient();
