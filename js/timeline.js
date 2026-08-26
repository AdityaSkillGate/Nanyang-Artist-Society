/**
 * NANYANG ARTISTS SOCIETY — TIMELINE & ORGANIZATIONAL STORY CONTROLLER
 * Responsive Dual-Layout (Desktop Horizontal Track + Mobile Vertical Stream),
 * Strict Provenance Labeling, and Accessible Keyboard Navigation.
 */

import { dataAdapter } from './services/dataAdapter.js';

export class TimelineController {
  constructor() {
    this.milestones = [];
    this.currentIndex = 0;
  }

  async init() {
    try {
      this.milestones = await dataAdapter.getTable('Milestones');
      if (!this.milestones || this.milestones.length === 0) return;

      this.renderDesktopTrack();
      this.renderMobileStream();
      this.bindEvents();
      this.setActiveMilestone(this.milestones.length - 1); // Focus on latest by default or 0
    } catch (err) {
      console.error('[TimelineController] Init error:', err);
    }
  }

  renderDesktopTrack() {
    const track = document.getElementById('timeline-desktop-track');
    if (!track) return;

    track.innerHTML = `
      <div class="timeline-nav-progress" id="timeline-progress-bar"></div>
      ${this.milestones.map((m, idx) => `
        <button type="button" class="timeline-node-btn ${idx === this.currentIndex ? 'active' : ''}" data-timeline-index="${idx}" aria-label="Milestone ${m.year}: ${m.title}">
          <span>${m.year.toString().slice(2)}</span>
          <span class="timeline-node-year-label">${m.year}</span>
        </button>
      `).join('')}
    `;

    const nodes = track.querySelectorAll('[data-timeline-index]');
    nodes.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-timeline-index'), 10);
        this.setActiveMilestone(idx);
      });
    });
  }

  renderMobileStream() {
    const container = document.getElementById('timeline-mobile-container');
    if (!container) return;

    container.innerHTML = this.milestones.map(m => {
      const isPending = m.sourceStatus === 'client_verification_pending';

      return `
        <div class="timeline-mobile-card-wrapper">
          <div class="card" style="padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; flex-wrap: wrap; gap: 6px;">
              <span style="font-size: 18px; font-weight: 800; color: var(--color-gold);">${m.year}</span>
              <span class="rel-badge ${isPending ? 'rel-badge-pending' : 'rel-badge-partner'}" style="font-size: 10px;">
                ${isPending ? 'Collaboration Record (待确认)' : 'Verified Landmark (官方)'}
              </span>
            </div>

            <img src="${m.image}" alt="${m.title}" style="width: 100%; height: 160px; object-fit: cover; border-radius: var(--radius-xs); margin-bottom: 12px;" onerror="this.onerror=null; this.src='../assets/logo/logo.png';">

            <h3 style="font-size: 16px; margin: 0 0 2px;">${m.title}</h3>
            <h4 style="font-size: 12px; color: var(--color-cinnabar); font-weight: 600; margin: 0 0 10px;">${m.title_zh}</h4>

            <p style="font-size: 12px; color: var(--color-ink-charcoal); line-height: 1.5; margin: 0 0 12px;">
              ${m.description}
            </p>

            <div style="font-size: 11px; color: var(--color-cobalt); font-weight: 600;">
              🏛️ Related: ${m.relatedOrganization}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  setActiveMilestone(index) {
    if (index < 0 || index >= this.milestones.length) return;
    this.currentIndex = index;

    const m = this.milestones[index];
    const isPending = m.sourceStatus === 'client_verification_pending';

    // Update Progress Bar
    const progressBar = document.getElementById('timeline-progress-bar');
    if (progressBar) {
      const pct = (index / (this.milestones.length - 1)) * 100;
      progressBar.style.width = `calc(${pct}% * 0.9 + 10px)`;
    }

    // Update Node Buttons
    const nodes = document.querySelectorAll('.timeline-node-btn');
    nodes.forEach((btn, idx) => {
      btn.classList.toggle('active', idx === index);
    });

    // Update Spotlight Card
    const spotlight = document.getElementById('timeline-spotlight-card');
    if (spotlight) {
      spotlight.innerHTML = `
        <div style="display: grid; grid-template-columns: 1.1fr 1fr; gap: 32px; align-items: center;">
          <div style="position: relative; border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-card);">
            <img src="${m.image}" alt="${m.title}" style="width: 100%; height: 320px; object-fit: cover;" onerror="this.onerror=null; this.src='../assets/logo/logo.png';">
            <span style="position: absolute; bottom: 12px; left: 12px; background: rgba(18, 19, 22, 0.9); color: #FFFFFF; font-size: 20px; font-weight: 800; padding: 4px 12px; border-radius: 4px; border: 1px solid var(--color-gold);">
              ${m.year}
            </span>
          </div>

          <div>
            <div style="display: flex; gap: 8px; margin-bottom: 12px; align-items: center; flex-wrap: wrap;">
              <span class="rel-badge ${isPending ? 'rel-badge-pending' : 'rel-badge-partner'}">
                ${m.statusLabel}
              </span>
              <span style="font-size: 11px; color: var(--color-ink-muted);">
                Milestone ${index + 1} of ${this.milestones.length}
              </span>
            </div>

            <h2 style="font-size: 22px; margin: 0 0 4px;">${m.title}</h2>
            <h3 style="font-size: 14px; color: var(--color-cinnabar); font-weight: 600; margin: 0 0 14px;">${m.title_zh}</h3>

            <p style="font-size: 13px; color: var(--color-ink-charcoal); line-height: 1.6; margin: 0 0 16px;">
              ${m.description}
            </p>

            <div style="background: var(--color-warm-ivory); border-radius: var(--radius-xs); padding: 12px; font-size: 12px; color: var(--color-ink-charcoal); line-height: 1.5; margin-bottom: 20px; border: 1px solid var(--color-paper-border);">
              <p style="margin: 0 0 4px;">🏛️ <strong>Related Institution / Programme:</strong> ${m.relatedOrganization}</p>
              <p style="margin: 0; color: var(--color-ink-muted); font-size: 11px;">
                ${isPending ? '⚠️ Historical collaborative background from supplied materials; pending final client confirmation.' : '✓ Formally verified Singapore Nanyang Artists Society institutional record.'}
              </p>
            </div>

            <div style="display: flex; gap: 10px;">
              <button type="button" class="btn btn-outline btn-sm" id="timeline-prev-btn" ${index === 0 ? 'disabled style="opacity: 0.5;"' : ''}>
                ← Previous Year
              </button>
              <button type="button" class="btn btn-primary btn-sm" id="timeline-next-btn" ${index === this.milestones.length - 1 ? 'disabled style="opacity: 0.5;"' : ''}>
                Next Milestone →
              </button>
            </div>
          </div>
        </div>
      `;

      const prevBtn = document.getElementById('timeline-prev-btn');
      const nextBtn = document.getElementById('timeline-next-btn');

      if (prevBtn) prevBtn.addEventListener('click', () => this.setActiveMilestone(this.currentIndex - 1));
      if (nextBtn) nextBtn.addEventListener('click', () => this.setActiveMilestone(this.currentIndex + 1));
    }
  }

  bindEvents() {
    document.addEventListener('keydown', (e) => {
      // Ignore if user is typing in an input
      if (['input', 'textarea', 'select'].includes(document.activeElement.tagName.toLowerCase())) return;

      if (e.key === 'ArrowLeft') {
        this.setActiveMilestone(this.currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        this.setActiveMilestone(this.currentIndex + 1);
      } else if (e.key === 'Home') {
        this.setActiveMilestone(0);
      } else if (e.key === 'End') {
        this.setActiveMilestone(this.milestones.length - 1);
      }
    });
  }
}

export const timelineController = new TimelineController();

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    timelineController.init();
  });
}
