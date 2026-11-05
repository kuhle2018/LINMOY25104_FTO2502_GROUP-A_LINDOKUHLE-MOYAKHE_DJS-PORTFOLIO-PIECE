import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PodcastDetail.module.css";
import { formatDate } from "../Utils/FormatDate";
import GenreTags from "../UI/GenreTags";
import Artwork from "../UI/Artwork";

export default function PodcastDetail({ podcast, genres }) {
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(0);
  const seasons = Array.isArray(podcast.seasons) ? podcast.seasons : [];
  const season = seasons[selectedSeasonIndex];
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* Back Button */}
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* Header */}
      <div className={styles.header}>
        <Artwork
          src={podcast.image}
          title={podcast.title}
          className={styles.cover}
        />
        <div>
          <h1 className={styles.title}>{podcast.title}</h1>
          <p className={styles.description}>{podcast.description}</p>

          <div className={styles.metaInfo}>
            <div className={styles.seasonInfo}>
              <div>
                <p>Genres</p>
                <GenreTags genres={genres || podcast.genres || []} />
              </div>

              <div>
                <p>Last Updated:</p>
                <strong>{formatDate(podcast.updated)}</strong>
              </div>

              <div>
                <p>Total Seasons:</p>
                <strong>{seasons.length} Seasons</strong>
              </div>

              <div>
                <p>Total Episodes:</p>
                <strong>
                  {seasons.reduce(
                    (acc, s) => acc + s.episodes.length,
                    0
                  )}{" "}
                  Episodes
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Season Details */}
      <div className={styles.seasonDetails}>
        {season ? (
          <>
            <div className={styles.seasonIntro}>
              <div className={styles.left}>
                <Artwork
                  className={styles.seasonCover}
                  src={season.image || podcast.image}
                  title={season.title || podcast.title}
                />
                <div>
                  <h3>
                    Season {selectedSeasonIndex + 1}: {season.title}
                  </h3>
                  <p>{season.description}</p>
                  <p className={styles.releaseInfo}>
                    {season.episodes.length} Episodes
                  </p>
                </div>
              </div>
              <select
                value={selectedSeasonIndex}
                onChange={(e) => setSelectedSeasonIndex(Number(e.target.value))}
                className={styles.dropdown}
                aria-label="Select season"
              >
                {seasons.map((s, i) => (
                  <option key={i} value={i}>
                    Season {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.episodeList}>
              {season.episodes.map((ep, index) => (
                <div key={index} className={styles.episodeCard}>
                  <Artwork
                    className={styles.episodeCover}
                    src={ep.image || season.image || podcast.image}
                    title={ep.title || season.title || podcast.title}
                  />
                  <div className={styles.episodeInfo}>
                    <p className={styles.episodeTitle}>
                      Episode {index + 1}: {ep.title}
                    </p>
                    <p className={styles.episodeDesc}>{ep.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className={styles.emptySeasons}>No season details are available.</p>
        )}
      </div>
    </div>
  );
}