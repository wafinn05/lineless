import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  categories,
  initialMessages,
  pad3,
  restaurants,
  type ActiveQueue,
  type Restaurant,
} from "../../data/restaurants";
import {
  IconBack,
  IconBell,
  IconHeart,
  IconPin,
  IconSearch,
  IconTicket,
  IconUser,
} from "../../icons";
import { useDragScroll } from "../../hooks/useDragScroll";
import { useReveal } from "../../hooks/useReveal";
import RestaurantCard from "./RestaurantCard";
import DetailSheet from "./DetailSheet";
import TicketSheet from "./TicketSheet";
import MenuSheet, { type MenuKind } from "./MenuSheet";
import ProfileMenu from "./ProfileMenu";
import BottomNav, { type Tab } from "./BottomNav";
import EmptyState from "./EmptyState";
import QueueLive from "./QueueLive";
import "./app.css";

const BULAN = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

export default function AppShell() {
  const [tab, setTab] = useState<Tab>("jelajah");
  const [chip, setChip] = useState(0);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [detail, setDetail] = useState<Restaurant | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [ticketOpen, setTicketOpen] = useState(false);
  const [activeQueue, setActiveQueue] = useState<ActiveQueue | null>(null);
  const [menuAnchor, setMenuAnchor] = useState<DOMRect | null>(null);
  const [menuKind, setMenuKind] = useState<MenuKind>(null);
  const profileRef = useRef<HTMLButtonElement>(null);

  const chipsRef = useDragScroll<HTMLDivElement>();
  const rowRef = useDragScroll<HTMLDivElement>();

  useReveal([tab, favorites.size]);

  const toggleFav = (id: number) =>
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const openDetail = (r: Restaurant) => {
    setDetail(r);
    setDetailOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeDetail = () => {
    setDetailOpen(false);
    document.body.style.overflow = "";
  };

  const bookDone = () => {
    if (detail) {
      const now = new Date();
      setActiveQueue({
        restaurant: detail,
        number: pad3(detail.called + detail.queue + 1),
        takenAt: `${now.getDate()} ${BULAN[now.getMonth()]} · ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`,
      });
    }
    setTicketOpen(false);
    closeDetail();
    setTab("antrian");
    window.scrollTo(0, 0);
  };

  const switchTab = (t: Tab) => {
    setTab(t);
    window.scrollTo(0, 0);
  };

  const favList = useMemo(
    () => restaurants.filter((r) => favorites.has(r.id)),
    [favorites],
  );

  return (
    <div className="app-root">
      <a href="#app-main" className="skip-link">
        Langsung ke konten
      </a>

      {/* ================= JELAJAH ================= */}
      {tab === "jelajah" && (
        <main id="app-main">
          <header className="hx">
            <div className="hx-inner">
              <div className="hx-top">
                <Link to="/" className="hx-btn" aria-label="Kembali ke beranda">
                  <IconBack />
                </Link>
                <div className="hx-loc">
                  <IconPin />
                  Jakarta
                </div>
                <button
                  ref={profileRef}
                  className="hx-btn"
                  aria-label="Menu profil"
                  aria-haspopup="menu"
                  onClick={() =>
                    setMenuAnchor(
                      menuAnchor
                        ? null
                        : (profileRef.current?.getBoundingClientRect() ?? null),
                    )
                  }
                >
                  <IconUser />
                </button>
              </div>
              <h1 className="hx-greet">Hai! Mau makan di mana hari ini?</h1>
            </div>
          </header>

          <div className="sx">
            <div className="sx-box" role="search">
              <IconSearch />
              <div>
                <div className="t1">Cari restoran</div>
                <div className="t2">Jenis makanan · Lokasi terdekat</div>
              </div>
            </div>
          </div>

          <div className="chips no-scrollbar" ref={chipsRef}>
            {categories.map((c, i) => (
              <button
                key={c}
                className={`chip${i === chip ? " active" : ""}`}
                onClick={() => setChip(i)}
              >
                {c}
              </button>
            ))}
          </div>

          <section className="sec">
            <div className="sec-head">
              <h2>Paling relevan</h2>
              <span>{restaurants.length} RESTO</span>
            </div>
            <div className="row-scroll no-scrollbar" ref={rowRef}>
              {restaurants.slice(0, 4).map((r, i) => (
                <RestaurantCard
                  key={r.id}
                  r={r}
                  fav={favorites.has(r.id)}
                  onOpen={openDetail}
                  onToggleFav={toggleFav}
                  revealIndex={i}
                />
              ))}
            </div>
          </section>

          <section className="sec">
            <div className="sec-head">
              <h2>Jelajahi tempat baru</h2>
            </div>
            <div className="rgrid">
              {restaurants.map((r, i) => (
                <RestaurantCard
                  key={r.id}
                  r={r}
                  fav={favorites.has(r.id)}
                  onOpen={openDetail}
                  onToggleFav={toggleFav}
                  revealIndex={i % 3}
                />
              ))}
            </div>
          </section>
        </main>
      )}

      {/* ================= FAVORIT ================= */}
      {tab === "favorit" && (
        <main id="app-main">
          <div className="page-head">
            <h1>Favorit</h1>
            {favList.length > 0 && (
              <span className="count">{favList.length} TERSIMPAN</span>
            )}
          </div>
          <div className="page-body">
            {favList.length === 0 ? (
              <EmptyState
                icon={<IconHeart />}
                title="Belum ada favorit"
                body="Ketuk ikon hati pada restoran untuk menyimpannya ke sini."
                actionLabel="Jelajahi restoran"
                onAction={() => switchTab("jelajah")}
              />
            ) : (
              <div className="rgrid">
                {favList.map((r, i) => (
                  <RestaurantCard
                    key={r.id}
                    r={r}
                    fav
                    onOpen={openDetail}
                    onToggleFav={toggleFav}
                    revealIndex={i % 3}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      )}

      {/* ================= ANTRIAN ================= */}
      {tab === "antrian" && (
        <main id="app-main">
          <div className="page-head">
            <h1>Antrean</h1>
          </div>
          <div className="page-body">
            {!activeQueue ? (
              <EmptyState
                icon={<IconTicket />}
                title="Belum ada antrean aktif"
                body="Ambil antrean dari tab Jelajah — status real-time-nya akan muncul di sini."
                actionLabel="Ambil antrean"
                onAction={() => switchTab("jelajah")}
              />
            ) : (
              <div className="aq reveal">
                <div className="aq-resto">{activeQueue.restaurant.name}</div>
                <div className="aq-cat">
                  {activeQueue.restaurant.category} · No. {activeQueue.number}
                </div>
                <QueueLive
                  r={activeQueue.restaurant}
                  yourNumber={activeQueue.number}
                />
                <div className="aq-actions">
                  <button
                    className="aq-tiket"
                    onClick={() => {
                      setDetail(activeQueue.restaurant);
                      setTicketOpen(true);
                    }}
                  >
                    Lihat Struk
                  </button>
                  <button
                    className="aq-cancel"
                    onClick={() => setActiveQueue(null)}
                  >
                    Batalkan
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      )}

      {/* ================= PESAN ================= */}
      {tab === "pesan" && (
        <main id="app-main">
          <div className="page-head">
            <h1>Pesan</h1>
          </div>
          <div className="page-body">
            <div className="msg-list">
              {initialMessages.map((m) => (
                <div key={m.id} className={`msg${m.unread ? " unread" : ""}`}>
                  <div className="msg-av" style={{ background: m.color }}>
                    {m.system ? <IconBell /> : m.initial}
                  </div>
                  <div className="msg-mid">
                    <div className="msg-name">
                      <b>{m.name}</b>
                      <span className="t">{m.time}</span>
                    </div>
                    <div className="msg-text">{m.text}</div>
                  </div>
                  <div className={`msg-dot${m.unread ? "" : " read"}`} />
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      <BottomNav active={tab} onChange={switchTab} />

      <DetailSheet
        r={detail}
        open={detailOpen}
        onClose={closeDetail}
        onBook={() => setTicketOpen(true)}
      />

      <TicketSheet
        r={detail}
        open={ticketOpen}
        takenAt={activeQueue?.takenAt}
        onDone={bookDone}
        onDismiss={() => setTicketOpen(false)}
      />

      <MenuSheet kind={menuKind} onClose={() => setMenuKind(null)} />

      {menuAnchor && (
        <ProfileMenu
          anchor={menuAnchor}
          onClose={() => setMenuAnchor(null)}
          onPick={(k) => {
            setMenuAnchor(null);
            setMenuKind(k);
          }}
        />
      )}
    </div>
  );
}
