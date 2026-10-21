/* ==========================================================
   DBFLIX app logic - you normally don't need to edit this,
   except the CATS list below (menu names + page intro text).
   ========================================================== */
(function () {
  'use strict';

  const D = window.DBFLIX || { site: {}, about: {}, items: [] };
  const SITE = D.site || {};
  const ITEMS = (D.items || []).slice();
  const NAME = SITE.name || 'DBFLIX';

  /* Menu order + page intro text.
     type 'poster' = tall posters, 'wide' = 16:9 thumbnails */
  const CATS = [
    { key: 'home', label: 'Home' },
    { key: 'movies', label: 'Movies', type: 'poster',
      desc: 'Browse movies, watch a preview, and find where each title is available.' },
    { key: 'series', label: 'Series', type: 'poster',
      desc: 'Browse series, watch a preview or episode, and find where each title is available.' },
    { key: 'music-videos', label: 'Music Videos', type: 'wide',
      desc: 'Press play and sing along - right here on the site.' },
    { key: 'events', label: 'Events', type: 'wide',
      desc: 'Concerts, fan meetings, premieres and more - past and upcoming.' },
    { key: 'guestings', label: 'Guestings / Interviews', type: 'wide',
      desc: 'Talk-show guestings, interviews and press moments.' },
    { key: 'vlogs', label: 'Vlogs', type: 'wide',
      desc: 'Daily life, trips and everything in between.' },
    { key: 'behind-the-scenes', label: 'Behind the Scenes', type: 'wide',
      desc: 'The moments the cameras almost missed.' },
    { key: 'fanmade', label: 'Fanmade', type: 'wide',
      desc: 'Edits, tributes and creations made by the fans.' },
    { key: 'about', label: 'About' }
  ];
  const LISTING = CATS.filter(c => c.key !== 'home' && c.key !== 'about');

  const $ = sel => document.querySelector(sel);
  const app = $('#app'), nav = $('#nav'), header = $('#header');
  const menuBtn = $('#menuBtn'), modal = $('#modal'), modalBox = $('#modalBox');

  /* ---------- helpers ---------- */
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, ch =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

  const catOf = key => CATS.find(c => c.key === key);

  function ytId(v) {
    if (!v) return '';
    const s = String(v).trim();
    const m = s.match(/(?:v=|youtu\.be\/|embed\/|shorts\/|live\/)([A-Za-z0-9_-]{11})/);
    if (m) return m[1];
    return /^[A-Za-z0-9_-]{11}$/.test(s) ? s : '';
  }
  const ytThumb = (id, big) => 'https://i.ytimg.com/vi/' + id + '/' + (big ? 'maxresdefault' : 'hqdefault') + '.jpg';
  const ytWatch = id => 'https://www.youtube.com/watch?v=' + id;
  const embed = (id, autoplay, title) =>
    '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?rel=0&autoplay=' + (autoplay ? 1 : 0) + '" ' +
    'title="' + esc(title) + '" loading="lazy" ' +
    'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ' +
    'referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';

  const byDateDesc = (a, b) => (b.date || '').localeCompare(a.date || '');

  function cardImage(it) {
    const isPoster = (catOf(it.category) || {}).type === 'poster';
    const yt = ytId(it.youtube);
    if (isPoster) return it.poster || it.banner || (yt ? ytThumb(yt) : '');
    return it.banner || (yt ? ytThumb(yt) : '') || it.poster || '';
  }

  function primary(it) {
    const cat = catOf(it.category) || {};
    const yt = ytId(it.youtube);
    if (it.streamUrl && cat.type !== 'poster' && !yt) {
      window.open(it.streamUrl, '_blank', 'noopener');
    } else {
      openModal(it.id);
    }
  }
  const canWatch = it => !!(it.streamUrl || ytId(it.youtube));

  /* ---------- card ---------- */
  function card(it) {
    const cat = catOf(it.category) || { type: 'wide', label: '' };
    const img = cardImage(it);
    const yt = ytId(it.youtube);
    let badge = '';
    if (cat.type === 'poster') {
      badge = it.streamUrl ? '<span class="badge">' + esc(it.platform || 'Streaming') + '</span>'
                           : '<span class="badge">Details</span>';
    }
    const sub = [cat.label, it.year || (it.date || '').slice(0, 4)].filter(Boolean).join(' · ');
    return '<article class="card ' + (cat.type === 'poster' ? 'poster' : 'wide') + '" data-id="' + esc(it.id) +
      '" tabindex="0" role="button" aria-label="' + esc(it.title) + '">' +
      '<div class="thumbwrap">' +
        (img ? '<img class="thumb" loading="lazy" src="' + esc(img) + '" alt="" data-title="' + esc(it.title) + '">'
             : '<div class="ph">' + esc(it.title) + '</div>') +
        badge +
        (yt ? '<span class="play" aria-hidden="true">▶</span>' : '') +
        '<button class="info-btn" type="button" data-info="' + esc(it.id) + '" aria-label="Details for ' + esc(it.title) + '">i</button>' +
      '</div>' +
      '<div class="card-meta"><h3>' + esc(it.title) + '</h3><p>' + esc(sub) + '</p></div>' +
    '</article>';
  }

  /* ---------- pages ---------- */
  let heroTimer = null, heroList = [], heroIdx = 0;

  function row(title, items, link) {
    return '<section class="row"><div class="row-head"><h2>' + esc(title) + '</h2>' +
      (link ? '<a href="#/' + link + '">See all ›</a>' : '') + '</div>' +
      '<div class="row-wrap"><button class="arrow left" type="button" aria-label="Scroll left">‹</button>' +
      '<div class="scroller">' + items.map(card).join('') + '</div>' +
      '<button class="arrow right" type="button" aria-label="Scroll right">›</button></div></section>';
  }

  function renderHome() {
    const latest = ITEMS.slice().sort(byDateDesc);
    let html = '<section class="hero" id="hero"></section><div class="rows">';
    if (latest.length) html += row('New on ' + NAME, latest.slice(0, 12), '');
    LISTING.forEach(c => {
      const list = ITEMS.filter(i => i.category === c.key).sort(byDateDesc);
      if (list.length) html += row(c.label, list, c.key);
    });
    html += '</div>';
    app.innerHTML = html;
    // "New on" row has no "See all" link
    app.querySelectorAll('.row-head a[href="#/"]').forEach(a => a.remove());

    heroList = ITEMS.filter(i => i.featured);
    if (!heroList.length) heroList = latest.slice(0, 3);
    heroIdx = 0;
    setHero(0);
    const hero = $('#hero');
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (heroList.length > 1 && !reduce) {
      startHero();
      hero.addEventListener('mouseenter', stopHero);
      hero.addEventListener('mouseleave', startHero);
    }
  }

  function startHero() { stopHero(); heroTimer = setInterval(() => setHero((heroIdx + 1) % heroList.length), 9000); }
  function stopHero() { if (heroTimer) { clearInterval(heroTimer); heroTimer = null; } }

  function setHero(i) {
    const hero = $('#hero');
    if (!hero) return;
    heroIdx = i;
    const it = heroList[i];
    if (!it) {
      hero.innerHTML = '<div class="hero-slide"><div class="hero-body"><h1>' + esc(NAME) + '</h1><p>' +
        esc(SITE.tagline || '') + '</p></div></div>';
      return;
    }
    const cat = catOf(it.category) || { label: '' };
    const yt = ytId(it.youtube);
    const src = it.banner || (yt ? ytThumb(yt, true) : '') || it.poster || '';
    const media = it.bannerVideo
      ? '<video src="' + esc(it.bannerVideo) + '" autoplay muted loop playsinline preload="metadata"' +
        (src ? ' poster="' + esc(src) + '"' : '') + '></video>'
      : src
        ? '<img src="' + esc(src) + '" alt="" ' + (yt ? 'data-hq="' + esc(ytThumb(yt)) + '"' : '') + '>'
        : '';
    hero.innerHTML =
      '<div class="hero-slide">' +
        '<div class="hero-media">' + media + '</div><div class="hero-shade"></div>' +
        '<div class="hero-body">' +
          '<span class="eyebrow">' + esc(cat.label) + '</span>' +
          '<h1>' + esc(it.title) + '</h1>' +
          (it.description ? '<p>' + esc(it.description) + '</p>' : '') +
          '<div class="hero-actions">' +
            (canWatch(it) ? '<button class="btn primary" type="button" data-act="play" data-id="' + esc(it.id) + '">▶ Watch</button>' : '') +
            '<button class="btn" type="button" data-act="info" data-id="' + esc(it.id) + '">ⓘ More info</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
      (heroList.length > 1
        ? '<div class="hero-dots">' + heroList.map((_, n) =>
            '<button class="dot' + (n === i ? ' active' : '') + '" type="button" data-dot="' + n + '" aria-label="Show featured ' + (n + 1) + '"></button>').join('') + '</div>'
        : '');
  }

  function renderCategory(c) {
    const items = ITEMS.filter(i => i.category === c.key).sort(byDateDesc);
    app.innerHTML =
      '<section class="page"><header class="page-head"><h1>' + esc(c.label) + '</h1><p>' + esc(c.desc || '') + '</p></header>' +
      (items.length
        ? '<div class="grid ' + (c.type === 'poster' ? '' : 'wide') + '">' + items.map(card).join('') + '</div>'
        : '<div class="empty">Nothing here yet — check back soon.</div>') +
      '</section>';
  }

  function renderAbout() {
    const a = D.about || {};
    const paras = (a.text || []).map(p => '<p>' + esc(p) + '</p>').join('');
    const links = (a.links || []).map(l =>
      '<a class="btn" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + '</a>').join('');
    app.innerHTML =
      '<section class="page"><div class="about-grid">' +
        '<div class="about-img">' +
          (a.image ? '<img class="thumb" src="' + esc(a.image) + '" alt="" data-title="' + esc(NAME) + '">'
                   : '<div class="ph">' + esc(NAME) + '</div>') +
        '</div>' +
        '<div class="about-text"><h1>' + esc(a.title || 'About') + '</h1>' + paras +
          (links ? '<div class="links">' + links + '</div>' : '') +
        '</div>' +
      '</div></section>';
  }

  /* ---------- modal ---------- */
  let lastFocus = null;

  function modalHTML(it) {
    const cat = catOf(it.category) || { label: '' };
    const isPoster = cat.type === 'poster';
    const yt = ytId(it.youtube);
    const eps = (it.episodes || []).filter(e => ytId(e.youtube));
    const startId = yt || (eps[0] ? ytId(eps[0].youtube) : '');

    let media;
    if (it.previewVideo) {
      const tabs = startId
        ? '<div class="modal-media-tabs"><button class="active" type="button" data-media-source="preview">Video preview</button>' +
          '<button type="button" data-media-source="youtube">YouTube</button></div>'
        : '';
      media = tabs + '<div class="modal-media" id="modalMedia"><video src="' + esc(it.previewVideo) +
        '" controls autoplay muted playsinline preload="metadata"></video></div>';
    } else if (startId) {
      media = '<div class="modal-media" id="modalMedia">' + embed(startId, !!yt, it.title) + '</div>';
    } else {
      const src = it.banner || it.poster;
      media = '<div class="modal-media">' + (src
        ? '<img class="thumb" src="' + esc(src) + '" alt="" data-title="' + esc(it.title) + '">'
        : '<div class="ph">' + esc(it.title) + '</div>') + '</div>';
    }

    const meta = [cat.label, it.year, it.duration].filter(Boolean).join(' · ');

    const watchOptions = (it.watchOptions || []).filter(option => option && option.url);
    if (it.streamUrl && !watchOptions.some(option => option.url === it.streamUrl)) {
      watchOptions.unshift({ url: it.streamUrl, platform: it.platform || 'streaming site' });
    }
    let actions = watchOptions.map((option, index) =>
      '<a class="btn' + (index === 0 ? ' primary' : '') + '" href="' + esc(option.url) +
      '" target="_blank" rel="noopener">▶ Watch on ' + esc(option.platform || 'streaming site') + '</a>').join('');
    if (startId) {
      actions += '<a class="btn' + (watchOptions.length ? '' : ' primary') + '" id="modalYt" href="' + esc(ytWatch(startId)) +
        '" target="_blank" rel="noopener">Watch on YouTube ↗</a>';
    }

    let notice = '';
    if (!watchOptions.length && !it.streamUrl && isPoster) {
      notice = it.whereToWatch || 'Not available on streaming yet. Details coming soon.';
    } else if (it.whereToWatch) {
      notice = it.whereToWatch;
    }

    const det = it.details
      ? '<dl class="details">' + Object.keys(it.details).map(k =>
          '<dt>' + esc(k) + '</dt><dd>' + esc(it.details[k]) + '</dd>').join('') + '</dl>' : '';
    const tags = (it.tags || []).length
      ? '<div class="tags">' + it.tags.map(t => '<span class="tag">' + esc(t) + '</span>').join('') + '</div>' : '';
    const epList = eps.length
      ? '<h3 class="eps-title">Episodes</h3><ol class="eps">' + eps.map((e, n) =>
          '<li><button class="ep' + (!yt && n === 0 ? ' active' : '') + '" type="button" data-ep="' + esc(ytId(e.youtube)) + '">' +
          '<span>' + (n + 1) + '</span><span>' + esc(e.title || ('Episode ' + (n + 1))) + '</span></button></li>').join('') + '</ol>' : '';

    return '<button class="modal-close" type="button" aria-label="Close">×</button>' + media +
      '<div class="modal-body"><h2>' + esc(it.title) + '</h2>' +
      (meta ? '<p class="modal-meta">' + esc(meta) + '</p>' : '') +
      (it.description ? '<p class="modal-desc">' + esc(it.description) + '</p>' : '') +
      (actions ? '<div class="modal-actions">' + actions + '</div>' : '') +
      (notice ? '<div class="notice"><strong>Where to watch:</strong> ' + esc(notice) + '</div>' : '') +
      det + tags + epList + '</div>';
  }

  function openModal(id) {
    const it = ITEMS.find(i => i.id === id);
    if (!it) return;
    lastFocus = document.activeElement;
    modalBox.dataset.itemId = it.id;
    modalBox.innerHTML = modalHTML(it);
    modal.hidden = false;
    modal.scrollTop = 0;
    document.body.classList.add('no-scroll');
    const close = modalBox.querySelector('.modal-close');
    if (close) close.focus();
  }

  function closeModal() {
    if (modal.hidden) return;
    modal.hidden = true;
    modalBox.innerHTML = ''; // removes the iframe so the video stops
    document.body.classList.remove('no-scroll');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* ---------- router ---------- */
  function route() {
    stopHero();
    closeModal();
    const key = (location.hash.replace(/^#\/?/, '').split(/[?\/]/)[0] || 'home').toLowerCase();
    const c = catOf(key) || CATS[0];

    if (c.key === 'home') renderHome();
    else if (c.key === 'about') renderAbout();
    else renderCategory(c);

    nav.querySelectorAll('a').forEach(a => a.classList.toggle('active', a.dataset.key === c.key));
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.title = (c.key === 'home' ? NAME : c.label + ' • ' + NAME);
    window.scrollTo(0, 0);
    onScroll();
  }

  function onScroll() { header.classList.toggle('solid', window.scrollY > 20); }

  /* ---------- static shell ---------- */
  function buildShell() {
    nav.innerHTML = CATS.map(c => '<a href="#/' + c.key + '" data-key="' + c.key + '">' + esc(c.label) + '</a>').join('');
    $('#logo').innerHTML = SITE.logoImage ? '<img src="' + esc(SITE.logoImage) + '" alt="' + esc(NAME) + '">' : esc(NAME);
    $('#footer').innerHTML =
      '<p class="foot-logo">' + esc(NAME) + '</p>' +
      (SITE.footer ? '<p>' + esc(SITE.footer) + '</p>' : '') +
      '<p>© ' + new Date().getFullYear() + ' ' + esc(NAME) + '</p>';
  }

  /* ---------- events ---------- */
  document.addEventListener('click', e => {
    const t = e.target;

    const info = t.closest('.info-btn');
    if (info) { e.stopPropagation(); openModal(info.dataset.info); return; }

    const arrow = t.closest('.arrow');
    if (arrow) {
      const sc = arrow.parentElement.querySelector('.scroller');
      sc.scrollBy({ left: (arrow.classList.contains('left') ? -1 : 1) * sc.clientWidth * 0.85, behavior: 'smooth' });
      return;
    }

    const act = t.closest('[data-act]');
    if (act) {
      const it = ITEMS.find(i => i.id === act.dataset.id);
      if (it) { if (act.dataset.act === 'play') primary(it); else openModal(it.id); }
      return;
    }

    const dot = t.closest('.dot');
    if (dot) { setHero(Number(dot.dataset.dot)); return; }

    const ep = t.closest('.ep');
    if (ep) {
      const media = $('#modalMedia'), yl = $('#modalYt');
      const title = (modalBox.querySelector('h2') || {}).textContent || '';
      if (media) media.innerHTML = embed(ep.dataset.ep, true, title);
      if (yl) yl.href = ytWatch(ep.dataset.ep);
      modalBox.querySelectorAll('.ep').forEach(b => b.classList.toggle('active', b === ep));
      modalBox.querySelectorAll('[data-media-source]').forEach(b =>
        b.classList.toggle('active', b.dataset.mediaSource === 'youtube'));
      return;
    }

    const mediaSource = t.closest('[data-media-source]');
    if (mediaSource) {
      const it = ITEMS.find(item => item.id === modalBox.dataset.itemId);
      const media = $('#modalMedia');
      if (it && media) {
        const id = ytId(it.youtube) || ytId((it.episodes || []).find(episode => ytId(episode.youtube))?.youtube);
        media.innerHTML = mediaSource.dataset.mediaSource === 'preview'
          ? '<video src="' + esc(it.previewVideo) + '" controls autoplay muted playsinline preload="metadata"></video>'
          : embed(id, true, it.title);
        modalBox.querySelectorAll('[data-media-source]').forEach(button =>
          button.classList.toggle('active', button === mediaSource));
      }
      return;
    }

    if (t.closest('.modal-close') || t === modal) { closeModal(); return; }

    const cardEl = t.closest('.card');
    if (cardEl) {
      const it = ITEMS.find(i => i.id === cardEl.dataset.id);
      if (it) primary(it);
      return;
    }

    if (!t.closest('#nav') && !t.closest('#menuBtn')) {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('card')) {
      e.preventDefault();
      const it = ITEMS.find(i => i.id === e.target.dataset.id);
      if (it) primary(it);
    }
  });

  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  // Broken image? Fall back (YouTube HQ thumbnail, or a styled placeholder).
  document.addEventListener('error', e => {
    const t = e.target;
    if (!(t instanceof HTMLImageElement)) return;
    if (t.dataset.hq) { const hq = t.dataset.hq; t.removeAttribute('data-hq'); t.src = hq; return; }
    if (t.classList.contains('thumb')) {
      const d = document.createElement('div');
      d.className = 'ph';
      d.textContent = t.dataset.title || '';
      t.replaceWith(d);
    } else {
      t.remove();
    }
  }, true);

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('hashchange', route);

  buildShell();
  route();
})();
