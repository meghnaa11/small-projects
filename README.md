# Small Projects

A collection of small web development projects (frontend, backend, and full‑stack) organized in subfolders.

## Structure

- Each project lives in its own directory under `small-projects/PROJECT_NAME/`.
- Projects should include their own `README.md` with setup and run instructions.
- Use a separate virtual environment (`.venv/`) for Python projects and standard package managers for JS projects.

## Getting Started

1. Clone or open this workspace.
2. Open a specific project folder inside `small-projects/`.
3. Follow that project's `README.md` (or the quick-start hints below).

### Quick starts

- Node/JS projects
  - Install: `npm install` (or `yarn`, `pnpm`)
  - Dev: `npm run dev` (or as documented)
  - Build: `npm run build`

- Python projects
  - Create venv: `python -m venv .venv`
  - Activate:
    - Windows PowerShell: `.venv\\Scripts\\Activate.ps1`
    - macOS/Linux: `source .venv/bin/activate`
  - Install deps: `pip install -r requirements.txt`
  - Run: `python main.py` (or as documented)

## Adding a New Project

1. Create a new folder: `small-projects/your-project-name/`.
2. Add a `README.md` with prerequisites, setup, and commands.
3. Include an `.env.example` (or `.env.sample`) if environment variables are needed.
4. For JS projects, include `package.json`. For Python, include `requirements.txt`.

## Notes

- A workspace-level `.gitignore` is provided to keep common artifacts (like `node_modules/`, `.venv/`, and build outputs) out of version control.
- Commit lockfiles (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`) per project unless you have a reason not to.
