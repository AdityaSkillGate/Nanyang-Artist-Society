/**
 * NANYANG ARTISTS SOCIETY — DUAL-MODE DATA ADAPTER
 * Seamlessly transparent layer bridging Live GAS API & Local Database.
 */

import { api } from './api.js';
import { db } from './db.js';

class DataAdapter {
  constructor() {
    this.cachePrefix = 'nas_da_cache_';
  }

  async getTable(tableName) {
    // 1. Try Live Network if configured
    if (api.getEndpoint()) {
      try {
        const response = await api.fetch(tableName);
        if (response && response.status === 'success' && Array.isArray(response.data)) {
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(this.cachePrefix + tableName, JSON.stringify(response.data));
          }
          return response.data;
        }
      } catch (err) {
        console.warn(`[DataAdapter] Live fetch failed for ${tableName}. Falling back to cache/seed.`, err);
      }
    }

    // 2. Try Cached Local Storage
    if (typeof localStorage !== 'undefined') {
      const cached = localStorage.getItem(this.cachePrefix + tableName);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch (e) {}
      }
    }


    // 3. Fallback to Local Seed Database
    return db.getTable(tableName);
  }

  async getItemById(tableName, id) {
    const list = await this.getTable(tableName);
    return list.find(item => item.id === id) || null;
  }

  async submit(action, payload) {
    return await api.post(action, payload);
  }
}

export const dataAdapter = new DataAdapter();
