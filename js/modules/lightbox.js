/**
 * NANYANG ARTISTS SOCIETY — ARTWORK & POSTER LIGHTBOX VIEWER
 */

export function openLightbox(imageSrc, caption = '') {
  let lightbox = document.getElementById('nas-lightbox-modal');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'nas-lightbox-modal';
    lightbox.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(17, 24, 39, 0.92);
      backdrop-filter: blur(8px);
      z-index: var(--z-modal, 400);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
      animation: fadeIn 0.2s ease;
    `;
    lightbox.innerHTML = `
      <button id="nas-lightbox-close" style="position: absolute; top: 24px; right: 24px; background: none; border: none; color: #FFFFFF; font-size: 32px; cursor: pointer; padding: 8px;">&times;</button>
      <div style="max-width: 90vw; max-height: 80vh; display: flex; align-items: center; justify-content: center;">
        <img id="nas-lightbox-img" src="" alt="" style="max-width: 100%; max-height: 80vh; border-radius: 8px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); object-fit: contain;">
      </div>
      <p id="nas-lightbox-caption" style="color: #E5E7EB; margin-top: 16px; font-size: 15px; text-align: center; max-width: 600px; font-family: var(--font-serif);"></p>
    `;
    document.body.appendChild(lightbox);

    lightbox.addEventListener('click', (e) => {
      if (e.target.id === 'nas-lightbox-modal' || e.target.id === 'nas-lightbox-close') {
        lightbox.style.display = 'none';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.style.display !== 'none') {
        lightbox.style.display = 'none';
      }
    });
  }

  const img = document.getElementById('nas-lightbox-img');
  const cap = document.getElementById('nas-lightbox-caption');
  img.src = imageSrc;
  img.alt = caption;
  cap.textContent = caption;
  lightbox.style.display = 'flex';
}
