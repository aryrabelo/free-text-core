# Changelog

## 0.1.0

Initial release.

- Runtime-agnostic core for free-text session notes, shared by the Oh My Pi and Claude Code free-text plugins.
- Note path scheme under `~/.free-text/` with read-fallback to the legacy `~/.omp-free-text/`, plus a per-repo/branch `current.md` pointer.
- Persistence (load / save / append-only history / cross-session list), markdown checkbox prompt-queue parsing, widget line rendering, and a generic stats line (context bar, model, +adds/-dels, elapsed).
- No usage-quota coupling.
