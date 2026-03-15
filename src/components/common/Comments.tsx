"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase";
import BeanAvatar from "@/components/common/BeanAvatar";

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
        console.error("Failed to load comments:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        });
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
        console.error("Failed to submit comment:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        });
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

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-white/5">
          <BeanAvatar
            variant="reaction"
            clickable={false}
            className="h-full w-full"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[var(--color-text)]">댓글</h2>
          <p className="text-sm text-[var(--color-sub)]">Bean is listening</p>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-[var(--color-sub)]">
              name
            </label>
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="이름을 적어주세요"
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-[var(--color-text)] outline-none transition focus:border-[var(--color-accent)]"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-[var(--color-sub)]">
              comment
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              placeholder="짧은 감상이나 메모를 남겨주세요"
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-7 text-[var(--color-text)] outline-none transition focus:border-[var(--color-accent)]"
            />
          </div>

          <button
            type="button"
            onClick={submitComment}
            disabled={submitting}
            className="rounded-full border border-white/20 px-4 py-2 text-sm text-[var(--color-text)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "등록 중..." : "댓글 등록"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-sm text-[var(--color-sub)]">불러오는 중...</div>
        ) : comments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-sm text-[var(--color-sub)]">
            아직 댓글이 없습니다. Bean이 첫 메모를 기다리고 있어요.
          </div>
        ) : (
          comments.map((comment) => (
            <article
              key={comment.id}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/20 text-xs font-semibold text-[var(--color-text)]">
                  {comment.author.slice(0, 1).toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <div className="text-sm font-semibold text-[var(--color-text)]">
                      {comment.author}
                    </div>
                    <div className="text-xs text-[var(--color-sub)] opacity-70">
                      {new Date(comment.created_at).toLocaleString()}
                    </div>
                  </div>

                  <div className="mt-2 whitespace-pre-wrap text-sm leading-7 text-[var(--color-sub)]">
                    {comment.content}
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}