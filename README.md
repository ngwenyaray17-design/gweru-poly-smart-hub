# Gweru Poly Smart Hub - Open Source Starter

This repository is an open-source starter monorepo for the **Gweru Poly Smart Hub** project (frontend + backend). It is designed to be a fully functional local/dev-ready platform with mock payments and seeded test users so you can run and test everything immediately.

## What you'll find
- `backend/` - Node.js + Express API (JWT auth, role-based access)
- `frontend/` - Next.js PWA (login, dashboard, payments demo)
- `docker-compose.yml` - Run Postgres + backend + frontend locally
- `README.md` - This file Triggering GitHub Actions deployment 🚀

- `.env.example` - Environment variable examples
- `.github/workflows/deploy.yml` - CI template for GitHub Actions (requires secrets)

## Quick local start (recommended)
1. Install Docker & Docker Compose.
2. Copy `.env.example` to `.env` and adjust if needed.
3. Run: `docker compose up --build -d`
4. Wait for services to start, then run migrations & seed:
   - `docker compose exec backend node db/migrate.js`
   - `docker compose exec backend node seed.js`
5. Open the frontend at http://localhost:3000 and login using seeded accounts:
   - Creator: `ray@dreamer.example` / `RayStrongPass!23`
   - Admin: `admin@gweru.ac.zw` / `AdminPass!23`
   - Student: `student1@gweru.ac.zw` / `Student1Pass!23`

## Notes
- Payment flows are mock/sandbox so you can test without live credentials.
- For production you'll need to set up hosting (Render/Vercel), obtain Paynow/EcoCash credentials, and secure environment variables.
- See `infra/` for deployment guidance.

If you want, I can create a GitHub repo for you (you must provide access), or walk you through pushing this project to GitHub and configuring the CI secrets.
