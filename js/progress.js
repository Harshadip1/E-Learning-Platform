const ProgressTracker = {
  KEY: 'edusphere-progress',

  getProgress() {
    return Utils.loadStorage(this.KEY, {});
  },

  saveProgress(data) {
    Utils.saveStorage(this.KEY, data);
  },

  getCourseProgress(courseId) {
    const p = this.getProgress();
    return p[courseId] || { completedLessons: [], percent: 0 };
  },

  markLessonComplete(courseId, lessonId) {
    const p = this.getProgress();
    if (!p[courseId]) p[courseId] = { completedLessons: [], percent: 0 };
    if (!p[courseId].completedLessons.includes(lessonId)) {
      p[courseId].completedLessons.push(lessonId);
    }
    const course = EduData.getCourseById(courseId);
    if (course) {
      p[courseId].percent = Math.round(
        (p[courseId].completedLessons.length / course.lessonCount) * 100
      );
    }
    this.saveProgress(p);
    return p[courseId];
  },

  getOverallStats() {
    const p = this.getProgress();
    let completed = 0;
    let total = 0;
    Object.values(p).forEach(c => {
      completed += c.completedLessons?.length || 0;
    });
    EduData.enrolledCourses.forEach(c => { total += c.lessonCount; });
    return {
      lessonsCompleted: completed,
      totalLessons: total || EduData.allLessons.length,
      percent: total ? Math.round((completed / total) * 100) : 42
    };
  },

  renderCircularProgress(svgEl, percent) {
    if (!svgEl) return;
    const circle = svgEl.querySelector('.progress-ring');
    if (!circle) return;
    const r = 52;
    const circ = 2 * Math.PI * r;
    circle.style.strokeDasharray = circ;
    circle.style.strokeDashoffset = circ - (percent / 100) * circ;
  }
};
