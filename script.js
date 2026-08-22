/* ==========================================================================
   BUCLE STUDIO — site behaviour
   Vanilla, no framework. Sections: project data, i18n, rendering, chrome.
   ========================================================================== */

(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ------------------------------------------------------------------------
     Contact — sourced from site.config.json via `npm run sync`.
     Do not hand-edit; edit site.config.json and re-run the script.
     ---------------------------------------------------------------------- */
  const PHONE = '50366894973'; // E.164, no plus, for wa.me

  /* ------------------------------------------------------------------------
     Projects

     `meta` drives the line under each project title and inside the info
     dialog. Every field is optional — anything left empty is simply not
     rendered, so it is safe to fill these in over time.

       location  e.g. 'San Salvador'
       year      e.g. '2024'          ← TODO: add real years
       type      e.g. 'Apartment'
       area      e.g. '120 m²'        ← TODO: add real areas
       credit    photographer / visualisation credit
     ---------------------------------------------------------------------- */
  const projects = {
    interior: [
      {
        title: { en: 'LOMAS 500', es: 'LOMAS 500' },
        meta: {
          location: { en: 'San Salvador', es: 'San Salvador' },
          year: '',
          type: '',
          area: '',
          credit: '',
        },
        description: {
          en: 'This family of four lives on the outskirts of San Salvador, but the city calls them frequently for work and commitments. They didn’t just need an apartment; they needed a home that truly welcomed them back.\n\nThe brief: elegance without artifice, spaciousness without emptiness, and warmth without saturation. We used a palette of earth tones and neutrals, anchored by greenery and an Evergreen Fog wall. Wood and textiles from Ilobasco, the clients\' hometown, connect their identity with the interior.\n\nEvery piece features local craftsmanship. A custom-designed furniture piece—serving as a coffee station, bar, and storage—emerged from an existing niche. Here, natural light and ventilation are embraced as essential gifts of the space.',
          es: 'Esta familia de cuatro vive en las afueras de San Salvador, pero la ciudad los llama con frecuencia por trabajo y compromisos. Lo que necesitaban no era solo un apartamento, sino un refugio que los recibiera como en casa.\n\nEl encargo: elegancia sin artificio, amplitud sin vacío y calidez sin saturación. Trabajamos con una paleta de tonos tierra y neutros, anclada por el verde de las plantas y una pared en Evergreen Fog. La madera y los textiles de Ilobasco, origen de los clientes, conectan su esencia con el espacio.\n\nCada detalle tiene procedencia local, resaltando manos artesanas. Un nicho existente se transformó en un mueble a medida: coffee station, bar y almacenamiento. Aquí, la luz natural y la ventilación se celebran como un regalo cotidiano.',
        },
        preview_image: './assets/projects/loma500/loma500-16.jpeg',
        images: [
          './assets/projects/loma500/loma500-16.jpeg',
          './assets/projects/loma500/loma500-7.jpeg',
          './assets/projects/loma500/loma500-15.jpeg',
          './assets/projects/loma500/loma500-26.jpeg',
          './assets/projects/loma500/loma500-34.jpeg',
          './assets/projects/loma500/loma500-46.jpeg',
          './assets/projects/loma500/loma500-48.jpeg',
          './assets/projects/loma500/loma500-50.jpeg',
          './assets/projects/loma500/loma500-57.jpeg',
          './assets/projects/loma500/loma500-65.jpeg',
          './assets/projects/loma500/loma500-69.jpeg',
          './assets/projects/loma500/loma500-79.jpeg',
        ],
      },
      {
        title: { en: 'TRELUM Apartment', es: 'Apartamento TRELUM' },
        meta: {
          location: { en: 'Torre Trelum, San Salvador', es: 'Torre Trelum, San Salvador' },
          year: '',
          type: '',
          area: '',
          credit: '',
        },
        description: {
          en: 'Located in the exclusive Torre Trelum, this apartment was conceived as a retreat of peace and relaxation for its owner, envisioned as an ideal space for single living and entertaining, taking advantage of its commanding view to the south of San Salvador.\n\nThe main challenge was to integrate his belongings into the design without compromising the harmony of the space, achieving a sophisticated and masculine atmosphere without becoming overdone.',
          es: 'Ubicado en la exclusiva Torre Trelum, este apartamento fue concebido como un refugio de paz y relajación para su propietario, quien lo imaginó como un espacio ideal para la vida de soltero y el entretenimiento, aprovechando su imponente vista al sur de San Salvador.\n\nEl reto principal fue integrar sus pertenencias al diseño sin comprometer la armonía del espacio, logrando una atmósfera sofisticada y masculina sin caer en lo sobrecargado.',
        },
        preview_image: './assets/projects/trelum/trelum-1.jpg',
        images: [
          './assets/projects/trelum/trelum-1.jpg',
          './assets/projects/trelum/trelum-2.jpg',
          './assets/projects/trelum/trelum-3.jpg',
          './assets/projects/trelum/trelum-4.jpg',
          './assets/projects/trelum/trelum-5.jpg',
          './assets/projects/trelum/trelum-6.jpg',
        ],
      },
      {
        title: { en: 'OTAKU house', es: 'Casa OTAKU' },
        meta: {
          location: { en: 'San Salvador', es: 'San Salvador' },
          year: '',
          type: '',
          area: '',
          // TODO: filenames suggest Faby Salmerón — confirm the byline.
          credit: '',
        },
        description: {
          en: 'An apartment designed for a young professional that blends social life and working from home. The public area was conceived as a flexible environment where the kitchen acts as the focal point, structuring the dynamics of hosting guests and working in a home office.\n\nThrough the strategic use of color and materials, the presence of the kitchen unit is emphasized as the organizing axis of the social area. The decision to concentrate the investment in this environment responds to its functional and symbolic value in everyday life.\nThe selection of furnishings and the layout respond to the need to create a functional, versatile environment with its own character.\nAt Bucle, we understand design as an accessible tool for expression, capable of reflecting identity without giving up warmth or spatial coherence.',
          es: 'Un apartamento diseñado para un joven profesional que combina vida social y trabajo en casa. El espacio público se concibió como un entorno flexible donde la cocina actúa como punto focal, articulando las dinámicas de recibir invitados y trabajar en home office.\n\nA través del uso estratégico del color y materiales, se potencia la presencia del mueble de cocina como eje articulador del área social. La decisión de concentrar la inversión en este ambiente responde a su valor funcional y simbólico en la vida cotidiana.\nLa selección de mobiliario y la distribución responden a la necesidad de crear un ambiente funcional, versátil y con carácter propio.\nEn Bucle, entendemos el diseño como una herramienta de expresión accesible, capaz de reflejar identidad sin renunciar a la calidez ni a la coherencia espacial.',
        },
        preview_image: './assets/projects/otaku/fabysalmeronphoto-1.jpg',
        images: [
          './assets/projects/otaku/fabysalmeronphoto-1.jpg',
          './assets/projects/otaku/fabysalmeronphoto-0020.jpg',
          './assets/projects/otaku/fabysalmeronphoto-9276.jpg',
          './assets/projects/otaku/fabysalmeronphoto-9489.jpg',
          './assets/projects/otaku/PHOTO-2025-09-14-15-43-58.jpg',
          './assets/projects/otaku/PHOTO-2025-09-14-15-43-59.jpg',
        ],
      },
    ],

    architecture: [
      {
        title: { en: 'Country house', es: 'Casa campo' },
        meta: {
          location: { en: 'El Salvador', es: 'El Salvador' },
          year: '',
          type: '',
          area: '',
          credit: '',
        },
        description: {
          en: 'Designed as a retreat for rest and connection, this home welcomes a young couple who dreamed of a place to share with family and friends, breathe fresh air, and enjoy the company of their cocker spaniels.\n\nThe layout responds to a clear desire: for the social area—spacious, bright, and open to the surroundings—to be the heart of the house. The bedrooms, by contrast, are reduced to the essentials, prioritizing shared time over the private.\n\nA home conceived for hosting, celebrating, and disconnecting, without leaving behind the warmth of the everyday.',
          es: 'Diseñada como un refugio para el descanso y la conexión, esta vivienda acoge a una pareja joven que soñaba con un lugar para compartir con familia y amigos, respirar aire puro y disfrutar de la compañía de sus cocker spaniel.\n\nLa distribución responde a un deseo claro: que el área social —amplia, luminosa y abierta al entorno— fuera el corazón de la casa. Los dormitorios, en cambio, se reducen a lo esencial, priorizando el tiempo compartido sobre lo privado.\n\nUna casa pensada para recibir, para celebrar y para desconectarse, sin dejar de lado la calidez de lo cotidiano.',
        },
        preview_image: './assets/projects/campo/R01.png',
        images: [
          './assets/projects/campo/R01.png',
          './assets/projects/campo/R02.png',
          './assets/projects/campo/R04.png',
          './assets/projects/campo/R05.png',
        ],
      },
    ],

    permits: [
      {
        title: { en: 'Permits', es: 'Permisos constructivos' },
        meta: {},
        hide_read_more: true,
        description: {
          en: 'Complete permit management including drawings, submissions, and approvals.',
          es: 'Gestión completa de permisos incluyendo dibujos, envíos y aprobaciones municipales constructivas.',
        },
        preview_image: './assets/permit/image.png',
        images: ['./assets/permit/image.png'],
      },
    ],
  };

  /* ------------------------------------------------------------------------
     Translations

     The studio's own wording, restored verbatim from the previous site.
     Keys marked NEW have no original equivalent because the section they
     belong to did not exist before (Studio, process, contact field labels).
     Replace those with the studio's own words when ready.
     ---------------------------------------------------------------------- */
  const translations = {
    en: {
      brandName: 'Bucle Architecture',
      brandShort: 'Bucle Architecture',
      skipToContent: 'Skip to content',                       // NEW (accessibility)
      navInterior: 'Interior',
      navArchitecture: 'Architecture',
      navPermits: 'Permits',
      navStudio: 'Studio',                                    // NEW
      navContact: 'Contact',
      ctaStart: 'Contact',

      heroEyebrow: 'Architecture & Interior Design · San Salvador',   // NEW
      heroTitle: 'Thoughtful architecture for modern living.',
      heroLead: 'Interior and residential design, remodeling, and permit management—delivered with clarity and care.',
      heroCtaWork: 'View project',
      heroCtaTalk: 'Contact',

      interiorTitle: 'Interior Design',
      interiorLead: 'Spaces that feel as good as they look—balanced, functional, and timeless.',
      architectureTitle: 'Architecture',
      architectureLead: 'Thoughtful homes tailored to your lifestyle and context.',
      permitsTitle: 'Permit Management',
      permitsLead: 'From drawings to approvals—we handle the paperwork and process.',

      // --- NEW: the Studio section had no original copy ---
      studioTitle: 'The Studio',
      studioLead: 'Bucle is a residential design practice based in San Salvador. We take on a small number of projects at a time so each one gets the attention it needs.',
      studioValue1Title: 'Designed for how you live',
      studioValue1Body: 'We start with routines, not references. How you cook, host, work and rest sets the plan before a single finish is chosen.',
      studioValue2Title: 'Made close to home',
      studioValue2Body: 'Wood, textiles and joinery come from Salvadoran workshops wherever we can. It keeps quality in view and the craft in the country.',
      studioValue3Title: 'One team, start to finish',
      studioValue3Body: 'Design, drawings and municipal permits are handled in-house, so nothing falls between an architect and a paperwork office.',

      // --- NEW: process ---
      processTitle: 'How we work',
      process1Title: 'Conversation',
      process1Body: 'We talk through the space, the budget and the timeline. No cost, no commitment.',
      process2Title: 'Design',
      process2Body: 'Layouts, materials and 3D views, revised with you until the plan is right.',
      process3Title: 'Documentation',
      process3Body: 'Construction drawings and, where needed, the municipal permit submission.',
      process4Title: 'Build',
      process4Body: 'We stay involved on site so what gets built matches what was drawn.',

      areasLabel: 'Working in',                                // NEW
      areasList: 'San Salvador · Antiguo Cuscatlán · Santa Tecla · nationwide in El Salvador',

      contactTitle: 'Contact Us',
      contactLead: 'Tell us about your project. We respond within 24 hours.',
      contactWhatsApp: 'WhatsApp',
      labelEmail: 'Email',
      labelPhone: 'Phone',                                    // NEW
      labelStudio: 'Studio',                                  // NEW
      labelStudioValue: 'San Salvador, El Salvador',          // NEW
      labelInstagram: 'Instagram',                            // NEW

      backToTop: 'Back to top',
      readMore: 'Read more',
      viewPhotos: 'View photos',
      viewProject: 'View project',
      close: 'Close',
      photoCount: (n) => `${n} photos`,
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      switchLang: 'Cambiar a español',
    },

    es: {
      brandName: 'Bucle Arquitectura',
      brandShort: 'Bucle Arquitectura',
      skipToContent: 'Ir al contenido',                       // NEW (accessibility)
      navInterior: 'Interiores',
      navArchitecture: 'Arquitectura',
      navPermits: 'Permisos',
      navStudio: 'Estudio',                                   // NEW
      navContact: 'Contacto',
      ctaStart: 'Contacto',

      heroEyebrow: 'Arquitectura y Diseño de Interiores · San Salvador',  // NEW
      heroTitle: 'Arquitectura consciente para la vida moderna.',
      heroLead: 'Diseño de interiores y residencial, remodelación y gestión de permisos—con claridad y dedicación.',
      heroCtaWork: 'Ver proyecto',
      heroCtaTalk: 'Contacto',

      interiorTitle: 'Diseño de Interiores',
      interiorLead: 'Espacios que se sienten tan bien como se ven—equilibrados, funcionales y atemporales.',
      architectureTitle: 'Arquitectura',
      architectureLead: 'Hogares pensados para tu estilo de vida y contexto.',
      permitsTitle: 'Gestión de Permisos',
      permitsLead: 'De planos a aprobaciones—nos encargamos del papeleo y el proceso.',

      // --- NEW: the Studio section had no original copy ---
      studioTitle: 'El Estudio',
      studioLead: 'Bucle es un estudio de diseño residencial con base en San Salvador. Tomamos pocos proyectos a la vez para que cada uno reciba la atención que merece.',
      studioValue1Title: 'Diseñado para tu forma de vivir',
      studioValue1Body: 'Partimos de rutinas, no de referencias. Cómo cocinas, recibes, trabajas y descansas define la planta antes de elegir un solo acabado.',
      studioValue2Title: 'Hecho cerca de casa',
      studioValue2Body: 'La madera, los textiles y la ebanistería vienen de talleres salvadoreños siempre que se puede. Mantiene la calidad a la vista y el oficio en el país.',
      studioValue3Title: 'Un solo equipo, de principio a fin',
      studioValue3Body: 'Diseño, planos y permisos municipales se manejan internamente, para que nada se pierda entre el arquitecto y la oficina de trámites.',

      // --- NEW: process ---
      processTitle: 'Cómo trabajamos',
      process1Title: 'Conversación',
      process1Body: 'Hablamos del espacio, el presupuesto y los tiempos. Sin costo, sin compromiso.',
      process2Title: 'Diseño',
      process2Body: 'Distribuciones, materiales y vistas 3D, revisados contigo hasta que la propuesta sea la correcta.',
      process3Title: 'Documentación',
      process3Body: 'Planos constructivos y, cuando hace falta, el ingreso del permiso municipal.',
      process4Title: 'Obra',
      process4Body: 'Seguimos presentes en obra para que lo construido corresponda a lo dibujado.',

      areasLabel: 'Trabajamos en',                             // NEW
      areasList: 'San Salvador · Antiguo Cuscatlán · Santa Tecla · todo El Salvador',

      contactTitle: 'Contáctanos',
      contactLead: 'Cuéntanos sobre tu proyecto. Respondemos en 24 horas.',
      contactWhatsApp: 'WhatsApp',
      labelEmail: 'Correo',
      labelPhone: 'Teléfono',                                 // NEW
      labelStudio: 'Estudio',                                 // NEW
      labelStudioValue: 'San Salvador, El Salvador',          // NEW
      labelInstagram: 'Instagram',                            // NEW

      backToTop: 'Volver arriba',
      readMore: 'Leer más',
      viewPhotos: 'Ver fotos',
      viewProject: 'Ver proyecto',
      close: 'Cerrar',
      photoCount: (n) => `${n} fotos`,
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
      switchLang: 'Switch to English',
    },
  };

  let lang = 'en';
  const t = (key) => (translations[lang] || translations.en)[key];

  /** Resolve a value that may be a plain string or an { en, es } object. */
  function text(value) {
    if (typeof value === 'string') return value;
    if (value && typeof value === 'object') return value[lang] || value.en || '';
    return '';
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])
    );
  }

  /* ------------------------------------------------------------------------
     Responsive images

     assets/derived/manifest.js (generated by `npm run images`) maps each
     original path to its WebP derivatives. If it is missing we fall back to
     the original file, so the site still works with no build step run.
     ---------------------------------------------------------------------- */
  const IMG = window.__IMG__ || {};

  function srcsetFor(src) {
    const entry = IMG[src];
    if (!entry || !entry.w || !entry.w.length) return null;
    return {
      srcset: entry.w.map((w) => `${entry.b}-${w}.webp ${w}w`).join(', '),
      // Largest derivative as the src: correct for browsers ignoring srcset.
      src: `${entry.b}-${entry.w[entry.w.length - 1]}.webp`,
      ratio: entry.r,
    };
  }

  /**
   * Build a <picture> for a project image. `sizes` describes the layout slot.
   * Falls back to a plain <img> on the original when no derivatives exist.
   */
  function pictureHtml(src, alt, sizes, { eager = false } = {}) {
    const d = srcsetFor(src);
    const loading = eager ? 'eager' : 'lazy';
    const priority = eager ? 'high' : 'auto';
    const a = escapeHtml(alt);

    if (!d) {
      return `<img src="${src}" alt="${a}" loading="${loading}" decoding="async" fetchpriority="${priority}">`;
    }
    return (
      `<picture>` +
      `<source type="image/webp" srcset="${d.srcset}" sizes="${sizes}">` +
      `<img src="${d.src}" alt="${a}" loading="${loading}" decoding="async" fetchpriority="${priority}">` +
      `</picture>`
    );
  }

  /** Fade an image in once decoded — avoids a hard pop-in on slow networks. */
  function watchImageLoad(img) {
    if (!img) return;
    if (img.complete && img.naturalWidth) {
      img.classList.add('is-loaded');
      return;
    }
    img.addEventListener('load', () => img.classList.add('is-loaded'), { once: true });
    img.addEventListener('error', () => img.classList.add('is-loaded'), { once: true });
  }

  /* ------------------------------------------------------------------------
     Project cards
     ---------------------------------------------------------------------- */

  /** Flatten a project's `meta` into display strings, skipping empty fields. */
  function metaParts(project) {
    const m = project.meta || {};
    return [text(m.location), m.year, text(m.type), m.area].map(text).filter(Boolean);
  }

  const CARD_SIZES = '(min-width: 1040px) 33vw, (min-width: 700px) 50vw, 100vw';

  function renderProjects() {
    $$('[data-section]').forEach((grid) => {
      const section = grid.getAttribute('data-section');
      const items = projects[section] || [];
      grid.innerHTML = '';

      items.forEach((project, idx) => {
        const title = text(project.title);
        const preview = project.preview_image || (project.images || [])[0];
        const count = (project.images || []).length;
        const parts = metaParts(project);

        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'project-card';
        card.setAttribute('aria-label', `${title} — ${t('viewPhotos')}`);

        card.innerHTML =
          `<span class="project-media">` +
            pictureHtml(preview, title, CARD_SIZES) +
            (count > 1 ? `<span class="project-count">${escapeHtml(t('photoCount')(count))}</span>` : '') +
          `</span>` +
          `<span class="project-body">` +
            `<span class="project-title">${escapeHtml(title)}</span>` +
            (parts.length
              ? `<ul class="project-meta">${parts.map((p) => `<li>${escapeHtml(p)}</li>`).join('')}</ul>`
              : '') +
            `<span class="project-link">${escapeHtml(
              project.hide_read_more ? t('viewPhotos') : t('readMore')
            )}` +
              `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12,5 19,12 12,19"></polyline></svg>` +
            `</span>` +
          `</span>`;

        // A single-image entry has nothing to read, so go straight to photos.
        card.addEventListener('click', () => {
          if (project.hide_read_more) openGallery(section, idx);
          else openInfo(section, idx);
        });

        watchImageLoad(card.querySelector('img'));
        grid.appendChild(card);
      });
    });
  }

  /* ------------------------------------------------------------------------
     Info dialog
     ---------------------------------------------------------------------- */
  let lastFocused = null;

  function ensureInfoDialog() {
    let dlg = $('#project-info');
    if (dlg) return dlg;

    dlg = document.createElement('div');
    dlg.id = 'project-info';
    dlg.className = 'info-dialog';
    dlg.innerHTML =
      `<div class="info-backdrop" data-close></div>` +
      `<div class="info-panel" role="dialog" aria-modal="true" aria-labelledby="info-title">` +
        `<button class="info-close" type="button" data-close aria-label="Close">&times;</button>` +
        `<div class="info-body">` +
          `<h3 id="info-title"></h3>` +
          `<ul class="info-meta" id="info-meta"></ul>` +
          `<p class="info-desc" id="info-desc"></p>` +
          `<p class="info-credit" id="info-credit"></p>` +
          `<div class="info-actions"><button type="button" id="info-photos" class="btn primary"></button></div>` +
        `</div>` +
      `</div>`;

    document.body.appendChild(dlg);
    dlg.addEventListener('click', (e) => {
      if (e.target.closest('[data-close]')) closeInfo();
    });
    return dlg;
  }

  function openInfo(section, idx) {
    const project = projects[section] && projects[section][idx];
    if (!project) return;

    const dlg = ensureInfoDialog();
    lastFocused = document.activeElement;

    $('#info-title', dlg).textContent = text(project.title);
    $('#info-desc', dlg).textContent = text(project.description);

    const parts = metaParts(project);
    const metaEl = $('#info-meta', dlg);
    metaEl.innerHTML = parts.map((p) => `<li>${escapeHtml(p)}</li>`).join('');
    metaEl.hidden = parts.length === 0;

    const credit = text((project.meta || {}).credit);
    const creditEl = $('#info-credit', dlg);
    creditEl.textContent = credit ? `${lang === 'es' ? 'Fotografía' : 'Photography'}: ${credit}` : '';
    creditEl.hidden = !credit;

    const photosBtn = $('#info-photos', dlg);
    photosBtn.textContent = t('viewPhotos');
    photosBtn.onclick = () => {
      closeInfo({ restoreFocus: false });
      openGallery(section, idx);
    };

    $('.info-close', dlg).setAttribute('aria-label', t('close'));

    dlg.classList.add('is-open');
    document.body.classList.add('is-locked');
    photosBtn.focus();
  }

  function closeInfo({ restoreFocus = true } = {}) {
    const dlg = $('#project-info');
    if (!dlg || !dlg.classList.contains('is-open')) return;
    dlg.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    if (restoreFocus && lastFocused) lastFocused.focus();
  }

  /* ------------------------------------------------------------------------
     Gallery (Fancybox)
     ---------------------------------------------------------------------- */
  function openGallery(section, idx, startAt = 0) {
    const project = projects[section] && projects[section][idx];
    if (!project) return;

    if (!window.Fancybox || typeof window.Fancybox.show !== 'function') {
      console.warn('Fancybox unavailable — falling back to the original image.');
      const first = (project.images || [])[startAt];
      if (first) window.open(first, '_blank', 'noopener');
      return;
    }

    const title = text(project.title);
    const desc = text(project.description);
    const caption =
      `<div class="fb-cap"><h3>${escapeHtml(title)}</h3>` +
      `<p>${escapeHtml(desc).replace(/\n/g, '<br>')}</p></div>`;

    // Serve the largest derivative to the lightbox rather than the multi-MB
    // original; keep the original as the download/zoom source.
    const items = (project.images || []).map((src, i) => {
      const d = srcsetFor(src);
      return {
        src: d ? d.src : src,
        type: 'image',
        caption,
        alt: `${title} — ${i + 1}`,
      };
    });

    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    try {
      window.Fancybox.show(items, {
        animated: !reduced,
        hideScrollbar: true,
        dragToClose: true,
        infinite: true,
        mainClass: 'bucle-fancybox',
        Thumbs: { autoStart: false },
        Toolbar: { display: { left: ['infobar'], middle: [], right: ['close'] } },
        Images: { zoom: true, preload: 1 },
        Carousel: { transition: 'fade', initialPage: startAt },
        caption: (_fb, _carousel, slide) => slide.caption || '',
      });
    } catch (err) {
      console.error('Failed to open the gallery', err);
    }
  }

  /* ------------------------------------------------------------------------
     Language
     ---------------------------------------------------------------------- */
  function setLanguage(next) {
    lang = translations[next] ? next : 'en';
    document.documentElement.lang = lang;

    $$('[data-i18n]').forEach((el) => {
      const value = t(el.getAttribute('data-i18n'));
      if (typeof value === 'string') el.textContent = value;
    });

    // WhatsApp deep link, with the opening message in the current language.
    const message = encodeURIComponent(
      lang === 'es'
        ? 'Hola, me gustaría hablar sobre un proyecto.'
        : "Hello, I'd like to talk about a project."
    );
    const wa = $('#whatsapp-link');
    if (wa) wa.href = `https://wa.me/${PHONE}?text=${message}`;

    const toggle = $('#lang-toggle');
    if (toggle) {
      toggle.textContent = lang === 'en' ? 'ES' : 'EN';
      toggle.setAttribute('aria-label', t('switchLang'));
    }

    const navToggle = $('#nav-toggle');
    if (navToggle) {
      const open = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-label', open ? t('closeMenu') : t('openMenu'));
    }

    try {
      localStorage.setItem('lang', lang);
    } catch (_) {
      /* private browsing — the choice just won't persist */
    }

    renderProjects();
  }

  function initLanguage() {
    let stored = null;
    try {
      stored = localStorage.getItem('lang');
    } catch (_) { /* ignore */ }
    const browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
    setLanguage(stored || (browser === 'es' ? 'es' : 'en'));
  }

  /* ------------------------------------------------------------------------
     Header: transparent over the hero, solid once past it
     ---------------------------------------------------------------------- */
  function initHeader() {
    const header = $('.site-header');
    const hero = $('.hero');
    if (!header || !hero) return;

    const sentinel = document.createElement('div');
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:70vh;pointer-events:none;';
    hero.appendChild(sentinel);

    const io = new IntersectionObserver(
      ([entry]) => {
        const overHero = entry.isIntersecting;
        header.toggleAttribute('data-over-hero', overHero);
        header.classList.toggle('is-stuck', !overHero);
      },
      { threshold: 0 }
    );
    io.observe(sentinel);
  }

  /* ------------------------------------------------------------------------
     Mobile navigation
     ---------------------------------------------------------------------- */
  function initNav() {
    const toggle = $('#nav-toggle');
    const nav = $('#primary-nav');
    const header = $('.site-header');
    if (!toggle || !nav || !header) return;

    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? t('closeMenu') : t('openMenu'));
      nav.classList.toggle('is-open', open);
      header.classList.toggle('menu-open', open);
      document.body.classList.toggle('is-locked', open);
    };

    toggle.addEventListener('click', () => {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Following a link should always dismiss the panel.
    nav.addEventListener('click', (e) => {
      if (e.target.closest('a')) setOpen(false);
    });

    // Resizing into the desktop layout must not leave the body locked.
    const desktop = window.matchMedia('(min-width: 900px)');
    const onChange = (e) => { if (e.matches) setOpen(false); };
    desktop.addEventListener('change', onChange);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------------------
     Scroll reveal + active nav link
     ---------------------------------------------------------------------- */
  function initReveal() {
    const items = $$('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    items.forEach((el) => io.observe(el));
  }

  function initActiveNav() {
    const sections = $$('main section[id]');
    const links = new Map(
      $$('.nav a[href^="#"]').map((a) => [a.getAttribute('href').slice(1), a])
    );
    if (!sections.length || !links.size) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = links.get(entry.target.id);
          if (!link) return;
          if (entry.isIntersecting) {
            links.forEach((el) => el.removeAttribute('aria-current'));
            link.setAttribute('aria-current', 'true');
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    sections.forEach((s) => io.observe(s));
  }

  /* ------------------------------------------------------------------------
     Boot
     ---------------------------------------------------------------------- */
  function init() {
    const yearEl = $('#year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    initLanguage();
    initHeader();
    initNav();
    initReveal();
    initActiveNav();
    watchImageLoad($('.hero-media img'));

    $('#lang-toggle')?.addEventListener('click', () => {
      setLanguage(lang === 'en' ? 'es' : 'en');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeInfo();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
