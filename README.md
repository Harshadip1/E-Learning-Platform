# EduSphere — Enterprise E-Learning Platform

A production-quality, futuristic online education platform built with **HTML5**, **CSS3**, and **vanilla JavaScript**. Designed to feel like enterprise platforms such as Udemy, Coursera, and LinkedIn Learning—with massive demo datasets and YouTube-powered video lectures.

---

## Project Information

| | |
|---|---|
| **Project Name** | EduSphere Learning Platform |
| **Type** | Front-end demo / portfolio application |
| **License** | Demo use — no personal branding included |

---

## Features

### Core Learning
- **320+ online courses** across 10 categories
- **4,500+ video lessons** with YouTube embeds
- **180+ quizzes & exams** with timer and scoring
- Video player with lesson navigation, notes, and resources
- Progress tracking with localStorage persistence

### Dashboards
- Student dashboard with stats, charts, and activity feed
- Instructor dashboard with revenue and student analytics
- Parent dashboard and internship portal UI

### Community & Engagement
- Discussion forum (350+ posts)
- Study groups, community feed, leaderboards
- Gamification: XP, badges, daily challenges
- Live classes UI with chat and whiteboard

### Tools
- AI Tutor chat interface (UI only)
- Coding practice editor with test cases
- Calendar & schedule, Pomodoro timer
- Flashcards, notes, bookmarks
- Offline downloads UI

### Platform
- Dark / light theme toggle (persisted)
- 500+ notifications
- Security center, settings, profile
- Search with filters and pagination
- Fully responsive (mobile, tablet, desktop)

---

## Technologies Used

- HTML5
- CSS3 (CSS Variables, Flexbox, Grid, animations, glassmorphism)
- Vanilla JavaScript (modular architecture)
- Canvas charts (custom rendering)
- YouTube iframe API (embedded educational videos)
- localStorage for theme, progress, wishlist, notifications

---

## How to Run in VS Code

### Step 1: Install Visual Studio Code
Download and install [Visual Studio Code](https://code.visualstudio.com/).

### Step 2: Open the Project Folder
1. Launch VS Code
2. Go to **File → Open Folder**
3. Select the `E-Learning Platform` folder

### Step 3: Install Live Server Extension
1. Open the Extensions view (`Ctrl+Shift+X`)
2. Search for **Live Server**
3. Install the extension by **Ritwick Dey**

### Step 4: Launch the Application
1. In the Explorer, right-click `index.html`
2. Click **Open with Live Server**
3. Your browser opens at `http://127.0.0.1:5500` (port may vary)

### Alternative (without Live Server)
Open `index.html` directly in a browser. Some features work best with a local server due to iframe policies.

---

## Folder Structure

```
E-Learning Platform/
├── index.html              # Landing page
├── dashboard.html          # Student dashboard
├── courses.html            # Course marketplace
├── course-detail.html      # Single course page
├── lessons.html            # Video learning player
├── quizzes.html            # Quiz list & exam taker
├── analytics.html          # Learning analytics
├── progress.html           # Progress tracking
├── assignments.html        # Assignments & projects
├── certificates.html       # Certificates & badges
├── instructors.html        # Instructor profiles
├── community.html          # Discussion forum
├── settings.html           # App settings
├── profile.html            # User profile
├── README.md
├── css/
│   ├── style.css           # Global styles
│   ├── dashboard.css       # Dashboard layout
│   ├── courses.css         # Course cards & player
│   ├── analytics.css       # Quizzes, charts, AI UI
│   ├── themes.css          # Dark/light variables
│   └── responsive.css      # Media queries
├── js/
│   ├── data.js             # Massive demo dataset generator
│   ├── app.js              # App bootstrap & routing
│   ├── utils.js            # Helpers, pagination, lazy load
│   ├── courses.js          # Course rendering & filters
│   ├── quizzes.js          # Quiz engine
│   ├── analytics.js        # Chart rendering
│   ├── assignments.js      # Assignments & certificates
│   ├── themes.js           # Theme toggle
│   ├── notifications.js    # Toast & notification UI
│   └── progress.js         # Progress localStorage
└── assets/
    ├── images/
    ├── videos/
    ├── icons/
    └── documents/
```

### Additional Pages
`search.html`, `leaderboard.html`, `live-classes.html`, `coding.html`, `ai-tutor.html`, `gamification.html`, `calendar.html`, `notifications.html`, `security.html`, `subscription.html`, `exam-results.html`, `study-groups.html`, `notes.html`, `downloads.html`, `reviews.html`, `categories.html`, `community-feed.html`, `mobile-learning.html`, `instructor-dashboard.html`, `reports.html`, `about.html`, `contact.html`, `parent-dashboard.html`, `internship.html`

---

## Course System

Courses are generated programmatically in `js/data.js`:

- **320 courses** with titles, categories, instructors, ratings, pricing
- **8–24 lessons per course** (4,500+ total lessons)
- Each lesson includes a **YouTube video ID** for real embedded playback
- Categories: Programming, Web Development, AI & ML, Business, Marketing, Design, Finance, Data Science, Cybersecurity, Mobile Development

Use `courses.html` for browsing with search, filters, sorting, and pagination (24 per page).

---

## Quiz Engine

Located in `js/quizzes.js`:

- Multiple-choice and coding-style questions
- Countdown timer with visual warnings
- Progress bar across questions
- Instant scoring and pass/fail results
- Results saved to localStorage

Start a quiz: `quizzes.html?id=quiz-1&mode=take`

---

## Analytics Dashboard

`js/analytics.js` renders:

- Bar chart (weekly study hours)
- Line chart (monthly trend)
- Pie chart (course completion)
- Quiz score bars
- Skill progress bars
- 365-day activity heatmap

---

## Massive Demo Datasets

| Dataset | Count |
|---------|-------|
| Courses | 320 |
| Lessons | 4,500+ |
| Quizzes | 180 |
| Instructors | 200 |
| Notifications | 500 |
| Forum posts | 350 |
| Assignments | 200 |
| Certificates | 120 |
| Reviews | 800 |
| Leaderboard entries | 150 |
| Coding exercises | 100 |
| Live sessions | 40 |
| Study groups | 50 |

---

## AI Tutor UI

The AI Tutor (`ai-tutor.html`) is a **front-end UI demonstration** only. It displays sample conversations and accepts user messages with simulated responses. No external AI API is connected.

---

## Theme Customization

- Toggle via header button or `Ctrl+D`
- Preference stored in `localStorage` under `edusphere-theme`
- Variables defined in `css/themes.css`

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+K` | Focus global search |
| `Ctrl+D` | Toggle dark/light theme |

---

## Browser Compatibility

| Browser | Supported |
|---------|-----------|
| Chrome 90+ | ✅ Recommended |
| Firefox 88+ | ✅ |
| Edge 90+ | ✅ |
| Safari 14+ | ✅ |

Requires JavaScript enabled. YouTube embeds require internet connection.

---

## Performance Optimization

- **Lazy loading** for course thumbnail images
- **Pagination** for course grids (24 items per page)
- **Intersection Observer** for scroll animations
- **Efficient DOM updates** via template strings and targeted re-renders
- **Procedural data generation** — datasets built once at load, not stored in HTML

---

## Troubleshooting

### Videos not playing
- Ensure you have an internet connection (YouTube embeds)
- Try a different browser if corporate firewall blocks YouTube

### Live Server not starting
- Check if another app uses port 5500
- Reload VS Code window: `Ctrl+Shift+P` → "Reload Window"

### Theme not saving
- Enable cookies/localStorage in browser settings
- Avoid private browsing if persistence is required

### Blank course grid
- Open browser DevTools (F12) → Console for errors
- Ensure all `js/` files load (use Live Server, not `file://` if needed)

---

## Usage Guide

1. Start at **index.html** for the landing page
2. Browse **courses.html** for the full marketplace
3. Open any course → **Start Learning** → **lessons.html** with YouTube player
4. Visit **dashboard.html** for enrolled courses and analytics
5. Take quizzes at **quizzes.html**
6. Explore sidebar navigation for all platform sections

---

## Deployment

Upload the entire folder to any static host (GitHub Pages, Netlify, Vercel). No build step required.

---

**EduSphere** — Enterprise-grade e-learning, ready for GitHub and portfolio showcase.
