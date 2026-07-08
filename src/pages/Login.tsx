import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleMark, IconBack, IconEye, IconEyeOff } from "../icons";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Format email belum benar — contoh: nama@email.com");
      return;
    }
    setEmailError("");
    navigate("/app");
  };

  return (
    <main className="lg-page">
      <div className="lg-card">
        <div className="lg-top">
          <Link to="/" className="lg-back" aria-label="Kembali ke beranda">
            <IconBack />
          </Link>
          <h1>
            Buat
            <br />
            Akun
          </h1>
        </div>

        <div className="lg-body">
          <button
            type="button"
            className="lg-google"
            onClick={() => navigate("/app")}
          >
            <GoogleMark />
            Daftar dengan Google
          </button>

          <div className="lg-or">atau</div>

          <form className="lg-fields" onSubmit={submit} noValidate>
            <div className="lg-row2">
              <div className="lg-field">
                <label htmlFor="fn">Nama depan</label>
                <input id="fn" className="lg-input" type="text" placeholder="Wafin" required />
              </div>
              <div className="lg-field">
                <label htmlFor="ln">Nama belakang</label>
                <input id="ln" className="lg-input" type="text" placeholder="Muhammad" required />
              </div>
            </div>

            <div className="lg-field">
              <label htmlFor="em">Email</label>
              <input
                id="em"
                className={`lg-input${emailError ? " invalid" : ""}`}
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError && <p className="lg-error">{emailError}</p>}
            </div>

            <div className="lg-field">
              <label htmlFor="pw">Kata sandi</label>
              <div className="lg-pw">
                <input
                  id="pw"
                  type={showPw ? "text" : "password"}
                  placeholder="Minimal 8 karakter"
                  minLength={8}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? "Sembunyikan sandi" : "Lihat sandi"}
                >
                  {showPw ? <IconEyeOff /> : <IconEye />}
                </button>
              </div>
            </div>

            <button className="lg-submit" type="submit">
              Buat Akun
            </button>
          </form>

          <p className="lg-terms">
            Dengan mendaftar akun LineLess, kamu menyetujui{" "}
            <a href="#kebijakan">Kebijakan Privasi</a> dan{" "}
            <a href="#ketentuan">Ketentuan Layanan</a>.
          </p>

          <p className="lg-login">
            Sudah punya akun? <Link to="/app">Masuk di sini</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
