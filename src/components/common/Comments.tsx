"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  slug: string;
  category: string;
};

type Comment = {
  id: number;
  author: string;
  content: string;
  created_at: string;
};

export default function Comments({ slug, category }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    loadComments();
  }, []);

  async function loadComments() {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("slug", slug)
      .eq("category", category)
      .order("created_at", { ascending: false });

    if (data) setComments(data);
  }

  async function submitComment() {
    if (!author || !content) return;

    await supabase.from("comments").insert({
      slug,
      category,
      author,
      content,
    });

    setAuthor("");
    setContent("");

    loadComments();
  }

  async function deleteComment(id: number) {
    await supabase.from("comments").delete().eq("id", id);
    loadComments();
  }

  return (
    <div className="mx-auto mt-16 max-w-3xl">
      <h3 className="mb-6 text-lg font-semibold">댓글</h3>

      {/* 작성 */}
      <div className="mb-8 space-y-3">
        <input
          placeholder="닉네임"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full rounded border border-white/10 bg-black/30 px-3 py-2 text-sm"
        />

        <textarea
          placeholder="댓글을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded border border-white/10 bg-black/30 px-3 py-2 text-sm"
        />

        <button
          onClick={submitComment}
          className="rounded border border-white/20 px-4 py-2 text-sm"
        >
          댓글 등록
        </button>
      </div>

      {/* 리스트 */}
      <div className="space-y-6">
        {comments.map((c) => (
          <div key={c.id} className="border-b border-white/10 pb-4">
            <div className="flex justify-between">
              <div className="text-sm font-semibold">{c.author}</div>

              <button
                onClick={() => deleteComment(c.id)}
                className="text-xs opacity-50 hover:opacity-100"
              >
                삭제
              </button>
            </div>

            <div className="mt-1 text-sm opacity-80">{c.content}</div>

            <div className="mt-2 text-xs opacity-40">
              {new Date(c.created_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
