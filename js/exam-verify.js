/**
 * NANYANG ARTISTS SOCIETY — CERTIFICATE & EXAM RESULT VERIFICATION CONTROLLER
 * Allows candidates and institutions to verify official examination results by Certificate ID.
 */

import { dataAdapter } from './services/dataAdapter.js';

export class ExamVerificationController {
  constructor() {
    this.certificates = [];
  }

  async init() {
    try {
      this.certificates = await dataAdapter.getTable('Certificates');
      this.bindSearchForm();

      // Check if URL has ?cert=
      const params = new URLSearchParams(window.location.search);
      const certParam = params.get('cert') || params.get('id');
      if (certParam) {
        const input = document.getElementById('cert-search-input');
        if (input) input.value = certParam;
        this.lookupCertificate(certParam);
      }
    } catch (err) {
      console.error('[ExamVerificationController] Failed to initialize:', err);
    }
  }

  bindSearchForm() {
    const form = document.getElementById('cert-verify-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = document.getElementById('cert-search-input').value.trim();
      if (query) {
        this.lookupCertificate(query);
      }
    });
  }

  lookupCertificate(query) {
    const clean = query.toUpperCase().trim();
    const resultContainer = document.getElementById('cert-result-container');
    if (!resultContainer) return;

    const cert = this.certificates.find(c => 
      c.certNumber.toUpperCase() === clean || 
      c.candidateName.toUpperCase().includes(clean)
    );

    if (cert) {
      resultContainer.innerHTML = `
        <div style="background: var(--color-gallery-white); border: 2px solid var(--color-cinnabar); border-radius: var(--radius-lg); padding: 32px; box-shadow: var(--shadow-card); animation: fadeIn 0.3s ease;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
            <div style="display: flex; gap: 8px; align-items: center;">
              <span class="seal-badge seal-badge-gold">Official Grade Credential</span>
              <span class="seal-badge">${cert.status}</span>
            </div>
            <span style="font-family: monospace; font-size: 13px; font-weight: 700; color: var(--color-ink-muted);">
              CERT: ${cert.certNumber}
            </span>
          </div>

          <div class="grid grid-cols-2" style="gap: 20px; margin-bottom: 24px; border-bottom: 1px solid var(--color-paper-border); padding-bottom: 20px;">
            <div>
              <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--color-ink-muted); display: block; margin-bottom: 4px;">Candidate Name (考生姓名):</span>
              <h3 style="font-size: 20px; color: var(--color-ink-black); margin: 0;">${cert.candidateName}</h3>
            </div>
            <div>
              <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--color-ink-muted); display: block; margin-bottom: 4px;">Exam Discipline (考级门类):</span>
              <h4 style="font-size: 18px; color: var(--color-cinnabar); margin: 0;">${cert.discipline} (${cert.discipline_zh || ''})</h4>
            </div>
          </div>

          <div class="grid grid-cols-3" style="gap: 16px; background: var(--color-warm-ivory); border: 1px solid var(--color-paper-border); border-radius: var(--radius-md); padding: 16px; margin-bottom: 24px;">
            <div>
              <span style="font-size: 11px; font-weight: 700; color: var(--color-ink-muted); display: block;">Awarded Level:</span>
              <strong style="font-size: 16px; color: var(--color-ink-black);">Grade ${cert.grade} (${cert.tier})</strong>
            </div>
            <div>
              <span style="font-size: 11px; font-weight: 700; color: var(--color-ink-muted); display: block;">Assessment Verdict:</span>
              <strong style="font-size: 15px; color: var(--color-cobalt);">${cert.verdict}</strong>
            </div>
            <div>
              <span style="font-size: 11px; font-weight: 700; color: var(--color-ink-muted); display: block;">Date of Issue:</span>
              <strong style="font-size: 14px; color: var(--color-ink-charcoal);">${cert.issueDate}</strong>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; font-size: 12px; color: var(--color-ink-muted);">
            <span>🏛️ Examination Venue: <strong>${cert.centre}</strong></span>
            <span>Accredited by Singapore Nanyang Artists Society & FAS</span>
          </div>
        </div>
      `;
    } else {
      resultContainer.innerHTML = `
        <div style="background: var(--color-gallery-white); border: 1px dashed var(--color-cinnabar); border-radius: var(--radius-md); padding: 32px; text-align: center;">
          <div style="font-size: 40px; margin-bottom: 12px;">🔍</div>
          <h3 style="font-size: 20px; margin-bottom: 6px;">Certificate Record Not Found</h3>
          <p style="font-size: 14px; color: var(--color-ink-muted); max-width: 500px; margin: 0 auto 16px;">
            We could not find an active certificate matching <code>${query}</code>. Please verify the certificate number (e.g. <code>NAS-2025-CLG-0891</code>) or contact the secretariat.
          </p>
          <a href="tel:+6568990828" class="btn btn-outline btn-sm">Enquire With Registry Office (+65 6899 0828)</a>
        </div>
      `;
    }
  }
}

export const examVerificationController = new ExamVerificationController();

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    examVerificationController.init();
  });
}
