import React from "react";
import { AppBar, Toolbar, Typography, Chip } from "@mui/material";
import { Speed } from "@mui/icons-material";
import { environment } from "../constants/config";

const Header: React.FC = () => {
  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <Speed sx={{ mr: 2, fontSize: 32 }} />
        <Typography
          variant="h5"
          component="h1"
          sx={{ flexGrow: 1, fontWeight: 700 }}
        >
          Chrome UX Report Dashboard
        </Typography>
        <Chip label={environment} color="warning" size="small" />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
