import { TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

interface SearchMail {
  searchValue: string;
  onSearchValueChange: (event: string) => void;
  isPending: boolean;
}

export const SearchMail = ({
  searchValue,
  onSearchValueChange,
  isPending,
}: SearchMail) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchValueChange(event.target.value);
  };

  return (
    <TextField
      placeholder="Search emails..."
      variant="outlined"
      size="small"
      fullWidth
      value={searchValue}
      onChange={handleInputChange}
      InputProps={{
        startAdornment: <Search sx={{ color: "#666", marginRight: "8px" }} />,
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          fontSize: "0.875rem",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          opacity: isPending ? 0.7 : 1,
          "& fieldset": {
            borderColor: "#d1d5db",
            borderWidth: "1px",
          },
          "&:hover fieldset": {
            borderColor: "#1976d2",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#1976d2",
            borderWidth: "2px",
          },
        },
        "& .MuiInputBase-input": {
          padding: "10px 12px",
          color: "#374151",
          "&::placeholder": {
            color: "#6b7280",
            opacity: 1,
          },
        },
      }}
    />
  );
};
