/* SWARASHTRA 3.0 — Scroll & galleries */

gsap.registerPlugin(ScrollTrigger);

const GALLERY_1 = Array.from({ length: 22 }, (_, i) =>
  `gallery/img-${String(i + 1).padStart(2, '0')}.jpeg`
);
const GALLERY_2 = Array.from({ length: 23 }, (_, i) =>
  `gallery/img-${String(i + 23).padStart(2, '0')}.jpeg`
);

let lenis;
const scrollTriggers = [];

function buildHorizontalGallery() {
  const track = document.getElementById('track-1');
  if (!track) return;

  GALLERY_1.forEach((src, i) => {
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.innerHTML = `
      <img src="${src}" alt="SWARASHTRA 1.0 — photo ${i + 1}" width="340" height="425" />
      <span class="gallery-card-label">Edition 1.0 · ${String(i + 1).padStart(2, '0')}</span>
    `;
    track.appendChild(card);
  });
}

function buildStackGallery() {
  const stack = document.getElementById('stack-2');
  const totalEl = document.getElementById('stack-total');
  if (!stack) return;

  if (totalEl) totalEl.textContent = GALLERY_2.length;

  GALLERY_2.forEach((src, i) => {
    const page = document.createElement('div');
    page.className = 'stack-page';
    page.innerHTML = `
      <img src="${src}" alt="SWARASHTRA 2.0 — photo ${i + 1}" width="560" height="700" />
      <div class="stack-page-overlay">
        <span>Edition 2.0 · ${String(i + 1).padStart(2, '0')}</span>
      </div>
    `;
    stack.appendChild(page);
  });
}

function preloadImages() {
  return Promise.all(
    [...GALLERY_1, ...GALLERY_2].map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve;
          img.src = src;
        })
    )
  );
}

function runLoader() {
  const loader = document.getElementById('loader');
  const fill = document.querySelector('.loader-fill');
  const count = document.querySelector('.loader-count');
  let progress = 0;

  const tick = setInterval(() => {
    progress = Math.min(progress + Math.random() * 10, 92);
    fill.style.width = `${progress}%`;
    count.textContent = `${Math.floor(progress)}%`;
  }, 70);

  preloadImages().then(() => {
    clearInterval(tick);
    fill.style.width = '100%';
    count.textContent = '100%';
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.add('loaded');
      initAnimations();
    }, 350);
  });
}

function initLenis() {
  lenis = new Lenis({
    duration: 1.0,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.9,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: innerWidth, height: innerHeight };
    },
  });

  ScrollTrigger.addEventListener('refresh', () => lenis.resize());
}

function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress-bar');
  scrollTriggers.push(
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        bar.style.width = `${self.progress * 100}%`;
      },
    })
  );
}

function initHeader() {
  const header = document.querySelector('.site-header');
  scrollTriggers.push(
    ScrollTrigger.create({
      start: 60,
      onUpdate: (self) => header.classList.toggle('scrolled', self.scroll() > 60),
    })
  );
}

function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav-mobile');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.classList.toggle('active', open);
    toggle.setAttribute('aria-expanded', open);
    nav.setAttribute('aria-hidden', !open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) lenis?.stop();
    else lenis?.start();
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      nav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      lenis?.start();
    });
  });
}

function initReveals() {
  gsap.utils.toArray('.reveal-up').forEach((el) => {
    const delay = parseFloat(el.dataset.delay || 0);
    scrollTriggers.push(
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(el, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay,
            ease: 'power3.out',
          });
        },
        once: true,
      })
    );
  });
}

function initHeroParallax() {
  gsap.to('.hero-orb--1', {
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
    y: 80,
  });
  gsap.to('.hero-content', {
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8 },
    y: 60,
    opacity: 0.2,
  });
}

function initCounters() {
  document.querySelectorAll('.stat-num').forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    scrollTriggers.push(
      ScrollTrigger.create({
        trigger: '.hero-stats',
        start: 'top 95%',
        once: true,
        onEnter: () => {
          gsap.to(
            { val: 0 },
            {
              val: target,
              duration: 1.8,
              ease: 'power2.out',
              onUpdate: function () {
                const v = Math.floor(this.targets()[0].val);
                el.textContent = v.toLocaleString() + (target >= 1000 ? '+' : '');
              },
            }
          );
        },
      })
    );
  });
}

function getHorizontalScrollDistance(track, section) {
  const padding = 48;
  return Math.max(0, track.scrollWidth - section.offsetWidth + padding);
}

function initHorizontalGallery() {
  const section = document.querySelector('#gallery-1');
  const track = document.getElementById('track-1');
  const progressBar = document.getElementById('progress-1');
  if (!section || !track) return;

  gsap.set(track, { x: 0 });

  const st = ScrollTrigger.create({
    trigger: section,
    pin: section.querySelector('.gallery-shell'),
    start: 'top top',
    end: () => `+=${getHorizontalScrollDistance(track, section)}`,
    scrub: 0.5,
    invalidateOnRefresh: true,
    anticipatePin: 1,
    onUpdate: (self) => {
      if (progressBar) progressBar.style.width = `${self.progress * 100}%`;
    },
  });

  scrollTriggers.push(st);

  gsap.to(track, {
    x: () => -getHorizontalScrollDistance(track, section),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${getHorizontalScrollDistance(track, section)}`,
      scrub: 0.5,
      invalidateOnRefresh: true,
    },
  });
}

function initStackGallery() {
  const section = document.querySelector('#gallery-2');
  const pages = gsap.utils.toArray('#stack-2 .stack-page');
  const progressBar = document.getElementById('progress-2');
  const counter = document.getElementById('stack-current');
  if (!section || !pages.length) return;

  const total = pages.length;

  pages.forEach((page, i) => {
    gsap.set(page, {
      zIndex: i + 1,
      yPercent: i === 0 ? 0 : 100,
    });
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      pin: section.querySelector('.gallery-shell'),
      start: 'top top',
      end: () => `+=${(total - 1) * innerHeight * 0.75}`,
      scrub: 0.6,
      invalidateOnRefresh: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        if (progressBar) progressBar.style.width = `${self.progress * 100}%`;
        if (counter) {
          const idx = Math.min(total, Math.max(1, Math.ceil(self.progress * total)));
          counter.textContent = idx;
        }
      },
    },
  });

  for (let i = 1; i < total; i++) {
    tl.to(pages[i], { yPercent: 0, duration: 1, ease: 'none' });
  }
}

function initBridge() {
  gsap.from('.bridge-title', {
    scrollTrigger: { trigger: '.bridge', start: 'top 75%', toggleActions: 'play none none none' },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
  });
}

function initFeatures() {
  gsap.from('.feature-card', {
    scrollTrigger: { trigger: '.features-grid', start: 'top 85%', toggleActions: 'play none none none' },
    y: 40,
    opacity: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power3.out',
  });
}

function initForm() {
  const form = document.querySelector('.register-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button');
    const original = btn.textContent;
    btn.textContent = "You're registered!";
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
      form.reset();
    }, 2500);
  });
}

function initAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target && lenis) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -68, duration: 1.2 });
      }
    });
  });
}

function initAnimations() {
  initLenis();
  initScrollProgress();
  initHeader();
  initMobileNav();
  initReveals();
  initHeroParallax();
  initCounters();
  initHorizontalGallery();
  initStackGallery();
  initBridge();
  initFeatures();
  initForm();
  initAnchors();

  ScrollTrigger.refresh();
}

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
});

document.addEventListener('DOMContentLoaded', () => {
  buildHorizontalGallery();
  buildStackGallery();
  runLoader();
});
