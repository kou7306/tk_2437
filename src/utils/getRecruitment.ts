import { Recruitment } from "@/types/Recruitment";

export const getRecruitment = async (id: string): Promise<Recruitment> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recruitment/get-recruitment?id=${id}`
  );

  // Ensure a successful response
  if (!response.ok) {
    console.error("Failed to fetch new recruitments");
    throw new Error("Failed to fetch new recruitments"); // Throw an error if there's an error
  }

  const recruitment: Recruitment = await response.json();
  return recruitment;
};
