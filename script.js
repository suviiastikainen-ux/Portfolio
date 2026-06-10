// ============================================================
// DATA
// ============================================================

// BEGIN_DEFAULT_DATA
const DEFAULT_DATA = {
  "hero": {
    "navLogo": "suvii.astikainen@gmail.com",
    "name": "Suvi Astikainen",
    "title": "",
    "description": "",
    "footerCopyright": "© 2026 Suvi Astikainen",
    "footerSub": "Rakennettu käsin HTML, CSS & JS"
  },
  "projects": [
    {
      "id": "1",
      "type": "",
      "title": "L'Oréal Paris Campaign Launch",
      "description": "",
      "tags": [],
      "url": "#",
      "detailContent": "L'Oréal Paris — Garnier Vitamin C Sorbet Cream Launch Campaign\nWorked as part of a Nordic team on the pan-Scandinavian launch campaign for Garnier's Vitamin C Sorbet Cream, with a particular focus on representing the Finnish market alongside my local team.\n\n- Managed community engagement across thousands of videos as part of the product launch, monitoring conversations around the product and brand\n- Responded to comments and messages in a way consistent with the brand voice and the image L'Oréal wanted to project\n- Tracked product performance and analysed which content formats and messages drove the strongest engagement, with a specific focus on the Finnish market\n- Compiled findings and reported insights directly to L'Oréal as part of the broader Nordic reporting structure\n- The campaign ran for an intensive five-week period, delivered strong results, and received excellent client feedback\n\nA demanding but rewarding project that built real experience in social listening, brand-aligned community management, and working within a multi-market team structure on a major international brand.",
      "media": [
        {
          "id": 1780982946121.995,
          "type": "image",
          "src": "Images/IMG_7690.jpg",
          "caption": ""
        }
      ],
      "thumbnailId": 1780982946121.995
    },
    {
      "id": "2",
      "type": "",
      "title": "PR Packages",
      "description": "",
      "tags": [],
      "url": "#",
      "detailContent": "Influencer PR Package Production\nDesigned and assembled PR packages for influencer seeding campaigns, balancing creative presentation with real budget constraints.\n\n- Sourced materials and packaging solutions to create visually compelling unboxing experiences\n- Made creative decisions around presentation, ensuring the packages felt on-brand and gift-worthy within the available budget\n\nA small but detail-oriented part of influencer marketing where the physical presentation is the first impression the brand makes.",
      "media": [
        {
          "id": 1780983400829.9963,
          "type": "image",
          "src": "Images/IMG_6887.jpg",
          "caption": ""
        },
        {
          "id": 1780983437448.3713,
          "type": "image",
          "src": "Images/IMG_7691.jpg",
          "caption": ""
        },
        {
          "id": 1780983456965.498,
          "type": "image",
          "src": "Images/IMG_7693.jpg",
          "caption": ""
        }
      ],
      "thumbnailId": 1780983437448.3713
    },
    {
      "id": "3",
      "type": "fazer April fools",
      "title": "Fazer is a Record Company",
      "description": "",
      "tags": [],
      "url": "#",
      "detailContent": "Fazer April Fools' Campaign — Production Assistant\nContributed to Fazer's spring 2026 April Fools' campaign, in which Fazer announced itself as Finland's largest record label, which was technically true.\n\n- Helped build chocolate vinyl display pieces for the PR event.\n- Assisted on-site at the PR event: directing guests, coordinating influencer arrivals, and distributing personalised PR packages.\n- Supported the team on set during the filming of KAJ's social media video tied to the campaign.\n- Handled various hands-on tasks throughout the day to keep the event running smoothly.\n\nA fun and memorable project to be part of and a good reminder that even in a supporting role, the details you handle on the ground matter to the whole.",
      "media": [
        {
          "id": 1780983543588.9485,
          "type": "image",
          "src": "Images/IMG_7050.jpg",
          "caption": ""
        },
        {
          "id": 1781024862199.5293,
          "type": "video",
          "src": "Images/sininen klippi.mov",
          "caption": ""
        }
      ],
      "thumbnailId": null
    },
    {
      "id": "1781024881792",
      "type": "Commercial add",
      "title": "Dumble Crispy Twins",
      "description": "",
      "tags": [],
      "url": "#",
      "media": [
        {
          "id": 1781024912729.4902,
          "type": "video",
          "src": "Images/Fazer Dumle Crispy Twins SOME 10sec 1920x1080.mp4",
          "caption": ""
        },
        {
          "id": 1781073991493.697,
          "type": "image",
          "src": "Images/14.30.01.jpg",
          "caption": ""
        }
      ],
      "detailContent": "Fazer Dumle Crispy Twins — Campaign Production Assistant\nSupported the full production of a multi-format advertising campaign for Fazer's Dumle Crispy Twins product launch.\n\n- Handled casting for the campaign, sourcing and selecting the on-screen talent.- Selected the voice-over artist and collaborated closely with them to align the delivery with the brand's tone and ensure correct pronunciation\n- Assisted in directing actors on set alongside the director of photography and a fellow coordinator\n- The campaign spanned multiple formats, as a TV commercial, outdoor digital displays, and social media video content produced for both Finnish and Swedish markets, requiring a solid understanding of how format and platform shape creative execution\n\nOverall, the project was a valuable exercise in end-to-end production thinking: what it takes to bring an advertising campaign to life and how many moving parts need to align to do it well",
      "thumbnailId": 1781073991493.697
    }
  ]
};
// END_DEFAULT_DATA

function loadData() {
  try {
    const stored = localStorage.getItem('portfolioData');
    if (!stored) return JSON.parse(JSON.stringify(DEFAULT_DATA));
    const d = JSON.parse(stored);
    // Migrate: add new fields if missing
    if (!d.hero.footerCopyright) d.hero.footerCopyright = DEFAULT_DATA.hero.footerCopyright;
    if (!d.hero.footerSub) d.hero.footerSub = DEFAULT_DATA.hero.footerSub;
    (d.projects || []).forEach(p => {
      if (!p.detailContent) p.detailContent = '';
      if (!p.media) p.media = [];
      if (!('thumbnailId' in p)) p.thumbnailId = null;
    });
    return d;
  } catch { return JSON.parse(JSON.stringify(DEFAULT_DATA)); }
}

function persistToStorage() {
  try {
    localStorage.setItem('portfolioData', JSON.stringify(data));
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      alert('Tallennustila täynnä! Poista joitain kuvia ja yritä uudelleen.');
    }
  }
}

async function exportScript() {
  // Build export data: swap base64 srcs for file paths
  const imageFiles = [];
  const exportData = JSON.parse(JSON.stringify(data));
  exportData.projects.forEach(p => {
    (p.media || []).forEach(m => {
      if (m.type === 'image' && m.src.startsWith('data:')) {
        const filename = m.filename || `image-${m.id}.jpg`;
        imageFiles.push({ filename, dataUrl: m.src });
        m.src = `Images/${filename}`;
      }
    });
  });

  const dataStr = JSON.stringify(exportData, null, 2);
  const replacement = `// BEGIN_DEFAULT_DATA\nconst DEFAULT_DATA = ${dataStr};\n// END_DEFAULT_DATA`;

  let scriptText = null, htmlText = null, cssText = null;
  try {
    const [sRes, hRes, cRes] = await Promise.all([fetch('script.js'), fetch('index.html'), fetch('style.css')]);
    if (sRes.ok) scriptText = (await sRes.text()).replace(/\/\/ BEGIN_DEFAULT_DATA[\s\S]*?\/\/ END_DEFAULT_DATA/, replacement);
    if (hRes.ok) htmlText = await hRes.text();
    if (cRes.ok) cssText = await cRes.text();
  } catch {}

  // No Images — download just script.js as before
  if (imageFiles.length === 0) {
    if (scriptText) {
      downloadBlob('script.js', scriptText, 'application/javascript');
      showToast('script.js ladattu — korvaa vanha tiedosto ja vie kolme tiedostoa hostille.');
    } else {
      navigator.clipboard.writeText(`const DEFAULT_DATA = ${dataStr};`).then(() => {
        showToast('DEFAULT_DATA kopioitu leikepöydälle — liitä se script.js:n alkuun.');
      });
    }
    return;
  }

  // Images exist — create zip
  const zip = new JSZip();
  if (scriptText) zip.file('script.js', scriptText);
  if (htmlText)   zip.file('index.html', htmlText);
  if (cssText)    zip.file('style.css', cssText);
  const imgFolder = zip.folder('Images');
  for (const { filename, dataUrl } of imageFiles) {
    imgFolder.file(filename, dataUrl.split(',')[1], { base64: true });
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  downloadBlob('portfolio.zip', blob, 'application/zip');
  showToast(`portfolio.zip ladattu — pura ja lataa kaikki tiedostot GitHubiin.`);
}

function downloadBlob(filename, content, mime) {
  const url = URL.createObjectURL(new Blob([content], { type: mime }));
  const a = Object.assign(document.createElement('a'), { href: url, download: filename });
  a.click();
  URL.revokeObjectURL(url);
}

function showToast(msg) {
  const t = Object.assign(document.createElement('div'), { className: 'toast', textContent: msg });
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('visible'));
  setTimeout(() => { t.classList.remove('visible'); setTimeout(() => t.remove(), 300); }, 4000);
}

// ============================================================
// UTILS
// ============================================================

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function selectAll(el) {
  const range = document.createRange();
  range.selectNodeContents(el);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

function getEditableText(el) {
  return el.innerHTML
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/div>/gi, '\n').replace(/<\/p>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n').trim();
}

function getEmbedUrl(url) {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s?]+)/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vi = url.match(/vimeo\.com\/(\d+)/);
  if (vi) return `https://player.vimeo.com/video/${vi[1]}`;
  return null;
}

function isVideoUrl(url) {
  return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(url);
}

// ============================================================
// CARD COVER
// ============================================================

function getProjectCoverSrc(project) {
  const media = project.media || [];
  if (project.thumbnailId) {
    const thumb = media.find(m => m.id === project.thumbnailId && m.type === 'image');
    if (thumb) return thumb.src;
  }
  const img = media.find(m => m.type === 'image');
  return img ? img.src : null;
}

function applyCardCover(card, project) {
  const src = getProjectCoverSrc(project);
  if (!src) {
    card.style.backgroundImage = '';
    card.classList.remove('has-cover');
    return;
  }
  const set = () => {
    card.style.backgroundImage = `url("${src.replace(/"/g, '%22')}")`;
    card.classList.add('has-cover');
  };
  if (src.startsWith('data:')) {
    set();
  } else {
    const img = new Image();
    img.onload = set;
    img.onerror = () => { card.style.backgroundImage = ''; card.classList.remove('has-cover'); };
    img.src = src;
  }
}

function updateCardCover(project) {
  const card = document.querySelector(`#workGrid .work-card[data-id="${CSS.escape(project.id)}"]`);
  if (card) applyCardCover(card, project);
}

function syncGridLayout() {
  const grid = document.getElementById('workGrid');
  grid.dataset.count = grid.querySelectorAll('.work-card').length;
}

// ============================================================
// MAIN PAGE
// ============================================================

function renderPage() {
  document.querySelectorAll('[data-e]').forEach(el => {
    const val = data.hero[el.dataset.e];
    if (val !== undefined) el.textContent = val;
  });
  const grid = document.getElementById('workGrid');
  grid.innerHTML = '';
  data.projects.forEach(p => grid.appendChild(createCard(p)));
  syncGridLayout();
}

function createCard(project) {
  const article = document.createElement('article');
  article.className = 'work-card';
  article.dataset.id = project.id;

  const tagsHTML = project.tags.map(t => `
    <div class="tag-wrap">
      <span class="tag tag-sm">${esc(t)}</span>
      <button class="remove-tag" type="button" aria-label="Poista tagi">×</button>
    </div>`).join('');

  article.innerHTML = `
    <div class="work-card-header">
      <span class="work-type" data-field="type">${esc(project.type)}</span>
      <div class="card-controls">
        <input class="url-input" type="url" value="${esc(project.url)}" placeholder="https://…">
        <button class="delete-card" type="button" aria-label="Poista projekti">×</button>
      </div>
      <a href="${esc(project.url) || '#'}" class="work-link" target="_blank" rel="noopener" aria-label="Avaa projekti">↗</a>
    </div>
    <h3 class="work-title" data-field="title">${esc(project.title)}</h3>
    <p class="work-description" data-field="description">${esc(project.description)}</p>
    <div class="work-tags">${tagsHTML}<button class="add-tag" type="button">+</button></div>
  `;

  applyCardCover(article, project);

  // Open detail (non-edit mode only)
  article.addEventListener('click', e => {
    if (editMode) return;
    if (e.target.closest('.work-link')) return;
    openProject(project.id);
  });

  article.querySelector('.url-input').addEventListener('input', function () {
    article.querySelector('.work-link').href = this.value || '#';
  });

  article.querySelector('.delete-card').addEventListener('click', () => {
    if (confirm('Poistetaanko projekti?')) { article.remove(); syncGridLayout(); }
  });

  article.querySelectorAll('.remove-tag').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.tag-wrap').remove());
  });

  article.querySelector('.add-tag').addEventListener('click', () => {
    const wrap = document.createElement('div');
    wrap.className = 'tag-wrap';
    wrap.innerHTML = `<span class="tag tag-sm" contenteditable="true">Uusi</span><button class="remove-tag" type="button">×</button>`;
    wrap.querySelector('.remove-tag').addEventListener('click', () => wrap.remove());
    article.querySelector('.add-tag').before(wrap);
    const tag = wrap.querySelector('.tag');
    tag.focus(); selectAll(tag);
  });

  return article;
}

// ============================================================
// DETAIL PAGE
// ============================================================

let currentProject = null;
let currentView = 'main';

function openProject(id) {
  currentProject = data.projects.find(p => p.id === id);
  if (!currentProject) return;

  currentView = 'detail';
  renderDetail(currentProject);

  const dv = document.getElementById('detailView');
  dv.scrollTop = 0;
  dv.classList.add('open');
  document.body.classList.add('detail-open');
  document.documentElement.style.overflow = 'hidden';
  history.pushState({ projectId: id }, '', `#project/${id}`);
}

function closeProject() {
  if (editMode) exitEditMode();

  currentView = 'main';
  currentProject = null;

  document.getElementById('detailView').classList.remove('open');
  document.body.classList.remove('detail-open');
  document.documentElement.style.overflow = '';
  history.pushState(null, '', window.location.pathname + window.location.search);
}

function renderDetail(project) {
  // Type
  const typeEl = document.getElementById('detailType');
  typeEl.textContent = project.type;

  // Title
  const titleEl = document.getElementById('detailTitle');
  titleEl.textContent = project.title;

  // Link
  const link = document.getElementById('detailLink');
  link.href = project.url || '#';
  link.style.display = (project.url && project.url !== '#') ? '' : 'none';

  // Tags
  renderDetailTags(project.tags);

  // Long description
  const contentEl = document.getElementById('detailContent');
  contentEl.textContent = project.detailContent || '';
  contentEl.contentEditable = 'false';
  syncPlaceholder(contentEl);

  // Media
  renderMedia(project.media || []);
}

function renderDetailTags(tags) {
  const el = document.getElementById('detailTags');
  el.innerHTML = tags.map(t => `
    <div class="tag-wrap">
      <span class="tag tag-sm">${esc(t)}</span>
      <button class="remove-tag" type="button">×</button>
    </div>`).join('') +
    '<button class="add-tag" type="button" aria-label="Lisää tagi">+</button>';

  el.querySelectorAll('.remove-tag').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.tag-wrap').remove());
  });

  el.querySelector('.add-tag').addEventListener('click', () => {
    const wrap = document.createElement('div');
    wrap.className = 'tag-wrap';
    const ce = editMode ? ' contenteditable="true"' : '';
    wrap.innerHTML = `<span class="tag tag-sm"${ce}>Uusi</span><button class="remove-tag" type="button">×</button>`;
    wrap.querySelector('.remove-tag').addEventListener('click', () => wrap.remove());
    el.querySelector('.add-tag').before(wrap);
    const tag = wrap.querySelector('.tag');
    tag.focus(); selectAll(tag);
  });
}

function syncPlaceholder(el) {
  if (el.textContent.trim() === '') el.classList.add('is-empty');
  else el.classList.remove('is-empty');
}

// ============================================================
// MEDIA
// ============================================================

function renderMedia(mediaItems) {
  const grid = document.getElementById('detailMedia');
  grid.innerHTML = '';
  mediaItems.forEach(item => grid.appendChild(createMediaItem(item)));
  if (editMode) refreshThumbnailButtons();
}

function refreshThumbnailButtons() {
  if (!currentProject) return;
  document.querySelectorAll('#detailMedia .media-item').forEach(div => {
    const id = Number(div.dataset.mediaId);
    const btn = div.querySelector('.set-thumbnail-btn');
    if (!btn) return;
    const isActive = currentProject.thumbnailId === id ||
      (!currentProject.thumbnailId && currentProject.media && currentProject.media.length > 0 && currentProject.media.find(m => m.type === 'image') && currentProject.media.find(m => m.type === 'image').id === id);
    btn.classList.toggle('is-thumbnail', isActive);
    btn.textContent = isActive ? '★ Thumbnail' : '☆ Aseta thumbnail';
  });
}

function createMediaItem(item) {
  const div = document.createElement('div');
  div.className = 'media-item' + (item.type === 'embed' ? ' is-embed' : '');
  div.dataset.mediaId = item.id;

  let mediaHTML;
  if (item.type === 'embed') {
    mediaHTML = `<div class="embed-wrap"><iframe src="${esc(item.src)}" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe></div>`;
  } else if (item.type === 'video') {
    mediaHTML = `<div class="embed-wrap"><video src="${esc(item.src)}" controls preload="metadata"></video></div>`;
  } else {
    mediaHTML = `<img src="${esc(item.src)}" alt="${esc(item.caption || '')}" loading="lazy">`;
  }

  div.innerHTML = `
    ${mediaHTML}
    <div class="media-footer">
      <p class="media-caption">${esc(item.caption || '')}</p>
      <div class="media-actions">
        ${item.type === 'image' ? `<button class="set-thumbnail-btn" type="button">☆ Aseta thumbnail</button>` : ''}
        <button class="media-delete" type="button" aria-label="Poista">×</button>
      </div>
    </div>`;

  // Thumbnail selection
  const thumbBtn = div.querySelector('.set-thumbnail-btn');
  if (thumbBtn) {
    thumbBtn.addEventListener('click', () => {
      if (!currentProject) return;
      currentProject.thumbnailId = item.id;
      persistToStorage();
      updateCardCover(currentProject);
      refreshThumbnailButtons();
    });
  }

  // Live-save caption to data
  const captionEl = div.querySelector('.media-caption');
  captionEl.addEventListener('input', () => {
    item.caption = captionEl.textContent.trim();
    const img = div.querySelector('img');
    if (img) img.alt = item.caption;
  });

  div.querySelector('.media-delete').addEventListener('click', () => {
    if (!currentProject) return;
    currentProject.media = currentProject.media.filter(m => m.id !== item.id);
    renderMedia(currentProject.media);
    if (editMode) {
      document.querySelectorAll('#detailMedia .media-caption').forEach(c => {
        c.contentEditable = 'true';
      });
    }
    updateCardCover(currentProject);
  });

  return div;
}


function addUrlToMedia(url) {
  url = url.trim();
  if (!url) return;
  // Bare filename → Images/ folder
  if (!/^(https?:\/\/|data:|\/|\.\/)/i.test(url) && !url.includes('/')) {
    url = `Images/${url}`;
  }
  const embedSrc = getEmbedUrl(url);
  let type = 'image', src = url;
  if (embedSrc)        { type = 'embed'; src = embedSrc; }
  else if (isVideoUrl(url)) { type = 'video'; }
  const item = { id: Date.now() + Math.random(), type, src, caption: '' };
  if (!currentProject.media) currentProject.media = [];
  currentProject.media.push(item);
  const el = createMediaItem(item);
  document.getElementById('detailMedia').appendChild(el);
  if (editMode) el.querySelector('.media-caption').contentEditable = 'true';
  if (type === 'image') updateCardCover(currentProject);
  document.getElementById('mediaUrlInput').value = '';
}

function initUploadZone() {
  const urlInput = document.getElementById('mediaUrlInput');
  document.getElementById('addMediaUrl').addEventListener('click', () => addUrlToMedia(urlInput.value));
  urlInput.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); addUrlToMedia(urlInput.value); } });
}

// ============================================================
// EDIT MODE
// ============================================================

let editMode = false;

const SINGLELINE = [
  '[data-e="navLogo"]', '[data-e="name"]', '[data-e="title"]',
  '[data-e="footerCopyright"]', '[data-e="footerSub"]',
  '[data-field="type"]', '[data-field="title"]',
  '#detailTitle', '#detailType', '.tag.tag-sm'
];

function enterEditMode() {
  editMode = true;
  document.body.classList.add('edit-mode');
  document.getElementById('editToggle').textContent = 'Valmis ✓';
  if (currentView === 'main') enableMainEditing();
  else enableDetailEditing();
}

function exitEditMode() {
  document.getElementById('editToggle').textContent = 'Muokkaa';
  if (currentView === 'main') { disableMainEditing(); saveMainEdits(); }
  else { disableDetailEditing(); saveDetailEdits(); }
  editMode = false;
  document.body.classList.remove('edit-mode');
}

function enableMainEditing() {
  document.querySelectorAll('[data-e]').forEach(el => el.contentEditable = 'true');
  document.querySelectorAll('.work-card [data-field]').forEach(el => el.contentEditable = 'true');
  document.querySelectorAll('.work-card .tag.tag-sm').forEach(el => el.contentEditable = 'true');
}

function disableMainEditing() {
  document.querySelectorAll('[contenteditable="true"]').forEach(el => el.contentEditable = 'false');
  document.querySelectorAll('.work-card').forEach(card => {
    card.querySelector('.work-link').href = card.querySelector('.url-input').value || '#';
  });
}

function saveMainEdits() {
  document.querySelectorAll('[data-e]').forEach(el => {
    data.hero[el.dataset.e] = el.textContent.trim();
  });
  const newProjects = [];
  document.querySelectorAll('#workGrid .work-card').forEach(card => {
    const id = card.dataset.id;
    const existing = data.projects.find(p => p.id === id) || {};
    const tags = [...card.querySelectorAll('.tag-wrap .tag.tag-sm')]
      .map(t => t.textContent.trim()).filter(Boolean);
    newProjects.push({
      ...existing, id,
      type: card.querySelector('[data-field="type"]').textContent.trim(),
      title: card.querySelector('[data-field="title"]').textContent.trim(),
      description: card.querySelector('[data-field="description"]').textContent.trim(),
      tags, url: card.querySelector('.url-input').value.trim()
    });
  });
  data.projects = newProjects;
  persistToStorage();
}

function enableDetailEditing() {
  ['detailTitle', 'detailType', 'detailContent'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.contentEditable = 'true';
  });
  document.querySelectorAll('#detailTags .tag.tag-sm').forEach(el => el.contentEditable = 'true');
  document.querySelectorAll('#detailMedia .media-caption').forEach(el => el.contentEditable = 'true');
  refreshThumbnailButtons();
}

function disableDetailEditing() {
  document.querySelectorAll('#detailView [contenteditable="true"]').forEach(el => {
    el.contentEditable = 'false';
  });
  syncPlaceholder(document.getElementById('detailContent'));
}

function saveDetailEdits() {
  if (!currentProject) return;

  currentProject.type = document.getElementById('detailType').textContent.trim();
  currentProject.title = document.getElementById('detailTitle').textContent.trim();
  currentProject.tags = [...document.querySelectorAll('#detailTags .tag-wrap .tag.tag-sm')]
    .map(t => t.textContent.trim()).filter(Boolean);
  currentProject.detailContent = getEditableText(document.getElementById('detailContent'));

  // Update link in detail view
  const link = document.getElementById('detailLink');
  link.style.display = (currentProject.url && currentProject.url !== '#') ? '' : 'none';

  // Sync project into data.projects (it's already a reference, but replace to be safe)
  const idx = data.projects.findIndex(p => p.id === currentProject.id);
  if (idx !== -1) data.projects[idx] = currentProject;

  persistToStorage();
  renderPage(); // Update card in background
}

// ============================================================
// EVENT LISTENERS
// ============================================================

document.getElementById('editToggle').addEventListener('click', () => {
  if (editMode) exitEditMode();
  else enterEditMode();
});

document.getElementById('backBtn').addEventListener('click', closeProject);
document.getElementById('exportBtn').addEventListener('click', exportScript);

document.getElementById('addProject').addEventListener('click', () => {
  const p = {
    id: String(Date.now()), type: 'Tyyppi', title: 'Uusi projekti',
    description: 'Kuvaus projektista.', tags: ['Tag'],
    url: '#', detailContent: '', media: []
  };
  const card = createCard(p);
  document.getElementById('workGrid').appendChild(card);
  syncGridLayout();
  card.querySelectorAll('[data-field]').forEach(el => el.contentEditable = 'true');
  card.querySelectorAll('.tag.tag-sm').forEach(el => el.contentEditable = 'true');
  const title = card.querySelector('[data-field="title"]');
  title.focus(); selectAll(title);
  card.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// Prevent newlines in single-line fields
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.isContentEditable) {
    if (SINGLELINE.some(sel => e.target.matches(sel))) {
      e.preventDefault();
      e.target.blur();
    }
  }
  if (e.key === 'Escape' && currentView === 'detail') closeProject();
});

// Placeholder sync for detail content
document.getElementById('detailContent').addEventListener('input', function () {
  syncPlaceholder(this);
});

// Browser back button
window.addEventListener('popstate', () => {
  if (currentView === 'detail') {
    if (editMode) exitEditMode();
    currentView = 'main';
    currentProject = null;
    document.getElementById('detailView').classList.remove('open');
    document.body.classList.remove('detail-open');
    document.documentElement.style.overflow = '';
  }
});

// ============================================================
// ADMIN UNLOCK — näppäinyhdistelmä: E E E
// ============================================================

(function initAdminUnlock() {
  let seq = '', timer = null;

  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
    if (e.key === 'e' || e.key === 'E') {
      seq += 'e';
      clearTimeout(timer);
      timer = setTimeout(() => { seq = ''; }, 700);
      if (seq === 'eee') {
        seq = '';
        promptUnlock();
      }
    } else {
      seq = '';
    }
  });

  function promptUnlock() {
    const stored = localStorage.getItem('portfolioAdminPw');
    if (!stored) {
      const pw = prompt('Aseta muokkaustilan salasana:');
      if (!pw || !pw.trim()) return;
      const pw2 = prompt('Vahvista salasana:');
      if (pw !== pw2) { alert('Salasanat eivät täsmää.'); return; }
      localStorage.setItem('portfolioAdminPw', btoa(encodeURIComponent(pw)));
      unlock();
    } else {
      const pw = prompt('Salasana:');
      if (!pw) return;
      if (btoa(encodeURIComponent(pw)) !== stored) {
        alert('Väärä salasana.');
        return;
      }
      unlock();
    }
  }

  function unlock() {
    document.body.classList.add('admin-unlocked');
    sessionStorage.setItem('adminUnlocked', '1');
    showToast('Muokkaustila avattu — paina "Muokkaa" aloittaaksesi.');
  }

  // Palauta istunnon kirjautuminen
  if (sessionStorage.getItem('adminUnlocked')) {
    document.body.classList.add('admin-unlocked');
  }
})();

// ============================================================
// THEME
// ============================================================

const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

themeToggle.addEventListener('click', () => {
  applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeIcon.textContent = theme === 'dark' ? '○' : '◐';
  localStorage.setItem('theme', theme);
}

// ============================================================
// INIT
// ============================================================

const data = loadData();
renderPage();
initUploadZone();

// Handle initial URL hash (direct link to project)
const hash = window.location.hash;
if (hash.startsWith('#project/')) {
  openProject(hash.replace('#project/', ''));
}
