/**
 * NANYANG ARTISTS SOCIETY — ARTWORK ASSESSMENT VIEWER
 * Interactive Grade Examination Assessment & Exemplar Comparison Tool
 */

import { SEED_DATA } from '../data/seed-data.js';

export function initAssessmentViewer() {
  const disciplineSelect = document.getElementById('viewer-discipline-select');
  const gradeSelect = document.getElementById('viewer-grade-select');
  const artworkImg = document.getElementById('viewer-artwork-img');
  const criteriaList = document.getElementById('viewer-criteria-list');
  const zoomInBtn = document.getElementById('viewer-zoom-in');
  const zoomOutBtn = document.getElementById('viewer-zoom-out');
  const resetZoomBtn = document.getElementById('viewer-zoom-reset');

  if (!disciplineSelect || !gradeSelect || !artworkImg || !criteriaList) return;

  let currentZoom = 1;

  function updateView() {
    const disciplineId = disciplineSelect.value;
    const gradeNum = parseInt(gradeSelect.value, 10);

    // Sample representative exemplars
    const exemplarImages = {
      'DISC-CLG': 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=800&q=80',
      'DISC-CHP': 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      'DISC-SKT': 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
      'DISC-CHD': 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
      'DISC-CTN': 'https://images.unsplash.com/photo-1569317002804-ab77bcf1bce4?auto=format&fit=crop&w=800&q=80',
      'DISC-WCO': 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80'
    };

    artworkImg.src = exemplarImages[disciplineId] || exemplarImages['DISC-CLG'];
    currentZoom = 1;
    artworkImg.style.transform = `scale(1)`;

    // Render Criteria
    criteriaList.innerHTML = `
      <div style="background: var(--color-paper-ivory-dark); padding: 16px; border-radius: 8px; margin-bottom: 16px;">
        <h4 style="color: var(--color-primary); font-size: 16px; margin-bottom: 6px;">Grade ${gradeNum} Assessment Standard / 考核标准</h4>
        <p style="font-size: 14px; margin: 0; color: var(--color-ink-charcoal);">
          Exam Duration: <strong>${gradeNum <= 3 ? '90 mins' : gradeNum <= 6 ? '120 mins' : '180 mins'}</strong> | Paper Spec: <strong>${disciplineId === 'DISC-CHP' || disciplineId === 'DISC-CLG' ? '4-cun 3-kai Xuan Paper' : '4-kai / 8-kai Standard'}</strong>
        </p>
      </div>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 10px; font-size: 14px;">
        <li style="display: flex; gap: 8px; align-items: flex-start;">
          <span style="color: var(--color-success); font-weight: bold;">✓</span>
          <span><strong>Composition (构图):</strong> Balanced spatial distribution, clear focal priority and subject positioning.</span>
        </li>
        <li style="display: flex; gap: 8px; align-items: flex-start;">
          <span style="color: var(--color-success); font-weight: bold;">✓</span>
          <span><strong>Structure & Proportion (造型与比例):</strong> Accurate object geometry, perspective relationships, and contour precision.</span>
        </li>
        <li style="display: flex; gap: 8px; align-items: flex-start;">
          <span style="color: var(--color-success); font-weight: bold;">✓</span>
          <span><strong>Tonal Values & Ink/Color (明暗与色彩/笔墨):</strong> Proper control of light/dark gradation, temperature harmony, and brushwork strength.</span>
        </li>
        <li style="display: flex; gap: 8px; align-items: flex-start;">
          <span style="color: var(--color-success); font-weight: bold;">✓</span>
          <span><strong>Artistic Presentation (艺术感染力):</strong> Integrity of final finish, confidence in medium handling, and appropriate signature/seal.</span>
        </li>
      </ul>
    `;
  }

  disciplineSelect.addEventListener('change', updateView);
  gradeSelect.addEventListener('change', updateView);

  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => {
      if (currentZoom < 2.5) {
        currentZoom += 0.25;
        artworkImg.style.transform = `scale(${currentZoom})`;
      }
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => {
      if (currentZoom > 0.75) {
        currentZoom -= 0.25;
        artworkImg.style.transform = `scale(${currentZoom})`;
      }
    });
  }

  if (resetZoomBtn) {
    resetZoomBtn.addEventListener('click', () => {
      currentZoom = 1;
      artworkImg.style.transform = `scale(1)`;
    });
  }

  updateView();
}
