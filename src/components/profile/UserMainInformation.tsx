import React from "react";
import TechStack from "./TechStack";
import BasicInformation from "./BasicInformation";
import EngineerInformation from "./EngineerInformation";
import OtherInformation from "./OtherInformation";
import { User } from "./options";
import { Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

type Props = {
  user: User;
  onEdit?: () => void;
  isMe: boolean;
};

const UserMainInformation = ({ user, onEdit, isMe }: Props) => {
  return (
    <Box position="relative" display="flex" flexDirection="row" gap={2}>
      <Box>
        <BasicInformation user={user} />
      </Box>
      {isMe && (
        <EditIcon
          onClick={onEdit}
          sx={{
            cursor: "pointer",
          }}
        />
      )}
    </Box>
  );
};

export default UserMainInformation;
