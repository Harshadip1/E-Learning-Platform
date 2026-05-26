const Utils = {
  $(sel, ctx = document) { return ctx.querySelector(sel); },
  $$(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; },

  formatNumber(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toString();
  },

  stars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - half);
  },

  debounce(fn, ms = 300) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), ms);
    };
  },

  getQueryParam(key) {
    return new URLSearchParams(window.location.search).get(key);
  },

  paginate(arr, page, perPage = 24) {
    const start = (page - 1) * perPage;
    return {
      items: arr.slice(start, start + perPage),
      total: arr.length,
      pages: Math.ceil(arr.length / perPage),
      page,
      perPage
    };
  },

  renderPagination(container, currentPage, totalPages, onPage) {
    if (!container || totalPages <= 1) {
      if (container) container.innerHTML = '';
      return;
    }
    let html = '';
    const max = 7;
    let start = Math.max(1, currentPage - 3);
    let end = Math.min(totalPages, start + max - 1);
    start = Math.max(1, end - max + 1);
    if (currentPage > 1) html += `<button data-page="${currentPage - 1}">‹</button>`;
    for (let i = start; i <= end; i++) {
      html += `<button data-page="${i}" class="${i === currentPage ? 'active' : ''}">${i}</button>`;
    }
    if (currentPage < totalPages) html += `<button data-page="${currentPage + 1}">›</button>`;
    container.innerHTML = html;
    container.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => onPage(parseInt(btn.dataset.page, 10)));
    });
  },

  saveStorage(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* ignore */ }
  },

  loadStorage(key, fallback = null) {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch (e) { return fallback; }
  },

  observeFadeIn() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
  },

  createParticles(count = 30) {
    const container = document.querySelector('.particles');
    if (!container) return;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDelay = Math.random() * 20 + 's';
      p.style.animationDuration = 15 + Math.random() * 15 + 's';
      container.appendChild(p);
    }
  },

  youtubeEmbed(videoId) {
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
  },

  lazyLoadImages() {
    const imgs = document.querySelectorAll('img[data-src]');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.src = e.target.dataset.src;
          e.target.removeAttribute('data-src');
          obs.unobserve(e.target);
        }
      });
    });
    imgs.forEach(img => obs.observe(img));
  }
};
