export type ContentNavigationItem = {
  slug: string;
  title: string;
  href: string;
};

export type ContentNavigationResult = {
  prev: ContentNavigationItem | null;
  next: ContentNavigationItem | null;
} | null;

export function getContentNavigation(
  items: ContentNavigationItem[],
  currentSlug: string
): ContentNavigationResult {
  const currentIndex = items.findIndex((item) => item.slug === currentSlug);

  if (currentIndex === -1) {
    return null;
  }

  return {
    prev: currentIndex > 0 ? items[currentIndex - 1] : null,
    next: currentIndex < items.length - 1 ? items[currentIndex + 1] : null,
  };
}