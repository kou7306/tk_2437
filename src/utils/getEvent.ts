import { Event } from "@/types/Event";

export const getEvent = async (id: string): Promise<Event> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/event/get-event?id=${id}` // IDをURLに追加
  );

  // Ensure a successful response
  if (!response.ok) {
    console.error("Failed to fetch event");
    throw new Error("Failed to fetch event");
  }

  const event: Event = await response.json();
  return event;
};
