import { useContext, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { fetchSinglePodcast } from "../../api/fetchPata";
import { Loading, Error, PodcastDetail } from "../index";
import { PodcastContext } from "../context/PodcastState";

/**
 * ShowDetail page component for displaying detailed information about a single podcast.
 *
 * - Extracts the podcast ID from the URL using React Router's `useParams`.
 * - Optionally retrieves genre data from navigation state via `useLocation`.
 * - Fetches podcast data from the API on mount using `fetchSinglePodcast`.
 * - Displays a loading state, error message, or the detailed podcast view.
 *
 * Components used:
 * - `Loading` while fetching data
 * - `Error` if fetch fails
 * - `PodcastDetail` when data is successfully retrieved
 *
 * @returns {JSX.Element} The detailed view of a selected podcast.
 */
export default function ShowDetail() {
  const { id } = useParams();
  const location = useLocation();
  const { allPodcasts } = useContext(PodcastContext);
  const genres =
    location.state?.genres ||
    allPodcasts.find((item) => String(item.id) === id)?.genres;

  const [podcast, setPodcast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSinglePodcast(id, setPodcast, setError, setLoading);
  }, [id]);
  return (
    <>
      {loading && <Loading message="Loading podcast..." />}

      {error && (
        <Error message={`Error occurred while fetching podcast: ${error}`} />
      )}
      {!loading && !error && (
        <PodcastDetail podcast={podcast} genres={genres} />
      )}
    </>
  );
}