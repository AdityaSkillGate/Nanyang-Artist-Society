/**
 * NANYANG ARTISTS SOCIETY — GRADE EXAMINATION PLATFORM CONTROLLER
 * Manages the Grades 1–9 Visual Roadmap, Discipline Catalog, and Intake Registration.
 */

import { dataAdapter } from './services/dataAdapter.js';
import { i18n } from './services/i18n.js';

export class GradeExamHub {
  constructor() {
    this.disciplines = [];
    this.activeRoadmapTier = 'all';
  }

  async init() {
    try {
      this.disciplines = await dataAdapter.getTable('Disciplines');
      this.renderDisciplines();
      this.bindRoadmapInteractions();

      // Listen to Language Change Event
      window.addEventListener('nas:languageChanged', () => {
        this.renderDisciplines();
      });
    } catch (err) {
      console.error('[GradeExamHub] Failed to initialize:', err);
    }
  }

  renderDisciplines() {
    const grid = document.getElementById('disciplines-catalog-grid');
    if (!grid) return;

    if (!this.disciplines || this.disciplines.length === 0) {
      grid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--color-ink-muted);">Loading disciplines...</p>`;
      return;
    }

    grid.innerHTML = this.disciplines.map(d => {
      const title = i18n.getField(d, 'title') || d.title_en || d.title || '';
      const overview = i18n.getField(d, 'overview') || d.overview || '';
      const exploreLevelsText = `Explore Levels (1–${d.maxGrade}) →`;
      const examIntakeText = i18n.t('cta.register', 'Exam Intake');

      return `
        <div class="card" style="display: flex; flex-direction: column;">
          <div class="card-media" style="aspect-ratio: 16/9;">
            <img src="${d.image}" alt="${title}" onerror="this.onerror=null; this.src='../assets/logo/logo.png';">
            <span class="card-badge">${d.category}</span>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; flex-grow: 1;">
            <span class="seal-badge seal-badge-gold" style="margin-bottom: 6px; align-self: flex-start;">${d.gradesAvailable}</span>
            <h3 style="font-size: 18px; margin: 0 0 2px;">${title}</h3>
            ${d.title_zh ? `<h4 style="font-size: 13px; color: var(--color-cinnabar); font-weight: 600; margin: 0 0 10px;">${d.title_zh}</h4>` : ''}
            <p style="font-size: 13px; color: var(--color-ink-muted); line-height: 1.5; margin-bottom: 16px; flex-grow: 1;">
              ${overview}
            </p>

            <div style="font-size: 12px; color: var(--color-ink-charcoal); background: var(--color-warm-ivory); padding: 8px 12px; border-radius: var(--radius-xs); border: 1px solid var(--color-paper-border); margin-bottom: 16px;">
              📄 <strong>Paper Spec:</strong> ${d.paperSpecification}
            </div>

            <div style="display: flex; gap: 8px; margin-top: auto;">
              <a href="discipline.html?id=${d.id}" class="btn btn-outline btn-sm" style="flex: 1;">${exploreLevelsText}</a>
              <a href="#register-section" class="btn btn-primary btn-sm">${examIntakeText}</a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  bindRoadmapInteractions() {
    const filterPills = document.querySelectorAll('[data-roadmap-tier]');
    const nodes = document.querySelectorAll('.grade-node-item');

    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const tier = pill.getAttribute('data-roadmap-tier');
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        nodes.forEach(node => {
          const nodeTier = node.getAttribute('data-tier');
          if (tier === 'all' || nodeTier === tier) {
            node.style.display = 'flex';
          } else {
            node.style.display = 'none';
          }
        });
      });
    });
  }
}

export const gradeExamHub = new GradeExamHub();

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      gradeExamHub.init();
    });
  } else {
    gradeExamHub.init();
  }
}
