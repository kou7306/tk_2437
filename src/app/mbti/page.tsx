"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Typography,
  Stack,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { getUuidFromCookie } from "@/actions/users";

const questions = [
  {
    category: "外向性",
    questions: [
      "あなたは外向的ですか？",
      "人と話すのが好きですか？",
      "パーティーに行くのが好きですか？",
    ],
  },
  {
    category: "計画性",
    questions: [
      "計画を立てるのが好きですか？",
      "スケジュールを守るのが得意ですか？",
      "目標を設定するのが好きですか？",
    ],
  },
  {
    category: "感情性",
    questions: [
      "感情的な決断をしますか？",
      "他人の感情に敏感ですか？",
      "感情を表に出すことが多いですか？",
    ],
  },
];

const finalQuestion = {
  question: "この画像についてどう思いますか？",
  imageUrl: "/path/to/image.jpg",
  options: ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
};

const NDTPPage = () => {
  const router = useRouter();
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[][]>([[], [], [], []]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [uuid, setUuid] = useState<string | null>(null);

  useEffect(() => {
    const fetchUuid = async () => {
      const userId = await getUuidFromCookie();
      if (userId) {
        setUuid(userId);
      } else {
        console.error("UUID retrieval failed.");
      }
    };

    fetchUuid();
  }, []);

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers];
    newAnswers[currentCategoryIndex].push(answer);
    setAnswers(newAnswers);

    if (
      currentQuestionIndex <
      questions[currentCategoryIndex].questions.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentQuestionIndex(0);
      setCurrentCategoryIndex(currentCategoryIndex + 1);
    }
  };

  const handleFinalAnswer = async () => {
    const newAnswers = [...answers];
    newAnswers[3] = selectedOptions.map((option) => option === "正解");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/register-mbti`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: uuid, mbti: newAnswers }),
        }
      );

      if (response.ok) {
        router.push("/");
      } else {
        console.error("Failed to save the results.");
      }
    } catch (error) {
      console.error("Error occurred while saving results:", error);
    }
  };

  const handleOptionChange = (option: string) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.includes(option)
        ? prevOptions.filter((o) => o !== option)
        : [...prevOptions, option]
    );
  };

  return (
    <Box sx={{ maxWidth: "md", width: "100%", margin: "auto", padding: 4 }}>
      {currentCategoryIndex < questions.length ? (
        <>
          <Typography variant="h4" gutterBottom>
            性格診断
          </Typography>
          <Typography variant="h6" gutterBottom>
            {questions[currentCategoryIndex].questions[currentQuestionIndex]}
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "white",
                color: "secondary.main",
                borderColor: "secondary.main",
                "&:hover": { backgroundColor: "error.main", color: "white" },
              }}
              onClick={() => handleAnswer(true)}
            >
              はい
            </Button>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "white",
                color: "secondary.main",
                borderColor: "secondary.main",
                "&:hover": { backgroundColor: "error.main", color: "white" },
              }}
              onClick={() => handleAnswer(false)}
            >
              いいえ
            </Button>
          </Stack>
        </>
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            性格診断
          </Typography>
          <Typography variant="h6" gutterBottom>
            {finalQuestion.question}
          </Typography>
          <img
            src={finalQuestion.imageUrl}
            alt="Final Question"
            style={{ width: "100%", height: "auto" }}
          />
          <FormGroup>
            {finalQuestion.options.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleOptionChange(option)}
                  />
                }
                label={option}
              />
            ))}
          </FormGroup>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFinalAnswer}
          >
            回答する
          </Button>
        </>
      )}
    </Box>
  );
};

export default NDTPPage;
