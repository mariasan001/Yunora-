"use client";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

function base64urlDecodeToJSON(b64url: string) {
  try {
    const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
    const s = typeof window === "undefined"
      ? Buffer.from(b64, "base64").toString("utf-8")
      : decodeURIComponent(escape(atob(b64)));
    return JSON.parse(s);
  } catch {
    return null;
  }
}

export default function PublicPreviewPage() {
  const sp = useSearchParams();
  const data = sp.get("d");

  const cfg = useMemo(() => data ? base64urlDecodeToJSON(data) : null, [data]);

  if (!cfg) {
    return (
      <main style={{minHeight:"100svh",display:"grid",placeItems:"center",padding:"2rem"}}>
        <div style={{textAlign:"center"}}>
          <h1>Invitación no disponible</h1>
          <p>El enlace parece estar incompleto o dañado.</p>
        </div>
      </main>
    );
  }

  // estilos inline mínimos para evitar import complejo
  const fontMap: Record<string,string> = {
    serif: "'Georgia','Times New Roman',serif",
    sans: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    script: "'Brush Script MT','Segoe Script',cursive",
  };

  return (
    <main style={{minHeight:"100svh",display:"grid",placeItems:"center",background:cfg.c?.bg||"#fff",padding:"1rem"}}>
      <div style={{
        width:"min(480px,92%)",background:"#fff",border:"1px solid #eee",borderRadius:16,padding:"1.2rem 1.2rem 1.4rem",
        textAlign:"center",boxShadow:"0 18px 36px rgba(0,0,0,.06)", fontFamily: fontMap[cfg.f] || fontMap.serif
      }}>
        {cfg.t === "minimal" ? (
          <>
            <h2 style={{color:cfg.c?.primary,fontSize:"2rem",margin:".2rem 0 .1rem"}}>{cfg.d?.title}</h2>
            <p style={{color:"#6a6a6a",margin:"0 0 .6rem"}}>{cfg.d?.subtitle}</p>
            <div style={{border:`2px solid ${cfg.c?.primary}`,borderRadius:12,padding:".6rem",display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:".6rem",margin:".6rem 0 .8rem"}}>
              <div><small style={{color:"#6a6a6a"}}>Fecha</small><strong style={{color:"#1f1d2b"}}>{formatDate(cfg.d?.date)}</strong></div>
              <div><small style={{color:"#6a6a6a"}}>Hora</small><strong style={{color:"#1f1d2b"}}>{cfg.d?.time}</strong></div>
              <div><small style={{color:"#6a6a6a"}}>Lugar</small><strong style={{color:"#1f1d2b"}}>{cfg.d?.location}</strong></div>
            </div>
            <p style={{color:"#3f3f3f",margin:".4rem 0 .8rem"}}>{cfg.d?.message}</p>
            <a href="#" style={{fontWeight:800,color:cfg.c?.primary,textDecoration:"none"}}>{cfg.d?.rsvpLabel} →</a>
          </>
        ) : (
          <>
            <div style={{height:8,borderRadius:6,marginBottom:".9rem",background:cfg.c?.secondary}} />
            <h2 style={{color:cfg.c?.primary,fontSize:"2rem",margin:".2rem 0 .1rem"}}>{cfg.d?.title}</h2>
            <p style={{color:"#6a6a6a",margin:"0 0 .6rem"}}>{cfg.d?.subtitle}</p>
            <p style={{color:"#3f3f3f",margin:".4rem 0 .8rem"}}>{cfg.d?.message}</p>
            <div style={{display:"grid",gap:".2rem",color:"#2f2f2f",marginBottom:".8rem"}}>
              <span>{formatDate(cfg.d?.date)} · {cfg.d?.time}</span>
              <span>{cfg.d?.location}</span>
            </div>
            <a href="#" style={{
              display:"inline-block",background:cfg.c?.primary,color:"#fff",textDecoration:"none",fontWeight:700,
              borderRadius:999,padding:".7rem 1.1rem"
            }}>{cfg.d?.rsvpLabel}</a>
          </>
        )}
      </div>
    </main>
  );
}

function formatDate(iso?: string) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("es-MX", { day:"2-digit", month:"long", year:"numeric" });
  } catch { return iso; }
}
