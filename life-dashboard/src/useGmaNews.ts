import { useEffect, useState } from "react";
import type { NewsItem } from "./types";

const FEEDS = [
  { category: "News", url: "https://data.gmanetwork.com/gno/rss/news/feed.xml" },
  { category: "Money", url: "https://data.gmanetwork.com/gno/rss/money/feed.xml" },
  { category: "Sports", url: "https://data.gmanetwork.com/gno/rss/sports/feed.xml" },
];

interface UseNewsResult {
  headlines: NewsItem[];
  loading: boolean;
  error: string | null;
}

function firstItemTitle(xmlText: string): string | null {
  const doc = new DOMParser().parseFromString(xmlText, "text/xml");
  const title = doc.querySelector("item > title")?.textContent;
  return title ? title.trim() : null;
}

export function useGmaNews(): UseNewsResult {
  const [headlines, setHeadlines] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    Promise.all(
      FEEDS.map((feed) =>
        fetch(feed.url)
          .then((res) => {
            if (!res.ok) throw new Error(`GMA News error (${res.status})`);
            return res.text();
          })
          .then((xml) => ({ category: feed.category, headline: firstItemTitle(xml) })),
      ),
    )
      .then((results) => {
        if (cancelled) return;
        const items: NewsItem[] = results
          .filter((r): r is { category: string; headline: string } => Boolean(r.headline))
          .map((r, index) => ({ id: String(index), headline: r.headline, category: r.category }));
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
