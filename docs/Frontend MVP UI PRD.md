**Frontend MVP UI PRD**  
*Purpose: Define the minimal front-end pages and user flows for a volleyball tournament app built with React and the Supabase JS SDK. This PRD provides enough detail for an AI development tool to generate the core UI components and logic.*

---

## 1. Overview

- **Scope**: A lightweight, **web-based** user interface allowing **Players** to register for events and view brackets/standings, and **Admins** to create tournaments and record scores.
- **Core Requirements**:
  - **Role-Based Views**: Players see registration, bracket browsing, and personal data; Admins see additional controls for managing tournaments and updating scores.
  - **No Payment or Media Uploads**: Strictly tournaments, teams, registration, and scoring.

---

## 2. Goals & Objectives

1. **User-Friendly Flows**: Minimal friction for players to sign up, join teams, and see match results.  
2. **Real-Time Updates**: Scores and brackets refresh promptly (optionally using Supabase’s real-time features).  
3. **Responsive Design**: While not a full mobile app, it should be reasonably responsive so users can check on phones or tablets.  
4. **Admin Efficiency**: Simple dashboards where admins can create/edit tournaments, record match results, and handle bracket progression.

---

## 3. Technical Architecture

1. **Framework**: **React.js** with Tailwind CSS + ShadCN UI for styling.  
2. **Backend Integration**: **Supabase JS SDK** for database queries, authentication, and real-time updates.  
3. **Routing**: React Router (or your preferred routing) to handle pages like `/`, `/login`, `/dashboard`, `/tournament/:id`, etc.  
4. **State Management**:  
   - Minimal: store user session and tournament data in React Context or a simple library like Zustand.  
   - Real-time bracket updates from Supabase channels (optional).

---

## 4. Page-Level Descriptions

### 4.1 Landing Page
- **URL**: `/`  
- **Purpose**: Show a list of upcoming volleyball tournaments and prompt users to log in or register.  
- **Key Features**:
  1. **Tournament List**:  
     - Name, date, location, bracket format (e.g., single elimination).  
     - “View Details” button → leads to the Tournament Detail Page.  
  2. **Sign-Up / Login Prompts**: If user is not logged in, show “Register” and “Login” CTAs.

**AI Dev Tool Guidance**:  
- Generate a React component that fetches tournament data from Supabase (`competitions` or `tournaments` table) and displays them in a simple list.  
- Provide conditionally rendered buttons or links if user is logged in vs. logged out.

### 4.2 Auth Pages
- **URLs**:  
  - `/login` for existing user sign-in  
  - `/register` for new user registration  
  - `/forgot-password` for password reset
- **Key Features**:
  1. **Login Form**: Email/password → calls `supabase.auth.signIn()`.  
  2. **Registration Form**: Email/password, plus optional name/skill level → calls `supabase.auth.signUp()` then inserts profile data into `players` table.  
  3. **Password Reset**: Allows user to request a reset link via `supabase.auth.api.resetPasswordForEmail()` (or the v2 method in the new Supabase JS).

**AI Dev Tool Guidance**:  
- Auto-generate the forms for these pages, hooking into Supabase Auth.  
- Provide basic validations (e.g., strong password, matching confirm password).

### 4.3 Dashboard
- **URL**: `/dashboard`  
- **Purpose**: Provide a personalized home page after login, differing by role.

#### 4.3.1 Player View
- **Sections**:
  1. **My Teams**: Display any teams the user has joined.  
  2. **My Tournaments**: A list of tournaments the user is registered for; each item links to its detail page.  
  3. **Brackets / Standings**: Quick view of next matches if the user is on a participating team.

#### 4.3.2 Admin View
- **Sections**:
  1. **Tournament Management**:  
     - Button to **Create New Tournament** → a form for name, date, location, format.  
     - List of existing tournaments with “Edit” or “Delete” options.  
  2. **Score Updates**:  
     - If a tournament is in progress, show a quick list of matches needing score entry.  
  3. **Registration Overview**:  
     - Count of total teams/players signed up for each tournament.  
     - Links to roster/registration details.

**AI Dev Tool Guidance**:  
- Render different components for admin vs. player.  
- Possibly a single Dashboard component that checks user role and conditionally loads sub-components.

### 4.4 Tournament Detail Page
- **URL**: `/tournament/:id`  
- **Purpose**: Central hub for a specific tournament—registration, bracket display, match results, etc.

#### 4.4.1 Registration Section (Player)
- **Conditionally Shown**: If the user is not yet registered and the tournament is still open.  
- **Actions**:  
  - “Join as Team” → create or join existing team.  
  - “Join as Individual” → placed in free agent pool or auto-created team.  

#### 4.4.2 Tournament Info
- **Format**: Single/Double Elim, Round Robin, etc.  
- **Date/Time & Location**: Basic details.  
- **Roster/Teams**: List teams that have registered (with current rosters).

#### 4.4.3 Match Listing & Score Input (Admin Only)
- **Match Cards**: Each game with `team_home`, `team_away`, scheduled time, and status.  
- **Score Fields**: For completed matches, admin can enter final score. Submitting triggers bracket advancement or updates standings.

**AI Dev Tool Guidance**:  
- Generate a dynamic route that fetches a specific tournament’s data from Supabase.  
- Provide conditional UI for admin tasks (score entry) vs. player view (read-only bracket or registration buttons).

### 4.5 Bracket & Standings Page(s)
- **Integration**: This may be part of `/tournament/:id`, or a child route like `/tournament/:id/bracket`.
- **Purpose**: Visualize the tournament structure and current standings.
- **Features**:
  1. **Bracket View** (Single/Double Elimination): 
     - Tree or bracket layout that updates after each match result.  
     - Clickable match nodes to see details or record scores (admin).  
  2. **Round Robin / Pool Standings**: 
     - Table of teams with wins, losses, point differentials.  
     - Possibly a “Pool A / Pool B” tab if multiple groups exist.

**AI Dev Tool Guidance**:  
- Generate bracket layout components or integrate a standard bracket library.  
- Standings can be a simple table that calculates or retrieves aggregated stats.

---

## 5. Core User Flows

1. **Landing → Login → Dashboard**: A first-time user sees tournaments, logs in, and arrives at the player or admin dashboard.  
2. **Admin Creates Tournament**: Admin uses the dashboard to create a new event.  
3. **Player Registers**: Player goes to the tournament page, forms or joins a team, sees their name on the roster.  
4. **Tournament Progresses**: Admin updates match scores; bracket/standings refresh in real-time for players to see.  
5. **Tournament Concludes**: A final winner is displayed in the bracket or final standings.

---

## 6. Acceptance Criteria

1. **Role-Based Access**:  
   - Players do not see admin-only features (e.g., create tournament, score submission).  
   - Admin-only sections are well-protected from unauthorized access.  
2. **Basic Bracket Display**:  
   - Single/double elimination bracket is visible and updates after each match.  
3. **Signup & Registration**:  
   - 90%+ of users successfully navigate from signup to tournament registration without admin intervention.  
4. **Real-Time Score Updates** (Optional Enhancement):  
   - Once a match’s score is updated, watchers see bracket changes almost immediately.  
5. **No Payment or Media**:  
   - The UI does not contain any credit card or file upload prompts.

---

## 7. Out of Scope

- **Payment Processing**: No fees or transactions.  
- **Media Upload**: No player or match photo/video uploads.  
- **Notifications/Chat**: Push notifications or in-app messaging.  
- **Multi-Sport or Multi-Week Leagues**: Strictly single-day or short-term volleyball events.

---

## 8. Summary

This **Frontend MVP UI PRD** outlines the essential pages—**Landing**, **Auth**, **Dashboard**, **Tournament Detail**, **Brackets & Standings**—that let **Admins** create tournaments and track scores, while **Players** register teams and view their event progress. The combination of **React**, **Supabase JS SDK**, and a minimal role-based approach ensures quick development and a clear user experience. With this specification, an AI dev tool (or any dev team) can generate the bulk of the React components, Supabase integration hooks, and routing structure needed to launch a functional, visually coherent MVP.