/**
 * NANYANG ARTISTS SOCIETY — ENTERPRISE ADMIN CMS CORE CONTROLLER
 * Main Router, Dashboard KPI Metrics, RBAC State, Activity Audit Logging,
 * and Irreversible Action Confirmation Modal.
 */

import { dataAdapter } from '../services/dataAdapter.js';
import { editorController } from './editor.js';
import { mediaController } from './media.js';
import { registrationsController } from './registrations.js';

export class AdminCoreController {
  constructor() {
    this.currentView = 'dashboard';
    this.currentRole = 'super_admin'; // 'super_admin', 'chief_editor', 'registrar', 'media_manager'
    this.auditLogs = [
      { id: 'LOG-001', user: 'Admin Teng', role: 'Super Admin', action: 'Published 5th Nanyang Star Call for Entries', entity: 'Competitions', timestamp: '2026-08-25 18:30:22', ip: '192.168.1.10' },
      { id: 'LOG-002', user: 'Editor Xu', role: 'Chief Editor', action: 'Updated Academic Sketching Syllabus Grades 1–9', entity: 'Grade Syllabi', timestamp: '2026-08-25 16:14:05', ip: '192.168.1.14' },
      { id: 'LOG-003', user: 'Registrar Tan', role: 'Registrar', action: 'Approved Individual Contestant NAS-2026-IND-0104', entity: 'Registrations', timestamp: '2026-08-25 14:02:40', ip: '192.168.1.22' },
      { id: 'LOG-004', user: 'Media Koh', role: 'Media Manager', action: 'Uploaded 2026 Poster High-Res Pack to Cloudinary', entity: 'Media Assets', timestamp: '2026-08-25 11:20:18', ip: '192.168.1.30' }
    ];
  }

  async init() {
    this.bindSidebarNavigation();
    this.bindRoleSelector();
    this.bindConfirmationModal();
    await this.renderCurrentView();
  }

  bindSidebarNavigation() {
    if (typeof document === 'undefined') return;
    const navItems = document.querySelectorAll('.admin-nav-item[data-view]');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');

        const view = item.getAttribute('data-view');
        this.navigate(view);
      });
    });
  }

  bindRoleSelector() {
    if (typeof document === 'undefined') return;
    const roleSelect = document.getElementById('admin-role-select');
    if (roleSelect) {
      roleSelect.addEventListener('change', (e) => {
        this.currentRole = e.target.value;
        this.logActivity(`Switched role session to ${this.currentRole}`, 'System Security');
        this.renderCurrentView();
      });
    }
  }

  bindConfirmationModal() {
    if (typeof document === 'undefined') return;
    const modal = document.getElementById('admin-confirm-modal');
    const cancelBtn = document.getElementById('admin-confirm-cancel');
    if (cancelBtn && modal) {
      cancelBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }
  }

  requestConfirmation(title, message, onConfirm) {
    if (typeof document === 'undefined') return;
    const modal = document.getElementById('admin-confirm-modal');
    const titleEl = document.getElementById('admin-confirm-title');
    const msgEl = document.getElementById('admin-confirm-msg');
    const proceedBtn = document.getElementById('admin-confirm-proceed');

    if (modal && titleEl && msgEl && proceedBtn) {
      titleEl.textContent = title;
      msgEl.textContent = message;
      modal.style.display = 'flex';

      proceedBtn.onclick = () => {
        modal.style.display = 'none';
        onConfirm();
      };
    } else {
      if (confirm(`${title}\n\n${message}`)) {
        onConfirm();
      }
    }
  }

  logActivity(action, entity) {
    const roleMap = {
      super_admin: 'Super Admin',
      chief_editor: 'Chief Editor',
      registrar: 'Registrar',
      media_manager: 'Media Manager'
    };

    const newLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      user: 'Current Session User',
      role: roleMap[this.currentRole] || 'Admin',
      action: action,
      entity: entity,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      ip: '127.0.0.1'
    };

    this.auditLogs.unshift(newLog);
  }

  async navigate(view) {
    this.currentView = view;
    await this.renderCurrentView();
  }

  async renderCurrentView() {
    if (typeof document === 'undefined') return;
    const titleEl = document.getElementById('admin-topbar-view-title');
    const viewport = document.getElementById('admin-viewport-content');
    if (!viewport) return;

    const titles = {
      dashboard: 'Dashboard & Secretariat Overview',
      courses: 'Courses & Curriculum Management',
      exams: 'Grade Examination & Syllabi Management',
      competitions: 'Competitions & Winner Operations',
      artworks: 'Digital Museum & Artworks Repository',
      artists: 'Faculty, Masters & Leadership Profiles',
      news_events: 'News Dispatches & Event Schedules',
      registrations: 'Registration Operations (Individual & Team)',
      media: 'Media Asset Manager & Cloudinary CDN',
      ai_knowledge: 'AI Art Assistant Knowledge Base',
      audit_logs: 'Security & Activity Audit Logs',
      settings: 'Society Configuration & GAS Credentials'
    };

    if (titleEl) {
      titleEl.textContent = titles[this.currentView] || 'Admin Console';
    }

    switch (this.currentView) {
      case 'dashboard':
        await this.renderDashboard(viewport);
        break;
      case 'courses':
        await editorController.renderCoursesModule(viewport);
        break;
      case 'artists':
        await editorController.renderArtistsModule(viewport);
        break;
      case 'competitions':
        await editorController.renderCompetitionsModule(viewport);
        break;
      case 'registrations':
        await registrationsController.renderRegistrationsModule(viewport);
        break;
      case 'media':
        await mediaController.renderMediaModule(viewport);
        break;
      case 'audit_logs':
        this.renderAuditLogs(viewport);
        break;
      default:
        viewport.innerHTML = `
          <div style="background: #FFFFFF; border: 1px solid var(--admin-border); border-radius: 8px; padding: 40px; text-align: center;">
            <h3 style="margin: 0 0 8px;">${titles[this.currentView]}</h3>
            <p style="color: #6B7280; font-size: 13px;">Module loaded and operational under role: <strong>${this.currentRole.toUpperCase()}</strong>.</p>
          </div>
        `;
    }
  }

  async renderDashboard(container) {
    const courses = await dataAdapter.getTable('Courses') || [];
    const disciplines = await dataAdapter.getTable('Disciplines') || [];
    const competitions = await dataAdapter.getTable('Competitions') || [];
    const artworks = await dataAdapter.getTable('GalleryArtworks') || [];
    const news = await dataAdapter.getTable('News') || [];
    const events = await dataAdapter.getTable('Events') || [];

    container.innerHTML = `
      <!-- 8 KPI Metrics Cards Grid -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <div>
            <div class="kpi-label">Courses</div>
            <div class="kpi-num">${courses.length}</div>
            <div style="font-size: 11px; color: #10B981;">● Active Studio Curriculum</div>
          </div>
          <div class="kpi-icon-badge">🎨</div>
        </div>

        <div class="kpi-card">
          <div>
            <div class="kpi-label">Active Exams</div>
            <div class="kpi-num">${disciplines.length}</div>
            <div style="font-size: 11px; color: #10B981;">● 6 Disciplines (Grades 1–9)</div>
          </div>
          <div class="kpi-icon-badge">📜</div>
        </div>

        <div class="kpi-card">
          <div>
            <div class="kpi-label">Competitions</div>
            <div class="kpi-num">${competitions.length}</div>
            <div style="font-size: 11px; color: var(--admin-accent);">● 5th Nanyang Star Active</div>
          </div>
          <div class="kpi-icon-badge">⭐</div>
        </div>

        <div class="kpi-card">
          <div>
            <div class="kpi-label">Artworks</div>
            <div class="kpi-num">${artworks.length}</div>
            <div style="font-size: 11px; color: #6B7280;">● Digital Museum Archive</div>
          </div>
          <div class="kpi-icon-badge">🖼️</div>
        </div>

        <div class="kpi-card">
          <div>
            <div class="kpi-label">News</div>
            <div class="kpi-num">${news.length}</div>
            <div style="font-size: 11px; color: #10B981;">● Dispatches Published</div>
          </div>
          <div class="kpi-icon-badge">📰</div>
        </div>

        <div class="kpi-card">
          <div>
            <div class="kpi-label">Events</div>
            <div class="kpi-num">${events.length}</div>
            <div style="font-size: 11px; color: #10B981;">● Upcoming Timetables</div>
          </div>
          <div class="kpi-icon-badge">📅</div>
        </div>

        <div class="kpi-card">
          <div>
            <div class="kpi-label">Registrations</div>
            <div class="kpi-num">148</div>
            <div style="font-size: 11px; color: #6366F1;">● Individual & Teams</div>
          </div>
          <div class="kpi-icon-badge">📝</div>
        </div>

        <div class="kpi-card">
          <div>
            <div class="kpi-label">Enquiries</div>
            <div class="kpi-num">32</div>
            <div style="font-size: 11px; color: #F59E0B;">● 4 Pending Review</div>
          </div>
          <div class="kpi-icon-badge">💬</div>
        </div>
      </div>

      <!-- Recent Activity Audit Stream & Quick Actions -->
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px;">
        <div style="background: #FFFFFF; border: 1px solid var(--admin-border); border-radius: 8px; padding: 20px;">
          <h3 style="font-size: 15px; margin: 0 0 16px; display: flex; align-items: center; gap: 8px;">
            <span>🛡️</span> Recent Activity & Audit Trail
          </h3>

          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${this.auditLogs.map(log => `
              <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 10px; border-bottom: 1px solid var(--admin-border); font-size: 12.5px;">
                <div>
                  <strong>${log.action}</strong>
                  <div style="font-size: 11px; color: #6B7280; margin-top: 2px;">
                    By <span style="color: var(--admin-accent); font-weight: 600;">${log.user} (${log.role})</span> · Entity: ${log.entity}
                  </div>
                </div>
                <div style="font-size: 11px; color: #9CA3AF; text-align: right;">
                  ${log.timestamp}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="background: #FFFFFF; border: 1px solid var(--admin-border); border-radius: 8px; padding: 20px;">
          <h3 style="font-size: 15px; margin: 0 0 16px;">⚡ Quick Management Actions</h3>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <button type="button" class="btn btn-outline btn-sm" onclick="admin.navigate('courses')" style="text-align: left; justify-content: flex-start;">
              ➕ Add New Art Course
            </button>
            <button type="button" class="btn btn-outline btn-sm" onclick="admin.navigate('artists')" style="text-align: left; justify-content: flex-start;">
              👨‍🎨 Create Artist Profile
            </button>
            <button type="button" class="btn btn-outline btn-sm" onclick="admin.navigate('registrations')" style="text-align: left; justify-content: flex-start;">
              📋 Review Competition Entries
            </button>
            <button type="button" class="btn btn-outline btn-sm" onclick="admin.navigate('media')" style="text-align: left; justify-content: flex-start;">
              📁 Manage Media Assets
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderAuditLogs(container) {
    container.innerHTML = `
      <div style="background: #FFFFFF; border: 1px solid var(--admin-border); border-radius: 8px; padding: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h3 style="font-size: 16px; margin: 0;">🛡️ Enterprise Security & Activity Audit Log</h3>
          <span style="font-size: 12px; color: #6B7280;">Total Recorded Events: ${this.auditLogs.length}</span>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 12.5px;">
          <thead>
            <tr style="background: var(--admin-content-bg); text-align: left; border-bottom: 2px solid var(--admin-border);">
              <th style="padding: 10px 12px;">Log ID</th>
              <th style="padding: 10px 12px;">Timestamp</th>
              <th style="padding: 10px 12px;">User</th>
              <th style="padding: 10px 12px;">Role</th>
              <th style="padding: 10px 12px;">Entity</th>
              <th style="padding: 10px 12px;">Action Description</th>
              <th style="padding: 10px 12px;">IP Address</th>
            </tr>
          </thead>
          <tbody>
            ${this.auditLogs.map(l => `
              <tr style="border-bottom: 1px solid var(--admin-border);">
                <td style="padding: 10px 12px; font-family: monospace; color: #6B7280;">${l.id}</td>
                <td style="padding: 10px 12px;">${l.timestamp}</td>
                <td style="padding: 10px 12px; font-weight: 600;">${l.user}</td>
                <td style="padding: 10px 12px;"><span class="admin-role-badge">${l.role}</span></td>
                <td style="padding: 10px 12px;">${l.entity}</td>
                <td style="padding: 10px 12px;">${l.action}</td>
                <td style="padding: 10px 12px; color: #9CA3AF; font-family: monospace;">${l.ip}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }
}

export const admin = new AdminCoreController();

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      admin.init();
    });
  } else {
    admin.init();
  }
}
