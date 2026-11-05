import { useEffect, useState } from "react";

const palettes = [
  ["#143d3b", "#5a9a83"],
  ["#493453", "#b66f91"],
  ["#33456b", "#668bb5"],
  ["#65402e", "#d18b53"],
  ["#31544a", "#a3a957"],
];

function escapeXml(value) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&apos;",
    };

    return entities[character];
  });
}

function createFallbackArtwork(title) {
  const label = String(title || "Podcast").trim() || "Podcast";
  const initials = label
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
  const escapedInitials = escapeXml(initials);
  const escapedTitle = escapeXml(label.slice(0, 28));
  const hash = [...label].reduce(
    (total, character) => total + character.charCodeAt(0),
    0
  );
  const [start, end] = palettes[hash % palettes.length];
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">
      <defs>
        <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${start}"/>
          <stop offset="100%" stop-color="${end}"/>
        </linearGradient>
      </defs>
      <rect width="500" height="500" rx="40" fill="url(#background)"/>
      <circle cx="430" cy="72" r="115" fill="#ffffff" opacity=".08"/>
      <circle cx="55" cy="440" r="150" fill="#0b1c22" opacity=".12"/>
      <rect x="205" y="106" width="90" height="150" rx="45" fill="#fff8ed"/>
      <path d="M168 225a82 82 0 0 0 164 0" fill="none" stroke="#fff8ed" stroke-width="18" stroke-linecap="round"/>
      <path d="M250 308v42m-43 0h86" fill="none" stroke="#fff8ed" stroke-width="18" stroke-linecap="round"/>
      <text x="250" y="412" text-anchor="middle" fill="#fff8ed" font-family="Arial, sans-serif" font-size="54" font-weight="700">${escapedInitials}</text>
      <text x="250" y="458" text-anchor="middle" fill="#fff8ed" opacity=".86" font-family="Arial, sans-serif" font-size="16">${escapedTitle}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export default function Artwork({ src, title, className }) {
  const fallback = createFallbackArtwork(title);
  const [imageSrc, setImageSrc] = useState(src || fallback);

  useEffect(() => {
    setImageSrc(src || fallback);
  }, [src, fallback]);

  return (
    <img
      className={className}
      src={imageSrc}
      alt={`Artwork for ${title || "podcast"}`}
      onError={() => setImageSrc(fallback)}
    />
  );
}
