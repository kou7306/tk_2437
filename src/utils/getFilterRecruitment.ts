import { Recruitment } from "@/types/Recruitment";

export const getNewRecruitments = async (
  limit: string
): Promise<Recruitment[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recruitment/get-filtered-recruitment?sortOrder=newest&limit=${limit}`
  );

  // Ensure a successful response
  if (!response.ok) {
    console.error("Failed to fetch new recruitments");
    return []; // Return an empty list if there's an error
  }

  const recruitments: Recruitment[] = await response.json();
  return recruitments;
};
