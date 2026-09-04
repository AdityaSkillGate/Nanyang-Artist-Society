/**
 * NANYANG ARTISTS SOCIETY — UNIFIED ABOUT PAGE CONTROLLER
 * Integrates Our Story, Mission Pillars, Leadership Council, Artists & Faculty,
 * Community Societies Alliance, and Interactive 2012–2026 Timeline Stepper.
 */

import { dataAdapter } from './services/dataAdapter.js';
import { i18n } from './services/i18n.js';

export class AboutPageController {
  constructor() {
    this.people = [];
    this.milestones = [];
    this.organizations = [];
    this.currentMilestoneIndex = 0;
    this.selectedAllianceFilter = 'all';
  }

  async init() {
    try {
      const [people, milestones, organizations] = await Promise.all([
        dataAdapter.getTable('People'),
        dataAdapter.getTable('Milestones'),
        dataAdapter.getTable('Organizations')
      ]);

      this.people = Array.isArray(people) ? people : [];
      this.milestones = Array.isArray(milestones) ? milestones : [];
      this.organizations = Array.isArray(organizations) ? organizations : [];

      this.renderLeadership();
      this.renderFaculty();
      this.bindAllianceFilters();
      this.renderSocieties();
      this.initTimeline();
      this.bindAnchorNav();

      window.addEventListener('nas:languageChanged', () => {
        this.renderLeadership();
        this.renderFaculty();
        this.renderSocieties();
        this.renderActiveMilestone();
      });
    } catch (err) {
      console.error('[AboutPageController] Init error:', err);
    }
  }

  bindAnchorNav() {
    const navButtons = document.querySelectorAll('.about-subnav-btn');
    navButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // Dynamic scroll spy
    const sections = ['story', 'mission', 'leadership', 'faculty', 'community', 'timeline']
      .map(id => document.getElementById(id))
      .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navButtons.forEach(btn => {
              const href = btn.getAttribute('href');
              btn.classList.toggle('active', href === `#${id}`);
            });
          }
        });
      }, {
        rootMargin: '-20% 0px -55% 0px',
        threshold: 0
      });

      sections.forEach(sec => observer.observe(sec));
    }
  }

  renderLeadership() {
    const container = document.getElementById('about-leadership-grid');
    if (!container) return;

    const isZh = (i18n.getLanguage() === 'zh-SG' || i18n.getLanguage() === 'zh');
    const leaders = this.people.filter(p => p.category === 'executive_board');
    const specLabel = isZh ? '专业领域:' : 'Specialization:';

    container.innerHTML = leaders.map(p => {
      const primaryName = isZh ? (p.name_zh || p.name_en) : p.name_en;
      const secondaryName = isZh ? (p.name_en ? `<p style="font-size: 12.5px; color: var(--color-ink-muted); margin: 0 0 4px;">${p.name_en}</p>` : '') : (p.name_zh ? `<h4 style="font-size: 13px; color: var(--color-cinnabar); font-weight: 600; margin: 0 0 4px;">${p.name_zh}</h4>` : '');
      const roleTitle = isZh ? (p.role_title_zh || p.role_title_en) : p.role_title_en;
      const roleBadge = isZh ? (p.role_type_zh || '执行理事') : (p.role_type || 'Executive Council');
      const bio = isZh ? (p.bio_zh || p.bio_en) : p.bio_en;
      const specialty = isZh ? (p.discipline_specialty_zh || p.discipline_specialty || '传统书画与美育') : (p.discipline_specialty || 'Traditional Fine Arts & Education');

      return `
        <div class="card" style="padding: 24px; display: flex; flex-direction: column; height: 100%;">
          <div style="display: flex; gap: 16px; align-items: flex-start; margin-bottom: 16px;">
            <img src="${p.photo_url || 'assets/logo/logo.png'}" alt="${primaryName}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 2px solid var(--color-gold); flex-shrink: 0;" onerror="this.onerror=null; this.src='assets/logo/logo.png';">
            <div>
              <span class="seal-badge seal-badge-gold" style="margin-bottom: 4px; font-size: 10px;">${roleBadge}</span>
              <h3 style="font-size: 17px; margin: 0 0 2px;">${primaryName}</h3>
              ${secondaryName}
              <p style="font-size: 12px; color: var(--color-ink-muted); margin: 0; font-weight: 600;">${roleTitle}</p>
            </div>
          </div>

          <div style="background: var(--color-warm-ivory); border-radius: var(--radius-xs); padding: 10px; font-size: 11.5px; color: var(--color-ink-charcoal); line-height: 1.4; margin-bottom: 12px; border: 1px solid var(--color-paper-border);">
            <strong style="color: var(--color-ink-black); display: block; margin-bottom: 2px;">${specLabel}</strong>
            ${specialty}
          </div>

          <p style="font-size: 12.5px; color: var(--color-ink-charcoal); line-height: 1.55; margin: 0 0 16px; flex-grow: 1;">
            ${bio}
          </p>
        </div>
      `;
    }).join('');
  }

  renderFaculty() {
    const container = document.getElementById('about-faculty-grid');
    if (!container) return;

    const isZh = (i18n.getLanguage() === 'zh-SG' || i18n.getLanguage() === 'zh');
    const faculty = this.people.filter(p => p.category === 'academic_consulting' || p.category === 'advisory_council');

    container.innerHTML = faculty.map(p => {
      const primaryName = isZh ? (p.name_zh || p.name_en) : p.name_en;
      const secondaryName = isZh ? (p.name_en ? `<p style="font-size: 11px; color: var(--color-ink-muted); margin: 0 0 2px;">${p.name_en}</p>` : '') : (p.name_zh ? `<h4 style="font-size: 13px; color: var(--color-cinnabar); margin: 0 0 2px;">${p.name_zh}</h4>` : '');
      const roleTitle = isZh ? (p.role_title_zh || p.role_title_en) : p.role_title_en;
      const bio = isZh 
        ? (p.bio_zh ? p.bio_zh.slice(0, 140) + '...' : '') 
        : (p.bio_en ? p.bio_en.slice(0, 160) + '...' : '');

      return `
        <div class="card" style="padding: 20px; display: flex; flex-direction: column;">
          <div style="display: flex; gap: 14px; align-items: center; margin-bottom: 12px;">
            <img src="${p.photo_url || 'assets/logo/logo.png'}" alt="${primaryName}" style="width: 64px; height: 64px; border-radius: 50%; object-fit: cover; border: 2px solid var(--color-paper-border); flex-shrink: 0;" onerror="this.onerror=null; this.src='assets/logo/logo.png';">
            <div>
              <h3 style="font-size: 16px; margin: 0 0 2px;">${primaryName}</h3>
              ${secondaryName}
              <span style="font-size: 11px; color: var(--color-ink-muted);">${roleTitle}</span>
            </div>
          </div>
          <p style="font-size: 12px; color: var(--color-ink-muted); margin: 0; line-height: 1.5;">
            ${bio}
          </p>
        </div>
      `;
    }).join('');
  }

  bindAllianceFilters() {
    const filterBar = document.getElementById('societies-filter-bar');
    if (!filterBar) return;

    filterBar.querySelectorAll('[data-alliance-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        filterBar.querySelectorAll('[data-alliance-filter]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedAllianceFilter = btn.getAttribute('data-alliance-filter') || 'all';
        this.renderSocieties();
      });
    });
  }

  renderSocieties() {
    const container = document.getElementById('about-societies-grid');
    if (!container) return;

    const isZh = (i18n.getLanguage() === 'zh-SG' || i18n.getLanguage() === 'zh');
    const filtered = (this.selectedAllianceFilter === 'all')
      ? this.organizations
      : this.organizations.filter(o => o.category === this.selectedAllianceFilter);

    if (!filtered || filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; color: var(--color-ink-muted);">
          <p>${isZh ? '暂无该分类下的机构数据' : 'No partner institutions found under this category.'}</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(org => {
      const primaryName = isZh ? (org.organization_zh || org.organization) : (org.organization || org.organization_zh);
      const secondaryName = isZh 
        ? `<p class="alliance-subtitle" style="font-family: inherit; font-size: 12px; color: var(--color-ink-muted); font-weight: 500;">${org.organization || ''}</p>`
        : (org.organization_zh ? `<h4 class="alliance-subtitle">${org.organization_zh}</h4>` : '');
      
      const badgeText = isZh 
        ? (org.badge_zh || org.relationshipType || '官方联盟') 
        : (org.badge_en || org.relationshipType || 'Official Alliance');

      let badgeClass = 'seal-badge-gold';
      if (org.category === 'fine_arts') {
        badgeClass = org.id === 'ORG-FAS-02' ? 'seal-badge-cinnabar' : 'seal-badge-gold';
      } else if (org.category === 'academic') {
        badgeClass = 'seal-badge-cobalt';
      } else {
        badgeClass = 'seal-badge-gold';
      }

      const country = isZh ? (org.country_zh || '新加坡') : (org.country || 'Singapore');
      const desc = isZh ? (org.description_zh || org.description || '') : (org.description || '');
      
      // Render logo box (single or dual logos)
      let logoMarkup = '';
      if (Array.isArray(org.logos) && org.logos.length >= 2) {
        logoMarkup = `
          <div class="alliance-dual-logos">
            <img src="${org.logos[0]}" alt="${primaryName}" class="alliance-logo-img" loading="lazy">
            <div class="alliance-divider"></div>
            <img src="${org.logos[1]}" alt="${primaryName}" class="alliance-logo-img" loading="lazy">
          </div>
        `;
      } else {
        logoMarkup = `
          <img src="${org.logo || 'assets/logo/logo.png'}" alt="${primaryName}" class="alliance-logo-img" loading="lazy" onerror="this.onerror=null; this.src='assets/logo/logo.png';">
        `;
      }

      // Render links if available
      let linksMarkup = '';
      if (Array.isArray(org.links) && org.links.length > 0) {
        linksMarkup = `
          <div class="alliance-footer-links">
            ${org.links.map(l => `
              <a href="${l.url}" class="alliance-link-pill" target="${l.url.startsWith('http') ? '_blank' : '_self'}" rel="${l.url.startsWith('http') ? 'noopener noreferrer' : ''}">
                <span>${l.label}</span>
                <span style="font-size: 10px;" aria-hidden="true">${l.url.startsWith('http') ? '↗' : '→'}</span>
              </a>
            `).join('')}
          </div>
        `;
      } else if (org.website && org.website !== '#') {
        linksMarkup = `
          <div class="alliance-footer-links">
            <a href="${org.website}" class="alliance-link-pill" target="${org.website.startsWith('http') ? '_blank' : '_self'}" rel="${org.website.startsWith('http') ? 'noopener noreferrer' : ''}">
              <span>${isZh ? '访问官方门户' : 'Official Portal'}</span>
              <span style="font-size: 10px;" aria-hidden="true">${org.website.startsWith('http') ? '↗' : '→'}</span>
            </a>
          </div>
        `;
      }

      return `
        <div class="alliance-card" data-category="${org.category || ''}">
          <div class="alliance-logo-box">
            ${logoMarkup}
          </div>
          <div class="alliance-badge-row">
            <span class="seal-badge ${badgeClass}" style="font-size: 10px; padding: 2px 8px;">${badgeText}</span>
            <span class="alliance-location">📍 ${country}</span>
          </div>
          <div class="alliance-title-wrap">
            <h3 class="alliance-title">${primaryName}</h3>
            ${secondaryName}
          </div>
          <p class="alliance-desc">
            ${desc}
          </p>
          ${linksMarkup}
        </div>
      `;
    }).join('');
  }

  initTimeline() {
    const track = document.getElementById('timeline-desktop-track');
    const mobileContainer = document.getElementById('timeline-mobile-container');
    if (!this.milestones || this.milestones.length === 0) return;

    const isZh = (i18n.getLanguage() === 'zh-SG' || i18n.getLanguage() === 'zh');

    if (track) {
      track.innerHTML = `
        <div class="timeline-nav-progress" id="timeline-progress-bar"></div>
        ${this.milestones.map((m, idx) => `
          <button type="button" class="timeline-node-btn ${idx === this.currentMilestoneIndex ? 'active' : ''}" data-milestone-idx="${idx}" aria-label="Year ${m.year}: ${m.title}">
            <span>${m.year.toString().slice(2)}</span>
            <span class="timeline-node-year-label">${m.year}</span>
          </button>
        `).join('')}
      `;

      track.querySelectorAll('[data-milestone-idx]').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-milestone-idx'), 10);
          this.setActiveMilestone(idx);
        });
      });
    }

    if (mobileContainer) {
      mobileContainer.innerHTML = this.milestones.map(m => {
        const title = isZh ? (m.title_zh || m.title) : m.title;
        const subTitle = isZh ? (m.title ? `<p style="font-size: 11px; color: var(--color-ink-muted); margin: 0 0 6px;">${m.title}</p>` : '') : (m.title_zh ? `<h4 style="font-size: 13px; color: var(--color-cinnabar); margin: 0 0 6px;">${m.title_zh}</h4>` : '');
        const desc = isZh ? (m.description_zh || m.description) : m.description;

        return `
          <div class="timeline-mobile-card-wrapper" style="margin-bottom: 20px; border-left: 3px solid var(--color-cinnabar); padding-left: 16px;">
            <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">
              <span class="seal-badge seal-badge-gold">${m.year}</span>
              <span style="font-size: 11px; color: var(--color-ink-muted); font-weight: 600;">${m.date || ''}</span>
            </div>
            <h3 style="font-size: 15px; margin: 0 0 2px;">${title}</h3>
            ${subTitle}
            <p style="font-size: 12px; color: var(--color-ink-charcoal); line-height: 1.5; margin: 0;">${desc}</p>
          </div>
        `;
      }).join('');
    }

    this.setActiveMilestone(this.milestones.length - 1);
  }

  setActiveMilestone(idx) {
    this.currentMilestoneIndex = idx;
    const m = this.milestones[idx];
    if (!m) return;

    // Update active state in track
    const track = document.getElementById('timeline-desktop-track');
    if (track) {
      track.querySelectorAll('.timeline-node-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === idx);
      });
      const progressBar = document.getElementById('timeline-progress-bar');
      if (progressBar && this.milestones.length > 1) {
        const pct = (idx / (this.milestones.length - 1)) * 100;
        progressBar.style.width = `${pct}%`;
      }
    }

    this.renderActiveMilestone();
  }

  renderActiveMilestone() {
    const card = document.getElementById('timeline-spotlight-card');
    const m = this.milestones[this.currentMilestoneIndex];
    if (!card || !m) return;

    const isZh = (i18n.getLanguage() === 'zh-SG' || i18n.getLanguage() === 'zh');
    const primaryTitle = isZh ? (m.title_zh || m.title) : m.title;
    const secondaryTitle = isZh ? (m.title ? `<p style="font-size: 13px; color: var(--color-ink-muted); margin: 0 0 16px;">${m.title}</p>` : '') : (m.title_zh ? `<h4 style="font-size: 16px; color: var(--color-cinnabar); margin: 0 0 16px;">${m.title_zh}</h4>` : '');
    const desc = isZh ? (m.description_zh || m.description) : m.description;
    const yearLabel = isZh ? `${m.year} 年度纪程` : `Year ${m.year}`;
    const categoryLabel = isZh ? '官方发展纪程' : (m.category || 'Institutional Milestone');
    const noteText = isZh 
      ? '历史档案说明：早期里程碑反映联合发起与合作活动，展示合作历史源流。'
      : 'Historical note: Milestone reflects collaborative origin records pending final client confirmation.';

    card.innerHTML = `
      <div style="background: var(--color-gallery-white); border: 1px solid var(--color-paper-border); border-radius: var(--radius-lg); padding: 32px; box-shadow: var(--shadow-card);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div style="display: flex; gap: 10px; align-items: center;">
            <span class="seal-badge seal-badge-gold" style="font-size: 14px; padding: 4px 12px;">${yearLabel}</span>
            <span style="font-size: 13px; color: var(--color-ink-muted); font-weight: 600;">${m.date || ''}</span>
          </div>
          <span style="font-size: 12px; color: var(--color-cinnabar); font-weight: 600;">${categoryLabel}</span>
        </div>
        <h3 style="font-size: 22px; margin: 0 0 6px;">${primaryTitle}</h3>
        ${secondaryTitle}
        <p style="font-size: 14px; color: var(--color-ink-charcoal); line-height: 1.6; margin: 0 0 16px;">${desc}</p>
        ${m.sourceStatus === 'client_verification_pending' ? `
          <div style="background: #FFFBEB; border: 1px solid #FDE68A; padding: 8px 12px; border-radius: var(--radius-xs); font-size: 11px; color: #92400E;">
            ⚠️ <em>${noteText}</em>
          </div>
        ` : ''}
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const controller = new AboutPageController();
  controller.init();
});
