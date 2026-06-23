/**
 * Generic stats line: context bar, model, +adds/-dels, elapsed.
 * A Claude Code statusline segment with no ANSI or quota/brand coupling.
 * Color is injected via {@link StatsStyle}; the default render is plain text.
 */

export type ContextLevel = "ok" | "warn" | "high" | "critical";

export interface StatsSnapshot {
	modelName: string;
	/** Context window REMAINING, 0..100 (as Claude Code reports it). */
	contextRemainingPct: number;
	linesAdded: number;
	linesRemoved: number;
	durationMs: number;
}

export interface StatsStyle {
	bar: (text: string, level: ContextLevel) => string;
	added: (text: string) => string;
	removed: (text: string) => string;
}

const PLAIN: StatsStyle = { bar: (t) => t, added: (t) => t, removed: (t) => t };

/** Map remaining% to used%, accounting for the 16.5% autocompact buffer. */
export function computeContext(remainingPct: number): {
	usedPct: number;
	rawUsed: number;
} {
	const remaining = Math.floor(remainingPct);
	const rawUsed = 100 - remaining;
	const usableRemaining = Math.max(0, ((remaining - 16.5) / 83.5) * 100);
	const usedPct = Math.min(100, Math.round(100 - usableRemaining));
	return { usedPct, rawUsed };
}

export function contextLevel(usedPct: number): ContextLevel {
	if (usedPct >= 80) return "critical";
	if (usedPct >= 65) return "high";
	if (usedPct >= 50) return "warn";
	return "ok";
}

export function formatDuration(ms: number): string {
	const totalSeconds = Math.floor(ms / 1000);
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	return `${minutes}m ${String(seconds).padStart(2, "0")}s`;
}

/** The 10-cell ▓/░ bar, with a trailing " 💀" when critical. */
export function buildContextBar(
	usedPct: number,
	style: StatsStyle = PLAIN,
): string {
	const filled = Math.floor(usedPct / 10);
	const level = contextLevel(usedPct);
	const cells = "▓".repeat(filled) + "░".repeat(10 - filled);
	const skull = level === "critical" ? " 💀" : "";
	return style.bar(cells, level) + skull;
}

export function renderStatsLine(
	s: StatsSnapshot,
	style: StatsStyle = PLAIN,
): string {
	const { usedPct } = computeContext(s.contextRemainingPct);
	const bar = buildContextBar(usedPct, style);
	const lines = `${style.added(`+${s.linesAdded}`)}/${style.removed(`-${s.linesRemoved}`)}`;
	return `${bar} ${usedPct}% | ${s.modelName} | ${lines} | ${formatDuration(s.durationMs)}`;
}
