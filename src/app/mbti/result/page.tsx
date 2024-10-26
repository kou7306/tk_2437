"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Typography } from "@mui/material";

const MBTIResultPage = () => {
  const searchParams = useSearchParams();
  const answers = JSON.parse(searchParams.get("answers") || "[]");

  return (
    <Box sx={{ maxWidth: "md", width: "100%", margin: "auto", padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        診断結果
      </Typography>
      <Typography variant="body1">
        あなたの回答:
      </Typography>
      <pre>{JSON.stringify(answers, null, 2)}</pre>
    </Box>
  );
};

export default MBTIResultPage;