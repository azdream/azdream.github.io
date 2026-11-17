(() => {
  const SNAKE_DARK =
    "https://raw.githubusercontent.com/azdream/azdream/output/github-contribution-grid-snake-dark.svg";
  const SNAKE_LIGHT =
    "https://raw.githubusercontent.com/azdream/azdream/output/github-contribution-grid-snake.svg";

  const root = document.documentElement;
  const themeBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const snakeImg = document.getElementById("snake-img");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeIcon) themeIcon.textContent = theme === "dark" ? "🌙" : "☀️";
    if (snakeImg) snakeImg.src = theme === "dark" ? SNAKE_DARK : SNAKE_LIGHT;
    try {
      localStorage.setItem("azdream-theme", theme);
    } catch (_) {}
  }

  let savedTheme = "dark";
  try {
    const stored = localStorage.getItem("azdream-theme");
    if (stored === "light" || stored === "dark") savedTheme = stored;
  } catch (_) {}
  applyTheme(savedTheme);

  themeBtn?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    const rect = themeBtn.getBoundingClientRect();
    spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);
  });

  // Live KST Clock (UTC+9)
  const clockEl = document.getElementById("kst-clock");
  function updateClock() {
    if (!clockEl) return;
    try {
      const now = new Date();
      const fmt = new Intl.DateTimeFormat("ko-KR", {
        timeZone: "Asia/Seoul",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      clockEl.textContent = `KST ${fmt}`;
    } catch (_) {}
  }
  updateClock();
  setInterval(updateClock, 1000);

  // Typewriter Taglines
  const typingEl = document.getElementById("typing-text");
  const lines = [
    "Hello! I'm Chris Um (@azdream) from South Korea ✨",
    "Enterprise Back-office, APIs, Data Pipelines & Automation ⚡",
    "ETHICES — 선의 51%가 미래를 만든다 (51% of Good) 🌈",
    "AI is not just a tool. AI is a team. 🚀",
  ];
  let lineIdx = 0;
  let charIdx = lines[0].length;
  let deleting = true;

  function stepTyping() {
    if (!typingEl) return;
    const current = lines[lineIdx];
    if (!deleting) {
      charIdx++;
      typingEl.textContent = current.slice(0, charIdx);
      if (charIdx >= current.length) {
        deleting = true;
        setTimeout(stepTyping, 2200);
        return;
      }
      setTimeout(stepTyping, 48);
    } else {
      charIdx--;
      typingEl.textContent = current.slice(0, charIdx);
      if (charIdx <= 0) {
        deleting = false;
        lineIdx = (lineIdx + 1) % lines.length;
        setTimeout(stepTyping, 320);
        return;
      }
      setTimeout(stepTyping, 24);
    }
  }
  if (typingEl) setTimeout(stepTyping, 2600);

  // Tech Stack Category Filter
  const stackBtns = document.querySelectorAll("[data-stack-filter]");
  const stackChips = document.querySelectorAll("[data-stack-cat]");
  stackBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-stack-filter");
      stackBtns.forEach((b) => b.classList.toggle("is-active", b === btn));
      stackChips.forEach((chip) => {
        const match = target === "all" || chip.getAttribute("data-stack-cat") === target;
        chip.classList.toggle("is-dim", !match);
        chip.classList.toggle("is-lit", target !== "all" && match);
      });
    });
  });

  // Repository Category Filter
  const repoBtns = document.querySelectorAll("[data-repo-filter]");
  const repoCards = document.querySelectorAll("[data-repo]");
  repoBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.getAttribute("data-repo-filter");
      repoBtns.forEach((b) => b.classList.toggle("is-active", b === btn));
      repoCards.forEach((card) => {
        const match = cat === "all" || card.getAttribute("data-cat") === cat;
        card.classList.toggle("is-hidden", !match);
      });
    });
  });

  // Floating Sparkle & Confetti Particle Canvas
  const canvas = document.getElementById("sparkle-canvas");
  const ctx = canvas?.getContext("2d");
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const palette = ["#ec4899", "#fb923c", "#facc15", "#22d3ee", "#a78bfa", "#34d399"];
  const particles = [];

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function spawnBurst(x, y, count = 28) {
    if (!ctx || reducedMotion) return;
    for (let i = 0; i < count; i++) {
      const ang = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.45;
      const spd = 2.0 + Math.random() * 5.2;
      particles.push({
        x,
        y,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd - 1.5,
        size: 3.5 + Math.random() * 4.5,
        rot: Math.random() * Math.PI,
        vrot: (Math.random() - 0.5) * 0.2,
        life: 1.0,
        decay: 0.015 + Math.random() * 0.014,
        color: palette[Math.floor(Math.random() * palette.length)],
        shape: Math.random() > 0.45 ? "star" : "rect",
      });
    }
  }

  function drawStar(cx, cy, r, rot, color, alpha) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const ang = (i * Math.PI) / 4;
      const rad = i % 2 === 0 ? r : r * 0.36;
      const px = Math.cos(ang) * rad;
      const py = Math.sin(ang) * rad;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function tickParticles() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.11;
      p.rot += p.vrot;
      p.life -= p.decay;
      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }
      if (p.shape === "star") {
        drawStar(p.x, p.y, p.size, p.rot, p.color, p.life);
      } else {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 3, p.size, (p.size * 2) / 3);
        ctx.restore();
      }
    }
    requestAnimationFrame(tickParticles);
  }
  if (!reducedMotion && ctx) requestAnimationFrame(tickParticles);

  function bindBurstTrigger(el, count = 34) {
    el?.addEventListener("click", () => {
      const rect = el.getBoundingClientRect();
      spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, count);
    });
  }

  bindBurstTrigger(document.getElementById("hero-spark-btn"), 38);
  bindBurstTrigger(document.getElementById("finale-spark-btn"), 52);
  bindBurstTrigger(document.querySelector(".mascot-img"), 30);
  bindBurstTrigger(document.querySelector(".mascot-cheer"), 42);

  // Subtle initial celebratory burst around hero mascot once loaded
  window.addEventListener("load", () => {
    const heroMascot = document.querySelector(".mascot-img");
    if (heroMascot) {
      const rect = heroMascot.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 22);
      }
    }
  });

  // Live GitHub Public Profile & Repo Hydration (graceful fallback if rate-limited)
  async function hydrateGitHub() {
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch("https://api.github.com/users/azdream"),
        fetch("https://api.github.com/users/azdream/repos?per_page=100"),
      ]);
      if (userRes.ok) {
        const user = await userRes.json();
        const followersEl = document.getElementById("stat-followers");
        const reposEl = document.getElementById("stat-repos");
        if (followersEl && typeof user.followers === "number") {
          followersEl.textContent = String(user.followers);
        }
        if (reposEl && typeof user.public_repos === "number") {
          reposEl.textContent = String(user.public_repos);
        }
      }
      if (reposRes.ok) {
        const repos = await reposRes.json();
        if (Array.isArray(repos)) {
          const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
          const starsEl = document.getElementById("stat-stars");
          if (starsEl) starsEl.textContent = String(totalStars);

          const byName = new Map(repos.map((r) => [r.name, r]));
          repoCards.forEach((card) => {
            const name = card.getAttribute("data-repo");
            const data = name ? byName.get(name) : null;
            if (!data) return;
            const starBadge = card.querySelector("[data-repo-stars]");
            if (starBadge) starBadge.textContent = `★ ${data.stargazers_count ?? 0}`;
          });
        }
      }
    } catch (_) {}
  }
  hydrateGitHub();
})();
