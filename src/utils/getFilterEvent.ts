export const getFilterEvent = async (location: string, tags: string[]) => {
  // tagsをJSON文字列に変換し、場所はそのまま
  const query = new URLSearchParams({
    place: location, // locationはそのまま使用
    tags: JSON.stringify(tags), // tagsをJSON文字列に変換
  });

  console.log(query.toString());

  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/event/get-filtered-event?${query.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  return response.json(); // JSON形式でレスポンスを返す
};

import { Event } from "@/types/Event";

export const getNewEvents = async (limit: string): Promise<Event[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/event/get-filtered-event?sortOrder=newest&limit=${limit}`
  );

  // Ensure a successful response
  if (!response.ok) {
    console.error("Failed to fetch new events");
    return []; // Return an empty list if there's an error
  }

  const events: Event[] = await response.json();
  return events;
};
