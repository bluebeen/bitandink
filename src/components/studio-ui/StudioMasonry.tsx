import Link from "next/link";
import Image from "next/image";

type StudioItem = {
  href: string;
  title: string;
  summary: string;
  thumbnail?: string;
  tags?: string[];
};

type Props = {
  items: StudioItem[];
};

export default function StudioMasonry({ items }: Props) {
  return (
    <div
      className="
      columns-1
      md:columns-2
      xl:columns-3
      gap-5
      space-y-5
      "
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group block break-inside-avoid"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition hover:border-[var(--color-accent)]/40">
            
            {item.thumbnail && (
              <div className="relative w-full">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  width={1200}
                  height={900}
                  className="w-full h-auto object-cover transition duration-500 group-hover:scale-[1.02]"
                />
              </div>
            )}

            <div className="p-4 space-y-3">
              <h3 className="text-lg font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition">
                {item.title}
              </h3>

              <p className="text-sm text-[var(--color-sub)] leading-6">
                {item.summary}
              </p>

              {item.tags && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs border border-white/10 px-2 py-1 rounded-full text-[var(--color-sub)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

          </div>
        </Link>
      ))}
    </div>
  );
}