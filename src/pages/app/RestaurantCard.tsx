import { useState } from "react";
import { cardImage, type Restaurant } from "../../data/restaurants";
import { IconHeart, IconStar } from "../../icons";

interface Props {
  r: Restaurant;
  fav: boolean;
  onOpen: (r: Restaurant) => void;
  onToggleFav: (id: number) => void;
  revealIndex?: number;
}

export default function RestaurantCard({
  r,
  fav,
  onOpen,
  onToggleFav,
  revealIndex = 0,
}: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <article
      className="rcard reveal"
      style={{ ["--reveal-index" as string]: revealIndex }}
      onClick={() => onOpen(r)}
    >
      <div className={`img${loaded ? "" : " img-skeleton"}`}>
        <img
          src={cardImage(r.seed)}
          alt={`${r.name} — ${r.category}`}
          loading="lazy"
          draggable={false}
          className={loaded ? "loaded" : ""}
          onLoad={() => setLoaded(true)}
        />
        <button
          className={`fav${fav ? " on" : ""}`}
          aria-label={fav ? "Hapus dari favorit" : "Simpan ke favorit"}
          aria-pressed={fav}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFav(r.id);
          }}
        >
          <IconHeart />
        </button>
      </div>
      <div className="top">
        <span className="name">{r.name}</span>
        <span className="rating">
          <IconStar />
          {r.rating.toFixed(2)} <span className="rev">({r.reviews})</span>
        </span>
      </div>
      <div className="meta">
        {r.category} · {r.distanceKm.toFixed(1)} km
      </div>
      <div className="qline">
        <b>{r.queue} orang</b> antre · ± {r.waitMin} menit tunggu
      </div>
    </article>
  );
}
