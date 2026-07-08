import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        textAlign: "center",
        padding: 24,
      }}
    >
      <img src="/logo.png" alt="LineLess" style={{ height: 40 }} />
      <h1 style={{ fontSize: 26 }}>Halaman tidak ditemukan</h1>
      <p style={{ color: "var(--muted)", maxWidth: 320 }}>
        Alamat yang kamu buka tidak ada. Kembali ke beranda untuk mulai ambil
        antrean.
      </p>
      <Link
        to="/"
        style={{
          background: "var(--accent)",
          color: "#fff",
          textDecoration: "none",
          fontWeight: 600,
          padding: "12px 26px",
          borderRadius: 999,
        }}
      >
        Ke beranda
      </Link>
    </main>
  );
}
