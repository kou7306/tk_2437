import axios from "axios";

export const joinRecruitment = async (uuid: string, recruitment_id: string) => {
  try {
    if (uuid && recruitment_id) {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/recruitment/join`, {
        uuid,
        recruitment_id,
      });
      alert("応募が完了しました！");
    }
  } catch (error) {
    console.error("応募に失敗しました:", error);
    alert("応募に失敗しました。もう一度お試しください。");
  }
};
