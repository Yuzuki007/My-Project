import { useEffect, useState } from "react";
import type { NewsItem } from "./types";

const API_KEY = import.meta.env.VITE_NEWSAPI_KEY;

interface UseNewsResult {
  headlines: NewsItem[];
  loading: boolean;
  error: string | null;
}

function categoryFromUrl(url: string): string {
  try {
    const segments = new URL(url).pathname.split("/").filter(Boolean);
    const label = segments.find((s) => !/^\d+$/.test(s) && s.length >= 2);
    if (!label) return "News";
    return label.charAt(0).toUpperCase() + label.slice(1).replace(/-/g, " ");
  } catch {
    return "News";
  }
}

export function useCnnNews(): UseNewsResult {
  const [headlines, setHeadlines] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!API_KEY) {
      setError("Missing API key — add VITE_NEWSAPI_KEY to .env.local");
      setLoading(false);
      return;
    }

    let cancelled = false;
    const url = `https://newsapi.org/v2/top-headlines?sources=cnn&pageSize=3&apiKey=${API_KEY}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`CNN API error (${res.status})`);
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        if (json.status !== "ok") throw new Error(json.message ?? "CNN API returned an error");
        const items: NewsItem[] = (json.articles ?? [])
          .slice(0, 3)
          .map((article: { url: string; title: string }, index: number) => ({
            id: String(index),
            headline: article.title.replace(/\s*-\s*CNN$/i, ""),
            category: categoryFromUrl(article.url),
          }));
        setHeadlines(items);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { headlines, loading, error };
}
