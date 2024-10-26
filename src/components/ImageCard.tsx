// components/ImageCard.tsx
import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

interface ImageCardProps {
  title: string;
  description: string;
  image: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ title, description, image }) => (
  <Card sx={{ mt: 2 }}>
    {image && (
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt="Preview Image"
      />
    )}
    <CardContent>
      <Typography variant="h6" component="div">
        {title || "No title available"}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description || "No description available"}
      </Typography>
    </CardContent>
  </Card>
);

export default ImageCard;
