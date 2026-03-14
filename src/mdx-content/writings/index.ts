import type { WritingCategory } from "@/lib/writings";

export { type WritingCategory };

export const writingCategories: {
  key: WritingCategory;
  title: string;
  subtitle: string;
  description: string;
}[] = [
  {
    key: "novels",
    title: "Novels",
    subtitle: "소설",
    description: "인물과 감정, 장면 중심의 서사를 담습니다.",
  },
  {
    key: "essays",
    title: "Essays",
    subtitle: "에세이",
    description: "생각과 경험, 글쓰기와 개발에 대한 기록.",
  },
  {
    key: "synopses",
    title: "Synopses",
    subtitle: "시놉시스",
    description: "기획안, 시놉시스, 이야기의 구조와 방향.",
  },
  {
    key: "scripts",
    title: "Scripts",
    subtitle: "스크립트",
    description: "스크립트와 대사 중심의 작업.",
  },
];