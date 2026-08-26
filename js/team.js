/**
 * NANYANG ARTISTS SOCIETY — EXECUTIVE BOARD & CONSULTING TEAM CONTROLLER
 * Loads leadership profiles, governance council, and academic advisors.
 */

import { dataAdapter } from './services/dataAdapter.js';

export class TeamManager {
  constructor() {
    this.people = [];
  }

  async init() {
    try {
      this.people = await dataAdapter.getTable('People');
      this.renderExecutiveBoard();
      this.renderConsultingTeam();
    } catch (err) {
      console.error('[TeamManager] Init error:', err);
    }
  }

  renderExecutiveBoard() {
    const container = document.getElementById('team-exec-container');
    if (!container) return;

    const execMembers = this.people.filter(p => p.category === 'executive_board');

    container.innerHTML = execMembers.map(p => `
      <div class="card" style="padding: 24px; display: flex; flex-direction: column; height: 100%;">
        <div style="display: flex; gap: 20px; align-items: flex-start; margin-bottom: 16px;">
          <img src="${p.photo_url}" alt="${p.name_en}" style="width: 90px; height: 90px; border-radius: 50%; object-fit: cover; border: 2px solid var(--color-gold); flex-shrink: 0;" onerror="this.onerror=null; this.src='../assets/logo/logo.png';">
          <div>
            <span class="seal-badge seal-badge-gold" style="margin-bottom: 4px;">${p.role_type}</span>
            <h3 style="font-size: 18px; margin: 0 0 2px;">${p.name_en}</h3>
            <h4 style="font-size: 14px; color: var(--color-cinnabar); font-weight: 600; margin: 0 0 4px;">${p.name_zh}</h4>
            <p style="font-size: 12px; color: var(--color-ink-muted); margin: 0; font-weight: 600;">${p.role_title_en}</p>
            <p style="font-size: 11px; color: var(--color-ink-muted); margin: 0;">${p.role_title_zh}</p>
          </div>
        </div>

        <div style="background: var(--color-warm-ivory); border-radius: var(--radius-xs); padding: 12px; font-size: 12px; color: var(--color-ink-charcoal); line-height: 1.5; margin-bottom: 16px; border: 1px solid var(--color-paper-border);">
          <strong style="color: var(--color-ink-black); display: block; margin-bottom: 4px;">Specialization:</strong>
          ${p.discipline_specialty}
        </div>

        <p style="font-size: 13px; color: var(--color-ink-charcoal); line-height: 1.6; margin: 0 0 16px; flex-grow: 1;">
          ${p.bio_en}
        </p>

        <!-- Achievements Preview -->
        ${p.achievements && p.achievements.length > 0 ? `
          <div style="margin-bottom: 16px;">
            <span style="font-size: 11px; font-weight: 700; color: var(--color-ink-black); display: block; margin-bottom: 4px;">Key Milestones:</span>
            <ul style="margin: 0; padding-left: 16px; font-size: 11px; color: var(--color-ink-muted); line-height: 1.4;">
              ${p.achievements.slice(0, 2).map(a => `<li>${a}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        <div style="margin-top: auto; pt-3; border-top: 1px solid var(--color-paper-border); padding-top: 12px;">
          <a href="../artists/detail.html?id=${p.slug || p.id}" class="btn btn-outline btn-sm" style="width: 100%; text-align: center; font-size: 12px;">
            View Complete Profile & Masterworks →
          </a>
        </div>
      </div>
    `).join('');
  }

  renderConsultingTeam() {
    const container = document.getElementById('team-advisors-container');
    if (!container) return;

    const advisors = this.people.filter(p => p.category === 'consulting_team');

    container.innerHTML = advisors.map(p => `
      <div class="card" style="padding: 24px; display: flex; flex-direction: column;">
        <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 12px;">
          <img src="${p.photo_url}" alt="${p.name_en}" style="width: 70px; height: 70px; border-radius: 50%; object-fit: cover; border: 1px solid var(--color-paper-border);" onerror="this.onerror=null; this.src='../assets/logo/logo.png';">
          <div>
            <span class="seal-badge seal-badge-cobalt" style="margin-bottom: 2px;">Academic Consulting</span>
            <h3 style="font-size: 17px; margin: 0 0 2px;">${p.name_en}</h3>
            <h4 style="font-size: 13px; color: var(--color-cinnabar); font-weight: 600; margin: 0;">${p.name_zh}</h4>
          </div>
        </div>

        <p style="font-size: 13px; color: var(--color-ink-charcoal); line-height: 1.5; margin: 0 0 12px;">
          ${p.bio_en}
        </p>

        <div style="font-size: 12px; color: var(--color-ink-muted);">
          <strong>Focus:</strong> ${p.discipline_specialty}
        </div>
      </div>
    `).join('');
  }
}

export const teamManager = new TeamManager();

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    teamManager.init();
  });
}
