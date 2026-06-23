import { expect, test } from "bun:test";
import {
	computeContext,
	contextLevel,
	formatDuration,
	renderStatsLine,
} from "../src/stats";

test("computeContext applies the 16.5% autocompact buffer", () => {
	// remaining 100 -> used 0; remaining 16.5 -> used 100
	expect(computeContext(100).usedPct).toBe(0);
	expect(computeContext(16).usedPct).toBe(100);
	expect(computeContext(100).rawUsed).toBe(0);
});

test("contextLevel thresholds at 50/65/80", () => {
	expect(contextLevel(10)).toBe("ok");
	expect(contextLevel(55)).toBe("warn");
	expect(contextLevel(70)).toBe("high");
	expect(contextLevel(85)).toBe("critical");
});

test("formatDuration is Xm SSs", () => {
	expect(formatDuration(15_000)).toBe("0m 15s");
	expect(formatDuration(75_000)).toBe("1m 15s");
});

test("renderStatsLine matches the kept target shape (plain)", () => {
	const line = renderStatsLine({
		modelName: "Opus 4.8 (1M context)",
		contextRemainingPct: 100,
		linesAdded: 0,
		linesRemoved: 0,
		durationMs: 15_000,
	});
	expect(line).toBe("░░░░░░░░░░ 0% | Opus 4.8 (1M context) | +0/-0 | 0m 15s");
});

test("critical context appends the skull", () => {
	const line = renderStatsLine({
		modelName: "M",
		contextRemainingPct: 16,
		linesAdded: 1,
		linesRemoved: 2,
		durationMs: 0,
	});
	expect(line.startsWith("▓▓▓▓▓▓▓▓▓▓ 💀 100% |")).toBe(true);
});
