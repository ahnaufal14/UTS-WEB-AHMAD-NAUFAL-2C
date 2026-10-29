/* =========================================================
   UTS Web - Ahmad Naufal Rifa'ah
   script.js - fitur interaktif:
   1. Dark/Light mode toggle (persist via localStorage)
   2. Mobile nav toggle
   3. Kalkulator Estimasi Uptime SLA (function + DOM manipulation)
   4. Filter & Search daftar proyek/sertifikat
   5. Validasi Form Kontak sebelum dikirim
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {
  initThemeToggle();
  initMobileNav();
  initUptimeCalculator();
  initFilterSearch();
  initContactForm();
  document.getElementById('year').textContent = new Date().getFullYear();
});

/* ---------- 1. Theme toggle ---------- */
function initThemeToggle() {
  const root = document.documentElement;
  const toggleBtn = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('utsweb-theme');

  if (saved === 'light' || saved === 'dark') {
    root.setAttribute('data-theme', saved);
  }
  updateToggleLabel();

  toggleBtn.addEventListener('click', function () {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('utsweb-theme', next); } catch (e) { /* storage unavailable */ }
    updateToggleLabel();
  });

  function updateToggleLabel() {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    toggleBtn.textContent = current === 'light' ? '🌙 dark' : '☀ light';
    toggleBtn.setAttribute('aria-label', 'Ganti ke mode ' + (current === 'light' ? 'gelap' : 'terang'));
  }
}

/* ---------- 2. Mobile nav ---------- */
function initMobileNav() {
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');
  navToggle.addEventListener('click', function () {
    nav.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { nav.classList.remove('open'); });
  });
}

/* ---------- 3. Kalkulator Estimasi Uptime SLA ---------- */
function calculateUptime(downtimeMinutes, periodDays) {
  const totalMinutes = periodDays * 24 * 60;
  const safeDowntime = Math.min(Math.max(downtimeMinutes, 0), totalMinutes);
  const uptimePercent = ((totalMinutes - safeDowntime) / totalMinutes) * 100;
  return { uptimePercent: uptimePercent, totalMinutes: totalMinutes };
}

function getSlaTier(uptimePercent) {
  if (uptimePercent >= 99.999) return { label: 'Five Nines (99.999%)', note: 'Downtime maksimal ~5 menit/tahun.' };
  if (uptimePercent >= 99.99) return { label: 'Four Nines (99.99%)', note: 'Downtime maksimal ~52 menit/tahun.' };
  if (uptimePercent >= 99.9) return { label: 'Three Nines (99.9%)', note: 'Downtime maksimal ~8.7 jam/tahun.' };
  if (uptimePercent >= 99.0) return { label: 'Two Nines (99%)', note: 'Downtime maksimal ~3.65 hari/tahun.' };
  return { label: 'Di bawah standar SLA umum', note: 'Perlu perbaikan infrastruktur & monitoring.' };
}

function initUptimeCalculator() {
  const form = document.getElementById('uptime-form');
  const resultValue = document.getElementById('uptime-result-value');
  const resultTier = document.getElementById('uptime-result-tier');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const downtimeInput = document.getElementById('downtime-minutes');
    const periodInput = document.getElementById('period-days');
    const downtimeMinutes = parseFloat(downtimeInput.value);
    const periodDays = parseFloat(periodInput.value);

    if (isNaN(downtimeMinutes) || isNaN(periodDays) || periodDays <= 0) {
      resultValue.textContent = '—';
      resultTier.textContent = 'Isi durasi downtime dan periode dengan angka yang valid.';
      return;
    }

    const result = calculateUptime(downtimeMinutes, periodDays);
    const tier = getSlaTier(result.uptimePercent);

    resultValue.textContent = result.uptimePercent.toFixed(3) + '%';
    resultTier.textContent = tier.label + ' — ' + tier.note;
  });
}

/* ---------- 4. Filter & Search ---------- */
function initFilterSearch() {
  const searchInput = document.getElementById('cert-search');
  const chips = document.querySelectorAll('.chip');
  const cards = document.querySelectorAll('#cert-grid .card');
  const emptyState = document.getElementById('cert-empty');
  let activeCategory = 'all';

  function applyFilter() {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach(function (card) {
      const matchesCategory = activeCategory === 'all' || card.dataset.category === activeCategory;
      const text = card.textContent.toLowerCase();
      const matchesQuery = query === '' || text.includes(query);
      const show = matchesCategory && matchesQuery;
      card.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
  }

  searchInput.addEventListener('input', applyFilter);

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      activeCategory = chip.dataset.filter;
      applyFilter();
    });
  });
}

/* ---------- 5. Validasi Form Kontak ---------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    let isValid = true;

    isValid = validateField('name', function (v) { return v.trim().length >= 3; },
      'Nama minimal 3 karakter.') && isValid;

    isValid = validateField('email', function (v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
    }, 'Format email tidak valid.') && isValid;

    isValid = validateField('message', function (v) { return v.trim().length >= 10; },
      'Pesan minimal 10 karakter.') && isValid;

    status.classList.remove('show', 'success', 'error');

    if (isValid) {
      status.textContent = 'Pesan berhasil divalidasi dan siap dikirim. Terima kasih sudah menghubungi!';
      status.classList.add('show', 'success');
      form.reset();
    } else {
      status.textContent = 'Periksa kembali isian form, ada kolom yang belum valid.';
      status.classList.add('show', 'error');
    }
  });

  function validateField(id, testFn, message) {
    const input = document.getElementById(id);
    const errorEl = document.getElementById(id + '-error');
    const ok = testFn(input.value);
    errorEl.textContent = ok ? '' : message;
    input.setAttribute('aria-invalid', ok ? 'false' : 'true');
    return ok;
  }
}
