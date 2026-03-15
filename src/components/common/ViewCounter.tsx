"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  slug: string;
  category: string;
};

export default function ViewCounter({ slug, category }: Props) {
  const [views, setViews] = useState(0);

  useEffect(() => {
    handleViews();
  }, []);

  async function handleViews() {
    const key = `viewed-${category}-${slug}`;

    const alreadyViewed = localStorage.getItem(key);

    const { data } = await supabase
      .from("views")
      .select("*")
      .eq("slug", slug)
      .eq("category", category)
      .single();

    if (!data) {
      await supabase.from("views").insert({
        slug,
        category,
        count: 1,
      });

      setViews(1);

      localStorage.setItem(key, "true");
      return;
    }

    if (!alreadyViewed) {
      const newCount = data.count + 1;

      await supabase
        .from("views")
        .update({ count: newCount })
        .eq("slug", slug)
        .eq("category", category);

      setViews(newCount);

      localStorage.setItem(key, "true");
    } else {
      setViews(data.count);
    }
  }

  return <span>👁 {views}</span>;
}