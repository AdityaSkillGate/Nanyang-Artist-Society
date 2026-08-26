/**
 * NANYANG ARTISTS SOCIETY — ARTIST & INSTRUCTOR PROFILE CONTROLLER
 * Loads rich profile metadata, biographical milestones, selected works, exhibitions, and courses taught.
 */

import { dataAdapter } from './services/dataAdapter.js';

export class ArtistDetailController {
  constructor() {
    this.artistId = null;
    this.person = null;
    this.allCourses = [];
    this.galleryArtworks = [];
  }

  async init() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      this.artistId = urlParams.get('id') || 'dr-teng-jiashu';

      const people = await dataAdapter.getTable('People');
      this.allCourses = await dataAdapter.getTable('Courses');
      this.galleryArtworks = await dataAdapter.getTable('GalleryArtworks');

      this.person = people.find(p => p.slug === this.artistId || p.id === this.artistId) || people[0];

      if (!this.person) {
        console.error('[ArtistDetail] Person not found:', this.artistId);
        return;
      }

      this.renderProfileHeader();
      this.renderBiography();
      this.renderSelectedWorks();
      this.renderExhibitions();
      this.renderAchievements();
      this.renderCoursesTaught();
    } catch (err) {
      console.error('[ArtistDetail] Init error:', err);
    }
  }

  renderProfileHeader() {
    const p = this.person;
    const breadcrumbName = document.getElementById('profile-breadcrumb-name');
    const photo = document.getElementById('profile-photo');
    const nameEn = document.getElementById('profile-name-en');
    const nameZh = document.getElementById('profile-name-zh');
    const roleEn = document.getElementById('profile-role-en');
    const roleZh = document.getElementById('profile-role-zh');
    const catBadge = document.getElementById('profile-category-badge');
    const specialty = document.getElementById('profile-specialty');

    document.title = `${p.name_en} (${p.name_zh}) | Faculty Profile | Nanyang Artists Society`;

    if (breadcrumbName) breadcrumbName.textContent = p.name_en;
    if (photo) {
      photo.src = p.photo_url;
      photo.alt = p.name_en;
    }
    if (nameEn) nameEn.textContent = p.name_en;
    if (nameZh) nameZh.textContent = p.name_zh;
    if (roleEn) roleEn.textContent = p.role_title_en;
    if (roleZh) roleZh.textContent = p.role_title_zh;
    if (catBadge) {
      catBadge.textContent = p.category === 'executive_board' ? 'Executive Board Member' : (p.category === 'teachers' ? 'Faculty Instructor' : 'Academic Council');
    }
    if (specialty) specialty.textContent = p.discipline_specialty;
  }

  renderBiography() {
    const p = this.person;
    const bioContainer = document.getElementById('profile-biography-container');
    if (!bioContainer) return;

    bioContainer.innerHTML = `
      <div style="background: var(--color-gallery-white); border: 1px solid var(--color-paper-border); border-radius: var(--radius-lg); padding: 28px; box-shadow: var(--shadow-card); margin-bottom: 28px;">
        <h3 style="font-size: 18px; margin: 0 0 12px;">Artistic Biography & Philosophy</h3>
        <p style="font-size: 14px; color: var(--color-ink-charcoal); line-height: 1.7; margin: 0 0 16px;">
          ${p.bio_en}
        </p>
        <div style="background: var(--color-warm-ivory); border-left: 3px solid var(--color-cinnabar); padding: 14px; font-size: 13px; color: var(--color-ink-charcoal); line-height: 1.6; border-radius: 0 var(--radius-xs) var(--radius-xs) 0;">
          <strong>名家简介 (中文)：</strong><br>
          ${p.bio_zh}
        </div>
      </div>
    `;
  }

  renderSelectedWorks() {
    const p = this.person;
    const container = document.getElementById('profile-works-container');
    if (!container) return;

    // Collect works from person object and cross-reference gallery
    let works = p.selectedWorks || [];
    const galleryMatches = this.galleryArtworks.filter(g => g.artist.includes(p.name_en) || (p.name_zh && g.artist_zh.includes(p.name_zh)));

    if (works.length === 0 && galleryMatches.length > 0) {
      works = galleryMatches;
    }

    if (works.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 24px; background: var(--color-warm-ivory); border-radius: var(--radius-md); text-align: center; font-size: 13px; color: var(--color-ink-muted);">
          Selected artwork catalogue available during society retrospectives.
        </div>
      `;
      return;
    }

    container.innerHTML = works.map(w => `
      <div class="card" style="overflow: hidden; display: flex; flex-direction: column;">
        <img src="${w.imageUrl}" alt="${w.title}" style="width: 100%; height: 220px; object-fit: cover; background: var(--color-warm-ivory);" onerror="this.onerror=null; this.src='../assets/logo/logo.png';">
        <div style="padding: 16px;">
          <h4 style="font-size: 15px; margin: 0 0 2px;">${w.title}</h4>
          <h5 style="font-size: 12px; color: var(--color-cinnabar); font-weight: 600; margin: 0 0 8px;">${w.title_zh || ''}</h5>
          <p style="font-size: 11px; color: var(--color-ink-muted); margin: 0;">
            <strong>Medium:</strong> ${w.medium} (${w.year})
          </p>
        </div>
      </div>
    `).join('');
  }

  renderExhibitions() {
    const p = this.person;
    const container = document.getElementById('profile-exhibitions-list');
    if (!container) return;

    const list = p.exhibitions || [];
    if (list.length === 0) {
      container.innerHTML = `<li style="color: var(--color-ink-muted); font-size: 13px;">Exhibition schedule updated quarterly.</li>`;
      return;
    }

    container.innerHTML = list.map(item => `
      <li style="margin-bottom: 8px; font-size: 13px; color: var(--color-ink-charcoal); line-height: 1.5;">
        🏛️ ${item}
      </li>
    `).join('');
  }

  renderAchievements() {
    const p = this.person;
    const container = document.getElementById('profile-achievements-list');
    if (!container) return;

    const list = p.achievements || [];
    if (list.length === 0) {
      container.innerHTML = `<li style="color: var(--color-ink-muted); font-size: 13px;">Official credentials verified with Society Academic Council.</li>`;
      return;
    }

    container.innerHTML = list.map(item => `
      <li style="margin-bottom: 8px; font-size: 13px; color: var(--color-ink-charcoal); line-height: 1.5;">
        🏅 <strong>${item}</strong>
      </li>
    `).join('');
  }

  renderCoursesTaught() {
    const p = this.person;
    const container = document.getElementById('profile-courses-container');
    if (!container) return;

    const courseIds = p.coursesTaught || [];
    const courses = this.allCourses.filter(c => courseIds.includes(c.id) || courseIds.includes(c.slug));

    if (courses.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 24px; background: var(--color-warm-ivory); border-radius: var(--radius-md); text-align: center; font-size: 13px; color: var(--color-ink-muted);">
          Consulting fellow does not currently conduct weekly studio cohorts.
        </div>
      `;
      return;
    }

    container.innerHTML = courses.map(c => `
      <div class="card" style="padding: 20px; display: flex; flex-direction: column;">
        <span class="seal-badge seal-badge-cobalt" style="margin-bottom: 6px;">${c.discipline}</span>
        <h4 style="font-size: 16px; margin: 0 0 2px;">${c.title}</h4>
        <h5 style="font-size: 12px; color: var(--color-cinnabar); font-weight: 600; margin: 0 0 8px;">${c.title_zh}</h5>
        <p style="font-size: 12px; color: var(--color-ink-muted); margin: 0 0 14px; flex-grow: 1;">
          ${c.shortDescription}
        </p>
        <a href="../courses/detail.html?id=${c.slug}" class="btn btn-primary btn-sm" style="width: 100%; text-align: center; font-size: 11px;">
          View Syllabus & Enrol →
        </a>
      </div>
    `).join('');
  }
}

export const artistDetailController = new ArtistDetailController();

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    artistDetailController.init();
  });
}
