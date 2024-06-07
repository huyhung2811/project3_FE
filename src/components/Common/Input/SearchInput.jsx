import React from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { FaSearch } from "react-icons/fa";

export default function SearchInput({ handleSearchInputChange, defaultValue, handleSubmit }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
      }}
    >
      <TextField
        className="input"
        id="input"
        name="input"
        variant="outlined"
        placeholder={defaultValue}
        InputProps={{
          style: { width: "400px", fontSize: "16px", height: "40px" },
        }}
        onChange={handleSearchInputChange}
        sx={{ width: "400px", height: "40px" }}
      />
      <Button
        variant="contained"
        endIcon={<FaSearch />}
        onClick={handleSubmit}
        style={{ width: "160px", height: "40px", marginLeft: "10px", backgroundColor: "#2c98f0", fontSize: "14px" }}
      >
        Tìm kiếm
      </Button>
    </div>
  );
}
