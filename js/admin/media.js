/**
 * NANYANG ARTISTS SOCIETY — ENTERPRISE MEDIA ASSET MANAGER
 * Folder Navigation, CDN URL Integration (Zero binary storage in sheets),
 * Alt Text/Caption Inspector, and Asset Lifecycle.
 */

export class MediaController {
  constructor() {
    this.currentFolder = 'all';
    this.selectedAsset = null;
    this.assets = [
      { id: 'MED-001', folder: 'courses', filename: 'calligraphy-brushwork-hero.jpg', url: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=1200&q=80', alt: 'Chinese Calligraphy brush strokes on xuan paper', caption: 'Master ink wash demonstration', size: '1.2 MB', dimensions: '1920x1080', category: 'Courses' },
      { id: 'MED-002', folder: 'competitions', filename: 'nanyang-star-2026-key-visual.jpg', url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80', alt: '5th Nanyang Star Infinite Horizons Key Poster', caption: 'Official 2026 International Art Competition Key Visual', size: '2.4 MB', dimensions: '2400x3200', category: 'Competitions' },
      { id: 'MED-003', folder: 'artists', filename: 'dr-teng-jiashu-portrait.jpg', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80', alt: 'Dr. Teng Jiashu President Portrait', caption: 'President & Artistic Director', size: '680 KB', dimensions: '800x800', category: 'Artists' },
      { id: 'MED-004', folder: 'gallery', filename: 'shanshui-ridge-dwelling.jpg', url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80', alt: 'Mountain Ridge Dwelling Oil on Canvas', caption: 'Japan Peony Master Gold Award Artwork', size: '3.1 MB', dimensions: '2800x2000', category: 'Gallery' },
      { id: 'MED-005', folder: 'documents', filename: 'specimen-grade-diploma.png', url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80', alt: 'National Grade Exam Certificate Specimen', caption: 'Anti-counterfeiting diploma layout', size: '940 KB', dimensions: '1600x1200', category: 'Documents' }
    ];
  }

  async renderMediaModule(container) {
    const filtered = this.currentFolder === 'all' 
      ? this.assets 
      : this.assets.filter(a => a.folder === this.currentFolder);

    const activeAsset = this.selectedAsset || filtered[0] || this.assets[0];

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <div>
          <h3 style="font-size: 16px; margin: 0 0 4px;">📁 Media Asset Manager & Cloudinary CDN</h3>
          <p style="font-size: 12px; color: #6B7280; margin: 0;">Organize visual assets, optimize CDN delivery, and inspect accessibility metadata.</p>
        </div>
        <button type="button" class="btn btn-primary btn-sm" id="upload-media-asset-btn">
          ☁️ Upload Media Asset
        </button>
      </div>

      <div class="media-layout">
        <!-- 1. Folders Sidebar -->
        <div class="media-folder-list">
          <div style="font-size: 11px; font-weight: 700; color: #9CA3AF; text-transform: uppercase; margin-bottom: 8px;">Folders</div>
          <div class="media-folder-item ${this.currentFolder === 'all' ? 'active' : ''}" data-folder="all">📂 All Assets (${this.assets.length})</div>
          <div class="media-folder-item ${this.currentFolder === 'courses' ? 'active' : ''}" data-folder="courses">🎨 /courses</div>
          <div class="media-folder-item ${this.currentFolder === 'competitions' ? 'active' : ''}" data-folder="competitions">⭐ /competitions</div>
          <div class="media-folder-item ${this.currentFolder === 'artists' ? 'active' : ''}" data-folder="artists">👨‍🎨 /artists</div>
          <div class="media-folder-item ${this.currentFolder === 'gallery' ? 'active' : ''}" data-folder="gallery">🖼️ /gallery</div>
          <div class="media-folder-item ${this.currentFolder === 'documents' ? 'active' : ''}" data-folder="documents">📄 /documents</div>
        </div>

        <!-- 2. Asset Grid -->
        <div class="media-asset-grid">
          ${filtered.map(asset => `
            <div class="media-card ${activeAsset && activeAsset.id === asset.id ? 'selected' : ''}" data-id="${asset.id}">
              <img src="${asset.url}" alt="${asset.alt}" class="media-thumb" onerror="this.onerror=null; this.src='../assets/logo/logo.png';">
              <div class="media-caption">${asset.filename}</div>
            </div>
          `).join('')}
        </div>

        <!-- 3. Asset Inspector Drawer -->
        <div class="media-inspector">
          <h4 style="font-size: 14px; margin: 0 0 12px;">Asset Metadata Inspector</h4>
          ${activeAsset ? `
            <div style="border-radius: 6px; overflow: hidden; margin-bottom: 12px; border: 1px solid var(--admin-border);">
              <img src="${activeAsset.url}" alt="${activeAsset.alt}" style="width: 100%; height: 140px; object-fit: cover;" onerror="this.onerror=null; this.src='../assets/logo/logo.png';">
            </div>

            <div style="font-size: 12px; margin-bottom: 14px;">
              <div><strong>Filename:</strong> ${activeAsset.filename}</div>
              <div style="color: #6B7280; margin-top: 2px;">${activeAsset.dimensions} · ${activeAsset.size}</div>
            </div>

            <div class="admin-field-group">
              <label class="admin-label">Alt Text (Accessibility) *</label>
              <input type="text" class="admin-input" id="asset-alt-input" value="${activeAsset.alt}">
            </div>

            <div class="admin-field-group">
              <label class="admin-label">Caption / Description</label>
              <input type="text" class="admin-input" id="asset-caption-input" value="${activeAsset.caption}">
            </div>

            <div class="admin-field-group">
              <label class="admin-label">Cloudinary CDN Link</label>
              <div style="display: flex; gap: 6px;">
                <input type="text" class="admin-input" value="${activeAsset.url}" readonly style="font-size: 11px;">
                <button type="button" class="btn btn-outline btn-sm" onclick="navigator.clipboard.writeText('${activeAsset.url}'); alert('CDN Link copied to clipboard!');">📋</button>
              </div>
            </div>

            <div style="display: flex; gap: 8px; margin-top: 20px;">
              <button type="button" class="btn btn-outline btn-sm" id="replace-media-btn">🔄 Replace</button>
              <button type="button" class="btn btn-outline btn-sm" style="color: #BA1B1D; border-color: #BA1B1D;" id="delete-media-btn">🗑️ Delete</button>
            </div>
          ` : '<p style="font-size: 12px; color: #6B7280;">Select an asset to view metadata.</p>'}
        </div>
      </div>
    `;

    // Bind Folder Clicks
    const folderItems = container.querySelectorAll('.media-folder-item');
    folderItems.forEach(item => {
      item.addEventListener('click', () => {
        this.currentFolder = item.getAttribute('data-folder');
        this.renderMediaModule(container);
      });
    });

    // Bind Asset Selection
    const assetCards = container.querySelectorAll('.media-card');
    assetCards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        this.selectedAsset = this.assets.find(a => a.id === id);
        this.renderMediaModule(container);
      });
    });

    // Bind Upload simulation
    const uploadBtn = document.getElementById('upload-media-asset-btn');
    if (uploadBtn) {
      uploadBtn.addEventListener('click', () => {
        const name = prompt('Enter image filename:', 'new-studio-artwork.jpg');
        if (name) {
          this.assets.unshift({
            id: `MED-${Date.now().toString().slice(-4)}`,
            folder: this.currentFolder === 'all' ? 'courses' : this.currentFolder,
            filename: name,
            url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
            alt: 'Uploaded asset visual',
            caption: 'Uploaded via Admin CMS Media Manager',
            size: '1.5 MB',
            dimensions: '1920x1080',
            category: 'Uploaded'
          });
          this.renderMediaModule(container);
        }
      });
    }
  }
}

export const mediaController = new MediaController();
