// Simple i18n and behavior
(function() {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // Dynamic projects data
  const projects = {
    interior: [
      {
        title: { en: 'Warm Minimal Apartment', es: 'Apartamento Minimal Cálido' },
        description: {
          en: 'A calm, functional interior with warm wood tones and natural light.',
          es: 'Un interior sereno y funcional con tonos de madera cálidos y luz natural.'
        },
        images: [
          './assets/interior-design/img1.png',
          './assets/interior-design/image.png',
          './assets/placeholder.svg',
          './assets/placeholder.svg'
        ]
      },
      {
        title: 'Textured Living Room',
        description: 'Soft textures and layered lighting for a cozy, modern feel.',
        images: [
          './assets/placeholder.svg',
          './assets/placeholder.svg'
        ]
      },
      {
        title: 'Compact Workspace',
        description: 'Efficient millwork and acoustic comfort in a small footprint.',
        images: [
          './assets/placeholder.svg'
        ]
      },
      {
        title: 'Serene Bedroom',
        description: 'Neutral palette with subtle contrasts and integrated storage.',
        images: [
          './assets/placeholder.svg',
          './assets/placeholder.svg'
        ]
      }
    ],
    residential: [
      {
        title: 'Courtyard Family Home',
        description: 'A modern residence centered around an airy courtyard for indoor-outdoor living.',
        images: [
          './assets/residential-design/image.png',
          './assets/placeholder.svg'
        ]
      },
      {
        title: 'Hillside Residence',
        description: 'Stepped volumes to adapt to slope and maximize views.',
        images: [
          './assets/placeholder.svg',
          './assets/placeholder.svg'
        ]
      },
      {
        title: 'Urban Infill House',
        description: 'Light-filled narrow lot home with central lightwell.',
        images: [
          './assets/placeholder.svg'
        ]
      },
      {
        title: 'Garden Pavilion',
        description: 'A small annex opening to the landscape with screened façades.',
        images: [
          './assets/placeholder.svg'
        ]
      },
      {
        title: 'Coastal Retreat',
        description: 'Simple geometry and durable materials for seaside climate.',
        images: [
          './assets/placeholder.svg'
        ]
      }
    ],
    remodeling: [
      {
        title: 'Kitchen Revitalization',
        description: 'A compact kitchen transformed for flow, storage, and durable finishes.',
        images: [
          './assets/remodelation/image.png',
          './assets/placeholder.svg'
        ]
      },
      {
        title: 'Bathroom Refresh',
        description: 'Optimized layout, bright finishes, and improved ventilation.',
        images: [
          './assets/placeholder.svg'
        ]
      },
      {
        title: 'Living Area Update',
        description: 'Open plan with better daylight and integrated storage.',
        images: [
          './assets/placeholder.svg',
          './assets/placeholder.svg'
        ]
      },
      {
        title: 'Facade Renewal',
        description: 'Envelope improvements for energy efficiency and presence.',
        images: [
          './assets/placeholder.svg'
        ]
      }
    ],
    permits: [
      {
        title: 'Permit Package A-Z',
        description: 'Complete permit management including drawings, submissions, and approvals.',
        images: [
          './assets/permit/image.png',
          './assets/placeholder.svg'
        ]
      },
      {
        title: 'Change of Use',
        description: 'Advisory and documentation for program changes.',
        images: [
          './assets/placeholder.svg'
        ]
      },
      {
        title: 'Minor Works Authorization',
        description: 'Expedited documentation for small interventions.',
        images: [
          './assets/placeholder.svg'
        ]
      },
      {
        title: 'Compliance Review',
        description: 'Code check and report before submission.',
        images: [
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
      brandName: 'Your Architecture Studio',
      brandShort: 'Architecture Studio',
      navInterior: 'Interior',
      navResidential: 'Residential',
      navRemodeling: 'Remodeling',
      navPermits: 'Permits',
      navContact: 'Contact',
      ctaPrimary: 'Contact',
      ctaConsultation: 'Free Consultation',
      heroTitle: 'Thoughtful architecture for modern living.',
      heroSubtitle: 'Interior and residential design, remodeling, and permit management—delivered with clarity and care.',
      interiorTitle: 'Interior Design',
      interiorLead: 'Spaces that feel as good as they look—balanced, functional, and timeless.',
      residentialTitle: 'Residential Design',
      residentialLead: 'Thoughtful homes tailored to your lifestyle and context.',
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
      brandName: 'Tu Estudio de Arquitectura',
      brandShort: 'Estudio de Arquitectura',
      navInterior: 'Interiores',
      navResidential: 'Residencial',
      navRemodeling: 'Remodelación',
      navPermits: 'Permisos',
      navContact: 'Contacto',
      ctaPrimary: 'Contacto',
      ctaConsultation: 'Consulta Gratis',
      heroTitle: 'Arquitectura consciente para la vida moderna.',
      heroSubtitle: 'Diseño de interiores y residencial, remodelación y gestión de permisos—con claridad y dedicación.',
      interiorTitle: 'Diseño de Interiores',
      interiorLead: 'Espacios que se sienten tan bien como se ven—equilibrados, funcionales y atemporales.',
      residentialTitle: 'Diseño Residencial',
      residentialLead: 'Hogares pensados para tu estilo de vida y contexto.',
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

  const phone = '50377432781'; // E.164 without plus sign for wa.me

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
        fig.innerHTML = `
          <img src="${(proj.images && proj.images[0]) || './assets/placeholder.svg'}" alt="${title}" />
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
          <img id="modal-image" alt="Project image" />
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
    wrap.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    const wrap = ensureModal();
    wrap.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function updateModalImage() {
    const { section, index, imgIndex } = modalState;
    const images = projects[section]?.[index]?.images || [];
    const src = images[imgIndex] || './assets/placeholder.svg';
    const imgEl = $('#modal-image');
    if (imgEl) imgEl.src = src;
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
