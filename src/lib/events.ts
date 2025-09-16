export const EVENT_TYPES = [
  "boda","xv","bautizo","cumple","babyshower","graduacion","comunion",
  "aniversario","despedida","infantil","civil","pedida","familiar",
] as const;
export type EventType = typeof EVENT_TYPES[number];

export const EVENT_LABELS: Record<EventType, string> = {
  boda:"Boda", xv:"XV Años", bautizo:"Bautizo", cumple:"Cumpleaños",
  babyshower:"Baby Shower", graduacion:"Graduación", comunion:"Primera Comunión",
  aniversario:"Aniversario", despedida:"Despedida", infantil:"Fiesta Infantil",
  civil:"Boda Civil", pedida:"Pedida de Mano", familiar:"Reunión Familiar",
};

export function isEventType(v: string): v is EventType {
  return (EVENT_TYPES as readonly string[]).includes(v as any);
}
export function titleForType(t: EventType) { return EVENT_LABELS[t]; }
export const DEFAULT_EVENT_TYPE: EventType = "boda";
