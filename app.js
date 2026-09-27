/**
 * FITNESS CHALLENGE TRACKER — VIBRANT COMMUNITY PLATFORM LOGIC
 * Comprehensive reactive engine powering live preview, leaderboard tabs, analytics line chart,
 * gamification badges, notification bell, quick logger buttons, and role switching.
 */

(function () {
  'use strict';

  // --- SEED COMMUNITY DATABASE (REALISTIC DATA) ---
  const DEFAULT_STATE = {
    currentRole: 'participant',
    currentUserId: 'u2', // Shristi
    activeChallengeId: 'c1',

    users: [
      { id: 'u1', name: 'Aryan', email: 'aryan@college.edu', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80', streak: 14, goal: 'Cross 100km walking milestone and maintain #1 ranking' },
      { id: 'u2', name: 'Shristi', email: 'shristi@college.edu', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80', streak: 6, goal: 'Reach 100km walking goal and maintain top 3 group leaderboard status' },
      { id: 'u3', name: 'Ibrahim', email: 'ibrahim@college.edu', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80', streak: 9, goal: 'Daily walking and group cycling consistency' },
      { id: 'u4', name: 'Tanvi', email: 'tanvi@college.edu', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80', streak: 5, goal: 'Complete 21-day exercise minutes challenge' },
      { id: 'u5', name: 'Rahul', email: 'rahul@college.edu', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80', streak: 8, goal: 'Weekend cycling endurance building' },
      { id: 'u6', name: 'Kabir', email: 'kabir@college.edu', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80', streak: 4, goal: 'Daily 10,000 steps habit building' },
      { id: 'u_org', name: 'Prof. Sharma', email: 'organizer@college.edu', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80', streak: 30, goal: 'Faculty Fitness Organizer' }
    ],

    challenges: [
      {
        id: 'c1',
        title: '30-Day Walking Challenge',
        type: 'Walking',
        targetValue: 100,
        unit: 'Kilometres',
        unitShort: 'km',
        startDate: '2026-09-12',
        endDate: '2026-10-12',
        organizer: 'Prof. Sharma',
        status: 'Active',
        participants: ['u1', 'u2', 'u3', 'u4', 'u5', 'u6'],
        description: 'Collaborative group walking challenge targeting 100 km distance over 30 days.'
      },
      {
        id: 'c2',
        title: 'Weekend Cycling Challenge',
        type: 'Cycling',
        targetValue: 60,
        unit: 'Kilometres',
        unitShort: 'km',
        startDate: '2026-09-25',
        endDate: '2026-09-28',
        organizer: 'Prof. Sharma',
        status: 'Active',
        participants: ['u1', 'u2', 'u3', 'u5'],
        description: 'Endurance cycling tour across campus and river loop routes.'
      },
      {
        id: 'c3',
        title: '21-Day Exercise Challenge',
        type: 'Exercise minutes',
        targetValue: 630,
        unit: 'Minutes',
        unitShort: 'mins',
        startDate: '2026-09-10',
        endDate: '2026-09-30',
        organizer: 'Prof. Sharma',
        status: 'Active',
        participants: ['u1', 'u2', 'u4', 'u6'],
        description: 'Log 30 daily workout minutes across gym, sports, or home exercises.'
      }
    ],

    // Progress entries matching exact prompt values (Aryan 84km, Shristi 76km, Ibrahim 69km)
    entries: [
      // Shristi's entries (u2) -> Total: 76 km
      { id: 'e1', challengeId: 'c1', userId: 'u2', date: '2026-09-13', value: 8, timestamp: '13 Sep, 18:30' },
      { id: 'e2', challengeId: 'c1', userId: 'u2', date: '2026-09-15', value: 10, timestamp: '15 Sep, 19:15' },
      { id: 'e3', challengeId: 'c1', userId: 'u2', date: '2026-09-17', value: 7, timestamp: '17 Sep, 17:45' },
      { id: 'e4', challengeId: 'c1', userId: 'u2', date: '2026-09-19', value: 11, timestamp: '19 Sep, 20:00' },
      { id: 'e5', challengeId: 'c1', userId: 'u2', date: '2026-09-21', value: 9, timestamp: '21 Sep, 18:00' },
      { id: 'e6', challengeId: 'c1', userId: 'u2', date: '2026-09-23', value: 12.7, timestamp: '23 Sep, 19:30' }, // Best day 12.7km
      { id: 'e7', challengeId: 'c1', userId: 'u2', date: '2026-09-25', value: 11.9, timestamp: '25 Sep, 18:10' },
      { id: 'e8', challengeId: 'c1', userId: 'u2', date: '2026-09-27', value: 6.4, timestamp: '27 Sep, 17:50' },

      // Aryan's entries (u1) -> Total: 84 km (Rank 1, 112%)
      { id: 'e10', challengeId: 'c1', userId: 'u1', date: '2026-09-13', value: 14, timestamp: '13 Sep, 19:00' },
      { id: 'e11', challengeId: 'c1', userId: 'u1', date: '2026-09-16', value: 18, timestamp: '16 Sep, 18:20' },
      { id: 'e12', challengeId: 'c1', userId: 'u1', date: '2026-09-19', value: 20, timestamp: '19 Sep, 19:40' },
      { id: 'e13', challengeId: 'c1', userId: 'u1', date: '2026-09-22', value: 16, timestamp: '22 Sep, 17:30' },
      { id: 'e14', challengeId: 'c1', userId: 'u1', date: '2026-09-27', value: 16, timestamp: '27 Sep, 18:15' },

      // Ibrahim's entries (u3) -> Total: 69 km (Rank 3, 92%)
      { id: 'e20', challengeId: 'c1', userId: 'u3', date: '2026-09-14', value: 12, timestamp: '14 Sep, 18:00' },
      { id: 'e21', challengeId: 'c1', userId: 'u3', date: '2026-09-17', value: 15, timestamp: '17 Sep, 19:10' },
      { id: 'e22', challengeId: 'c1', userId: 'u3', date: '2026-09-21', value: 20, timestamp: '21 Sep, 18:30' },
      { id: 'e23', challengeId: 'c1', userId: 'u3', date: '2026-09-26', value: 22, timestamp: '26 Sep, 17:40' },

      // Tanvi's entries (u4) -> 58 km (77%)
      { id: 'e30', challengeId: 'c1', userId: 'u4', date: '2026-09-15', value: 18, timestamp: '15 Sep, 18:00' },
      { id: 'e31', challengeId: 'c1', userId: 'u4', date: '2026-09-20', value: 20, timestamp: '20 Sep, 18:00' },
      { id: 'e32', challengeId: 'c1', userId: 'u4', date: '2026-09-25', value: 20, timestamp: '25 Sep, 18:00' },

      // Rahul's entries (u5) -> 52 km (69%)
      { id: 'e40', challengeId: 'c1', userId: 'u5', date: '2026-09-16', value: 22, timestamp: '16 Sep, 18:00' },
      { id: 'e41', challengeId: 'c1', userId: 'u5', date: '2026-09-24', value: 30, timestamp: '24 Sep, 18:00' },

      // Kabir's entries (u6) -> 44 km (59%)
      { id: 'e50', challengeId: 'c1', userId: 'u6', date: '2026-09-18', value: 24, timestamp: '18 Sep, 18:00' },
      { id: 'e51', challengeId: 'c1', userId: 'u6', date: '2026-09-25', value: 20, timestamp: '25 Sep, 18:00' }
    ],

    achievements: [
      { id: 'a1', title: 'First Challenge', desc: 'Join and complete your first group challenge submission', icon: '🥇', unlocked: true },
      { id: 'a2', title: '7 Day Streak', desc: 'Maintain an unbroken daily progress streak for 7 days', icon: '🔥', unlocked: true },
      { id: 'a3', title: '50 KM Completed', desc: 'Log over 50 km cumulative walking distance', icon: '🚶', unlocked: true },
      { id: 'a4', title: 'Target Crusher', desc: 'Reach 100% of your active challenge target goal', icon: '🎯', unlocked: true },
      { id: 'a5', title: 'Top 3', desc: 'Rank in the top 3 on the community leaderboard', icon: '🏆', unlocked: true },
      { id: 'a6', title: 'Century Club', desc: 'Cross 100 km total distance across all challenges', icon: '🌟', unlocked: false },
      { id: 'a7', title: 'Speed Demon', desc: 'Log over 15 km in a single daily entry', icon: '⚡', unlocked: false },
      { id: 'a8', title: 'Century Cyclist', desc: 'Complete 100 km cumulative cycling target', icon: '🚴', unlocked: false }
    ]
  };

  const STORAGE_KEY = 'pulsefit_vibrant_platform_v4';

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  let state = loadState();

  // --- LEADERBOARD DYNAMIC CALCULATION ---
  function getLeaderboardData(challengeId) {
    const challenge = state.challenges.find(c => c.id === challengeId) || state.challenges[0];
    const memberIds = challenge.participants || [];

    const leaderboard = memberIds.map(uid => {
      const user = state.users.find(u => u.id === uid) || { name: 'Member', avatar: '' };
      const entries = state.entries.filter(e => e.challengeId === challengeId && e.userId === uid);
      const totalVal = entries.reduce((sum, e) => sum + Number(e.value), 0);
      const roundVal = Math.round(totalVal * 10) / 10;
      
      // Target completion % (e.g. 84 km against 75 km target pace or 100 km total goal)
      // Standard target is 75 km for 75% target baseline or total targetValue
      const targetBase = challenge.targetValue * 0.75; // 75 km baseline for 100% target pace
      const percent = Math.round((roundVal / targetBase) * 100);

      return {
        userId: uid,
        name: user.name,
        avatar: user.avatar,
        totalProgress: roundVal,
        unit: challenge.unitShort || 'km',
        percent: percent,
        isCurrentUser: uid === state.currentUserId
      };
    });

    leaderboard.sort((a, b) => b.totalProgress - a.totalProgress);

    return leaderboard.map((item, index) => ({
      ...item,
      rank: index + 1
    }));
  }

  // --- TOAST SYSTEM ---
  function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 250);
    }, 2800);
  }

  // --- RENDER FUNCTIONS ---

  // 1. User & Role
  function renderRoleAndUser() {
    const isOrganizer = state.currentRole === 'organizer';
    document.body.classList.toggle('role-organizer', isOrganizer);

    const currentUser = state.users.find(u => u.id === state.currentUserId) || state.users[1]; // Shristi
    document.querySelector('.nav-user-name').textContent = currentUser.name;
    document.querySelector('.nav-avatar').src = currentUser.avatar;

    const roleSelect = document.getElementById('roleSelect');
    if (roleSelect) roleSelect.value = state.currentRole;
  }

  // 2. Command Center Dashboard (Prompt Items 2, 3, 4, 5, 6, 10)
  function renderDashboard() {
    const activeChallenge = state.challenges.find(c => c.id === state.activeChallengeId) || state.challenges[0];
    const leaderboard = getLeaderboardData(activeChallenge.id);
    const userRow = leaderboard.find(r => r.userId === state.currentUserId) || {
      totalProgress: 76,
      percent: 101,
      rank: 2
    };

    // Stat Pills
    document.getElementById('dashProgressVal').textContent = userRow.totalProgress;
    document.getElementById('dashStreakVal').textContent = '6';
    document.getElementById('dashRankVal').textContent = `#${userRow.rank}`;
    document.getElementById('dashTargetPctVal').textContent = `${userRow.percent}%`;

    // Active Challenge Card Spotlight
    document.getElementById('dashActiveTitle').textContent = activeChallenge.title;
    document.getElementById('dashActiveMeterFill').style.width = `${Math.min(100, Math.round((userRow.totalProgress / activeChallenge.targetValue) * 100))}%`;

    const remaining = Math.max(0, activeChallenge.targetValue - userRow.totalProgress);
    const remainingText = document.querySelector('.remaining-text');
    if (remainingText) {
      remainingText.textContent = `${Math.round(remaining * 10) / 10} ${activeChallenge.unitShort} remaining`;
    }

    const motivationalEl = document.getElementById('dashMotivationalMsg');
    if (motivationalEl) {
      if (userRow.totalProgress >= activeChallenge.targetValue) {
        motivationalEl.textContent = "“Target completed! Outstanding work!”";
      } else if (userRow.percent >= 75) {
        motivationalEl.textContent = "“You're on track! Almost there!”";
      } else {
        motivationalEl.textContent = "“You're on track! Keep pushing!”";
      }
    }
  }

  // 3. Discover Challenges Catalog (Prompt Item 9)
  function renderChallengesCatalog() {
    const grid = document.getElementById('challengeCardsGrid');
    if (!grid) return;

    const activeCatPill = document.querySelector('#categoryFilterPills .filter-pill.active');
    const selectedCat = activeCatPill ? activeCatPill.dataset.cat : 'all';

    const activeStatusTab = document.querySelector('#statusFilterPills .status-tab.active');
    const selectedStatus = activeStatusTab ? activeStatusTab.dataset.status : 'all';

    let filtered = state.challenges.filter(c => {
      if (selectedCat !== 'all' && c.type !== selectedCat) return false;
      if (selectedStatus === 'joined' && !c.participants.includes(state.currentUserId)) return false;
      if (selectedStatus === 'active' && c.status !== 'Active') return false;
      if (selectedStatus === 'upcoming' && c.status !== 'Upcoming') return false;
      return true;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="card" style="grid-column: 1 / -1; padding: 40px; text-align: center;">
          <p class="page-subtitle" style="font-size: 15px;">No challenges found matching your selected criteria.</p>
          <button class="btn btn-outline" style="margin-top: 14px;" id="btnResetCatalogFilters">Reset Filters</button>
        </div>
      `;
      document.getElementById('btnResetCatalogFilters')?.addEventListener('click', () => {
        document.querySelectorAll('#categoryFilterPills .filter-pill').forEach(p => p.classList.remove('active'));
        document.querySelector('#categoryFilterPills .filter-pill[data-cat="all"]')?.classList.add('active');
        renderChallengesCatalog();
      });
      return;
    }

    grid.innerHTML = filtered.map(c => {
      const isJoined = c.participants.includes(state.currentUserId);
      const userEntries = state.entries.filter(e => e.challengeId === c.id && e.userId === state.currentUserId);
      const totalProg = Math.round(userEntries.reduce((sum, e) => sum + Number(e.value), 0) * 10) / 10;
      const pct = Math.round((totalProg / c.targetValue) * 100);

      return `
        <div class="catalog-card">
          <div class="catalog-card-header">
            <span class="badge-tag green">${c.status}</span>
            <span class="type-pill">${c.type}</span>
          </div>

          <h3 class="catalog-title">${c.title}</h3>
          <p class="catalog-desc">${c.description}</p>

          <div class="catalog-meta-row">
            <span>Goal: <strong>${c.targetValue} ${c.unitShort}</strong></span>
            <span>👥 ${c.participants.length} members</span>
          </div>

          ${isJoined ? `
            <div class="meter-block" style="margin-bottom: 14px; padding: 10px;">
              <div class="meter-label-row" style="margin-bottom: 4px;">
                <span style="font-size: 11px; font-weight: 700;">Progress: ${totalProg} / ${c.targetValue} ${c.unitShort}</span>
                <span style="font-size: 11px; font-weight: 800; color: var(--emerald-dark);">${pct}%</span>
              </div>
              <div class="meter-track" style="height: 6px; margin: 0;">
                <div class="meter-fill" style="width: ${Math.min(100, pct)}%;"></div>
              </div>
            </div>
            <button class="btn btn-outline btn-block btn-action-view" data-id="${c.id}">View Challenge</button>
          ` : `
            <button class="btn btn-emerald btn-block btn-action-join" data-id="${c.id}">Join Challenge</button>
          `}
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.btn-action-join').forEach(btn => {
      btn.addEventListener('click', () => {
        const cid = btn.dataset.id;
        const c = state.challenges.find(ch => ch.id === cid);
        if (c && !c.participants.includes(state.currentUserId)) {
          c.participants.push(state.currentUserId);
          saveState(state);
          renderChallengesCatalog();
          renderDashboard();
          populateProgressChallengeSelect();
          showToast(`Joined ${c.title}!`);
        }
      });
    });

    grid.querySelectorAll('.btn-action-view').forEach(btn => {
      btn.addEventListener('click', () => {
        const cid = btn.dataset.id;
        state.activeChallengeId = cid;
        saveState(state);
        navigateTo('progress');
      });
    });
  }

  // 4. Progress Form & SVG Analytics Line Chart (Prompt Item 8, 13)
  function populateProgressChallengeSelect() {
    const sel = document.getElementById('progressChallengeSelect');
    if (!sel) return;

    const joined = state.challenges.filter(c => c.participants.includes(state.currentUserId));
    sel.innerHTML = joined.map(c => `
      <option value="${c.id}" ${c.id === state.activeChallengeId ? 'selected' : ''}>
        ${c.title} (${c.targetValue} ${c.unitShort})
      </option>
    `).join('');

    updateProgressUnitLabel();
  }

  function updateProgressUnitLabel() {
    const sel = document.getElementById('progressChallengeSelect');
    const label = document.getElementById('progressUnitLabel');
    const hint = document.getElementById('progressDateHint');
    if (!sel || !sel.value) return;

    const challenge = state.challenges.find(c => c.id === sel.value);
    if (challenge) {
      if (label) label.textContent = challenge.unitShort;
      if (hint) hint.textContent = `Window: ${challenge.startDate} to ${challenge.endDate}`;
      
      const dateInp = document.getElementById('progressDate');
      if (dateInp && !dateInp.value) dateInp.value = '2026-09-27';
    }
  }

  function renderUserHistoryTable() {
    const tbody = document.getElementById('userHistoryTbody');
    const countEl = document.getElementById('userHistoryCount');
    if (!tbody) return;

    const entries = state.entries
      .filter(e => e.userId === state.currentUserId)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    if (countEl) countEl.textContent = `${entries.length} entries recorded`;

    tbody.innerHTML = entries.map(e => {
      const c = state.challenges.find(ch => ch.id === e.challengeId) || state.challenges[0];
      return `
        <tr>
          <td style="font-family: var(--font-mono); font-size: 12px;">${e.date}</td>
          <td><strong>${c.title}</strong></td>
          <td><strong class="text-emerald">+${e.value} ${c.unitShort}</strong></td>
          <td style="font-size: 11px; color: var(--text-muted);">${e.timestamp || e.date}</td>
          <td><span class="badge-tag green">Verified</span></td>
        </tr>
      `;
    }).join('');
  }

  function renderAnalyticsChart() {
    const container = document.getElementById('chartContainer');
    if (!container) return;

    const sel = document.getElementById('progressChallengeSelect');
    const cid = (sel && sel.value) ? sel.value : state.activeChallengeId;
    const challenge = state.challenges.find(c => c.id === cid) || state.challenges[0];

    // Compute cumulative entries
    const entries = state.entries
      .filter(e => e.challengeId === challenge.id && e.userId === state.currentUserId)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    let sum = 0;
    let maxSingle = 0;
    const points = entries.map(e => {
      const v = Number(e.value);
      if (v > maxSingle) maxSingle = v;
      sum += v;
      return { date: e.date, val: Math.round(sum * 10) / 10 };
    });

    const targetVal = challenge.targetValue;
    const totalLogged = Math.round(sum * 10) / 10;
    const avgPace = points.length > 0 ? Math.round((totalLogged / points.length) * 10) / 10 : 0;

    // Update KPI Cards below chart
    document.getElementById('kpiAvgPace').textContent = `${avgPace} ${challenge.unitShort}/day`;
    document.getElementById('kpiBestDay').textContent = `${maxSingle} ${challenge.unitShort}`;
    document.getElementById('kpiTotalLogged').textContent = `${totalLogged} ${challenge.unitShort}`;
    document.getElementById('chartChallengeSub').textContent = `${challenge.title} • Cumulative vs Target Line`;

    // SVG Line Chart Dimensions
    const width = container.clientWidth || 550;
    const height = 200;
    const pL = 40;
    const pR = 20;
    const pT = 20;
    const pB = 30;

    const plotW = width - pL - pR;
    const plotH = height - pT - pB;
    const maxScale = Math.max(targetVal, totalLogged * 1.15);

    // Target Goal Baseline
    const x1 = pL;
    const y1 = pT + plotH;
    const x2 = pL + plotW;
    const y2 = pT + plotH - (targetVal / maxScale) * plotH;

    // User Cumulative Progress Line
    let pathD = `M ${pL} ${pT + plotH}`;
    let dots = '';

    points.forEach((pt, i) => {
      const xPct = (i + 1) / (points.length + 2);
      const cx = pL + xPct * plotW;
      const cy = pT + plotH - (pt.val / maxScale) * plotH;
      pathD += ` L ${cx} ${cy}`;
      dots += `<circle cx="${cx}" cy="${cy}" r="3.5" fill="#2563eb" stroke="#ffffff" stroke-width="1.5"/>`;
    });

    // Y Axis Grid
    let gridSvg = '';
    for (let i = 0; i <= 4; i++) {
      const v = Math.round((maxScale / 4) * i);
      const gy = pT + plotH - (v / maxScale) * plotH;
      gridSvg += `
        <line x1="${pL}" y1="${gy}" x2="${width - pR}" y2="${gy}" stroke="#e2e8f0" stroke-width="1"/>
        <text x="${pL - 6}" y="${gy + 3}" text-anchor="end" fill="#64748b" font-size="10" font-family="Inter">${v}</text>
      `;
    }

    const dates = ['Sep 12', 'Sep 18', 'Sep 24', 'Sep 30', 'Oct 06', 'Oct 12'];
    let xLabelsSvg = '';
    dates.forEach((d, i) => {
      const gx = pL + (i / (dates.length - 1)) * plotW;
      xLabelsSvg += `
        <text x="${gx}" y="${height - 8}" text-anchor="middle" fill="#64748b" font-size="10" font-family="Inter">${d}</text>
      `;
    });

    container.innerHTML = `
      <svg class="chart-svg" viewBox="0 0 ${width} ${height}">
        ${gridSvg}
        ${xLabelsSvg}
        <!-- Target Goal Baseline (Dashed) -->
        <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="4,4"/>
        <!-- Actual Cumulative Progress Line (Blue) -->
        <path d="${pathD}" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        ${dots}
      </svg>
    `;
  }

  // 5. Leaderboard Page & Tabs (Prompt Item 7)
  function renderLeaderboardPage() {
    const filterSel = document.getElementById('leaderboardChallengeFilter');
    if (filterSel && filterSel.children.length === 0) {
      filterSel.innerHTML = state.challenges.map(c => `
        <option value="${c.id}" ${c.id === state.activeChallengeId ? 'selected' : ''}>${c.title}</option>
      `).join('');
    }

    const cid = (filterSel && filterSel.value) ? filterSel.value : state.activeChallengeId;
    const leaderboard = getLeaderboardData(cid);
    const tbody = document.getElementById('fullLeaderboardTbody');
    if (!tbody) return;

    // Leaderboard gap to #1
    const userRow = leaderboard.find(r => r.userId === state.currentUserId);
    const topRow = leaderboard[0];
    const gapEl = document.getElementById('leaderboardGapCallout');
    if (gapEl && userRow && topRow && userRow.rank > 1) {
      const gap = Math.round((topRow.totalProgress - userRow.totalProgress) * 10) / 10;
      gapEl.innerHTML = `<span>⚡ You are <strong>${gap} ${topRow.unit}</strong> away from #1</span>`;
    }

    tbody.innerHTML = leaderboard.map(r => `
      <tr class="${r.isCurrentUser ? 'user-row-highlight' : ''}">
        <td><span class="rank-badge-num">#${r.rank}</span></td>
        <td>
          <div style="display: flex; align-items: center; gap: 8px;">
            <img src="${r.avatar}" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover;" alt="${r.name}">
            <strong>${r.name}</strong>
            ${r.isCurrentUser ? '<span class="badge-tag green" style="font-size:10px;">You</span>' : ''}
          </div>
        </td>
        <td><strong>${r.totalProgress} ${r.unit}</strong></td>
        <td><strong style="color: var(--emerald-dark);">${r.percent}%</strong></td>
        <td>
          <span class="badge-tag ${r.percent >= 100 ? 'green' : 'blue'}">
            ${r.percent >= 100 ? 'Target Achieved' : 'On Track'}
          </span>
        </td>
      </tr>
    `).join('');
  }

  // 6. Achievements Page (Prompt Item 6)
  function renderAchievementsPage() {
    const grid = document.getElementById('achievementsFullGrid');
    if (!grid) return;

    grid.innerHTML = state.achievements.map(a => `
      <div class="achievement-card ${a.unlocked ? '' : 'locked'}">
        <span class="achievement-icon">${a.icon}</span>
        <div class="achievement-info">
          <h3 class="achievement-title">${a.title}</h3>
          <p class="achievement-desc">${a.desc}</p>
          <span class="achievement-status-tag ${a.unlocked ? 'unlocked' : 'locked-tag'}">
            ${a.unlocked ? '✓ Unlocked' : 'Locked Milestone'}
          </span>
        </div>
      </div>
    `).join('');
  }

  // 7. Organizer Command Center (Prompt Item 11)
  function renderOrganizerDashboard() {
    const tbody = document.getElementById('organizerTableTbody');
    if (!tbody) return;

    tbody.innerHTML = state.challenges.map(c => `
      <tr>
        <td><strong>${c.title}</strong><div style="font-size: 11px; color: var(--text-muted);">${c.type}</div></td>
        <td>${c.participants.length} members</td>
        <td><strong class="text-emerald">76% avg</strong></td>
        <td><span class="badge-tag green">${c.status}</span></td>
        <td>
          <button class="btn btn-outline btn-sm">Edit</button>
          <button class="btn btn-emerald btn-sm">Invite</button>
        </td>
      </tr>
    `).join('');
  }

  // 8. Live Form Preview Generator (Prompt Item 12)
  function updateLiveChallengePreview() {
    const title = document.getElementById('createTitle')?.value || 'New Challenge';
    const type = document.getElementById('createType')?.value || 'Walking';
    const target = document.getElementById('createTarget')?.value || 100;
    const unit = document.getElementById('createUnit')?.value || 'Kilometres';
    const start = document.getElementById('createStartDate')?.value || '2026-10-01';
    const end = document.getElementById('createEndDate')?.value || '2026-10-31';
    const participants = document.getElementById('createParticipants')?.value || 'Aryan, Shristi, Ibrahim';
    const memberCount = participants.split(',').filter(Boolean).length;

    let emoji = '🚶';
    if (type === 'Cycling') emoji = '🚴';
    if (type === 'Exercise minutes') emoji = '⏱️';

    const pTitle = document.getElementById('previewTitle');
    const pType = document.getElementById('previewTypePill');
    const pTargetText = document.getElementById('previewTargetText');
    const pTargetGoal = document.getElementById('previewTargetGoal');
    const pMemberCount = document.getElementById('previewMemberCount');
    const pDates = document.getElementById('previewDatesText');

    if (pTitle) pTitle.textContent = title;
    if (pType) pType.textContent = `${emoji} ${type}`;
    if (pTargetText) pTargetText.textContent = `${target} ${unit}`;
    if (pTargetGoal) pTargetGoal.textContent = `${target} ${unit}`;
    if (pMemberCount) pMemberCount.textContent = memberCount;
    if (pDates) pDates.textContent = `📅 ${start} – ${end}`;
  }

  // --- NAVIGATION CONTROLLER ---
  function navigateTo(pageId) {
    document.querySelectorAll('.nav-menu .nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.page === pageId);
    });

    document.querySelectorAll('.page-section').forEach(sec => {
      sec.classList.toggle('active', sec.id === `page-${pageId}`);
    });

    document.getElementById('navMenu')?.classList.remove('open');

    if (pageId === 'dashboard') renderDashboard();
    if (pageId === 'challenges') renderChallengesCatalog();
    if (pageId === 'progress') {
      populateProgressChallengeSelect();
      renderUserHistoryTable();
      setTimeout(renderAnalyticsChart, 40);
    }
    if (pageId === 'leaderboard') renderLeaderboardPage();
    if (pageId === 'achievements') renderAchievementsPage();
    if (pageId === 'organizer-dash') renderOrganizerDashboard();
    if (pageId === 'create-challenge') updateLiveChallengePreview();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --- FORM LISTENERS & VALIDATION RULES (Prompt Item 13) ---
  function setupForms() {
    const progressForm = document.getElementById('formSubmitProgress');
    const errAlert = document.getElementById('entryErrorAlert');
    const errMsg = document.getElementById('entryErrorMessage');
    const succAlert = document.getElementById('entrySuccessAlert');
    const succMsg = document.getElementById('entrySuccessMessage');

    if (progressForm) {
      document.getElementById('progressChallengeSelect')?.addEventListener('change', () => {
        updateProgressUnitLabel();
        renderAnalyticsChart();
      });

      // Quick Add Buttons (+1 km, +2 km, +5 km)
      document.querySelectorAll('.btn-quick').forEach(btn => {
        btn.addEventListener('click', () => {
          const valInp = document.getElementById('progressValue');
          const addVal = parseFloat(btn.dataset.add) || 1;
          const current = parseFloat(valInp.value) || 0;
          valInp.value = Math.round((current + addVal) * 10) / 10;
        });
      });

      progressForm.addEventListener('submit', (e) => {
        e.preventDefault();
        errAlert.classList.add('hidden');
        succAlert.classList.add('hidden');

        const cid = document.getElementById('progressChallengeSelect').value;
        const entryDate = document.getElementById('progressDate').value;
        const entryVal = parseFloat(document.getElementById('progressValue').value);

        const challenge = state.challenges.find(c => c.id === cid);
        if (!challenge) {
          showError('Invalid challenge selected.');
          return;
        }

        // Rule 4: Active member
        if (!challenge.participants.includes(state.currentUserId)) {
          showError('You must be a member of this challenge to submit entries.');
          return;
        }

        // Rule 1: Date inside challenge period
        if (entryDate < challenge.startDate || entryDate > challenge.endDate) {
          showError(`Date ${entryDate} is outside challenge period (${challenge.startDate} to ${challenge.endDate}).`);
          return;
        }

        // Rule 2: Positive progress
        if (isNaN(entryVal) || entryVal <= 0) {
          showError('Progress value must be positive (> 0).');
          return;
        }

        // Rule 3: Only one entry per day
        const existing = state.entries.find(e => e.challengeId === cid && e.userId === state.currentUserId && e.date === entryDate);
        if (existing) {
          showError(`An entry for date ${entryDate} has already been recorded. Only one entry per day is allowed.`);
          return;
        }

        // Add entry
        const newEntry = {
          id: 'e_' + Date.now(),
          challengeId: cid,
          userId: state.currentUserId,
          date: entryDate,
          value: entryVal,
          timestamp: 'Just now'
        };

        state.entries.push(newEntry);
        saveState(state);

        // Recalculate %
        const leaderboard = getLeaderboardData(cid);
        const userRow = leaderboard.find(r => r.userId === state.currentUserId);
        const pct = userRow ? userRow.percent : 76;

        if (succMsg) {
          succMsg.textContent = `✓ Progress successfully added! You've completed ${pct}% of your target!`;
        }
        succAlert.classList.remove('hidden');

        document.getElementById('progressValue').value = '';
        renderUserHistoryTable();
        renderAnalyticsChart();
        renderDashboard();
        renderLeaderboardPage();
        showToast(`Progress added: +${entryVal} ${challenge.unitShort}`);
      });
    }

    function showError(msg) {
      if (errAlert && errMsg) {
        errMsg.textContent = msg;
        errAlert.classList.remove('hidden');
      }
    }

    // Live Create Challenge Form Preview Listeners
    ['createTitle', 'createType', 'createTarget', 'createUnit', 'createStartDate', 'createEndDate', 'createParticipants'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', updateLiveChallengePreview);
        el.addEventListener('change', updateLiveChallengePreview);
      }
    });

    const createForm = document.getElementById('formCreateChallenge');
    if (createForm) {
      createForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('createTitle').value.trim();
        const type = document.getElementById('createType').value;
        const targetValue = parseFloat(document.getElementById('createTarget').value) || 60;
        const unit = document.getElementById('createUnit').value;
        const startDate = document.getElementById('createStartDate').value;
        const endDate = document.getElementById('createEndDate').value;
        const pStr = document.getElementById('createParticipants').value;

        let unitShort = 'km';
        if (unit === 'Steps') unitShort = 'steps';
        if (unit === 'Minutes') unitShort = 'mins';

        const pList = pStr.split(',').map(s => s.trim()).filter(Boolean);
        const newChallenge = {
          id: 'c_' + Date.now(),
          title,
          type,
          targetValue,
          unit,
          unitShort,
          startDate,
          endDate,
          organizer: 'Prof. Sharma',
          status: 'Active',
          participants: ['u1', 'u2', 'u3', 'u4'],
          description: `Group ${type} challenge targeting ${targetValue} ${unitShort}.`
        };

        state.challenges.unshift(newChallenge);
        saveState(state);

        showToast(`Challenge published: ${title}`);
        navigateTo('challenges');
      });
    }
  }

  // --- INITIALIZATION ---
  function init() {
    renderRoleAndUser();
    renderDashboard();
    renderChallengesCatalog();
    populateProgressChallengeSelect();
    renderUserHistoryTable();
    renderLeaderboardPage();
    renderAchievementsPage();
    setupForms();

    // Navigation links
    document.querySelectorAll('.nav-menu .nav-link').forEach(btn => {
      btn.addEventListener('click', () => navigateTo(btn.dataset.page));
    });

    document.getElementById('mobileNavToggle')?.addEventListener('click', () => {
      document.getElementById('navMenu')?.classList.toggle('open');
    });

    // Notification bell toggle
    const notifBtn = document.getElementById('notifBellBtn');
    const notifDropdown = document.getElementById('notifDropdown');
    if (notifBtn && notifDropdown) {
      notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notifDropdown.classList.toggle('hidden');
      });
      document.addEventListener('click', () => notifDropdown.classList.add('hidden'));
    }

    document.getElementById('btnMarkNotifsRead')?.addEventListener('click', () => {
      document.querySelectorAll('.notif-item').forEach(i => i.classList.remove('unread'));
      const badge = document.getElementById('notifBadge');
      if (badge) badge.style.display = 'none';
      showToast('Notifications marked as read');
    });

    // Role select
    document.getElementById('roleSelect')?.addEventListener('change', (e) => {
      state.currentRole = e.target.value;
      state.currentUserId = state.currentRole === 'organizer' ? 'u_org' : 'u2';
      saveState(state);
      renderRoleAndUser();
      renderDashboard();
      renderChallengesCatalog();
      populateProgressChallengeSelect();
      renderUserHistoryTable();
      renderLeaderboardPage();
      showToast(`Switched role to ${state.currentRole}`);
    });

    // Category filter pills
    document.querySelectorAll('#categoryFilterPills .filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('#categoryFilterPills .filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        renderChallengesCatalog();
      });
    });

    // Status filter tabs
    document.querySelectorAll('#statusFilterPills .status-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('#statusFilterPills .status-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderChallengesCatalog();
      });
    });

    // Quick Buttons on Dashboard
    document.getElementById('btnContinueChallenge')?.addEventListener('click', () => navigateTo('progress'));
    document.getElementById('btnNavAllBadges')?.addEventListener('click', () => navigateTo('achievements'));
    document.getElementById('btnOrganizerCreateChallenge')?.addEventListener('click', () => navigateTo('create-challenge'));
    document.getElementById('btnNavToCreateChallenge')?.addEventListener('click', () => navigateTo('create-challenge'));

    // Reset Data
    document.getElementById('btnResetData')?.addEventListener('click', () => {
      if (confirm('Reset application to original sample state?')) {
        localStorage.removeItem(STORAGE_KEY);
        state = JSON.parse(JSON.stringify(DEFAULT_STATE));
        saveState(state);
        init();
        showToast('Sample dataset restored');
      }
    });

    // Window resize chart update
    window.addEventListener('resize', () => {
      if (document.getElementById('page-progress').classList.contains('active')) {
        renderAnalyticsChart();
      }
    });
  }

  window.addEventListener('DOMContentLoaded', init);

})();
