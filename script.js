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
        title: { en: 'Permits', es: 'Permisos constructivos' },
        description: { en: 'Complete permit management including drawings, submissions, and approvals.', es: 'Gestión completa de permisos incluyendo dibujos, envíos y aprobaciones municipales constructivas.' },
        hide_read_more: true,
        preview_image: './assets/permit/image.png',
        images: [
          './assets/permit/image.png',
        ]
      }
    ]
  };

  // Full-screen scrollable overlay showing all images stacked
  function openProjectScrollOverlay(section, idx) {
    const data = projects[section]?.[idx];
    if (!data) return;
    const lang = document.documentElement.lang || 'en';
    const title = resolveText(data.title, lang);
    const desc = resolveText(data.description, lang);

    // Create overlay if not exists
    let overlay = document.getElementById('project-scroll-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'project-scroll-overlay';
      overlay.innerHTML = `
        <div class="po-backdrop" data-close></div>
        <div class="po-panel" role="dialog" aria-modal="true" aria-labelledby="po-title">
          <button class="po-close" aria-label="Close" data-close>&times;</button>
          <div class="po-content">
            <header class="po-header">
              <h3 id="po-title"></h3>
              <p id="po-desc"></p>
            </header>
            <div class="po-images" id="po-images"></div>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
      overlay.addEventListener('click', (e) => {
        if (e.target.matches('[data-close]')) closeProjectScrollOverlay();
      });
      document.addEventListener('keydown', (e) => {
        if (overlay.style.display !== 'none' && e.key === 'Escape') closeProjectScrollOverlay();
      });
    }

    overlay.querySelector('#po-title').textContent = title;
    overlay.querySelector('#po-desc').textContent = desc;

    const list = overlay.querySelector('#po-images');
    list.innerHTML = '';
    const imgs = (data.images || []).slice();
    imgs.forEach((src, i) => {
      const fig = document.createElement('figure');
      fig.className = 'po-figure';
      fig.innerHTML = `
        <img data-src="${src}" alt="${title} ${i+1}" loading="lazy" decoding="async" />
      `;
      list.appendChild(fig);
    });

    // Lazy load via IntersectionObserver
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const ds = img.getAttribute('data-src');
          if (ds) {
            img.src = ds;
            img.removeAttribute('data-src');
          }
          obs.unobserve(img);
        }
      });
    }, { root: overlay.querySelector('.po-content'), rootMargin: '200px 0px', threshold: 0.01 });
    list.querySelectorAll('img[data-src]').forEach(img => io.observe(img));

    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function closeProjectScrollOverlay() {
    const overlay = document.getElementById('project-scroll-overlay');
    if (!overlay) return;
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }

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
      // Reentrancy guard to avoid double-open from touchend+click on mobile
      let opening = false;
      const safeOpen = (section, idx, startAt = 0) => {
        if (opening) return;
        opening = true;
        setTimeout(() => { opening = false; }, 700);
        openFancybox(section, idx, startAt);
      };

      items.forEach((proj, idx) => {
        const fig = document.createElement('figure');
        fig.className = 'card project-card';
        fig.setAttribute('data-section', section);
        fig.setAttribute('data-index', String(idx));
        fig.setAttribute('role', 'button');
        fig.setAttribute('tabindex', '0');
        fig.setAttribute('aria-label', 'View project');
        fig.style.cursor = 'pointer';
        const lang = document.documentElement.lang || 'en';
        const title = resolveText(proj.title, lang);
        const desc = resolveText(proj.description, lang);
        const preview = proj.preview_image || (proj.images && proj.images[0]) || './assets/placeholder.svg';
        const totalImages = (proj.images || []).length;
        const thumbs = (proj.images || []).slice(0, 5);
        const hideReadMore = proj.hide_read_more === true;
        fig.innerHTML = `
          <img src="${preview}" alt="${title}" loading="lazy" decoding="async" fetchpriority="low"
               sizes="(min-width: 940px) 33vw, (min-width: 640px) 50vw, 100vw" />
          <figcaption>
            <span>${title}</span>
            ${!hideReadMore ? `<button class="chip read-more" aria-label="Read more about ${title}">${lang === 'es' ? 'Leer más' : 'Read more'}</button>` : ''}
          </figcaption>
        `;
        // Guard against opening after a scroll gesture
        let drag = { down: false, moved: false, x: 0, y: 0 };
        const DRAG_THRESHOLD = 10; // px
        fig.addEventListener('pointerdown', (e) => {
          drag.down = true; drag.moved = false; drag.x = e.clientX; drag.y = e.clientY;
        });
        fig.addEventListener('pointermove', (e) => {
          if (!drag.down) return;
          const dx = e.clientX - drag.x; const dy = e.clientY - drag.y;
          if (Math.hypot(dx, dy) > DRAG_THRESHOLD) drag.moved = true;
        });
        const clearDrag = () => { drag.down = false; };
        fig.addEventListener('pointerup', clearDrag);
        fig.addEventListener('pointercancel', clearDrag);
        fig.addEventListener('click', (e) => {
          // Ignore if user was scrolling/draggng or clicked an interactive child
          if (drag.moved) return;
          if (e.target.closest('.thumb-strip, .chip, button, a')) return;
          safeOpen(section, idx, 0);
        });
        // Ensure activation on keyboard and touch (Android WebView quirks)
        fig.addEventListener('keydown', (e) => {
          // Activate only when focus is on the figure or non-interactive child
          const isInteractive = e.target.closest('.thumb-strip, .chip, button, a, input, textarea, select');
          if ((e.key === 'Enter' || e.key === ' ') && !isInteractive) {
            e.preventDefault();
            safeOpen(section, idx, 0);
          }
        });
        // Thumbnail clicks open the gallery at corresponding index
        fig.querySelectorAll('.thumb').forEach(btn => {
          btn.addEventListener('click', (ev) => {
            ev.stopPropagation();
            const startAt = parseInt(btn.getAttribute('data-thumb-index') || '0', 10) || 0;
            safeOpen(section, idx, startAt);
          });
        });
        // Read more opens description dialog
        const readMore = fig.querySelector('.chip.read-more');
        readMore?.addEventListener('click', (ev) => {
          ev.stopPropagation();
          openProjectInfo(section, idx);
        });
        // Removed figure-level touchend to allow smooth native scrolling on mobile
        grid.appendChild(fig);
      });
    });
  }

  // (Removed legacy modal implementation)

  // Fancybox integration (marketplace-like gallery)
  function openFancybox(section, idx, startAt = 0) {
    const data = projects[section]?.[idx];
    if (!data) return;
    if (!window.Fancybox || typeof window.Fancybox.show !== 'function') {
      console.warn('Fancybox not available');
      return;
    }
    const lang = document.documentElement.lang || 'en';
    const title = resolveText(data.title, lang);
    const desc = resolveText(data.description, lang);
    const images = (data.images || []).slice();
    const captionHtml = `<div class="fancybox-caption__body"><h3>${title}</h3><p>${desc.replace(/\n/g, '<br>')}</p></div>`;
    const items = images.map((src) => ({
      src,
      type: 'image',
      caption: captionHtml
    }));

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    try {
      window.Fancybox.show(items, {
        animated: !prefersReducedMotion,
        hideScrollbar: true,
        dragToClose: true,
        infinite: true,
        mainClass: 'bucle-fancybox',
        Thumbs: { autoStart: false },
        Toolbar: {
          display: {
            left: [],
            middle: [],
            right: ['close']
          }
        },
        Images: { zoom: true, preload: 1 },
        Carousel: {
          transition: 'fade',
          initialPage: startAt
        },
        caption: (fancybox, carousel, slide) => {
          return slide.caption || '';
        }
      });
    } catch (e) {
      console.error('Failed to open Fancybox', e);
    }
  }

  // Project Description Dialog
  function ensureInfoDialog() {
    let dlg = document.getElementById('project-info-dialog');
    if (dlg) return dlg;
    dlg = document.createElement('div');
    dlg.id = 'project-info-dialog';
    dlg.innerHTML = `
      <div class="info-backdrop" data-close></div>
      <div class="info-panel" role="dialog" aria-modal="true" aria-labelledby="info-title">
        <button class="info-close" aria-label="Close" data-close>&times;</button>
        <div class="info-body">
          <h3 id="info-title"></h3>
          <p id="info-desc"></p>
          <div class="info-actions">
            <button type="button" id="info-view-photos" class="btn primary">View photos</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(dlg);
    dlg.addEventListener('click', (e) => { if (e.target.matches('[data-close]')) closeProjectInfo(); });
    document.addEventListener('keydown', (e) => { if (dlg.style.display !== 'none' && e.key === 'Escape') closeProjectInfo(); });
    return dlg;
  }

  function openProjectInfo(section, idx) {
    const dlg = ensureInfoDialog();
    const data = projects[section]?.[idx];
    if (!data) return;
    const lang = document.documentElement.lang || 'en';
    const title = resolveText(data.title, lang);
    const desc = resolveText(data.description, lang);
    dlg.querySelector('#info-title').textContent = title;
    dlg.querySelector('#info-desc').textContent = desc;
    const btn = dlg.querySelector('#info-view-photos');
    btn.textContent = lang === 'es' ? 'Ver fotos' : 'View photos';
    btn.onclick = () => { closeProjectInfo(); openFancybox(section, idx, 0); };
    dlg.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function closeProjectInfo() {
    const dlg = document.getElementById('project-info-dialog');
    if (!dlg) return;
    dlg.style.display = 'none';
    document.body.style.overflow = '';
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
    if (ig) ig.href = 'https://www.instagram.com/bucle.studio__/';
    // Facebook is currently commented out in HTML; leave unset.
  }

  function initScrollAnimations() {
    const sections = $$('.fade-in-section');
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => {
      observer.observe(section);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initLang();
    bindEvents();
    initSocial();
    renderProjects();
    initScrollAnimations();
  });
})();
