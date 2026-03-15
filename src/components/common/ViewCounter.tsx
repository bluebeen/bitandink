"use client";

import { useEffect, useMemo, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase";

type Props = {
  slug: string;
  category: string;
};

type ViewRow = {
  count: number;
};

export default function ViewCounter({ slug, category }: Props) {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const viewKey = useMemo(() => `viewed:${category}/${slug}`, [category, slug]);

  useEffect(() => {
    void handleViews();
  }, [viewKey]);

  async function fetchViews() {
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from("views")
        .select("count")
        .eq("slug", slug)
        .eq("category", category)
        .maybeSingle<ViewRow>();

      if (error) {
        console.error("Failed to fetch views row:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        });
        setCount((prev) => prev ?? 0);
        return;
      }

      setCount(data?.count ?? 0);
    } catch (error) {
      console.error("Failed to fetch views row:", error);
      setCount((prev) => prev ?? 0);
    }
  }

  async function handleViews() {
    setLoading(true);

    try {
      const alreadyViewed =
        typeof window !== "undefined" &&
        window.localStorage.getItem(viewKey) === "true";

      if (alreadyViewed) {
        await fetchViews();
        return;
      }

      const supabase = getSupabaseClient();

      const { data: existing, error: selectError } = await supabase
        .from("views")
        .select("count")
        .eq("slug", slug)
        .eq("category", category)
        .maybeSingle<ViewRow>();

      if (selectError) {
        console.error("Failed to fetch existing views row:", {
          message: selectError.message,
          details: selectError.details,
          hint: selectError.hint,
          code: selectError.code,
        });
        await fetchViews();
        return;
      }

      if (!existing) {
        const { error: insertError } = await supabase.from("views").insert({
          slug,
          category,
          count: 1,
        });

        if (insertError) {
          console.error("Failed to insert views row:", {
            message: insertError.message,
            details: insertError.details,
            hint: insertError.hint,
            code: insertError.code,
          });
          await fetchViews();
          return;
        }

        setCount(1);
        window.localStorage.setItem(viewKey, "true");
        return;
      }

      const nextCount = existing.count + 1;

      const { error: updateError } = await supabase
        .from("views")
        .update({ count: nextCount })
        .eq("slug", slug)
        .eq("category", category);

      if (updateError) {
        console.error("Failed to update views row:", {
          message: updateError.message,
          details: updateError.details,
          hint: updateError.hint,
          code: updateError.code,
        });
        await fetchViews();
        return;
      }

      setCount(nextCount);
      window.localStorage.setItem(viewKey, "true");
    } catch (error) {
      console.error("Failed to handle views:", error);
      await fetchViews();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-[var(--color-sub)]"
      aria-live="polite"
    >
      <span aria-hidden>👁</span>
      <span className="tabular-nums">
        {loading ? "..." : count.toLocaleString()}
      </span>
    </div>
  );
}