/**
 * NANYANG ARTISTS SOCIETY — COURSE DETAIL CONTROLLER (PHASE 7)
 * Comprehensive dynamic rendering for all 14 course sections:
 * Hero, Facts, Overview, Learning Outcomes, Syllabus Stages, Gallery, Assessment,
 * Grade Pathway, Competitions, Instructor, FAQ Accordion, Related Courses, and Enrollment Form.
 */

import { dataAdapter } from './services/dataAdapter.js';
import { showToast } from './modules/toast.js';

export class CourseDetailPage {
  constructor() {
    this.courseId = null;
    this.course = null;
    this.allCourses = [];
  }

  async init() {
    const params = new URLSearchParams(window.location.search);
    this.courseId = params.get('id') || params.get('slug');

    if (!this.courseId) {
      this.renderMissingId();
      return;
    }

    await this.loadCourseDetail();
    this.bindEnquiryForm();
  }

  async loadCourseDetail() {
    try {
      this.allCourses = await dataAdapter.getTable('Courses');
      const cleanTarget = this.courseId.toLowerCase().trim();

      this.course = this.allCourses.find(c => 
        (c.id && c.id.toLowerCase() === cleanTarget) ||
        (c.slug && c.slug.toLowerCase() === cleanTarget)
      );

      if (!this.course) {
        this.renderNotFound();
        return;
      }

      this.renderCourseData();
    } catch (err) {
      console.error('[CourseDetailPage] Error loading course detail:', err);
      this.renderError();
    }
  }

  renderCourseData() {
    const c = this.course;

    // Document Title
    document.title = `${c.title_en} (${c.title_zh || ''}) | Nanyang Artists Society`;

    // 1. Breadcrumbs
    const breadcrumbCourseTitle = document.getElementById('breadcrumb-course-title');
    if (breadcrumbCourseTitle) breadcrumbCourseTitle.textContent = c.title_en;

    // 2. Hero Elements
    const titleEl = document.getElementById('course-title');
    const titleZhEl = document.getElementById('course-title-zh');
    const discEl = document.getElementById('course-discipline');
    const levelEl = document.getElementById('course-level');
    const ageEl = document.getElementById('course-age');
    const shortDescEl = document.getElementById('course-short-desc');
    const heroImg = document.getElementById('course-hero-img');

    if (titleEl) titleEl.textContent = c.title_en;
    if (titleZhEl) titleZhEl.textContent = c.title_zh || '';
    if (discEl) discEl.textContent = c.discipline || 'Fine Arts';
    if (levelEl) levelEl.textContent = `${(c.skillLevel || 'all').toUpperCase()} LEVEL`;
    if (ageEl) ageEl.textContent = c.age_range || 'All Ages';
    if (shortDescEl) shortDescEl.textContent = c.shortDescription || c.short_summary || '';
    if (heroImg) {
      heroImg.src = c.image || c.thumbnail_url;
      heroImg.alt = `${c.title_en} Exemplary Artwork`;
    }

    // 3. Facts Bar
    const durEl = document.getElementById('course-duration');
    const schedEl = document.getElementById('course-schedule');
    const feeEl = document.getElementById('course-fee');
    const classSizeEl = document.getElementById('course-class-size');
    const assessEl = document.getElementById('course-assessment');
    const instNameEl = document.getElementById('course-instructor-name');

    if (durEl) durEl.textContent = c.duration || '10–12 Weeks per Term';
    if (schedEl) schedEl.textContent = c.schedule || 'Please enquire for term timetable';
    if (feeEl) feeEl.textContent = c.fee || 'Please contact secretariat for current term fee schedules';
    if (classSizeEl) classSizeEl.textContent = `${c.max_class_size || '8–12'} Students Max (Low Student-to-Teacher Ratio)`;
    if (assessEl) assessEl.textContent = c.assessment || 'National Examination Grade Alignment';
    if (instNameEl) instNameEl.textContent = c.instructor || 'Senior Society Faculty';

    // 4. Overview Description
    const fullDescEl = document.getElementById('course-full-description');
    if (fullDescEl) fullDescEl.textContent = c.description || c.shortDescription || '';

    // 5. Learning Outcomes List
    const outcomesList = document.getElementById('course-outcomes-list');
    if (outcomesList) {
      const outcomes = c.learningOutcomes && c.learningOutcomes.length > 0
        ? c.learningOutcomes
        : [
            "Master foundational techniques and material handling for this discipline.",
            "Develop structured composition, balance, and spatial proportion skills.",
            "Execute complete portfolio-ready masterworks on archival substrates.",
            "Prepare for national grade examination assessment and feedback."
          ];
      outcomesList.innerHTML = outcomes.map(o => `<li>${o}</li>`).join('');
    }

    // 6. Syllabus Stages (Course Structure)
    const stagesContainer = document.getElementById('course-syllabus-stages');
    if (stagesContainer) {
      const stages = c.syllabusStages && c.syllabusStages.length > 0
        ? c.syllabusStages
        : [
            { stage: "Stage 1", title: "Foundations & Material Mastery (Weeks 1–3)", desc: "Essential brush grip, line weight control, and medium handling." },
            { stage: "Stage 2", title: "Technique Depth & Composition (Weeks 4–7)", desc: "Intermediate shading, color theory, and structural exercises." },
            { stage: "Stage 3", title: "Masterpiece Creation & Exam Readiness (Weeks 8–10)", desc: "Completed final portfolio artworks and simulated test criteria." }
          ];

      stagesContainer.innerHTML = stages.map(st => `
        <div style="background: var(--color-gallery-white); border: 1px solid var(--color-paper-border); border-radius: var(--radius-md); padding: 20px 24px;">
          <span class="seal-badge ${st.stage === 'Stage 3' ? 'seal-badge-gold' : ''}" style="margin-bottom: 6px;">${st.stage}</span>
          <h4 style="font-size: 16px; margin: 4px 0 6px; color: var(--color-ink-black);">${st.title}</h4>
          <p style="font-size: 13px; color: var(--color-ink-muted); margin: 0; line-height: 1.5;">${st.desc}</p>
        </div>
      `).join('');
    }

    // 7. Gallery Grid
    const galleryGrid = document.getElementById('course-gallery-grid');
    if (galleryGrid) {
      const images = c.gallery && c.gallery.length > 0
        ? c.gallery
        : [c.image || c.thumbnail_url];

      galleryGrid.innerHTML = images.map((imgUrl, idx) => `
        <div class="gallery-tile" style="cursor: zoom-in;" onclick="window.open('${imgUrl}', '_blank')">
          <div class="tile-media">
            <img src="${imgUrl}" alt="Artwork Exemplar ${idx + 1}" onerror="this.onerror=null; this.src='../assets/logo/logo.png';">
          </div>
        </div>
      `).join('');
    }

    // 8. Grade Pathway & Competitions
    const gradePathwayEl = document.getElementById('course-grade-pathway');
    if (gradePathwayEl) {
      gradePathwayEl.textContent = c.gradePathway || 'Prepares candidates for Singapore National Grade Examination certification across progressive grade benchmarks.';
    }

    const compOppEl = document.getElementById('course-competition-opp');
    if (compOppEl) {
      compOppEl.textContent = c.competitionOpp || 'Exemplary student coursework is eligible for submission to the Nanyang Star International Children\'s Art Competition and society exhibitions.';
    }

    // 9. Instructor Profile
    const instImg = document.getElementById('course-instructor-img');
    const instTitle = document.getElementById('course-instructor-title');
    const instRole = document.getElementById('course-instructor-role');
    const instBio = document.getElementById('course-instructor-bio');

    if (instTitle) instTitle.textContent = c.instructor || 'Senior Society Faculty';
    if (instRole) instRole.textContent = 'Academic Department Head / Principal Master';
    if (instBio) instBio.textContent = `Senior certified instructor at Singapore Nanyang Artists Society with extensive exhibition and curriculum judging experience.`;

    // 10. Course-Specific FAQ Accordion
    const faqContainer = document.getElementById('course-faq-accordion');
    if (faqContainer) {
      const faqs = c.faq && c.faq.length > 0
        ? c.faq
        : [
            { q: "Are materials provided in the studio?", a: "Standard studio tools, easels, and baseline papers are provided. Students receive subsidized specialty materials." },
            { q: "Can I make up for a missed class?", a: "Yes, students may schedule up to two makeup classes per term during alternative studio session slots." },
            { q: "Is this course aligned with Grade Exams?", a: "Yes, our syllabus directly trains students in the scoring criteria of the Singapore National Visual Arts Grade Examination." }
          ];

      faqContainer.innerHTML = faqs.map((f, i) => `
        <details style="background: var(--color-gallery-white); border: 1px solid var(--color-paper-border); border-radius: var(--radius-sm); padding: 14px 18px; cursor: pointer;">
          <summary style="font-weight: 700; font-size: 14px; color: var(--color-ink-black); outline: none;">${f.q}</summary>
          <p style="font-size: 13px; color: var(--color-ink-muted); margin: 10px 0 0; line-height: 1.5;">${f.a}</p>
        </details>
      `).join('');
    }

    // 11. Related Courses Feed
    const relatedGrid = document.getElementById('course-related-grid');
    if (relatedGrid) {
      const related = this.allCourses.filter(other => 
        other.id !== c.id && (other.category === c.category || other.target_group === c.target_group)
      ).slice(0, 2);

      relatedGrid.innerHTML = related.map(rel => `
        <div class="card" style="padding: 16px;">
          <span class="seal-badge" style="margin-bottom: 6px; align-self: flex-start;">${rel.discipline}</span>
          <h4 style="font-size: 15px; margin: 0 0 2px;">${rel.title_en}</h4>
          <p style="font-size: 12px; color: var(--color-cinnabar); font-weight: 600; margin: 0 0 8px;">${rel.title_zh || ''}</p>
          <p style="font-size: 12px; color: var(--color-ink-muted); margin: 0 0 12px; line-height: 1.4;">${rel.shortDescription || rel.short_summary}</p>
          <a href="detail.html?id=${rel.id}" class="btn btn-outline btn-sm">View Syllabus →</a>
        </div>
      `).join('');
    }

    // 12. Pre-fill Enquiry Form Course Field
    const formCourseField = document.getElementById('enquiry-course-name');
    if (formCourseField) {
      formCourseField.value = `${c.title_en} (${c.title_zh || ''})`;
    }
  }

  bindEnquiryForm() {
    const form = document.getElementById('course-enquiry-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting Enquiry...';
      }

      const payload = {
        courseId: this.course ? this.course.id : this.courseId,
        courseTitle: this.course ? this.course.title_en : 'General Course Enquiry',
        studentName: document.getElementById('enquiry-name').value,
        studentAge: document.getElementById('enquiry-age').value,
        contactEmail: document.getElementById('enquiry-email').value,
        contactPhone: document.getElementById('enquiry-phone').value,
        preferredLocation: document.getElementById('enquiry-location').value,
        notes: document.getElementById('enquiry-notes').value
      };

      try {
        await dataAdapter.submit('course_enquiry', payload);
        showToast('Enquiry received! Our admissions team will contact you within 24 hours.', 'success');
        form.reset();
        if (this.course) {
          const formCourseField = document.getElementById('enquiry-course-name');
          if (formCourseField) formCourseField.value = `${this.course.title_en} (${this.course.title_zh || ''})`;
        }
      } catch (err) {
        showToast('Submission error. Please call +65 6899 0828 directly.', 'error');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Course Registration →';
        }
      }
    });
  }

  renderMissingId() {
    const main = document.getElementById('course-detail-main');
    if (main) {
      main.innerHTML = `
        <section class="section section-lg" style="text-align: center;">
          <div class="container container-narrow">
            <div style="font-size: 54px; margin-bottom: 16px;">🎨</div>
            <h1 style="font-size: 32px; margin-bottom: 12px;">Select a Studio Course</h1>
            <p style="font-size: 16px; color: var(--color-ink-muted); margin-bottom: 24px;">
              Please select an art course from our complete studio curriculum catalog.
            </p>
            <a href="index.html" class="btn btn-primary btn-lg">Browse All Art Courses →</a>
          </div>
        </section>
      `;
    }
  }

  renderNotFound() {
    const main = document.getElementById('course-detail-main');
    if (main) {
      main.innerHTML = `
        <section class="section section-lg" style="text-align: center;">
          <div class="container container-narrow">
            <div style="font-size: 54px; margin-bottom: 16px;">🔍</div>
            <h1 style="font-size: 32px; margin-bottom: 12px;">Course Not Found</h1>
            <p style="font-size: 16px; color: var(--color-ink-muted); margin-bottom: 24px;">
              The course identifier <code>${this.courseId}</code> could not be found in our registered curriculum database.
            </p>
            <div style="display: flex; gap: 12px; justify-content: center;">
              <a href="index.html" class="btn btn-primary">Browse All Courses →</a>
              <a href="finder.html" class="btn btn-outline">Take Course Quiz →</a>
            </div>
          </div>
        </section>
      `;
    }
  }

  renderError() {
    const main = document.getElementById('course-detail-main');
    if (main) {
      main.innerHTML = `
        <section class="section section-lg" style="text-align: center;">
          <div class="container container-narrow">
            <div style="font-size: 54px; margin-bottom: 16px; color: var(--color-cinnabar);">⚠️</div>
            <h1 style="font-size: 32px; margin-bottom: 12px;">Unable to Load Course Details</h1>
            <p style="font-size: 16px; color: var(--color-ink-muted); margin-bottom: 24px;">
              We encountered a network or data parsing error.
            </p>
            <button type="button" class="btn btn-primary" onclick="window.location.reload()">Retry Loading</button>
          </div>
        </section>
      `;
    }
  }
}

export const courseDetailPage = new CourseDetailPage();

// Auto-run on DOM Ready
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    courseDetailPage.init();
  });
}
