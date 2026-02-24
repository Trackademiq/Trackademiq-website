import { useEffect, useState } from "react";

export type BlogPostRaw = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  icon: string;
  content: string;
};

export function useBlogPosts(fallback: BlogPostRaw[] = []): {
  posts: BlogPostRaw[];
  loading: boolean;
  error: boolean;
} {
  const [posts, setPosts] = useState<BlogPostRaw[]>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);
    fetch("/blog-posts.json", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((data) => {
        if (cancelled) return;
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          setPosts(fallback);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setPosts(fallback);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { posts, loading, error };
}
