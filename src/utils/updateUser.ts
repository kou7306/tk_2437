import axios from "axios";
import { User } from "@/types/User";

export const updateUser = async (userData: User) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user/update-user`,
      userData
    );
    return response.data; // 更新されたユーザー情報を返す
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("ユーザー情報の更新に失敗しました");
  }
};
