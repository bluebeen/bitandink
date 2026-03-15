"use client";

import { useEffect, useMemo, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase";
import BeanAvatar from "@/components/common/BeanAvatar";

type Props = {
  slug: string;
  category: string;
};

type LikeRow = {
  count: number;
};

export default function LikeButton({ slug, category }: Props) {
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const storageKey = useMemo(() => `liked:${category}/${slug}`, [category, slug]);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored === "true") {
      setLiked(true);
    }

    void fetchLikes();
  }, [storageKey]);

  async function fetchLikes() {
    setLoading(true);

    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from("likes")
        .select("count")
        .eq("slug", slug)
        .eq("category", category)
        .maybeSingle<LikeRow>();

      if (error) {
        console.error("Failed to load likes:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        });
        setCount(0);
        return;
      }

      setCount(data?.count ?? 0);
    } catch (error) {
      console.error("Failed to load likes:", error);
      setCount(0);
    } finally {
      setLoading(false);
    }
  }

  async function handleLike() {
    if (liked || submitting) return;

    const previousCount = count;
    const optimisticCount = count + 1;

    setSubmitting(true);
    setLiked(true);
    setCount(optimisticCount);
    window.localStorage.setItem(storageKey, "true");

    try {
      const supabase = getSupabaseClient();

      const { data: existing, error: selectError } = await supabase
        .from("likes")
        .select("count")
        .eq("slug", slug)
        .eq("category", category)
        .maybeSingle<LikeRow>();

      if (selectError) {
        throw selectError;
      }

      if (!existing) {
        const { error: insertError } = await supabase.from("likes").insert({
          slug,
          category,
          count: 1,
        });

        if (insertError) {
          throw insertError;
        }

        setCount(1);
        return;
      }

      const nextCount = existing.count + 1;
      const { error: updateError } = await supabase
        .from("likes")
        .update({ count: nextCount })
        .eq("slug", slug)
        .eq("category", category);

      if (updateError) {
        throw updateError;
      }

      setCount(nextCount);
    } catch (error) {
      console.error("Failed to submit like:", error);
      setLiked(false);
      setCount(previousCount);
      window.localStorage.removeItem(storageKey);
    } finally {
      setSubmitting(false);
    }
  }

  const label = loading
    ? "loading"
    : submitting
      ? "saving..."
      : liked
        ? "Bean liked this"
        : "like";

  return (
    <button
      type="button"
      onClick={handleLike}
      disabled={liked || submitting}
      aria-pressed={liked}
      aria-label={`${label} this post`}
      className={[
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition",
        "disabled:cursor-not-allowed disabled:opacity-70",
        liked
          ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
          : "border-white/15 bg-white/5 text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
      ].join(" ")}
    >
      {liked ? (
        <span className="relative h-5 w-5 overflow-hidden rounded-full">
          <BeanAvatar
            variant="reaction"
            clickable={false}
            className="h-full w-full"
          />
        </span>
      ) : (
        <span aria-hidden>♡</span>
      )}

      <span>{label}</span>
      <span className="text-xs opacity-70 tabular-nums">{count}</span>
    </button>
  );
}