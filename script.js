// ============ NAV: scroll shrink + mobile menu ============
const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('is-open');
  burger.setAttribute('aria-expanded', false);
}));

// ============ REVEAL ON SCROLL ============
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// ============ HERO HOOK CAPTION CYCLE ============
const hookLines = document.querySelectorAll('.hook-line');
let hookIndex = 0;
if (hookLines.length) {
  setInterval(() => {
    hookLines[hookIndex].classList.remove('is-active');
    hookIndex = (hookIndex + 1) % hookLines.length;
    hookLines[hookIndex].classList.add('is-active');
  }, 2400);
}

// ============ HERO VIDEO: autoplay + sound toggle ============
const heroVideo = document.getElementById('heroVideo');
const heroSound = document.getElementById('heroSound');
if (heroVideo) {
  heroVideo.play().catch(() => {});
  heroSound.addEventListener('click', () => {
    heroVideo.muted = !heroVideo.muted;
    heroSound.textContent = heroVideo.muted ? '🔇' : '🔊';
  });
}

// ============ SHOWREEL CARDS: lazy-load + hover/tap play ============
const reelCards = document.querySelectorAll('.reel-card');
reelCards.forEach(card => {
  const video = card.querySelector('video');
  const src = card.dataset.video;
  let loaded = false;

  function ensureLoaded() {
    if (!loaded) {
      const source = document.createElement('source');
      source.src = src;
      source.type = 'video/mp4';
      video.appendChild(source);
      video.load();
      loaded = true;
    }
  }

  card.addEventListener('mouseenter', () => {
    ensureLoaded();
    video.play().catch(() => {});
  });
  card.addEventListener('mouseleave', () => {
    video.pause();
  });
  card.addEventListener('click', () => openLightbox(src, card.dataset.title));
});

// ============ LIGHTBOX ============
const lightbox = document.getElementById('lightbox');
const lightboxVideo = document.getElementById('lightboxVideo');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(src, title) {
  lightboxVideo.src = src;
  lightboxVideo.muted = false;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  lightboxVideo.play().catch(() => {});
  document.body.style.overflow = 'hidden';
  if (title) lightboxVideo.setAttribute('aria-label', title);
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxVideo.pause();
  lightboxVideo.removeAttribute('src');
  lightboxVideo.load();
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

// ============ AMBIENT CURSOR GLOW (desktop, fine pointer only) ============
const heroGlow = document.querySelector('.hero-glow');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

if (heroGlow && hasFinePointer && !prefersReducedMotion) {
  document.querySelector('.hero').addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    heroGlow.style.transform = `translateX(calc(-40% + ${x}px)) translateY(${y}px)`;
  });
}

// ============ FOOTER YEAR ============
document.getElementById('year').textContent = new Date().getFullYear();
