"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase";

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
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void loadComments();
  }, [slug, category]);

  async function loadComments() {
    setLoading(true);

    try {
      const supabase = getSupabaseClient();

      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("slug", slug)
        .eq("category", category)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to load comments:", error);
        return;
      }

      setComments((data as Comment[]) ?? []);
    } catch (error) {
      console.error("Failed to load comments:", error);
    } finally {
      setLoading(false);
    }
  }

  async function submitComment() {
    const trimmedAuthor = author.trim();
    const trimmedContent = content.trim();

    if (!trimmedAuthor || !trimmedContent || submitting) return;

    setSubmitting(true);

    try {
      const supabase = getSupabaseClient();

      const { error } = await supabase.from("comments").insert({
        slug,
        category,
        author: trimmedAuthor,
        content: trimmedContent,
      });

      if (error) {
        console.error("Failed to submit comment:", error);
        return;
      }

      setAuthor("");
      setContent("");

      await loadComments();
    } catch (error) {
      console.error("Failed to submit comment:", error);
    } finally {
      setSubmitting(false);
    }
  }

  async function deleteComment(id: number) {
    try {
      const supabase = getSupabaseClient();

      const { error } = await supabase.from("comments").delete().eq("id", id);

      if (error) {
        console.error("Failed to delete comment:", error);
        return;
      }

      await loadComments();
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  }

  return (
    <div className="mx-auto mt-16 max-w-3xl">
      <h3 className="mb-6 text-lg font-semibold text-[var(--color-text)]">
        댓글
      </h3>

      <div className="mb-8 space-y-3">
        <input
          placeholder="닉네임"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-[var(--color-text)] outline-none transition focus:border-[var(--color-accent)]"
        />

        <textarea
          placeholder="댓글을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-[var(--color-text)] outline-none transition focus:border-[var(--color-accent)]"
        />

        <button
          type="button"
          onClick={submitComment}
          disabled={submitting}
          className="rounded-full border border-white/20 px-4 py-2 text-sm text-[var(--color-text)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "등록 중..." : "댓글 등록"}
        </button>
      </div>

      <div className="space-y-6">
        {loading ? (
          <div className="text-sm text-[var(--color-sub)]">불러오는 중...</div>
        ) : comments.length === 0 ? (
          <div className="text-sm text-[var(--color-sub)]">
            아직 댓글이 없습니다.
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-b border-white/10 pb-4">
              <div className="flex items-center justify-between gap-4">
                <div className="text-sm font-semibold text-[var(--color-text)]">
                  {comment.author}
                </div>

                <button
                  type="button"
                  onClick={() => deleteComment(comment.id)}
                  className="text-xs text-[var(--color-sub)] opacity-60 transition hover:opacity-100"
                >
                  삭제
                </button>
              </div>

              <div className="mt-2 whitespace-pre-wrap text-sm leading-7 text-[var(--color-sub)]">
                {comment.content}
              </div>

              <div className="mt-2 text-xs text-[var(--color-sub)] opacity-50">
                {new Date(comment.created_at).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}