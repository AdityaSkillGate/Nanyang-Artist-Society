/**
 * NANYANG ARTISTS SOCIETY — ART SOCIETIES & COMMUNITY NETWORK CONTROLLER
 * Interactive Ecosystem Radar Canvas, 4-Criteria Filtering Engine, and Relationship Badges.
 */

import { dataAdapter } from './services/dataAdapter.js';

export class CommunityNetwork {
  constructor() {
    this.organizations = [];
    this.filteredOrgs = [];
    this.filters = {
      query: '',
      region: 'all',
      discipline: 'all',
      relationshipType: 'all'
    };
    this.canvas = null;
    this.ctx = null;
    this.animationFrameId = null;
    this.nodes = [];
    this.hoveredNode = null;
    this.radarAngle = 0;
  }

  async init() {
    try {
      this.organizations = await dataAdapter.getTable('Organizations');
      this.filteredOrgs = [...this.organizations];

      this.bindInputs();
      this.initRadarCanvas();
      this.applyFilters();
    } catch (err) {
      console.error('[CommunityNetwork] Init error:', err);
    }
  }

  bindInputs() {
    const qInput = document.getElementById('network-search-input');
    const regionSelect = document.getElementById('network-region-select');
    const discSelect = document.getElementById('network-discipline-select');
    const relSelect = document.getElementById('network-rel-select');
    const resetBtn = document.getElementById('network-reset-btn');

    if (qInput) {
      qInput.addEventListener('input', (e) => {
        this.filters.query = e.target.value.trim();
        this.applyFilters();
      });
    }

    if (regionSelect) {
      regionSelect.addEventListener('change', (e) => {
        this.filters.region = e.target.value;
        this.applyFilters();
      });
    }

    if (discSelect) {
      discSelect.addEventListener('change', (e) => {
        this.filters.discipline = e.target.value;
        this.applyFilters();
      });
    }

    if (relSelect) {
      relSelect.addEventListener('change', (e) => {
        this.filters.relationshipType = e.target.value;
        this.applyFilters();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.filters = { query: '', region: 'all', discipline: 'all', relationshipType: 'all' };
        if (qInput) qInput.value = '';
        if (regionSelect) regionSelect.value = 'all';
        if (discSelect) discSelect.value = 'all';
        if (relSelect) relSelect.value = 'all';
        this.applyFilters();
      });
    }
  }

  applyFilters() {
    const q = this.filters.query.toLowerCase();
    const reg = this.filters.region;
    const disc = this.filters.discipline;
    const rel = this.filters.relationshipType;

    this.filteredOrgs = this.organizations.filter(org => {
      // 1. Text Query
      let matchQuery = true;
      if (q) {
        const matchName = org.organization && org.organization.toLowerCase().includes(q);
        const matchZh = org.organization_zh && org.organization_zh.toLowerCase().includes(q);
        const matchCountry = org.country && org.country.toLowerCase().includes(q);
        const matchDesc = org.description && org.description.toLowerCase().includes(q);
        const matchDisc = org.discipline && org.discipline.toLowerCase().includes(q);
        matchQuery = matchName || matchZh || matchCountry || matchDesc || matchDisc;
      }

      // 2. Region
      const matchRegion = reg === 'all' || org.region.toLowerCase() === reg.toLowerCase();

      // 3. Discipline
      const matchDiscipline = disc === 'all' || org.discipline.toLowerCase().includes(disc.toLowerCase());

      // 4. Relationship Type
      const matchRelationship = rel === 'all' || org.relationshipType.toLowerCase() === rel.toLowerCase();

      return matchQuery && matchRegion && matchDiscipline && matchRelationship;
    });

    this.updateNodes();
    this.renderOrganizationCards();
  }

  renderOrganizationCards() {
    const container = document.getElementById('network-cards-container');
    const badge = document.getElementById('network-count-badge');

    if (badge) {
      badge.textContent = `Showing ${this.filteredOrgs.length} network entity${this.filteredOrgs.length === 1 ? '' : 'ies'}`;
    }

    if (!container) return;

    if (this.filteredOrgs.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 48px 24px; text-align: center; background: var(--color-gallery-white); border: 1px dashed var(--color-paper-border-dark); border-radius: var(--radius-md);">
          <div style="font-size: 38px; margin-bottom: 8px;">🌐</div>
          <h3 style="font-size: 18px; margin-bottom: 4px;">No Organizations Found</h3>
          <p style="font-size: 13px; color: var(--color-ink-muted); max-width: 460px; margin: 0 auto 16px;">
            We could not find any associated societies matching your filter parameters. Please adjust your criteria.
          </p>
          <button type="button" class="btn btn-outline btn-sm" onclick="document.getElementById('network-reset-btn').dispatchEvent(new Event('click'))">
            ↺ Reset Filters
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = this.filteredOrgs.map(org => {
      let badgeClass = 'rel-badge-pending';
      if (org.relationshipType === 'Current Partner') badgeClass = 'rel-badge-partner';
      else if (org.relationshipType === 'Historical Collaboration') badgeClass = 'rel-badge-history';
      else if (org.relationshipType === 'Associated Organization') badgeClass = 'rel-badge-associated';
      else if (org.relationshipType === 'Competition Participant') badgeClass = 'rel-badge-participant';

      return `
        <div class="org-card">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; gap: 8px; flex-wrap: wrap;">
            <span class="rel-badge ${badgeClass}">
              ${org.relationshipType}
            </span>
            <span style="font-size: 11px; font-weight: 700; color: var(--color-ink-muted); background: var(--color-warm-ivory); padding: 2px 6px; border-radius: 2px;">
              📍 ${org.country}
            </span>
          </div>

          <div style="display: flex; gap: 14px; align-items: center; margin-bottom: 12px;">
            <img src="${org.logo}" alt="${org.organization}" style="width: 54px; height: 54px; border-radius: var(--radius-sm); object-fit: cover; border: 1px solid var(--color-paper-border); flex-shrink: 0;" onerror="this.onerror=null; this.src='../assets/logo/logo.png';">
            <div>
              <h3 style="font-size: 16px; margin: 0 0 2px;">${org.organization}</h3>
              <h4 style="font-size: 13px; color: var(--color-cinnabar); font-weight: 600; margin: 0;">${org.organization_zh}</h4>
            </div>
          </div>

          <div style="font-size: 11px; color: var(--color-cobalt); font-weight: 600; margin-bottom: 10px;">
            🏷️ Focus: ${org.discipline}
          </div>

          <p style="font-size: 12px; color: var(--color-ink-charcoal); line-height: 1.5; margin: 0 0 16px; flex-grow: 1;">
            ${org.description}
          </p>

          <div style="margin-top: auto; border-top: 1px solid var(--color-paper-border); padding-top: 12px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 11px; color: var(--color-ink-muted);">
              ${org.status === 'verified' ? '✓ Verified Source' : '⚠️ Pending Confirmation'}
            </span>
            ${org.website && org.website !== '#' ? `
              <a href="${org.website}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="font-size: 11px; padding: 4px 10px;">
                Visit Portal ↗
              </a>
            ` : `
              <span style="font-size: 11px; color: var(--color-ink-muted); font-style: italic;">Archival Record</span>
            `}
          </div>
        </div>
      `;
    }).join('');
  }

  initRadarCanvas() {
    this.canvas = document.getElementById('network-radar-canvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
      const y = (e.clientY - rect.top) * (this.canvas.height / rect.height);

      this.hoveredNode = this.nodes.find(n => {
        const dx = n.x - x;
        const dy = n.y - y;
        return Math.sqrt(dx * dx + dy * dy) < n.radius + 6;
      });
    });

    this.animateRadar();
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = 380;
    this.updateNodes();
  }

  updateNodes() {
    if (!this.canvas) return;
    const cx = this.canvas.width / 2;
    const cy = this.canvas.height / 2;
    const total = this.filteredOrgs.length;

    this.nodes = this.filteredOrgs.map((org, i) => {
      const angle = (i / Math.max(1, total)) * Math.PI * 2 + (i % 2 === 0 ? 0.2 : -0.2);
      const dist = 100 + (i % 3) * 35;
      const x = cx + Math.cos(angle) * dist;
      const y = cy + Math.sin(angle) * dist;

      let color = '#C59B27';
      if (org.relationshipType === 'Current Partner') color = '#10B981';
      else if (org.relationshipType === 'Associated Organization') color = '#3B82F6';
      else if (org.relationshipType === 'Competition Participant') color = '#9CA3AF';

      return {
        ...org,
        x,
        y,
        originX: x,
        originY: y,
        radius: 8,
        color,
        angle
      };
    });
  }

  animateRadar() {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const cx = this.canvas.width / 2;
    const cy = this.canvas.height / 2;

    // Draw background concentric orbits
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    this.ctx.lineWidth = 1;
    [70, 115, 150].forEach(r => {
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
      this.ctx.stroke();
    });

    // Rotating Radar Sweep
    this.radarAngle += 0.012;
    const sweepGradient = this.ctx.createRadialGradient(cx, cy, 10, cx, cy, 160);
    sweepGradient.addColorStop(0, 'rgba(186, 27, 29, 0.2)');
    sweepGradient.addColorStop(1, 'rgba(186, 27, 29, 0)');

    this.ctx.fillStyle = sweepGradient;
    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy);
    this.ctx.arc(cx, cy, 160, this.radarAngle, this.radarAngle + 0.35);
    this.ctx.closePath();
    this.ctx.fill();

    // Center Hub: Singapore HQ
    this.ctx.fillStyle = '#BA1B1D';
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, 14, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.strokeStyle = '#FFFFFF';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = 'bold 10px Inter, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('NAS HQ (Singapore)', cx, cy + 26);

    // Connecting Lines & Outer Satellite Nodes
    this.nodes.forEach(node => {
      // Line to center
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.moveTo(cx, cy);
      this.ctx.lineTo(node.x, node.y);
      this.ctx.stroke();

      // Node point
      this.ctx.fillStyle = node.color;
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.strokeStyle = '#FFFFFF';
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();

      // Label
      this.ctx.fillStyle = node === this.hoveredNode ? '#FCD34D' : '#E5E7EB';
      this.ctx.font = node === this.hoveredNode ? 'bold 11px Inter' : '10px Inter';
      this.ctx.fillText(node.organization.split(' ')[0] + ` (${node.country})`, node.x, node.y - 12);
    });

    // Tooltip for hovered node
    if (this.hoveredNode) {
      const tip = `${this.hoveredNode.organization} · [${this.hoveredNode.relationshipType}]`;
      this.ctx.fillStyle = 'rgba(18, 19, 22, 0.9)';
      this.ctx.fillRect(this.hoveredNode.x - 100, this.hoveredNode.y + 12, 200, 24);
      this.ctx.strokeStyle = 'var(--color-gold)';
      this.ctx.strokeRect(this.hoveredNode.x - 100, this.hoveredNode.y + 12, 200, 24);
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.font = '10px Inter';
      this.ctx.fillText(tip, this.hoveredNode.x, this.hoveredNode.y + 28);
    }

    this.animationFrameId = requestAnimationFrame(() => this.animateRadar());
  }
}

export const communityNetwork = new CommunityNetwork();

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    communityNetwork.init();
  });
}
