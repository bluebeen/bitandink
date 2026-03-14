import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

const inputPath = path.join(process.cwd(), "exports", "naver-rss-posts.csv");
const outputDir = path.join(process.cwd(), "src", "contents", "writings", "posts");

function slugify(text = "") {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w가-힣\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function escapeQuotes(text = "") {
  return String(text).replace(/"/g, '\\"');
}

function normalizeDate(pubDate = "") {
  const date = new Date(pubDate);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function normalizeCategory(category = "") {
  const allowed = new Set(["essays", "novels", "scripts", "synopses"]);
  const value = String(category).trim().toLowerCase();
  return allowed.has(value) ? value : "essays";
}

function normalizeTags(tags = "") {
  if (!tags) return [];
  return String(tags)
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function makeMdxContent(row) {
  const title = row.title?.trim() || "Untitled";
  const slug = row.slug?.trim() ? slugify(row.slug) : slugify(title);
  const date = normalizeDate(row.pubDate);
  const category = normalizeCategory(row.category);
  const summary = row.summary?.trim() || "";
  const tags = normalizeTags(row.tags);
  const link = row.link?.trim() || "";

  const frontmatter = `---
title: "${escapeQuotes(title)}"
date: "${date}"
category: "${category}"
summary: "${escapeQuotes(summary)}"
published: true
tags: [${tags.map((tag) => `"${escapeQuotes(tag)}"`).join(", ")}]
originalLink: "${escapeQuotes(link)}"
---

<!--
TODO:
- 네이버 원문을 확인해서 본문 붙여넣기
- summary 다듬기
- tags 보강하기
-->

${summary ? `${summary}\n` : ""}

`;

  return { slug, content: frontmatter };
}

function main() {
  if (!fs.existsSync(inputPath)) {
    throw new Error(`CSV 파일이 없습니다: ${inputPath}`);
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const csvText = fs.readFileSync(inputPath, "utf8");
  const records = parse(csvText, {
    columns: true,
    skip_empty_lines: true,
  });

  let createdCount = 0;
  let skippedCount = 0;

  for (const row of records) {
    const migrated = String(row.migrated || "").trim().toUpperCase();

    if (migrated !== "Y") {
      skippedCount += 1;
      continue;
    }

    const { slug, content } = makeMdxContent(row);
    const filePath = path.join(outputDir, `${slug}.mdx`);

    if (fs.existsSync(filePath)) {
      console.log(`SKIP (이미 존재): ${slug}.mdx`);
      skippedCount += 1;
      continue;
    }

    fs.writeFileSync(filePath, content, "utf8");
    console.log(`CREATE: ${slug}.mdx`);
    createdCount += 1;
  }

  console.log("");
  console.log(`완료`);
  console.log(`생성: ${createdCount}개`);
  console.log(`건너뜀: ${skippedCount}개`);
}

try {
  main();
} catch (error) {
  console.error("에러:", error.message);
  process.exit(1);
}