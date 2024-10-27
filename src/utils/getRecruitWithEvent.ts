import axios from "axios";

export const getRecruitmentWithEvent = async (
  ids: string[]
): Promise<any[]> => {
  try {
    // ids配列をカンマ区切りの文字列に変換
    const idsParam = ids.join(",");
    console.log(idsParam);

    // APIリクエストを送信
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/event/get-recruitment-with-event?ids=[${idsParam}]`
    );

    // データを返却
    return response.data;
  } catch (error) {
    console.error("Error fetching events with recruitments:", error);
    throw new Error("イベントとリクルートメントデータの取得に失敗しました");
  }
};
