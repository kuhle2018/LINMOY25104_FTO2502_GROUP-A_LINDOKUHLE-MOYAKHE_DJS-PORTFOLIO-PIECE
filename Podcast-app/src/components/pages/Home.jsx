import { useContext } from "react";
import {
  SearchBar,
  SortSelect,
  GenreFilter,
  PodcastGrid,
  Pagination,
  Loading,
  Error,
} from "../index";
import { PodcastContext } from "../context/PodcastState";
import { genres } from "../context/data";
import styles from "./Home.module.css";

/**
 * Home page of the Podcast Explorer app.
 *
 * - Displays the main podcast browsing interface.
 * - Includes search, genre filter, and sort controls.
 * - Shows a loading indicator or error message based on fetch state.
 * - Renders the podcast grid and pagination once data is loaded.
 *
 * Context:
 * - Consumes `PodcastContext` to access podcast data, loading, and error states.
 *
 * @returns {JSX.Element} The home page content with filters, results, and feedback states.
 */
export default function Home() {
  const { loading, error, allPodcastsCount } = useContext(PodcastContext);

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            YOUR NEXT LISTEN STARTS HERE
          </p>
          <h1>
            Find a show
            <br />
            <span>worth staying up for.</span>
          </h1>
          <p className={styles.intro}>
            Thought-provoking conversations, fresh perspectives, and stories
            that stay with you.
          </p>
        </div>
        <div className={styles.heroAside} aria-hidden="true">
          <span className={styles.heroIcon}>◖</span>
          <span className={styles.heroAsideText}>PRESS PLAY ON SOMETHING GOOD</span>
        </div>
      </section>

      <section className={styles.browseSection} aria-label="Browse podcasts">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.sectionEyebrow}>THE LIBRARY</p>
            <h2>Explore podcasts</h2>
          </div>
          {!loading && !error && (
            <span className={styles.count}>
              {allPodcastsCount.toLocaleString()} shows
            </span>
          )}
        </div>

        <div className={styles.controls}>
          <SearchBar />
          <GenreFilter genres={genres} />
          <SortSelect />
        </div>

        {loading && <Loading message="Loading podcasts..." />}
        {error && (
          <Error message={`Error occurred while fetching podcasts: ${error}`} />
        )}

        {!loading && !error && (
          <>
            <PodcastGrid />
            <Pagination />
          </>
        )}
      </section>
    </main>
  );
}