#!/usr/bin/env node
/**
 * 콘텐츠 검사 게이트.
 *
 * 확인되지 않은 주장이 사이트에 들어가지 못하게 막는다.
 * `npm run build` 앞과 pre-commit 훅에서 실행된다.
 *
 *   node scripts/check-content.mjs           빌드 게이트 (block이 있으면 exit 1)
 *   node scripts/check-content.mjs --staged  스테이징된 파일만 검사
 *
 * 규칙:
 *   scripts/content-rules.json        공개. 과장 어휘·학교명·시크릿·전화번호
 *   scripts/content-rules.local.json  비공개. 프로젝트별 금지 주장 (없으면 경고만 하고 넘어간다)
 *   FACTS.md                          확정 수치와 금지 변형
 */

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { execSync } from "node:child_process";

const ROOT = process.cwd();
const STAGED = process.argv.includes("--staged");

const C = process.stdout.isTTY
  ? { r: "\x1b[31m", y: "\x1b[33m", g: "\x1b[32m", d: "\x1b[2m", b: "\x1b[1m", x: "\x1b[0m" }
  : { r: "", y: "", g: "", d: "", b: "", x: "" };

const findings = [];
const add = (level, rule, file, line, msg, why) =>
  findings.push({ level, rule, file, line, msg, why });

/* ── 규칙 로드 ────────────────────────────────────────── */

const rules = JSON.parse(readFileSync(join(ROOT, "scripts/content-rules.json"), "utf8"));

const LOCAL = join(ROOT, "scripts/content-rules.local.json");
let localRules = null;
if (existsSync(LOCAL)) {
  localRules = JSON.parse(readFileSync(LOCAL, "utf8"));
  rules.forbidden.push(...(localRules.forbidden ?? []));
}

/* ── 검사 대상 파일 ───────────────────────────────────── */

const CODE = /\.(ts|tsx|js|jsx|mjs|css)$/;

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (CODE.test(name)) out.push(p);
  }
  return out;
}

let files;
if (STAGED) {
  const staged = execSync("git diff --cached --name-only --diff-filter=ACM", { encoding: "utf8" })
    .split("\n")
    .filter(Boolean)
    .filter((f) => CODE.test(f) && rules.targets.some((t) => f.startsWith(t + "/")));
  files = staged.map((f) => join(ROOT, f)).filter(existsSync);
} else {
  files = rules.targets.flatMap((t) => walk(join(ROOT, t)));
}

const rel = (p) => relative(ROOT, p).split(sep).join("/");

/* ── 1. 금지 표현 ─────────────────────────────────────── */

for (const file of files) {
  const lines = readFileSync(file, "utf8").split("\n");
  const r = rel(file);

  lines.forEach((text, i) => {
    // 주석은 건너뛴다. 규칙 자체를 설명하는 줄이 걸리면 곤란하다.
    if (/^\s*(\/\/|\*|\/\*)/.test(text)) return;

    for (const group of rules.forbidden) {
      for (const pat of group.patterns) {
        if (text.includes(pat)) {
          add(group.level, group.id, r, i + 1, `"${pat}"`, group.why);
        }
      }
    }

    for (const s of rules.secrets ?? []) {
      if (new RegExp(s.pattern).test(text)) {
        add(s.level, s.id, r, i + 1, "하드코딩된 자격증명으로 보임", "커밋하면 유출된다");
      }
    }

    for (const p of rules.privacy ?? []) {
      if ((p.allowIn ?? []).includes(r)) continue;
      if (new RegExp(p.pattern).test(text)) {
        add(p.level, p.id, r, i + 1, "평문 개인정보", p.why);
      }
    }
  });
}

/* ── 2. 확정 수치 대조 ────────────────────────────────── */

const factsPath = join(ROOT, "FACTS.md");
const corpus = files.map((f) => readFileSync(f, "utf8")).join("\n");

if (!existsSync(factsPath)) {
  add("block", "facts", "FACTS.md", 0, "파일이 없다", "수치의 출처를 기록해야 한다");
} else {
  const facts = readFileSync(factsPath, "utf8");
  const row = /^\|\s*`([^`]+)`\s*\|\s*`([^`]+)`\s*\|\s*([^|]+)\|/gm;

  const canonical = [];
  let m;
  while ((m = row.exec(facts))) canonical.push({ id: m[1], value: m[2], what: m[3].trim() });

  // 전체 검사일 때만. 스테이징 검사에서는 일부 파일만 보므로 누락이 정상이다.
  if (!STAGED) {
    for (const f of canonical) {
      if (!corpus.includes(f.value)) {
        add(
          "warn",
          "facts",
          "FACTS.md",
          0,
          `${f.id} = ${f.value} 가 콘텐츠에 없다`,
          "표에 등록됐지만 사이트에 안 쓰인다. 값이 바뀌었는지 확인",
        );
      }
    }
  }

  // 금지 변형
  const bad = /^\|\s*`([^`]+)`\s*\|\s*([^|]+)\|/gm;
  const banned = [];
  const badSection = facts.slice(facts.indexOf("## 금지 변형"), facts.indexOf("## 기여 경계"));
  while ((m = bad.exec(badSection))) banned.push({ value: m[1], why: m[2].trim() });

  for (const b of banned) {
    files.forEach((file) => {
      readFileSync(file, "utf8")
        .split("\n")
        .forEach((text, i) => {
          if (/^\s*(\/\/|\*|\/\*)/.test(text)) return;
          if (text.includes(b.value)) {
            add("block", "facts", rel(file), i + 1, `금지된 값 "${b.value}"`, b.why);
          }
        });
    });
  }
}

/* ── 출력 ─────────────────────────────────────────────── */

const blocks = findings.filter((f) => f.level === "block");
const warns = findings.filter((f) => f.level === "warn");

const show = (list, color, label) => {
  if (!list.length) return;
  console.log(`\n${color}${C.b}${label} ${list.length}건${C.x}`);
  for (const f of list) {
    const at = f.line ? `${f.file}:${f.line}` : f.file;
    console.log(`  ${color}✗${C.x} ${at}  ${f.msg}`);
    console.log(`    ${C.d}[${f.rule}] ${f.why}${C.x}`);
  }
};

console.log(`${C.d}검사 대상 ${files.length}개 파일${STAGED ? " (스테이징)" : ""}${C.x}`);

if (!localRules) {
  console.log(
    `${C.y}!${C.x} scripts/content-rules.local.json 이 없다. ` +
      `${C.d}프로젝트별 금지 주장은 검사하지 않는다${C.x}`,
  );
}

show(blocks, C.r, "차단");
show(warns, C.y, "경고");

if (blocks.length) {
  console.log(`\n${C.r}${C.b}콘텐츠 검사 실패${C.x} — 위 항목을 고치거나 규칙을 갱신한다.\n`);
  process.exit(1);
}

console.log(
  warns.length
    ? `\n${C.y}통과 (경고 ${warns.length}건)${C.x}\n`
    : `\n${C.g}${C.b}통과${C.x} ${C.d}금지 표현·자격증명·개인정보·수치 정합 이상 없음${C.x}\n`,
);
