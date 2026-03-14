import fs from "fs";
import path from "path";
import { chromium } from "playwright";

const BLOG_ID = "bitandink";
const OUTPUT_DIR = path.join(process.cwd(), "exports");
const OUTPUT_PATH = path.join(OUTPUT_DIR, `${BLOG_ID}-post-list.csv`);

function escapeCsv(value) {
  const str = String(value ?? "");
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 800;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 300);
    });
  });
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const collected = new Map();

  // 네이버 블로그 전체 글 목록 페이지
  const url = `https://blog.naver.com/PostList.naver?blogId=${BLOG_ID}`;

  await page.goto(url, { waitUntil: "domcontentloaded" });

// iframe이 있으면 iframe 사용, 없으면 현재 페이지 사용
await page.waitForTimeout(1500);

const mainFrame =
  page.frame({ name: "mainFrame" }) ||
  page.frames().find((f) => f.url().includes("PostList.naver")) ||
  page.mainFrame();

const frame = mainFrame;

  // 목록 페이지 여러 번 더보기/페이지 이동 시도
  for (let round = 0; round < 30; round++) {
    await frame.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(1200);

    // 목록 내 링크 수집
    const posts = await frame.evaluate(() => {
      const results = [];

      const anchors = Array.from(document.querySelectorAll("a"));

      for (const a of anchors) {
        const href = a.getAttribute("href") || "";
        const text = (a.textContent || "").trim();

        const isPostLink =
          href.includes("PostView.naver") ||
          href.includes("/" ) && href.includes("blog.naver.com");

        if (!text || text.length < 2) continue;
        if (!isPostLink) continue;

        results.push({
          title: text,
          href,
        });
      }

      return results;
    });

    for (const post of posts) {
      let link = post.href;

      if (link.startsWith("/")) {
        link = `https://blog.naver.com${link}`;
      }

      if (!collected.has(link)) {
        collected.set(link, {
          title: post.title,
          link,
          pubDate: "",
          migrated: "N",
        });
      }
    }

    // 더보기 버튼 / 다음 페이지 버튼 시도
    const nextClicked = await frame.evaluate(() => {
      const candidates = Array.from(document.querySelectorAll("a, button"));

      const nextEl = candidates.find((el) => {
        const text = (el.textContent || "").trim();
        return (
          text.includes("다음") ||
          text.includes("더보기") ||
          text === ">" ||
          text === "다음페이지"
        );
      });

      if (nextEl) {
        nextEl.click();
        return true;
      }

      return false;
    });

    if (!nextClicked) {
      break;
    }

    await page.waitForTimeout(1800);
  }

  const rows = Array.from(collected.values());

  const headers = ["title", "link", "pubDate", "category", "tags", "slug", "migrated"];

  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map((header) => {
          if (header === "category") return "";
          if (header === "tags") return "";
          if (header === "slug") return "";
          return escapeCsv(row[header] ?? "");
        })
        .join(",")
    ),
  ].join("\n");

  fs.writeFileSync(OUTPUT_PATH, csv, "utf8");

  await browser.close();

  console.log(`완료: ${OUTPUT_PATH}`);
  console.log(`총 ${rows.length}개 글 수집`);
}

main().catch((error) => {
  console.error("에러:", error);
  process.exit(1);
});