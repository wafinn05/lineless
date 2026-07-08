import { IconGear, IconStore, IconUser } from "../../icons";
import type { MenuKind } from "./MenuSheet";

interface Props {
  anchor: DOMRect | null;
  onPick: (kind: Exclude<MenuKind, null>) => void;
  onClose: () => void;
}

export default function ProfileMenu({ anchor, onPick, onClose }: Props) {
  if (!anchor) return null;

  return (
    <>
      <div className="pm-backdrop" onClick={onClose} />
      <div
        className="profile-menu"
        role="menu"
        style={{
          top: anchor.bottom + 8,
          right: window.innerWidth - anchor.right,
        }}
      >
        <button className="pm-item" role="menuitem" onClick={() => onPick("profil")}>
          <span className="pm-ic">
            <IconUser />
          </span>
          Profil
        </button>
        <button className="pm-item" role="menuitem" onClick={() => onPick("tambah")}>
          <span className="pm-ic">
            <IconStore />
          </span>
          Tambah Resto
        </button>
        <button className="pm-item" role="menuitem" onClick={() => onPick("setting")}>
          <span className="pm-ic">
            <IconGear />
          </span>
          Setting
        </button>
      </div>
    </>
  );
}
