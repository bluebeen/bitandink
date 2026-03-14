import fs from "fs";
import path from "path";
import Parser from "rss-parser";

const parser = new Parser({
  customFields: {
    item: ["description", "creator", "category"],
  },
});

// 여기에 네이버 블로그 RSS 주소 넣기
const RSS_URL = "https://rss.blog.naver.com/bitandink.xml";

function stripHtml(html = "") {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .trim();
}

function makeSlug(text = "") {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w가-힣\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function escapeCsv(value) {
  const str = String(value ?? "");
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

async function main() {
  if (!RSS_URL || RSS_URL.includes("여기에-네이버-RSS-주소")) {
    throw new Error("RSS_URL에 네이버 블로그 RSS 주소를 넣어주세요.");
  }

  const feed = await parser.parseURL(RSS_URL);

  const rows = (feed.items || []).map((item) => {
    const title = item.title ?? "";
    const link = item.link ?? "";
    const pubDate = item.pubDate ?? item.isoDate ?? "";
    const summary = stripHtml(item.contentSnippet || item.description || "").slice(0, 180);
    const slug = makeSlug(title);

    return {
      title,
      link,
      pubDate,
      summary,
      category: "",     // 수동 입력용
      tags: "",         // 수동 입력용
      slug,
      migrated: "N",    // 이전 완료 여부 체크
    };
  });

  const headers = [
    "title",
    "link",
    "pubDate",
    "summary",
    "category",
    "tags",
    "slug",
    "migrated",
  ];

  const csv = [
    headers.join(","),
    ...rows.map((row) => headers.map((h) => escapeCsv(row[h])).join(",")),
  ].join("\n");

  const outputDir = path.join(process.cwd(), "exports");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, "naver-rss-posts.csv");
  fs.writeFileSync(outputPath, csv, "utf8");

  console.log(`완료: ${outputPath}`);
  console.log(`총 ${rows.length}개 글 저장됨`);
}

main().catch((err) => {
  console.error("에러:", err.message);
  process.exit(1);
});