# 🧠 Skillhub

Skillhub is a modern full-stack web app designed to manage and explore user skills.  
Built with the latest tools for an ultra-fast and developer-friendly experience.

---

## 🚀 Tech Stack

### 🖼️ Frontend

- [Vue 3](https://vuejs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) – blazing fast bundler
- [Tailwind CSS](https://tailwindcss.com/) – utility-first styling
- [Pinia](https://pinia.vuejs.org/) – modern state management
- [Playwright](https://playwright.dev/) – end-to-end testing
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) – code quality & formatting

### ⚙️ Backend

- [Bun](https://bun.sh/) – ultra-fast JavaScript runtime
- [Elysia](https://elysiajs.com/) – Bun-native web framework
- [Knex.js](https://knexjs.org/) – SQL query builder
- [SQLite](https://www.sqlite.org/) – lightweight embedded database
- [envsafe](https://github.com/rolodato/envsafe) + [zod](https://zod.dev/) – environment & schema validation

---

## 📁 Project Structure

```bash
skillhub/
├── frontend/        # Vue 3 app (Vite + Tailwind + Pinia)
│   ├── src/
│   ├── index.html
│   └── ...
├── backend/         # Bun backend (Elysia + Knex + SQLite)
│   ├── src/
│   ├── migrations/
│   ├── knexfile.cjs
│   └── ...
├── .gitignore       # centralized ignore rules
└── README.md
```

---

## 🧪 Local Development Setup

> Get up and running in just a few steps:

### 1. Clone the repository

```bash
git clone https://github.com/Max-Polster/Skillhub.git
cd Skillhub
```

### 2. Install dependencies

```bash
# Frontend
cd frontend
bun install

# Backend
cd ../backend
bun install
```

### 3. Run database migrations

```bash
bunx knex --knexfile knexfile.cjs migrate:latest
```

### 4. Start the dev servers

```bash
# Terminal 1 – Start backend
cd backend
bun run src/index.ts

# Terminal 2 – Start frontend
cd frontend
bun run dev
```

Visit your app at:

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:3000](http://localhost:3000)

---

## 🧠 Useful Tips

- **Working from another device?**  
  Clone the repo, run `bun install` in both `frontend/` and `backend/`, and start the dev servers.

- **.env files**  
  Keep sensitive env variables in `.env` (gitignored) and provide an `.env.example` for contributors.

- **Recommended VS Code extensions:**
  - Volar (Vue 3)
  - Prettier
  - ESLint
  - Tailwind CSS IntelliSense

---

## ✨ License

MIT – use freely, contribute openly.

---

> Made with 🔥 by [Max Polster](https://github.com/Max-Polster)
