/**
 * NANYANG ARTISTS SOCIETY — DISCIPLINE & GRADE LEVEL DETAIL CONTROLLER
 * Dynamically loads discipline specifications and grade level rubrics by URL parameters.
 */

import { dataAdapter } from './services/dataAdapter.js';

export class GradeDetailController {
  constructor() {
    this.disciplines = [];
    this.gradeLevels = [];
  }

  async init() {
    const params = new URLSearchParams(window.location.search);
    let discParam = params.get('id') || params.get('discipline') || params.get('track') || 'DISC-CLG';
    if (discParam === 'hard-pen' || discParam === 'soft-pen') {
      discParam = 'DISC-CLG';
    }
    const gradeParam = parseInt(params.get('grade') || params.get('level'), 10);

    try {
      this.disciplines = await dataAdapter.getTable('Disciplines');
      this.gradeLevels = await dataAdapter.getTable('GradeLevels');

      if (window.location.pathname.includes('grade-detail.html')) {
        if (gradeParam) {
          this.renderGradeLevelView(discParam, gradeParam);
        } else {
          this.renderDisciplineView(discParam);
        }
      } else if (window.location.pathname.includes('discipline.html')) {
        this.renderDisciplineView(discParam);
      } else {
        this.renderGradeLevelView(discParam, gradeParam);
      }
    } catch (err) {
      console.error('[GradeDetailController] Init error:', err);
    }
  }

  renderDisciplineView(discParam) {
    const cleanTarget = discParam.toLowerCase();
    const disc = this.disciplines.find(d => 
      d.id.toLowerCase() === cleanTarget || d.slug.toLowerCase() === cleanTarget
    ) || this.disciplines[0];

    if (!disc) return;

    // Document Title
    document.title = `${disc.title_en} Grade Syllabus | Nanyang Artists Society`;

    // Breadcrumb
    const breadcrumbTitle = document.getElementById('breadcrumb-discipline-title');
    if (breadcrumbTitle) breadcrumbTitle.textContent = disc.title_en;

    // Header elements
    const titleEl = document.getElementById('disc-title');
    const titleZhEl = document.getElementById('disc-title-zh');
    const catEl = document.getElementById('disc-category');
    const gradesAvailEl = document.getElementById('disc-grades-avail');
    const overviewEl = document.getElementById('disc-overview');
    const paperSpecEl = document.getElementById('disc-paper-spec');
    const toolsSpecEl = document.getElementById('disc-tools-spec');

    if (titleEl) titleEl.textContent = disc.title_en;
    if (titleZhEl) titleZhEl.textContent = disc.title_zh;
    if (catEl) catEl.textContent = disc.category;
    if (gradesAvailEl) gradesAvailEl.textContent = disc.gradesAvailable;
    if (overviewEl) overviewEl.textContent = disc.overview;
    if (paperSpecEl) paperSpecEl.textContent = disc.paperSpecification;
    if (toolsSpecEl) toolsSpecEl.textContent = disc.toolsSpecification;

    // Render Grades 1 to Max Level Grid
    const levelsGrid = document.getElementById('disc-levels-grid');
    if (levelsGrid) {
      const isRoot = !window.location.pathname.includes('/grade-examination/');
      const linkPrefix = isRoot ? 'grade-detail.html' : 'grade.html';

      const levels = [];
      for (let g = 1; g <= disc.maxGrade; g++) {
        const found = this.gradeLevels.find(gl => gl.discipline_id === disc.id && gl.grade === g);
        levels.push(found || {
          discipline_id: disc.id,
          grade: g,
          title: `Grade ${g} Standardized Examination`,
          title_zh: `第${g}级考核标准`,
          tier: g <= 3 ? 'Foundation (初阶)' : (g <= 6 ? 'Intermediate (中阶)' : 'Advanced (高阶)'),
          overview: `Standardized examination testing Grade ${g} proficiency in ${disc.title_en}.`
        });
      }

      levelsGrid.innerHTML = levels.map(lvl => `
        <div class="card" style="padding: 20px; display: flex; flex-direction: column;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span class="seal-badge ${lvl.grade >= 7 ? 'seal-badge-gold' : ''}">Grade ${lvl.grade} (第${lvl.grade}级)</span>
            <span style="font-size: 11px; font-weight: 700; color: var(--color-ink-muted);">${lvl.tier}</span>
          </div>
          <h4 style="font-size: 16px; margin: 0 0 2px;">${lvl.title}</h4>
          <h5 style="font-size: 12px; color: var(--color-cinnabar); font-weight: 600; margin: 0 0 8px;">${lvl.title_zh || ''}</h5>
          <p style="font-size: 13px; color: var(--color-ink-muted); line-height: 1.5; margin-bottom: 16px; flex-grow: 1;">
            ${lvl.overview}
          </p>
          <a href="${linkPrefix}?id=${disc.id}&grade=${lvl.grade}" class="btn btn-outline btn-sm">
            View Scoring Rubric & Task →
          </a>
        </div>
      `).join('');
    }
  }

  renderGradeLevelView(discParam, gradeNum) {
    const cleanTarget = (discParam || 'DISC-CLG').toLowerCase();
    const disc = this.disciplines.find(d => 
      d.id.toLowerCase() === cleanTarget || d.slug.toLowerCase() === cleanTarget
    ) || this.disciplines[0];

    const grade = gradeNum || 1;

    const matchedGrade = this.gradeLevels.find(gl => 
      gl.discipline_id === disc.id && gl.grade === grade
    ) || {
      discipline_id: disc.id,
      discipline: disc.title_en,
      grade: grade,
      tier: grade <= 3 ? 'Foundation (初阶)' : (grade <= 6 ? 'Intermediate (中阶)' : 'Advanced (高阶)'),
      title: `Grade ${grade}: Standardized Examination Syllabus`,
      title_zh: `第${grade}级标准化考级大纲`,
      overview: `Official evaluation criteria and examination guidelines for Grade ${grade} candidates sitting for the ${disc.title_en} examination.`,
      requirements: `${grade * 20 + 40} mins · Official examination substrate · Supervised proctored trial`,
      criteria: [
        { item: "Form & Proportion (造型与比例)", weight: "35%", desc: "Accurate perspective angles and structural balance." },
        { item: "Technique & Medium (技法与媒介控制)", weight: "35%", desc: "Clean brush/pencil control and proper ink/color gradation." },
        { item: "Composition (画面构图与完整性)", weight: "30%", desc: "Harmonious page arrangement and standard signature." }
      ],
      sampleArtwork: disc.image,
      documents: `Syllabus Guide PDF (${disc.id}-G${grade})`,
      examSchedule: "Summer Intake (June) / Winter Intake (November)",
      status: "active"
    };

    // Document Title
    document.title = `${matchedGrade.title} | Nanyang Artists Society`;

    // Breadcrumb
    const breadcrumbDiscipline = document.getElementById('breadcrumb-grade-disc');
    const breadcrumbGrade = document.getElementById('breadcrumb-grade-num');
    if (breadcrumbDiscipline) {
      breadcrumbDiscipline.textContent = disc.title_en;
      breadcrumbDiscipline.href = `discipline.html?id=${disc.id}`;
    }
    if (breadcrumbGrade) breadcrumbGrade.textContent = `Grade ${grade}`;

    // DOM Elements
    const titleEl = document.getElementById('grade-title');
    const titleZhEl = document.getElementById('grade-title-zh');
    const tierEl = document.getElementById('grade-tier-badge');
    const discBadgeEl = document.getElementById('grade-disc-badge');
    const overviewEl = document.getElementById('grade-overview');
    const reqEl = document.getElementById('grade-requirements');
    const scheduleEl = document.getElementById('grade-schedule');
    const sampleImg = document.getElementById('grade-sample-img');

    if (titleEl) titleEl.textContent = matchedGrade.title;
    if (titleZhEl) titleZhEl.textContent = matchedGrade.title_zh || '';
    if (tierEl) tierEl.textContent = matchedGrade.tier;
    if (discBadgeEl) discBadgeEl.textContent = disc.title_en;
    if (overviewEl) overviewEl.textContent = matchedGrade.overview;
    if (reqEl) reqEl.textContent = matchedGrade.requirements;
    if (scheduleEl) scheduleEl.textContent = matchedGrade.examSchedule;
    if (sampleImg) {
      sampleImg.src = matchedGrade.sampleArtwork || disc.image;
      sampleImg.alt = `${matchedGrade.title} Sample Benchmark Work`;
    }

    // Scoring Rubric Matrix Table
    const rubricTbody = document.getElementById('grade-rubric-tbody');
    if (rubricTbody && matchedGrade.criteria) {
      rubricTbody.innerHTML = matchedGrade.criteria.map((c, i) => `
        <tr>
          <td style="font-weight: 700; color: var(--color-ink-black);">${c.item}</td>
          <td style="font-weight: 700; color: var(--color-cinnabar);">${c.weight}</td>
          <td style="color: var(--color-ink-charcoal); line-height: 1.5;">${c.desc}</td>
        </tr>
      `).join('');
    }

    // Next / Prev Grade Navigation
    const navContainer = document.getElementById('grade-stepper-nav');
    if (navContainer) {
      const prevGrade = grade > 1 ? grade - 1 : null;
      const nextGrade = grade < disc.maxGrade ? grade + 1 : null;

      navContainer.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
          ${prevGrade ? `<a href="grade.html?discipline=${disc.id}&grade=${prevGrade}" class="btn btn-outline">← Grade ${prevGrade}</a>` : `<span></span>`}
          <a href="discipline.html?id=${disc.id}" class="btn btn-ghost">All Grades (1–${disc.maxGrade})</a>
          ${nextGrade ? `<a href="grade.html?discipline=${disc.id}&grade=${nextGrade}" class="btn btn-outline">Grade ${nextGrade} →</a>` : `<span></span>`}
        </div>
      `;
    }
  }
}

export const gradeDetailController = new GradeDetailController();

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    gradeDetailController.init();
  });
}
