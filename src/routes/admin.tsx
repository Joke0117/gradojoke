import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

// ── Config ──────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = "grado2026"; // cambia esto por tu contraseña
const GAS_URL = "https://script.google.com/macros/s/AKfycbxWqNeVa2rTyCWHE54QJ39Cih-nvigFaf1MgK-F6D1R4_qIWvFEEHVLnLNICfJhN9OWnQ/exec"; // ← URL del Apps Script
const GAS_SECRET = "mi-secreto-2026"; // ← misma clave que en el Apps Script

interface Confirmacion {
  nombre: string;
  apellido: string;
  celular: string;
  email: string;
  fecha: string;
}

function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState<Confirmacion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${GAS_URL}?key=${GAS_SECRET}`);
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setData(json);
    } catch (err: any) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      fetchData();
    } else {
      setError("Contraseña incorrecta");
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a0906" }}>
        <form onSubmit={handleLogin} className="p-8 rounded-2xl w-full max-w-sm mx-4" style={{ border: "1px solid #c9a84c", background: "#0f0d09" }}>
          <h1 className="font-luxe text-3xl text-center mb-2" style={{ background: "linear-gradient(135deg,#c9a84c,#e8c96a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Admin</h1>
          <p className="text-[#c9a84c]/50 text-xs text-center tracking-[0.2em] uppercase mb-8">Confirmaciones de asistencia</p>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all mb-4"
            style={{ background: "oklch(0.12 0.008 60 / 0.8)", border: "1px solid oklch(0.78 0.14 80 / 0.3)", color: "#f0e6c8" }}
            onFocus={e => { e.currentTarget.style.borderColor = "oklch(0.78 0.14 80 / 0.7)"; }}
            onBlur={e => { e.currentTarget.style.borderColor = "oklch(0.78 0.14 80 / 0.3)"; }}
          />
          {error && <p className="text-red-400 text-xs mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-full py-3 text-sm uppercase tracking-[0.3em] font-semibold transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #c9a84c, #e8c96a)", color: "#0a0906" }}
          >Entrar</button>
          <a href="/" className="block text-center mt-4 text-[#c9a84c]/40 text-xs tracking-[0.2em] hover:text-[#c9a84c]/60 transition-colors">← Volver</a>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-10" style={{ background: "#0a0906" }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-luxe text-2xl" style={{ background: "linear-gradient(135deg,#c9a84c,#e8c96a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Confirmaciones</h1>
            <p className="text-[#c9a84c]/50 text-xs tracking-[0.2em] uppercase mt-1">
              {data.length} {data.length === 1 ? "persona" : "personas"} confirmada{data.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex gap-3">
            <button onClick={fetchData} disabled={loading} className="px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] transition-all" style={{ border: "1px solid oklch(0.78 0.14 80 / 0.3)", color: "#c9a84c", background: "oklch(0.78 0.14 80 / 0.06)" }}>
              {loading ? "Cargando..." : "Actualizar"}
            </button>
            <a href="/" className="px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] transition-all" style={{ border: "1px solid oklch(0.78 0.14 80 / 0.3)", color: "#c9a84c", background: "oklch(0.78 0.14 80 / 0.06)" }}>Inicio</a>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl text-sm" style={{ border: "1px solid rgba(255,100,100,0.3)", background: "rgba(255,100,100,0.08)", color: "#ff6b6b" }}>
            {error}
          </div>
        )}

        {loading && !error && (
          <div className="text-center py-20">
            <div className="w-8 h-8 rounded-full border-2 mx-auto animate-spin" style={{ borderColor: "oklch(0.78 0.14 80 / 0.3)", borderTopColor: "#c9a84c" }} />
          </div>
        )}

        {!loading && !error && (
          <div className="overflow-x-auto rounded-2xl" style={{ border: "1px solid oklch(0.78 0.14 80 / 0.25)" }}>
            <table className="w-full text-left" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "linear-gradient(135deg, #c9a84c, #e8c96a)" }}>
                  <th className="p-4 text-[0.65rem] uppercase tracking-[0.2em] font-semibold" style={{ color: "#0a0906" }}>#</th>
                  <th className="p-4 text-[0.65rem] uppercase tracking-[0.2em] font-semibold" style={{ color: "#0a0906" }}>Nombre</th>
                  <th className="p-4 text-[0.65rem] uppercase tracking-[0.2em] font-semibold" style={{ color: "#0a0906" }}>Apellido</th>
                  <th className="p-4 text-[0.65rem] uppercase tracking-[0.2em] font-semibold" style={{ color: "#0a0906" }}>Celular</th>
                  <th className="p-4 text-[0.65rem] uppercase tracking-[0.2em] font-semibold" style={{ color: "#0a0906" }}>Email</th>
                  <th className="p-4 text-[0.65rem] uppercase tracking-[0.2em] font-semibold" style={{ color: "#0a0906" }}>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr><td colSpan={6} className="p-10 text-center text-sm" style={{ color: "oklch(0.78 0.14 80 / 0.3)" }}>Sin confirmaciones aún</td></tr>
                ) : data.map((row, i) => (
                  <tr key={i} className="transition-colors" style={{ borderTop: "1px solid oklch(0.78 0.14 80 / 0.08)" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "oklch(0.78 0.14 80 / 0.04)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                  >
                    <td className="p-4 text-sm" style={{ color: "oklch(0.78 0.14 80 / 0.5)" }}>{i + 1}</td>
                    <td className="p-4 text-sm" style={{ color: "#f0e6c8" }}>{row.nombre}</td>
                    <td className="p-4 text-sm" style={{ color: "#f0e6c8" }}>{row.apellido}</td>
                    <td className="p-4 text-sm" style={{ color: "#f0e6c8" }}>{row.celular}</td>
                    <td className="p-4 text-sm" style={{ color: "#f0e6c8" }}>{row.email}</td>
                    <td className="p-4 text-sm" style={{ color: "oklch(0.78 0.14 80 / 0.6)" }}>{row.fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {data.length > 0 && (
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, oklch(0.78 0.14 80 / 0.3), transparent)" }} />
            <p className="text-xs tracking-[0.2em] uppercase" style={{ color: "oklch(0.78 0.14 80 / 0.5)" }}>
              Total: <span className="font-bold" style={{ color: "#e8c96a" }}>{data.length}</span>
            </p>
            <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, oklch(0.78 0.14 80 / 0.3), transparent)" }} />
          </div>
        )}
      </div>
    </div>
  );
}
