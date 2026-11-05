import { useContext } from "react";
import styles from "./SearchBar.module.css";
import { PodcastContext } from "./context/PodcastState";

export default function SearchBar() {
  const { search, setSearch } = useContext(PodcastContext);

  return (
    <label className={styles.searchField}>
      <span className={styles.label}>Search shows</span>
      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search by podcast title"
        aria-label="Search shows"
      />
    </label>
  );
}
