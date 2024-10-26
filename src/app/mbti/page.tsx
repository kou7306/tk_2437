"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Typography, Stack, Checkbox, FormControlLabel, FormGroup } from "@mui/material";

const questions = [
  {
    category: "外向性",
    questions: [
      "あなたは外向的ですか？",
      "人と話すのが好きですか？",
      "パーティーに行くのが好きですか？"
    ]
  },
  {
    category: "計画性",
    questions: [
      "計画を立てるのが好きですか？",
      "スケジュールを守るのが得意ですか？",
      "目標を設定するのが好きですか？"
    ]
  },
  {
    category: "感情性",
    questions: [
      "感情的な決断をしますか？",
      "他人の感情に敏感ですか？",
      "感情を表に出すことが多いですか？"
    ]
  }
];

const finalQuestion = {
  question: "この画像についてどう思いますか？",
  imageUrl: "/path/to/image.jpg", // 画像のパスを指定
  options: ["選択肢1", "選択肢2", "選択肢3", "選択肢4"]
};

const NDTPPage = () => {
  const router = useRouter();
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[][]>([[], [], [], []]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers];
    newAnswers[currentCategoryIndex].push(answer);
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions[currentCategoryIndex].questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // 次のカテゴリに遷移
      setCurrentQuestionIndex(0);
      setCurrentCategoryIndex(currentCategoryIndex + 1);
    }
  };

  const handleFinalAnswer = async () => {
    const newAnswers = [...answers];
    newAnswers[3] = selectedOptions.map(option => option === "正解");

    // バックエンドに結果を送信
    try {
      const response = await fetch('http://localhost:8080/user/register-mbti', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: "620f76c7-1101-446f-9853-3c17c4fe7a6d", mbti: newAnswers }), // 仮のUUIDを使用
      });
      if (response.ok) {
        router.push('/mbti/result');
      } else {
        console.error('結果の保存中にエラーが発生しました');
      }
    } catch (error) {
      console.error('結果の保存中にエラーが発生しました', error);
    }

    // 結果ページに遷移
    const queryString = new URLSearchParams({ answers: JSON.stringify(newAnswers) }).toString();
    router.push(`/mbti/result?${queryString}`);
  };

  const handleOptionChange = (option: string) => {
    setSelectedOptions(prevOptions =>
      prevOptions.includes(option)
        ? prevOptions.filter(o => o !== option)
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
              variant="contained"
              color="primary"
              onClick={() => handleAnswer(true)}
            >
              はい
            </Button>
            <Button
              variant="contained"
              color="secondary"
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
          <img src={finalQuestion.imageUrl} alt="Final Question" style={{ width: "100%", height: "auto" }} />
          <FormGroup>
            {finalQuestion.options.map(option => (
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