# Habit Tracker

A full-stack habit tracking app with user accounts, weekday-based habits, and per-date completion records.

**Live demo:** https://habit-tracker-magicbox2.vercel.app/

## Features

- Sign up, log in, and log out (JWT authentication)
- Create, edit, and delete habits
- Set which weekdays each habit repeats on
- Check off today's habits; completions are saved per date
- Weekly progress view (green / yellow / empty circles)
- Set a priority for each habit and sort by it
- Each user only sees their own habits

## Tech Stack

| Layer | Tech | Hosting |
|---|---|---|
| Frontend | React, JavaScript | Vercel |
| Backend | Node.js, Express | Render |
| Database | PostgreSQL | Neon |

## How It Works

- **Auth:** Passwords are hashed with bcrypt. On login the server issues a JWT, which the client sends in the `Authorization: Bearer` header. An Express middleware verifies the token, and the frontend uses protected routes.
- **Data isolation:** `users` and `habits` tables are linked by a `user_id` foreign key, and every query is scoped with `WHERE ... AND user_id = ...`.
- **State updates:** The frontend updates state immutably (`.map()` with object spread) and syncs each change to the server with a `PUT` request.

## Project Structure

```
habit-tracker/            # React frontend
habit-tracker-backend/    # Express API
```

## Run Locally

1. Clone the repo
2. Backend: `cd habit-tracker-backend && npm install`, then create a `.env` with your PostgreSQL connection string and JWT secret, and start the server
3. Frontend: `cd habit-tracker && npm install && npm start` (point the API URL at your local backend)

## Screenshots

*(add 1-2 screenshots of the deployed app here)*
