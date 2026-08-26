/**
 * NANYANG ARTISTS SOCIETY — INTERACTIVE COURSE FINDER QUIZ
 */

import { SEED_DATA } from '../data/seed-data.js';

export function initCourseFinder() {
  const quizForm = document.getElementById('course-finder-form');
  const resultsDiv = document.getElementById('finder-results');
  const questionsDiv = document.getElementById('finder-questions');

  if (!quizForm || !resultsDiv) return;

  quizForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const ageGroup = quizForm.elements['age'] ? quizForm.elements['age'].value : 'any';
    const interest = quizForm.elements['interest'] ? quizForm.elements['interest'].value : 'any';
    const goal = quizForm.elements['goal'] ? quizForm.elements['goal'].value : 'any';

    let matchedCourses = SEED_DATA.Courses.filter(c => {
      if (ageGroup === 'young' && c.age_min > 6) return false;
      if (ageGroup === 'youth' && (c.age_max < 6 || c.age_min > 14)) return false;
      if (ageGroup === 'adult' && c.age_max < 16) return false;
      return true;
    });

    if (matchedCourses.length === 0) {
      matchedCourses = SEED_DATA.Courses.slice(0, 3);
    }

    if (questionsDiv) questionsDiv.style.display = 'none';
    resultsDiv.style.display = 'block';

    resultsDiv.innerHTML = `
      <div style="text-align: center; margin-bottom: 32px;">
        <span class="seal-badge" style="margin-bottom: 12px;">Recommended Pathways / 智能推荐结果</span>
        <h2 style="font-size: 28px; color: var(--color-ink-black);">We Found ${matchedCourses.length} Courses Tailored to Your Profile</h2>
        <p style="color: var(--color-ink-muted);">Based on your age group, creative interest, and learning objectives.</p>
      </div>

      <div class="grid grid-cols-3" style="gap: 24px; margin-bottom: 32px;">
        ${matchedCourses.map(c => `
          <div class="card">
            <div class="card-media">
              <img src="${c.thumbnail_url}" alt="${c.title_en}">
              <span class="card-badge">Ages ${c.age_min} - ${c.age_max >= 99 ? 'Adults' : c.age_max}</span>
            </div>
            <div class="card-body">
              <h3 class="card-title">${c.title_en}</h3>
              <h4 style="font-size: 14px; color: var(--color-primary); margin-bottom: 8px;">${c.title_zh}</h4>
              <p class="card-text">${c.description_en}</p>
              <div class="card-meta">
                <span>⏱ ${c.duration_per_session}</span>
                <span>📅 ${c.schedule_days}</span>
              </div>
              <a href="../courses/detail.html?id=${c.id}" class="btn btn-primary btn-sm" style="margin-top: 16px; width: 100%;">View Course Details & Syllabus</a>
            </div>
          </div>
        `).join('')}
      </div>

      <div style="text-align: center;">
        <button type="button" id="finder-restart-btn" class="btn btn-outline">← Retake Quiz</button>
      </div>
    `;

    document.getElementById('finder-restart-btn').addEventListener('click', () => {
      resultsDiv.style.display = 'none';
      if (questionsDiv) questionsDiv.style.display = 'block';
    });
  });
}
