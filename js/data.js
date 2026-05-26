/**
 * EduSphere Platform - Massive Demo Dataset Generator
 * 300+ courses, 4500+ lessons, 150+ quizzes, thousands of records
 */
const EduData = (function () {
  const CATEGORIES = [
    'Programming', 'Web Development', 'AI & Machine Learning', 'Business',
    'Marketing', 'Design', 'Finance', 'Data Science', 'Cybersecurity', 'Mobile Development'
  ];

  const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const FIRST = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Quinn', 'Avery', 'Blake', 'Cameron', 'Dakota', 'Emery', 'Finley', 'Harper', 'Indigo', 'Jamie', 'Kai', 'Logan', 'Noah', 'Parker', 'Reese', 'Sage', 'Skyler', 'Tatum', 'River', 'Phoenix', 'Rowan', 'Ellis', 'Marlowe', 'Arden'];
  const LAST = ['Chen', 'Patel', 'Kim', 'Garcia', 'Nguyen', 'Singh', 'Martinez', 'Lee', 'Brown', 'Wilson', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Clark', 'Lewis', 'Walker', 'Hall', 'Young', 'King', 'Wright', 'Scott', 'Green', 'Adams', 'Baker', 'Nelson', 'Carter', 'Mitchell', 'Roberts'];

  const YOUTUBE_IDS = [
    'kqtD5nilgVY', '8extSHGudEU', 'WEDIj9JBTC8', 'rfscVS0vtbw', 'zOjov-2WZ0o', '3PHXvlpOkfE',
    'B31LgI4Y4DQ', '-TVKaBj1CWo', '8jLOx1hD3_o', 'RGOj5yR7yk8', 'wvJTPX9dYhA', '1Rs2ND1ryYc',
    'NybHckSEQBI', '3c-iBn73diI', '45ETZPgAbPM', 'pEfrtAhA5dk', '416Brp5bl04', '09HxNlq96mA',
    'Gxg6qSv2mJk', 'hMQLqhO43RQ', '7Yo8Bb9775Y', 'aircAruvnKk', 'GwIo3Y02CYw', 'u4ZoJKF_VuA',
    'P4Z8t0XuRBU', 'OQ96MSS40M8', '7S9KfSbmKHU', 'IHZwWFHWa-w', 'IjqNojb7Mj4', '72NFg7F2tMo',
    'eIrMbAQSU34', 'fNk_zzaMoSs', 'Ke90TFA7wvo', 'mU6anBsqW1s', 'nu_pmt-O1I', 'TlB_eWDSMt4',
    'yfoY53QXEnI', 'PkZNo7MFNFg', 'HGTJBbP1GFA', '8DvywoWv6fI', 'l8pRSu1DJP', 'OXGznpKZ_sA',
    'SqcY0GlETPk', '4q1dgn_C0AU', 'lZkRj0sKTPA', 'bMknfKXYP8Q', 'x0uinJvhNxI', 'kUMe1FB4OcA',
    'IsXXlYMF1j8', '8aGhZQkoFbQ', 'Q33KBiDqJY8', 'W6NZfCO5SI8', '1PnVor45_40', 'cQ54GDm1ZRw'
  ];

  const TOPICS = {
    'Programming': ['Python Mastery', 'Java Fundamentals', 'C++ Systems', 'Go Lang', 'Rust Programming', 'Scala Essentials', 'Ruby on Rails', 'PHP Backend', 'Swift iOS', 'Kotlin Android'],
    'Web Development': ['React Complete', 'Vue.js Pro', 'Angular Enterprise', 'Next.js Full Stack', 'Svelte Framework', 'HTML5 & CSS3', 'Node.js API', 'GraphQL APIs', 'Webpack Build', 'Tailwind CSS'],
    'AI & Machine Learning': ['Deep Learning', 'NLP Fundamentals', 'Computer Vision', 'TensorFlow 2', 'PyTorch Bootcamp', 'LLM Applications', 'MLOps Pipeline', 'Reinforcement Learning', 'AI Ethics', 'Generative AI'],
    'Business': ['MBA Essentials', 'Entrepreneurship', 'Project Management', 'Leadership Skills', 'Negotiation', 'Business Analytics', 'Supply Chain', 'HR Management', 'Operations', 'Strategy'],
    'Marketing': ['Digital Marketing', 'SEO Mastery', 'Social Media', 'Content Marketing', 'Email Campaigns', 'Google Ads', 'Brand Strategy', 'Influencer Marketing', 'Analytics', 'Growth Hacking'],
    'Design': ['UI/UX Design', 'Figma Pro', 'Adobe Photoshop', 'Illustrator', 'Motion Graphics', '3D Modeling', 'Design Systems', 'Typography', 'Color Theory', 'Prototyping'],
    'Finance': ['Financial Modeling', 'Investment Banking', 'Cryptocurrency', 'Stock Trading', 'Accounting', 'Corporate Finance', 'Risk Management', 'FinTech', 'Excel Finance', 'Portfolio Theory'],
    'Data Science': ['Statistics', 'R Programming', 'SQL Analytics', 'Tableau', 'Power BI', 'Big Data Spark', 'Data Engineering', 'ETL Pipelines', 'A/B Testing', 'Predictive Modeling'],
    'Cybersecurity': ['Ethical Hacking', 'Network Security', 'Cloud Security', 'Penetration Testing', 'SOC Analyst', 'Cryptography', 'Incident Response', 'Compliance', 'Zero Trust', 'Malware Analysis'],
    'Mobile Development': ['Flutter Apps', 'React Native', 'iOS SwiftUI', 'Android Jetpack', 'Mobile UX', 'App Store Optimization', 'Firebase Mobile', 'Cross-Platform', 'Mobile Security', 'AR Mobile']
  };

  const QUESTION_TEMPLATES = [
    { q: 'What is the primary purpose of {topic}?', opts: ['Storage only', 'Core functionality', 'Decoration', 'None'], correct: 1 },
    { q: 'Which best describes {topic} in modern development?', opts: ['Deprecated', 'Industry standard', 'Experimental only', 'Unused'], correct: 1 },
    { q: 'When implementing {topic}, what should you prioritize?', opts: ['Speed only', 'Security & quality', 'Ignore testing', 'Skip docs'], correct: 1 },
    { q: 'Which tool is commonly used with {topic}?', opts: ['Random tool', 'Standard IDE/framework', 'Paint', 'Calculator'], correct: 1 },
    { q: 'What is a best practice for {topic}?', opts: ['No version control', 'Code reviews', 'Hardcode secrets', 'Skip planning'], correct: 1 }
  ];

  function seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  function pick(arr, seed) {
    return arr[Math.floor(seededRandom(seed) * arr.length)];
  }

  function name(seed) {
    return `${pick(FIRST, seed)} ${pick(LAST, seed + 1)}`;
  }

  function generateInstructors(count = 200) {
    const instructors = [];
    for (let i = 0; i < count; i++) {
      const cat = pick(CATEGORIES, i);
      instructors.push({
        id: `inst-${i + 1}`,
        name: name(i * 7),
        title: `${cat} Specialist`,
        category: cat,
        courses: Math.floor(seededRandom(i) * 15) + 3,
        students: Math.floor(seededRandom(i + 100) * 50000) + 1000,
        rating: (3.5 + seededRandom(i + 200) * 1.5).toFixed(1),
        bio: `Expert educator with ${5 + (i % 20)} years teaching ${cat}. Published author and industry consultant.`,
        avatar: String.fromCharCode(65 + (i % 26))
      });
    }
    return instructors;
  }

  function generateCourses(count = 320, instructors) {
    const courses = [];
    let lessonGlobalId = 1;
    for (let i = 0; i < count; i++) {
      const cat = CATEGORIES[i % CATEGORIES.length];
      const topics = TOPICS[cat];
      const title = `${pick(topics, i)} ${['Bootcamp', 'Masterclass', 'Complete Guide', 'Professional', 'Certification', 'Intensive'][i % 6]} ${2024 + (i % 2)}`;
      const instructor = instructors[i % instructors.length];
      const lessonCount = 8 + Math.floor(seededRandom(i + 50) * 17);
      const lessons = [];
      for (let j = 0; j < lessonCount; j++) {
        const vid = YOUTUBE_IDS[(i + j) % YOUTUBE_IDS.length];
        lessons.push({
          id: `lesson-${lessonGlobalId++}`,
          title: `Lesson ${j + 1}: ${['Introduction', 'Core Concepts', 'Hands-on Lab', 'Advanced Techniques', 'Case Study', 'Best Practices', 'Project Build', 'Review & Quiz'][j % 8]} - ${title.split(' ')[0]}`,
          duration: `${5 + (j % 25)}:${String(Math.floor(seededRandom(i + j) * 60)).padStart(2, '0')}`,
          videoId: vid,
          completed: seededRandom(i + j + 300) > 0.6,
          resources: Math.floor(seededRandom(j) * 4) + 1
        });
      }
      const price = Math.floor(seededRandom(i + 400) * 180) + 19;
      courses.push({
        id: `course-${i + 1}`,
        title,
        category: cat,
        instructor: instructor.name,
        instructorId: instructor.id,
        thumbnail: `https://picsum.photos/seed/edu${i}/400/225`,
        rating: (3.8 + seededRandom(i + 500) * 1.2).toFixed(1),
        reviews: Math.floor(seededRandom(i + 600) * 8000) + 120,
        students: Math.floor(seededRandom(i + 700) * 45000) + 500,
        duration: `${Math.floor(lessonCount * 0.5)}h ${(lessonCount * 12) % 60}m`,
        lessons: lessons,
        lessonCount: lessonCount,
        level: pick(LEVELS, i + 800),
        price,
        originalPrice: price + Math.floor(seededRandom(i) * 80) + 20,
        progress: Math.floor(seededRandom(i + 900) * 100),
        description: `Comprehensive ${cat.toLowerCase()} course covering ${title}. Includes ${lessonCount} video lessons, quizzes, assignments, and certificate upon completion.`,
        skills: [cat, pick(LEVELS, i), 'Certificate', 'Lifetime Access'].slice(0, 3),
        featured: i < 24,
        bestseller: seededRandom(i + 1000) > 0.85
      });
    }
    return courses;
  }

  function generateQuizzes(courses, count = 180) {
    const quizzes = [];
    for (let i = 0; i < count; i++) {
      const course = courses[i % courses.length];
      const qCount = 5 + Math.floor(seededRandom(i) * 16);
      const questions = [];
      for (let q = 0; q < qCount; q++) {
        const tmpl = QUESTION_TEMPLATES[q % QUESTION_TEMPLATES.length];
        const topic = course.title.split(' ')[0];
        questions.push({
          id: `q-${i}-${q}`,
          question: tmpl.q.replace('{topic}', topic),
          options: tmpl.opts.map((o, idx) => o === '{topic}' ? topic : o),
          correct: tmpl.correct,
          type: q % 5 === 0 ? 'coding' : 'multiple'
        });
      }
      quizzes.push({
        id: `quiz-${i + 1}`,
        courseId: course.id,
        courseName: course.title,
        title: `${course.category} Assessment ${i + 1}`,
        questions,
        timeLimit: [15, 20, 30, 45, 60][i % 5],
        passingScore: 70,
        attempts: Math.floor(seededRandom(i) * 500) + 50,
        avgScore: Math.floor(65 + seededRandom(i + 50) * 30)
      });
    }
    return quizzes;
  }

  function generateNotifications(count = 500) {
    const types = ['assignment', 'lesson', 'quiz', 'announcement', 'community', 'certificate', 'live', 'grade'];
    const titles = {
      assignment: 'Assignment due soon',
      lesson: 'New lesson available',
      quiz: 'Quiz results ready',
      announcement: 'Course announcement',
      community: 'New reply in discussion',
      certificate: 'Certificate earned',
      live: 'Live class starting',
      grade: 'Grade posted'
    };
    const notifs = [];
    for (let i = 0; i < count; i++) {
      const type = pick(types, i);
      notifs.push({
        id: `notif-${i + 1}`,
        type,
        title: titles[type],
        message: `Update #${i + 1}: Your learning activity requires attention. Check your dashboard for details.`,
        time: `${(i % 24) + 1}h ago`,
        read: seededRandom(i + 2000) > 0.4,
        icon: ['📝', '🎬', '📊', '📢', '💬', '🏆', '📹', '✅'][types.indexOf(type)]
      });
    }
    return notifs;
  }

  function generateForumPosts(count = 350) {
    const posts = [];
    for (let i = 0; i < count; i++) {
      posts.push({
        id: `post-${i + 1}`,
        author: name(i * 3),
        title: `Question about ${pick(CATEGORIES, i)} - Topic ${i + 1}`,
        content: `I'm working through the course material and need help understanding concept ${(i % 20) + 1}. Has anyone else encountered this?`,
        category: pick(CATEGORIES, i + 100),
        replies: Math.floor(seededRandom(i) * 45) + 1,
        upvotes: Math.floor(seededRandom(i + 50) * 200) + 5,
        time: `${(i % 30) + 1} days ago`,
        solved: seededRandom(i + 150) > 0.7
      });
    }
    return posts;
  }

  function generateAssignments(count = 200, courses) {
    const assignments = [];
    for (let i = 0; i < count; i++) {
      const course = courses[i % courses.length];
      const dueDays = Math.floor(seededRandom(i) * 14) - 3;
      assignments.push({
        id: `assign-${i + 1}`,
        courseId: course.id,
        courseName: course.title,
        title: `Project ${(i % 10) + 1}: ${course.category} Implementation`,
        description: 'Complete the project requirements and submit your work before the deadline.',
        dueDate: dueDays < 0 ? 'Overdue' : `In ${dueDays} days`,
        status: dueDays < 0 ? 'overdue' : ['pending', 'submitted', 'graded'][i % 3],
        grade: i % 3 === 2 ? Math.floor(70 + seededRandom(i) * 30) : null,
        maxPoints: 100
      });
    }
    return assignments;
  }

  function generateCertificates(count = 120, courses) {
    const certs = [];
    for (let i = 0; i < count; i++) {
      const course = courses[i % courses.length];
      certs.push({
        id: `cert-${i + 1}`,
        courseName: course.title,
        category: course.category,
        issuedDate: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
        credentialId: `EDU-${10000 + i}-${String.fromCharCode(65 + (i % 26))}${i % 10}`,
        skills: course.skills || [course.category]
      });
    }
    return certs;
  }

  function generateLeaderboard(count = 150) {
    const board = [];
    for (let i = 0; i < count; i++) {
      board.push({
        rank: i + 1,
        name: name(i * 11),
        xp: Math.floor(50000 - i * 280 + seededRandom(i) * 100),
        streak: Math.floor(seededRandom(i + 30) * 120) + 1,
        courses: Math.floor(seededRandom(i + 40) * 25) + 1,
        badges: Math.floor(seededRandom(i + 50) * 20) + 1
      });
    }
    return board;
  }

  function generateLiveSessions(count = 40) {
    const sessions = [];
    for (let i = 0; i < count; i++) {
      sessions.push({
        id: `live-${i + 1}`,
        title: `Live Workshop: ${pick(CATEGORIES, i)} Session ${i + 1}`,
        instructor: name(i * 5),
        time: ['Today 2:00 PM', 'Today 5:00 PM', 'Tomorrow 10:00 AM', 'Tomorrow 3:00 PM'][i % 4],
        participants: Math.floor(seededRandom(i) * 80) + 15,
        duration: '90 min',
        status: i < 5 ? 'live' : 'scheduled'
      });
    }
    return sessions;
  }

  function generateCodingExercises(count = 100) {
    const exercises = [];
    const langs = ['JavaScript', 'Python', 'Java', 'C++', 'TypeScript'];
    for (let i = 0; i < count; i++) {
      exercises.push({
        id: `code-${i + 1}`,
        title: `Challenge ${i + 1}: ${pick(['Array Manipulation', 'Tree Traversal', 'API Integration', 'Algorithm Optimization', 'DOM Manipulation'], i)}`,
        language: pick(langs, i),
        difficulty: pick(LEVELS, i + 20),
        completed: seededRandom(i + 3000) > 0.5,
        tests: 3 + (i % 5),
        starterCode: `// ${pick(langs, i)} exercise ${i + 1}\nfunction solution(input) {\n  // Your code here\n  return input;\n}`
      });
    }
    return exercises;
  }

  function generateReviews(count = 800, courses) {
    const reviews = [];
    for (let i = 0; i < count; i++) {
      const course = courses[i % courses.length];
      reviews.push({
        id: `review-${i + 1}`,
        courseId: course.id,
        author: name(i * 13),
        rating: Math.floor(3 + seededRandom(i) * 3),
        text: `Great course on ${course.category}. ${['Highly recommend!', 'Very thorough content.', 'Excellent instructor.', 'Learned a lot.', 'Challenging but rewarding.'][i % 5]}`,
        date: `${(i % 12) + 1} months ago`,
        helpful: Math.floor(seededRandom(i + 100) * 150)
      });
    }
    return reviews;
  }

  function generateAnalytics() {
    const weeks = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const monthly = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return {
      studyHoursWeekly: weeks.map((d, i) => ({ day: d, hours: Math.floor(1 + seededRandom(i + 4000) * 6) })),
      studyHoursMonthly: monthly.map((m, i) => ({ month: m, hours: Math.floor(20 + seededRandom(i + 4100) * 80) })),
      quizScores: Array.from({ length: 20 }, (_, i) => ({
        quiz: `Quiz ${i + 1}`,
        score: Math.floor(60 + seededRandom(i + 4200) * 40)
      })),
      skillProgress: CATEGORIES.map((cat, i) => ({
        skill: cat,
        progress: Math.floor(20 + seededRandom(i + 4300) * 80)
      })),
      courseCompletion: [
        { label: 'Completed', value: 34, color: '#22C55E' },
        { label: 'In Progress', value: 48, color: '#7C3AED' },
        { label: 'Not Started', value: 18, color: '#64748B' }
      ],
      heatmap: Array.from({ length: 365 }, (_, i) => ({
        date: i,
        level: Math.floor(seededRandom(i + 5000) * 5)
      })),
      totalStudyHours: 1247,
      currentStreak: 23,
      longestStreak: 45,
      coursesCompleted: 28,
      quizzesPassed: 67,
      avgQuizScore: 84
    };
  }

  function generateStudyGroups(count = 50) {
    return Array.from({ length: count }, (_, i) => ({
      id: `group-${i + 1}`,
      name: `${pick(CATEGORIES, i)} Study Group ${(i % 10) + 1}`,
      members: Math.floor(5 + seededRandom(i + 6000) * 45),
      topic: pick(CATEGORIES, i + 10),
      nextMeet: `Week ${(i % 4) + 1}, ${['Mon', 'Wed', 'Fri'][i % 3]} 7PM`
    }));
  }

  function generateCalendarEvents(count = 80) {
    return Array.from({ length: count }, (_, i) => ({
      id: `event-${i + 1}`,
      title: ['Quiz', 'Assignment', 'Live Class', 'Study Session', 'Exam'][i % 5],
      date: (i % 28) + 1,
      time: `${9 + (i % 10)}:00`,
      type: ['quiz', 'assignment', 'live', 'study', 'exam'][i % 5]
    }));
  }

  function generateAIChatHistory() {
    return [
      { role: 'bot', text: 'Hello! I\'m your AI learning assistant. How can I help you study today?' },
      { role: 'user', text: 'Recommend courses for web development' },
      { role: 'bot', text: 'Based on your progress, I recommend: React Complete Guide, Node.js API Development, and GraphQL APIs. You\'ve completed 60% of HTML/CSS fundamentals.' },
      { role: 'user', text: 'Create a study plan for this week' },
      { role: 'bot', text: 'Here\'s your personalized plan:\n• Mon-Wed: 2h React lessons\n• Thu: Complete Quiz #12\n• Fri: Assignment submission\n• Weekend: Review & practice project' }
    ];
  }

  // Initialize all data
  const instructors = generateInstructors(200);
  const courses = generateCourses(320, instructors);
  const allLessons = courses.flatMap(c => c.lessons);
  const quizzes = generateQuizzes(courses, 180);
  const notifications = generateNotifications(500);
  const forumPosts = generateForumPosts(350);
  const assignments = generateAssignments(200, courses);
  const certificates = generateCertificates(120, courses);
  const leaderboard = generateLeaderboard(150);
  const liveSessions = generateLiveSessions(40);
  const codingExercises = generateCodingExercises(100);
  const reviews = generateReviews(800, courses);
  const analytics = generateAnalytics();
  const studyGroups = generateStudyGroups(50);
  const calendarEvents = generateCalendarEvents(80);
  const aiChatHistory = generateAIChatHistory();

  const enrolledCourses = courses.filter((_, i) => i < 45 || seededRandom(i + 999) > 0.55);

  const platformStats = {
    totalCourses: courses.length,
    totalLessons: allLessons.length,
    totalStudents: 2847593,
    totalInstructors: instructors.length,
    totalQuizzes: quizzes.length,
    completionRate: 78
  };

  return {
    CATEGORIES,
    LEVELS,
    YOUTUBE_IDS,
    instructors,
    courses,
    allLessons,
    quizzes,
    notifications,
    forumPosts,
    assignments,
    certificates,
    leaderboard,
    liveSessions,
    codingExercises,
    reviews,
    analytics,
    studyGroups,
    calendarEvents,
    aiChatHistory,
    enrolledCourses,
    platformStats,
    getCourseById: (id) => courses.find(c => c.id === id),
    getQuizById: (id) => quizzes.find(q => q.id === id),
    searchCourses: (query, filters = {}) => {
      let results = [...courses];
      if (query) {
        const q = query.toLowerCase();
        results = results.filter(c =>
          c.title.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.instructor.toLowerCase().includes(q)
        );
      }
      if (filters.category) results = results.filter(c => c.category === filters.category);
      if (filters.level) results = results.filter(c => c.level === filters.level);
      if (filters.minRating) results = results.filter(c => parseFloat(c.rating) >= filters.minRating);
      if (filters.sort === 'rating') results.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      if (filters.sort === 'students') results.sort((a, b) => b.students - a.students);
      if (filters.sort === 'price-low') results.sort((a, b) => a.price - b.price);
      if (filters.sort === 'price-high') results.sort((a, b) => b.price - a.price);
      return results;
    }
  };
})();

if (typeof module !== 'undefined') module.exports = EduData;
