/**
 * NANYANG ARTISTS SOCIETY — REGISTRATION OPERATIONS & 5-STAGE WORKFLOW
 * Manages Individual & Team competition entries across 5 verified statuses:
 * 'New', 'Under Review', 'Approved', 'Rejected', 'Completed'.
 */

export class RegistrationsController {
  constructor() {
    this.currentFilter = 'all';
    this.statusFilter = 'all';
    this.entries = [
      { id: 'NAS-2026-IND-0104', type: 'Individual', name: 'Sophia Tan (陈舒雅)', age: 8, group: 'Division B (Junior Primary: 7–9 yrs)', category: 'Chinese Painting & Color Ink', date: '2026-08-20', status: 'approved', artworkTitle: 'Future Solar Garden' },
      { id: 'NAS-2026-IND-0105', type: 'Individual', name: 'Ethan Lim (林子恒)', age: 5, group: 'Division A (Preschool: 4–6 yrs)', category: 'Children Creative Drawing', date: '2026-08-22', status: 'new', artworkTitle: 'My Flying Electric Ship' },
      { id: 'NAS-2026-GRP-0012', type: 'Team / School', name: 'AiDe Art Studio (爱德艺术中心)', age: '—', group: '18 Students (Divisions A, B, C)', category: 'Institutional Bulk Submission', date: '2026-08-24', status: 'under_review', artworkTitle: '18 Artwork Parcels Dispatched' },
      { id: 'NAS-2026-IND-0106', type: 'Individual', name: 'Chloe Huang (黄楚儿)', age: 11, group: 'Division C (Senior Primary: 10–12 yrs)', category: 'Academic Sketching', date: '2026-08-21', status: 'completed', artworkTitle: 'Jurong Gateway Light and Shadow' },
      { id: 'NAS-2026-IND-0107', type: 'Individual', name: 'Marcus Zhang (张文博)', age: 14, group: 'Division D (Youth: 13–16 yrs)', category: 'Western Oil Painting', date: '2026-08-19', status: 'rejected', artworkTitle: 'Unspecified submission dimensions' }
    ];
  }

  async renderRegistrationsModule(container) {
    let filtered = this.entries;

    if (this.currentFilter !== 'all') {
      filtered = filtered.filter(e => e.type.toLowerCase().includes(this.currentFilter));
    }

    if (this.statusFilter !== 'all') {
      filtered = filtered.filter(e => e.status === this.statusFilter);
    }

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <div>
          <h3 style="font-size: 16px; margin: 0 0 4px;">📝 Competition Registration & Candidate Review</h3>
          <p style="font-size: 12px; color: #6B7280; margin: 0;">5-stage review workflow for Individual & Institutional competition submissions.</p>
        </div>
      </div>

      <!-- Filter Controls Toolbar -->
      <div style="background: #FFFFFF; border: 1px solid var(--admin-border); border-radius: 8px; padding: 14px 20px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; gap: 6px;">
          <button type="button" class="doc-category-pill reg-type-filter active" data-type="all">All Submissions</button>
          <button type="button" class="doc-category-pill reg-type-filter" data-type="individual">Individual Entries</button>
          <button type="button" class="doc-category-pill reg-type-filter" data-type="team">Team / School</button>
        </div>

        <div style="display: flex; gap: 10px; align-items: center;">
          <span style="font-size: 12px; font-weight: 600; color: #374151;">Status:</span>
          <select class="admin-select" id="reg-status-filter-select" style="width: auto; padding: 6px 10px; font-size: 12px;">
            <option value="all">All Statuses (全部状态)</option>
            <option value="new">New (刚提交)</option>
            <option value="under_review">Under Review (审核中)</option>
            <option value="approved">Approved (已审核准考)</option>
            <option value="rejected">Rejected (退回)</option>
            <option value="completed">Completed (已结案)</option>
          </select>
        </div>
      </div>

      <!-- Submissions Table -->
      <div style="background: #FFFFFF; border: 1px solid var(--admin-border); border-radius: 8px; overflow: hidden;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="background: var(--admin-content-bg); border-bottom: 2px solid var(--admin-border); text-align: left;">
              <th style="padding: 12px 16px;">Voucher No.</th>
              <th style="padding: 12px 16px;">Applicant / Institution</th>
              <th style="padding: 12px 16px;">Division Group</th>
              <th style="padding: 12px 16px;">Artwork / Title</th>
              <th style="padding: 12px 16px;">Date</th>
              <th style="padding: 12px 16px;">Review Status</th>
              <th style="padding: 12px 16px; text-align: right;">Workflow Actions</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.map(entry => `
              <tr style="border-bottom: 1px solid var(--admin-border);">
                <td style="padding: 12px 16px; font-family: monospace; font-weight: 600; color: #4B5563;">${entry.id}</td>
                <td style="padding: 12px 16px;">
                  <strong>${entry.name}</strong>
                  <div style="font-size: 11px; color: #6B7280;">${entry.type}</div>
                </td>
                <td style="padding: 12px 16px; font-size: 12px;">${entry.group}</td>
                <td style="padding: 12px 16px;">
                  <em>"${entry.artworkTitle}"</em>
                  <div style="font-size: 11px; color: #9CA3AF;">${entry.category}</div>
                </td>
                <td style="padding: 12px 16px; color: #6B7280;">${entry.date}</td>
                <td style="padding: 12px 16px;">
                  <span class="status-pill status-${entry.status}">${entry.status.replace('_', ' ')}</span>
                </td>
                <td style="padding: 12px 16px; text-align: right;">
                  <select class="admin-select reg-status-changer" data-id="${entry.id}" style="width: auto; padding: 4px 8px; font-size: 11px; display: inline-block;">
                    <option value="new" ${entry.status === 'new' ? 'selected' : ''}>New</option>
                    <option value="under_review" ${entry.status === 'under_review' ? 'selected' : ''}>Review</option>
                    <option value="approved" ${entry.status === 'approved' ? 'selected' : ''}>Approve</option>
                    <option value="rejected" ${entry.status === 'rejected' ? 'selected' : ''}>Reject</option>
                    <option value="completed" ${entry.status === 'completed' ? 'selected' : ''}>Complete</option>
                  </select>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    // Bind Status Changers
    const changers = container.querySelectorAll('.reg-status-changer');
    changers.forEach(ch => {
      ch.addEventListener('change', (e) => {
        const id = ch.getAttribute('data-id');
        const newStatus = e.target.value;
        const entry = this.entries.find(item => item.id === id);
        if (entry) {
          entry.status = newStatus;
          alert(`Status for ${id} transitioned to ${newStatus.toUpperCase()}`);
          this.renderRegistrationsModule(container);
        }
      });
    });
  }
}

export const registrationsController = new RegistrationsController();
