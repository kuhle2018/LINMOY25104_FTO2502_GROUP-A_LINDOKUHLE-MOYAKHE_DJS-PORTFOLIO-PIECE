import { useContext } from "react";
import styles from "./SortSelect.module.css";
import { PodcastContext } from "./context/PodcastState";
import { SORT_OPTIONS } from "./context/PodcastState";

export default function SortSelect() {
  const { sortKey, setSortKey } = useContext(PodcastContext);

  return (
    <label className={styles.field}>
      <span className={styles.label}>Sort by</span>
      <select
        value={sortKey}
        onChange={(event) => setSortKey(event.target.value)}
        aria-label="Sort by"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
