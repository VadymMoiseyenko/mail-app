"use client";

import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

export default function SidebarHeader() {
  const handleCreateMail = () => {
    // TODO: Implement create mail functionality
    console.log("Create mail clicked");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "1.25rem",
          fontWeight: 600,
          color: "#666", // Made lighter from #333
        }}
      >
        Mail List
      </h2>
      <Button
        variant="text"
        startIcon={<Add />}
        onClick={handleCreateMail}
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
    </div>
  );
}
