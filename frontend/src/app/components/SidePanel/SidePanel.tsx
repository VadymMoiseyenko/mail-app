import { getMails } from "@/lib/api";
import SidePanelHeader from "./SidePanelHeader";
import { MailClientContainer } from "./MailClientContainer/MailClientContainer";
import { Box } from "@mui/material";

export const SidePanel = async () => {
  const mails = await getMails();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <SidePanelHeader />
      <MailClientContainer mails={mails} />
    </Box>
  );
};
