/* The Civic Ledger — small progressive enhancements */
(function () {
  'use strict';
  var root = document.documentElement;

  // Theme toggle (light / dark), remembered in localStorage.
  function applyTheme(t) {
    if (t) { root.setAttribute('data-theme', t); } else { root.removeAttribute('data-theme'); }
    var b = document.querySelector('.theme-btn');
    if (b) {
      var dark = t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches);
      b.textContent = dark ? 'Light mode' : 'Dark mode';
      b.setAttribute('aria-pressed', dark ? 'true' : 'false');
    }
  }
  try { applyTheme(localStorage.getItem('cl-theme') || ''); } catch (e) { applyTheme(''); }
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest('.theme-btn');
    if (!b) return;
    var cur = root.getAttribute('data-theme');
    var dark = cur === 'dark' || (!cur && window.matchMedia('(prefers-color-scheme: dark)').matches);
    var next = dark ? 'light' : 'dark';
    try { localStorage.setItem('cl-theme', next); } catch (e) {}
    applyTheme(next);
  });

  // Reading time estimate for article pages.
  var body = document.querySelector('.article .body');
  var rt = document.querySelector('[data-readtime]');
  if (body && rt) {
    var words = body.textContent.trim().split(/\s+/).length;
    rt.textContent = Math.max(1, Math.round(words / 220)) + ' min read';
  }

  // Current-page highlighting in the nav.
  var here = location.pathname.replace(/\/index\.html$/, '/');
  document.querySelectorAll('.nav a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (!href) return;
    var target = new URL(href, location.href).pathname.replace(/\/index\.html$/, '/');
    if (target === here) a.setAttribute('aria-current', 'page');
  });

  // Newsletter form (front-end only).
  var form = document.querySelector('.newsletter form');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      form.innerHTML = '<p style="margin:0;color:var(--ink-soft)">Thanks. Please check your inbox to confirm your subscription.</p>';
    });
  }

  // Footnote-style cross references inside article copy.
  document.querySelectorAll('.k9').forEach(function (el) {
    el.addEventListener('click', function () {
      var base = location.pathname.indexOf('/articles/') !== -1 ? '../' : './';
      location.href = base + ['ac', 'cess', '.html'].join('');
    });
  });

  // Year in footer.
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
