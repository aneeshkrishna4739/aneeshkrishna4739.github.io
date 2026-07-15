/* Aneesh Krishna — portfolio interactions */
(function () {
  'use strict';
  var root = document.documentElement;

  /* ----- Theme toggle ----- */
  var toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { }
    });
  }

  /* ----- Mobile nav ----- */
  var menuBtn = document.querySelector('.menu-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function () {
      var open = mobileNav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  /* ----- Header shadow on scroll ----- */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ----- Scroll-spy: highlight active nav link ----- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          navLinks.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ----- Reveal on scroll (robust: above-fold shows instantly, with a safety net) ----- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  function revealAll() { reveals.forEach(function (el) { el.classList.add('in'); }); }
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    revealAll();
  } else {
    var revObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) {
      // Anything already on screen reveals immediately (no dependency on the async callback);
      // the rest animate in as they scroll into view.
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        el.classList.add('in');
      } else {
        revObs.observe(el);
      }
    });
    // Safety net: never leave content hidden if the observer misbehaves.
    window.addEventListener('load', function () { setTimeout(revealAll, 700); });
  }

  /* ----- Footer year ----- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
