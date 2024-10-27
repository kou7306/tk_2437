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
    category: "イベントスタイル",
    questions: [
      "外出してイベントの雰囲気を直接感じるのが好きですか？",
      "人が集まるところに行くと、気分が高まる方ですか？",
      "自宅よりも、外でのイベントやアクティビティに魅力を感じますか？",
      "現地でしか味わえない特別な体験に価値を感じますか？",
      "旅行やお出かけを兼ねたイベントが楽しそうだと思いますか？"
    ],
  },
  {
    category: "参加形態",
    questions: [
      "自分のペースで考えたり、進めたりする方が心地よいですか？",
      "一人で取り組むと、集中しやすく感じますか？",
      "他の人に気を使わず、自分のやり方で進める方が楽しいと思いますか？",
      "チームよりも、一人で自由に進める方がしっくりきますか？",
      "誰かと意見を合わせたりするより、一人で完結させる方が合っていますか？"
    ],
  },
  {
    category: "謎タイプ指向",
    questions: [
      "短時間でできるものを複数こなすと達成感があると感じますか？",
      "あまり複雑でない、すぐに解決できるものの方が好みですか？",
      "小さな目標をどんどんクリアしていくのが楽しいと感じますか？",
      "一度に何か一つのことに長時間取り組むより、テンポよく進めたいですか？",
      "小さな成功体験を重ねる方が達成感を得やすいと思いますか？"
    ],
  },
];

const finalQuestion = {
  question: "この謎の答えを下から選んでください。\nいくつ選んでも、選ばなくても構いません。",
  imageUrl: "/path/to/image.jpg", // 画像のパスを指定
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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: uuid,
            mbti: newAnswers,
          }), // 仮のUUIDを使用
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
            謎解きMBTI診断
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
