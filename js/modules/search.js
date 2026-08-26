/**
 * NANYANG ARTISTS SOCIETY — UNIVERSAL INSTANT SEARCH MODULE
 */

import { SEED_DATA } from '../data/seed-data.js';

export function initSearch() {
  const modal = document.getElementById('search-modal');
  const triggerBtns = document.querySelectorAll('.search-trigger-btn, [data-search-trigger]');
  const input = document.getElementById('search-input');
  const resultsContainer = document.getElementById('search-results');
  const closeBtn = document.getElementById('search-modal-close');

  if (!modal || !input || !resultsContainer) return;

  function openSearch() {
    modal.classList.add('open');
    modal.style.display = 'flex';
    input.value = '';
    resultsContainer.innerHTML = `<p style="color: var(--color-ink-muted); text-align: center; padding: 24px;">Type to search courses, disciplines, test centres, or history...</p>`;
    setTimeout(() => input.focus(), 50);
  }

  function closeSearch() {
    modal.classList.remove('open');
    modal.style.display = 'none';
  }

  triggerBtns.forEach(btn => btn.addEventListener('click', openSearch));
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeSearch();
  });

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      closeSearch();
    }
  });

  input.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (!q) {
      resultsContainer.innerHTML = `<p style="color: var(--color-ink-muted); text-align: center; padding: 24px;">Type to search...</p>`;
      return;
    }

    const matches = [];

    // Search Courses
    SEED_DATA.Courses.forEach(c => {
      if (c.title_en.toLowerCase().includes(q) || c.title_zh.toLowerCase().includes(q) || c.description_en.toLowerCase().includes(q) || c.description_zh.toLowerCase().includes(q)) {
        matches.push({ type: 'Course / 课程', title: `${c.title_en} (${c.title_zh})`, link: `../courses/detail.html?id=${c.id}`, desc: c.tagline_en });
      }
    });

    // Search Grade Disciplines
    SEED_DATA.GradeDisciplines.forEach(d => {
      if (d.name_en.toLowerCase().includes(q) || d.name_zh.toLowerCase().includes(q) || d.overview_en.toLowerCase().includes(q) || d.overview_zh.toLowerCase().includes(q)) {
        matches.push({ type: 'Grade Examination / 考级', title: `${d.name_en} (${d.name_zh})`, link: `../grade-examination/discipline.html?id=${d.id}`, desc: d.overview_en });
      }
    });

    // Search Test Centres
    SEED_DATA.ExamCentres.forEach(ec => {
      if (ec.centre_name_en.toLowerCase().includes(q) || ec.centre_name_zh.toLowerCase().includes(q) || ec.address.toLowerCase().includes(q) || ec.postal_code.includes(q)) {
        matches.push({ type: 'Test Centre / 考点', title: `${ec.centre_name_en} (${ec.centre_name_zh})`, link: `../grade-examination/test-centres.html`, desc: `${ec.address} (Tel: ${ec.contact_phone})` });
      }
    });

    if (matches.length === 0) {
      resultsContainer.innerHTML = `<p style="color: var(--color-ink-muted); text-align: center; padding: 24px;">No results found for "${q}". Try searching for Calligraphy, Sketching, Jurong, or Grade 1.</p>`;
      return;
    }

    resultsContainer.innerHTML = matches.map(m => `
      <a href="${m.link}" style="display: block; padding: 12px 16px; border-bottom: 1px solid var(--color-paper-border); text-decoration: none; border-radius: 6px; margin-bottom: 4px; transition: background 0.15s ease;">
        <span style="font-size: 11px; font-weight: 700; color: var(--color-primary); text-transform: uppercase;">${m.type}</span>
        <h4 style="font-size: 15px; margin: 2px 0 4px; color: var(--color-ink-black);">${m.title}</h4>
        <p style="font-size: 13px; color: var(--color-ink-muted); margin: 0; line-height: 1.4;">${m.desc}</p>
      </a>
    `).join('');
  });
}
