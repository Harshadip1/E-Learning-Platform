const AnalyticsCharts = {
  charts: {},

  initDashboard() {
    this.renderBarChart('chart-weekly', EduData.analytics.studyHoursWeekly, 'day', 'hours', '#7C3AED');
    this.renderLineChart('chart-monthly', EduData.analytics.studyHoursMonthly, 'month', 'hours');
    this.renderPieChart('chart-completion', EduData.analytics.courseCompletion);
    this.renderBarChart('chart-quiz', EduData.analytics.quizScores.slice(0, 12), 'quiz', 'score', '#06B6D4');
    this.renderSkillBars('skill-progress-bars', EduData.analytics.skillProgress);
    this.renderHeatmap('study-heatmap', EduData.analytics.heatmap);
    this.updateStatCards();
  },

  updateStatCards() {
    const stats = EduData.analytics;
    const map = {
      'stat-study-hours': stats.totalStudyHours + 'h',
      'stat-streak': stats.currentStreak + ' days',
      'stat-completed': stats.coursesCompleted,
      'stat-quiz-avg': stats.avgQuizScore + '%',
      'stat-quizzes-passed': stats.quizzesPassed
    };
    Object.entries(map).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    });
  },

  renderBarChart(canvasId, data, labelKey, valueKey, color = '#7C3AED') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = 260 * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = '260px';
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = 260;
    const max = Math.max(...data.map(d => d[valueKey]), 1);
    const barW = (w - 60) / data.length - 8;
    const padding = 40;

    ctx.clearRect(0, 0, w, h);
    data.forEach((d, i) => {
      const barH = ((d[valueKey] / max) * (h - padding - 30));
      const x = 30 + i * (barW + 8);
      const y = h - padding - barH;
      const grad = ctx.createLinearGradient(0, y, 0, h - padding);
      grad.addColorStop(0, color);
      grad.addColorStop(1, color + '44');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x, y, barW, barH, 4);
      ctx.fill();
      ctx.fillStyle = '#94A3B8';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(d[labelKey], x + barW / 2, h - 15);
    });
  },

  renderLineChart(canvasId, data, labelKey, valueKey) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = 260 * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = '260px';
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = 260;
    const max = Math.max(...data.map(d => d[valueKey]), 1);
    const padding = 40;
    const stepX = (w - 60) / (data.length - 1);

    ctx.clearRect(0, 0, w, h);
    ctx.beginPath();
    ctx.strokeStyle = '#06B6D4';
    ctx.lineWidth = 3;
    data.forEach((d, i) => {
      const x = 30 + i * stepX;
      const y = h - padding - (d[valueKey] / max) * (h - padding - 30);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    ctx.fillStyle = 'rgba(6, 182, 212, 0.2)';
    ctx.lineTo(30 + (data.length - 1) * stepX, h - padding);
    ctx.lineTo(30, h - padding);
    ctx.closePath();
    ctx.fill();
  },

  renderPieChart(canvasId, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 280 * dpr;
    canvas.height = 280 * dpr;
    canvas.style.width = '280px';
    canvas.style.height = '280px';
    ctx.scale(dpr, dpr);

    const cx = 140, cy = 140, r = 100;
    const total = data.reduce((s, d) => s + d.value, 0);
    let start = -Math.PI / 2;

    data.forEach(d => {
      const slice = (d.value / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, start + slice);
      ctx.closePath();
      ctx.fillStyle = d.color;
      ctx.fill();
      start += slice;
    });

    const legend = document.getElementById(canvasId + '-legend');
    if (legend) {
      legend.innerHTML = data.map(d => `
        <div class="flex gap-1" style="align-items:center;margin-bottom:0.5rem">
          <span style="width:12px;height:12px;background:${d.color};border-radius:3px"></span>
          <span>${d.label}: ${d.value}%</span>
        </div>
      `).join('');
    }
  },

  renderSkillBars(containerId, data) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = data.map(d => `
      <div style="margin-bottom:1rem">
        <div class="flex-between" style="font-size:0.85rem;margin-bottom:0.35rem">
          <span>${d.skill}</span>
          <span>${d.progress}%</span>
        </div>
        <div class="progress-bar"><div class="progress-bar-fill" style="width:${d.progress}%"></div></div>
      </div>
    `).join('');
  },

  renderHeatmap(containerId, data) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = data.slice(-120).map(d =>
      `<div class="heatmap-cell level-${d.level}" title="Activity level ${d.level}"></div>`
    ).join('');
  }
};
