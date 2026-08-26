/**
 * NANYANG ARTISTS SOCIETY — PWA REGISTRATION & OFFLINE ENGINE
 */

export function initPWA() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // Find the relative path to sw.js depending on subdirectory depth
      const depth = window.location.pathname.split('/').filter(Boolean).length;
      const swPath = depth > 0 ? '../'.repeat(depth) + 'sw.js' : './sw.js';
      
      navigator.serviceWorker.register(swPath).then(registration => {
        console.log('[NAS PWA] ServiceWorker registered with scope:', registration.scope);
      }).catch(err => {
        console.log('[NAS PWA] ServiceWorker registration failed:', err);
      });
    });
  }

  // Handle PWA Install Prompt
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installBanner = document.getElementById('pwa-install-banner');
    if (installBanner) {
      installBanner.style.display = 'flex';
      const installBtn = document.getElementById('pwa-install-btn');
      if (installBtn) {
        installBtn.addEventListener('click', () => {
          installBanner.style.display = 'none';
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('[NAS PWA] User accepted the install prompt');
            }
            deferredPrompt = null;
          });
        });
      }
    }
  });
}
