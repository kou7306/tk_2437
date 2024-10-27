import { Event } from "@/types/Event";
import axios from "axios";

const createEvent = async (eventData: Event) => {
  console.log(eventData);
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/event/create-event`,
      eventData
    );

    return response.data; // You can return or handle the response as needed
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("イベントの作成に失敗しました"); // Handle the error appropriately
  }
};

export default createEvent;
