// Area.tsx
import React from "react";
import { Box, Typography, Chip } from "@mui/material";

type AreaProps = {
  handlePlaceClick: (place: string) => void;
  selectedPlaces: string[];
};

const areas = ["東京", "大阪", "福岡", "札幌", "名古屋"]; // 適宜変更してください

const Area: React.FC<AreaProps> = ({ handlePlaceClick, selectedPlaces }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        場所を選択
      </Typography>
      <Box>
        {areas.map((area) => (
          <Chip
            key={area}
            label={area}
            onClick={() => handlePlaceClick(area)}
            color={selectedPlaces.includes(area) ? "primary" : "default"}
            sx={{ margin: "4px" }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Area;
