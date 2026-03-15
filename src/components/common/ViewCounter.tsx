"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase";

type Props = {
  slug: string;
  category: string;
};

type ViewRow = {
  count: number;
};

export default function ViewCounter({ slug, category }: Props) {
  const [views, setViews] = useState(0);

  useEffect(() => {
    void handleViews();
  }, [slug, category]);

  async function handleViews() {
    const key = `viewed-${category}-${slug}`;

    try {
      const supabase = getSupabaseClient();
      const alreadyViewed = window.localStorage.getItem(key);

      const { data, error } = await supabase
        .from("views")
        .select("count")
        .eq("slug", slug)
        .eq("category", category)
        .maybeSingle<ViewRow>();

      if (error) {
        console.error("Failed to fetch views:", error);
        return;
      }

      if (!data) {
        const { error: insertError } = await supabase.from("views").insert({
          slug,
          category,
          count: 1,
        });

        if (insertError) {
          console.error("Failed to insert views row:", insertError);
          return;
        }

        setViews(1);
        window.localStorage.setItem(key, "true");
        return;
      }

      if (!alreadyViewed) {
        const newCount = data.count + 1;

        const { error: updateError } = await supabase
          .from("views")
          .update({ count: newCount })
          .eq("slug", slug)
          .eq("category", category);

        if (updateError) {
          console.error("Failed to update views:", updateError);
          setViews(data.count);
          return;
        }

        setViews(newCount);
        window.localStorage.setItem(key, "true");
      } else {
        setViews(data.count);
      }
    } catch (error) {
      console.error("Failed to handle views:", error);
    }
  }

  return <span>👁 {views}</span>;
}