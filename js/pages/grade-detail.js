/**
 * NANYANG ARTISTS SOCIETY — GRADE LEVEL DETAIL CONTROLLER
 * Dynamically renders the comprehensive syllabus, assessment rubrics,
 * and multi-image reference plates for any specific grade level (1–9).
 */

import { getGradeByTrackAndLevel, getGradesByTrack, CHINESE_CALLIGRAPHY_GRADES } from '../data/sample/grades.js';
import { gradeGalleryViewer } from '../modules/grade-gallery.js';
import { GradeAnimationEngine } from '../modules/grade-animation.js';
import { i18n } from '../services/i18n.js';

export class GradeDetailPage {
  constructor() {
    this.track = 'hard-pen';
    this.level = 1;
    this.gradeData = null;
    this.animEngine = new GradeAnimationEngine();
  }

  init() {
    this.parseURL();
    gradeGalleryViewer.init();
    this.loadData();
    this.render();
    this.animEngine.init();

    window.addEventListener('nas:languageChanged', () => {
      this.render();
    });
  }

  parseURL() {
    const params = new URLSearchParams(window.location.search);
    let track = params.get('track');
    let level = parseInt(params.get('level') || params.get('grade'), 10);
    const id = params.get('id');

    // Compatibility check for legacy ?id=DISC-CLG&grade=3 or ?id=GRADE-HP-05
    if (id) {
      if (id.includes('HP') || id.includes('hard')) track = 'hard-pen';
      else if (id.includes('SP') || id.includes('soft')) track = 'soft-pen';
    }

    this.track = (track === 'soft-pen') ? 'soft-pen' : 'hard-pen';
    this.level = (level >= 1 && level <= 9) ? level : 1;
  }

  loadData() {
    this.gradeData = getGradeByTrackAndLevel(this.track, this.level);
    if (!this.gradeData) {
      this.gradeData = CHINESE_CALLIGRAPHY_GRADES[0];
      this.track = this.gradeData.track;
      this.level = this.gradeData.grade;
    }
  }

  render() {
    const g = this.gradeData;
    if (!g) return;

    // Document Title
    document.title = `${g.chineseTitle} (${g.title.en}) | Singapore Nanyang Artists Society`;

    // Breadcrumb
    const bcTrack = document.getElementById('bc-track-title');
    const bcLevel = document.getElementById('bc-level-title');
    if (bcTrack) bcTrack.textContent = g.trackName.en;
    if (bcLevel) bcLevel.textContent = `Grade ${g.grade}`;

    // Hero Section
    const heroTrackBadge = document.getElementById('hero-track-badge');
    const heroGradeTitle = document.getElementById('hero-grade-title');
    const heroGradeTitleZh = document.getElementById('hero-grade-title-zh');
    const heroOverview = document.getElementById('hero-overview');

    if (heroTrackBadge) heroTrackBadge.textContent = `${g.trackName.zh} · ${g.trackName.en}`;
    if (heroGradeTitle) heroGradeTitle.textContent = `${g.title.en} Examination Syllabus`;
    if (heroGradeTitleZh) heroGradeTitleZh.textContent = `${g.chineseTitle} 考核标准规范`;
    if (heroOverview) heroOverview.textContent = g.overview;

    // Top Summary Metric Cards
    const metricChars = document.getElementById('metric-character-count');
    const metricDuration = document.getElementById('metric-duration');
    const metricPaper = document.getElementById('metric-paper');
    const metricTool = document.getElementById('metric-tool');

    if (metricChars) metricChars.textContent = g.characterDisplay;
    if (metricDuration) metricDuration.textContent = g.durationDisplay;
    if (metricPaper) metricPaper.textContent = `${g.paperSize_zh} (${g.paperSize})`;
    if (metricTool) metricTool.textContent = `${g.writingTools_zh}`;

    // Core Examination Task & Requirements
    const taskContent = document.getElementById('exam-task-content');
    if (taskContent) {
      taskContent.innerHTML = `
        <div style="background: var(--color-warm-ivory); border-left: 4px solid var(--color-cinnabar); padding: 16px 20px; border-radius: var(--radius-sm); margin-bottom: 20px;">
          <h4 style="font-size: 15px; margin: 0 0 6px; color: var(--color-cinnabar);">官方考核任务 (Official Task Specification):</h4>
          <p style="font-size: 16px; font-weight: 600; color: var(--color-ink-black); margin: 0 0 10px; line-height: 1.6;">${g.task_zh}</p>
          <p style="font-size: 14px; color: var(--color-ink-muted); margin: 0; line-height: 1.5;">${g.task}</p>
        </div>
      `;
    }

    // Assessment Criteria Breakdown (笔画, 结体, 章法)
    const criteriaContent = document.getElementById('exam-criteria-content');
    if (criteriaContent) {
      criteriaContent.innerHTML = `
        <div class="grid grid-cols-3" style="gap: 16px; margin-bottom: 24px;">
          <div class="card" style="padding: 16px; border-top: 3px solid var(--color-cinnabar);">
            <div style="font-size: 12px; font-weight: 800; color: var(--color-cinnabar); margin-bottom: 6px;">1. 笔画 (Strokes)</div>
            <p style="font-size: 13px; color: var(--color-ink-charcoal); line-height: 1.5; margin: 0;">
              ${g.assessmentCriteria.strokes || g.criteriaSummary_zh}
            </p>
          </div>
          <div class="card" style="padding: 16px; border-top: 3px solid var(--color-gold);">
            <div style="font-size: 12px; font-weight: 800; color: var(--color-gold); margin-bottom: 6px;">2. 结体 (Structure)</div>
            <p style="font-size: 13px; color: var(--color-ink-charcoal); line-height: 1.5; margin: 0;">
              ${g.assessmentCriteria.structure || g.criteriaSummary_zh}
            </p>
          </div>
          <div class="card" style="padding: 16px; border-top: 3px solid var(--color-cobalt);">
            <div style="font-size: 12px; font-weight: 800; color: var(--color-cobalt); margin-bottom: 6px;">3. 章法 (Composition)</div>
            <p style="font-size: 13px; color: var(--color-ink-charcoal); line-height: 1.5; margin: 0;">
              ${g.assessmentCriteria.layout || g.criteriaSummary_zh}
            </p>
          </div>
        </div>
      `;
    }

    // Expected Writing Level Standard (写字水平)
    const skillContent = document.getElementById('exam-skill-content');
    if (skillContent) {
      skillContent.innerHTML = `
        <div style="background: var(--color-gallery-white); border: 1px solid var(--color-paper-border); padding: 18px 20px; border-radius: var(--radius-md); margin-bottom: 32px;">
          <h4 style="font-size: 14px; margin: 0 0 8px; color: var(--color-ink-black);">写字水平考核评定标准 (Skill Mastery Benchmarking):</h4>
          <p style="font-size: 14px; color: var(--color-ink-charcoal); line-height: 1.6; margin: 0 0 8px;">
            ${g.skillDescription_zh}
          </p>
          <p style="font-size: 13px; color: var(--color-ink-muted); line-height: 1.5; margin: 0;">
            ${g.skillDescription}
          </p>
        </div>
      `;
    }

    // Multi-Image Reference Plates Showcase
    this.renderArtworkReferenceSection(g);

    // Connected Previous / Next Grade Navigation
    this.renderConnectedNav(g);

    // Registration / Enquiry CTA URL
    const ctaBtn = document.getElementById('grade-enquiry-cta');
    if (ctaBtn) {
      ctaBtn.href = `contact.html?type=enquiry&subject=${encodeURIComponent(`Grade ${g.grade} Calligraphy Examination Enquiry (${g.chineseTitle})`)}`;
    }
  }

  renderArtworkReferenceSection(g) {
    const container = document.getElementById('grade-artworks-container');
    if (!container) return;

    const count = g.referenceImages.length;

    container.innerHTML = `
      <div style="margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <div>
          <h3 style="font-size: 20px; margin: 0 0 4px;">Exemplary Reference Plates (官方范本参考作品)</h3>
          <p style="font-size: 13px; color: var(--color-ink-muted); margin: 0;">
            ${count > 1 ? `Grade ${g.grade} includes ${count} authentic reference plates demonstrating required models and compositions.` : `Official reference plate illustrating standard stroke execution for Grade ${g.grade}.`}
          </p>
        </div>
        <button type="button" class="btn btn-outline btn-sm" id="btn-inspect-lightbox">
          🔍 Inspect High-Res Zoom (全屏放大鉴赏)
        </button>
      </div>

      <div class="grid ${count > 1 ? 'grid-cols-2' : 'grid-cols-1'}" style="gap: 20px; margin-bottom: 24px;">
        ${g.artworks.map((art, idx) => `
          <div class="card grade-artwork-card" style="padding: 16px; background: #18181B; color: #FFFFFF; border-radius: var(--radius-md); cursor: pointer;" data-open-plate="${idx}">
            <div style="aspect-ratio: 4/3; display: flex; align-items: center; justify-content: center; overflow: hidden; background: #09090B; border-radius: var(--radius-sm); margin-bottom: 12px;">
              <img src="${art.image}" alt="${art.title_zh}" style="max-width: 100%; max-height: 100%; object-fit: contain; transition: transform 0.3s ease;">
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <span class="badge" style="background: var(--color-cinnabar); color: #fff; font-size: 11px;">Plate ${art.plate} of ${count}</span>
              <span style="font-size: 12px; color: #9CA3AF;">Click to Zoom</span>
            </div>
            <h4 style="font-size: 15px; margin: 0 0 4px; color: #FFFFFF;">${art.title_zh}</h4>
            <p style="font-size: 12px; color: #D1D5DB; margin: 0; line-height: 1.4;">${art.description}</p>
          </div>
        `).join('')}
      </div>
    `;

    // Bind Lightbox Triggers
    const openLightbox = (index = 0) => {
      gradeGalleryViewer.open(g, index);
    };

    const inspectBtn = document.getElementById('btn-inspect-lightbox');
    if (inspectBtn) inspectBtn.addEventListener('click', () => openLightbox(0));

    container.querySelectorAll('[data-open-plate]').forEach(card => {
      card.addEventListener('click', () => {
        const plateIndex = parseInt(card.getAttribute('data-open-plate'), 10) || 0;
        openLightbox(plateIndex);
      });
    });
  }

  renderConnectedNav(g) {
    const navContainer = document.getElementById('grade-connected-nav');
    if (!navContainer) return;

    const prevLevel = g.grade > 1 ? g.grade - 1 : null;
    const nextLevel = g.grade < 9 ? g.grade + 1 : null;

    navContainer.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; gap: 16px; margin: 40px 0 20px; padding-top: 24px; border-top: 1px solid var(--color-paper-border); flex-wrap: wrap;">
        ${prevLevel ? `
          <a href="grade-detail.html?track=${g.track}&level=${prevLevel}" class="btn btn-outline" style="display: flex; align-items: center; gap: 8px;">
            ← Previous: Grade ${prevLevel} (第${prevLevel}级)
          </a>
        ` : `<div></div>`}

        <div style="text-align: center;">
          <span style="font-size: 12px; color: var(--color-ink-muted); text-transform: uppercase; letter-spacing: 1px; display: block;">Current Level</span>
          <strong style="font-size: 16px; color: var(--color-cinnabar);">${g.chineseTitle}</strong>
        </div>

        ${nextLevel ? `
          <a href="grade-detail.html?track=${g.track}&level=${nextLevel}" class="btn btn-outline" style="display: flex; align-items: center; gap: 8px;">
            Next: Grade ${nextLevel} (第${nextLevel}级) →
          </a>
        ` : `<div></div>`}
      </div>
    `;
  }
}

// Boot if on grade-detail.html
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('metric-character-count')) {
    const app = new GradeDetailPage();
    app.init();
  }
});
