**Project Technical Document**  for your volleyball tournament application, drawing on all four PRDs (User Accounts & Roles, Team & Registration, Tournament & Pickup Flow, and Frontend MVP UI). This should serve as a single reference for your team—covering key architecture decisions, data models, and actionable milestones.

---

# 1. Project Overview

**Goal**: Build a web-based platform enabling:
1. **Players** to register, create/join teams, and view bracket standings.
2. **Admins** to create/manage tournaments, track scores, and handle rosters.

**Key Features**:
- **Account System** with email/password (Supabase Auth).
- **Teams & Registration** that enforce roster limits (2–6 active players + 2 subs).
- **Tournament & Pickup** modes for single-day events or casual pickup sessions.
- **Bracket/Standings** that dynamically update as match results come in.
- **Role-Based UI**: Admins see controls for tournament management; players see registration and bracket views.

**Tech Stack**:
- **Frontend**: React.js, Tailwind CSS, ShadCN UI components.
- **Backend**: Supabase PostgreSQL with Supabase Auth & Storage (no file uploads in MVP).
- **APIs**: Supabase’s PostgREST endpoints + optional real-time channels for bracket updates.

---

# 2. High-Level Architecture

1. **Database**:  
   - Hosted on Supabase (PostgreSQL) with row-level security (RLS) enforcing role-based permissions.
   - Core tables:
     - **users** (managed by Supabase Auth).
     - **players** (extended profile data: name, skill level, etc.).
     - **teams** + **team_members** (or `team_players`).
     - **competitions** (tournaments, pickup sessions).
     - **matches** (bracket or pickup-game records, with scores).
     - **registrations** (optional: linking players to a competition if not using direct `team_members` relationships).

2. **Frontend**:
   - **React** + React Router for page-level routing.
   - **Supabase JS SDK** to interact with Auth, DB queries, and real-time updates.
   - **State Management**: Light usage of React Context or Zustand to store session and user info.

3. **Auth & Roles**:
   - Users sign up via email/password.  
   - By default, role = `player`.  
   - Admin privileges assigned manually via the Supabase dashboard or a small admin panel.  
   - **RLS** policies prevent players from modifying others’ data.

4. **Real-Time Features** (Optional):
   - Supabase Realtime can push bracket/score changes to all users.
   - Not required for the MVP, but easy to layer on top.

# 4. Major Functional Areas

## 4.1 User Accounts & Roles
- **Registration**: Email/password, plus name/skill on the `players` table.
- **Role Management**: A `role` column in `users`. By default `player`; admin can be toggled in the admin panel or Supabase UI.
- **Profile Editing**: A “My Profile” page to update name/skill.  

## 4.2 Team & Registration
- **Create Team**: A form that sets a name, links the captain, and sets them as “active.”
- **Join Team**: User sees a list of existing teams for that competition (if not locked) and can join if not at capacity.
- **Roster Limits**: 2–6 active, up to 2 subs. Checks at both front and back end.
- **Locking**: The Admin toggles or an auto-lock at a certain time. Once locked, no more additions unless Admin overrides.

## 4.3 Tournament & Pickup Flow
- **Tournament**: Single/double elim, or round robin. Automatic bracket generation or manual seeding.
- **Pickup**: “Create Pickup Session,” players check in, and you can randomly create teams or ephemeral matches.
- **Scoring**: Once a match is completed, Admin (or designated scorekeeper) enters the result. The bracket or standings update accordingly.

## 4.4 Frontend MVP UI
1. **Landing Page** (`/`):  
   - List of upcoming tournaments/pickup events.  
   - Prompts user to log in or register.
2. **Auth Pages** (`/login`, `/register`, `/forgot-password`):
   - Email/password forms with Supabase Auth integration.
3. **Dashboard** (`/dashboard`):
   - **Player View**: My Tournaments, My Teams, upcoming matches.  
   - **Admin View**: Manage Tournaments (create/edit), handle registrations, enter scores.
4. **Tournament Detail** (`/tournament/:id`):
   - Info about the event, roster listing, bracket/match updates.  
   - If user not registered and the event is open, show “Register” or “Join Team” prompts.
5. **Bracket & Standings**:
   - Possibly a child route under `tournament/:id/bracket` or a tab on the detail page.  
   - For single/double elim, show bracket layout. For round robin, show group standings.  
   - Admin-only controls for score input.

