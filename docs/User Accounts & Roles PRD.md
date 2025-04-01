**User Accounts & Roles PRD**  
*Purpose: Define how users register, log in, and manage their profiles using Supabase Auth. This PRD is sufficiently detailed so that an AI-assisted tool can generate the majority of the code.*

---

## 1. Overview

- **Scope**: Create a user account system with two roles—Admin and Player—using Supabase Auth for registration, login, and secure session management.
- **Primary Database Tables**:  
  1. **users** (provided by Supabase Auth)  
  2. **players** (stores additional volleyball-specific profile data such as skill level)

**Note**: No payment or advanced role features are required in this version.

---

## 2. Objectives

1. **User Registration**: Allow new users to sign up with email/password.  
2. **Authentication**: Provide secure login, logout, and password reset flows.  
3. **Roles & Permissions**:  
   - **Admin** (organizer) can create and manage tournaments, bracket settings, and scoring.  
   - **Player** (participant) can self-register for tournaments, view schedules, and track personal stats.  
4. **Minimal Profile Data**: Only store essential details (name, optional skill level).  
5. **No Payment Integration**: Keep the system free to use with no billing or payment info.

---

## 3. Functional Requirements

### 3.1 Registration & Login (Supabase Auth)

- **Registration Flow**:  
  - Collect **email**, **password**, **first name**, **last name** (optional but recommended), and **skill level** (optional).  
  - On successful registration, create a row in the **users** (Supabase Auth) table.  
  - Also insert a corresponding row into **players** table with the user’s UUID from `users.id`.

- **Login Flow**:  
  - Users provide **email** and **password**.  
  - On successful authentication, store session tokens (handled by Supabase) for future requests.  

- **Password Reset Flow**:  
  - Initiated via “Forgot Password” link.  
  - Supabase handles sending password reset emails (configurable in Supabase dashboard).  

**AI Dev Tool Guidance**:  
- Generate React components for registration and login forms.  
- Leverage Supabase JS SDK methods like `signUp()`, `signIn()`, and `resetPasswordForEmail()`.

### 3.2 Roles & Permissions

- **Role Definitions**:  
  - **Admin**:  
    - Can create/edit tournaments, manage brackets, update match scores, etc.  
  - **Player**:  
    - Can join tournaments, view brackets, and manage their own profile only.

- **Implementation**:  
  - A `role` column in the **users** table or an equivalent attribute returned by Supabase.  
  - By default, new registrants have a `role = 'player'`.  
  - Admin role can be granted manually via an admin interface or directly in the Supabase dashboard.

- **Access Control**:  
  - Frontend: Show/hide admin-only UI (e.g., “Create Tournament” button) based on user role.  
  - Backend (RLS Policies or API filters):  
    - Ensure only admins can write to certain endpoints (e.g., bracket creation).  
    - Players can only modify their own records in **players** or tournament registration data.

**AI Dev Tool Guidance**:  
- Generate a simple admin guard or higher-order component (e.g., `<RequireAdmin />`) that checks the user’s role before granting access to certain routes or components.  
- Set up read/write rules in Supabase’s Row-Level Security (RLS) or confirm role-based checks if using direct PostgREST.

### 3.3 Player Profiles

- **players** Table Schema (Minimal Fields):  
  1. **id** (UUID, primary key, defaults to `uuid_generate_v4()`)  
  2. **user_id** (FK to `users.id`)  
  3. **first_name** / **last_name** (optional columns if not in `users`)  
  4. **skill_level** (ENUM: `'beginner' | 'intermediate' | 'advanced' | 'pro' | null`)  
  5. **created_at** / **updated_at** (timestamps)  

- **Profile Editing**:  
  - Players can update their name and skill level at any time.  
  - **No Photo Upload** or advanced metadata.  
  - Admin role can override or edit skill levels (optional).

**AI Dev Tool Guidance**:  
- Generate code that, upon user registration, inserts a matching record in **players** to capture the user’s additional data.  
- Create a “Profile” page or modal that displays `first_name`, `last_name`, and `skill_level`, with a save function calling Supabase for updates.

---

## 4. Technical Details

1. **Supabase Auth**  
   - **Email/Password**: Primary auth method.  
   - Ensure relevant redirects (e.g., post-login → user dashboard).

2. **RLS (Row-Level Security)**  
   - At minimum, require that a user can only update their own **players** record.  
   - Admin role can read/update all.

3. **Frontend Integration**  
   - **Framework**: React (with Supabase JS SDK).  
   - **UI**: Tailwind CSS + ShadCN UI recommended.  
   - **State Management**: Minimal—React Context or Zustand to store user session data.

4. **Deployment**  
   - **Database**: Supabase PostgreSQL instance (hosted).  
   - **Frontend**: Netlify, Vercel, or similar.  
   - **Environment Variables**: Store Supabase keys securely in deployment platform.

---

## 5. User Flows

### 5.1 Registration
1. **User** clicks “Sign Up.”  
2. **Form** asks for email, password, confirm password, (optionally) name, skill level.  
3. **Submit** triggers Supabase `signUp()` with email/password.  
4. **On Success**:  
   1. Insert row into **players** table linked via `user_id`.  
   2. Redirect to user dashboard or “Profile Setup” page.

### 5.2 Login
1. **User** clicks “Login.”  
2. **Form** asks for email, password.  
3. **Submit** triggers Supabase `signIn()` method.  
4. **On Success**: Store session tokens, redirect to user dashboard or homepage.

### 5.3 Password Reset
1. **User** clicks “Forgot Password.”  
2. **Form** collects email.  
3. **System** sends a reset link via Supabase.  
4. **User** clicks link, enters new password, system updates credentials.

### 5.4 Profile Management
1. **User** navigates to “My Profile.”  
2. **Form** displays first name, last name, skill level (if stored in **players**).  
3. **User** edits fields, clicks “Save.”  
4. **System** updates the **players** record in the database.

### 5.5 Admin Role Upgrade
1. **Current Admin** or root user logs into Supabase or an admin panel.  
2. **Search** for user’s email in the `users` table.  
3. **Change** `role` from `'player'` to `'admin'`.  
4. Next time user logs in, the frontend sees `role = 'admin'` and grants admin privileges.

---

## 6. Acceptance Criteria

1. **Registration**: 95% of new users can create accounts and be automatically assigned `player` role.  
2. **Profile**: Users can view/edit their info from a single “Profile” page.  
3. **Roles**: Admin sees organizer tools (e.g., “Create Tournament” button) that regular players do not.  
4. **Security**: RLS ensures players can only modify their own records. Admins can modify any user’s data if necessary.

---

## 7. Future Considerations (Out of Scope for MVP)

- **Social Logins** (Google, GitHub, etc.): Could replace or supplement email/password.  
- **Role Management UI**: Instead of changing roles in Supabase directly, build an internal admin panel.  
- **Additional Profile Fields**: Phone number, emergency contact, advanced skill metrics, etc.  
- **Profile Pictures or Media**: No images or file uploads in this MVP.

---

## 8. Summary

This **User Accounts & Roles** PRD ensures a minimal, secure, and flexible authentication and authorization system for the volleyball tournament app. Leveraging **Supabase Auth** for email/password logins, and a simple `players` table for extended profile data, we maintain a straightforward path for **players** to sign up and for **admins** to manage tournaments. This PRD is sufficiently detailed for an AI code generator to handle everything from setting up the tables to creating basic React forms and role-based routing.