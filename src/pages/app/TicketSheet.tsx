import { pad3, type Restaurant } from "../../data/restaurants";

/* physical-ticket struk: mono details, dotted leaders, punched perforation */

const BULAN = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

const BAR_WIDTHS = [
  3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2, 3, 2, 1, 3, 4, 1, 2, 1,
  3, 2, 4, 1, 2, 3, 1, 2, 1, 4, 2, 3, 1, 2, 3, 1, 2, 4, 1, 2,
];

function Barcode() {
  let x = 0;
  const rects: { x: number; w: number }[] = [];
  BAR_WIDTHS.forEach((w, i) => {
    if (i % 2 === 0) rects.push({ x, w });
    x += w;
  });
  return (
    <svg
      viewBox={`0 0 ${x} 46`}
      preserveAspectRatio="none"
      fill="#333333"
      aria-hidden
    >
      {rects.map((r, i) => (
        <rect key={i} x={r.x} width={r.w} height="46" />
      ))}
    </svg>
  );
}

interface Props {
  r: Restaurant | null;
  open: boolean;
  takenAt?: string;
  onDone: () => void;
  onDismiss: () => void;
}

export default function TicketSheet({
  r,
  open,
  takenAt,
  onDone,
  onDismiss,
}: Props) {
  if (!r) return <div className={`cf${open ? " open" : ""}`} />;

  const yourNumber = pad3(r.called + r.queue + 1);
  const code = r.name.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
  const now = new Date();
  const time =
    takenAt ??
    `${now.getDate()} ${BULAN[now.getMonth()]} · ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  return (
    <div
      className={`cf${open ? " open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Struk antrean"
      onClick={(e) => {
        if (e.target === e.currentTarget) onDismiss();
      }}
    >
      <div className="cf-card">
        <div className="tk-head">
          <img src="/logo.png" alt="LineLess" />
        </div>

        <div className="tk-resto">{r.name}</div>
        <div className="tk-cat">{r.category}</div>

        <div className="tk-numwrap">
          <div className="tk-numlab">NOMOR ANTREAN</div>
          <div className="tk-num">{yourNumber}</div>
        </div>

        <div className="tk-perf" aria-hidden />

        <div>
          <div className="tk-row">
            <span>Sedang dipanggil</span>
            <i className="lead" />
            <b>{pad3(r.called)}</b>
          </div>
          <div className="tk-row">
            <span>Antrean di depan</span>
            <i className="lead" />
            <b>{r.queue} orang</b>
          </div>
          <div className="tk-row">
            <span>Estimasi tunggu</span>
            <i className="lead" />
            <b>± {r.waitMin} menit</b>
          </div>
          <div className="tk-row">
            <span>Waktu ambil</span>
            <i className="lead" />
            <b>{time}</b>
          </div>
        </div>

        <div className="tk-perf" aria-hidden />

        <div className="tk-barcode">
          <Barcode />
        </div>
        <div className="tk-code">
          LINELESS-{code}-{yourNumber}
        </div>

        <button className="cf-btn" onClick={onDone}>
          Selesai
        </button>
      </div>
    </div>
  );
}
