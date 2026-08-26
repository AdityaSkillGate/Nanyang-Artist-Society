/**
 * NANYANG ARTISTS SOCIETY — INDIVIDUAL COMPETITION REGISTRATION CONTROLLER
 * 6-Step Multi-Step State Machine, Dynamic Age Category Calculation,
 * Frontend Field Validation, Anti-Spam Architecture, and Printable Registration Slip.
 */

export class CompetitionRegistrationController {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 6;
    this.formStartTime = Date.now();
    this.formData = {
      applicant_en_name: '',
      applicant_zh_name: '',
      dob: '',
      gender: '',
      school_grade: '',
      recommendation_institution: '',
      guardian_name: '',
      mobile_number: '',
      singapore_address: '',
      wechat_id: '',
      email: '',
      competition_edition: 'COMP-2026',
      competition_category: '',
      artwork_title_en: '',
      artwork_title_zh: '',
      artwork_medium: '',
      artwork_dimensions: '',
      artwork_statement: '',
      artwork_photo_data: '',
      artwork_number: '',
      application_date: new Date().toISOString().split('T')[0]
    };
  }

  init() {
    this.bindEvents();
    this.updateStepUI();
  }

  bindEvents() {
    // Navigation Buttons
    const nextBtns = document.querySelectorAll('[data-action="next-step"]');
    const prevBtns = document.querySelectorAll('[data-action="prev-step"]');
    const jumpBtns = document.querySelectorAll('[data-action="jump-step"]');

    nextBtns.forEach(btn => {
      btn.addEventListener('click', () => this.handleNextStep());
    });

    prevBtns.forEach(btn => {
      btn.addEventListener('click', () => this.goToStep(this.currentStep - 1));
    });

    jumpBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetStep = parseInt(e.currentTarget.getAttribute('data-target-step'), 10);
        if (targetStep) this.goToStep(targetStep);
      });
    });

    // DOB Change -> Auto compute Category
    const dobInput = document.getElementById('reg-dob');
    const editionSelect = document.getElementById('reg-competition-edition');

    if (dobInput) {
      dobInput.addEventListener('change', () => this.calculateAgeCategory());
    }
    if (editionSelect) {
      editionSelect.addEventListener('change', () => this.calculateAgeCategory());
    }

    // Image Upload & Preview
    const fileInput = document.getElementById('reg-artwork-file');
    const uploadZone = document.getElementById('reg-upload-zone');
    const previewContainer = document.getElementById('reg-artwork-preview-container');

    if (uploadZone && fileInput) {
      uploadZone.addEventListener('click', () => fileInput.click());
      uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = 'var(--color-cinnabar)';
      });
      uploadZone.addEventListener('dragleave', () => {
        uploadZone.style.borderColor = 'var(--color-paper-border-dark)';
      });
      uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = 'var(--color-paper-border-dark)';
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          this.handleImageFile(e.dataTransfer.files[0]);
        }
      });
    }

    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          this.handleImageFile(e.target.files[0]);
        }
      });
    }

    // Final Submission Trigger
    const submitBtn = document.getElementById('reg-submit-final-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleFinalSubmission();
      });
    }
  }

  handleImageFile(file) {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPEG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.formData.artwork_photo_data = e.target.result;
      const previewContainer = document.getElementById('reg-artwork-preview-container');
      const uploadText = document.getElementById('reg-upload-text');

      if (previewContainer) {
        previewContainer.innerHTML = `
          <div style="margin-top: 12px;">
            <img src="${e.target.result}" alt="Artwork Upload Preview" class="artwork-preview-thumb">
            <p style="font-size: 11px; color: var(--color-ink-muted); margin-top: 6px;">✓ Artwork preview loaded (${file.name})</p>
          </div>
        `;
      }
      if (uploadText) {
        uploadText.textContent = 'Click or drop to replace selected artwork image';
      }
    };
    reader.readAsDataURL(file);
  }

  calculateAgeCategory() {
    const dobInput = document.getElementById('reg-dob');
    const editionSelect = document.getElementById('reg-competition-edition');
    const catSelect = document.getElementById('reg-competition-category');
    const catBadge = document.getElementById('reg-age-badge');

    if (!dobInput || !dobInput.value) return;

    const birthDate = new Date(dobInput.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    const edition = editionSelect ? editionSelect.value : 'COMP-2026';

    let category = '';
    let categoryLabel = '';

    if (edition === 'COMP-2020') {
      // Historical 2020 Brackets (Strict Grounding)
      if (age >= 3 && age <= 5) {
        category = 'Preschooler Group: age 3–5';
        categoryLabel = 'Preschooler Group (3–5 Years · 幼儿组)';
      } else if (age >= 6 && age <= 8) {
        category = 'Children Group: age 6–8';
        categoryLabel = 'Children Group (6–8 Years · 少儿组)';
      } else if (age >= 9 && age <= 12) {
        category = 'Pre-teen Group: age 9–12';
        categoryLabel = 'Pre-teen Group (9–12 Years · 少年前期组)';
      } else {
        category = 'Open Age Exhibition';
        categoryLabel = `Age ${age} (Historical 2020 Exhibition Review)`;
      }
    } else {
      // Contemporary 2026 Framework
      if (age <= 6) {
        category = 'Division A (Preschool: age 4–6)';
        categoryLabel = 'Division A (Preschool: age 4–6 · 幼儿组)';
      } else if (age <= 9) {
        category = 'Division B (Junior Primary: age 7–9)';
        categoryLabel = 'Division B (Junior Primary: age 7–9 · 少儿初级组)';
      } else if (age <= 12) {
        category = 'Division C (Senior Primary: age 10–12)';
        categoryLabel = 'Division C (Senior Primary: age 10–12 · 少儿高级组)';
      } else {
        category = 'Division D (Youth / Secondary: age 13–16)';
        categoryLabel = 'Division D (Youth / Secondary: age 13–16 · 青年组)';
      }
    }

    this.formData.competition_category = category;

    if (catSelect) {
      catSelect.value = category;
    }
    if (catBadge) {
      catBadge.textContent = `Calculated Age: ${age} yrs → Auto Assigned: ${categoryLabel}`;
      catBadge.style.display = 'inline-block';
    }
  }

  collectStepData() {
    if (this.currentStep === 1) {
      this.formData.applicant_en_name = document.getElementById('reg-applicant-en-name')?.value.trim() || '';
      this.formData.applicant_zh_name = document.getElementById('reg-applicant-zh-name')?.value.trim() || '';
      this.formData.dob = document.getElementById('reg-dob')?.value || '';
      this.formData.gender = document.getElementById('reg-gender')?.value || '';
      this.formData.school_grade = document.getElementById('reg-school-grade')?.value.trim() || '';
      this.formData.recommendation_institution = document.getElementById('reg-recommendation-inst')?.value.trim() || '';
    } else if (this.currentStep === 2) {
      this.formData.guardian_name = document.getElementById('reg-guardian-name')?.value.trim() || '';
      this.formData.mobile_number = document.getElementById('reg-mobile-number')?.value.trim() || '';
      this.formData.singapore_address = document.getElementById('reg-singapore-address')?.value.trim() || '';
      this.formData.wechat_id = document.getElementById('reg-wechat-id')?.value.trim() || '';
      this.formData.email = document.getElementById('reg-email')?.value.trim() || '';
    } else if (this.currentStep === 3) {
      this.formData.competition_edition = document.getElementById('reg-competition-edition')?.value || 'COMP-2026';
      this.formData.competition_category = document.getElementById('reg-competition-category')?.value || '';
    } else if (this.currentStep === 4) {
      this.formData.artwork_title_en = document.getElementById('reg-artwork-title-en')?.value.trim() || '';
      this.formData.artwork_title_zh = document.getElementById('reg-artwork-title-zh')?.value.trim() || '';
      this.formData.artwork_medium = document.getElementById('reg-artwork-medium')?.value || '';
      this.formData.artwork_dimensions = document.getElementById('reg-artwork-dimensions')?.value.trim() || '';
      this.formData.artwork_statement = document.getElementById('reg-artwork-statement')?.value.trim() || '';
    }
  }

  validateCurrentStep() {
    this.collectStepData();
    let isValid = true;
    const errors = [];

    if (this.currentStep === 1) {
      if (!this.formData.applicant_en_name) errors.push('Applicant English Name is required.');
      if (!this.formData.dob) errors.push('Date of Birth is required.');
      if (!this.formData.gender) errors.push('Gender selection is required.');
    } else if (this.currentStep === 2) {
      if (!this.formData.guardian_name) errors.push('Parent / Guardian Name is required.');
      if (!this.formData.mobile_number) {
        errors.push('Contact Mobile Number is required.');
      } else if (!/^[0-9+ -]{8,18}$/.test(this.formData.mobile_number)) {
        errors.push('Please enter a valid mobile number (e.g. +65 9123 4567).');
      }
      if (this.formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email)) {
        errors.push('Please enter a valid email address.');
      }
    } else if (this.currentStep === 3) {
      if (!this.formData.competition_category) errors.push('Please select a valid Competition Category.');
    } else if (this.currentStep === 4) {
      if (!this.formData.artwork_title_en) errors.push('Artwork Title (English) is required.');
      if (!this.formData.artwork_medium) errors.push('Please specify the Artwork Medium / Discipline.');
    }

    if (errors.length > 0) {
      alert('Please resolve the following before proceeding:\n\n• ' + errors.join('\n• '));
      return false;
    }

    return true;
  }

  handleNextStep() {
    if (!this.validateCurrentStep()) return;
    this.goToStep(this.currentStep + 1);
  }

  goToStep(step) {
    if (step < 1 || step > this.totalSteps) return;
    this.currentStep = step;
    this.updateStepUI();

    if (this.currentStep === 5) {
      this.renderReviewSummary();
    }

    // Scroll smoothly to top of form
    const container = document.getElementById('reg-form-container');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  updateStepUI() {
    // Stepper indicators
    const items = document.querySelectorAll('.step-item');
    items.forEach((item, idx) => {
      const stepNum = idx + 1;
      item.classList.remove('active', 'completed');
      if (stepNum === this.currentStep) {
        item.classList.add('active');
      } else if (stepNum < this.currentStep) {
        item.classList.add('completed');
      }
    });

    // Step Panels
    const panels = document.querySelectorAll('.step-panel');
    panels.forEach(p => {
      const pNum = parseInt(p.getAttribute('data-step'), 10);
      p.classList.toggle('active', pNum === this.currentStep);
    });
  }

  renderReviewSummary() {
    this.collectStepData();
    const container = document.getElementById('reg-review-summary-container');
    if (!container) return;

    container.innerHTML = `
      <table class="review-summary-table">
        <tbody>
          <tr>
            <th colspan="2" style="font-size: 13px; font-weight: 700; color: var(--color-ink-black);">
              👤 1. Contestant Information
              <button type="button" class="btn btn-outline btn-sm" style="float: right; padding: 2px 8px; font-size: 11px;" data-action="jump-step" data-target-step="1">Edit</button>
            </th>
          </tr>
          <tr><td style="width: 35%; font-weight: 600;">Applicant Name:</td><td>${this.formData.applicant_en_name} ${this.formData.applicant_zh_name ? `(${this.formData.applicant_zh_name})` : ''}</td></tr>
          <tr><td style="font-weight: 600;">Date of Birth & Gender:</td><td>${this.formData.dob} · ${this.formData.gender}</td></tr>
          <tr><td style="font-weight: 600;">School & Grade:</td><td>${this.formData.school_grade || '—'}</td></tr>
          <tr><td style="font-weight: 600;">Recommendation Inst.:</td><td>${this.formData.recommendation_institution || 'Independent Candidate'}</td></tr>

          <tr>
            <th colspan="2" style="font-size: 13px; font-weight: 700; color: var(--color-ink-black); padding-top: 18px;">
              👨‍👩‍👧 2. Parent / Guardian Details
              <button type="button" class="btn btn-outline btn-sm" style="float: right; padding: 2px 8px; font-size: 11px;" data-action="jump-step" data-target-step="2">Edit</button>
            </th>
          </tr>
          <tr><td style="font-weight: 600;">Guardian Name:</td><td>${this.formData.guardian_name}</td></tr>
          <tr><td style="font-weight: 600;">Mobile Number:</td><td>${this.formData.mobile_number}</td></tr>
          <tr><td style="font-weight: 600;">Singapore Address:</td><td>${this.formData.singapore_address || '—'}</td></tr>
          <tr><td style="font-weight: 600;">WeChat / Email:</td><td>${this.formData.wechat_id || '—'} / ${this.formData.email || '—'}</td></tr>

          <tr>
            <th colspan="2" style="font-size: 13px; font-weight: 700; color: var(--color-ink-black); padding-top: 18px;">
              ⭐ 3. Competition Category
              <button type="button" class="btn btn-outline btn-sm" style="float: right; padding: 2px 8px; font-size: 11px;" data-action="jump-step" data-target-step="3">Edit</button>
            </th>
          </tr>
          <tr><td style="font-weight: 600;">Edition & Division:</td><td>${this.formData.competition_edition === 'COMP-2026' ? '2026 5th Nanyang Star' : '2020 Historical Edition'} — <strong>${this.formData.competition_category}</strong></td></tr>

          <tr>
            <th colspan="2" style="font-size: 13px; font-weight: 700; color: var(--color-ink-black); padding-top: 18px;">
              🎨 4. Artwork Submission
              <button type="button" class="btn btn-outline btn-sm" style="float: right; padding: 2px 8px; font-size: 11px;" data-action="jump-step" data-target-step="4">Edit</button>
            </th>
          </tr>
          <tr><td style="font-weight: 600;">Artwork Title:</td><td>${this.formData.artwork_title_en} ${this.formData.artwork_title_zh ? `(${this.formData.artwork_title_zh})` : ''}</td></tr>
          <tr><td style="font-weight: 600;">Medium & Dimensions:</td><td>${this.formData.artwork_medium} · ${this.formData.artwork_dimensions || 'Standard 4-Cut / 8-Cut'}</td></tr>
          <tr><td style="font-weight: 600;">Statement / Description:</td><td>${this.formData.artwork_statement || '—'}</td></tr>
          ${this.formData.artwork_photo_data ? `
            <tr>
              <td style="font-weight: 600;">Artwork Photo:</td>
              <td><img src="${this.formData.artwork_photo_data}" class="artwork-preview-thumb" alt="Uploaded Artwork"></td>
            </tr>
          ` : ''}
        </tbody>
      </table>
    `;

    // Re-bind dynamic jump buttons
    const jumpBtns = container.querySelectorAll('[data-action="jump-step"]');
    jumpBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetStep = parseInt(e.currentTarget.getAttribute('data-target-step'), 10);
        if (targetStep) this.goToStep(targetStep);
      });
    });
  }

  handleFinalSubmission() {
    // 1. Consent Validation
    const consent = document.getElementById('reg-consent-checkbox');
    if (!consent || !consent.checked) {
      alert('Parental / Guardian Consent and Data Protection agreement are required to submit registration.');
      return;
    }

    // 2. Anti-Spam Honeypot Check
    const honeypot = document.getElementById('reg-honeypot-website');
    if (honeypot && honeypot.value.trim() !== '') {
      console.warn('Bot submission blocked via honeypot trap.');
      return;
    }

    // 3. Timing Heuristic Check (<3s submission)
    const elapsed = Date.now() - this.formStartTime;
    if (elapsed < 3000) {
      alert('Submission completed too quickly. Please review your entries.');
      return;
    }

    // 4. Generate Unique Artwork / Registration Number
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    this.formData.artwork_number = `NAS-2026-IND-${randomSuffix}`;

    // 5. Render Step 6 Confirmation Slip
    this.renderSubmissionSlip();
    this.goToStep(6);
  }

  renderSubmissionSlip() {
    const container = document.getElementById('reg-slip-container');
    if (!container) return;

    container.innerHTML = `
      <div class="registration-slip">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; border-bottom: 2px solid var(--color-paper-border); padding-bottom: 16px; flex-wrap: wrap; gap: 12px;">
          <div>
            <span class="seal-badge seal-badge-gold" style="margin-bottom: 6px;">Official Submission Slip</span>
            <h2 style="font-size: 22px; margin: 0 0 2px;">Nanyang Star International Competition</h2>
            <h3 style="font-size: 13px; color: var(--color-cinnabar); margin: 0; font-weight: 600;">新加坡“南洋之星”国际少儿美术大赛 · 个人报名确认单</h3>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 11px; color: var(--color-ink-muted);">Registration ID:</div>
            <div style="font-size: 18px; font-weight: 800; color: var(--color-gold); font-family: monospace;">${this.formData.artwork_number}</div>
            <div style="font-size: 10px; color: var(--color-ink-muted);">${this.formData.application_date}</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; font-size: 13px;">
          <div>
            <h4 style="font-size: 14px; margin: 0 0 8px; color: var(--color-ink-black); border-bottom: 1px solid var(--color-paper-border); padding-bottom: 4px;">Contestant Information (参赛者信息)</h4>
            <p style="margin: 0 0 4px;"><strong>Name:</strong> ${this.formData.applicant_en_name} ${this.formData.applicant_zh_name ? `(${this.formData.applicant_zh_name})` : ''}</p>
            <p style="margin: 0 0 4px;"><strong>DOB & Gender:</strong> ${this.formData.dob} (${this.formData.gender})</p>
            <p style="margin: 0 0 4px;"><strong>School / Grade:</strong> ${this.formData.school_grade || '—'}</p>
            <p style="margin: 0;"><strong>Category:</strong> <span class="seal-badge seal-badge-cobalt" style="font-size: 10px;">${this.formData.competition_category}</span></p>
          </div>

          <div>
            <h4 style="font-size: 14px; margin: 0 0 8px; color: var(--color-ink-black); border-bottom: 1px solid var(--color-paper-border); padding-bottom: 4px;">Guardian & Artwork (家长与作品)</h4>
            <p style="margin: 0 0 4px;"><strong>Guardian:</strong> ${this.formData.guardian_name} (${this.formData.mobile_number})</p>
            <p style="margin: 0 0 4px;"><strong>Artwork Title:</strong> ${this.formData.artwork_title_en}</p>
            <p style="margin: 0 0 4px;"><strong>Medium:</strong> ${this.formData.artwork_medium}</p>
            <p style="margin: 0;"><strong>Status:</strong> <span class="rel-badge rel-badge-partner" style="font-size: 10px;">✓ Registered & Pending Jury Review</span></p>
          </div>
        </div>

        ${this.formData.artwork_photo_data ? `
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="${this.formData.artwork_photo_data}" class="artwork-preview-thumb" alt="Uploaded Artwork">
          </div>
        ` : ''}

        <div style="background: var(--color-warm-ivory); border: 1px solid var(--color-paper-border); border-radius: var(--radius-sm); padding: 12px 16px; font-size: 11px; color: var(--color-ink-charcoal); line-height: 1.5; margin-bottom: 24px;">
          📌 <strong>Important Instructions for Submission of Physical Artwork (如需邮寄原画):</strong><br>
          Please attach this registration voucher or write Registration ID <strong>${this.formData.artwork_number}</strong> on the back bottom-right corner of the original artwork before dispatching to: <em>Singapore Nanyang Artists Society Secretariat, Blk 135 Jurong Gateway Road #03-333, Singapore 600135</em>.
        </div>

        <div class="no-print" style="display: flex; gap: 12px; justify-content: center;">
          <button type="button" class="btn btn-primary" onclick="window.print()">
            🖨️ Print Submission Slip
          </button>
          <a href="../competitions/nanyang-star.html" class="btn btn-outline">
            Return to Competition Hub →
          </a>
        </div>
      </div>
    `;
  }
}

export const competitionRegistration = new CompetitionRegistrationController();

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    competitionRegistration.init();
  });
}
