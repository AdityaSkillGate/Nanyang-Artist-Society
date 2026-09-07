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
    // 1. Render leadership immediately so CEO card is guaranteed present with zero delay
    this.renderLeadership();
    this.bindAnchorNav();

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
    } catch (err) {
      console.error('[AboutPageController] Init error:', err);
      this.renderLeadership();
      this.renderFaculty();
      this.renderSocieties();
    }

    window.addEventListener('nas:languageChanged', () => {
      this.renderLeadership();
      this.renderFaculty();
      this.renderSocieties();
      this.renderActiveMilestone();
    });
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
    const container = document.getElementById('about-leadership-container') || document.getElementById('about-leadership-grid');
    if (!container) return;

    const isZh = (i18n.getLanguage() === 'zh-SG' || i18n.getLanguage() === 'zh');
    // Only display CEO & Director Dr. Teng Jiashu with a premium and professional theme
    const ceo = this.people.find(p => p.id === 'PPL-TENG-01' || p.slug === 'dr-teng-jiashu') || {
      name_en: "Dr. Teng Jiashu",
      name_zh: "滕家述",
      role_title_en: "CEO / Director",
      role_title_zh: "首席执行官 / 总监",
      role_type: "CEO / Director",
      discipline_specialty: "Oil Painting, Chinese Painting, Calligraphy, Public Sculpture, Brain Development",
      photo_url: "assets/Dr. Teng Jiashu.png"
    };

    const primaryName = isZh ? (ceo.name_zh || ceo.name_en) : ceo.name_en;
    const secondaryName = isZh ? (ceo.name_en || '') : (ceo.name_zh || '');
    const fullRole = isZh 
      ? '首席执行官 / 总监 · 南洋亚洲学院创办人 · 南洋美术家协会创会会长 (2002)' 
      : 'CEO / Director · Founder of Nanyang Asia College · Founder & President of Nanyang Artists Society (2002)';
    const bio = isZh ? (ceo.bio_zh || ceo.bio_en) : ceo.bio_en;
    const specialty = isZh 
      ? '写实油画与人物肖像、传统山水与花鸟、五体书法与螳螂腿隶书、大型公共雕塑、大脑智力潜能开发' 
      : (ceo.discipline_specialty || 'Oil Painting, Chinese Shanshui Landscape, Calligraphy (5 Scripts & Mantis-Leg), Public Sculpture, Brain Development');

    container.innerHTML = `
      <div class="ceo-leadership-executive-card">
        <div class="ceo-leadership-grid">
          <!-- Left Column: Executive Portrait & Direct Governance Credentials -->
          <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
            <div style="position: relative; width: 100%; max-width: 280px; margin-bottom: 20px;">
              <div style="width: 100%; aspect-ratio: 4/5; border-radius: var(--radius-md); overflow: hidden; box-shadow: 0 16px 36px rgba(0,0,0,0.15); border: 2px solid var(--color-gold); background: #FAF9F5;">
                <img src="${ceo.photo_url || 'assets/Dr. Teng Jiashu.png'}" alt="${primaryName}" style="width: 100%; height: 100%; object-fit: cover; object-position: center top;" onerror="this.onerror=null; this.src='assets/logo/logo.png';">
              </div>
              <div style="position: absolute; bottom: -14px; left: 50%; transform: translateX(-50%); width: 92%; z-index: 5;">
                <span style="font-size: 11.5px; padding: 6px 12px; box-shadow: 0 4px 14px rgba(0,0,0,0.18); width: 100%; text-align: center; display: block; white-space: nowrap; background: #FFFFFF; color: #8A6514; border: 1.5px solid #C5A059; border-radius: 9999px; font-weight: 700; letter-spacing: 0.3px;">
                  ${isZh ? 'CEO / Director · 首席执行官 / 总监' : 'CEO / Director · Executive Leadership'}
                </span>
              </div>
            </div>

            <!-- Society Maintenance Sole Authority Badge -->
            <div style="background: linear-gradient(135deg, rgba(184, 51, 42, 0.08) 0%, rgba(197, 160, 89, 0.12) 100%); border: 1px solid rgba(197, 160, 89, 0.3); border-radius: 8px; padding: 12px 14px; width: 100%; max-width: 280px; margin-top: 8px; margin-bottom: 16px; text-align: center;">
              <span style="font-size: 11px; font-weight: 700; color: var(--color-cinnabar); text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 3px;">
                ${isZh ? '🏛️ 协会全权主持与总监领航' : '🏛️ Executive Society Leadership'}
              </span>
              <span style="font-size: 11.5px; color: var(--color-ink-charcoal); line-height: 1.4; display: block;">
                ${isZh ? '全面主持南洋美术家协会行政管理、考级评审与百年美育体系建设。' : 'Sole Executive Custodian guiding Society governance, national examinations, and artistic heritage.'}
              </span>
            </div>

            <!-- Verification Pills -->
            <div style="display: flex; flex-direction: column; gap: 8px; width: 100%; max-width: 280px; text-align: left;">
              <div style="background: var(--color-warm-ivory); border: 1px solid var(--color-paper-border); border-left: 3px solid var(--color-cinnabar); padding: 8px 12px; border-radius: 4px; font-size: 11.5px; color: var(--color-ink-charcoal);">
                <strong style="color: var(--color-cinnabar); display: block; margin-bottom: 2px;">🏛️ SSG / CPE EduTrust:</strong>
                <span>${isZh ? '新加坡精深局/私立教育委 4年EduTrust教育信托认证' : '4-Year EduTrust Certified (Nanyang Asia College)'}</span>
              </div>
              <div style="background: var(--color-warm-ivory); border: 1px solid var(--color-paper-border); border-left: 3px solid var(--color-gold); padding: 8px 12px; border-radius: 4px; font-size: 11.5px; color: var(--color-ink-charcoal);">
                <strong style="color: var(--color-gold); display: block; margin-bottom: 2px;">🖌️ Master Lineage (2002):</strong>
                <span>${isZh ? '受南洋画派先驱大师刘抗先生亲炙指导创立协会' : 'Mentored by Pioneer Master Liu Kang (2002)'}</span>
              </div>
              <div style="background: var(--color-warm-ivory); border: 1px solid var(--color-paper-border); border-left: 3px solid var(--color-cobalt); padding: 8px 12px; border-radius: 4px; font-size: 11.5px; color: var(--color-ink-charcoal);">
                <strong style="color: var(--color-cobalt); display: block; margin-bottom: 2px;">🌟 Global Distinction:</strong>
                <span>${isZh ? '1997年荣获入选《世界名人录》 (Who’s Who in the World)' : 'Who’s Who in the World Inductee (1997)'}</span>
              </div>
            </div>

            <div style="margin-top: 18px; width: 100%; max-width: 280px; display: flex; flex-direction: column; gap: 8px;">
              <a href="artist-detail.html?id=dr-teng-jiashu" class="btn btn-primary btn-sm" style="width: 100%; justify-content: center;">
                ${isZh ? '查看完整生平与艺术典藏 →' : 'View Master Biography & Portfolio →'}
              </a>
              <a href="courses.html" class="btn btn-outline btn-sm" style="width: 100%; justify-content: center;">
                ${isZh ? '探索名家导师研修课' : 'Explore Masterclass Studios'}
              </a>
            </div>
          </div>

          <!-- Right Column: Titles, Verified Bio & 4 Core Pillars -->
          <div style="display: flex; flex-direction: column;">
            <div style="margin-bottom: 18px; border-bottom: 1px solid var(--color-paper-border); padding-bottom: 16px;">
              <div style="display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 4px;">
                <h3 style="font-size: 28px; margin: 0; color: var(--color-ink-black); font-weight: 700;">${primaryName}</h3>
                ${secondaryName ? `<span style="font-size: 20px; font-family: var(--font-serif); color: var(--color-cinnabar); font-weight: 700;">${secondaryName}</span>` : ''}
              </div>
              <p style="font-size: 14.5px; font-weight: 600; color: var(--color-ink-charcoal); margin: 4px 0 10px;">
                ${fullRole}
              </p>
              <div style="background: var(--color-warm-ivory); border-radius: 6px; padding: 10px 14px; font-size: 12.5px; border: 1px solid var(--color-paper-border); color: var(--color-ink-charcoal);">
                <strong style="color: var(--color-cinnabar);">${isZh ? '专业造诣与涉足领域：' : 'Specialization & Mastery: '}</strong>
                ${specialty}
              </div>
            </div>

            <!-- Comprehensive Verified Biography -->
            <p style="font-size: 14px; color: var(--color-ink-charcoal); line-height: 1.75; margin-bottom: 22px; text-align: justify;">
              ${bio}
            </p>

            <!-- 4-Pillar Mastery Grid -->
            <div class="ceo-pillars-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
              <div style="background: var(--color-warm-ivory); border: 1px solid var(--color-paper-border); padding: 14px; border-radius: var(--radius-sm);">
                <div style="font-size: 13.5px; font-weight: 700; color: var(--color-ink-black); margin-bottom: 4px;">
                  ${isZh ? '🏛️ 高等教育管理与EduTrust信托' : '🏛️ Tertiary Education & EduTrust'}
                </div>
                <div style="font-size: 12px; color: var(--color-ink-muted); line-height: 1.5;">
                  ${isZh ? '30余年潜心创办高等院校与教育科研，南洋亚洲学院荣膺新加坡精深技能发展局（SSG）/ 私立教育委员会（CPE）4年EduTrust教育信托认证。' : '30+ years dedicated to tertiary education management research. Nanyang Asia College is the preferred AEIS training institute, awarded 4-year EduTrust certification by SSG / CPE.'}
                </div>
              </div>

              <div style="background: var(--color-warm-ivory); border: 1px solid var(--color-paper-border); padding: 14px; border-radius: var(--radius-sm);">
                <div style="font-size: 13.5px; font-weight: 700; color: var(--color-ink-black); margin-bottom: 4px;">
                  ${isZh ? '🖌️ 先驱亲炙与协会创立传承' : '🖌️ Pioneer Mentorship & Society Heritage'}
                </div>
                <div style="font-size: 12px; color: var(--color-ink-muted); line-height: 1.5;">
                  ${isZh ? '2002年在南洋画派先驱大师刘抗先生的亲自指导下创立南洋美术家协会，承续南洋艺术风范，凝聚区域艺术菁英。' : 'Founded the Nanyang Artists Society in 2002 under the direct mentorship of pioneer master Liu Kang, championing the enduring Nanyang art spirit.'}
                </div>
              </div>

              <div style="background: var(--color-warm-ivory); border: 1px solid var(--color-paper-border); padding: 14px; border-radius: var(--radius-sm);">
                <div style="font-size: 13.5px; font-weight: 700; color: var(--color-ink-black); margin-bottom: 4px;">
                  ${isZh ? '✒️ 独创螳螂腿隶书与雨林画派' : '✒️ Calligraphy Innovation & Rainforest Style'}
                </div>
                <div style="font-size: 12px; color: var(--color-ink-muted); line-height: 1.5;">
                  ${isZh ? '楷隶行草篆诸体兼通，独创“螳螂腿隶书”；融通中西写实油画与水墨，与门生共同开拓“热带雨林画派”崭新图式。' : 'Master of five calligraphy scripts, creator of "Mantis-Leg Clerical Script", and co-pioneer of the distinctive "Tropical Rainforest Painting Style".'}
                </div>
              </div>

              <div style="background: var(--color-warm-ivory); border: 1px solid var(--color-paper-border); padding: 14px; border-radius: var(--radius-sm);">
                <div style="font-size: 13.5px; font-weight: 700; color: var(--color-ink-black); margin-bottom: 4px;">
                  ${isZh ? '🗿 里程碑雕塑巨作与大脑智力开发' : '🗿 Monumental Sculptures & Brain Intelligence'}
                </div>
                <div style="font-size: 12px; color: var(--color-ink-muted); line-height: 1.5;">
                  ${isZh ? '为南洋小学创作大型雕塑《团结·奋飞》，为柔佛宽柔二小创作《孔子像》；创立大脑智力潜能开发课程，培育大批学子跻身世界顶尖学府。' : 'Sculpted "Unity and Soaring High" for Nanyang Primary and Confucius for Foon Yew; pioneer of brain intelligence and memory potential development curriculums.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
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

const aboutController = new AboutPageController();
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => aboutController.init());
  } else {
    aboutController.init();
  }
}
