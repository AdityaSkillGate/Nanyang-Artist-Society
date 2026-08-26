/**
 * NANYANG ARTISTS SOCIETY — TEAM / INSTITUTION REGISTRATION CONTROLLER
 * Dynamic Multi-Participant Grid (01, 02...), Real-Time Group Totals Engine,
 * LocalStorage Draft Persistence, Duplicate Submission Prevention, and Printable Slip.
 */

export class GroupRegistrationController {
  constructor() {
    this.participants = [];
    this.nextId = 1;
    this.isSubmitting = false;
    this.storageKey = 'nas_team_registration_draft_v1';
  }

  init() {
    this.bindEvents();
    const hasDraft = this.loadDraft();
    if (!hasDraft) {
      // Initialize with 3 empty rows
      this.addRow();
      this.addRow();
      this.addRow();
    }
  }

  bindEvents() {
    // Add Row Buttons
    const addOneBtn = document.getElementById('team-add-row-btn');
    const addFiveBtn = document.getElementById('team-add-five-btn');
    const sampleBtn = document.getElementById('team-sample-data-btn');
    const saveDraftBtn = document.getElementById('team-save-draft-btn');
    const clearDraftBtn = document.getElementById('team-clear-draft-btn');
    const reviewBtn = document.getElementById('team-review-submit-btn');

    if (addOneBtn) addOneBtn.addEventListener('click', () => this.addRow());
    if (addFiveBtn) {
      addFiveBtn.addEventListener('click', () => {
        for (let i = 0; i < 5; i++) this.addRow();
      });
    }
    if (sampleBtn) sampleBtn.addEventListener('click', () => this.populateSampleData());
    if (saveDraftBtn) saveDraftBtn.addEventListener('click', () => this.saveDraft(true));
    if (clearDraftBtn) clearDraftBtn.addEventListener('click', () => this.clearDraft());
    if (reviewBtn) reviewBtn.addEventListener('click', () => this.openReviewModal());

    // Auto-save on form inputs
    const orgInputs = document.querySelectorAll('#team-org-form input');
    orgInputs.forEach(input => {
      input.addEventListener('input', () => this.saveDraft(false));
    });
  }

  addRow(data = null) {
    const tbody = document.getElementById('team-participants-tbody');
    if (!tbody) return;

    const rowId = `part-${this.nextId++}`;
    const initial = data || {
      enName: '',
      zhName: '',
      age: '',
      gender: '',
      group: 'Preschooler'
    };

    const tr = document.createElement('tr');
    tr.id = rowId;
    tr.className = 'participant-row';
    tr.innerHTML = `
      <td style="text-align: center;">
        <span class="row-index-badge" data-role="index-badge">01</span>
      </td>
      <td>
        <input type="text" class="form-input form-input-sm part-en-name" placeholder="English Name *" value="${initial.enName}" required>
      </td>
      <td>
        <input type="text" class="form-input form-input-sm part-zh-name" placeholder="Chinese Name (Opt.)" value="${initial.zhName}">
      </td>
      <td style="width: 80px;">
        <input type="number" class="form-input form-input-sm part-age" placeholder="Age *" min="3" max="20" value="${initial.age}" required>
      </td>
      <td style="width: 110px;">
        <select class="form-select form-select-sm part-gender" required>
          <option value="">Gender</option>
          <option value="Male" ${initial.gender === 'Male' ? 'selected' : ''}>Male (男)</option>
          <option value="Female" ${initial.gender === 'Female' ? 'selected' : ''}>Female (女)</option>
          <option value="Other" ${initial.gender === 'Other' ? 'selected' : ''}>Other</option>
        </select>
      </td>
      <td style="width: 150px;">
        <select class="form-select form-select-sm part-group">
          <option value="Preschooler" ${initial.group === 'Preschooler' ? 'selected' : ''}>Preschooler (3–5)</option>
          <option value="Children" ${initial.group === 'Children' ? 'selected' : ''}>Children (6–8)</option>
          <option value="Pre-teen" ${initial.group === 'Pre-teen' ? 'selected' : ''}>Pre-teen (9–12)</option>
          <option value="Youth" ${initial.group === 'Youth' ? 'selected' : ''}>Youth (13–16)</option>
        </select>
      </td>
      <td style="text-align: center; width: 50px;">
        <button type="button" class="btn btn-outline btn-sm" style="padding: 4px 8px; color: var(--color-cinnabar); border-color: var(--color-paper-border-dark);" title="Remove Participant" data-action="remove-row">
          ✕
        </button>
      </td>
    `;

    tbody.appendChild(tr);

    // Bind row event listeners
    const ageInput = tr.querySelector('.part-age');
    const groupSelect = tr.querySelector('.part-group');
    const removeBtn = tr.querySelector('[data-action="remove-row"]');

    if (ageInput) {
      ageInput.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        if (!isNaN(val)) {
          if (val >= 3 && val <= 5) groupSelect.value = 'Preschooler';
          else if (val >= 6 && val <= 8) groupSelect.value = 'Children';
          else if (val >= 9 && val <= 12) groupSelect.value = 'Pre-teen';
          else if (val >= 13) groupSelect.value = 'Youth';
        }
        this.calculateGroupTotals();
        this.saveDraft(false);
      });
    }

    if (groupSelect) {
      groupSelect.addEventListener('change', () => {
        this.calculateGroupTotals();
        this.saveDraft(false);
      });
    }

    const allInputs = tr.querySelectorAll('input, select');
    allInputs.forEach(el => {
      el.addEventListener('input', () => this.saveDraft(false));
    });

    if (removeBtn) {
      removeBtn.addEventListener('click', () => this.removeRow(rowId));
    }

    this.reindexRows();
    this.calculateGroupTotals();
  }

  removeRow(rowId) {
    const row = document.getElementById(rowId);
    if (!row) return;

    const tbody = document.getElementById('team-participants-tbody');
    if (tbody && tbody.children.length <= 1) {
      alert('A team registration must contain at least 1 participant.');
      return;
    }

    row.remove();
    this.reindexRows();
    this.calculateGroupTotals();
    this.saveDraft(false);
  }

  reindexRows() {
    const badges = document.querySelectorAll('[data-role="index-badge"]');
    badges.forEach((badge, idx) => {
      const num = (idx + 1).toString().padStart(2, '0');
      badge.textContent = num;
    });
  }

  calculateGroupTotals() {
    const rows = document.querySelectorAll('#team-participants-tbody tr');
    let preschooler = 0;
    let children = 0;
    let preteen = 0;
    let youth = 0;

    rows.forEach(tr => {
      const group = tr.querySelector('.part-group')?.value;
      if (group === 'Preschooler') preschooler++;
      else if (group === 'Children') children++;
      else if (group === 'Pre-teen') preteen++;
      else if (group === 'Youth') youth++;
    });

    const total = rows.length;

    // Update scoreboard
    const elPreschooler = document.getElementById('counter-preschooler');
    const elChildren = document.getElementById('counter-children');
    const elPreteen = document.getElementById('counter-preteen');
    const elTotal = document.getElementById('counter-total');

    if (elPreschooler) elPreschooler.textContent = preschooler;
    if (elChildren) elChildren.textContent = children;
    if (elPreteen) elPreteen.textContent = preteen;
    if (elTotal) elTotal.textContent = total;
  }

  collectData() {
    const org = {
      organizationName: document.getElementById('team-org-name')?.value.trim() || '',
      recommendationInstitution: document.getElementById('team-rec-inst')?.value.trim() || '',
      contactPerson: document.getElementById('team-contact-person')?.value.trim() || '',
      email: document.getElementById('team-email')?.value.trim() || '',
      phone: document.getElementById('team-phone')?.value.trim() || ''
    };

    const rows = document.querySelectorAll('#team-participants-tbody tr');
    const participants = [];

    rows.forEach((tr, idx) => {
      participants.push({
        index: (idx + 1).toString().padStart(2, '0'),
        enName: tr.querySelector('.part-en-name')?.value.trim() || '',
        zhName: tr.querySelector('.part-zh-name')?.value.trim() || '',
        age: tr.querySelector('.part-age')?.value.trim() || '',
        gender: tr.querySelector('.part-gender')?.value || '',
        group: tr.querySelector('.part-group')?.value || 'Preschooler'
      });
    });

    return { org, participants };
  }

  saveDraft(showNotice = true) {
    const data = this.collectData();
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      if (showNotice) {
        alert('✓ Team registration draft saved to your browser session.');
      }
    } catch (e) {
      console.warn('Could not save draft:', e);
    }
  }

  loadDraft() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return false;

      const data = JSON.parse(raw);
      if (data.org) {
        if (document.getElementById('team-org-name')) document.getElementById('team-org-name').value = data.org.organizationName || '';
        if (document.getElementById('team-rec-inst')) document.getElementById('team-rec-inst').value = data.org.recommendationInstitution || '';
        if (document.getElementById('team-contact-person')) document.getElementById('team-contact-person').value = data.org.contactPerson || '';
        if (document.getElementById('team-email')) document.getElementById('team-email').value = data.org.email || '';
        if (document.getElementById('team-phone')) document.getElementById('team-phone').value = data.org.phone || '';
      }

      if (data.participants && data.participants.length > 0) {
        const tbody = document.getElementById('team-participants-tbody');
        if (tbody) tbody.innerHTML = '';
        data.participants.forEach(p => this.addRow(p));
        return true;
      }
    } catch (e) {
      console.warn('Could not restore draft:', e);
    }
    return false;
  }

  clearDraft() {
    if (confirm('Are you sure you want to reset the form and clear the current draft?')) {
      localStorage.removeItem(this.storageKey);
      window.location.reload();
    }
  }

  populateSampleData() {
    if (document.getElementById('team-org-name')) document.getElementById('team-org-name').value = 'AiDe Art Studio (Tampines Branch)';
    if (document.getElementById('team-rec-inst')) document.getElementById('team-rec-inst').value = 'Singapore Federation of Art Societies';
    if (document.getElementById('team-contact-person')) document.getElementById('team-contact-person').value = 'Ms. Jessica Tan (Senior Lead)';
    if (document.getElementById('team-email')) document.getElementById('team-email').value = 'jessica.tan@aideart.sg';
    if (document.getElementById('team-phone')) document.getElementById('team-phone').value = '+65 9876 5432';

    const tbody = document.getElementById('team-participants-tbody');
    if (tbody) tbody.innerHTML = '';

    const sampleStudents = [
      { enName: 'Lucas Tan Jun Wei', zhName: '陈俊伟', age: '5', gender: 'Male', group: 'Preschooler' },
      { enName: 'Hannah Lee Xin Yi', zhName: '李涵雅', age: '7', gender: 'Female', group: 'Children' },
      { enName: 'Ethan Wang Yu Xuan', zhName: '王宇轩', age: '8', gender: 'Male', group: 'Children' },
      { enName: 'Megan Low Mei Jia', zhName: '刘美嘉', age: '11', gender: 'Female', group: 'Pre-teen' },
      { enName: 'Sarah Lim Zhi Xuan', zhName: '林芷萱', age: '14', gender: 'Female', group: 'Youth' }
    ];

    sampleStudents.forEach(s => this.addRow(s));
    this.saveDraft(false);
  }

  validateForm() {
    const { org, participants } = this.collectData();
    const errors = [];

    if (!org.organizationName) errors.push('Organization / School Name is required.');
    if (!org.contactPerson) errors.push('Contact Person Name is required.');
    if (!org.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(org.email)) errors.push('A valid contact Email is required.');
    if (!org.phone || !/^[0-9+ -]{8,18}$/.test(org.phone)) errors.push('A valid contact Phone Number is required.');

    if (participants.length === 0) {
      errors.push('Please add at least 1 participant.');
    }

    participants.forEach((p, idx) => {
      if (!p.enName) errors.push(`Participant #${p.index}: English Name is required.`);
      if (!p.age || parseInt(p.age, 10) < 3) errors.push(`Participant #${p.index}: Valid Age (3+) is required.`);
      if (!p.gender) errors.push(`Participant #${p.index}: Gender selection is required.`);
    });

    if (errors.length > 0) {
      alert('Please resolve the following errors before submitting:\n\n• ' + errors.join('\n• '));
      return false;
    }

    return true;
  }

  openReviewModal() {
    if (!this.validateForm()) return;

    const { org, participants } = this.collectData();
    const modalContainer = document.getElementById('team-review-modal');
    if (!modalContainer) return;

    let pCount = 0, cCount = 0, ptCount = 0, yCount = 0;
    participants.forEach(p => {
      if (p.group === 'Preschooler') pCount++;
      else if (p.group === 'Children') cCount++;
      else if (p.group === 'Pre-teen') ptCount++;
      else if (p.group === 'Youth') yCount++;
    });

    modalContainer.innerHTML = `
      <div style="position: fixed; inset: 0; background: rgba(18, 19, 22, 0.85); z-index: var(--z-modal); display: flex; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;">
        <div style="background: var(--color-gallery-white); border-radius: var(--radius-lg); width: 100%; max-width: 800px; max-height: 90vh; overflow-y: auto; padding: 32px; box-shadow: var(--shadow-modal); position: relative;">
          <button type="button" id="modal-close-btn" style="position: absolute; right: 20px; top: 20px; background: none; border: none; font-size: 24px; cursor: pointer; color: var(--color-ink-muted);">✕</button>

          <div style="margin-bottom: 20px; border-bottom: 2px solid var(--color-paper-border); padding-bottom: 12px;">
            <span class="seal-badge seal-badge-cobalt" style="margin-bottom: 4px;">Institutional Summary</span>
            <h3 style="font-size: 22px; margin: 0;">Review Team Registration Roster</h3>
          </div>

          <div style="background: var(--color-warm-ivory); border-radius: var(--radius-sm); padding: 16px; margin-bottom: 20px; font-size: 13px;">
            <p style="margin: 0 0 4px;"><strong>Organization:</strong> ${org.organizationName}</p>
            <p style="margin: 0 0 4px;"><strong>Contact Person:</strong> ${org.contactPerson} (${org.phone} · ${org.email})</p>
            <p style="margin: 0;"><strong>Recommendation Institution:</strong> ${org.recommendationInstitution || 'Independent'}</p>
          </div>

          <div style="display: flex; gap: 12px; margin-bottom: 20px; font-size: 12px; flex-wrap: wrap;">
            <span class="seal-badge seal-badge-gold">Preschooler (3–5): ${pCount}</span>
            <span class="seal-badge seal-badge-gold">Children (6–8): ${cCount}</span>
            <span class="seal-badge seal-badge-gold">Pre-teen (9–12): ${ptCount}</span>
            <span class="seal-badge seal-badge-gold">Youth (13–16): ${yCount}</span>
            <span class="seal-badge seal-badge-cobalt" style="font-weight: bold;">Total Headcount: ${participants.length}</span>
          </div>

          <div style="max-height: 240px; overflow-y: auto; border: 1px solid var(--color-paper-border); border-radius: var(--radius-sm); margin-bottom: 24px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
              <thead style="background: var(--color-warm-ivory); position: sticky; top: 0;">
                <tr>
                  <th style="padding: 8px; text-align: center;">#</th>
                  <th style="padding: 8px; text-align: left;">Name</th>
                  <th style="padding: 8px; text-align: left;">Chinese Name</th>
                  <th style="padding: 8px; text-align: center;">Age</th>
                  <th style="padding: 8px; text-align: center;">Gender</th>
                  <th style="padding: 8px; text-align: left;">Group</th>
                </tr>
              </thead>
              <tbody>
                ${participants.map(p => `
                  <tr style="border-bottom: 1px solid var(--color-paper-border);">
                    <td style="padding: 8px; text-align: center; font-weight: bold;">${p.index}</td>
                    <td style="padding: 8px;">${p.enName}</td>
                    <td style="padding: 8px;">${p.zhName || '—'}</td>
                    <td style="padding: 8px; text-align: center;">${p.age}</td>
                    <td style="padding: 8px; text-align: center;">${p.gender}</td>
                    <td style="padding: 8px;">${p.group}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center;">
            <button type="button" class="btn btn-outline" id="modal-cancel-btn">
              ← Edit Roster
            </button>
            <button type="button" class="btn btn-primary" id="modal-final-confirm-btn">
              ✓ Confirm & Generate Official Voucher
            </button>
          </div>
        </div>
      </div>
    `;

    const closeBtn = document.getElementById('modal-close-btn');
    const cancelBtn = document.getElementById('modal-cancel-btn');
    const confirmBtn = document.getElementById('modal-final-confirm-btn');

    const closeModal = () => { modalContainer.innerHTML = ''; };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    if (confirmBtn) confirmBtn.addEventListener('click', () => this.submitRegistration(modalContainer));
  }

  submitRegistration(modalContainer) {
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    const { org, participants } = this.collectData();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const registrationId = `NAS-2026-TEAM-${randomSuffix}`;

    // Clear modal
    if (modalContainer) modalContainer.innerHTML = '';

    // Render Printable Institutional Voucher
    const target = document.getElementById('team-slip-container');
    const formSection = document.getElementById('team-form-section');

    if (formSection) formSection.style.display = 'none';

    if (target) {
      let pCount = 0, cCount = 0, ptCount = 0, yCount = 0;
      participants.forEach(p => {
        if (p.group === 'Preschooler') pCount++;
        else if (p.group === 'Children') cCount++;
        else if (p.group === 'Pre-teen') ptCount++;
        else if (p.group === 'Youth') yCount++;
      });

      target.innerHTML = `
        <div class="registration-slip" style="margin-top: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; border-bottom: 2px solid var(--color-paper-border); padding-bottom: 16px; flex-wrap: wrap; gap: 12px;">
            <div>
              <span class="seal-badge seal-badge-gold" style="margin-bottom: 6px;">Institutional Team Entry Voucher</span>
              <h2 style="font-size: 22px; margin: 0 0 2px;">Nanyang Star International Competition 2026</h2>
              <h3 style="font-size: 13px; color: var(--color-cinnabar); margin: 0; font-weight: 600;">“南洋之星”国际少儿美术大赛 · 团体/机构参赛确认单</h3>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 11px; color: var(--color-ink-muted);">Team Registration ID:</div>
              <div style="font-size: 18px; font-weight: 800; color: var(--color-gold); font-family: monospace;">${registrationId}</div>
              <div style="font-size: 10px; color: var(--color-ink-muted);">${new Date().toISOString().split('T')[0]}</div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; font-size: 13px;">
            <div>
              <h4 style="font-size: 14px; margin: 0 0 8px; color: var(--color-ink-black); border-bottom: 1px solid var(--color-paper-border); padding-bottom: 4px;">Institution Details (参赛机构)</h4>
              <p style="margin: 0 0 4px;"><strong>Organization:</strong> ${org.organizationName}</p>
              <p style="margin: 0 0 4px;"><strong>Contact Person:</strong> ${org.contactPerson}</p>
              <p style="margin: 0;"><strong>Phone & Email:</strong> ${org.phone} · ${org.email}</p>
            </div>

            <div>
              <h4 style="font-size: 14px; margin: 0 0 8px; color: var(--color-ink-black); border-bottom: 1px solid var(--color-paper-border); padding-bottom: 4px;">Group Breakdown (组别总览)</h4>
              <p style="margin: 0 0 4px;"><strong>Preschooler (3–5):</strong> ${pCount} candidates</p>
              <p style="margin: 0 0 4px;"><strong>Children (6–8):</strong> ${cCount} candidates</p>
              <p style="margin: 0 0 4px;"><strong>Pre-teen (9–12):</strong> ${ptCount} candidates</p>
              <p style="margin: 0;"><strong>Total Headcount:</strong> <span class="seal-badge seal-badge-cobalt" style="font-size: 11px;">${participants.length} Candidates</span></p>
            </div>
          </div>

          <div style="margin-bottom: 24px;">
            <h4 style="font-size: 14px; margin: 0 0 8px; color: var(--color-ink-black); border-bottom: 1px solid var(--color-paper-border); padding-bottom: 4px;">Participant Roster (${participants.length} Registered Contestants)</h4>
            <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
              <thead style="background: var(--color-warm-ivory);">
                <tr>
                  <th style="padding: 6px 10px; text-align: center;">#</th>
                  <th style="padding: 6px 10px; text-align: left;">English Name</th>
                  <th style="padding: 6px 10px; text-align: left;">Chinese Name</th>
                  <th style="padding: 6px 10px; text-align: center;">Age</th>
                  <th style="padding: 6px 10px; text-align: center;">Gender</th>
                  <th style="padding: 6px 10px; text-align: left;">Category</th>
                </tr>
              </thead>
              <tbody>
                ${participants.map(p => `
                  <tr style="border-bottom: 1px solid var(--color-paper-border);">
                    <td style="padding: 6px 10px; text-align: center; font-weight: bold;">${p.index}</td>
                    <td style="padding: 6px 10px;">${p.enName}</td>
                    <td style="padding: 6px 10px;">${p.zhName || '—'}</td>
                    <td style="padding: 6px 10px; text-align: center;">${p.age}</td>
                    <td style="padding: 6px 10px; text-align: center;">${p.gender}</td>
                    <td style="padding: 6px 10px;">${p.group}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div style="background: var(--color-warm-ivory); border: 1px solid var(--color-paper-border); border-radius: var(--radius-sm); padding: 12px 16px; font-size: 11px; color: var(--color-ink-charcoal); line-height: 1.5; margin-bottom: 24px;">
            📌 <strong>Institutional Dispatch Instructions (团体原画邮寄指引):</strong><br>
            Please package all physical artwork securely in a single batch, affix this institutional registration slip onto the parcel exterior, and ensure every artwork includes the student's name and registration number <strong>${registrationId}</strong> on the back before mailing to: <em>Singapore Nanyang Artists Society Secretariat, Blk 135 Jurong Gateway Road #03-333, Singapore 600135</em>.
          </div>

          <div class="no-print" style="display: flex; gap: 12px; justify-content: center;">
            <button type="button" class="btn btn-primary" onclick="window.print()">
              🖨️ Print Team Voucher & Roster
            </button>
            <a href="../competitions/nanyang-star.html" class="btn btn-outline">
              Return to Competition Hub →
            </a>
          </div>
        </div>
      `;

      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      localStorage.removeItem(this.storageKey);
    }
  }
}

export const groupRegistration = new GroupRegistrationController();

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    groupRegistration.init();
  });
}
