# Habit Tracker

A mobile-first Habit Tracker app with local email/password authentication, daily habit CRUD, completion toggles, current streaks, and a basic offline-capable app shell.

## Setup

```bash
npm install
```

## Run

```bash
npm run dev
npm run build
npm run start
```

## Tests

```bash
npm run test:unit
npm run test:integration
npm run test:e2e
npm run test
```



## Local persistence structure

The app stores deterministic state in `localStorage` only:

- `habit-tracker-users`: array of `{ id, email, password, createdAt }`
- `habit-tracker-session`: `null` or `{ userId, email }`
- `habit-tracker-habits`: array of `{ id, userId, name, description, frequency, createdAt, completions }`

Habit completions are unique `YYYY-MM-DD` calendar dates. Habits are filtered by the logged-in user's `userId`.

## PWA support

`public/manifest.json` defines the installable app metadata and icons. `public/sw.js` caches the app shell routes and serves cached responses when offline after the app has loaded once. The service worker is registered from the root client component outside the preview host.

## Trade-offs and limitations

Authentication is intentionally local and deterministic for this stage; passwords are stored in localStorage and are not secure for production. Persistence is device/browser-local and does not sync across devices. Only daily habit frequency is implemented.

## Test file map

- `tests/unit/slug.test.ts`: verifies habit slug normalization.
- `tests/unit/validators.test.ts`: verifies habit name validation messages and normalization.
- `tests/unit/streaks.test.ts`: verifies current streak calculation, duplicates, and missing-day behavior.
- `tests/unit/habits.test.ts`: verifies immutable completion toggling and duplicate prevention.
- `tests/integration/auth-flow.test.tsx`: verifies signup, duplicate signup, login, and invalid login behavior.
- `tests/integration/habit-form.test.tsx`: verifies validation, create, edit, delete confirmation, completion, and streak UI behavior.
- `tests/e2e/app.spec.ts`: verifies route redirects, protected dashboard, auth flows, habit creation/completion, reload persistence, logout, and offline shell behavior.
