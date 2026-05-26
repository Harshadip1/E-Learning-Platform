const QuizEngine = {
  currentQuiz: null,
  currentIndex: 0,
  answers: {},
  timer: null,
  timeLeft: 0,

  initListPage() {
    const container = document.getElementById('quiz-list');
    if (!container) return;
    container.innerHTML = EduData.quizzes.map(q => `
      <div class="card assignment-card fade-in">
        <div class="flex-between flex-wrap gap-1">
          <div>
            <h3>${q.title}</h3>
            <p class="text-muted">${q.courseName}</p>
          </div>
          <span class="tag">${q.questions.length} questions · ${q.timeLimit} min</span>
        </div>
        <p class="mt-1 text-muted">Avg score: ${q.avgScore}% · ${q.attempts} attempts</p>
        <a href="quizzes.html?id=${q.id}&mode=take" class="btn btn-primary btn-sm mt-2">Start Quiz</a>
      </div>
    `).join('');
  },

  initTakeQuiz() {
    const id = Utils.getQueryParam('id');
    this.currentQuiz = EduData.getQuizById(id) || EduData.quizzes[0];
    if (!this.currentQuiz) return;

    this.currentIndex = 0;
    this.answers = {};
    this.timeLeft = this.currentQuiz.timeLimit * 60;

    const container = document.getElementById('quiz-container');
    if (!container) return;

    document.getElementById('quiz-title').textContent = this.currentQuiz.title;
    this.renderQuestion(container);
    this.startTimer();
  },

  startTimer() {
    const el = document.getElementById('quiz-timer');
    const tick = () => {
      if (el) {
        const m = Math.floor(this.timeLeft / 60);
        const s = this.timeLeft % 60;
        el.textContent = `${m}:${String(s).padStart(2, '0')}`;
        el.classList.toggle('danger', this.timeLeft < 60);
      }
      if (this.timeLeft <= 0) {
        clearInterval(this.timer);
        this.submitQuiz();
        return;
      }
      this.timeLeft--;
    };
    tick();
    this.timer = setInterval(tick, 1000);
  },

  renderQuestion(container) {
    const q = this.currentQuiz.questions[this.currentIndex];
    const total = this.currentQuiz.questions.length;
    const pct = ((this.currentIndex + 1) / total) * 100;

    container.innerHTML = `
      <div class="quiz-progress"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
      <div class="question-card card">
        <div class="question-number">Question ${this.currentIndex + 1} of ${total}</div>
        <div class="question-text">${q.question}</div>
        ${q.type === 'coding' ? `
          <textarea class="code-textarea" id="code-answer" placeholder="Write your solution here...">function solution() {\n  // code\n}</textarea>
        ` : `
          <ul class="options-list">
            ${q.options.map((opt, i) => `
              <li class="option-item ${this.answers[q.id] === i ? 'selected' : ''}" data-opt="${i}">
                <input type="radio" name="q" ${this.answers[q.id] === i ? 'checked' : ''}>
                <span>${opt}</span>
              </li>
            `).join('')}
          </ul>
        `}
      </div>
      <div class="flex-between mt-2">
        <button class="btn btn-outline" id="quiz-prev" ${this.currentIndex === 0 ? 'disabled' : ''}>Previous</button>
        <button class="btn btn-primary" id="quiz-next">${this.currentIndex === total - 1 ? 'Submit' : 'Next'}</button>
      </div>
    `;

    container.querySelectorAll('.option-item').forEach(el => {
      el.addEventListener('click', () => {
        container.querySelectorAll('.option-item').forEach(o => o.classList.remove('selected'));
        el.classList.add('selected');
        this.answers[q.id] = parseInt(el.dataset.opt, 10);
      });
    });

    document.getElementById('quiz-prev')?.addEventListener('click', () => {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.renderQuestion(container);
      }
    });

    document.getElementById('quiz-next')?.addEventListener('click', () => {
      if (this.currentIndex < total - 1) {
        this.currentIndex++;
        this.renderQuestion(container);
      } else {
        this.submitQuiz();
      }
    });
  },

  submitQuiz() {
    clearInterval(this.timer);
    let correct = 0;
    this.currentQuiz.questions.forEach(q => {
      if (this.answers[q.id] === q.correct) correct++;
    });
    const score = Math.round((correct / this.currentQuiz.questions.length) * 100);
    const passed = score >= this.currentQuiz.passingScore;

    const container = document.getElementById('quiz-container');
    if (container) {
      container.innerHTML = `
        <div class="quiz-result card">
          <div class="score-circle" style="--score-pct: ${score}%">
            <span>${score}%</span>
          </div>
          <h2>${passed ? '🎉 Congratulations!' : '📚 Keep Learning'}</h2>
          <p class="text-muted mt-1">You got ${correct} out of ${this.currentQuiz.questions.length} correct</p>
          <p class="mt-2">${passed ? 'You passed the exam!' : `Passing score: ${this.currentQuiz.passingScore}%`}</p>
          <div class="mt-3 flex gap-2" style="justify-content:center">
            <a href="quizzes.html" class="btn btn-outline">All Quizzes</a>
            <a href="exam-results.html" class="btn btn-primary">View Results</a>
          </div>
        </div>
      `;
    }
    NotificationSystem.toast(`Quiz submitted: ${score}%`, passed ? 'success' : 'warning');
    Utils.saveStorage('edusphere-last-quiz', { id: this.currentQuiz.id, score, date: new Date().toISOString() });
  },

  initLeaderboard() {
    const tbody = document.getElementById('leaderboard-body');
    if (!tbody) return;
    tbody.innerHTML = EduData.leaderboard.slice(0, 50).map(u => `
      <tr>
        <td><span class="rank-badge rank-${u.rank <= 3 ? u.rank : ''}">${u.rank}</span></td>
        <td><strong>${u.name}</strong></td>
        <td>${Utils.formatNumber(u.xp)} XP</td>
        <td>🔥 ${u.streak}</td>
        <td>${u.courses}</td>
        <td>${u.badges} 🏅</td>
      </tr>
    `).join('');
  }
};
