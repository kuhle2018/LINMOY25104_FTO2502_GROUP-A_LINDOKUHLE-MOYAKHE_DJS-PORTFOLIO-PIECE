import { Link } from "react-router-dom";
import { formatDate } from "../Utils/FormatDate";
import styles from "./PodcastCard.module.css";
import GenreTags from "../UI/GenreTags";
import Artwork from "../UI/Artwork";

export default function PodcastCard({ podcast }) {
  return (
    <Link
      className={styles.card}
      to={`/show/${podcast.id}`}
      state={{ genres: podcast.genres }}
    >
      <div className={styles.artworkWrap}>
        <Artwork src={podcast.image} title={podcast.title} className={styles.artwork} />
        <span className={styles.seasonBadge}>
          {podcast.seasons} {podcast.seasons === 1 ? "season" : "seasons"}
        </span>
      </div>
      <div className={styles.content}>
        <h3>{podcast.title}</h3>
        <GenreTags genres={podcast.genres} />
        <p className={styles.updatedText}>
          <span className={styles.updatedDot} />
          Updated {formatDate(podcast.updated)}
        </p>
      </div>
    </Link>
  );
}
