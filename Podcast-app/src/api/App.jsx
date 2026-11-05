import { Routes, Route } from "react-router-dom";
import Header from "../components/UI/Header";
import Home from "../components/pages/Home";
import ShowDetail from "../components/pages/ShowDetail";
import { PodcastProvider } from "../components/context/PodcastContext";

export default function App() {
  return (
    <>
      <Header />
      <PodcastProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show/:id" element={<ShowDetail />} />
        </Routes>
      </PodcastProvider>
    </>
  );
}