"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

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

  const storageKey = useMemo(
    () => `liked:${category}/${slug}`,
    [category, slug]
  );

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored === "true") {
      setLiked(true);
    }

    void fetchLikes();
  }, [storageKey]);

  async function fetchLikes() {
    setLoading(true);

    const { data, error } = await supabase
      .from("likes")
      .select("count")
      .eq("slug", slug)
      .eq("category", category)
      .maybeSingle<LikeRow>();

    if (!error && data) {
      setCount(data.count);
    }

    if (!data) {
      setCount(0);
    }

    setLoading(false);
  }

  async function handleLike() {
    if (liked || submitting) return;

    setSubmitting(true);

    const { data: existing, error: selectError } = await supabase
      .from("likes")
      .select("count")
      .eq("slug", slug)
      .eq("category", category)
      .maybeSingle<LikeRow>();

    if (selectError) {
      console.error("Failed to fetch like row:", selectError);
      setSubmitting(false);
      return;
    }

    if (!existing) {
      const { error: insertError } = await supabase.from("likes").insert({
        slug,
        category,
        count: 1,
      });

      if (insertError) {
        console.error("Failed to insert like row:", insertError);
        setSubmitting(false);
        return;
      }

      setCount(1);
    } else {
      const nextCount = existing.count + 1;

      const { error: updateError } = await supabase
        .from("likes")
        .update({ count: nextCount })
        .eq("slug", slug)
        .eq("category", category);

      if (updateError) {
        console.error("Failed to update like row:", updateError);
        setSubmitting(false);
        return;
      }

      setCount(nextCount);
    }

    window.localStorage.setItem(storageKey, "true");
    setLiked(true);
    setSubmitting(false);
  }

  return (
    <button
      type="button"
      onClick={handleLike}
      disabled={liked || submitting || loading}
      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-xs text-[var(--color-sub)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-60"
      aria-label="좋아요"
    >
      {liked ? `❤️ ${count}` : `🤍 ${count}`}
    </button>
  );
}