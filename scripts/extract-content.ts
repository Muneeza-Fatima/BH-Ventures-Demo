#!/usr/bin/env node
/**
 * extract-content.ts
 *
 * Walks your components/app folders, parses each .tsx/.ts file as a real
 * TypeScript AST (not regex), and pulls out string values assigned to
 * "content-like" object keys (title, desc, label, etc.) while ignoring
 * styling/animation/config props (className, accent, duration, transition,
 * hex colors, image paths, etc.).
 *
 * This does NOT auto-write knowledge-base.ts for you. It writes a review
 * file (extracted-content.json) grouped by file + array name, so you can
 * skim it, fix anything mis-extracted, and paste the good parts into
 * knowledge-base.ts yourself. That review step matters — automatic
 * extraction gets you 90% of the way, but occasionally grabs something
 * it shouldn't (or misses context a human would keep).
 *
 * SETUP (one-time):
 *   npm install --save-dev typescript tsx
 *
 * USAGE (run anytime you update a page):
 *   npx tsx scripts/extract-content.ts
 *
 * Then open extracted-content.json at your project root.
 */

import * as ts from "typescript";
import * as fs from "fs";
import * as path from "path";

// ---------------------------------------------------------------------------
// CONFIG — tweak these as your project grows
// ---------------------------------------------------------------------------

// Folders to scan. Add "app" so page-level content (ventures, portfolio,
// insights, etc.) gets picked up too, not just components/.
const SCAN_DIRS = ["components", "app"];

const EXTENSIONS = [".tsx", ".ts"];

// Only extract string values assigned to these property names.
// Add new ones here if you introduce new content fields (e.g. "excerpt").
const CONTENT_KEYS = new Set([
    "title",
    "desc",
    "description",
    "label",
    "name",
    "heading",
    "question",
    "answer",
    "body",
    "text",
    "tagline",
    "summary",
    "blurb",
    "detail",
    "sub",
    "aboutRole",
    "department",
    "employmentType",
    "location",
    "eyebrow",
    "caption",
]);

// Keys whose values are arrays of strings we also want (bullets, requirements, etc.)
const CONTENT_ARRAY_KEYS = new Set([
    "bullets",
    "requirements",
    "whatsIncluded",
    "anchors",
    "tags",
]);

// Skip these paths entirely (styling-only files, generated files, etc.)
const SKIP_PATH_FRAGMENTS = ["node_modules", ".next", "chatbot"];

// Filters out values that slipped through the key whitelist but are
// obviously not content (colors, css units, asset paths, animation words).
function looksLikeJunk(value: string): boolean {
    const v = value.trim();
    if (!v) return true;
    if (/^#[0-9a-fA-F]{3,8}$/.test(v)) return true; // hex color
    if (/^rgba?\(/.test(v)) return true; // rgba(...) color
    if (/^\/(images|icons)\//.test(v)) return true; // asset path
    if (/^[0-9.]+(px|rem|em|%|s|ms|vh|vw)$/.test(v)) return true; // css unit
    if (["spring", "tween", "easeInOut", "easeOut", "easeIn"].includes(v)) return true; // animation config
    if (v.length < 2) return true;
    return false;
}

// ---------------------------------------------------------------------------
// FILE WALKING
// ---------------------------------------------------------------------------

function walk(dir: string, out: string[] = []): string[] {
    if (!fs.existsSync(dir)) return out;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (SKIP_PATH_FRAGMENTS.some((f) => full.toLowerCase().includes(f))) continue;
        if (entry.isDirectory()) {
            walk(full, out);
        } else if (EXTENSIONS.includes(path.extname(entry.name))) {
            out.push(full);
        }
    }
    return out;
}

// ---------------------------------------------------------------------------
// AST EXTRACTION
// ---------------------------------------------------------------------------

type ExtractedGroup = {
    file: string;
    arrayName: string | null;
    items: Record<string, string | string[]>[];
};

function extractFromFile(filePath: string): ExtractedGroup[] {
    const source = fs.readFileSync(filePath, "utf8");
    const sourceFile = ts.createSourceFile(
        filePath,
        source,
        ts.ScriptTarget.Latest,
        true,
        filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
    );

    const groups: ExtractedGroup[] = [];

    // Walk up the AST from an object literal to find the nearest
    // `const someName = [...]` it lives inside — used purely to label
    // the group in the output (e.g. "values", "facts", "journeySteps").
    function nearestArrayName(node: ts.Node): string | null {
        let current: ts.Node | undefined = node;
        while (current) {
            if (
                ts.isVariableDeclaration(current) &&
                current.name &&
                ts.isIdentifier(current.name)
            ) {
                return current.name.text;
            }
            current = current.parent;
        }
        return null;
    }

    function getStringValue(node: ts.Expression): string | null {
        if (ts.isStringLiteral(node)) return node.text;
        if (ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
        // Template literals WITH interpolation (`${x}`) are intentionally
        // skipped — reconstructing them automatically is unreliable. If you
        // need one, pull it manually.
        return null;
    }

    function visit(node: ts.Node) {
        if (ts.isObjectLiteralExpression(node)) {
            const item: Record<string, string | string[]> = {};

            for (const prop of node.properties) {
                if (!ts.isPropertyAssignment(prop)) continue;
                const key = prop.name.getText(sourceFile).replace(/["']/g, "");

                if (CONTENT_KEYS.has(key)) {
                    const value = getStringValue(prop.initializer);
                    if (value && !looksLikeJunk(value)) {
                        item[key] = value;
                    }
                }

                if (
                    CONTENT_ARRAY_KEYS.has(key) &&
                    ts.isArrayLiteralExpression(prop.initializer)
                ) {
                    const arr: string[] = [];
                    for (const el of prop.initializer.elements) {
                        if (ts.isExpression(el)) {
                            const value = getStringValue(el);
                            if (value && !looksLikeJunk(value)) arr.push(value);
                        }
                    }
                    if (arr.length) item[key] = arr;
                }
            }

            if (Object.keys(item).length > 0) {
                const arrayName = nearestArrayName(node);
                let group = groups.find(
                    (g) => g.arrayName === arrayName && g.file === filePath
                );
                if (!group) {
                    group = { file: filePath, arrayName, items: [] };
                    groups.push(group);
                }
                group.items.push(item);
            }
        }
        ts.forEachChild(node, visit);
    }

    visit(sourceFile);
    return groups;
}

// ---------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------

function main() {
    const files = SCAN_DIRS.flatMap((dir) => walk(dir));
    const allGroups: ExtractedGroup[] = [];

    for (const file of files) {
        try {
            allGroups.push(...extractFromFile(file));
        } catch (err) {
            console.warn(`Skipped ${file}: ${(err as Error).message}`);
        }
    }

    const outPath = path.join(process.cwd(), "extracted-content.json");
    fs.writeFileSync(outPath, JSON.stringify(allGroups, null, 2), "utf8");

    const totalItems = allGroups.reduce((n, g) => n + g.items.length, 0);
    console.log(`Scanned ${files.length} files across: ${SCAN_DIRS.join(", ")}`);
    console.log(`Found ${allGroups.length} content groups, ${totalItems} items total.`);
    console.log(`Written to ${outPath}`);
    console.log(`Next: open that file, skim for junk, then paste the clean parts into knowledge-base.ts.`);
}

main();