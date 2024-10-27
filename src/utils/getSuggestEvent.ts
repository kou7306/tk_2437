import { Event } from "@/types/Event";

export const getSuggestEvent = async (id: string): Promise<string[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/event/suggest-event?uuid=${id}` // UUIDをURLに追加
  );

  // 成功したレスポンスを確認
  if (!response.ok) {
    console.error("Failed to fetch events");
    throw new Error("Failed to fetch events");
  }

  const events: Event[] = await response.json();

  // イベントIDのみのリストを返す
  return events
    .map((event) => event.id)
    .filter((id): id is string => id !== undefined);
};
