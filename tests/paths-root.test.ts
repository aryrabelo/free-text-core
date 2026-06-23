import { expect, test } from "bun:test";
import {
	currentPointerPathFor,
	LEGACY_ROOT_DIR_NAME,
	legacyNotePathFor,
	notePathFor,
	ROOT_DIR_NAME,
	resolveLocation,
} from "../src/paths";

const home = "/home/u";
const loc = resolveLocation({
	cwd: "/x/repo",
	repoToplevel: "/x/repo",
	branch: "main",
	sessionId: "s1",
});

test("new root is .free-text", () => {
	expect(ROOT_DIR_NAME).toBe(".free-text");
	expect(notePathFor(loc, home)).toBe("/home/u/.free-text/repo/main/s1.md");
});

test("legacy root remains .omp-free-text for read-fallback", () => {
	expect(LEGACY_ROOT_DIR_NAME).toBe(".omp-free-text");
	expect(legacyNotePathFor(loc, home)).toBe(
		"/home/u/.omp-free-text/repo/main/s1.md",
	);
});

test("current pointer lives per repo/branch", () => {
	expect(currentPointerPathFor(loc, home)).toBe(
		"/home/u/.free-text/repo/main/current.md",
	);
});
