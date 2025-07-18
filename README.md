# ⚡ SkillHub – Die smarte Plattform für Developer-Showcases & Tech-Playgrounds

SkillHub ist ein modernes Fullstack-Projekt, das dir als Entwickler eine Spielwiese bietet, um moderne Webtechnologien zu lernen, zu testen und produktionsreif einzusetzen.

Ob Frontend, Backend, Testing, CI oder Build Tools – SkillHub vereint alles in einem strukturierten Monorepo.

---

## 🚀 Tech Stack

### 🖥️ Frontend
- [Vue 3](https://vuejs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) für ultraschnelles Bundling
- [Tailwind CSS](https://tailwindcss.com/) für das Design
- [Pinia](https://pinia.vuejs.org/) für State Management
- [Playwright](https://playwright.dev/) für End-to-End Tests
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) für Linting und Formatierung

### 🧠 Backend
- [Bun](https://bun.sh/) als High-Performance Runtime
- [Alysia](https://elysiajs.com/) als Webframework (powered by Bun)
- [Knex.js](https://knexjs.org/) als SQL-Query-Builder
- [SQLite](https://www.sqlite.org/) als Datenbank
- [envsafe](https://github.com/KATT/envsafe) + [zod](https://zod.dev/) für sichere .env-Validierung

---

## 📁 Projektstruktur

```bash
skillhub/
├── frontend/       # Vue 3 Frontend
│   └── ...
├── backend/        # Bun Backend mit Alysia & Knex
│   └── ...
├── .gitignore      # zentrale Ignore-Liste
└── README.md
