# Repository Guidelines

## Project Structure & Development

The project is built on a plain static structure: root `index.html`, `styles.css`, `script.js`, and `assets/`. Follow that plan; do not add a framework or build tool unless Codex updates the architecture. Preserve working page content and behavior. To preview, run any standard static HTTP server (e.g., `python -m http.server` or `npx serve`). Do not use obsolete Astro commands.

## Roles

**Codex is the technical lead, architect, planner, reviewer, and QA overseer.** Codex analyzes requirements, breaks work into concrete tasks, plans architecture before implementation, maintains `PROJECT_PLAN.md` as the single source of truth, and reviews implementation against requirements and acceptance criteria. Codex identifies functional, regression, UX, accessibility, security, and complexity issues. Codex records findings and required corrections in `CODEX_REVIEW.md`. A task is not complete until Codex approves it. Avoid rewriting working code; document the reason before proposing a major architectural change.

**Antigravity is the implementation and build agent.** Before work, Antigravity reads `AGENTS.md`, `PROJECT_PLAN.md`, and `CODEX_REVIEW.md`. It implements the current task, tests the application in a browser where applicable, fixes implementation issues, and updates implementation progress in `PROJECT_PLAN.md`. Antigravity must not mark its work approved; approval belongs to Codex.

## Required Workflow

1. Codex analyzes requirements and plans tasks and architecture.
2. Antigravity implements the current task and tests it.
3. Codex reviews against the plan and acceptance criteria.
4. If changes are needed, Codex records problems and required changes in `CODEX_REVIEW.md`; Antigravity fixes them.
5. Codex reviews again and records approval before work proceeds to the next task.

Keep `PROJECT_PLAN.md` and `CODEX_REVIEW.md` concise and update them in place. Do not create duplicate planning or review documents.

## Code, Tests & Security

Follow the formatter, linter, naming conventions, and test framework configured for the chosen stack. Use descriptive names and focused modules. Run relevant checks for changed code and document their results. Do not commit credentials or machine-specific configuration; document required environment variables with safe examples and validate untrusted input at system boundaries.
