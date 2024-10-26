import { Recruitment } from "@/types/Recruitment";
import axios from "axios";

const createRecruitment = async (recruitmentData: Recruitment) => {
  console.log(recruitmentData);
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/recruitment/create-recruitment`,
      recruitmentData
    );

    return response.data; // You can return or handle the response as needed
  } catch (error) {
    console.error("Error creating recruitment:", error);
    throw new Error("イベントの作成に失敗しました"); // Handle the error appropriately
  }
};

export default createRecruitment;
