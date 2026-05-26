const ThemeManager = {
  KEY: 'edusphere-theme',

  init() {
    const saved = Utils.loadStorage(this.KEY, 'dark');
    this.set(saved);
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
    });
  },

  set(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    Utils.saveStorage(this.KEY, theme);
    const icon = document.querySelector('.theme-icon');
    if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  },

  toggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    this.set(current === 'dark' ? 'light' : 'dark');
  },

  get() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  }
};
