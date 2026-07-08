import { pad3, type Restaurant } from "../../data/restaurants";
import { IconMegaphone } from "../../icons";

/* Shared live-queue block: dominant "sedang dipanggil" card,
   thin progress toward your turn, two divider-grouped stats.
   One dominant element instead of three equal cards. */
export default function QueueLive({
  r,
  yourNumber,
}: {
  r: Restaurant;
  yourNumber: string;
}) {
  const progress = Math.round((r.called / (r.called + r.queue + 1)) * 100);

  return (
    <>
      <div className="q-live">
        <div>
          <div className="lab">Sedang dipanggil</div>
          <div className="num">{pad3(r.called)}</div>
          <div className="hint">
            Nomormu <b>{yourNumber}</b> · {r.queue} antrean di depan
          </div>
        </div>
        <div className="orb">
          <IconMegaphone />
        </div>
      </div>

      <div className="q-prog">
        <div className="q-prog-bar" style={{ width: `${progress}%` }} />
      </div>

      <div className="q-sub">
        <div>
          <div className="v">
            ±{r.waitMin}
            <span>mnt</span>
          </div>
          <div className="l">Estimasi tunggu</div>
        </div>
        <div>
          <div className="v">{r.queue}</div>
          <div className="l">Antrean di depan</div>
        </div>
      </div>
    </>
  );
}
