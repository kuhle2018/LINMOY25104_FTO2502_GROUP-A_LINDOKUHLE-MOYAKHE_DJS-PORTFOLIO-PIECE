import { useContext } from "react";
import styles from "./GenreFilter.module.css";
import { PodcastContext } from "../context/PodcastState";

export default function GenreFilter({ genres = [] }) {
  const { genre, setGenre } = useContext(PodcastContext);

  return (
    <label className={styles.field}>
      <span className={styles.label}>Genre</span>
      <select
        value={genre}
        onChange={(event) => setGenre(event.target.value)}
        aria-label="Genre"
      >
        <option value="all">All genres</option>
        {genres.map((item) => (
          <option key={item.id} value={item.id}>
            {item.title}
          </option>
        ))}
      </select>
    </label>
  );
}
