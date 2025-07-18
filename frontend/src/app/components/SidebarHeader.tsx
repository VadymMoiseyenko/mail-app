import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import Link from "next/link";

export default function SidebarHeader() {
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
    </div>
  );
}
