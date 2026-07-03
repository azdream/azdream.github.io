const terminal = document.querySelector('#terminal');
const form = document.querySelector('#command-form');
const input = document.querySelector('#command-input');

const state = {
  history: [],
  historyIndex: -1,
};

const commands = {
  help: {
    description: 'Show available commands',
    run: () => [
      ['highlight', 'Available commands'],
      ['', '  about        Who is azdream?'],
      ['', '  stack        Tech stack'],
      ['', '  projects     Featured projects'],
      ['', '  project2036  Long-term operating system'],
      ['', '  amp          tmux-agent-amp concept'],
      ['', '  philosophy   Core working principles'],
      ['', '  contact      Links'],
      ['', '  boot         Replay boot sequence'],
      ['', '  clear        Clear terminal'],
    ],
  },
  about: {
    description: 'Profile summary',
    run: () => [
      ['highlight', 'azdream'],
      ['', 'Backend developer focused on enterprise workflow systems, automation, and AI-assisted operations.'],
      ['', 'I build practical systems that reduce repetitive work and make decision-making easier.'],
      ['', '요약: 현실 업무를 자동화하는 백엔드 개발자. AI를 도구가 아니라 팀처럼 설계합니다.'],
    ],
  },
  stack: {
    description: 'Tech stack',
    run: () => [
      ['highlight', 'Tech Stack'],
      ['cmd', 'Backend'],
      ['', '  Java · Spring Boot · Oracle · PostgreSQL · Tomcat · Linux'],
      ['cmd', 'Automation'],
      ['', '  Make · Telegram Bot · Blogger · GitHub Pages · Scripts'],
      ['cmd', 'AI / Agent Ops'],
      ['', '  Claude Code · Codex · Obsidian · tmux · MCP ideas · Agent Registry'],
    ],
  },
  projects: {
    description: 'Featured projects',
    run: () => [
      ['highlight', 'Featured Projects'],
      ['cmd', '1. Project2036 AMP'],
      ['', '   Web-based Agent Management Platform for tmux-based LLM CLI agents.'],
      ['cmd', '2. AI Product Listing Pipeline'],
      ['', '   OCR → Catalog → Pricing → Review → Listing workflow for retail automation.'],
      ['cmd', '3. Enterprise Workflow Automation'],
      ['', '   Backend patterns and automation notes from real business systems.'],
    ],
  },
  project2036: {
    description: 'Project2036 mission',
    run: () => [
      ['highlight', 'Project2036'],
      ['', 'A long-term personal operating system for work, business, health, and assets.'],
      ['', 'Mission: build better experiences, automate repetitive work, and create durable freedom.'],
      ['', 'Core values: wisdom · responsibility · persistence · joy · fairness'],
    ],
  },
  amp: {
    description: 'tmux-agent-amp concept',
    run: () => [
      ['highlight', 'tmux-agent-amp'],
      ['', 'A web-based control plane for tmux-based LLM CLI agents.'],
      ['cmd', 'MVP Flow'],
      ['', '  Register Agent → choose tmux session/window/pane → launch CLI → sync Obsidian → health check'],
      ['cmd', 'Modules'],
      ['', '  Agent Registry · tmux Runtime · Web Terminal · Health Check · Botsitting Log · Circuit Breaker'],
    ],
  },
  philosophy: {
    description: 'Working principles',
    run: () => [
      ['highlight', 'Philosophy'],
      ['', 'AI is not just a tool. AI is a team.'],
      ['', 'Good automation is not about running more. It is about reducing human babysitting.'],
      ['', 'Everything is observable. Everything is replaceable. Everything is measured.'],
    ],
  },
  contact: {
    description: 'Contact links',
    run: () => [
      ['highlight', 'Contact'],
      ['', 'GitHub: https://github.com/azdream'],
      ['', 'Site:   https://blog.ethices.com'],
    ],
  },
  boot: {
    description: 'Replay boot sequence',
    run: () => [
      ['muted', 'Project2036 Terminal v0.1.0'],
      ['muted', 'Booting AI workflow console...'],
      ['ok', '[OK] Backend Systems'],
      ['ok', '[OK] AI Agent Workflows'],
      ['ok', '[OK] Obsidian Knowledge OS'],
      ['ok', '[OK] tmux Agent Runtime'],
      ['ok', '[OK] Human Approval Layer'],
      ['highlight', 'Welcome back. Type help to begin.'],
    ],
  },
};

function appendLine(text = '', className = '') {
  const line = document.createElement('div');
  line.className = `line ${className}`.trim();
  line.textContent = text;
  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
}

function appendOutput(rows) {
  rows.forEach(([className, text]) => appendLine(text, className));
}

function runCommand(rawCommand) {
  const command = rawCommand.trim().toLowerCase();
  if (!command) return;

  appendLine(`azdream@project2036:~$ ${rawCommand}`, 'prompt');

  if (command === 'clear') {
    terminal.innerHTML = '';
    return;
  }

  const entry = commands[command];
  if (!entry) {
    appendLine(`command not found: ${rawCommand}`, 'error');
    appendLine('Type help to see available commands.', 'muted');
    return;
  }

  appendOutput(entry.run());
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = input.value;
  if (value.trim()) {
    state.history.push(value);
    state.historyIndex = state.history.length;
    runCommand(value);
  }
  input.value = '';
});

input.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    if (state.history.length === 0) return;
    state.historyIndex = Math.max(0, state.historyIndex - 1);
    input.value = state.history[state.historyIndex] || '';
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault();
    if (state.history.length === 0) return;
    state.historyIndex = Math.min(state.history.length, state.historyIndex + 1);
    input.value = state.history[state.historyIndex] || '';
  }
});

document.addEventListener('click', () => input.focus());

setTimeout(() => {
  appendLine('Tip: try `amp`, `projects`, or `philosophy`.', 'muted');
}, 650);
