// Theme toggle with localStorage persistence
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

const savedTheme = localStorage.getItem('theme') || 'dark';
root.setAttribute('data-theme', savedTheme);
themeIcon.textContent = savedTheme === 'dark' ? 'light_mode' : 'dark_mode';

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeIcon.textContent = next === 'dark' ? 'light_mode' : 'dark_mode';
});

// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Scrolled nav state
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Active nav link on scroll via IntersectionObserver
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.35, rootMargin: '-60px 0px -40% 0px' });

sections.forEach(s => navObserver.observe(s));

// Fade-in on scroll
const fadeTargets = document.querySelectorAll(
  '.timeline-card, .project-card, .article-card, .paper-card, .event-card, .stat-card, .contact-card, .edu-card, .cert-badge, .about-text, .about-stats'
);

fadeTargets.forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = `${(i % 5) * 0.07}s`;
});

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

fadeTargets.forEach(el => fadeObserver.observe(el));

// Close nav on outside click
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('open') && !nav.contains(e.target)) {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});
