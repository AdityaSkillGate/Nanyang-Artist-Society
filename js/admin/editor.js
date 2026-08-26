/**
 * NANYANG ARTISTS SOCIETY — MODULAR SECTIONED ENTITY EDITOR
 * Grouped Fieldset Forms (Zero Giant CRUD Modals) with 4-State Publishing Lifecycle.
 */

import { dataAdapter } from '../services/dataAdapter.js';

export class AdminEditorController {
  constructor() {
    this.editingEntity = null;
    this.entityType = null;
  }

  async renderCoursesModule(container) {
    const courses = await dataAdapter.getTable('Courses') || [];

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <div>
          <h3 style="font-size: 16px; margin: 0 0 4px;">🎨 Art Studio Courses & Cohort Management</h3>
          <p style="font-size: 12px; color: #6B7280; margin: 0;">Manage 9 verified courses, learning outcomes, faculty syllabi and publishing states.</p>
        </div>
        <button type="button" class="btn btn-primary btn-sm" id="admin-create-course-btn">
          ➕ Add New Course
        </button>
      </div>

      <div id="course-editor-form-area" style="display: none; margin-bottom: 28px;"></div>

      <div style="background: #FFFFFF; border: 1px solid var(--admin-border); border-radius: 8px; overflow: hidden;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="background: var(--admin-content-bg); border-bottom: 2px solid var(--admin-border); text-align: left;">
              <th style="padding: 12px 16px;">Course Code</th>
              <th style="padding: 12px 16px;">Title (EN & ZH)</th>
              <th style="padding: 12px 16px;">Category</th>
              <th style="padding: 12px 16px;">Age Group</th>
              <th style="padding: 12px 16px;">Publishing Status</th>
              <th style="padding: 12px 16px; text-align: right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${courses.map(c => `
              <tr style="border-bottom: 1px solid var(--admin-border);">
                <td style="padding: 12px 16px; font-family: monospace; color: #6B7280;">${c.id}</td>
                <td style="padding: 12px 16px;">
                  <strong>${c.title_en || c.title}</strong>
                  <div style="font-size: 11px; color: var(--admin-accent);">${c.title_zh || ''}</div>
                </td>
                <td style="padding: 12px 16px;">${c.category}</td>
                <td style="padding: 12px 16px;">${c.target_audience_en || 'All Ages'}</td>
                <td style="padding: 12px 16px;">
                  <span class="status-pill status-${c.status || 'published'}">${c.status || 'Published'}</span>
                </td>
                <td style="padding: 12px 16px; text-align: right;">
                  <button type="button" class="btn btn-outline btn-sm edit-course-btn" data-id="${c.id}" style="padding: 4px 10px; font-size: 11px;">
                    ✏️ Edit
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    const createBtn = document.getElementById('admin-create-course-btn');
    if (createBtn) {
      createBtn.addEventListener('click', () => {
        this.renderCourseForm({}, document.getElementById('course-editor-form-area'));
      });
    }

    const editBtns = container.querySelectorAll('.edit-course-btn');
    editBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const course = courses.find(c => c.id === id);
        if (course) {
          this.renderCourseForm(course, document.getElementById('course-editor-form-area'));
        }
      });
    });
  }

  renderCourseForm(course, formContainer) {
    if (!formContainer) return;
    formContainer.style.display = 'block';

    const isNew = !course.id;

    formContainer.innerHTML = `
      <form id="modular-course-form">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; background: #FFFFFF; border: 1px solid var(--admin-border); padding: 14px 20px; border-radius: 8px;">
          <h3 style="font-size: 15px; margin: 0;">
            ${isNew ? '➕ Create New Course' : `✏️ Editing Course: ${course.title_en || course.title}`}
          </h3>
          <div style="display: flex; gap: 8px;">
            <button type="button" class="btn btn-outline btn-sm" id="close-course-editor-btn">Cancel</button>
            <button type="submit" class="btn btn-primary btn-sm">💾 Save & Apply Changes</button>
          </div>
        </div>

        <!-- Section 1: Basic Information -->
        <div class="editor-section">
          <div class="editor-section-header">
            <h4 class="editor-section-title"><span>📌</span> Section 1: Basic Information</h4>
            <span style="font-size: 11px; color: #6B7280;">Core identifiers and nomenclature</span>
          </div>
          <div class="editor-section-body">
            <div class="form-grid-2">
              <div class="admin-field-group">
                <label class="admin-label">Course Title (English) *</label>
                <input type="text" class="admin-input" id="course-title-en" value="${course.title_en || course.title || ''}" required>
              </div>
              <div class="admin-field-group">
                <label class="admin-label">Course Title (Chinese / 中文) *</label>
                <input type="text" class="admin-input" id="course-title-zh" value="${course.title_zh || ''}" required>
              </div>
            </div>
            <div class="form-grid-3">
              <div class="admin-field-group">
                <label class="admin-label">Course Code / ID *</label>
                <input type="text" class="admin-input" id="course-id" value="${course.id || 'CRS-NEW-01'}" required>
              </div>
              <div class="admin-field-group">
                <label class="admin-label">Discipline Category</label>
                <select class="admin-select" id="course-category">
                  <option value="Chinese Calligraphy" ${course.category === 'Chinese Calligraphy' ? 'selected' : ''}>Chinese Calligraphy (书法)</option>
                  <option value="Chinese Painting" ${course.category === 'Chinese Painting' ? 'selected' : ''}>Chinese Painting (国画)</option>
                  <option value="Academic Sketching" ${course.category === 'Academic Sketching' ? 'selected' : ''}>Academic Sketching (素描)</option>
                  <option value="Children Art" ${course.category === 'Children Art' ? 'selected' : ''}>Children Art (少儿美术)</option>
                  <option value="Western Oil Painting" ${course.category === 'Western Oil Painting' ? 'selected' : ''}>Western Oil Painting (油画)</option>
                  <option value="Teacher Training" ${course.category === 'Teacher Training' ? 'selected' : ''}>Teacher Training (师资班)</option>
                </select>
              </div>
              <div class="admin-field-group">
                <label class="admin-label">URL Slug</label>
                <input type="text" class="admin-input" id="course-slug" value="${course.slug || ''}">
              </div>
            </div>
          </div>
        </div>

        <!-- Section 2: Learning Information -->
        <div class="editor-section">
          <div class="editor-section-header">
            <h4 class="editor-section-title"><span>🎓</span> Section 2: Learning Information & Pedagogical Syllabus</h4>
            <span style="font-size: 11px; color: #6B7280;">Age targets, skill levels, and learning milestones</span>
          </div>
          <div class="editor-section-body">
            <div class="form-grid-3">
              <div class="admin-field-group">
                <label class="admin-label">Target Audience / Age Group</label>
                <input type="text" class="admin-input" id="course-age" value="${course.target_audience_en || 'Ages 6 to Adult'}">
              </div>
              <div class="admin-field-group">
                <label class="admin-label">Skill Level</label>
                <select class="admin-select" id="course-skill-level">
                  <option value="Beginner to Intermediate">Beginner to Intermediate (初中级)</option>
                  <option value="Intermediate to Advanced">Intermediate to Advanced (中高级)</option>
                  <option value="Professional & Teacher Practicum">Professional & Teacher Practicum (专业师资认证)</option>
                </select>
              </div>
              <div class="admin-field-group">
                <label class="admin-label">Term Duration</label>
                <input type="text" class="admin-input" id="course-duration" value="${course.duration_en || '12 Lessons / Term'}">
              </div>
            </div>
            <div class="admin-field-group">
              <label class="admin-label">Key Learning Outcomes</label>
              <textarea class="admin-textarea" rows="3" id="course-outcomes">${course.learning_outcomes_en ? course.learning_outcomes_en.join('\n') : ''}</textarea>
            </div>
          </div>
        </div>

        <!-- Section 3: Media -->
        <div class="editor-section">
          <div class="editor-section-header">
            <h4 class="editor-section-title"><span>🖼️</span> Section 3: Media & Visual Assets</h4>
            <span style="font-size: 11px; color: #6B7280;">CDN hero visuals and alt text</span>
          </div>
          <div class="editor-section-body">
            <div class="form-grid-2">
              <div class="admin-field-group">
                <label class="admin-label">Hero Image CDN URL (Cloudinary / Unsplash)</label>
                <input type="url" class="admin-input" id="course-image-url" value="${course.hero_image || course.image || ''}">
              </div>
              <div class="admin-field-group">
                <label class="admin-label">Visual Alt Text</label>
                <input type="text" class="admin-input" id="course-image-alt" value="${course.title_en || ''} studio showcase">
              </div>
            </div>
          </div>
        </div>

        <!-- Section 4: SEO -->
        <div class="editor-section">
          <div class="editor-section-header">
            <h4 class="editor-section-title"><span>🔎</span> Section 4: SEO & Metadata</h4>
            <span style="font-size: 11px; color: #6B7280;">Search engine index and OpenGraph tags</span>
          </div>
          <div class="editor-section-body">
            <div class="admin-field-group">
              <label class="admin-label">SEO Meta Title</label>
              <input type="text" class="admin-input" id="course-meta-title" value="${course.title_en || ''} | Nanyang Artists Society">
            </div>
            <div class="admin-field-group">
              <label class="admin-label">SEO Meta Description</label>
              <textarea class="admin-textarea" rows="2" id="course-meta-desc">${course.tagline_en || course.description_en || ''}</textarea>
            </div>
          </div>
        </div>

        <!-- Section 5: Translations -->
        <div class="editor-section">
          <div class="editor-section-header">
            <h4 class="editor-section-title"><span>🌐</span> Section 5: Multilingual Fields (Malay & Tamil)</h4>
            <span style="font-size: 11px; color: #6B7280;">Regional official language fields</span>
          </div>
          <div class="editor-section-body">
            <div class="form-grid-2">
              <div class="admin-field-group">
                <label class="admin-label">Malay Title (title_ms)</label>
                <input type="text" class="admin-input" id="course-title-ms" value="${course.title_ms || ''}">
              </div>
              <div class="admin-field-group">
                <label class="admin-label">Tamil Title (title_ta)</label>
                <input type="text" class="admin-input" id="course-title-ta" value="${course.title_ta || ''}">
              </div>
            </div>
          </div>
        </div>

        <!-- Section 6: Publishing Lifecycle -->
        <div class="editor-section">
          <div class="editor-section-header">
            <h4 class="editor-section-title"><span>🚀</span> Section 6: Publishing State & Lifecycle</h4>
            <span style="font-size: 11px; color: #6B7280;">Workflow approval & scheduled availability</span>
          </div>
          <div class="editor-section-body">
            <div class="form-grid-2">
              <div class="admin-field-group">
                <label class="admin-label">Lifecycle Status *</label>
                <select class="admin-select" id="course-status">
                  <option value="draft" ${course.status === 'draft' ? 'selected' : ''}>Draft (草稿)</option>
                  <option value="review" ${course.status === 'review' ? 'selected' : ''}>Under Review (审核中)</option>
                  <option value="published" ${course.status === 'published' || !course.status ? 'selected' : ''}>Published (已正式发布)</option>
                  <option value="archived" ${course.status === 'archived' ? 'selected' : ''}>Archived (已归档)</option>
                </select>
              </div>
              <div class="admin-field-group">
                <label class="admin-label">Scheduled Publish Date & Time</label>
                <input type="datetime-local" class="admin-input" id="course-publish-date" value="2026-08-25T00:00">
              </div>
            </div>
          </div>
        </div>
      </form>
    `;

    const closeBtn = document.getElementById('close-course-editor-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        formContainer.style.display = 'none';
      });
    }

    const form = document.getElementById('modular-course-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Course saved successfully! Publishing status updated to active state.');
        formContainer.style.display = 'none';
      });
    }
  }

  async renderArtistsModule(container) {
    const people = await dataAdapter.getTable('People') || [];

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <div>
          <h3 style="font-size: 16px; margin: 0 0 4px;">👨‍🎨 Faculty, Masters & Leadership Profile Management</h3>
          <p style="font-size: 12px; color: #6B7280; margin: 0;">Manage Executive Board, Academic Advisors, and Certified Studio Teachers.</p>
        </div>
      </div>

      <div style="background: #FFFFFF; border: 1px solid var(--admin-border); border-radius: 8px; overflow: hidden;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="background: var(--admin-content-bg); border-bottom: 2px solid var(--admin-border); text-align: left;">
              <th style="padding: 12px 16px;">Name (EN & ZH)</th>
              <th style="padding: 12px 16px;">Role Title</th>
              <th style="padding: 12px 16px;">Category</th>
              <th style="padding: 12px 16px;">Discipline Specialty</th>
              <th style="padding: 12px 16px; text-align: right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${people.map(p => `
              <tr style="border-bottom: 1px solid var(--admin-border);">
                <td style="padding: 12px 16px;">
                  <strong>${p.name_en || p.name}</strong>
                  <div style="font-size: 11px; color: var(--admin-accent);">${p.name_zh || p.chineseName || ''}</div>
                </td>
                <td style="padding: 12px 16px;">${p.role_title_en || p.role}</td>
                <td style="padding: 12px 16px;"><span class="status-pill status-new">${p.category}</span></td>
                <td style="padding: 12px 16px; color: #6B7280;">${p.discipline_specialty || p.discipline}</td>
                <td style="padding: 12px 16px; text-align: right;">
                  <button type="button" class="btn btn-outline btn-sm" style="padding: 4px 10px; font-size: 11px;">
                    ✏️ Edit Profile
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  async renderCompetitionsModule(container) {
    const competitions = await dataAdapter.getTable('Competitions') || [];
    const winners = await dataAdapter.getTable('CompetitionWinners') || [];

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <div>
          <h3 style="font-size: 16px; margin: 0 0 4px;">⭐ Competition Editions & Laureate Hall of Fame</h3>
          <p style="font-size: 12px; color: #6B7280; margin: 0;">Manage Nanyang Star editions, age group divisions, and award allocations.</p>
        </div>
      </div>

      <div style="background: #FFFFFF; border: 1px solid var(--admin-border); border-radius: 8px; padding: 20px; margin-bottom: 20px;">
        <h4 style="font-size: 14px; margin: 0 0 12px;">Active Editions:</h4>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          ${competitions.map(comp => `
            <div style="border: 1px solid var(--admin-border); border-radius: 6px; padding: 14px 18px; background: var(--admin-content-bg); min-width: 260px;">
              <span class="status-pill status-approved" style="margin-bottom: 6px;">${comp.status || 'Active'}</span>
              <h5 style="margin: 0 0 4px; font-size: 14px;">${comp.title}</h5>
              <p style="font-size: 12px; color: #6B7280; margin: 0;">Theme: "${comp.theme || 'Open'}" (${comp.year})</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
}

export const editorController = new AdminEditorController();
