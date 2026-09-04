/**
 * NANYANG ARTISTS SOCIETY — GRADE EXPLORER & COMPARISON MODULE
 * Manages:
 * - Track switching (Hard-Pen vs Soft-Pen)
 * - Grades 1–9 interactive roadmap progression
 * - Interactive Side-by-Side Grade Comparison modal (up to 3 grades)
 * - URL state synchronization
 */

import { CHINESE_CALLIGRAPHY_GRADES, getGradesByTrack, getGradeByTrackAndLevel } from '../data/sample/grades.js';

export class GradeExplorer {
  constructor(options = {}) {
    this.activeTrack = options.defaultTrack || 'hard-pen';
    this.activeLevel = options.defaultLevel || 1;
    this.onTrackChange = options.onTrackChange || (() => {});
    this.onLevelChange = options.onLevelChange || (() => {});
    this.compareModalEl = null;
  }

  init() {
    this.readURLParams();
    this.bindTrackButtons();
    this.bindRoadmapNodes();
    this.ensureCompareModalDOM();
    this.bindCompareTriggers();
  }

  readURLParams() {
    const params = new URLSearchParams(window.location.search);
    const track = params.get('track');
    const level = parseInt(params.get('level') || params.get('grade'), 10);

    if (track && (track === 'hard-pen' || track === 'soft-pen')) {
      this.activeTrack = track;
    }
    if (level && level >= 1 && level <= 9) {
      this.activeLevel = level;
    }
  }

  setTrack(newTrack, updateUrl = true) {
    if (newTrack !== 'hard-pen' && newTrack !== 'soft-pen') return;
    this.activeTrack = newTrack;

    if (updateUrl) {
      const url = new URL(window.location);
      url.searchParams.set('track', this.activeTrack);
      url.searchParams.set('level', this.activeLevel);
      window.history.replaceState({}, '', url);
    }

    this.updateTrackButtonsDOM();
    this.updateRoadmapNodesDOM();
    this.onTrackChange(this.activeTrack, this.activeLevel);
  }

  setLevel(newLevel, updateUrl = true) {
    const lvl = parseInt(newLevel, 10);
    if (lvl < 1 || lvl > 9) return;
    this.activeLevel = lvl;

    if (updateUrl) {
      const url = new URL(window.location);
      url.searchParams.set('track', this.activeTrack);
      url.searchParams.set('level', this.activeLevel);
      window.history.replaceState({}, '', url);
    }

    this.updateRoadmapNodesDOM();
    this.onLevelChange(this.activeTrack, this.activeLevel);
  }

  bindTrackButtons() {
    const trackBtns = document.querySelectorAll('[data-grade-track]');
    trackBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const track = btn.getAttribute('data-grade-track');
        this.setTrack(track);
      });
    });
    this.updateTrackButtonsDOM();
  }

  updateTrackButtonsDOM() {
    const trackBtns = document.querySelectorAll('[data-grade-track]');
    trackBtns.forEach(btn => {
      const track = btn.getAttribute('data-grade-track');
      if (track === this.activeTrack) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });
  }

  bindRoadmapNodes() {
    const nodes = document.querySelectorAll('.grade-progression-node, [data-roadmap-level]');
    nodes.forEach(node => {
      node.addEventListener('click', (e) => {
        const lvl = parseInt(node.getAttribute('data-roadmap-level'), 10);
        if (lvl) {
          this.setLevel(lvl);
        }
      });
    });
    this.updateRoadmapNodesDOM();
  }

  updateRoadmapNodesDOM() {
    const nodes = document.querySelectorAll('.grade-progression-node, [data-roadmap-level]');
    nodes.forEach(node => {
      const lvl = parseInt(node.getAttribute('data-roadmap-level'), 10);
      if (lvl === this.activeLevel) {
        node.classList.add('active');
        node.setAttribute('aria-current', 'step');
      } else {
        node.classList.remove('active');
        node.removeAttribute('aria-current');
      }
    });
  }

  /* =========================================================================
   * COMPARE GRADES INTERACTIVE TOOL
   * ========================================================================= */
  ensureCompareModalDOM() {
    if (document.getElementById('grade-compare-modal')) {
      this.compareModalEl = document.getElementById('grade-compare-modal');
      return;
    }

    const modal = document.createElement('div');
    modal.id = 'grade-compare-modal';
    modal.className = 'grade-modal-backdrop';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Compare Calligraphy Grade Standards');
    modal.style.display = 'none';

    modal.innerHTML = `
      <div class="grade-modal-container grade-compare-container">
        <div class="grade-modal-header">
          <div class="grade-modal-titles">
            <span class="grade-modal-badge">Syllabus Comparator</span>
            <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: #FFFFFF;">Compare Calligraphy Grades / 标准对比</h3>
          </div>
          <button type="button" class="grade-modal-close" id="compare-close-btn" aria-label="Close comparator">&times;</button>
        </div>

        <div class="grade-compare-body">
          <!-- Selection Toolbar -->
          <div class="grade-compare-selectors">
            <div class="compare-selector-group">
              <label for="compare-track-select">Discipline Track:</label>
              <select id="compare-track-select" class="form-select">
                <option value="hard-pen">硬笔书法 Hard-Pen Calligraphy</option>
                <option value="soft-pen">软笔书法 Soft-Pen Calligraphy</option>
              </select>
            </div>
            <div class="compare-selector-group">
              <label for="compare-level-a">First Grade:</label>
              <select id="compare-level-a" class="form-select"></select>
            </div>
            <div class="compare-selector-group">
              <label for="compare-level-b">Second Grade:</label>
              <select id="compare-level-b" class="form-select"></select>
            </div>
          </div>

          <!-- Comparison Table Output -->
          <div class="grade-compare-table-wrapper" id="grade-compare-table-root"></div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.compareModalEl = modal;

    const closeBtn = document.getElementById('compare-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeCompareModal());

    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.closeCompareModal();
    });

    document.addEventListener('keydown', (e) => {
      if (modal.style.display !== 'none' && e.key === 'Escape') {
        this.closeCompareModal();
      }
    });

    this.populateCompareSelects();
  }

  populateCompareSelects() {
    const selectA = document.getElementById('compare-level-a');
    const selectB = document.getElementById('compare-level-b');
    const trackSelect = document.getElementById('compare-track-select');

    if (!selectA || !selectB || !trackSelect) return;

    trackSelect.value = this.activeTrack;
    trackSelect.addEventListener('change', () => {
      this.renderCompareTable();
    });

    const populateLevels = () => {
      const optionsA = [];
      const optionsB = [];
      for (let i = 1; i <= 9; i++) {
        optionsA.push(`<option value="${i}">Grade ${i} (第${i}级)</option>`);
        optionsB.push(`<option value="${i}">Grade ${i} (第${i}级)</option>`);
      }
      selectA.innerHTML = optionsA.join('');
      selectB.innerHTML = optionsB.join('');
      selectA.value = Math.max(1, this.activeLevel - 1);
      selectB.value = Math.min(9, this.activeLevel);
    };

    populateLevels();

    selectA.addEventListener('change', () => this.renderCompareTable());
    selectB.addEventListener('change', () => this.renderCompareTable());
  }

  bindCompareTriggers() {
    const triggers = document.querySelectorAll('[data-open-compare]');
    triggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openCompareModal();
      });
    });
  }

  openCompareModal() {
    this.ensureCompareModalDOM();
    const trackSelect = document.getElementById('compare-track-select');
    if (trackSelect) trackSelect.value = this.activeTrack;
    this.renderCompareTable();
    this.compareModalEl.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  closeCompareModal() {
    if (!this.compareModalEl) return;
    this.compareModalEl.style.display = 'none';
    document.body.style.overflow = '';
  }

  renderCompareTable() {
    const tableRoot = document.getElementById('grade-compare-table-root');
    const trackSelect = document.getElementById('compare-track-select');
    const selectA = document.getElementById('compare-level-a');
    const selectB = document.getElementById('compare-level-b');

    if (!tableRoot || !trackSelect || !selectA || !selectB) return;

    const track = trackSelect.value;
    const lvlA = parseInt(selectA.value, 10);
    const lvlB = parseInt(selectB.value, 10);

    const gradeA = getGradeByTrackAndLevel(track, lvlA);
    const gradeB = getGradeByTrackAndLevel(track, lvlB);

    if (!gradeA || !gradeB) return;

    tableRoot.innerHTML = `
      <table class="grade-compare-table">
        <thead>
          <tr>
            <th style="width: 22%;">Specification</th>
            <th style="width: 39%;">${gradeA.title.en}<br><span style="color: var(--color-cinnabar);">${gradeA.chineseTitle}</span></th>
            <th style="width: 39%;">${gradeB.title.en}<br><span style="color: var(--color-cinnabar);">${gradeB.chineseTitle}</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Character Requirement</strong><br><small style="color: var(--color-ink-muted);">考核字数</small></td>
            <td><span class="compare-badge">${gradeA.characterDisplay}</span></td>
            <td><span class="compare-badge">${gradeB.characterDisplay}</span></td>
          </tr>
          <tr>
            <td><strong>Exam Duration</strong><br><small style="color: var(--color-ink-muted);">考核用时</small></td>
            <td>${gradeA.durationDisplay}</td>
            <td>${gradeB.durationDisplay}</td>
          </tr>
          <tr>
            <td><strong>Paper Specification</strong><br><small style="color: var(--color-ink-muted);">用纸规格</small></td>
            <td>${gradeA.paperSize_zh} <small>(${gradeA.paperSize})</small></td>
            <td>${gradeB.paperSize_zh} <small>(${gradeB.paperSize})</small></td>
          </tr>
          <tr>
            <td><strong>Writing Tool</strong><br><small style="color: var(--color-ink-muted);">指定工具</small></td>
            <td>${gradeA.writingTools_zh}</td>
            <td>${gradeB.writingTools_zh}</td>
          </tr>
          <tr>
            <td><strong>Required Styles</strong><br><small style="color: var(--color-ink-muted);">考核书体</small></td>
            <td>${gradeA.requiredStyles_zh}</td>
            <td>${gradeB.requiredStyles_zh}</td>
          </tr>
          <tr>
            <td><strong>Core Examination Task</strong><br><small style="color: var(--color-ink-muted);">考核任务</small></td>
            <td>${gradeA.task_zh}</td>
            <td>${gradeB.task_zh}</td>
          </tr>
          <tr>
            <td><strong>Assessment Rubric Focus</strong><br><small style="color: var(--color-ink-muted);">评判标准</small></td>
            <td>${gradeA.criteriaSummary_zh}</td>
            <td>${gradeB.criteriaSummary_zh}</td>
          </tr>
          <tr>
            <td><strong>Skill Level Standard</strong><br><small style="color: var(--color-ink-muted);">写字水平阶段</small></td>
            <td>${gradeA.skillDescription_zh}</td>
            <td>${gradeB.skillDescription_zh}</td>
          </tr>
          <tr>
            <td><strong>Reference Plates</strong><br><small style="color: var(--color-ink-muted);">范本图片</small></td>
            <td>${gradeA.referenceImages.length} Plate(s)</td>
            <td>${gradeB.referenceImages.length} Plate(s)</td>
          </tr>
        </tbody>
      </table>
    `;
  }
}
