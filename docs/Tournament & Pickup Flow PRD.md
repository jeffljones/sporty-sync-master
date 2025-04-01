**Tournament & Pickup Flow PRD**  
*Purpose: Define how single-day (or short) volleyball events are created, managed, and concluded, supporting not only traditional tournament formats (e.g., single/double elimination) but also **one-off pickup games** and random group splits.*

---

## 1. Overview

- **Scope**: Provide a system for:
  1. **Formal Tournaments** (single- or double-elimination brackets, round robin, etc.).  
  2. **One-Off Pickup Games** or quick sessions where a group of players is randomly split into teams or into informal mini-pools.  
- **Target Users**:
  - **Admins/Organizers** who create and manage events (tournaments or pickup sessions).  
  - **Players** who can register individually or with a team, or simply show up for an ad hoc pickup game.

---

## 2. Objectives

1. **Tournament Creation**: Let admins define event details (name, date, location, format).  
2. **Pickup/One-Off Sessions**: Ability to take a list of players who “checked in” and randomly assign them to teams for a single match or short series of games.  
3. **Flexible Formats**:  
   - Single/Double Elimination  
   - Round Robin / Pool Play  
   - Ladder / Pyramid Challenges  
   - Dynamic (King of the Court, Rotating Pairs)  
   - Random Split for pickup (no bracket, quick match scheduling)  
4. **Team & Player Registration**: For tournaments, players can join in 2–6 person teams plus subs. For pickups, players simply sign in to the session.  
5. **Match Scheduling & Scoring**: Whether it’s a full bracket or just a one-off game, the system can track match times, record results, and (optionally) update standings.  
6. **Standings & Basic Stats**: Round robin or pool-based tournaments track wins/losses, points for/against, etc. Pickup sessions can optionally track points or wins on a per-player basis.  
7. **No Multi-Week Leagues**: The scope is single-day or short, informal events—no weekly scheduling.

---

## 3. Functional Requirements

### 3.1 Tournament Creation

- **Fields**:
  - **Name** (e.g., “Summer Volleyball Bash”)  
  - **Date/Time** or start date  
  - **Location** (venue name or general area)  
  - **Format** (single elim, double elim, round robin, etc.)  
- **Additional Options**:
  - Max teams/players  
  - Specific bracket/scoring rules (e.g., rally scoring)  
  - Admin can edit details anytime before the event starts

**AI Dev Tool Guidance**:  
- Generate a “Create Tournament” form that records these fields in a `competitions` or `tournaments` table.  
- If your schema uses `competition_type` or `format`, store the chosen bracket structure there.

### 3.2 Pickup & One-Off Session Creation

- **Pickup Session Fields**:
  - **Session Name** (e.g., “Wednesday Night Pickup”)  
  - **Session Time** (start time, approximate end time)  
  - **Max Players** (optional cap)  
- **Random Team Assignment**:
  - Admin can press a button to randomly split all “checked-in” players into teams of 2–6.  
  - Alternatively, players can self-select or shuffle after each match.  
- **Game Management**:
  - Option to create multiple quick matches for the night (e.g., “Game 1,” “Game 2,” etc.).  
  - Track who played in each game, final scores, and (optionally) individual points.

**AI Dev Tool Guidance**:  
- Provide a “Create Pickup Session” form that writes to a `pickup_sessions` table or reuses `competitions` with a `type = 'pickup'`.  
- Generate a function to randomly allocate players to teams, then create a single match record (or multiple) in a `matches` table.

### 3.3 Team / Player Registration

- **Tournament Registration**:
  1. **Individual** or **Team** signups (2–6 active players plus optional subs).  
  2. Data stored in `registrations` or directly into `teams` + `team_members`.  
- **Pickup Check-In**:
  1. Player arrives, “checks in” to the pickup session.  
  2. System puts them on a “waiting list” until teams are generated or a new game starts.

**Admin Overrides**:  
- Manually move players between teams or remove them if they leave early.

**AI Dev Tool Guidance**:  
- Generate pages for “Register for Tournament” and “Check In for Pickup.”  
- Insert or update relevant table rows (`registrations`, `pickup_sessions`, `pickup_games`, etc.).

### 3.4 Seeding & Bracket Generation (Tournaments)

- **Automatic Seeding**:
  - Based on registration order, random, or skill level.  
- **Manual Overrides**:
  - Admin can reorder seeds in a UI or choose specific first-round matchups.  
- **Bracket Storage**:
  - `matches` table with `team_home`, `team_away`, `status`, `scores`.  
  - For double elimination, track “upper” and “lower” bracket identifiers.

**AI Dev Tool Guidance**:  
- Provide bracket-creation logic that populates matches.  
- Let admins reorder seeds before finalizing.

### 3.5 Scheduling & Scoring

- **Tournaments**:
  1. **Match Times** (optional).  
  2. **Sequential Flow**: Next round generated after previous round completes.  
  3. **Scoring**: Admin or designated scorer enters final result (e.g., 2–1 in sets).
- **Pickup Games**:
  1. May not require explicit scheduling.  
  2. Score entry is minimal—once a game ends, admin or players can record who won, final points, or sets.

**AI Dev Tool Guidance**:  
- Separate bracket-based scheduling from the simpler pickup approach.  
- Generate forms or modals for match result updates.

### 3.6 Standings & Tracking

- **Tournament Standings**:
  - Round Robin / Pool: track wins, losses, points for/against, differential.  
  - Ladder / Pyramid: track a ranking order; wins let teams move up.  
- **Pickup Games**:
  - Optionally track each player’s total wins, points, or personal stats.  
  - Keep a scoreboard for the session or just record a single “team vs. team” final.

**AI Dev Tool Guidance**:  
- Provide a “Standings” or “Leaderboard” view for tournaments, referencing a `standings` table or computed results.  
- For pickup, store minimal data in `pickup_player_scores` or a similar table if needed.

### 3.7 Dynamic Formats

- **King of the Court**:
  - Winners stay on top court; challengers rotate in.  
  - Keep a record of “current king” and the queue of challengers.  
- **Rotating Pairs**:
  - Each round, reshuffle participants.  
  - Track individual wins/losses or approximate ranking.

**AI Dev Tool Guidance**:  
- Implement a custom function to reorganize or shuffle players/teams each round.  
- Provide a UI for the admin to finalize next-round matchups if desired.

---

## 4. Technical Details

1. **Database**  
   - **Tournaments**: `competitions` table (columns for format, name, date).  
   - **Pickup Sessions**: A separate table (`pickup_sessions`) or reuse `competitions` with a `type = 'pickup'`.  
   - **Teams & Registrations**: Same logic for formal tournaments.  
   - **Matches**: For both tournaments and pickup games.  
2. **API**  
   - Supabase PostgREST for bracket generation, or a Node microservice for more complex logic.  
3. **Frontend**  
   - **React** with **Supabase JS SDK**.  
   - Pages for “Create Event,” “Register/Check In,” “Bracket/Score,” “Pickup Manager.”  
4. **Real-Time Updates**  
   - Optionally use Supabase Realtime to broadcast score or bracket changes.  
5. **RLS & Security**  
   - Restrict writes to only admins or “scorekeepers” for official matches.  
   - Players can see public standings or their own stats.

---

## 5. User Flows

### 5.1 Admin Creates Event
1. **Admin** chooses “Create Tournament” or “Create Pickup Session.”  
2. **System** stores the event in `competitions` or `pickup_sessions`.  
3. **Admin** sets capacity, format, date/time.

### 5.2 Player Registration / Pickup Check-In
1. **Tournament**: Player forms or joins a team.  
2. **Pickup**: Player just “checks in,” no formal team needed unless random teams are formed.  
3. **System** updates registration or check-in records.

### 5.3 Generating Matches
- **Tournament**:  
  1. Admin hits “Generate Bracket.”  
  2. System seeds teams into matches in `matches` table.  
- **Pickup**:  
  1. Admin/Organizer clicks “Generate Teams” for all checked-in players.  
  2. Creates 1 or more matches with random or skill-based assignment.

### 5.4 Playing & Scoring
1. Teams (or individuals) play the match.  
2. **Admin** (or assigned user) enters final result in a score input form.  
3. Bracket or scoreboard updates.

### 5.5 Dynamic / Informal Pool
- **One-off**: If players want to re-shuffle, they check a box or admin triggers “Shuffle Teams,” generating new match groupings.  
- **Pool**: Keep track of each mini-match if you want a casual “pool” leaderboard.

### 5.6 Completion
1. **Tournament**: After final match, champion declared.  
2. **Pickup**: Session ends at a certain time or admin manually closes it.  
3. **Standings**: Optionally saved or cleared for next session.

---

## 6. Acceptance Criteria

1. **Tournament & Pickup Support**: The system accommodates both bracket-based events and casual, random-split sessions.  
2. **Easy Registration**: Players can sign up for a formal tournament or just check in for a pickup game.  
3. **Scoring**: Real-time or near-real-time updates for both formal bracket matches and one-off pickup games.  
4. **Random Team Generation**: Large group can be quickly divided into multiple smaller games with minimal admin overhead.  
5. **No Multi-Week Scheduling**: All events conclude the same day (or within a short timeframe).

---

## 7. Future Enhancements (Out of Scope)

- **Multi-Week Leagues**: Weekly recurring matchups, scheduled playoffs, etc.  
- **Payment Processing**: Paid tournaments or integrated e-commerce.  
- **Advanced Analytics**: Detailed player performance tracking across sessions.  
- **Messaging / Chat**: In-app communication between players/admins.  

---

## 8. Summary

This **Tournament & Pickup Flow PRD** outlines how the app handles **both structured, bracket-based tournaments** and **casual, one-off pickup sessions** where players can be randomly split into multiple teams or mini-pools. Admins can create different event types, manage rosters or check-ins, and quickly record match results. With this blueprint, an AI-driven dev tool can auto-generate most of the **database schemas**, **front-end pages**, and **logic** for real-time scoring and bracket/pickup game updates.