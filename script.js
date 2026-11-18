// ===== THEME =====
// The initial theme is set by the inline script in <head>, before first paint.
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const GHOST = {
  light: 'images/icons/ghost-toggle-light.svg',
  dark: 'images/icons/ghost-toggle-dark.svg',
};

const currentTheme = () => (root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

function syncThemeUI() {
  const theme = currentTheme();
  document.querySelectorAll('.js-ghost').forEach((img) => { img.src = GHOST[theme]; });
  themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}

themeToggle.addEventListener('click', () => {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) { /* storage blocked: theme just won't persist */ }
  syncThemeUI();
});

// Follow the OS setting until the visitor picks a theme themselves.
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch (err) {}
  if (saved) return;
  root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
  syncThemeUI();
});

syncThemeUI();

// ===== EMAIL =====
// The address is never written in the HTML, so scrapers that read the page source
// don't pick it up. It's put together only when someone clicks.
function initEmail() {
  const parts = ['aahil.d', 'outlook.com'];
  document.querySelectorAll('.js-email').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'mailto:' + parts.join('@');
    });
  });
}

// ===== REVEAL ON SCROLL =====
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in-view'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  items.forEach((el) => observer.observe(el));

  // Safety net: never leave content hidden if the observer stalls.
  setTimeout(() => items.forEach((el) => el.classList.add('in-view')), 2500);
}

// ===== ACTIVE NAV LINK =====
function initActiveNav() {
  const links = [...document.querySelectorAll('.nav-links a')];
  const sections = links
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => observer.observe(s));
}

// ===== PHOTOS =====
const PHOTOS = [
  "dsc00317.jpg",
  "dsc00369.jpg",
  "dsc00429.jpg",
  "dsc00457.jpg",
  "dsc02124.jpg",
  "dsc09409.jpg",
  "dsc09431.jpg",
  "img_20170327_165727.jpg",
  "img_20170414_135859.jpg",
  "img_20170521_145904.jpg",
  "img_20170702_122656.jpg",
  "img_20180521_112931.jpg",
  "img_20180521_184230.jpg",
  "img_20200902_112219.jpg",
  "img_20200903_135301.jpg",
  "img-20190803-wa0100.jpg",
  "img-20230924-wa0004.jpg",
  "ll-story-2.jpg",
  "pxl_20210722_020028257.mp.jpg",
  "pxl_20220701_134126837.mp.jpg",
  "pxl_20230923_235729101.jpg",
  "pxl_20231105_211047024.mp.jpg",
  "pxl_20231217_173911587-2.jpg",
  "pxl_20231217_175848215.jpg",
  "pxl_20231224_191336739.jpg",
  "pxl_20240428_173238619.mp.jpg",
  "pxl_20240428_183439269.mp.jpg",
  "pxl_20240428_183725406.mp.jpg",
  "pxl_20240428_183758750.mp.jpg",
  "pxl_20240428_190243087.mp.jpg",
  "pxl_20240428_224002621.mp.jpg",
  "pxl_20240428_225304738.mp.jpg",
  "pxl_20240622_172532357.mp.jpg",
  "pxl_20240810_113644872.mp.jpg",
  "pxl_20240901_175515893.mp.jpg",
  "pxl_20241006_183452967.mp.jpg",
  "pxl_20241013_210100865.mp.jpg",
  "pxl_20241013_221822171.mp.jpg",
  "pxl_20241117_232811051.mp-2.jpg",
  "pxl_20241130_202236987.mp.jpg",
  "pxl_20241228_195049979.mp.jpg",
  "pxl_20250111_193516750.mp.jpg",
  "pxl_20250202_033357692.mp.jpg",
  "pxl_20250222_225937001.mp-3.jpg",
  "pxl_20250413_181737553.mp.jpg",
  "pxl_20250413_191601970.mp.jpg",
  "pxl_20250419_072629006.mp.jpg",
  "pxl_20250425_032037701.mp.jpg",
  "pxl_20250504_015712792.mp.jpg",
  "pxl_20250518_142620207.mp.jpg",
  "pxl_20250629_205228724.mp.jpg",
  "pxl_20250718_161745656.jpg",
  "pxl_20250718_163558341.mp.jpg",
  "pxl_20250718_192438097.mp.jpg",
  "pxl_20250727_161849626.mp-2.jpg",
  "pxl_20250728_124621709.jpg",
  "pxl_20250728_131606553.mp.jpg",
  "pxl_20250817_193126186.mp-2.jpg",
  "pxl_20250823_213150836.mp.jpg",
  "pxl_20250830_133706984.mp.jpg",
  "pxl_20250830_202352738.mp.jpg",
  "pxl_20250831_024514852.mp.jpg",
  "pxl_20251002_041013410.mp.jpg",
  "pxl_20251005_214352450.mp.jpg",
  "pxl_20251005_234647705.jpg",
  "pxl_20251006_041123785.mp.jpg",
  "pxl_20251111_143216863.mp-2.jpg",
  "pxl_20251112_014726226.night.jpg",
  "pxl_20251227_035024397.mp.jpg",
  "pxl_20251228_003315614.mp.jpg",
  "pxl_20251229_193942453.mp-2.jpg",
  "pxl_20251230_225934007.mp.jpg",
  "pxl_20260111_152402990.jpg",
  "pxl_20260124_051220099.jpg",
  "received_10204672085957807.jpg",
  "received_1487574534659357.jpg"
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Pixel / phone filenames carry the date: PXL_20250718_..., IMG_20170327_..., IMG-20190803-...
function photoDate(name) {
  const m = name.match(/^(?:pxl|img)[_-](\d{4})(\d{2})(\d{2})/);
  return m ? `${MONTHS[Number(m[2]) - 1]} ${m[1]}` : '';
}

const shuffled = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const rand = (min, max) => min + Math.random() * (max - min);
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

// ===== PHOTO TABLE =====
// Desktop: polaroids scattered on a table, draggable. "Tidy up" lines them into a symmetrical grid.
// Small screens: a pile you tap through, since dragging fights with scrolling on a phone.
const photoState = { picks: [], open: -1 };

function initPhotoTable() {
  const table = document.getElementById('photoTable');
  const hint = document.getElementById('tableHint');
  const shuffleBtn = document.getElementById('shuffleBtn');
  const tidyBtn = document.getElementById('tidyBtn');
  if (!table) return;

  const smallQuery = window.matchMedia('(max-width: 640px)');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let cards = [];
  let tidy = false;
  let zTop = 1;

  const isPile = () => smallQuery.matches && !tidy;

  const HINTS = {
    scatter: 'Drag them around. Click one to look closer.',
    pile: 'Tap the top photo to see the next one.',
    tidy: 'Click one to look closer.',
  };

  function setPos(card, x, y, r) {
    card._x = x;
    card._y = y;
    card._r = r;
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
    card.style.setProperty('--r', `${r}deg`);
  }

  function build() {
    const count = smallQuery.matches ? 10 : 15;
    photoState.picks = shuffled(PHOTOS).slice(0, count);
    table.textContent = '';
    cards = photoState.picks.map((name, i) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'polaroid';
      card.setAttribute('aria-label', `Photo ${i + 1}${photoDate(name) ? ', ' + photoDate(name) : ''}`);

      const img = document.createElement('img');
      img.src = 'images/photos/' + name;
      img.alt = '';
      img.decoding = 'async';
      img.draggable = false;

      const cap = document.createElement('span');
      cap.className = 'cap';
      cap.innerHTML = `<span>No. ${String(i + 1).padStart(2, '0')}</span><span>${photoDate(name)}</span>`;

      card.append(img, cap);
      card._index = i;
      bindCard(card);
      table.appendChild(card);
      return card;
    });
    layout();
  }

  function layout() {
    if (!cards.length) return;
    table.classList.toggle('is-pile', isPile());
    table.classList.toggle('is-tidy', tidy);
    hint.textContent = tidy ? HINTS.tidy : isPile() ? HINTS.pile : HINTS.scatter;

    if (tidy) return layoutTidy();
    table.style.height = '';
    if (isPile()) return layoutPile();
    layoutScatter();
  }

  function layoutScatter() {
    const W = table.clientWidth;
    const H = table.clientHeight;
    const cw = cards[0].offsetWidth;
    const ch = cards[0].offsetHeight;
    const n = cards.length;
    // Jittered grid, so photos spread over the whole table instead of clumping.
    const cols = Math.max(1, Math.round(Math.sqrt((n * W) / H)));
    const rows = Math.ceil(n / cols);
    const cells = shuffled([...Array(cols * rows).keys()]).slice(0, n);
    const stepX = cols > 1 ? (W - cw) / (cols - 1) : 0;
    const stepY = rows > 1 ? (H - ch) / (rows - 1) : 0;

    cards.forEach((card, i) => {
      const c = cells[i] % cols;
      const r = Math.floor(cells[i] / cols);
      const x = clamp((cols > 1 ? c * stepX : (W - cw) / 2) + rand(-28, 28), 8, W - cw - 8);
      const y = clamp((rows > 1 ? r * stepY : (H - ch) / 2) + rand(-24, 24), 8, H - ch - 8);
      setPos(card, x, y, rand(-11, 11));
      card.style.zIndex = ++zTop;
    });
  }

  function layoutPile() {
    const W = table.clientWidth;
    const H = table.clientHeight;
    const cw = cards[0].offsetWidth;
    const ch = cards[0].offsetHeight;
    cards.forEach((card, i) => {
      setPos(card, (W - cw) / 2 + rand(-10, 10), (H - ch) / 2 + rand(-8, 8), rand(-8, 8));
      card.style.zIndex = cards.length - i;
    });
  }

  function layoutTidy() {
    const W = table.clientWidth;
    const cw = cards[0].offsetWidth;
    const ch = cards[0].offsetHeight;
    const gap = smallQuery.matches ? 12 : 20;
    const pad = smallQuery.matches ? 14 : 28;
    const n = cards.length;
    let cols = Math.max(1, Math.floor((W - pad * 2 + gap) / (cw + gap)));
    // Prefer a column count that divides evenly, for symmetry.
    for (let c = cols; c >= Math.max(2, cols - 1); c--) {
      if (n % c === 0) { cols = c; break; }
    }
    const rows = Math.ceil(n / cols);
    table.style.height = `${rows * ch + (rows - 1) * gap + pad * 2}px`;

    cards.forEach((card, i) => {
      const row = Math.floor(i / cols);
      const inRow = row === rows - 1 ? n - row * cols : cols; // centre a short last row
      const rowWidth = inRow * cw + (inRow - 1) * gap;
      const x = (W - rowWidth) / 2 + (i % cols) * (cw + gap);
      const y = pad + row * (ch + gap);
      setPos(card, x, y, 0);
      card.style.zIndex = 1;
    });
  }

  // Send the top card of the pile to the bottom.
  function toss(card) {
    if (card._tossing) return;
    card._tossing = true;
    const W = table.clientWidth;
    card.classList.add('is-tossed');
    setPos(card, card._x + W * 0.7, card._y - 30, card._r + 24);
    setTimeout(() => {
      const minZ = Math.min(...cards.map((c) => Number(c.style.zIndex) || 0));
      card.style.zIndex = minZ - 1;
      card.classList.remove('is-tossed');
      const cw = card.offsetWidth;
      const ch = card.offsetHeight;
      setPos(card, (W - cw) / 2 + rand(-10, 10), (table.clientHeight - ch) / 2 + rand(-8, 8), rand(-8, 8));
      card._tossing = false;
    }, reduceMotion ? 0 : 340);
  }

  function bindCard(card) {
    let start = null;

    card.addEventListener('pointerdown', (e) => {
      if (isPile() || e.button !== 0) return;
      start = { px: e.clientX, py: e.clientY, x: card._x, y: card._y, moved: false };
      card.setPointerCapture(e.pointerId);
      card.style.zIndex = ++zTop;
    });

    card.addEventListener('pointermove', (e) => {
      if (!start) return;
      const dx = e.clientX - start.px;
      const dy = e.clientY - start.py;
      if (!start.moved && Math.hypot(dx, dy) < 5) return;
      if (!start.moved) {
        start.moved = true;
        card.classList.add('is-dragging');
        if (tidy) setTidy(false, false); // moving a photo un-tidies the table
      }
      const W = table.clientWidth;
      const H = table.clientHeight;
      const x = clamp(start.x + dx, -card.offsetWidth * 0.3, W - card.offsetWidth * 0.7);
      const y = clamp(start.y + dy, -card.offsetHeight * 0.3, H - card.offsetHeight * 0.7);
      setPos(card, x, y, clamp(dx * 0.04, -8, 8) + (card._baseR ?? (card._baseR = card._r)));
    });

    const end = () => {
      if (!start) return;
      if (start.moved) {
        card._dragged = true;
        card._baseR = undefined;
      }
      card.classList.remove('is-dragging');
      start = null;
    };
    card.addEventListener('pointerup', end);
    card.addEventListener('pointercancel', end);

    card.addEventListener('click', () => {
      if (card._dragged) { card._dragged = false; return; }
      if (isPile()) toss(card);
      else openLightbox(card._index);
    });
  }

  function setTidy(on, relayout = true) {
    tidy = on;
    tidyBtn.setAttribute('aria-pressed', String(on));
    tidyBtn.querySelector('span').textContent = on ? 'Mess it up' : 'Tidy up';
    if (relayout) layout();
    else {
      table.classList.remove('is-tidy');
      table.style.height = '';
      hint.textContent = HINTS.scatter;
    }
  }

  shuffleBtn.addEventListener('click', build);
  tidyBtn.addEventListener('click', () => setTidy(!tidy));

  let resizeTimer;
  let lastWidth = table.clientWidth;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (table.clientWidth === lastWidth) return; // ignore mobile URL-bar height changes
      lastWidth = table.clientWidth;
      layout();
    }, 150);
  });
  smallQuery.addEventListener('change', build);

  build();
  initLightbox();
}

// ===== LIGHTBOX =====
function initLightbox() {
  const box = document.getElementById('lightbox');
  const img = document.getElementById('lbImg');
  const caption = document.getElementById('lbCaption');
  const closeBtn = document.getElementById('lbClose');
  let lastFocus = null;

  function show(i) {
    const n = photoState.picks.length;
    photoState.open = (i + n) % n;
    const name = photoState.picks[photoState.open];
    img.src = 'images/photos/large/' + name;
    const date = photoDate(name);
    caption.textContent = `No. ${String(photoState.open + 1).padStart(2, '0')}${date ? ' · ' + date : ''}`;
  }

  window.openLightbox = (i) => {
    lastFocus = document.activeElement;
    show(i);
    box.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  function close() {
    box.hidden = true;
    img.removeAttribute('src');
    photoState.open = -1;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  closeBtn.addEventListener('click', close);
  document.getElementById('lbPrev').addEventListener('click', () => show(photoState.open - 1));
  document.getElementById('lbNext').addEventListener('click', () => show(photoState.open + 1));
  box.addEventListener('click', (e) => {
    if (e.target === box) close();
  });
  document.addEventListener('keydown', (e) => {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(photoState.open - 1);
    else if (e.key === 'ArrowRight') show(photoState.open + 1);
  });

  // Swipe between photos on touch screens.
  let touchX = null;
  box.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) show(photoState.open + (dx < 0 ? 1 : -1));
    touchX = null;
  });
}

// ===== KONAMI CODE =====
function initKonami() {
  const sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let pos = 0;

  document.addEventListener('keydown', (e) => {
    if (photoState.open !== -1) return;
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    pos = key === sequence[pos] ? pos + 1 : (key === sequence[0] ? 1 : 0);
    if (pos !== sequence.length) return;
    pos = 0;
    new Audio('Audio/Grunt%20Birthday%20Party%20Sound%20Effect.mp3').play().catch(() => {});
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 90,
        spread: 360,
        startVelocity: 30,
        decay: 0.92,
        gravity: 0.8,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#F88436', '#DA3D20', '#FFF19B', '#3D45AA', '#B2D3D2', '#E4A5A2'],
      });
    }
  });
}

// ===== STARFIELD (dark mode only) =====
function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let stars = [];

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round((window.innerWidth * window.innerHeight) / 9000);
    stars = Array.from({ length: Math.min(count, 220) }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.1 + 0.2,
      base: Math.random() * 0.5 + 0.2,
      speed: Math.random() * 0.0008 + 0.0003,
      offset: Math.random() * Math.PI * 2,
      warm: Math.random() < 0.08,
    }));
  }

  function draw(t) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    if (currentTheme() === 'dark') {
      stars.forEach((s) => {
        const twinkle = reduceMotion ? 0 : Math.sin(t * s.speed * 1000 + s.offset);
        const alpha = Math.max(0, s.base + twinkle * 0.25);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.warm ? `rgba(248,132,54,${alpha})` : `rgba(255,255,255,${alpha})`;
        ctx.fill();
      });
    }
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(draw);
}

document.getElementById('year').textContent = new Date().getFullYear();
initEmail();
initReveal();
initActiveNav();
initPhotoTable();
initKonami();
initStarfield();
