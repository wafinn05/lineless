import { useRef, useState } from "react";
import {
  galleryImages,
  pad3,
  type Restaurant,
} from "../../data/restaurants";
import { IconClose, IconShare, IconStar } from "../../icons";
import QueueLive from "./QueueLive";

interface Props {
  r: Restaurant | null;
  open: boolean;
  onClose: () => void;
  onBook: () => void;
}

export default function DetailSheet({ r, open, onClose, onBook }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);

  if (!r && !open) {
    // keep mounted only when needed
  }

  const imgs = r ? galleryImages(r.seed) : [];
  const yourNumber = r ? pad3(r.called + r.queue + 1) : "000";

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setSlide(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div
      className={`sheet${open ? " open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={r ? `Detail ${r.name}` : "Detail restoran"}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {r && (
        <>
          <button className="sheet-close" onClick={onClose} aria-label="Tutup">
            <IconClose />
          </button>
          <div className="sheet-inner">
            <div className="gallery">
              <div className="g-track" ref={trackRef} onScroll={onScroll}>
                {imgs.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt={`${r.name} — foto ${i + 1}`}
                    draggable={false}
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                ))}
              </div>
              <button className="g-close" onClick={onClose} aria-label="Tutup">
                <IconClose />
              </button>
              <button className="g-share" aria-label="Bagikan">
                <IconShare />
              </button>
              <div className="g-count">
                {slide + 1}/{imgs.length}
              </div>
              <div className="g-dots" aria-hidden>
                {imgs.map((_, i) => (
                  <i key={i} className={i === slide ? "on" : ""} />
                ))}
              </div>
            </div>

            <div className="d-body">
              <h2 className="d-title">{r.name}</h2>
              <div className="d-rating">
                <IconStar />
                {r.rating.toFixed(2)} <span>({r.reviews} ulasan)</span>
              </div>

              <hr className="d-hr" />
              <div className="d-owner">
                <div>
                  <div className="strong">{r.category}</div>
                  <div className="sub">
                    Buka {r.openHours} · {r.distanceKm.toFixed(1)} km
                  </div>
                </div>
                <img
                  src={`https://picsum.photos/seed/${r.seed}-host/120/120`}
                  alt={`Pemilik ${r.name}`}
                />
              </div>

              <hr className="d-hr" />
              <h3>Status antrian</h3>
              <QueueLive r={r} yourNumber={yourNumber} />

              <hr className="d-hr" />
              <h3>Tentang tempat ini</h3>
              <p className="d-about">
                {r.name} menyajikan {r.category.toLowerCase()} dengan suasana
                yang nyaman untuk nongkrong maupun makan bareng. Ambil antrean
                dari sini, pantau posisimu, dan datang tepat saat giliranmu
                tiba.
              </p>

              <div className="d-info">
                <div className="row">
                  <span>Jam operasional</span>
                  <b>{r.openHours}</b>
                </div>
                <div className="row">
                  <span>Kategori</span>
                  <b>{r.category}</b>
                </div>
                <div className="row">
                  <span>Jarak</span>
                  <b>{r.distanceKm.toFixed(1)} km</b>
                </div>
              </div>
            </div>

            <div className="d-bar">
              <div className="d-pill">
                <div>
                  <div className="q-label">Antrian ke</div>
                  <div className="q-num">{yourNumber}</div>
                </div>
                <button className="d-book" onClick={onBook}>
                  Book
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
