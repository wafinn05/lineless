import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IconUser, IconArrowUpRight } from "../icons";
import { useReveal } from "../hooks/useReveal";
import "./landing.css";

const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const BULAN = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

/* five distinct illustrated avatars — kept from the original design */
const AVATARS = [
  { bg: "#f0c8b4", hair: "#5a3a2a", skin: "#e8b89a", shirt: "#c8543a" },
  { bg: "#d8bce0", hair: "#4a2a3a", skin: "#e8c0a8", shirt: "#7a5a8a" },
  { bg: "#b4cce8", hair: "#3a2a1a", skin: "#d8a888", shirt: "#2a4a6a" },
  { bg: "#ecd8b0", hair: "#8a6a3a", skin: "#f0d0b0", shirt: "#c8a048" },
  { bg: "#bce8cc", hair: "#4a3a2a", skin: "#e0b898", shirt: "#3a8a5a" },
];

export default function Landing() {
  const [now, setNow] = useState(() => new Date());
  useReveal();

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const jam = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes(),
  ).padStart(2, "0")}`;
  const tanggal = `${HARI[now.getDay()]}, ${now.getDate()} ${BULAN[now.getMonth()]}`;

  return (
    <main className="ld-hero">
      <a href="#ld-cta" className="skip-link">
        Langsung ke Ambil Antrian
      </a>

      <nav className="ld-nav" aria-label="Utama">
        <div className="ld-brand">
          <img src="/logo.png" alt="LineLess" />
        </div>
        <Link to="/login" className="ld-profile" aria-label="Masuk atau daftar">
          <IconUser />
        </Link>
      </nav>

      <header className="ld-headline">
        <p className="ld-line1 reveal">Skip the Line</p>
        <h1 className="ld-line2 reveal" style={{ ["--reveal-index" as string]: 1 }}>
          Save Your Time
        </h1>
        <Link
          id="ld-cta"
          to="/login"
          className="ld-cta reveal"
          style={{ ["--reveal-index" as string]: 2 }}
        >
          Ambil Antrian
          <span className="cta-orb">
            <IconArrowUpRight />
          </span>
        </Link>
      </header>

      <aside className="ld-time" aria-label="Waktu saat ini">
        <span>{jam}</span>
        <span className="date">{tanggal}</span>
      </aside>

      <aside className="ld-customers">
        <div className="ld-avatars" aria-hidden>
          {AVATARS.map((a, i) => (
            <div className="av" key={i}>
              <svg viewBox="0 0 40 40">
                <rect width="40" height="40" fill={a.bg} />
                <circle cx="20" cy="15.5" r="8" fill={a.hair} />
                <circle cx="20" cy="16" r="6.5" fill={a.skin} />
                <path d="M8 40 Q20 26 32 40 Z" fill={a.shirt} />
              </svg>
            </div>
          ))}
        </div>
        <div>
          <div className="cnt">5 pelanggan baru</div>
          <div className="more">+23 lainnya hari ini</div>
        </div>
      </aside>

      <aside className="ld-info">
        <div className="thumb" aria-hidden>
          <svg viewBox="0 0 62 52" preserveAspectRatio="xMidYMid slice">
            <rect width="62" height="52" fill="#7A1E27" />
            <rect y="0" width="62" height="34" fill="#a12734" />
            <rect x="6" y="8" width="20" height="20" fill="#FFC857" />
            <path d="M30 20 Q30 12 40 12 Q50 12 50 20 L50 40 L30 40 Z" fill="#FFF3E6" />
            <ellipse cx="40" cy="18" rx="11" ry="8" fill="#FF6B6B" />
            <rect y="40" width="62" height="12" fill="#611620" />
          </svg>
        </div>
        <p>
          Pantau antreanmu real-time dari HP dan datang tepat saat giliranmu
          tiba.
        </p>
      </aside>
    </main>
  );
}
