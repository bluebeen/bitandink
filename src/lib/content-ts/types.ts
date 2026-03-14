export type ContentSection = "writing" | "portfolio" | "studio";

export type BaseContentItem = {
  slug: string;
  title: string;
  summary: string;
  published: boolean;
  featured?: boolean;
  date?: string;
};

export type ContentCardItem = BaseContentItem & {
  href: string;
  eyebrow?: string;
  tags?: string[];
};

export type ContentDetailMeta = {
  section: ContentSection;
  title: string;
  summary: string;
  eyebrow?: string;
  metaLine?: string;
};

export type ContentNavigationItem = {
  slug: string;
  title: string;
  href: string;
  order: number;
  label?: string;
};

export type ContentNavigationResult = {
  current: ContentNavigationItem;
  previous: ContentNavigationItem | null;
  next: ContentNavigationItem | null;
  currentIndex: number;
  totalCount: number;
};

export type ContentAction = {
  label: string;
  href?: string;
  onClick?: () => void;
  external?: boolean;
};