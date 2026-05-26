const NotificationSystem = {
  unreadCount: 0,
  toasts: [],

  init() {
    const readIds = Utils.loadStorage('edusphere-read-notifs', []);
    EduData.notifications.forEach(n => {
      n.read = readIds.includes(n.id) || n.read;
    });
    this.unreadCount = EduData.notifications.filter(n => !n.read).length;
    this.updateBadge();
    this.bindDropdown();
    this.renderDropdownList();
  },

  updateBadge() {
    const badge = document.querySelector('.notif-badge');
    if (badge) {
      badge.textContent = this.unreadCount > 99 ? '99+' : this.unreadCount;
      badge.style.display = this.unreadCount > 0 ? 'flex' : 'none';
    }
  },

  bindDropdown() {
    const btn = document.querySelector('[data-notif-toggle]');
    const menu = document.querySelector('.notif-dropdown');
    if (!btn || !menu) return;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('open');
    });
    document.addEventListener('click', () => menu.classList.remove('open'));
    menu.addEventListener('click', (e) => e.stopPropagation());
  },

  renderDropdownList(limit = 15) {
    const list = document.querySelector('.notif-list');
    if (!list) return;
    const items = EduData.notifications.slice(0, limit);
    list.innerHTML = items.map(n => `
      <div class="notif-item ${n.read ? '' : 'unread'}" data-id="${n.id}">
        <strong>${n.icon} ${n.title}</strong>
        <p style="font-size:0.85rem;color:var(--text-secondary);margin:0.25rem 0">${n.message.slice(0, 80)}...</p>
        <small>${n.time}</small>
      </div>
    `).join('');
    list.querySelectorAll('.notif-item').forEach(el => {
      el.addEventListener('click', () => this.markRead(el.dataset.id));
    });
  },

  renderFullPage(container) {
    if (!container) return;
    container.innerHTML = EduData.notifications.map(n => `
      <div class="card notif-item ${n.read ? '' : 'unread'}" style="margin-bottom:0.75rem" data-id="${n.id}">
        <div class="flex-between">
          <strong>${n.icon} ${n.title}</strong>
          <span class="tag tag-${n.type === 'quiz' ? 'accent' : 'success'}">${n.type}</span>
        </div>
        <p class="mt-1 text-muted">${n.message}</p>
        <small class="text-muted">${n.time}</small>
      </div>
    `).join('');
  },

  markRead(id) {
    const n = EduData.notifications.find(x => x.id === id);
    if (n && !n.read) {
      n.read = true;
      this.unreadCount--;
      this.updateBadge();
      const ids = Utils.loadStorage('edusphere-read-notifs', []);
      ids.push(id);
      Utils.saveStorage('edusphere-read-notifs', ids);
      this.renderDropdownList();
    }
  },

  toast(message, type = 'info', duration = 4000) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<strong>${message}</strong>`;
    container.appendChild(el);
    setTimeout(() => el.remove(), duration);
  }
};
