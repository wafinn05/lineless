import { useNavigate } from "react-router-dom";

export type MenuKind = "profil" | "tambah" | "setting" | null;

interface Props {
  kind: MenuKind;
  onClose: () => void;
}

function Field({
  id,
  label,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="ms-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} className="ms-input" type={type} placeholder={placeholder} />
    </div>
  );
}

function Toggle({ label, defaultOn }: { label: string; defaultOn?: boolean }) {
  return (
    <label className="ms-toggle">
      <span>{label}</span>
      <input type="checkbox" defaultChecked={defaultOn} />
      <i aria-hidden />
    </label>
  );
}

export default function MenuSheet({ kind, onClose }: Props) {
  const navigate = useNavigate();
  const logout = () => navigate("/login");

  return (
    <div
      className={`cf${kind ? " open" : ""}`}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="cf-card">
        {kind === "profil" && (
          <>
            <div className="ms-head">
              <div className="ms-avatar" aria-hidden>
                W
              </div>
              <div>
                <div className="ms-name">Wafin</div>
                <div className="ms-sub">muhammadwafin16@gmail.com</div>
              </div>
            </div>
            <div className="ms-list">
              <div className="ms-row">
                <span>Nomor HP</span>
                <b className="mono">+62 812-3456-789</b>
              </div>
              <div className="ms-row">
                <span>Total antrean</span>
                <b>12×</b>
              </div>
              <div className="ms-row">
                <span>Member sejak</span>
                <b>Jul 2026</b>
              </div>
            </div>
            <button className="cf-btn ghost" onClick={logout}>
              Keluar
            </button>
          </>
        )}

        {kind === "tambah" && (
          <>
            <h3 className="ms-title">Tambah Resto</h3>

            <div className="ms-section">Data Usaha</div>
            <div className="ms-fields">
              <Field id="tr-nama" label="Nama restoran / cafe" placeholder="Kopi Pagi Hari" />
              <Field id="tr-pic" label="Nama pemilik / PIC" placeholder="Rendra Wijaya" />
              <Field id="tr-wa" label="Nomor WhatsApp" placeholder="0812-xxxx-xxxx" type="tel" />
              <Field id="tr-email" label="Email" placeholder="usaha@email.com" type="email" />
              <Field id="tr-alamat" label="Alamat restoran" placeholder="Jl. Melati No. 12" />
              <Field id="tr-jam" label="Jam operasional" placeholder="08.00 - 22.00" />
            </div>

            <div className="ms-section">Informasi Operasional</div>
            <div className="ms-fields">
              <Field id="tr-meja" label="Jumlah meja (opsional)" placeholder="14" />
              <Field id="tr-kap" label="Kapasitas pelanggan" placeholder="48" />
              <Field id="tr-ramai" label="Hari & jam paling ramai" placeholder="Sabtu, 18.00 - 21.00" />
              <Field id="tr-rata" label="Rata-rata pelanggan / hari" placeholder="120" />
            </div>

            <div className="ms-section">Pengaturan Antrean</div>
            <div className="ms-fields">
              <Field id="tr-antrean" label="Nama antrean" placeholder="Dine In / Take Away / VIP" />
              <Field id="tr-mulai" label="Nomor antrean mulai dari" placeholder="A001" />
              <Field id="tr-maks" label="Maksimal antrean (opsional)" placeholder="150" />
              <Field id="tr-estimasi" label="Estimasi layanan / pelanggan" placeholder="10 menit" />
            </div>

            <div className="ms-section">Akun Merchant</div>
            <div className="ms-fields">
              <Field id="tr-user" label="Username" placeholder="kopipagihari" />
              <Field id="tr-pass" label="Password" placeholder="Minimal 8 karakter" type="password" />
            </div>

            <button className="cf-btn" onClick={onClose}>
              Daftarkan Restoran
            </button>
          </>
        )}

        {kind === "setting" && (
          <>
            <h3 className="ms-title">Setting</h3>
            <div className="ms-list" style={{ marginTop: 10 }}>
              <Toggle label="Notifikasi antrean" defaultOn />
              <Toggle label="Suara panggilan" defaultOn />
              <Toggle label="Mode hemat data" />
              <div className="ms-row">
                <span>Bahasa</span>
                <b>Indonesia</b>
              </div>
              <div className="ms-row">
                <span>Versi aplikasi</span>
                <b className="mono">1.0.0</b>
              </div>
            </div>
            <button className="cf-btn ghost" onClick={logout}>
              Keluar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
