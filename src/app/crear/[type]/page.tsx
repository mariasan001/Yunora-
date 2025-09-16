import InviteEditor from "@/app/components/InviteEditor";
import { isEventType, DEFAULT_EVENT_TYPE } from "@/lib/events";

export default function EditorByType({ params }: { params: { type: string } }) {
  const t = (params.type ?? "").toLowerCase();
  const safe = isEventType(t) ? t : DEFAULT_EVENT_TYPE;
  return <InviteEditor initialType={safe} />;
}
