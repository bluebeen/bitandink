export type StudioCase = {
    title: string;
    slug: string;
    summary: string;
    category: string;
    result: string;
  };
  
  export const studioCases: StudioCase[] = [
    {
      title: "chaeum119",
      slug: "chaeum119",
      category: "brand site",
      summary: "브랜드 사이트 구조를 정리하고 사용 흐름을 더 분명하게 다듬은 작업입니다.",
      result: "주요 정보 접근성과 전체 흐름을 더 직관적으로 정리했습니다.",
    },
    {
      title: "Imweb 모바일 UX 수정",
      slug: "imweb-mobile-ux",
      category: "ux improvement",
      summary: "모바일 화면에서 정보 구조와 행동 흐름을 다시 정리한 작업입니다.",
      result: "모바일에서 핵심 정보 확인과 이동 흐름이 훨씬 자연스러워졌습니다.",
    },
  ];