import type {
    ContentNavigationItem,
    ContentNavigationResult,
  } from "@/lib/content-ts/types";
  
  type GetNavigationOptions<T> = {
    items: T[];
    currentSlug: string;
    getSlug: (item: T) => string;
    getTitle: (item: T) => string;
    getHref: (item: T, index: number) => string;
    getLabel?: (item: T, index: number) => string | undefined;
  };
  
  export function getContentNavigation<T>({
    items,
    currentSlug,
    getSlug,
    getTitle,
    getHref,
    getLabel,
  }: GetNavigationOptions<T>): ContentNavigationResult | null {
    const normalized = items.map((item, index) => ({
      slug: getSlug(item),
      title: getTitle(item),
      href: getHref(item, index),
      order: index + 1,
      label: getLabel?.(item, index),
    }));
  
    const currentIndex = normalized.findIndex((item) => item.slug === currentSlug);
  
    if (currentIndex === -1) return null;
  
    return {
      current: normalized[currentIndex],
      previous: currentIndex > 0 ? normalized[currentIndex - 1] : null,
      next: currentIndex < normalized.length - 1 ? normalized[currentIndex + 1] : null,
      currentIndex: currentIndex + 1,
      totalCount: normalized.length,
    };
  }