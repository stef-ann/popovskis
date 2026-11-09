/**
 * script.js
 * 1.  Pixel sprites (SVG, drawn cell by cell)
 * 2.  Loader
 * 3.  Reveal on scroll + pixel meters
 * 4.  Header hide/show + menu drawer
 * 5.  Work / Life mode
 * 6.  Light / dark theme
 * 7.  Language (EN / MK)
 * 8.  Tabs
 * 9.  Detail panel
 * 10. Gallery + lightbox
 * 11. Live time & weather (College Park, MD)
 * 12. Spotify (Lanyard) now playing
 */

document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const body = document.body;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const store = {
        get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } },
        set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { } },
    };

    /* ---------- 1. Pixel sprites ---------- */
    const SVG_NS = 'http://www.w3.org/2000/svg';

    function buildSprite(el) {
        if (el.querySelector('svg')) return;
        const rows = (window.SPRITES || {})[el.dataset.sprite];
        if (!rows) return;
        const w = Math.max(...rows.map(r => r.length));
        const h = rows.length;
        const svg = document.createElementNS(SVG_NS, 'svg');
        svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
        svg.setAttribute('aria-hidden', 'true');
        rows.forEach((row, y) => {
            [...row].forEach((c, x) => {
                if (c !== '#') return;
                const r = document.createElementNS(SVG_NS, 'rect');
                r.setAttribute('x', x);
                r.setAttribute('y', y);
                r.setAttribute('width', 1.02); // tiny overlap hides hairline seams
                r.setAttribute('height', 1.02);
                r.style.transitionDelay = `${Math.round(Math.random() * 700)}ms`;
                svg.appendChild(r);
            });
        });
        el.dataset.cells = `${w} × ${h}`;
        el.appendChild(svg);
    }

    function drawSprites(scope) {
        scope.querySelectorAll('.sprite').forEach(s => s.classList.add('is-drawn'));
    }

    document.querySelectorAll('.sprite[data-sprite]').forEach(buildSprite);

    /* ---------- 2. Loader ---------- */
    const loader = document.getElementById('loader');
    const heroSprite = document.querySelector('.hero-sprite');

    function finishLoader() {
        if (loader) loader.classList.add('is-done');
        if (heroSprite) setTimeout(() => drawSprites(heroSprite), 150);
    }

    let seenLoader = false;
    try { seenLoader = sessionStorage.getItem('sp-loaded') === '1'; } catch (e) { }

    if (loader && !seenLoader && !reduceMotion) {
        const field = document.getElementById('loader-field');
        const bar = document.getElementById('loader-bar');
        for (let i = 0; i < 70; i++) {
            const p = document.createElement('i');
            p.style.left = `${Math.random() * 100}%`;
            p.style.top = `${Math.random() * 100}%`;
            p.style.animationDelay = `${Math.random() * 0.8}s`;
            field.appendChild(p);
        }
        const cells = Array.from({ length: 24 }, () => bar.appendChild(document.createElement('i')));
        let n = 0;
        const tick = setInterval(() => {
            if (cells[n]) cells[n].classList.add('on');
            n++;
            if (n >= cells.length) {
                clearInterval(tick);
                setTimeout(finishLoader, 150);
            }
        }, 38);
        try { sessionStorage.setItem('sp-loaded', '1'); } catch (e) { }
    } else {
        if (loader) loader.remove();
        finishLoader();
    }

    /* ---------- 3. Reveal + meters ---------- */
    document.querySelectorAll('.meter').forEach(m => {
        const on = Math.round((parseInt(m.dataset.level, 10) || 0) / 10);
        for (let i = 0; i < 10; i++) {
            const c = document.createElement('i');
            if (i < on) {
                c.className = 'on';
                c.style.transitionDelay = `${300 + i * 60}ms`;
            }
            m.appendChild(c);
        }
        m.setAttribute('role', 'img');
        m.setAttribute('aria-label', `${m.dataset.level}%`);
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-in');
            drawSprites(entry.target);
            revealObserver.unobserve(entry.target);
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* ---------- 4. Header + menu ---------- */
    const header = document.getElementById('site-header');
    const menuBtn = document.getElementById('menu-btn');
    const drawer = document.getElementById('menu-drawer');
    let lastY = window.scrollY;

    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (!body.classList.contains('menu-open')) {
            header.classList.toggle('is-hidden', y > lastY && y > 200);
        }
        lastY = y;
    }, { passive: true });

    function setMenu(open) {
        body.classList.toggle('menu-open', open);
        body.classList.toggle('is-locked', open);
        menuBtn.setAttribute('aria-expanded', String(open));
        drawer.setAttribute('aria-hidden', String(!open));
        header.classList.remove('is-hidden');
    }

    menuBtn.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

    /* ---------- 5. Work / Life mode ---------- */
    const modeBtns = document.querySelectorAll('[data-mode]');
    const heroGear = document.getElementById('hero-gear');

    function setMode(mode, { scroll = true } = {}) {
        root.classList.toggle('life-mode', mode === 'life');
        modeBtns.forEach(b => b.classList.toggle('is-active', b.dataset.mode === mode));
        store.set('sp-mode', mode);
        if (heroGear) {
            heroGear.classList.toggle('is-spinning', mode === 'life');
        }
        if (scroll) window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    }

    modeBtns.forEach(b => b.addEventListener('click', () => setMode(b.dataset.mode)));
    if (heroGear) {
        heroGear.addEventListener('click', () => {
            setMode(root.classList.contains('life-mode') ? 'work' : 'life', { scroll: false });
        });
    }
    setMode(root.classList.contains('life-mode') ? 'life' : 'work', { scroll: false });

    /* ---------- 6. Theme ---------- */
    document.querySelectorAll('.theme-toggle').forEach(btn => btn.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        root.setAttribute('data-theme', next);
        store.set('sp-theme', next);
    }));

    /* ---------- 7. Language ---------- */
    const i18nEls = document.querySelectorAll('[data-i18n]');
    const english = new Map();
    i18nEls.forEach(el => english.set(el, el.innerHTML)); // the HTML is the English source of truth
    const langBtns = document.querySelectorAll('[data-lang]');

    function setLanguage(lang) {
        const dict = (window.translations || {})[lang] || {};
        i18nEls.forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.innerHTML = (lang !== 'en' && dict[key]) ? dict[key] : english.get(el);
        });
        langBtns.forEach(b => b.classList.toggle('is-active', b.dataset.lang === lang));
        root.setAttribute('lang', lang === 'mk' ? 'mk' : 'en');
        store.set('sp-lang', lang);
    }

    langBtns.forEach(b => b.addEventListener('click', () => setLanguage(b.dataset.lang)));
    if (store.get('sp-lang') === 'mk') setLanguage('mk');

    /* ---------- 8. Tabs ---------- */
    document.querySelectorAll('[data-tab]').forEach(btn => {
        btn.addEventListener('click', () => {
            const group = btn.closest('.seg');
            group.querySelectorAll('[data-tab]').forEach(b => {
                b.classList.toggle('is-active', b === btn);
                b.setAttribute('aria-selected', String(b === btn));
            });
            const panel = document.getElementById(btn.dataset.tab);
            Array.from(panel.parentElement.children).forEach(p => p.classList.toggle('is-active', p === panel));
            drawSprites(panel);
        });
    });

    /* ---------- 9. Detail panel ---------- */
    const panel = document.getElementById('project-modal');
    const panelBody = document.getElementById('modal-body');
    const panelClose = document.getElementById('panel-close');
    let lastFocus = null;

    function openPanel(card) {
        lastFocus = card;
        panelBody.innerHTML = '';

        const visual = document.createElement('div');
        visual.className = 'panel-visual';
        const img = card.querySelector('.card-visual img');
        const sprite = card.querySelector('.card-visual .sprite');
        if (img) {
            visual.appendChild(img.cloneNode());
        } else if (sprite) {
            const s = document.createElement('span');
            s.className = 'sprite';
            s.dataset.sprite = sprite.dataset.sprite;
            buildSprite(s);
            visual.appendChild(s);
            requestAnimationFrame(() => requestAnimationFrame(() => s.classList.add('is-drawn')));
        }
        panelBody.appendChild(visual);

        const title = document.createElement('h3');
        title.id = 'panel-title';
        title.textContent = card.querySelector('.card-title')?.textContent || '';
        panelBody.appendChild(title);

        const meta = card.querySelector('.card-meta');
        if (meta) panelBody.appendChild(meta.cloneNode(true));

        const sub = card.querySelector('.card-sub');
        if (sub) {
            const p = document.createElement('p');
            p.className = 'card-sub';
            p.textContent = sub.textContent;
            panelBody.appendChild(p);
        }

        const desc = card.querySelector('.card-desc');
        if (desc) {
            const p = document.createElement('p');
            p.className = 'panel-desc';
            p.textContent = desc.textContent;
            panelBody.appendChild(p);
        }

        if (card.dataset.details) {
            const d = document.createElement('div');
            d.innerHTML = card.dataset.details;
            panelBody.appendChild(d);
        }

        panel.classList.add('is-open');
        panel.setAttribute('aria-hidden', 'false');
        body.classList.add('is-locked');
        panelClose.focus({ preventScroll: true });
    }

    function closePanel() {
        panel.classList.remove('is-open');
        panel.setAttribute('aria-hidden', 'true');
        body.classList.remove('is-locked');
        if (lastFocus) lastFocus.focus({ preventScroll: true });
    }

    document.querySelectorAll('.card--link').forEach(card => {
        card.addEventListener('click', () => openPanel(card));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openPanel(card);
            }
        });
    });

    panelClose.addEventListener('click', closePanel);
    panel.addEventListener('click', (e) => { if (e.target === panel) closePanel(); });
    panelBody.addEventListener('click', (e) => {
        if (e.target.tagName !== 'IMG' || !e.target.closest('.details-gallery')) return;
        const imgs = Array.from(panelBody.querySelectorAll('.details-gallery img'));
        openLightbox(imgs.indexOf(e.target), imgs.map(i => ({ src: i.getAttribute('src'), alt: i.alt })));
    });

    /* ---------- 10. Gallery + lightbox ---------- */
    const galleryGrid = document.getElementById('gallery-grid');
    const galleryFilters = document.getElementById('gallery-filters');
    const galleryCounter = document.getElementById('gallery-counter');
    const galleryEmpty = document.getElementById('gallery-empty');
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    let lbItems = [];
    let lbIndex = 0;
    let photos = [];
    let activeCategory = 'all';

    const cfg = window.galleryConfig || { categories: [], photos: [] };
    const catKey = (k) => String(k || '').toLowerCase();
    const catLabel = (k) => (cfg.categories.find(c => catKey(c.key) === catKey(k)) || {}).label || k;

    function renderGallery() {
        if (!galleryGrid) return;
        const list = activeCategory === 'all' ? photos : photos.filter(p => catKey(p.category) === activeCategory);
        galleryGrid.innerHTML = '';
        galleryEmpty.hidden = list.length > 0;
        galleryCounter.textContent = activeCategory === 'all'
            ? `${photos.length} photos`
            : `${list.length} / ${photos.length} photos`;

        list.forEach((photo, i) => {
            const li = document.createElement('li');
            li.className = 'card card--photo';
            li.tabIndex = 0;
            li.setAttribute('role', 'button');
            li.innerHTML = `
                <div class="card-visual"><img loading="lazy" alt=""></div>
                <div class="card-body"><p class="card-title"></p><p class="card-meta"></p></div>`;
            const img = li.querySelector('img');
            img.src = photo.src;
            img.alt = photo.alt || '';
            li.querySelector('.card-title').textContent = (photo.alt || '').trim();
            li.querySelector('.card-meta').textContent = `${String(i + 1).padStart(2, '0')} · ${catLabel(photo.category)}`;
            img.addEventListener('error', () => {
                // Drop photos whose file is missing so the grid never shows a broken image.
                photos = photos.filter(p => p !== photo);
                renderGallery();
            }, { once: true });
            const open = () => openLightbox(i, list);
            li.addEventListener('click', open);
            li.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
            galleryGrid.appendChild(li);
        });
    }

    if (galleryGrid) {
        photos = [...cfg.photos];
        const usedCats = new Set(photos.map(p => catKey(p.category)));
        cfg.categories
            .filter(c => catKey(c.key) === 'all' || usedCats.has(catKey(c.key)))
            .forEach((c, i) => {
                const b = document.createElement('button');
                b.className = `seg-btn${i === 0 ? ' is-active' : ''}`;
                b.textContent = c.label;
                b.dataset.category = catKey(c.key);
                b.addEventListener('click', () => {
                    activeCategory = b.dataset.category;
                    galleryFilters.querySelectorAll('.seg-btn').forEach(x => x.classList.toggle('is-active', x === b));
                    renderGallery();
                });
                galleryFilters.appendChild(b);
            });
        renderGallery();
    }

    function showLightbox() {
        const item = lbItems[lbIndex];
        if (!item) return;
        lightboxImg.src = item.src;
        lightboxImg.alt = item.alt || '';
        lightboxCaption.textContent = `${String(lbIndex + 1).padStart(2, '0')} / ${String(lbItems.length).padStart(2, '0')} — ${item.alt || ''}`;
    }

    function openLightbox(index, items) {
        if (!items || !items.length || index < 0) return;
        lbItems = items;
        lbIndex = index;
        showLightbox();
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        body.classList.add('is-locked');
    }

    function closeLightbox() {
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        if (!panel.classList.contains('is-open')) body.classList.remove('is-locked');
    }

    const step = (d) => { lbIndex = (lbIndex + d + lbItems.length) % lbItems.length; showLightbox(); };
    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev').addEventListener('click', () => step(-1));
    document.getElementById('lightbox-next').addEventListener('click', () => step(1));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('is-open')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') step(-1);
            if (e.key === 'ArrowRight') step(1);
            return;
        }
        if (e.key !== 'Escape') return;
        if (panel.classList.contains('is-open')) closePanel();
        else if (body.classList.contains('menu-open')) setMenu(false);
    });

    /* ---------- 11. Live time & weather (College Park, MD) ---------- */
    const timeEl = document.getElementById('live-time');
    const weatherEl = document.getElementById('live-weather');
    const TZ = 'America/New_York';

    function updateClock() {
        const now = new Date();
        const t = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: TZ });
        const zone = now.toLocaleTimeString('en-US', { timeZone: TZ, timeZoneName: 'short' }).split(' ').pop();
        timeEl.textContent = `${t} ${zone}`;
    }
    updateClock();
    setInterval(updateClock, 15000);

    fetch('https://api.open-meteo.com/v1/forecast?latitude=38.9807&longitude=-76.9369&current_weather=true')
        .then(r => r.json())
        .then(d => {
            if (d && d.current_weather) weatherEl.textContent = `${Math.round(d.current_weather.temperature)}°C`;
        })
        .catch(() => { weatherEl.textContent = '--°C'; });

    /* ---------- 12. Spotify via Lanyard ---------- */
    // Shows live Spotify status if this Discord account has joined the Lanyard
    // Discord server (discord.gg/lanyard). Otherwise it stays on "Offline".
    const DISCORD_ID = '375297099023122433';
    const sp = {
        card: document.getElementById('spotify-card'),
        status: document.getElementById('spotify-status-text'),
        art: document.getElementById('spotify-art'),
        fallback: document.getElementById('spotify-art-fallback'),
        track: document.getElementById('spotify-track'),
        artist: document.getElementById('spotify-artist'),
    };

    function resetSpotify() {
        sp.card.classList.remove('is-playing');
        sp.status.textContent = 'Offline';
        sp.track.textContent = 'Not listening';
        sp.artist.textContent = 'Spotify';
        sp.art.hidden = true;
        sp.fallback.hidden = false;
    }

    let spotifyTimer = null;

    async function updateSpotify() {
        try {
            const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
            if (res.status === 404) {
                // Account isn't monitored by Lanyard — stop polling.
                clearInterval(spotifyTimer);
                return resetSpotify();
            }
            const json = await res.json();
            const s = json && json.success && json.data && json.data.listening_to_spotify && json.data.spotify;
            if (!s) return resetSpotify();
            sp.card.classList.add('is-playing');
            sp.status.textContent = 'Now playing';
            sp.track.textContent = s.song;
            sp.artist.textContent = s.artist;
            if (s.album_art_url) {
                sp.art.src = s.album_art_url;
                sp.art.hidden = false;
                sp.fallback.hidden = true;
            }
        } catch (e) {
            resetSpotify();
        }
    }

    if (sp.card) {
        resetSpotify();
        spotifyTimer = setInterval(updateSpotify, 15000);
        updateSpotify();
    }

    /* ---------- Misc ---------- */
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
});
