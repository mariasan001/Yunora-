// src/app/crear/[type]/page.tsx
import InviteEditor from "@/app/components/InviteEditor";
import { isEventType, DEFAULT_EVENT_TYPE, type EventType, EVENT_TYPES } from "@/lib/events";

type PageProps = { params: { type?: string } };

export default function EditorByType({ params }: PageProps) {
  const t = (params?.type ?? "").toLowerCase();
  const safe = (isEventType(t) ? t : DEFAULT_EVENT_TYPE) as EventType;
  return <InviteEditor initialType={safe} />;
}

// (Opcional) pre-render de rutas estáticas para todos los tipos
export function generateStaticParams() {
  return EVENT_TYPES.map((type) => ({ type }));
}
