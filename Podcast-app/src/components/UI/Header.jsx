import styles from "./Header.module.css";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className={styles.appHeader}>
      <div className={styles.headerInner}>
        <Link className={styles.brand} to="/" aria-label="Podspace home">
          <span className={styles.brandMark} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className={styles.brandName}>podspace</span>
        </Link>
        <span className={styles.headerNote}>GOOD STORIES, WELL TOLD.</span>
      </div>
    </header>
  );
}