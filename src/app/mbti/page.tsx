"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Typography, Stack, Checkbox, FormControlLabel, FormGroup } from "@mui/material";

const questions = [
  "あなたは外向的ですか？",
  "計画を立てるのが好きですか？",
  "感情的な決断をしますか？",
  // 他の質問を追加
];

const finalQuestion = {
  question: "この画像についてどう思いますか？",
  imageUrl: "/path/to/image.jpg", // 画像のパスを指定
  options: ["選択肢1", "選択肢2", "選択肢3", "選択肢4"]
};

const NDTPPage = () => {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(boolean | string[])[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleAnswer = (answer: boolean | string[]) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // 最後の質問に遷移
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleFinalAnswer = async () => {
    const newAnswers = [...answers, selectedOptions];
    setAnswers(newAnswers);

    // バックエンドに結果を送信
    try {
      const response = await fetch('http://localhost:8080/user/register-mbti', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: "620f76c7-1101-446f-9853-3c17c4fe7a6d", mbti: newAnswers }),
      });
      if (response.ok) {
        router.push('/mbti/result');
      } else {
        console.error('Error saving results');
      }
    } catch (error) {
      console.error('Error saving results', error);
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
      {currentQuestionIndex < questions.length ? (
        <>
          <Typography variant="h4" gutterBottom>
            性格診断
          </Typography>
          <Typography variant="h6" gutterBottom>
            {questions[currentQuestionIndex]}
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