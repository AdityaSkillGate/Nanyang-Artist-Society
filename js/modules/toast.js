/**
 * NANYANG ARTISTS SOCIETY — ACCESSIBLE TOAST NOTIFICATIONS
 */

export function showToast(message, type = 'info', duration = 3500) {
  let toastContainer = document.getElementById('nas-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'nas-toast-container';
    toastContainer.style.cssText = `
      position: fixed;
      top: 24px;
      right: 24px;
      z-index: var(--z-toast, 500);
      display: flex;
      flex-direction: column;
      gap: 8px;
      pointer-events: none;
    `;
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const typeColors = {
    info: 'var(--color-secondary, #1E40AF)',
    success: 'var(--color-success, #10B981)',
    warning: 'var(--color-warning, #F59E0B)',
    error: 'var(--color-primary, #C92A2A)'
  };

  toast.style.cssText = `
    background: var(--color-ink-black, #111827);
    color: #FFFFFF;
    border-left: 4px solid ${typeColors[type] || typeColors.info};
    padding: 12px 18px;
    border-radius: 6px;
    box-shadow: var(--shadow-lg, 0 10px 15px -3px rgba(0,0,0,0.1));
    font-size: 14px;
    font-weight: 500;
    pointer-events: auto;
    animation: fadeInDown 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    align-items: center;
    gap: 8px;
    max-width: 380px;
  `;

  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}
