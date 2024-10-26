import axios from "axios";
import { User } from "@/types/User";

export const getUser = async (userId: string): Promise<User | null> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/get-user`,
      {
        params: { uuid: userId }, // ユーザーIDをクエリパラメータとして送信
      }
    );

    console.log(response.data);
    return response.data as User; // 取得したユーザー情報を返す
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("ユーザー情報の取得に失敗しました");
  }
};
