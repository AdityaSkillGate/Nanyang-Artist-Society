/**
 * NANYANG ARTISTS SOCIETY — EVENT DETAIL RESOLVER
 * Dynamic Event Page loaded by ?id=event-slug with Schedule, Location Maps & Registration.
 */

import { dataAdapter } from './services/dataAdapter.js';

export class EventDetailController {
  constructor() {
    this.event = null;
    this.allEvents = [];
  }

  async init() {
    try {
      this.allEvents = await dataAdapter.getTable('Events');
      const params = new URLSearchParams(window.location.search);
      const slug = params.get('id') || '5th-nanyang-star-competition-submission-deadline';

      this.event = this.allEvents.find(e => e.slug === slug || e.id === slug) || this.allEvents[0];
      if (!this.event) return;

      this.renderEvent();
      this.renderRelatedEvents();
    } catch (err) {
      console.error('[EventDetailController] Init error:', err);
    }
  }

  renderEvent() {
    document.title = `${this.event.title} | Nanyang Artists Society`;

    const titleEnEl = document.getElementById('event-title-en');
    const titleZhEl = document.getElementById('event-title-zh');
    const typeBadge = document.getElementById('event-type-badge');
    const dateEl = document.getElementById('event-date-text');
    const timeEl = document.getElementById('event-time-text');
    const locationEl = document.getElementById('event-location-text');
    const addressEl = document.getElementById('event-address-text');
    const feeEl = document.getElementById('event-fee-text');
    const organizerEl = document.getElementById('event-organizer-text');
    const imageEl = document.getElementById('event-hero-image');
    const descEl = document.getElementById('event-description-text');
    const ctaBtn = document.getElementById('event-registration-cta-btn');
    const mapLink = document.getElementById('event-map-link');

    if (titleEnEl) titleEnEl.textContent = this.event.title;
    if (titleZhEl) titleZhEl.textContent = this.event.title_zh;
    if (typeBadge) typeBadge.textContent = this.event.eventType;
    if (dateEl) dateEl.textContent = this.event.date;
    if (timeEl) timeEl.textContent = this.event.time;
    if (locationEl) locationEl.textContent = this.event.location;
    if (addressEl) addressEl.textContent = this.event.address;
    if (feeEl) feeEl.textContent = this.event.fee || 'Admission Free';
    if (organizerEl) organizerEl.textContent = this.event.organizer || 'Nanyang Artists Society';
    if (imageEl) {
      imageEl.src = this.event.image;
      imageEl.alt = this.event.title;
    }

    if (descEl) {
      descEl.innerHTML = `
        <div style="font-size: 15px; line-height: 1.8; color: var(--color-ink-charcoal); margin-bottom: 24px;">
          ${this.event.description}
        </div>
        <div style="background: var(--color-warm-ivory); border-left: 4px solid var(--color-cinnabar); padding: 18px; border-radius: var(--radius-xs);">
          <h4 style="font-size: 13px; color: var(--color-cinnabar); margin: 0 0 6px; font-weight: 700;">活动详情与注意事项 (Chinese Event Brief):</h4>
          <div style="font-size: 13px; line-height: 1.7; color: var(--color-ink-charcoal);">
            ${this.event.description_zh}
          </div>
        </div>
      `;
    }

    if (ctaBtn && this.event.registrationUrl) {
      ctaBtn.href = this.event.registrationUrl;
      ctaBtn.textContent = 'Register / Access Entry Portal →';
    }

    if (mapLink && this.event.address) {
      mapLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.event.address)}`;
    }
  }

  renderRelatedEvents() {
    const container = document.getElementById('related-events-container');
    if (!container) return;

    const related = this.allEvents.filter(e => e.id !== this.event.id).slice(0, 3);
    if (related.length === 0) return;

    container.innerHTML = related.map(evt => `
      <div class="card" style="padding: 16px;">
        <span class="seal-badge seal-badge-cobalt" style="font-size: 10px; margin-bottom: 6px;">${evt.eventType}</span>
        <h4 style="font-size: 14px; margin: 0 0 4px;">
          <a href="detail.html?id=${evt.slug}" style="color: var(--color-ink-black); text-decoration: none;">${evt.title}</a>
        </h4>
        <div style="font-size: 11px; color: var(--color-ink-muted); margin-bottom: 8px;">📅 ${evt.date}</div>
        <a href="detail.html?id=${evt.slug}" style="font-size: 11px; font-weight: 700; color: var(--color-cinnabar); text-decoration: none;">
          View Session →
        </a>
      </div>
    `).join('');
  }
}

export const eventDetail = new EventDetailController();

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    eventDetail.init();
  });
}
