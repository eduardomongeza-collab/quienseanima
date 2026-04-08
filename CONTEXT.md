# Quien Se Anima - Project Context

## Overview

**Quien Se Anima** is a private, mobile-first web app for a friend group that gamifies weekend adventures in NYC. Each week, a random side quest is drawn and announced. Players opt in, complete the quest over the weekend, submit photo proof, and earn points approved by the admin. The aesthetic is inspired by 2000s sitcoms (Friends, How I Met Your Mother) with warm purple/amber/orange tones.

**Live URL:** https://quienseanima.vercel.app  
**GitHub Repo:** https://github.com/eduardomongeza-collab/quienseanima  
**Domain (planned):** quienseanima.com

---

## Product Specs (Agreed Upon)

### Users & Access
- **Initial players:** 4, expandable up to 10
- **Login:** First Name + Last Name + self-set password (no email)
- **Admin:** Single admin (Eduardo) controls quest approval, player management, points
- **New players:** Can be invited; admin adds them to the system

### Quest System
- **Quest source:** Curated list (not AI-generated live) stored in database
- **Quest submission:** Any player can propose quests; admin approves/edits before adding to pool
- **Quest visibility:** Completed quests visible to all; upcoming quests only visible to admin
- **Quest frequency:** One quest per weekend, can be accepted by any/all players
- **Quest repetition:** Each quest appears only once per season; if not completed, goes to "expired" pile for the season

### Weekly Cycle (Eastern Time)
| Day/Time | Event |
|----------|-------|
| Thursday 7 PM | Admin sees randomly selected quest, can approve/reject/edit |
| Thursday 8 PM | Quest announced (admin shares to WhatsApp manually via generated message) |
| Friday 8 PM | Opt-in deadline |
| Friday 8 PM - Sunday 6 PM | Quest completion window |
| Sunday 6 PM | Submission deadline; auto-generate winner announcement for WhatsApp |

### Quest States
- **Active:** Available in pool for random draw
- **Selected:** This weekend's quest
- **Completed:** Done with photos and points awarded
- **Expired:** Drawn but not completed; blocked for rest of season unless admin restores

### Scoring & Points
- **Base points:** Easy (10), Medium (25), Hard (50)
- **Multiplayer:** All participants get points; admin inputs final split (negotiable among players)
- **Double points on:** Federal holidays + new player's first quest
- **Verification:** Admin approval required; players must submit photo proof
- **Leaderboard display:** Only players with >0 points shown

### Seasons
- 4 seasons per year aligned to calendar:
  - Spring: Mar 1 - May 31
  - Summer: Jun 1 - Aug 31
  - Fall: Sep 1 - Nov 30
  - Winter: Dec 1 - Feb 28/29
- Seasonal leaderboard resets each season
- All-time stats tracked separately
- Rewards for season winner / punishment for last place (TBD)

### WhatsApp Integration
- **Approach:** Manual copy-paste (no API)
- App generates formatted message with quest details + link
- Admin copies and shares to WhatsApp group
- Weekend winner announcement also auto-generated for sharing

### Visual Direction
- **Aesthetic:** 2000s sitcom (Friends/HIMYM era)
- **Color palette:** Warm tones - purples, ambers, oranges, cream backgrounds
- **Quest cards:** "Episode style" with title format "El finde que... [quest name in Spanish]"
- **Mobile-first:** Bottom navigation, large tap targets
- **Language:** UI in English, quest content in Spanish

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16 (React 19) with App Router |
| Styling | Tailwind CSS v4 |
| Backend/DB | Supabase (planned - currently using mock data) |
| Hosting | Vercel (free tier) |
| Auth | Custom (localStorage for prototype; Supabase Auth for production) |

---

## Current State (Phase 1 Complete)

### What's Built
- [x] Landing page with sitcom aesthetic
- [x] Login page (First Name + Last Name + Password)
- [x] Dashboard with current weekend quest display
- [x] Quest card component with opt-in/decline buttons
- [x] Leaderboard page (Seasonal + All-Time tabs)
- [x] Quest Library page (completed visible to all, upcoming admin-only)
- [x] Quest submission page for players
- [x] Admin panel with:
  - Thursday preview/approve/reroll flow
  - Quest editing before sending
  - Pending completions review (mock)
  - Quest submissions review (mock)
  - Player management (mock)
  - Manual point adjustment (mock)
- [x] Mobile-responsive bottom navigation
- [x] WhatsApp message generator for admin
- [x] 20 seeded quests in Spanish with varied difficulty/modes

### What's Mock/Prototype Only
- Authentication (uses localStorage, not real auth)
- Database (uses mock data in `/src/lib/mock-data.ts`)
- Photo upload (UI only, doesn't actually upload)
- All admin actions (UI only, no persistence)
- Point calculations and leaderboard updates

---

## Database Schema (Designed, Not Implemented)

```
players
  - id, name, nickname, avatar_url, password_hash
  - is_admin, first_quest_completed, created_at

seasons
  - id, name, start_date, end_date, is_active

quests
  - id, title_es, instructions_es, difficulty, base_points
  - mode (single/multiplayer), suggested_players, default_point_split
  - status, season_id, created_by, created_at

quest_selections (weekly quest assignments)
  - id, quest_id, season_id, selected_at
  - opt_in_deadline, completion_deadline, status

quest_participations
  - id, quest_selection_id, player_id
  - opted_in, opted_in_at, completed
  - points_awarded, approved_by_admin, approved_at

photos
  - id, participation_id, url, uploaded_at

quest_submissions (player-submitted quest ideas)
  - id, submitted_by, title_es, instructions_es
  - difficulty, mode, status, admin_notes, created_at
```

---

## File Structure

```
quienseanima/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── login/page.tsx        # Login
│   │   ├── dashboard/
│   │   │   ├── page.tsx          # Current quest + opt-in
│   │   │   ├── leaderboard/page.tsx
│   │   │   ├── quests/page.tsx   # Quest library
│   │   │   └── submit/page.tsx   # Submit quest idea
│   │   ├── admin/page.tsx        # Admin panel (all tabs)
│   │   ├── layout.tsx            # Root layout with fonts
│   │   └── globals.css           # Sitcom-style CSS
│   ├── components/
│   │   ├── Header.tsx            # Top navigation
│   │   ├── BottomNav.tsx         # Mobile bottom tabs
│   │   ├── QuestCard.tsx         # Quest display card
│   │   └── LeaderboardTable.tsx  # Ranked player list
│   ├── lib/
│   │   ├── mock-data.ts          # All mock data (players, quests, etc.)
│   │   └── supabase.ts           # Supabase client (placeholder)
│   └── types/
│       └── index.ts              # TypeScript types
├── package.json
├── vercel.json
└── tsconfig.json
```

---

## Key Next Steps (Phase 2+)

### Phase 2: Real Backend
1. Set up Supabase project
2. Create database tables per schema
3. Implement real authentication (replace localStorage)
4. Connect quest display to real data
5. Implement opt-in/opt-out with database persistence
6. Photo upload to Supabase Storage

### Phase 3: Full Admin Functionality
1. Thursday preview with real random quest selection
2. Quest approval/rejection with database updates
3. Completion approval with photo review
4. Point awarding and multiplayer split input
5. Player management (add/remove)

### Phase 4: Polish & Launch
1. Quest submission workflow (player submit → admin review → add to pool)
2. Double points logic (holidays + new players)
3. Season recap feature (deferred)
4. Domain setup (quienseanima.com)
5. Mobile responsiveness polish

### Deferred Features (V2+)
- Season recap slideshow
- Google Drive photo backup
- Badges/titles/achievements
- Rewards/punishments for season winners/losers
- WhatsApp Business API integration

---

## Testing the Prototype

**Admin view:** Log in as "Juan Martinez" (any password)  
**Player view:** Log in as any other name (e.g., "Maria Garcia")

### Pages to Test
- `/` - Landing page
- `/login` - Login
- `/dashboard` - Current quest with opt-in
- `/dashboard/leaderboard` - Rankings
- `/dashboard/quests` - Quest library
- `/dashboard/submit` - Submit quest idea
- `/admin` - Admin panel (only visible to Juan Martinez)

---

## Design Decisions & Rationale

1. **Manual WhatsApp sharing** over API: Zero complexity, free, works immediately
2. **Curated quest list** over live AI generation: More reliable quality, admin control, no API costs
3. **Admin approval for completions**: Ensures photo proof is real, allows point negotiation for multiplayer
4. **Spanish quest titles, English UI**: Matches the friend group's Latin American identity while keeping navigation accessible
5. **Seasonal reset with all-time tracking**: Creates competition cycles while preserving legacy

---

## Budget

- **Vercel:** Free tier (sufficient for ~10 users)
- **Supabase:** Free tier (500MB database, 1GB storage)
- **Domain:** ~$12/year (quienseanima.com)
- **Total estimated:** $0-10/month

---

## Questions Still Open

1. What are the season winner rewards / loser punishments?
2. Should there be mid-season mechanics (weekly mini-challenges)?
3. Any additional quest categories or themes to add?
4. Profile customization beyond nickname + avatar?
