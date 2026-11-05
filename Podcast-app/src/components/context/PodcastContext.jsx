import { useEffect, useMemo, useState } from "react";
import { fetchPodcasts } from "../../api/fetchPata";
import { PodcastContext } from "./PodcastState";

export function PodcastProvider({ children }) {
  const [allPodcasts, setAllPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("date-desc");
  const [genre, setGenre] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchPodcasts(setAllPodcasts, setError, setLoading);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, sortKey, genre]);

  useEffect(() => {
    const calculatePageSize = () => {
      const screenW = window.innerWidth;
      if (screenW <= 1024) {
        setPageSize(10);
        return;
      }

      const cardWidth = 260;
      const maxRows = 2;
      const columns = Math.max(1, Math.floor(screenW / cardWidth));
      setPageSize(columns * maxRows);
    };

    calculatePageSize();
    window.addEventListener("resize", calculatePageSize);
    return () => window.removeEventListener("resize", calculatePageSize);
  }, []);

  const filtered = useMemo(() => {
    let data = [...allPodcasts];

    if (search.trim()) {
      const query = search.toLowerCase();
      data = data.filter((podcast) =>
        podcast.title.toLowerCase().includes(query)
      );
    }

    if (genre !== "all") {
      data = data.filter((podcast) => podcast.genres.includes(Number(genre)));
    }

    switch (sortKey) {
      case "title-asc":
        data.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        data.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "date-asc":
        data.sort((a, b) => new Date(a.updated) - new Date(b.updated));
        break;
      case "date-desc":
      default:
        data.sort((a, b) => new Date(b.updated) - new Date(a.updated));
        break;
    }

    return data;
  }, [allPodcasts, genre, search, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const value = useMemo(
    () => ({
      loading,
      error,
      search,
      setSearch,
      sortKey,
      setSortKey,
      genre,
      setGenre,
      page: currentPage,
      setPage,
      totalPages,
      podcasts: paged,
      allPodcastsCount: filtered.length,
      allPodcasts,
    }),
    [allPodcasts, currentPage, error, filtered.length, genre, loading, paged, search, setSearch, sortKey, totalPages]
  );

  return (
    <PodcastContext.Provider value={value}>{children}</PodcastContext.Provider>
  );
}
