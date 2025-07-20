import React from "react";
import { Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import Link from "next/link";

export default function SidePanelHeader() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <Box
          component="h2"
          sx={{
            flexGrow: 1,
            marginRight: "1rem",
            fontSize: "1.5rem",
            fontWeight: 700,
          }}
        >
          Mail List
        </Box>

        <Button
          component={Link}
          href="/create-new"
          variant="text"
          startIcon={<Add />}
          sx={{
            textTransform: "none",
            color: "#1976d2",
            "&:hover": {
              backgroundColor: "rgba(25, 118, 210, 0.04)",
            },
          }}
        >
          Create Mail
        </Button>
      </Box>
    </Box>
  );
}
