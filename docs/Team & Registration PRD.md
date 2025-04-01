**Team & Registration PRD**  
*Purpose: Provide deeper detail on how teams form, how rosters (2–6 players + up to 2 subs) are managed, and how players join a tournament—either individually or as a group.*

---

## 1. Overview

- **Scope**: Manage the creation and updating of teams for single-day volleyball events, ensuring rosters meet minimum/maximum size rules.
- **Primary Stakeholders**:
  1. **Players**: Self-register for a tournament, join a team, or create a new one.  
  2. **Admins/Organizers**: Override or rename teams, lock rosters before bracket generation, handle special cases.

---

## 2. Objectives

1. **Team Formation**: Simplify how a user creates or joins a team.  
2. **Roster Limits**: Enforce 2–6 active players plus up to 2 substitutions.  
3. **Admin Tools**: Allow manual editing of rosters, team info, or skill-level overrides.  
4. **Locking Teams**: Ensure rosters are finalized before bracket creation so matchups remain stable.  
5. **Optional Skill Matching**: Provide a mechanism (if enabled) to group free agents or balance teams by skill level.

---

## 3. Functional Requirements

### 3.1 Team Formation

- **Create Team**:
  1. **Team Name** (required): E.g., “Beach Bums” or “Spike Squad.”  
  2. **Captain** or **Creator**: The user who forms the team initially.  
  3. **Initial Roster**: Add self plus any invited members, up to the roster limit.

- **Join Existing Team**:
  1. **Team Lookup**: User sees a list of registered teams for that event (or enters a code/invite if you choose to implement it).  
  2. **Request to Join** or **Auto-Add** (if no approval workflow).  
  3. **Roster Update**: Database associates `player_id` with that team.

- **Individual Sign-Up** (No Team Yet):
  1. Player can sign up solo.  
  2. System or admin later places them on a team (optional skill-based auto-matching).  

**AI Dev Tool Guidance**:  
- Generate forms for “Create Team” and “Join Team,” storing team info in `teams` (with foreign key references in `team_members` or `team_players`).  
- Optionally add an “auto-match free agents by skill” routine that tries to group players of similar skill.

### 3.2 Roster Limits (2–6 Active + 2 Subs)

- **Team Composition**:
  1. **Minimum**: 2 players (for doubles or small squads).  
  2. **Maximum**: 6 active players (for standard indoor volleyball).  
  3. **Additional Subs**: Up to 2 extra players allowed for substitution.  

- **Enforcement**:
  - Frontend: Hide or disable “Add Member” if the team is at capacity.  
  - Backend: Validate any new addition to ensure `team_size <= 6 + 2`.  

- **Roster Visualization**:
  - Show “Active Roster” vs. “Substitutes” (optional).  
  - Let the team captain or admin reassign players between “active” and “sub” if needed before lock.

**AI Dev Tool Guidance**:  
- Generate validations on the client side and server side.  
- Possibly store two numeric fields: `active_player_count`, `sub_count`, or just store all members in `team_members` with a role = `active` or `sub`.

### 3.3 Admin Tools

- **Roster Overrides**:
  - **Add/Remove Players** forcibly, even if the team is at capacity.  
  - Move or rename players for special circumstances (typos, last-minute changes).  

- **Rename Teams**:
  - Admin can rename a team if it contains profanity or a conflict.

- **Skill-Level Adjustments**:
  - Admin might override self-assigned skill levels if they see a mismatch.  
  - This can help in forming balanced “free agent” teams.

**AI Dev Tool Guidance**:  
- Create an admin-only screen (or use an internal tool like Appsmith) to view all teams, rosters, and skill levels.  
- Expose simple “add player,” “remove player,” and “rename team” functions.

### 3.4 Registration Deadlines & Locking

- **Lock Time**:
  1. **Auto-Lock** at a specific time before the tournament starts (e.g., 24 hours before).  
  2. **Manual Lock**: Admin presses “Lock Teams” in the UI.

- **Effect of Lock**:
  - No more roster changes allowed by players.  
  - Admin might still have emergency override capability.  
  - Bracket generation becomes available or is triggered automatically once locked.

- **UX Considerations**:
  - Show a countdown or “registrations closing” message.  
  - Possibly send notifications that rosters will soon lock.

**AI Dev Tool Guidance**:  
- Implement a status column in the tournament or event table, e.g., `status = 'open'` → `'locked'` → `'in_progress'` → `'completed'`.  
- Show or hide “Add Player” or “Create Team” buttons based on this status.

---

## 4. Technical Details

1. **Database Schema**  
   - **teams**:
     - `team_id (UUID)`  
     - `team_name (VARCHAR)`  
     - `competition_id (FK to tournaments)`  
     - `created_at`, `updated_at`  
   - **team_members** (or `team_players`):
     - `team_id (FK to teams)`  
     - `player_id (FK to players)`  
     - Possibly a `role` column: “active” or “sub.”  
     - `joined_at`  
   - Optional: a `locked_at` timestamp in `competitions` to mark rosters locked.

2. **Registration Flow**  
   - `registrations` table can link `player_id` to `competition_id` if you prefer a separate record. Or you can rely on `team_members` references for team-based sign-ups.  

3. **Frontend Components**  
   - “Team Creation” form (with name, optional skill level synergy).  
   - “Join Team” search or invite code.  
   - Roster management UI (list of players, add/remove, set active/sub).  
   - Lock indicator once the tournament is close to starting.

4. **Skill Matching (Optional)**  
   - If implementing an auto-match feature:
     - Query free agents from `players` who have no `team_id`.  
     - Sort by skill level, group them in 2–6 sized squads.  
   - Admin can manually finalize these teams.

---

## 5. User Flows

### 5.1 Create or Join a Team

1. **User** selects a tournament from the list.  
2. **Option A**: “Create Team” → enters team name → automatically added as the first active player.  
3. **Option B**: “Join Team” → sees existing teams with capacity → taps “Join.”  
4. **Result**: Database updates `team_members` accordingly.

### 5.2 Move or Remove Players (Captain or Admin)

1. **Captain/Admin** opens the team roster page.  
2. **Selects** a player to “Move to sub” or “Remove from team.”  
3. **System** updates the appropriate columns (e.g., `role = 'sub'` or remove record from `team_members`).  
4. **Frontend** refreshes to show the new roster arrangement.

### 5.3 Lock Teams

1. **Admin** triggers “Lock Rosters,” or system auto-locks at a certain time.  
2. **UI** updates to remove “Add/Join” team options.  
3. **Bracket** can now be seeded and generated.

### 5.4 Start Tournament

1. With rosters locked, the bracket is generated.  
2. Teams remain unchanged throughout the event unless admin manually intervenes.  

---

## 6. Acceptance Criteria

1. **Team Formation**: Players can form or join teams with minimal friction.  
2. **Roster Limit Enforcement**: The system prevents more than 6 active + 2 subs unless admin overrides.  
3. **Lock Mechanism**: Once locked, no user can add or remove themselves, preserving bracket integrity.  
4. **Admin Override**: Admin tools exist to handle exceptional roster changes post-lock.  
5. **Optional Skill Matching**: If enabled, the system can group free agents by skill level.  

---

## 7. Future Enhancements (Out of Scope)

- **Invite Codes** or “Team Links” to send to prospective teammates.  
- **In-App Messaging**: Chat between team members.  
- **Detailed Stats**: Tracking each player’s points, kills, assists, etc.  
- **Payment Integration**: For paid registration, not applicable here.  

---

## 8. Summary

This **Team & Registration PRD** outlines a straightforward mechanism for **team creation**, **roster management** (2–6 active + 2 subs), and **registration deadlines** to lock in rosters before a single-day volleyball tournament begins. With these guidelines, an AI development tool can auto-generate the bulk of the code for database schemas, UI components (e.g., “Create Team,” “Join Team,” “Lock Rosters”), and the essential validation logic ensuring rosters remain consistent and stable for bracket generation.