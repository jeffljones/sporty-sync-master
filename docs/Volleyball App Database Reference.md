Volleyball App Database Reference
1. Overview

This schema supports a volleyball app with Players, Competitions (tournaments or pickup sessions), Teams (and memberships), and Matches. It also includes enumerations for skill levels, gender, and competition formats. We rely on Supabase Auth for user accounts (auth.users), mapping each user to a row in players.

Key Entities:

    players: Volleyball‐specific profile info (first/last name, skill level, gender).

    competitions: Events, such as single/double elimination tournaments or rotating‐pairs pickup sessions.

    teams: Each competition can have multiple teams.

    team_members: Many‐to‐many relationship linking players to teams.

    matches: Each match references two teams (or can be flexible if it’s a 1v1 scenario) and includes final scores + per‐match scoring rules.

2. Enumerations
2.1 skill_level_enum

CREATE TYPE skill_level_enum AS ENUM (
  'beginner',
  'intermediate',
  'advanced',
  'pro'
);

Represents the self‐declared or admin‐assigned skill level of a player.
2.2 competition_format_enum

CREATE TYPE competition_format_enum AS ENUM (
  'SINGLE_ELIM',
  'DOUBLE_ELIM',
  'POOL_PLAY',
  'ROTATING_PAIRS'
);

Indicates the format of a competition (single‐elimination, double‐elimination, round‐robin/pool, rotating pairs, etc.).
2.3 gender_enum

CREATE TYPE gender_enum AS ENUM (
  'male',
  'female',
  'non_binary',
  'unspecified'
);

Used in players.gender to capture a user’s self‐declared gender (for co‐ed constraints, etc.).
3. Table Definitions

Below are the public schema tables. The code examples assume you’re placing them in the default public schema in Supabase.
3.1 players

Stores volleyball‐specific info for each user. Ties to auth.users by user_id.

CREATE TABLE public.players (
  player_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id   UUID UNIQUE NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,

  first_name  TEXT,
  last_name   TEXT,
  skill_level skill_level_enum,
  gender      gender_enum,

  created_at  TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at  TIMESTAMP WITH TIME ZONE DEFAULT now()
);

Columns:

    player_id: Unique primary key for the player record.

    user_id: Foreign key to Supabase’s auth.users(id).

    first_name / last_name: Basic identification.

    skill_level: Player’s skill (beginner, advanced, etc.).

    gender: For co‐ed constraints.

    created_at, updated_at: Timestamps for record creation and last update.

3.2 competitions

Represents an event (tournament or pickup session).

CREATE TABLE public.competitions (
  competition_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT NOT NULL,
  format         competition_format_enum NOT NULL,
  start_date     DATE NOT NULL,
  location       TEXT,

  created_at     TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at     TIMESTAMP WITH TIME ZONE DEFAULT now()
);

Columns:

    competition_id: Primary key for the competition.

    name: E.g. “Summer Tournament 2025.”

    format: Single/double elim, pool play, rotating pairs.

    start_date: The event date (or start date).

    location: Venue or region.

    created_at, updated_at: Timestamps.

3.3 teams

Teams formed in a competition. Could be user‐created or admin‐created.

CREATE TABLE public.teams (
  team_id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  competition_id UUID NOT NULL REFERENCES public.competitions (competition_id),
  team_name      TEXT NOT NULL,

  created_at     TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at     TIMESTAMP WITH TIME ZONE DEFAULT now()
);

Columns:

    team_id: Primary key.

    competition_id: Which competition this team belongs to.

    team_name: Chosen by the captain or admin.

    created_at, updated_at: Timestamps.

3.4 team_members

A join table linking players to teams. Stores optional role information (active vs. sub).

CREATE TABLE public.team_members (
  team_id   UUID NOT NULL REFERENCES public.teams (team_id),
  player_id UUID NOT NULL REFERENCES public.players (player_id),
  role      TEXT NOT NULL DEFAULT 'active',

  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  PRIMARY KEY (team_id, player_id)
);

Columns:

    team_id: Foreign key to teams.team_id.

    player_id: Foreign key to players.player_id.

    role: For labeling “active” vs. “sub.”

    joined_at: Timestamp of when the player joined.

    PRIMARY KEY on (team_id, player_id) ensures uniqueness.

3.5 matches

Each match belongs to a competition and references two teams (home/away). We store final scores and per‐match scoring rules inline:

CREATE TABLE public.matches (
  match_id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  competition_id  UUID NOT NULL REFERENCES public.competitions (competition_id),

  team_home_id    UUID REFERENCES public.teams (team_id),
  team_away_id    UUID REFERENCES public.teams (team_id),
  home_score      INT,
  away_score      INT,

  status          TEXT NOT NULL DEFAULT 'scheduled',  -- 'scheduled', 'in_progress', 'completed'
  target_points   INT DEFAULT 25,                     -- e.g. 11,15,21,25
  must_win_by_two BOOLEAN DEFAULT TRUE,
  max_cap         INT,                                -- e.g. 30 or NULL if no cap

  created_at      TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at      TIMESTAMP WITH TIME ZONE DEFAULT now()
);

Columns:

    match_id: Primary key.

    competition_id: The competition this match is part of.

    team_home_id / team_away_id: References to teams.team_id.

    home_score / away_score: Final scores once the match completes.

    status: Tracks match progress.

    target_points: The base points needed to win (e.g. 25 for normal, 11 for short games).

    must_win_by_two: Whether a 2‐point lead is required to end the match.

    max_cap: If set, the maximum points either team can reach (e.g. 30).

    created_at, updated_at: Timestamps.

4. Relationships at a Glance

    players → references auth.users via players.user_id.

    competitions → stand‐alone table for events.

    teams → belongs to a competition (via teams.competition_id).

    team_members → many‐to‐many link between teams and players.

    matches → belongs to a competition (via matches.competition_id), references two teams.

A typical flow:

    players sign up in the app (creates row in players).

    admin creates a competition (with a format).

    teams are created inside that competition.

    team_members links players to teams.

    matches are created referencing the competition and the teams that will play.

5. Index Recommendations

To optimize common queries, we recommend adding indexes:

CREATE INDEX idx_competitions_format ON public.competitions (format);

CREATE INDEX idx_teams_competition_id ON public.teams (competition_id);

CREATE INDEX idx_team_members_player_id ON public.team_members (player_id);

CREATE INDEX idx_matches_competition_id ON public.matches (competition_id);

Use them as needed, especially if you frequently filter by these columns.
6. Row-Level Security (RLS) Overview

Supabase uses PostgreSQL Row-Level Security. By default, enabling RLS on a table requires you to define policies for any SELECT, INSERT, UPDATE, or DELETE operation.
6.1 Enabling RLS

After creating each table, you can do:

ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;

6.2 Example Policy for Players

Allow each user to select/update only their own player record:

-- SELECT policy
CREATE POLICY "players_select_own" 
ON public.players
FOR SELECT
USING ( auth.uid() = user_id );

-- UPDATE policy
CREATE POLICY "players_update_own"
ON public.players
FOR UPDATE
USING ( auth.uid() = user_id );

(Adjust accordingly for your needs, e.g. letting admins see all players, or letting any user read partial data.)
6.3 Example Policy for Teams

    Possibly any user can SELECT teams (public info).

    Only admins or a “captain” can insert/update.

    These are highly application‐dependent. RLS must be crafted to your exact logic.

7. Putting It All Together

Here’s a summarized SQL snippet if you want a single file approach (omitting RLS policies for brevity):

BEGIN;

-- Enums
CREATE TYPE skill_level_enum AS ENUM ('beginner','intermediate','advanced','pro');
CREATE TYPE competition_format_enum AS ENUM ('SINGLE_ELIM','DOUBLE_ELIM','POOL_PLAY','ROTATING_PAIRS');
CREATE TYPE gender_enum AS ENUM ('male','female','non_binary','unspecified');

-- Tables
CREATE TABLE public.players (
  player_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id   UUID UNIQUE NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  first_name  TEXT,
  last_name   TEXT,
  skill_level skill_level_enum,
  gender      gender_enum,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at  TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.competitions (
  competition_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT NOT NULL,
  format         competition_format_enum NOT NULL,
  start_date     DATE NOT NULL,
  location       TEXT,
  created_at     TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at     TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.teams (
  team_id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  competition_id UUID NOT NULL REFERENCES public.competitions (competition_id),
  team_name      TEXT NOT NULL,
  created_at     TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at     TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.team_members (
  team_id   UUID NOT NULL REFERENCES public.teams (team_id),
  player_id UUID NOT NULL REFERENCES public.players (player_id),
  role      TEXT NOT NULL DEFAULT 'active',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  PRIMARY KEY (team_id, player_id)
);

CREATE TABLE public.matches (
  match_id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  competition_id UUID NOT NULL REFERENCES public.competitions (competition_id),
  team_home_id   UUID REFERENCES public.teams (team_id),
  team_away_id   UUID REFERENCES public.teams (team_id),
  home_score     INT,
  away_score     INT,
  status         TEXT NOT NULL DEFAULT 'scheduled',
  target_points  INT DEFAULT 25,
  must_win_by_two BOOLEAN DEFAULT TRUE,
  max_cap        INT,
  created_at     TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at     TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;

COMMIT;

Finally, define your RLS policies and indexes as needed. That’s the entire schema reference an AI agent (or developer) needs to generate data models, build queries, or interact with your volleyball tournament database.