// Simple i18n and behavior
(function() {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // Dynamic projects data
  const projects = {
    interior: [
      {
        title: { en: 'TRELUM Apartment', es: 'Apartamento TRELUM' },
        description: {
          en: 'Located in the exclusive Torre Trelum, this apartment was conceived as a retreat of peace and relaxation for its owner, envisioned as an ideal space for single living and entertaining, taking advantage of its commanding view to the south of San Salvador.\n\nThe main challenge was to integrate his belongings into the design without compromising the harmony of the space, achieving a sophisticated and masculine atmosphere without becoming overdone.',
          es: 'Ubicado en la exclusiva Torre Trelum, este apartamento fue concebido como un refugio de paz y relajación para su propietario, quien lo imaginó como un espacio ideal para la vida de soltero y el entretenimiento, aprovechando su imponente vista al sur de San Salvador.\n\nEl reto principal fue integrar sus pertenencias al diseño sin comprometer la armonía del espacio, logrando una atmósfera sofisticada y masculina sin caer en lo sobrecargado.'
        },
        preview_image: './assets/projects/trelum/trelum-1.jpg',
        images: [
          './assets/projects/trelum/trelum-1.jpg',
          './assets/projects/trelum/trelum-2.jpg',
          './assets/projects/trelum/trelum-3.jpg',
          './assets/projects/trelum/trelum-4.jpg',
          './assets/projects/trelum/trelum-5.jpg',
          './assets/projects/trelum/trelum-6.jpg'
        ]
      },
      {
        title: { en: 'OTAKU house', es: 'Casa OTAKU' },
        description: {
          en: 'An apartment designed for a young professional that blends social life and working from home. The public area was conceived as a flexible environment where the kitchen acts as the focal point, structuring the dynamics of hosting guests and working in a home office.\n\nThrough the strategic use of color and materials, the presence of the kitchen unit is emphasized as the organizing axis of the social area. The decision to concentrate the investment in this environment responds to its functional and symbolic value in everyday life.\nThe selection of furnishings and the layout respond to the need to create a functional, versatile environment with its own character.\nAt Bucle, we understand design as an accessible tool for expression, capable of reflecting identity without giving up warmth or spatial coherence.',
          es: 'Un apartamento diseñado para un joven profesional que combina vida social y trabajo en casa. El espacio público se concibió como un entorno flexible donde la cocina actúa como punto focal, articulando las dinámicas de recibir invitados y trabajar en home office.\n\nA través del uso estratégico del color y materiales, se potencia la presencia del mueble de cocina como eje articulador del área social. La decisión de concentrar la inversión en este ambiente responde a su valor funcional y simbólico en la vida cotidiana.\nLa selección de mobiliario y la distribución responden a la necesidad de crear un ambiente funcional, versátil y con carácter propio.\nEn Bucle, entendemos el diseño como una herramienta de expresión accesible, capaz de reflejar identidad sin renunciar a la calidez ni a la coherencia espacial.'
        },
        preview_image: './assets/projects/otaku/fabysalmeronphoto-1.jpg',
        images: [
          './assets/projects/otaku/fabysalmeronphoto-1.jpg',
          './assets/projects/otaku/fabysalmeronphoto-0020.jpg',
          './assets/projects/otaku/fabysalmeronphoto-9276.jpg',
          './assets/projects/otaku/fabysalmeronphoto-9489.jpg',
          './assets/projects/otaku/PHOTO-2025-09-14-15-43-58.jpg',
          './assets/projects/otaku/PHOTO-2025-09-14-15-43-59.jpg'
        ]
      }
    ],
    architecture: [
      {
        title:  { en: 'Country house', es: 'Casa campo' },
        description: {
          es: 'Diseñada como un refugio para el descanso y la conexión, esta vivienda acoge a una pareja joven que soñaba con un lugar para compartir con familia y amigos, respirar aire puro y disfrutar de la compañía de sus cocker spaniel.\n\nLa distribución responde a un deseo claro: que el área social —amplia, luminosa y abierta al entorno— fuera el corazón de la casa. Los dormitorios, en cambio, se reducen a lo esencial, priorizando el tiempo compartido sobre lo privado.\n\nUna casa pensada para recibir, para celebrar y para desconectarse, sin dejar de lado la calidez de lo cotidiano.',
          en: 'Designed as a retreat for rest and connection, this home welcomes a young couple who dreamed of a place to share with family and friends, breathe fresh air, and enjoy the company of their cocker spaniels.\n\nThe layout responds to a clear desire: for the social area—spacious, bright, and open to the surroundings—to be the heart of the house. The bedrooms, by contrast, are reduced to the essentials, prioritizing shared time over the private.\n\nA home conceived for hosting, celebrating, and disconnecting, without leaving behind the warmth of the everyday.'
        },
        preview_image: './assets/projects/campo/R01.png',
        images: [
          './assets/projects/campo/R01.png',
          './assets/projects/campo/R02.png',
          './assets/projects/campo/R04.png',
          './assets/projects/campo/R05.png'
        ]
      },
    ],
    remodeling: [
      {
        title: 'Kitchen Revitalization',
        description: 'A compact kitchen transformed for flow, storage, and durable finishes.',
        preview_image: './assets/remodelation/image.png',
        images: [
          './assets/remodelation/image.png',
          './assets/placeholder.svg'
        ]
      }
    ],
    permits: [
      {
        title: 'Permit Package A-Z',
        description: 'Complete permit management including drawings, submissions, and approvals.',
        preview_image: './assets/permit/image.png',
        images: [
          './assets/permit/image.png',
          './assets/placeholder.svg'
        ]
      }
    ]
  };

  // Helper to resolve multilingual fields (string or object keyed by lang)
  function resolveText(value, lang) {
    if (typeof value === 'string') return value;
    if (value && typeof value === 'object') return value[lang] || value.en || Object.values(value)[0] || '';
    return '';
  }

  const translations = {
    en: {
      brandName: 'Bucle Architecture',
      brandShort: 'Bucle Architecture',
      navInterior: 'Interior',
      navArchitecture: 'Architecture',
      navRemodeling: 'Remodeling',
      navPermits: 'Permits',
      navContact: 'Contact',
      ctaPrimary: 'Contact',
      ctaConsultation: 'Free Consultation',
      heroTitle: 'Thoughtful architecture for modern living.',
      heroSubtitle: 'Interior and residential design, remodeling, and permit management—delivered with clarity and care.',
      interiorTitle: 'Interior Design',
      interiorLead: 'Spaces that feel as good as they look—balanced, functional, and timeless.',
      architectureTitle: 'Architecture',
      architectureLead: 'Thoughtful homes tailored to your lifestyle and context.',
      remodelingTitle: 'Remodeling',
      remodelingLead: 'Revitalizations that respect structure, budget, and time.',
      permitsTitle: 'Permit Management',
      permitsLead: 'From drawings to approvals—we handle the paperwork and process.',
      contactTitle: 'Contact Us',
      contactLead: 'Tell us about your project. We respond within 24 hours.',
      contactWhatsApp: 'WhatsApp',
      contactEmail: 'Email',
      backToTop: 'Back to top',
      viewProject: 'View project'
    },
    es: {
      brandName: 'Bucle Arquitectura',
      brandShort: 'Bucle Arquitectura',
      navInterior: 'Interiores',
      navArchitecture: 'Arquitectura',
      navRemodeling: 'Remodelación',
      navPermits: 'Permisos',
      navContact: 'Contacto',
      ctaPrimary: 'Contacto',
      ctaConsultation: 'Consulta Gratis',
      heroTitle: 'Arquitectura consciente para la vida moderna.',
      heroSubtitle: 'Diseño de interiores y residencial, remodelación y gestión de permisos—con claridad y dedicación.',
      interiorTitle: 'Diseño de Interiores',
      interiorLead: 'Espacios que se sienten tan bien como se ven—equilibrados, funcionales y atemporales.',
      architectureTitle: 'Arquitectura',
      architectureLead: 'Hogares pensados para tu estilo de vida y contexto.',
      remodelingTitle: 'Remodelación',
      remodelingLead: 'Intervenciones que respetan la estructura, el presupuesto y el tiempo.',
      permitsTitle: 'Gestión de Permisos',
      permitsLead: 'De planos a aprobaciones—nos encargamos del papeleo y el proceso.',
      contactTitle: 'Contáctanos',
      contactLead: 'Cuéntanos sobre tu proyecto. Respondemos en 24 horas.',
      contactWhatsApp: 'WhatsApp',
      contactEmail: 'Correo',
      backToTop: 'Volver arriba',
      viewProject: 'Ver proyecto'
    }
  };

  const phone = '50378507650'; // E.164 without plus sign for wa.me

  // -------- Projects rendering and modal --------
  function renderProjects() {
    const grids = $$('[data-section]');
    grids.forEach(grid => {
      const section = grid.getAttribute('data-section');
      const items = projects[section] || [];
      grid.innerHTML = '';
      items.forEach((proj, idx) => {
        const fig = document.createElement('figure');
        fig.className = 'card project-card';
        fig.setAttribute('data-section', section);
        fig.setAttribute('data-index', String(idx));
        const lang = document.documentElement.lang || 'en';
        const title = resolveText(proj.title, lang);
        const preview = proj.preview_image || (proj.images && proj.images[0]) || './assets/placeholder.svg';
        fig.innerHTML = `
          <img src="${preview}" alt="${title}" />
          <figcaption>${title}</figcaption>
        `;
        fig.addEventListener('click', () => openProjectModal(section, idx));
        grid.appendChild(fig);
      });
    });
  }

  let modalState = {
    section: null,
    index: 0,
    imgIndex: 0
  };

  function ensureModal() {
    if ($('#project-modal')) return $('#project-modal');
    const wrap = document.createElement('div');
    wrap.id = 'project-modal';
    wrap.setAttribute('aria-hidden', 'true');
    wrap.innerHTML = `
      <div class="modal-overlay" data-close></div>
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button class="modal-close" aria-label="Close" data-close>&times;</button>
        <div class="modal-media">
          <button class="nav prev" aria-label="Previous image" data-prev>‹</button>
          <div class="zoom-pan" id="zoom-pan">
            <img id="modal-image" alt="Project image" />
          </div>
          <button class="nav next" aria-label="Next image" data-next>›</button>
        </div>
        <div class="modal-body">
          <h3 id="modal-title"></h3>
          <p id="modal-desc"></p>
        </div>
      </div>
    `;
    document.body.appendChild(wrap);
    wrap.addEventListener('click', (e) => {
      if (e.target.matches('[data-close]')) closeProjectModal();
    });
    wrap.querySelector('[data-prev]')?.addEventListener('click', prevImage);
    wrap.querySelector('[data-next]')?.addEventListener('click', nextImage);
    document.addEventListener('keydown', (e) => {
      if (wrap.getAttribute('aria-hidden') === 'true') return;
      if (e.key === 'Escape') closeProjectModal();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    });

    // Initialize zoom/pan interactions once
    initZoomPan();
    return wrap;
  }

  function openProjectModal(section, idx) {
    const data = projects[section]?.[idx];
    if (!data) return;
    modalState.section = section;
    modalState.index = idx;
    modalState.imgIndex = 0;
    const wrap = ensureModal();
    const lang = document.documentElement.lang || 'en';
    $('#modal-title', wrap).textContent = resolveText(data.title, lang);
    $('#modal-desc', wrap).textContent = resolveText(data.description, lang);
    updateModalImage();
    // Reset zoom on open
    resetZoom();
    wrap.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    const wrap = ensureModal();
    wrap.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    resetZoom();
  }

  function updateModalImage() {
    const { section, index, imgIndex } = modalState;
    const images = projects[section]?.[index]?.images || [];
    const src = images[imgIndex] || './assets/placeholder.svg';
    const imgEl = $('#modal-image');
    if (imgEl) {
      imgEl.src = src;
      // Reset zoom after image loads to ensure proper sizing
      imgEl.onload = () => resetZoom();
    }
  }

  function nextImage() {
    const { section, index } = modalState;
    const images = projects[section]?.[index]?.images || [];
    if (!images.length) return;
    modalState.imgIndex = (modalState.imgIndex + 1) % images.length;
    updateModalImage();
  }

  function prevImage() {
    const { section, index } = modalState;
    const images = projects[section]?.[index]?.images || [];
    if (!images.length) return;
    modalState.imgIndex = (modalState.imgIndex - 1 + images.length) % images.length;
    updateModalImage();
  }

  function setLanguage(lang) {
    const dict = translations[lang] || translations.en;
    document.documentElement.lang = lang;
    $$('#year').forEach(el => el.textContent = new Date().getFullYear());
    $$('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });

    // Update WhatsApp link with localized message
    const msg = encodeURIComponent(
      lang === 'es'
        ? 'Hola, me gustaría hablar sobre un proyecto.'
        : "Hello, I'd like to talk about a project."
    );
    const wa = `https://wa.me/${phone}?text=${msg}`;
    const waEl = $('#whatsapp-link');
    if (waEl) waEl.href = wa;

    // Update toggle label
    const toggle = $('#lang-toggle');
    if (toggle) toggle.textContent = lang === 'en' ? 'ES' : 'EN';

    localStorage.setItem('lang', lang);

    // Re-render projects to reflect localized titles
    renderProjects();
    // If modal is open, update its localized content
    const modal = $('#project-modal');
    if (modal && modal.getAttribute('aria-hidden') === 'false') {
      const data = projects[modalState.section]?.[modalState.index];
      if (data) {
        $('#modal-title', modal).textContent = resolveText(data.title, lang);
        $('#modal-desc', modal).textContent = resolveText(data.description, lang);
      }
    }
  }

  function initLang() {
    const stored = localStorage.getItem('lang');
    const browser = (navigator.language || 'en').slice(0,2);
    const initial = stored || (browser === 'es' ? 'es' : 'en');
    setLanguage(initial);
  }

  function bindEvents() {
    const toggle = $('#lang-toggle');
    toggle?.addEventListener('click', () => {
      const current = document.documentElement.lang === 'es' ? 'es' : 'en';
      setLanguage(current === 'en' ? 'es' : 'en');
    });

    // Set current year in footer
    const yearEl = $('#year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  // Social links placeholders - replace with your profiles
  function initSocial() {
    const ig = $('#instagram-link');
    const fb = $('#facebook-link');
    // Example: ig.href = 'https://instagram.com/your_handle';
    // Example: fb.href = 'https://facebook.com/your_page';
  }

  document.addEventListener('DOMContentLoaded', () => {
    initLang();
    bindEvents();
    initSocial();
    renderProjects();
  });
})();

// ---- Zoom & Pan for modal image ----
(function() {
  const doc = document;
  let state = { scale: 1, x: 0, y: 0, min: 1, max: 5, base: 1 };
  let isPanning = false;
  let start = { x: 0, y: 0 };

  function getEls() {
    const container = doc.getElementById('zoom-pan');
    const img = doc.getElementById('modal-image');
    return { container, img };
  }

  function applyTransform() {
    const { img } = getEls();
    if (!img) return;
    img.style.transform = `translate(${state.x}px, ${state.y}px) scale(${state.scale})`;
    img.style.transformOrigin = '0 0';
    img.style.cursor = state.scale > 1 ? (isPanning ? 'grabbing' : 'grab') : 'zoom-in';
  }

  function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

  function pointToContainer(evt, container) {
    const r = container.getBoundingClientRect();
    const x = (evt.clientX ?? (evt.touches && evt.touches[0]?.clientX) ?? 0) - r.left;
    const y = (evt.clientY ?? (evt.touches && evt.touches[0]?.clientY) ?? 0) - r.top;
    return { x, y };
  }

  function zoomAt(container, point, nextScale) {
    const prevScale = state.scale;
    nextScale = clamp(nextScale, state.min, state.max);
    if (nextScale === prevScale) return;
    // Keep the point under the cursor stationary while zooming
    const dx = point.x - state.x;
    const dy = point.y - state.y;
    const k = nextScale / prevScale;
    state.x = point.x - dx * k;
    state.y = point.y - dy * k;
    state.scale = nextScale;
    applyTransform();
  }

  function wheelHandler(e) {
    const { container } = getEls();
    if (!container) return;
    if (e.ctrlKey) return; // let browser zoom with ctrl+wheel
    e.preventDefault();
    const delta = -e.deltaY; // up to zoom in
    const factor = delta > 0 ? 1.1 : 0.9;
    const targetScale = clamp(state.scale * factor, state.min, state.max);
    const p = pointToContainer(e, container);
    zoomAt(container, p, targetScale);
  }

  function downHandler(e) {
    const { container } = getEls();
    if (!container) return;
    if (state.scale <= 1) return;
    isPanning = true;
    const p = pointToContainer(e, container);
    start.x = p.x - state.x;
    start.y = p.y - state.y;
    applyTransform();
  }

  function moveHandler(e) {
    if (!isPanning) return;
    const { container } = getEls();
    if (!container) return;
    e.preventDefault();
    const p = pointToContainer(e, container);
    state.x = p.x - start.x;
    state.y = p.y - start.y;
    applyTransform();
  }

  function upHandler() { if (!isPanning) return; isPanning = false; applyTransform(); }

  // Touch pinch
  let pinch = { active: false, dist: 0, cx: 0, cy: 0, startScale: 1 };
  function touchStart(e) {
    if (e.touches.length === 2) {
      pinch.active = true;
      const [a, b] = e.touches;
      pinch.dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      pinch.cx = (a.clientX + b.clientX) / 2;
      pinch.cy = (a.clientY + b.clientY) / 2;
      pinch.startScale = state.scale;
    } else if (e.touches.length === 1 && state.scale > 1) {
      downHandler(e);
    }
  }
  function touchMove(e) {
    const { container } = getEls();
    if (!container) return;
    if (pinch.active && e.touches.length === 2) {
      e.preventDefault();
      const [a, b] = e.touches;
      const nd = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      const factor = nd / pinch.dist;
      const target = clamp(pinch.startScale * factor, state.min, state.max);
      zoomAt(container, { x: pinch.cx - container.getBoundingClientRect().left, y: pinch.cy - container.getBoundingClientRect().top }, target);
    } else if (e.touches.length === 1 && isPanning) {
      moveHandler(e);
    }
  }
  function touchEnd(e) {
    if (pinch.active && e.touches.length < 2) pinch.active = false;
    if (isPanning && e.touches.length === 0) upHandler();
  }

  function dblClickHandler() { resetZoom(); }

  function bind() {
    const { container, img } = getEls();
    if (!container || !img) return;
    container.addEventListener('wheel', wheelHandler, { passive: false });
    container.addEventListener('mousedown', downHandler);
    doc.addEventListener('mousemove', moveHandler);
    doc.addEventListener('mouseup', upHandler);
    container.addEventListener('touchstart', touchStart, { passive: false });
    container.addEventListener('touchmove', touchMove, { passive: false });
    container.addEventListener('touchend', touchEnd);
    container.addEventListener('dblclick', dblClickHandler);
  }

  function unbind() {
    const { container } = getEls();
    if (!container) return;
    container.removeEventListener('wheel', wheelHandler);
    container.removeEventListener('mousedown', downHandler);
    doc.removeEventListener('mousemove', moveHandler);
    doc.removeEventListener('mouseup', upHandler);
    container.removeEventListener('touchstart', touchStart);
    container.removeEventListener('touchmove', touchMove);
    container.removeEventListener('touchend', touchEnd);
    container.removeEventListener('dblclick', dblClickHandler);
  }

  function initZoomPan() { bind(); resetZoom(); }

  function centerImage() {
    const { container, img } = getEls();
    if (!container || !img) return;
    const cr = container.getBoundingClientRect();
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;
    const displayW = iw * state.scale;
    const displayH = ih * state.scale;
    state.x = (cr.width - displayW) / 2;
    state.y = (cr.height - displayH) / 2;
  }

  function resetZoom() {
    const { container, img } = getEls();
    isPanning = false; pinch.active = false;
    if (!container || !img) return;
    // Compute base scale to fit inside container using natural dimensions
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;
    if (!iw || !ih || !cw || !ch) {
      // defer until next frame if sizes not ready
      requestAnimationFrame(resetZoom);
      return;
    }
    const base = Math.min(cw / iw, ch / ih, 1); // never upscale as base
    state.base = base;
    state.min = base;
    state.max = Math.max(base * 5, 2); // allow at least 2x even if base is tiny
    state.scale = base;
    // center after a tick to ensure layout is updated
    requestAnimationFrame(() => { centerImage(); applyTransform(); });
  }

  // Expose to outer IIFE scope
  window.resetZoom = resetZoom;
  window.initZoomPan = initZoomPan;
})();
