const CourseManager = {
  currentPage: 1,
  perPage: 24,
  wishlist: Utils.loadStorage('edusphere-wishlist', []),

  courseCardHTML(course, opts = {}) {
    const inWish = this.wishlist.includes(course.id);
    const progress = ProgressTracker.getCourseProgress(course.id).percent || course.progress;
    return `
      <article class="card course-card fade-in" data-id="${course.id}">
        <div class="course-card-thumb">
          <img data-src="${course.thumbnail}" alt="" loading="lazy" onerror="this.style.display='none'">
          ${course.bestseller ? '<span class="tag" style="position:absolute;top:0.75rem;left:0.75rem">Bestseller</span>' : ''}
          <button class="wishlist-btn ${inWish ? 'active' : ''}" data-wish="${course.id}" aria-label="Wishlist">♥</button>
        </div>
        <div class="course-card-body">
          <span class="tag tag-accent">${course.category}</span>
          <h3><a href="course-detail.html?id=${course.id}">${course.title}</a></h3>
          <p class="course-card-meta">${course.instructor} · ${course.level} · ${course.duration}</p>
          <div class="rating">${Utils.stars(parseFloat(course.rating))} <span>(${Utils.formatNumber(course.reviews)})</span></div>
          ${opts.showProgress ? `
            <div class="mt-1">
              <div class="flex-between" style="font-size:0.75rem;margin-bottom:0.25rem">
                <span>${progress}% complete</span>
              </div>
              <div class="progress-bar"><div class="progress-bar-fill" style="width:${progress}%"></div></div>
            </div>
          ` : `<p class="course-card-meta mt-1">${Utils.formatNumber(course.students)} students</p>`}
          <div class="course-card-footer">
            <div class="course-price">
              ${course.originalPrice > course.price ? `<span class="original">$${course.originalPrice}</span>` : ''}
              $${course.price}
            </div>
            <a href="lessons.html?course=${course.id}" class="btn btn-sm btn-primary">${opts.showProgress ? 'Continue' : 'Enroll'}</a>
          </div>
        </div>
      </article>
    `;
  },

  renderGrid(container, courses, opts = {}) {
    if (!container) return;
    container.innerHTML = courses.map(c => this.courseCardHTML(c, opts)).join('');
    Utils.lazyLoadImages();
    container.querySelectorAll('[data-wish]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleWishlist(btn.dataset.wish);
        btn.classList.toggle('active');
      });
    });
  },

  toggleWishlist(id) {
    const idx = this.wishlist.indexOf(id);
    if (idx >= 0) this.wishlist.splice(idx, 1);
    else this.wishlist.push(id);
    Utils.saveStorage('edusphere-wishlist', this.wishlist);
    NotificationSystem.toast(idx >= 0 ? 'Removed from wishlist' : 'Added to wishlist', 'success');
  },

  initMarketplace() {
    const grid = document.getElementById('courses-grid');
    const pagination = document.getElementById('courses-pagination');
    const searchInput = document.getElementById('course-search');
    const categoryFilter = document.getElementById('filter-category');
    const levelFilter = document.getElementById('filter-level');
    const sortFilter = document.getElementById('filter-sort');

    const render = () => {
      const filters = {
        category: categoryFilter?.value || '',
        level: levelFilter?.value || '',
        sort: sortFilter?.value || ''
      };
      let results = EduData.searchCourses(searchInput?.value || '', filters);
      const { items, pages, page } = Utils.paginate(results, this.currentPage, this.perPage);
      this.renderGrid(grid, items);
      Utils.renderPagination(pagination, page, pages, (p) => {
        this.currentPage = p;
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      const countEl = document.getElementById('course-count');
      if (countEl) countEl.textContent = `${results.length} courses found`;
    };

    if (searchInput) {
      searchInput.addEventListener('input', Utils.debounce(() => {
        this.currentPage = 1;
        render();
      }));
    }
    [categoryFilter, levelFilter, sortFilter].forEach(el => {
      el?.addEventListener('change', () => { this.currentPage = 1; render(); });
    });

    document.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        if (categoryFilter) categoryFilter.value = chip.dataset.category || '';
        this.currentPage = 1;
        render();
      });
    });

    const urlCat = Utils.getQueryParam('category');
    if (urlCat && categoryFilter) {
      categoryFilter.value = urlCat;
      document.querySelectorAll('.filter-chip').forEach(c => {
        c.classList.toggle('active', c.dataset.category === urlCat);
      });
    }

    render();
  },

  initDetailPage() {
    const id = Utils.getQueryParam('id');
    const course = EduData.getCourseById(id) || EduData.courses[0];
    if (!course) return;

    document.title = `${course.title} - EduSphere`;
    const titleEl = document.getElementById('course-title');
    if (titleEl) titleEl.textContent = course.title;

    const fields = {
      'course-category': course.category,
      'course-instructor': course.instructor,
      'course-rating': `${Utils.stars(parseFloat(course.rating))} ${course.rating} (${Utils.formatNumber(course.reviews)} reviews)`,
      'course-students': `${Utils.formatNumber(course.students)} students enrolled`,
      'course-level': course.level,
      'course-duration': course.duration,
      'course-description': course.description,
      'course-price': `$${course.price}`
    };
    Object.entries(fields).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = val;
    });

    const preview = document.getElementById('course-preview');
    if (preview && course.lessons[0]) {
      preview.innerHTML = `<iframe src="${Utils.youtubeEmbed(course.lessons[0].videoId)}" allowfullscreen></iframe>`;
    }

    const curriculum = document.getElementById('curriculum-list');
    if (curriculum) {
      curriculum.innerHTML = `
        <div class="curriculum-section">
          <div class="curriculum-header">Course Content · ${course.lessonCount} lessons</div>
          <div class="curriculum-lessons">
            ${course.lessons.map((l, i) => `
              <div class="lesson-row ${l.completed ? 'completed' : ''}">
                <span>${l.completed ? '✓' : '▶'}</span>
                <span style="flex:1">${l.title}</span>
                <span class="text-muted">${l.duration}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    const reviewsEl = document.getElementById('course-reviews-list');
    if (reviewsEl) {
      const courseReviews = EduData.reviews.filter(r => r.courseId === course.id).slice(0, 20);
      reviewsEl.innerHTML = (courseReviews.length ? courseReviews : EduData.reviews.slice(0, 10)).map(r => `
        <div class="card review-card">
          <div class="review-header">
            <div class="review-avatar">${r.author[0]}</div>
            <div>
              <strong>${r.author}</strong>
              <div class="rating">${Utils.stars(r.rating)}</div>
              <small class="text-muted">${r.date}</small>
            </div>
          </div>
          <p>${r.text}</p>
          <small class="text-muted">${r.helpful} found helpful</small>
        </div>
      `).join('');
    }

    const related = document.getElementById('related-courses');
    if (related) {
      const rel = EduData.courses.filter(c => c.category === course.category && c.id !== course.id).slice(0, 4);
      this.renderGrid(related, rel);
    }
  },

  initLessonsPage() {
    const courseId = Utils.getQueryParam('course') || EduData.courses[0].id;
    const course = EduData.getCourseById(courseId) || EduData.courses[0];
    let currentLesson = parseInt(Utils.getQueryParam('lesson') || '0', 10);

    const player = document.getElementById('video-player');
    const lessonList = document.getElementById('lesson-list');
    const lessonTitle = document.getElementById('current-lesson-title');

    const loadLesson = (index) => {
      if (index < 0 || index >= course.lessons.length) return;
      currentLesson = index;
      const lesson = course.lessons[index];
      if (player) {
        player.innerHTML = `<iframe src="${Utils.youtubeEmbed(lesson.videoId)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      }
      if (lessonTitle) lessonTitle.textContent = lesson.title;
      lessonList?.querySelectorAll('.lesson-nav-item').forEach((el, i) => {
        el.classList.toggle('active', i === index);
      });
      history.replaceState(null, '', `?course=${course.id}&lesson=${index}`);
    };

    if (lessonList) {
      lessonList.innerHTML = course.lessons.map((l, i) => `
        <div class="lesson-nav-item ${i === currentLesson ? 'active' : ''}" data-index="${i}">
          <div><strong>${i + 1}. ${l.title}</strong></div>
          <div class="duration">${l.duration} · ${l.resources} resources</div>
        </div>
      `).join('');
      lessonList.querySelectorAll('.lesson-nav-item').forEach(el => {
        el.addEventListener('click', () => loadLesson(parseInt(el.dataset.index, 10)));
      });
    }

    document.getElementById('mark-complete')?.addEventListener('click', () => {
      const lesson = course.lessons[currentLesson];
      ProgressTracker.markLessonComplete(course.id, lesson.id);
      NotificationSystem.toast('Lesson marked complete! 🎉', 'success');
    });

    document.getElementById('prev-lesson')?.addEventListener('click', () => loadLesson(currentLesson - 1));
    document.getElementById('next-lesson')?.addEventListener('click', () => loadLesson(currentLesson + 1));

    const courseTitle = document.getElementById('course-sidebar-title');
    if (courseTitle) courseTitle.textContent = course.title;

    loadLesson(currentLesson);
  }
};
