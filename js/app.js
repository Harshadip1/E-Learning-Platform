/**
 * EduSphere - Main Application Bootstrap
 */
const App = {
  currentPage: '',

  navLinks: [
    { href: 'index.html', label: 'Home', icon: '🏠' },
    { href: 'dashboard.html', label: 'Dashboard', icon: '📊' },
    { href: 'courses.html', label: 'Courses', icon: '📚' },
    { href: 'lessons.html', label: 'Learn', icon: '🎬' },
    { href: 'quizzes.html', label: 'Quizzes', icon: '✅' },
    { href: 'community.html', label: 'Community', icon: '💬' }
  ],

  sidebarLinks: [
    { section: 'Learning', links: [
      { href: 'dashboard.html', label: 'Dashboard', icon: '📊' },
      { href: 'courses.html', label: 'My Courses', icon: '📚' },
      { href: 'lessons.html', label: 'Video Lessons', icon: '🎬' },
      { href: 'progress.html', label: 'Progress', icon: '📈' },
      { href: 'analytics.html', label: 'Analytics', icon: '📉' },
      { href: 'certificates.html', label: 'Certificates', icon: '🏆' },
      { href: 'assignments.html', label: 'Assignments', icon: '📝' },
      { href: 'quizzes.html', label: 'Quizzes & Exams', icon: '✅' },
      { href: 'exam-results.html', label: 'Exam Results', icon: '📋' }
    ]},
    { section: 'Community', links: [
      { href: 'community.html', label: 'Discussion Forum', icon: '💬' },
      { href: 'study-groups.html', label: 'Study Groups', icon: '👥' },
      { href: 'leaderboard.html', label: 'Leaderboard', icon: '🏅' },
      { href: 'live-classes.html', label: 'Live Classes', icon: '📹' }
    ]},
    { section: 'Tools', links: [
      { href: 'coding.html', label: 'Coding Practice', icon: '💻' },
      { href: 'ai-tutor.html', label: 'AI Tutor', icon: '🤖' },
      { href: 'notes.html', label: 'Notes & Bookmarks', icon: '📒' },
      { href: 'calendar.html', label: 'Calendar', icon: '📅' },
      { href: 'gamification.html', label: 'Gamification', icon: '🎮' },
      { href: 'notifications.html', label: 'Notifications', icon: '🔔' }
    ]},
    { section: 'Account', links: [
      { href: 'instructors.html', label: 'Instructors', icon: '👨‍🏫' },
      { href: 'instructor-dashboard.html', label: 'Instructor Panel', icon: '🎓' },
      { href: 'profile.html', label: 'Profile', icon: '👤' },
      { href: 'settings.html', label: 'Settings', icon: '⚙️' },
      { href: 'security.html', label: 'Security', icon: '🔒' },
      { href: 'subscription.html', label: 'Subscription', icon: '💳' }
    ]}
  ],

  renderHeader(includeSearch = true) {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    return `
      <header class="site-header">
        <div class="container header-inner">
          <a href="index.html" class="logo">
            <span class="logo-icon">E</span>
            EduSphere
          </a>
          <nav class="nav-main">
            ${this.navLinks.map(l => `
              <a href="${l.href}" class="${path === l.href ? 'active' : ''}">${l.label}</a>
            `).join('')}
          </nav>
          <div class="header-actions">
            ${includeSearch ? `
              <div class="search-box">
                <span>🔍</span>
                <input type="search" id="global-search" placeholder="Search courses..." aria-label="Search">
              </div>
            ` : ''}
            <button class="icon-btn" data-theme-toggle title="Toggle theme"><span class="theme-icon">☀️</span></button>
            <div class="dropdown">
              <button class="icon-btn" data-notif-toggle aria-label="Notifications">
                🔔
                <span class="badge-count notif-badge">0</span>
              </button>
              <div class="dropdown-menu notif-dropdown">
                <div style="padding:0.75rem 1rem;border-bottom:1px solid var(--border)">
                  <strong>Notifications</strong>
                </div>
                <div class="notif-list"></div>
                <a href="notifications.html" style="display:block;padding:0.75rem;text-align:center;font-size:0.85rem">View all</a>
              </div>
            </div>
            <a href="profile.html" class="icon-btn" title="Profile">👤</a>
            <button class="icon-btn menu-toggle" id="menu-toggle" aria-label="Menu">☰</button>
          </div>
        </div>
      </header>
    `;
  },

  renderSidebar() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    return `
      <aside class="sidebar" id="sidebar">
        ${this.sidebarLinks.map(section => `
          <div class="sidebar-section">${section.section}</div>
          <ul class="sidebar-nav">
            ${section.links.map(l => `
              <li><a href="${l.href}" class="${path === l.href ? 'active' : ''}">
                <span class="nav-icon">${l.icon}</span>${l.label}
              </a></li>
            `).join('')}
          </ul>
        `).join('')}
      </aside>
      <div class="sidebar-overlay" id="sidebar-overlay"></div>
    `;
  },

  renderFooter() {
    return `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div>
            <a href="index.html" class="logo" style="margin-bottom:1rem;display:inline-flex">EduSphere</a>
            <p class="text-muted" style="font-size:0.9rem">Enterprise-grade online learning platform. ${EduData.platformStats.totalCourses}+ courses, ${EduData.platformStats.totalLessons}+ lessons.</p>
          </div>
          <div>
            <h4>Platform</h4>
            <ul>
              <li><a href="courses.html">Courses</a></li>
              <li><a href="instructors.html">Instructors</a></li>
              <li><a href="subscription.html">Pricing</a></li>
              <li><a href="about.html">About</a></li>
            </ul>
          </div>
          <div>
            <h4>Resources</h4>
            <ul>
              <li><a href="community.html">Community</a></li>
              <li><a href="coding.html">Coding Practice</a></li>
              <li><a href="ai-tutor.html">AI Tutor</a></li>
              <li><a href="downloads.html">Offline Learning</a></li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li><a href="contact.html">Contact</a></li>
              <li><a href="settings.html">Settings</a></li>
              <li><a href="security.html">Security</a></li>
              <li><a href="reports.html">Reports</a></li>
            </ul>
          </div>
        </div>
        <div class="container footer-bottom">
          <span>© 2024 EduSphere Learning Platform. Demo application.</span>
          <span>${Utils.formatNumber(EduData.platformStats.totalStudents)}+ learners worldwide</span>
        </div>
      </footer>
    `;
  },

  injectLayout(options = {}) {
    const headerEl = document.getElementById('app-header');
    const footerEl = document.getElementById('app-footer');
    const sidebarEl = document.getElementById('app-sidebar');
    if (headerEl) headerEl.innerHTML = this.renderHeader(options.search !== false);
    if (footerEl) footerEl.innerHTML = this.renderFooter();
    if (sidebarEl) sidebarEl.innerHTML = this.renderSidebar();
  },

  bindGlobalEvents() {
    document.getElementById('menu-toggle')?.addEventListener('click', () => {
      document.getElementById('sidebar')?.classList.toggle('open');
      document.getElementById('sidebar-overlay')?.classList.toggle('open');
    });
    document.getElementById('sidebar-overlay')?.addEventListener('click', () => {
      document.getElementById('sidebar')?.classList.remove('open');
      document.getElementById('sidebar-overlay')?.classList.remove('open');
    });

    const globalSearch = document.getElementById('global-search');
    if (globalSearch) {
      globalSearch.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          window.location.href = `search.html?q=${encodeURIComponent(globalSearch.value)}`;
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        globalSearch?.focus();
      }
      if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        ThemeManager.toggle();
      }
    });
  },

  initHome() {
    const featured = document.getElementById('featured-courses');
    if (featured) CourseManager.renderGrid(featured, EduData.courses.filter(c => c.featured));

    const categories = document.getElementById('categories-grid');
    if (categories) {
      categories.innerHTML = EduData.CATEGORIES.map((cat, i) => `
        <a href="courses.html?category=${encodeURIComponent(cat)}" class="card category-card fade-in">
          <div class="cat-icon">${['💻', '🌐', '🤖', '💼', '📣', '🎨', '💰', '📊', '🔐', '📱'][i]}</div>
          <h3>${cat}</h3>
          <p class="text-muted">${EduData.courses.filter(c => c.category === cat).length} courses</p>
        </a>
      `).join('');
    }

    const instructors = document.getElementById('instructor-showcase');
    if (instructors) {
      instructors.innerHTML = EduData.instructors.slice(0, 8).map(inst => `
        <div class="card instructor-card fade-in">
          <div class="instructor-avatar">${inst.avatar}</div>
          <h4>${inst.name}</h4>
          <p class="text-muted">${inst.title}</p>
          <div class="rating mt-1">${Utils.stars(parseFloat(inst.rating))}</div>
          <p class="text-muted" style="font-size:0.8rem">${inst.courses} courses · ${Utils.formatNumber(inst.students)} students</p>
        </div>
      `).join('');
    }

    const stories = document.getElementById('success-stories');
    if (stories) {
      const snippets = [
        'Completed 12 courses and landed a senior developer role.',
        'The AI tutor helped me pass my certification on the first try.',
        'Study groups made learning collaborative and fun.',
        'From beginner to data scientist in 8 months.',
        'Best investment in my career development.',
        'Interactive quizzes accelerated my learning curve.'
      ];
      stories.innerHTML = snippets.map((s, i) => `
        <div class="card fade-in">
          <div class="rating">${Utils.stars(5)}</div>
          <p class="mt-1">"${s}"</p>
          <p class="mt-2"><strong>${name(i * 17)}</strong> <span class="text-muted">— ${pickCategory(i)} Graduate</span></p>
        </div>
      `).join('');
    }

    function name(seed) {
      const f = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley'];
      const l = ['Chen', 'Patel', 'Kim', 'Garcia', 'Singh'];
      return `${f[seed % f.length]} ${l[seed % l.length]}`;
    }
    function pickCategory(i) {
      return EduData.CATEGORIES[i % EduData.CATEGORIES.length];
    }

    const stats = document.getElementById('platform-stats');
    if (stats) {
      const s = EduData.platformStats;
      stats.innerHTML = `
        <div class="stat-card card"><div class="stat-value">${s.totalCourses}+</div><div class="stat-label">Courses</div></div>
        <div class="stat-card card"><div class="stat-value">${Utils.formatNumber(s.totalLessons)}+</div><div class="stat-label">Lessons</div></div>
        <div class="stat-card card"><div class="stat-value">${Utils.formatNumber(s.totalStudents)}</div><div class="stat-label">Students</div></div>
        <div class="stat-card card"><div class="stat-value">${s.totalInstructors}+</div><div class="stat-label">Instructors</div></div>
      `;
    }
  },

  initDashboard() {
    const enrolled = document.getElementById('enrolled-courses');
    if (enrolled) CourseManager.renderGrid(enrolled, EduData.enrolledCourses.slice(0, 12), { showProgress: true });

    const activity = document.getElementById('activity-feed');
    if (activity) {
      const acts = EduData.notifications.slice(0, 25);
      activity.innerHTML = acts.map(a => `
        <div class="activity-item">
          <div class="activity-icon" style="background:rgba(124,58,237,0.2)">${a.icon}</div>
          <div>
            <p><strong>${a.title}</strong> — ${a.message.slice(0, 60)}...</p>
            <time>${a.time}</time>
          </div>
        </div>
      `).join('');
    }

    const upcoming = document.getElementById('upcoming-classes');
    if (upcoming) {
      upcoming.innerHTML = EduData.liveSessions.slice(0, 6).map(s => `
        <div class="course-list-item">
          <div class="course-thumb-sm" style="display:flex;align-items:center;justify-content:center">📹</div>
          <div class="info">
            <h4>${s.title}</h4>
            <p class="text-muted">${s.instructor} · ${s.time}</p>
          </div>
          <span class="tag ${s.status === 'live' ? 'tag-warning' : ''}">${s.status}</span>
        </div>
      `).join('');
    }

    const assignments = document.getElementById('dashboard-assignments');
    if (assignments) {
      assignments.innerHTML = EduData.assignments.slice(0, 8).map(a => `
        <div class="course-list-item">
          <div class="info">
            <h4>${a.title}</h4>
            <p class="text-muted">Due: ${a.dueDate}</p>
          </div>
          <span class="tag">${a.status}</span>
        </div>
      `).join('');
    }

    const recommended = document.getElementById('recommended-courses');
    if (recommended) {
      CourseManager.renderGrid(recommended, EduData.courses.filter(c => !EduData.enrolledCourses.includes(c)).slice(0, 4));
    }
  },

  initInstructors() {
    const grid = document.getElementById('instructors-grid');
    if (!grid) return;
    grid.innerHTML = EduData.instructors.map(inst => `
      <div class="card instructor-card fade-in">
        <div class="instructor-avatar">${inst.avatar}</div>
        <h4>${inst.name}</h4>
        <p class="text-muted">${inst.title}</p>
        <div class="rating">${Utils.stars(parseFloat(inst.rating))}</div>
        <p class="text-muted mt-1" style="font-size:0.85rem">${inst.courses} courses · ${Utils.formatNumber(inst.students)} students</p>
        <p class="mt-1" style="font-size:0.8rem">${inst.bio.slice(0, 80)}...</p>
      </div>
    `).join('');
  },

  initCommunity() {
    const list = document.getElementById('forum-posts');
    if (!list) return;
    list.innerHTML = EduData.forumPosts.map(p => `
      <div class="card fade-in" style="margin-bottom:1rem">
        <div class="flex-between flex-wrap gap-1">
          <h3>${p.title}</h3>
          ${p.solved ? '<span class="tag tag-success">Solved</span>' : ''}
        </div>
        <p class="text-muted mt-1">${p.content}</p>
        <div class="flex-between mt-2" style="font-size:0.85rem">
          <span>${p.author} · ${p.category} · ${p.time}</span>
          <span>👍 ${p.upvotes} · 💬 ${p.replies} replies</span>
        </div>
      </div>
    `).join('');
  },

  init() {
    this.injectLayout();
    ThemeManager.init();
    NotificationSystem.init();
    this.bindGlobalEvents();
    Utils.createParticles(25);
    Utils.observeFadeIn();
    Utils.lazyLoadImages();

    const page = document.body.dataset.page;
    switch (page) {
      case 'home': this.initHome(); break;
      case 'dashboard': this.initDashboard(); AnalyticsCharts.initDashboard(); break;
      case 'courses': CourseManager.initMarketplace(); break;
      case 'course-detail': CourseManager.initDetailPage(); break;
      case 'lessons': CourseManager.initLessonsPage(); break;
      case 'quizzes':
        if (Utils.getQueryParam('mode') === 'take') QuizEngine.initTakeQuiz();
        else QuizEngine.initListPage();
        break;
      case 'analytics': AnalyticsCharts.initDashboard(); break;
      case 'assignments': AssignmentManager.initListPage(); break;
      case 'certificates': AssignmentManager.initCertificatesPage(); break;
      case 'instructors': this.initInstructors(); break;
      case 'community': this.initCommunity(); break;
      case 'leaderboard': QuizEngine.initLeaderboard(); break;
      case 'notifications': NotificationSystem.renderFullPage(document.getElementById('notifications-full')); break;
      case 'search': this.initSearch(); break;
      case 'coding': this.initCoding(); break;
      case 'ai-tutor': this.initAITutor(); break;
      case 'live-classes': this.initLiveClasses(); break;
      case 'gamification': this.initGamification(); break;
      case 'calendar': this.initCalendar(); break;
      case 'instructor-dashboard': this.initInstructorDashboard(); break;
    }
  },

  initSearch() {
    const q = Utils.getQueryParam('q') || '';
    const input = document.getElementById('search-query');
    if (input) input.value = q;
    const grid = document.getElementById('search-results');
    const results = EduData.searchCourses(q);
    document.getElementById('search-count').textContent = `${results.length} results for "${q || 'all courses'}"`;
    CourseManager.currentPage = 1;
    const { items, pages, page } = Utils.paginate(results, 1, 24);
    CourseManager.renderGrid(grid, items);
    Utils.renderPagination(document.getElementById('search-pagination'), page, pages, (p) => {
      const pag = Utils.paginate(results, p, 24);
      CourseManager.renderGrid(grid, pag.items);
    });
  },

  initCoding() {
    const list = document.getElementById('coding-challenges');
    if (!list) return;
    list.innerHTML = EduData.codingExercises.map(ex => `
      <div class="card fade-in" style="margin-bottom:0.75rem;cursor:pointer" data-id="${ex.id}">
        <div class="flex-between">
          <strong>${ex.title}</strong>
          <span class="tag">${ex.difficulty}</span>
        </div>
        <p class="text-muted">${ex.language} · ${ex.tests} test cases</p>
      </div>
    `).join('');

    const editor = document.getElementById('code-input');
    const output = document.getElementById('code-output');
    if (EduData.codingExercises[0] && editor) editor.value = EduData.codingExercises[0].starterCode;

    document.getElementById('run-code')?.addEventListener('click', () => {
      if (output) output.textContent = '> Running tests...\n✓ Test 1 passed\n✓ Test 2 passed\n✓ Test 3 passed\n\nAll tests passed!';
      NotificationSystem.toast('Code executed successfully', 'success');
    });

    list.querySelectorAll('.card').forEach((card, i) => {
      card.addEventListener('click', () => {
        if (editor) editor.value = EduData.codingExercises[i].starterCode;
      });
    });
  },

  initAITutor() {
    const chat = document.getElementById('ai-chat-messages');
    if (!chat) return;
    chat.innerHTML = EduData.aiChatHistory.map(m => `
      <div class="ai-msg ${m.role === 'bot' ? 'bot' : 'user'}">${m.text.replace(/\n/g, '<br>')}</div>
    `).join('');

    document.getElementById('ai-send')?.addEventListener('click', () => {
      const input = document.getElementById('ai-input');
      if (!input?.value.trim()) return;
      chat.innerHTML += `<div class="ai-msg user">${input.value}</div>`;
      chat.innerHTML += `<div class="ai-msg bot">Thanks for your question! Based on your learning profile, I recommend reviewing Module 3 and taking Practice Quiz #5. Keep up the great work!</div>`;
      input.value = '';
      chat.scrollTop = chat.scrollHeight;
    });
  },

  initLiveClasses() {
    const grid = document.getElementById('live-sessions');
    if (!grid) return;
    grid.innerHTML = EduData.liveSessions.map(s => `
      <div class="card fade-in">
        <div class="flex-between">
          <h3>${s.title}</h3>
          <span class="tag ${s.status === 'live' ? 'tag-warning' : ''}">${s.status}</span>
        </div>
        <p class="text-muted mt-1">${s.instructor} · ${s.time} · ${s.duration}</p>
        <p class="mt-1">${s.participants} participants</p>
        <a href="live-classes.html?view=room" class="btn btn-primary btn-sm mt-2">${s.status === 'live' ? 'Join Now' : 'Register'}</a>
      </div>
    `).join('');
  },

  initGamification() {
    const board = document.getElementById('gamification-leaderboard');
    if (board) QuizEngine.initLeaderboard();
    const challenges = document.getElementById('daily-challenges');
    if (challenges) {
      challenges.innerHTML = Array.from({ length: 10 }, (_, i) => `
        <div class="card challenge-card">
          <strong>Daily Challenge ${i + 1}</strong>
          <p class="text-muted mt-1">Complete ${2 + i} lessons today</p>
          <div class="xp-bar"><div class="xp-bar-fill" style="width:${20 + i * 8}%"></div></div>
          <span class="tag tag-warning">+${50 + i * 10} XP</span>
        </div>
      `).join('');
    }
  },

  initCalendar() {
    const grid = document.getElementById('calendar-grid');
    if (!grid) return;
    const today = new Date().getDate();
    grid.innerHTML = Array.from({ length: 35 }, (_, i) => {
      const day = i + 1;
      const hasEvent = EduData.calendarEvents.some(e => e.date === day);
      return `<div class="calendar-day ${day === today ? 'today' : ''} ${hasEvent ? 'has-event' : ''}">${day <= 31 ? day : ''}</div>`;
    }).join('');

    const events = document.getElementById('calendar-events');
    if (events) {
      events.innerHTML = EduData.calendarEvents.slice(0, 15).map(e => `
        <div class="activity-item">
          <div class="activity-icon" style="background:rgba(6,182,212,0.2)">📅</div>
          <div><p><strong>${e.title}</strong></p><time>Day ${e.date} at ${e.time}</time></div>
        </div>
      `).join('');
    }
  },

  initInstructorDashboard() {
    const stats = document.getElementById('instructor-stats');
    if (stats) {
      stats.innerHTML = `
        <div class="stat-card card"><div class="stat-icon" style="background:rgba(124,58,237,0.2)">📚</div><div class="stat-value">24</div><div class="stat-label">Active Courses</div></div>
        <div class="stat-card card"><div class="stat-icon" style="background:rgba(6,182,212,0.2)">👥</div><div class="stat-value">${Utils.formatNumber(45230)}</div><div class="stat-label">Total Students</div></div>
        <div class="stat-card card"><div class="stat-icon" style="background:rgba(34,197,94,0.2)">💰</div><div class="stat-value">$128K</div><div class="stat-label">Revenue (YTD)</div></div>
        <div class="stat-card card"><div class="stat-icon" style="background:rgba(245,158,11,0.2)">⭐</div><div class="stat-value">4.8</div><div class="stat-label">Avg Rating</div></div>
      `;
    }
    const students = document.getElementById('instructor-students');
    if (students) {
      students.innerHTML = EduData.leaderboard.slice(0, 20).map(s => `
        <tr><td>${s.name}</td><td>${s.courses} courses</td><td>${Utils.formatNumber(s.xp)} XP</td><td><span class="tag tag-success">Active</span></td></tr>
      `).join('');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
