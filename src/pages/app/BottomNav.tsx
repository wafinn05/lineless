import { IconChat, IconCompass, IconHeart, IconTicket } from "../../icons";

export type Tab = "jelajah" | "favorit" | "antrian" | "pesan";

const TABS: { id: Tab; label: string; icon: typeof IconCompass }[] = [
  { id: "jelajah", label: "Jelajah", icon: IconCompass },
  { id: "favorit", label: "Favorit", icon: IconHeart },
  { id: "antrian", label: "Antrian", icon: IconTicket },
  { id: "pesan", label: "Pesan", icon: IconChat },
];

export default function BottomNav({
  active,
  onChange,
}: {
  active: Tab;
  onChange: (t: Tab) => void;
}) {
  return (
    <nav className="tabbar" aria-label="Navigasi utama">
      {TABS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          className={`tab${active === id ? " active" : ""}`}
          aria-current={active === id ? "page" : undefined}
          onClick={() => onChange(id)}
        >
          <Icon />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
