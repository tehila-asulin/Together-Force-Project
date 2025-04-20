import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Avatar, Button, Tooltip, Box, Menu, MenuItem } from "@mui/material";
import { Info, ContactMail, Home } from "@mui/icons-material";
import { Link } from "react-router";

const Header: React.FC = () => {
  const [signupAnchorEl, setSignupAnchorEl] = useState<null | HTMLElement>(null);
  const [signinAnchorEl, setSigninAnchorEl] = useState<null | HTMLElement>(null);
  const signupOpen = Boolean(signupAnchorEl);
  const signinOpen = Boolean(signinAnchorEl);

  const handleSignupClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSignupAnchorEl(event.currentTarget);
  };

  const handleSigninClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSigninAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setSignupAnchorEl(null);
    setSigninAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "rgb(0, 104, 245)", width: "100%", top: 0, left: 0, right: 0, boxSizing: "border-box" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", maxWidth: "1200px", margin: "0 auto", paddingX: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button component={Link} to="/about" variant="contained" sx={{ backgroundColor: "white", color: "black", minWidth: "90px" }} startIcon={<Info />}>
            About
          </Button>
          <Button component={Link} to="/contact" variant="contained" sx={{ backgroundColor: "white", color: "black", minWidth: "90px" }} startIcon={<ContactMail />}>
            Contact
          </Button>
          <Button component={Link} to="/" variant="contained" sx={{ backgroundColor: "white", color: "black", minWidth: "90px" }} startIcon={<Home />}>
            HomePage
          </Button>
        </Box>

        <Typography variant="h6" sx={{ color: "white", flexGrow: 1, textAlign: "center", whiteSpace: "nowrap" }}>
          Together Force
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button variant="contained" sx={{ backgroundColor: "white", color: "black", minWidth: "80px" }} onClick={handleSigninClick}>
            Sign In
          </Button>
          <Menu anchorEl={signinAnchorEl} open={signinOpen} onClose={handleClose}>
            <MenuItem component={Link} to="/signin/volunteer" onClick={handleClose}>Volunteer</MenuItem>
            <MenuItem component={Link} to="/signin/organization" onClick={handleClose}>Organization</MenuItem>
          </Menu>
          <Button variant="contained" sx={{ backgroundColor: "white", color: "black", minWidth: "80px" }} onClick={handleSignupClick}>
            Sign Up
          </Button>
          <Menu anchorEl={signupAnchorEl} open={signupOpen} onClose={handleClose}>
            <MenuItem component={Link} to="/signup/volunteer" onClick={handleClose}>Volunteer</MenuItem>
            <MenuItem component={Link} to="/signup/organization" onClick={handleClose}>Organization</MenuItem>
          </Menu>
          <Tooltip title="Profile">
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="User" src="/static/images/avatar/2.jpg" sx={{ width: 36, height: 36 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
