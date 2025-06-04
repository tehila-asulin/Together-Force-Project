import React, { useState } from "react";
import {AppBar,Toolbar,Typography,IconButton,Avatar,Button,Box,Menu,MenuItem,} from "@mui/material";
import { Info, ContactMail, Home } from "@mui/icons-material";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {setUserMode,selectCurrentUser,selectUserMode,setCurrentUser,} from "../redux/slices/togetherForceSlice";
import { UserModes } from "../interface/UserModes";
import Cookies from "js-cookie";
import logoNav from "../assets/logoNav.png";
import {styles} from '../styles/style';
const Header = () => {
  const [signupAnchorEl, setSignupAnchorEl] = useState<null | HTMLElement>(null);
  const [signinAnchorEl, setSigninAnchorEl] = useState<null | HTMLElement>(null);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const userMode = useSelector(selectUserMode);

  const signupOpen = Boolean(signupAnchorEl);
  const signinOpen = Boolean(signinAnchorEl);
  const profileMenuOpen = Boolean(profileMenuAnchorEl);

  const handleSignupClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSignupAnchorEl(event.currentTarget);
  };

  const handleSigninClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSigninAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userMode");
    dispatch(setCurrentUser(null));
    dispatch(setUserMode(UserModes.None));
    navigate("/");
  };

  const handleProfileUpdate = () => {
    setProfileMenuAnchorEl(null);
    if (userMode === UserModes.Organization) {
      navigate("/signup/organization", {
        state: { isEdit: true, data: currentUser },
      });
    } else if (userMode === UserModes.Volunteer) {
      navigate("/signup/volunteer", {
        state: { isEdit: true, data: currentUser },
      });
    }
  };

  return (
    <AppBar sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        <Box sx={styles.navBox}>
          <Box sx={styles.logoBox}>
            <Box component="img" src={logoNav} alt="לוגו יחד בעשייה" sx={styles.logoImage} />
          </Box>

          <Button component={Link} to="/about" variant="contained" sx={styles.navButton} startIcon={<Info />}>
            אודות
          </Button>
          <Button component={Link} to="/contact" variant="contained" sx={styles.navButton} startIcon={<ContactMail />}>
            מדריך הצטרפות
          </Button>
          <Button component={Link} to="/" variant="contained" sx={styles.navButton} startIcon={<Home />}>
            דף הבית
          </Button>
        </Box>

        <Box sx={styles.navBox}>
          {currentUser ? (
            <>
              <Typography sx={styles.userNameText}>{currentUser.name}</Typography>
              <Box>
                <IconButton onClick={(event) => setProfileMenuAnchorEl(event.currentTarget)}>
                  <Avatar
                    alt={currentUser.name}
                    src={currentUser.profileImage ?? "/static/images/avatar/2.jpg"}
                    sx={styles.avatar}
                  />
                </IconButton>
                <Menu anchorEl={profileMenuAnchorEl} open={profileMenuOpen} onClose={() => setProfileMenuAnchorEl(null)}>
                  <MenuItem onClick={handleProfileUpdate}>עדכון פרופיל</MenuItem>
                  <MenuItem
                    onClick={() => {
                      setProfileMenuAnchorEl(null);
                      handleLogout();
                    }}
                  >
                    התנתקות
                  </MenuItem>
                </Menu>
              </Box>
            </>
          ) : (
            <>
              <Button variant="contained" sx={styles.navButtonSmall} onClick={handleSigninClick}>
                התחברות
              </Button>
              <Menu anchorEl={signinAnchorEl} open={signinOpen}>
                <MenuItem component={Link} to="/signin/volunteer" onClick={() => setSigninAnchorEl(null)}>
                  מתנדב
                </MenuItem>
                <MenuItem component={Link} to="/signin/organization" onClick={() => setSigninAnchorEl(null)} >
                  ארגון
                </MenuItem>
              </Menu>

              <Button variant="contained" sx={styles.navButtonSmall} onClick={handleSignupClick}>
                הרשמה
              </Button>
              <Menu anchorEl={signupAnchorEl} open={signupOpen} >
                <MenuItem component={Link} to="/signup/volunteer" onClick={() => setSignupAnchorEl(null)}>
                  מתנדב
                </MenuItem>
                <MenuItem component={Link} to="/signup/organization" onClick={() => setSignupAnchorEl(null)}>
                  ארגון
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;