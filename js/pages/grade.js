/**
 * NANYANG ARTISTS SOCIETY — GRADE EXAMINATION OVERVIEW CONTROLLER
 * Authoritative integration of Chinese Calligraphy Grade Examination (Grades 1–9)
 * for Hard-Pen (硬笔书法) and Soft-Pen (软笔书法).
 */

import { getGradesByTrack, getGradeByTrackAndLevel, CHINESE_CALLIGRAPHY_GRADES } from '../data/sample/grades.js';
import { GradeExplorer } from '../modules/grade-explorer.js';
import { gradeGalleryViewer } from '../modules/grade-gallery.js';
import { GradeAnimationEngine } from '../modules/grade-animation.js';
import { i18n } from '../services/i18n.js';

export class GradeExamPage {
  constructor() {
    this.activeTrack = 'hard-pen';
    this.activeLevel = 1;
    this.explorer = null;
    this.animEngine = new GradeAnimationEngine();
    this.searchQuery = '';
  }

  init() {
    // 1. Play quick cinematic intro if applicable
    GradeAnimationEngine.playQuickIntro('grade-cinematic-intro');

    // 2. Read URL params
    const params = new URLSearchParams(window.location.search);
    const track = params.get('track');
    const level = parseInt(params.get('level') || params.get('grade'), 10);
    if (track === 'hard-pen' || track === 'soft-pen') this.activeTrack = track;
    if (level >= 1 && level <= 9) this.activeLevel = level;

    // 3. Initialize Grade Gallery Viewer Modal
    gradeGalleryViewer.init();

    // 4. Initialize Explorer (Track Switcher, 1-9 Progression, Comparator)
    this.explorer = new GradeExplorer({
      defaultTrack: this.activeTrack,
      defaultLevel: this.activeLevel,
      onTrackChange: (track, level) => {
        this.activeTrack = track;
        this.renderRoadmapStrip();
        this.renderGradeCards();
      },
      onLevelChange: (track, level) => {
        this.activeLevel = level;
        this.scrollToGradeCard(level);
      }
    });
    this.explorer.init();

    // 5. Initial Renders
    this.renderRoadmapStrip();
    this.renderGradeCards();
    this.bindSearchFilter();

    // 6. Initialize 3D card tilt and scroll reveal animations
    this.animEngine.init();

    // 7. Listen to global language change
    window.addEventListener('nas:languageChanged', () => {
      this.renderRoadmapStrip();
      this.renderGradeCards();
    });
  }

  renderRoadmapStrip() {
    const container = document.getElementById('grade-roadmap-strip');
    if (!container) return;

    const grades = getGradesByTrack(this.activeTrack);

    container.innerHTML = grades.map(g => {
      const isActive = g.grade === this.activeLevel;
      const title = i18n.getField(g, 'title') || g.title.en;

      return `
        <div class="grade-progression-node ${isActive ? 'active' : ''}" data-roadmap-level="${g.grade}" role="button" tabindex="0" aria-label="Select Grade ${g.grade}">
          <div class="grade-node-number">${g.grade}</div>
          <div class="grade-node-label">Grade ${g.grade}</div>
          <div class="grade-node-sub">${g.characterMinimum}+ Chars</div>
        </div>
      `;
    }).join('');

    // Rebind nodes
    container.querySelectorAll('.grade-progression-node').forEach(node => {
      node.addEventListener('click', () => {
        const lvl = parseInt(node.getAttribute('data-roadmap-level'), 10);
        this.explorer.setLevel(lvl);
      });
      node.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const lvl = parseInt(node.getAttribute('data-roadmap-level'), 10);
          this.explorer.setLevel(lvl);
        }
      });
    });
  }

  renderGradeCards() {
    const grid = document.getElementById('grade-cards-grid');
    if (!grid) return;

    let grades = getGradesByTrack(this.activeTrack);

    // Apply search filter if present
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      grades = grades.filter(g => 
        g.title.en.toLowerCase().includes(q) ||
        g.chineseTitle.toLowerCase().includes(q) ||
        g.task_zh.toLowerCase().includes(q) ||
        g.requiredStyles_zh.toLowerCase().includes(q) ||
        g.writingTools_zh.toLowerCase().includes(q)
      );
    }

    if (grades.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: var(--color-warm-ivory); border-radius: var(--radius-lg); border: 1px dashed var(--color-paper-border);">
          <p style="font-size: 16px; color: var(--color-ink-muted); margin: 0 0 12px;">No examination levels found matching "${this.searchQuery}".</p>
          <button type="button" class="btn btn-outline btn-sm" id="clear-grade-search">Clear Filter</button>
        </div>
      `;
      const clearBtn = document.getElementById('clear-grade-search');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          this.searchQuery = '';
          const input = document.getElementById('grade-search-input');
          if (input) input.value = '';
          this.renderGradeCards();
        });
      }
      return;
    }

    grid.innerHTML = grades.map(g => {
      const title = i18n.getField(g, 'title') || g.title.en;
      const imageCount = g.referenceImages.length;
      const primaryImage = g.referenceImages[0] || 'assets/logo/logo.png';
      const detailUrl = `grade-detail.html?track=${g.track}&level=${g.grade}`;
      const enquireUrl = `contact.html?type=enquiry&subject=${encodeURIComponent(`Grade Examination Enquiry - ${g.chineseTitle} (${g.title.en})`)}`;

      return `
        <article class="grade-card-3d" id="grade-card-${g.grade}">
          <!-- Media Plate Header -->
          <div class="grade-card-media" data-open-art="${g.id}" title="Click to inspect reference plate(s) in high resolution">
            <img src="${primaryImage}" alt="${g.chineseTitle} Reference" loading="lazy">
            <span class="plate-count-badge">
              🖼️ ${imageCount} Plate${imageCount > 1 ? 's' : ''} (Click to Zoom)
            </span>
          </div>

          <!-- Card Body -->
          <div class="grade-card-body">
            <div class="grade-card-header">
              <span class="grade-badge-level">Grade ${g.grade} · 第${g.grade}级</span>
              <span style="font-size: 11px; font-weight: 700; color: var(--color-cinnabar);">${g.durationDisplay}</span>
            </div>

            <h3 class="grade-card-title">${title}</h3>
            <div class="grade-card-title-zh">${g.chineseTitle}</div>

            <!-- Key Metrics Grid -->
            <div class="grade-specs-grid">
              <div class="grade-spec-item">
                <strong>Character Count:</strong>
                <span>${g.characterDisplay}</span>
              </div>
              <div class="grade-spec-item">
                <strong>Paper Size:</strong>
                <span>${g.paperSize_zh}</span>
              </div>
              <div class="grade-spec-item">
                <strong>Writing Tool:</strong>
                <span>${g.writingTools_zh}</span>
              </div>
              <div class="grade-spec-item">
                <strong>Required Style:</strong>
                <span>${g.requiredStyles_zh}</span>
              </div>
            </div>

            <!-- Core Task Summary -->
            <div class="grade-card-task">
              <strong>考核任务:</strong> ${g.task_zh}
            </div>

            <!-- Assessment Criteria Summary -->
            <div style="font-size: 12px; color: var(--color-ink-muted); line-height: 1.4; background: var(--color-gallery-white); padding: 8px 10px; border-radius: var(--radius-xs); border: 1px solid var(--color-paper-border); margin-bottom: 16px;">
              <strong>评判重点:</strong> ${g.criteriaSummary_zh}
            </div>

            <!-- Card Actions -->
            <div style="display: flex; gap: 8px; margin-top: auto;">
              <a href="${detailUrl}" class="btn btn-outline btn-sm" style="flex: 1; text-align: center;">
                View Syllabus (详细标准) →
              </a>
              <a href="${enquireUrl}" class="btn btn-primary btn-sm">
                Enquire
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Bind Image Clicks to Lightbox
    grid.querySelectorAll('[data-open-art]').forEach(mediaEl => {
      mediaEl.addEventListener('click', () => {
        const id = mediaEl.getAttribute('data-open-art');
        const gradeObj = CHINESE_CALLIGRAPHY_GRADES.find(item => item.id === id);
        if (gradeObj) {
          gradeGalleryViewer.open(gradeObj, 0);
        }
      });
    });

    // Re-initialize card 3D tilt on newly rendered cards
    this.animEngine.initCard3DTilt();
  }

  scrollToGradeCard(level) {
    const card = document.getElementById(`grade-card-${level}`);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.style.borderColor = 'var(--color-cinnabar)';
      setTimeout(() => {
        card.style.borderColor = '';
      }, 1500);
    }
  }

  bindSearchFilter() {
    const input = document.getElementById('grade-search-input');
    if (!input) return;

    input.addEventListener('input', (e) => {
      this.searchQuery = e.target.value;
      this.renderGradeCards();
    });
  }
}

// Auto-boot if on grade.html
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('grade-cards-grid')) {
    const app = new GradeExamPage();
    app.init();
  }
});
