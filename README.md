# 🏃 Fitness Challenge Tracker (Collaborative Web Application)

A clean, practical group fitness challenge platform built for small student or community groups. Designed with a realistic, deployment-ready web application aesthetic—prioritizing usability, clear tables, validation feedback, and robust visual hierarchy.

---

## 🚀 How to Run Locally

No complex dependencies or setup required:
1. Double-click **[`index.html`](file:///Users/wilsonraj/Fitness%20challenge%20tracker/index.html)** in Finder, or right-click `index.html` → **Open With** → **Google Chrome** / **Safari**.
2. Or drag and drop `index.html` into any open browser window.

---

## 🎯 Project Features & Architecture

### 1. 🧭 Clean Top Navigation
- **Navigation Links**:
  - `Dashboard`: Active group challenge spotlight, progress bar, days remaining, recent entries, and group standings.
  - `Challenges`: Full catalog of group challenges (Walking, Cycling, Exercise minutes).
  - `My Progress`: Daily progress submission form with validation feedback + cumulative progress line chart.
  - `Leaderboard`: Real-time group standings table (Aryan, Shristi, Ibrahim, Tanvi, Rahul, Kabir).
  - `Create Challenge`: Organizer-only form to configure new challenges.
- **Role Switcher**:
  - Toggle between **Participant (Shristi)** and **Organizer (Admin)** at any time from the top navigation bar.

### 2. 📊 Main Dashboard
- **Welcome Message**: Customized for the active participant (`Welcome back, Shristi!`).
- **Active Challenge Spotlight**:
  - **Challenge**: 30-Day Walking Challenge
  - **Target**: 100 km
  - **Current Progress**: 76 km (76% completed)
  - **Days Remaining**: 8 days remaining
  - **Current Rank**: #2
  - **Log Today's Progress** button for 1-click access to the progress form.
- **Recent Entries**: Shows verified submission history with timestamps.
- **Group Standings Snapshot**: Shows top 4 group members with the logged-in user highlighted.

### 3. 🛡️ Daily Progress Entry & Validation Rules
Participants log daily values under strict validation criteria:
- **Rule 1**: Date must be inside the challenge period (`startDate` to `endDate`).
- **Rule 2**: Progress value must be a positive number (> 0).
- **Rule 3**: Only one entry per participant per day is permitted.
- **Rule 4**: Participant must be an active challenge member.
- **Validation Alerts**: Displays clean, inline alerts explaining exactly what failed if any rule is broken, or a green confirmation when saved!

### 4. 📈 Progress Visualization (Cumulative Line Chart)
- Visualizes **User's Cumulative Progress (Solid Blue Line)** vs **Target Trajectory (Dashed Gray Line)**.
- X-axis: Dates (Sep 01, Sep 08, Sep 15, Sep 22, Sep 30)
- Y-axis: Progress in km
- Clean, responsive SVG chart with clear axis labels and legends.

### 5. 🏆 Realistic Group Leaderboard
- Real-time derived view sorted by cumulative progress and percentage of target achieved:
  - **1 — Aryan — 84 km — 112%**
  - **2 — Shristi — 76 km — 101%** *(subtly highlighted as current user)*
  - **3 — Ibrahim — 69 km — 92%**
  - **4 — Tanvi — 58 km — 77%**
  - **5 — Rahul — 52 km — 69%**
  - **6 — Kabir — 44 km — 59%**

### 6. ⚙️ Challenge Creation (Organizer Role)
- Genuine, functional application form with:
  - Challenge title
  - Challenge type dropdown (Walking, Cycling, Exercise minutes)
  - Target value
  - Unit of measurement (Steps, Kilometres, Minutes)
  - Start & End dates
  - Add/invite participant emails/names
  - Publish Challenge button
