# Changelog

All notable changes to `@aryrabelo/planqueue-core` are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] — 2026-07-02

First public release of the PlanQueue core.

### Added

- Runtime-agnostic core for PlanQueue session notes: note path scheme under `~/.planqueue/{repo}/{branch}/{session-id}.md` plus a per-repo/branch `current.md` pointer.
- Persistence: load / save / append-only history / cross-session listing.
- Markdown checkbox prompt-queue parsing (`- [ ]` pending, `- [>]` in-flight, `- [x]` done, `---` human-in-the-loop barrier) and queue state transitions.
- Widget line rendering and a generic stats line (context bar, model, +adds/-dels, elapsed).
- Read-only legacy fallback chain, newest first: `~/.free-text/` then `~/.omp-free-text/` (`LEGACY_ROOT_DIR_NAMES`, `legacyNotePathsFor`, `legacySessionsDirsFor`, `legacyConfigPathsFor`, `loadNoteWithFallback(newPath, legacyPaths)`). New writes always go to `~/.planqueue/`; nothing under a legacy root is moved or rewritten.
- No network calls, no telemetry, no usage-quota coupling.

### Prior history

Internal iterations before the public PlanQueue identity (as `@aryrabelo/free-text-core`) are collapsed into this release.
