/**
 * NANYANG ARTISTS SOCIETY — INTERACTIVE COURSE FINDER CONTROLLER
 * 6-Question Guided Recommendation Engine with Transparent Rule-Based Scoring.
 */

import { dataAdapter } from './services/dataAdapter.js';

export const FINDER_QUESTIONS = [
  {
    id: "age",
    title: "1. Student Age Group",
    title_zh: "学员年龄阶段",
    subtitle: "Select the age bracket of the learner.",
    options: [
      { id: "toddler", label: "Early Childhood (Ages 3–6)", desc: "Sensory art, early motor skills & colorful discovery." },
      { id: "junior", label: "Junior Primary (Ages 7–12)", desc: "Foundational brushwork, structural sketch & creative comics." },
      { id: "teen_adult", label: "Youth & Adults (Ages 13+)", desc: "Academic fine arts, oil masterclasses & traditional ink." },
      { id: "educator", label: "Art Teachers & Educators", desc: "Professional pedagogical credentials & grading training." }
    ]
  },
  {
    id: "experience",
    title: "2. Prior Art Experience",
    title_zh: "过往美术基础",
    subtitle: "How would you describe the student's background in visual arts?",
    options: [
      { id: "beginner", label: "Complete Beginner", desc: "Little to no formal training; starting from first principles." },
      { id: "intermediate", label: "Some Studio Experience", desc: "Familiar with basic drawing tools, colors, or casual calligraphy." },
      { id: "advanced", label: "Advanced / Pre-Academy", desc: "Strong technical foundation; seeking portfolio refinement." },
      { id: "pro_teacher", label: "Practicing Art Educator", desc: "Teaching experience seeking standardized examination mastery." }
    ]
  },
  {
    id: "medium",
    title: "3. Preferred Art Medium",
    title_zh: "偏好艺术门类与材质",
    subtitle: "Which medium excites the student the most?",
    options: [
      { id: "ink", label: "Chinese Calligraphy & Ink (水墨与书法)", desc: "Traditional brushes, Xuan paper, Yan/Liu scripts & Shanshui." },
      { id: "sketch", label: "Academic Pencil & Charcoal (学院素描)", desc: "Geometric solids, chiaroscuro shading, plaster busts." },
      { id: "paint", label: "Watercolor, Gouache or Oil (水彩/油画)", desc: "Vibrant color theory, landscape vistas, canvas impasto." },
      { id: "craft", label: "Children Mixed Media & 3D Craft (少儿立体)", desc: "Storytelling, oil pastels, patented plastic origami." },
      { id: "comic", label: "Cartoon & Comic Storytelling (卡通插画)", desc: "Character design, facial expressions, marker art." },
      { id: "any", label: "Open / Explorer (全科探索)", desc: "Open to recommendation based on age and goals." }
    ]
  },
  {
    id: "goal",
    title: "4. Primary Learning Goal",
    title_zh: "核心学习目标",
    subtitle: "What is the primary motivation for taking up art studio classes?",
    options: [
      { id: "hobby", label: "Leisure & Cultural Appreciation", desc: "Cultivating aesthetic refinement and relaxation." },
      { id: "foundations", label: "Solid Foundation & Technique Mastery", desc: "Structured progression with rigorous academic feedback." },
      { id: "portfolio", label: "Art Portfolio & Competitions (DSA / Academy)", desc: "Direct school admission, art academy entry, or awards." },
      { id: "teaching", label: "Teaching Accreditation & Pedagogy", desc: "Society certified art instructor qualification." }
    ]
  },
  {
    id: "exam",
    title: "5. Interest in National Grade Examinations",
    title_zh: "全国考级意向 (1-9级)",
    subtitle: "Are you interested in sitting for Singapore National Visual Arts Grade Exams?",
    options: [
      { id: "exam_yes", label: "Yes, definitely", desc: "Aiming for standardized grade certifications (Grades 1–9)." },
      { id: "exam_maybe", label: "Maybe in the future", desc: "Focus on building skills first, exams later." },
      { id: "exam_no", label: "Not interested", desc: "Prefer non-graded purely creative exploration." }
    ]
  },
  {
    id: "competition",
    title: "6. Interest in International Competitions",
    title_zh: "国际展赛意向 (如南洋之星)",
    subtitle: "Would you like opportunities to participate in the Nanyang Star Competition?",
    options: [
      { id: "comp_yes", label: "Yes, eager to exhibit & compete", desc: "Gain international stage exposure and medal honors." },
      { id: "comp_maybe", label: "If recommended by instructor", desc: "Open to exhibition open calls when ready." },
      { id: "comp_no", label: "Personal development only", desc: "No interest in external competitive events." }
    ]
  }
];

export class CourseFinder {
  constructor() {
    this.currentStep = 0;
    this.answers = {};
    this.courses = [];
  }

  async init() {
    try {
      this.courses = await dataAdapter.getTable('Courses');
    } catch (err) {
      console.error('[CourseFinder] Failed to load courses:', err);
    }
    this.bindEvents();
    this.renderStep();
  }

  bindEvents() {
    const prevBtn = document.getElementById('finder-prev-btn');
    const nextBtn = document.getElementById('finder-next-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.prevStep());
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextStep());
    }

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      const quizActive = document.getElementById('finder-quiz-view');
      if (!quizActive || quizActive.style.display === 'none') return;

      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        const currentQ = FINDER_QUESTIONS[this.currentStep];
        if (this.answers[currentQ.id]) {
          this.nextStep();
        }
      } else if (e.key === 'ArrowLeft') {
        this.prevStep();
      }
    });
  }

  renderStep() {
    const q = FINDER_QUESTIONS[this.currentStep];
    const total = FINDER_QUESTIONS.length;

    // View toggling
    const quizView = document.getElementById('finder-quiz-view');
    const resultView = document.getElementById('finder-result-view');
    if (quizView) quizView.style.display = 'block';
    if (resultView) resultView.style.display = 'none';

    // Progress bar
    const progressFill = document.getElementById('finder-progress-fill');
    const stepCount = document.getElementById('finder-step-count');
    const pct = Math.round(((this.currentStep + 1) / total) * 100);

    if (progressFill) progressFill.style.width = `${pct}%`;
    if (stepCount) stepCount.textContent = `Question ${this.currentStep + 1} of ${total}`;

    // Question Text
    const titleEl = document.getElementById('finder-q-title');
    const subEl = document.getElementById('finder-q-sub');
    if (titleEl) titleEl.textContent = q.title;
    if (subEl) subEl.textContent = q.subtitle;

    // Options Grid
    const grid = document.getElementById('finder-options-grid');
    if (grid) {
      grid.innerHTML = q.options.map((opt, idx) => {
        const isSelected = this.answers[q.id] === opt.id;
        return `
          <button type="button" class="finder-option-card ${isSelected ? 'selected' : ''}" data-opt-id="${opt.id}" role="radio" aria-checked="${isSelected}">
            <div class="finder-option-indicator" aria-hidden="true"></div>
            <div>
              <span class="finder-option-label">${opt.label}</span>
              <p class="finder-option-desc">${opt.desc}</p>
            </div>
          </button>
        `;
      }).join('');

      // Bind Option Selection
      const cards = grid.querySelectorAll('.finder-option-card');
      cards.forEach(card => {
        card.addEventListener('click', () => {
          const optId = card.getAttribute('data-opt-id');
          this.answers[q.id] = optId;
          cards.forEach(c => {
            c.classList.remove('selected');
            c.setAttribute('aria-checked', 'false');
          });
          card.classList.add('selected');
          card.setAttribute('aria-checked', 'true');

          const nextBtn = document.getElementById('finder-next-btn');
          if (nextBtn) nextBtn.disabled = false;

          // Auto-advance after brief delay
          setTimeout(() => {
            this.nextStep();
          }, 240);
        });
      });
    }

    // Nav Buttons State
    const prevBtn = document.getElementById('finder-prev-btn');
    const nextBtn = document.getElementById('finder-next-btn');

    if (prevBtn) prevBtn.disabled = this.currentStep === 0;
    if (nextBtn) {
      nextBtn.disabled = !this.answers[q.id];
      nextBtn.textContent = this.currentStep === total - 1 ? 'See Recommendations →' : 'Next Question →';
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.renderStep();
    }
  }

  nextStep() {
    const q = FINDER_QUESTIONS[this.currentStep];
    if (!this.answers[q.id]) return;

    if (this.currentStep < FINDER_QUESTIONS.length - 1) {
      this.currentStep++;
      this.renderStep();
    } else {
      this.calculateResults();
    }
  }

  /**
   * Transparent Rule-Based Scoring Algorithm
   */
  calculateResults() {
    const scores = {};
    const whyMap = {};

    this.courses.forEach(c => {
      scores[c.id] = 0;
      whyMap[c.id] = [];
    });

    const a = this.answers;

    // Rule 1: Educator -> Teacher Training
    if (a.age === 'educator' || a.goal === 'teaching' || a.experience === 'pro_teacher') {
      scores['CRS-TCH-01'] = (scores['CRS-TCH-01'] || 0) + 100;
      whyMap['CRS-TCH-01'].push("Designed specifically for visual arts educators seeking certified pedagogical and grading qualifications.");
    }

    // Rule 2: Toddler / Ages 3-6 -> Children Intellectual Art
    if (a.age === 'toddler') {
      scores['CRS-CHD-01'] = (scores['CRS-CHD-01'] || 0) + 90;
      whyMap['CRS-CHD-01'].push("Tailored for early-childhood cognitive development, sensory art exploration, and patented 3D plastic origami.");
    }

    // Rule 3: Medium Matching
    if (a.medium === 'ink') {
      scores['CRS-CLG-01'] = (scores['CRS-CLG-01'] || 0) + 60;
      scores['CRS-CHP-01'] = (scores['CRS-CHP-01'] || 0) + 50;
      whyMap['CRS-CLG-01'].push("Matches your strong interest in Chinese soft/hard pen calligraphy and classical script mastery.");
      whyMap['CRS-CHP-01'].push("Matches your interest in traditional ink wash painting, Shanshui landscapes, and Lingnan flower-and-bird art.");
    } else if (a.medium === 'sketch') {
      scores['CRS-SKT-01'] = (scores['CRS-SKT-01'] || 0) + 70;
      whyMap['CRS-SKT-01'].push("Provides rigorous academic training in pencil proportion, shading values, and plaster cast anatomy.");
    } else if (a.medium === 'paint') {
      if (a.age === 'teen_adult' || a.experience === 'advanced') {
        scores['CRS-OIL-01'] = (scores['CRS-OIL-01'] || 0) + 65;
        whyMap['CRS-OIL-01'].push("Provides dedicated easel training in classical Grisaille, Alla Prima, and multi-layer oil glazing.");
      } else {
        scores['CRS-WTC-01'] = (scores['CRS-WTC-01'] || 0) + 60;
        whyMap['CRS-WTC-01'].push("Explores fluid transparent watercolor washes and solid gouache color dynamics.");
      }
    } else if (a.medium === 'craft') {
      scores['CRS-CHD-01'] = (scores['CRS-CHD-01'] || 0) + 60;
      whyMap['CRS-CHD-01'].push("Focuses on tactile 3D handicrafts, mixed media, and imaginative sculpture.");
    } else if (a.medium === 'comic') {
      scores['CRS-CTN-01'] = (scores['CRS-CTN-01'] || 0) + 70;
      whyMap['CRS-CTN-01'].push("Specializes in cartoon character design, facial expressions, and narrative marker illustration.");
    }

    // Rule 4: Learning Goal & Age Matching
    if (a.age === 'junior') {
      if (a.medium === 'any') {
        scores['CRS-SKT-01'] = (scores['CRS-SKT-01'] || 0) + 30;
        scores['CRS-WTC-01'] = (scores['CRS-WTC-01'] || 0) + 25;
        scores['CRS-CLG-01'] = (scores['CRS-CLG-01'] || 0) + 25;
      }
    }

    if (a.goal === 'grade_exam' || a.exam === 'exam_yes') {
      ['CRS-SKT-01', 'CRS-CLG-01', 'CRS-CHP-01', 'CRS-OIL-01'].forEach(id => {
        scores[id] = (scores[id] || 0) + 25;
        whyMap[id].push("Directly prepares candidates for National Grade Examination 1 to 9 certification.");
      });
    }

    if (a.goal === 'portfolio' || a.competition === 'comp_yes') {
      ['CRS-OIL-01', 'CRS-CHP-01', 'CRS-SKT-01'].forEach(id => {
        scores[id] = (scores[id] || 0) + 20;
        whyMap[id].push("Builds competition-ready masterworks and portfolio pieces for exhibition submission.");
      });
    }

    // Rank courses by score
    const ranked = Object.keys(scores)
      .map(id => ({
        course: this.courses.find(c => c.id === id),
        score: scores[id],
        whys: Array.from(new Set(whyMap[id]))
      }))
      .filter(item => item.course)
      .sort((a, b) => b.score - a.score);

    this.renderResults(ranked);
  }

  renderResults(ranked) {
    const quizView = document.getElementById('finder-quiz-view');
    const resultView = document.getElementById('finder-result-view');
    if (quizView) quizView.style.display = 'none';
    if (resultView) resultView.style.display = 'block';

    const top = ranked[0];
    const runners = ranked.slice(1, 3);

    // Render Primary Match
    const primaryContainer = document.getElementById('finder-primary-result');
    if (primaryContainer && top && top.course) {
      const c = top.course;
      primaryContainer.innerHTML = `
        <div class="finder-result-hero animate-fade-up">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; flex-wrap: wrap; gap: 10px;">
            <div style="display: flex; gap: 8px;">
              <span class="seal-badge seal-badge-gold">Top Recommended Match</span>
              <span class="seal-badge">${c.discipline || 'Fine Arts'}</span>
            </div>
            <span style="font-size: 13px; font-weight: 700; color: var(--color-cinnabar); background: var(--color-cinnabar-subtle); padding: 3px 10px; border-radius: var(--radius-pill);">
              Optimal Fit
            </span>
          </div>

          <h2 style="font-size: 26px; margin-bottom: 4px;">${c.title_en}</h2>
          <h3 style="font-size: 16px; color: var(--color-cinnabar); margin-bottom: 16px; font-weight: 600;">${c.title_zh || ''}</h3>

          <p style="font-size: 15px; color: var(--color-ink-charcoal); line-height: 1.6; margin-bottom: 16px;">
            ${c.description || c.shortDescription}
          </p>

          <!-- Why We Recommend This -->
          <div class="finder-why-box">
            <strong style="font-size: 13px; color: var(--color-ink-black); display: block; margin-bottom: 6px;">Why We Recommend This Course for You:</strong>
            <ul class="finder-why-list">
              ${top.whys.length > 0 ? top.whys.map(w => `<li>${w}</li>`).join('') : '<li>Comprehensive curriculum tailored to your age and learning objectives.</li>'}
            </ul>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-paper-border); padding-top: 20px; margin-top: 20px; flex-wrap: wrap; gap: 16px;">
            <div style="font-size: 13px; color: var(--color-ink-muted);">
              <strong>Level:</strong> <span style="text-transform: capitalize;">${c.skillLevel || 'All'}</span> · <strong>Duration:</strong> ${c.duration || '10–12 Weeks'}
            </div>
            <div style="display: flex; gap: 10px;">
              <a href="detail.html?id=${c.id}" class="btn btn-outline">View Full Syllabus →</a>
              <a href="../contact/index.html?course=${encodeURIComponent(c.title_en)}" class="btn btn-primary">Enquire With Secretariat</a>
            </div>
          </div>
        </div>
      `;
    }

    // Render Runner-Ups
    const secondaryContainer = document.getElementById('finder-secondary-results');
    if (secondaryContainer && runners.length > 0) {
      secondaryContainer.innerHTML = `
        <h3 style="font-size: 20px; margin-bottom: 16px;">Alternative Learning Paths You Might Like</h3>
        <div class="grid grid-cols-2" style="gap: 20px;">
          ${runners.map(r => `
            <div class="card" style="padding: 20px;">
              <span class="seal-badge" style="margin-bottom: 6px; align-self: flex-start;">${r.course.discipline}</span>
              <h4 style="font-size: 17px; margin-bottom: 2px;">${r.course.title_en}</h4>
              <p style="font-size: 13px; color: var(--color-cinnabar); font-weight: 600; margin-bottom: 8px;">${r.course.title_zh || ''}</p>
              <p style="font-size: 13px; color: var(--color-ink-muted); margin-bottom: 16px; flex-grow: 1;">${r.course.shortDescription}</p>
              <div style="display: flex; gap: 8px;">
                <a href="detail.html?id=${r.course.id}" class="btn btn-outline btn-sm" style="flex: 1;">Syllabus</a>
                <a href="../contact/index.html?course=${encodeURIComponent(r.course.title_en)}" class="btn btn-primary btn-sm">Enquire</a>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    // Bind Restart
    const restartBtn = document.getElementById('finder-restart-btn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        this.currentStep = 0;
        this.answers = {};
        this.renderStep();
      });
    }
  }
}

export const courseFinder = new CourseFinder();

// Auto-run on DOM Ready
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    courseFinder.init();
  });
}
