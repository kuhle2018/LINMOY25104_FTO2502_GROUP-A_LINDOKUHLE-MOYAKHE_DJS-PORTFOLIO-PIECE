import { HashRouter } from "react-router-dom";
import PodcastApp from "./api/App.jsx";

export default function App() {
  return (
    <HashRouter>
      <PodcastApp />
    </HashRouter>
  );
}
