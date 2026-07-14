/**
 * Laverton Award Bakery Cafe and Takeaway
 * Main site interactions
 */

(function () {
  'use strict';

  const HOURS = {
    weekday: { open: 5.5, close: 16 },   // Mon–Fri 5:30 AM – 4:00 PM
    weekend: { open: 8, close: 15 }       // Sat–Sun 8:00 AM – 3:00 PM
  };

  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const openStatus = document.getElementById('openStatus');
  const yearEl = document.getElementById('year');

  function isOpenNow() {
    const now = new Date();
    const day = now.getDay();
    const hours = (day === 0 || day === 6) ? HOURS.weekend : HOURS.weekday;
    const current = now.getHours() + now.getMinutes() / 60;
    return current >= hours.open && current < hours.close;
  }

  function updateOpenStatus() {
    if (!openStatus) return;

    const open = isOpenNow();
    const statusText = openStatus.querySelector('.status-text');

    openStatus.classList.remove('open', 'closed');
    openStatus.classList.add(open ? 'open' : 'closed');
    statusText.textContent = open ? 'Open Now' : 'Currently Closed';
  }

  function handleScroll() {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }
  }

  function toggleNav() {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', String(!expanded));
    document.body.style.overflow = !expanded ? 'hidden' : '';
  }

  function closeNav() {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach((el) => observer.observe(el));
  }

  function initSmoothNav() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        closeNav();
        target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  updateOpenStatus();
  setInterval(updateOpenStatus, 60000);

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (navToggle) {
    navToggle.addEventListener('click', toggleNav);
  }

  if (navLinks) {
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeNav);
    });
  }

  initReveal();
  initSmoothNav();
})();
