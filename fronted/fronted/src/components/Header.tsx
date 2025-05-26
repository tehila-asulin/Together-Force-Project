// // import React, { useState } from "react";
// // import {
// //   AppBar,
// //   Toolbar,
// //   Typography,
// //   IconButton,
// //   Avatar,
// //   Button,
// //   Tooltip,
// //   Box,
// //   Menu,
// //   MenuItem,
// // } from "@mui/material";
// // import { Info, ContactMail, Home } from "@mui/icons-material";
// // import { Link, useNavigate } from "react-router";
// // import { useDispatch, useSelector } from "react-redux";
// // import { setUserMode, selectCurrentUser, selectUserMode ,setCurrentUser} from "../redux/slices/togetherForceSlice";
// // import { UserModes } from "../interface/UserModes";
// // import Cookies from "js-cookie";

// // const Header = () => {
// //   const [signupAnchorEl, setSignupAnchorEl] = useState<null | HTMLElement>(null);
// //   const [signinAnchorEl, setSigninAnchorEl] = useState<null | HTMLElement>(null);
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();
// //   const currentUser = useSelector(selectCurrentUser);
// //   const userMode = useSelector(selectUserMode);

// //   const signupOpen = Boolean(signupAnchorEl);
// //   const signinOpen = Boolean(signinAnchorEl);

// //   const handleSignupClick = (event: React.MouseEvent<HTMLButtonElement>) => {
// //     setSignupAnchorEl(event.currentTarget);
// //   };

// //   const handleSigninClick = (event: React.MouseEvent<HTMLButtonElement>) => {
// //     setSigninAnchorEl(event.currentTarget);
// //   };

// //   const handleClose = (mode?: UserModes) =>{
// //     if (mode) {
// //       console.log(mode);
// //       dispatch(setUserMode(mode));
// //     }
// //     setSignupAnchorEl(null);
// //     setSigninAnchorEl(null);
// //   };

// //   const handleLogout = () => {
// //       Cookies.remove("token");
// //     localStorage.removeItem("user");
// //     localStorage.removeItem("userMode");
// //     dispatch(setCurrentUser(null))
// //     dispatch(setUserMode(UserModes.None))
// //     navigate("/");
// //   };

// //   return (
// //     <AppBar position="fixed" sx={{ backgroundColor: "rgb(0, 104, 245)", width: "100%", top: 0 }}>
// //       <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1200px", margin: "0 auto", width: "100%", paddingX: 2 }}>
// //         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// //           <Button component={Link} to="/about" variant="contained" sx={{ backgroundColor: "white", color: "black", minWidth: "90px" }} startIcon={<Info />}>
// //             About
// //           </Button>
// //           <Button component={Link} to="/contact" variant="contained" sx={{ backgroundColor: "white", color: "black", minWidth: "90px" }} startIcon={<ContactMail />}>
// //             Contact
// //           </Button>
// //           <Button component={Link} to="/" variant="contained" sx={{ backgroundColor: "white", color: "black", minWidth: "90px" }} startIcon={<Home />}>
// //             HomePage
// //           </Button>
// //         </Box>

// //         <Typography variant="h6" sx={{ color: "white", flexGrow: 1, textAlign: "center", whiteSpace: "nowrap" }}>
// //           Together Force
// //         </Typography>

// //         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// //           {currentUser ? (
// //             <>
// //               <Typography sx={{ color: "white" }}>{currentUser.name}</Typography>
// //               <Tooltip title="Logout">
// //                 <IconButton onClick={handleLogout}>
// //                  <Avatar
// //   alt={currentUser.name}
// //   src={currentUser.profileImage ? currentUser.profileImage: "/static/images/avatar/2.jpg"}
// //   sx={{ width: 36, height: 36 }}
// // />

// //                 </IconButton>
// //               </Tooltip>
// //             </>
// //           ) : (
// //             <>
// //               <Button variant="contained" sx={{ backgroundColor: "white", color: "black", minWidth: "80px" }} onClick={handleSigninClick}>
// //                 Sign In
// //               </Button>
// //               <Menu anchorEl={signinAnchorEl} open={signinOpen} onClose={() => handleClose()}>
// //                 <MenuItem component={Link} to="/signin/volunteer" onClick={() => handleClose(UserModes.Volunteer)}>Volunteer</MenuItem>
// //                 <MenuItem component={Link} to="/signin/organization" onClick={() => handleClose(UserModes.Organization)}>Organization</MenuItem>
// //               </Menu>

// //               <Button variant="contained" sx={{ backgroundColor: "white", color: "black", minWidth: "80px" }} onClick={handleSignupClick}>
// //                 Sign Up
// //               </Button>
// //               <Menu anchorEl={signupAnchorEl} open={signupOpen} onClose={() => handleClose()}>
// //                 <MenuItem component={Link} to="/signup/volunteer" onClick={() => handleClose(UserModes.Volunteer)}>Volunteer</MenuItem>
// //                 <MenuItem component={Link} to="/signup/organization" onClick={() => handleClose(UserModes.Organization)}>Organization</MenuItem>
// //               </Menu>
// //             </>
// //           )}
// //         </Box>
// //       </Toolbar>
// //     </AppBar>
// //   );
// // };

// // export default Header;
// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Avatar,
//   Button,
//   Tooltip,
//   Box,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import { Info, ContactMail, Home } from "@mui/icons-material";
// import { Link, useNavigate } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import { setUserMode, selectCurrentUser, selectUserMode, setCurrentUser } from "../redux/slices/togetherForceSlice";
// import { UserModes } from "../interface/UserModes";
// import Cookies from "js-cookie";

// const Header = () => {
//   const [signupAnchorEl, setSignupAnchorEl] = useState<null | HTMLElement>(null);
//   const [signinAnchorEl, setSigninAnchorEl] = useState<null | HTMLElement>(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const currentUser = useSelector(selectCurrentUser);
//   const userMode = useSelector(selectUserMode);

//   const signupOpen = Boolean(signupAnchorEl);
//   const signinOpen = Boolean(signinAnchorEl);

//   const handleSignupClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setSignupAnchorEl(event.currentTarget);
//   };

//   const handleSigninClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setSigninAnchorEl(event.currentTarget);
//   };

//   const handleClose = (mode?: UserModes) => {
//     if (mode) {
//       dispatch(setUserMode(mode));
//     }
//     setSignupAnchorEl(null);
//     setSigninAnchorEl(null);
//   };

//   const handleLogout = () => {
//     Cookies.remove("token");
//     localStorage.removeItem("user");
//     localStorage.removeItem("userMode");
//     dispatch(setCurrentUser(null));
//     dispatch(setUserMode(UserModes.None));
//     navigate("/");
//   };

//   return (
//     <AppBar position="fixed" sx={{ backgroundColor: "rgb(0, 104, 245)", width: "100%", top: 0 }}>
//       <Toolbar
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           maxWidth: "1200px",
//           margin: "0 auto",
//           width: "100%",
//           paddingX: 2,
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <Button
//             component={Link}
//             to="/about"
//             variant="contained"
//             sx={{ backgroundColor: "white", color: "black", minWidth: "90px" }}
//             startIcon={<Info />}
//           >
//             About
//           </Button>
//           <Button
//             component={Link}
//             to="/contact"
//             variant="contained"
//             sx={{ backgroundColor: "white", color: "black", minWidth: "90px" }}
//             startIcon={<ContactMail />}
//           >
//             Contact
//           </Button>
//           <Button
//             component={Link}
//             to="/"
//             variant="contained"
//             sx={{ backgroundColor: "white", color: "black", minWidth: "90px" }}
//             startIcon={<Home />}
//           >
//             HomePage
//           </Button>
//         </Box>

//         <Typography
//           variant="h6"
//           sx={{ color: "white", flexGrow: 1, textAlign: "center", whiteSpace: "nowrap" }}
//         >
//           Together Force
//         </Typography>

//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           {currentUser ? (
//             <>
//               <Typography sx={{ color: "white" }}>{currentUser.name}</Typography>
//               <Tooltip title="Logout">
//                 <IconButton onClick={handleLogout}>
//                   <Avatar
//                     alt={currentUser.name}
//                     src={currentUser.profileImage ? currentUser.profileImage : "/static/images/avatar/2.jpg"}
//                     sx={{ width: 36, height: 36 }}
//                   />
//                 </IconButton>
//               </Tooltip>
//             </>
//           ) : (
//             <>
//               <Button
//                 variant="contained"
//                 sx={{ backgroundColor: "white", color: "black", minWidth: "80px" }}
//                 onClick={handleSigninClick}
//               >
//                 Sign In
//               </Button>
//               <Menu
//                 anchorEl={signinAnchorEl}
//                 open={signinOpen}
//                 onClose={() => handleClose()}
//                 MenuListProps={{ 'aria-labelledby': 'signin-button' }}
//               >
//                 <Box>
//                   <MenuItem
//                     component={Link}
//                     to="/signin/volunteer"
//                     onClick={() => handleClose(UserModes.Volunteer)}
//                   >
//                     Volunteer
//                   </MenuItem>
//                   <MenuItem
//                     component={Link}
//                     to="/signin/organization"
//                     onClick={() => handleClose(UserModes.Organization)}
//                   >
//                     Organization
//                   </MenuItem>
//                 </Box>
//               </Menu>

//               <Button
//                 variant="contained"
//                 sx={{ backgroundColor: "white", color: "black", minWidth: "80px" }}
//                 onClick={handleSignupClick}
//               >
//                 Sign Up
//               </Button>
//               <Menu
//                 anchorEl={signupAnchorEl}
//                 open={signupOpen}
//                 onClose={() => handleClose()}
//                 MenuListProps={{ 'aria-labelledby': 'signup-button' }}
//               >
//                 <Box>
//                   <MenuItem
//                     component={Link}
//                     to="/signup/volunteer"
//                     onClick={() => handleClose(UserModes.Volunteer)}
//                   >
//                     Volunteer
//                   </MenuItem>
//                   <MenuItem
//                     component={Link}
//                     to="/signup/organization"
//                     onClick={() => handleClose(UserModes.Organization)}
//                   >
//                     Organization
//                   </MenuItem>
//                 </Box>
//               </Menu>
//             </>
//           )}
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Button,
  Tooltip,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { Info, ContactMail, Home } from "@mui/icons-material";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserMode,
  selectCurrentUser,
  selectUserMode,
  setCurrentUser,
} from "../redux/slices/togetherForceSlice";
import { UserModes } from "../interface/UserModes";
import Cookies from "js-cookie";
import logo from "../assets/logo.png"; 

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

  const handleClose = (mode?: UserModes) => {
    if (mode) {
      dispatch(setUserMode(mode));
    }
    setSignupAnchorEl(null);
    setSigninAnchorEl(null);
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
    <AppBar position="fixed" sx={{ backgroundColor: "rgb(0, 104, 245)", width: "100%", top: 0 }}>
      
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          paddingX: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
           <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center", height: "64px" }}>
  <Box component="img"
    src={logo}
    alt="לוגו יחד בעשייה"
    sx={{
      height: "100px",
      maxHeight: "100%",
      objectFit: "contain"
    }}
  />
</Box>

          <Button
            component={Link}
            to="/about"
            variant="contained"
            sx={{ backgroundColor: "white", color: "black", minWidth: "90px" }}
            startIcon={<Info />}
          >
            אודות
          </Button>
          <Button
            component={Link}
            to="/contact"
            variant="contained"
            sx={{ backgroundColor: "white", color: "black", minWidth: "90px" }}
            startIcon={<ContactMail />}
          >
            מדריך הצטרפות
          </Button>
          <Button
            component={Link}
            to="/"
            variant="contained"
            sx={{ backgroundColor: "white", color: "black", minWidth: "90px" }}
            startIcon={<Home />}
          >
            דף הבית
          </Button>
        </Box>

   


        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {currentUser ? (
            <>
              <Typography sx={{ color: "white" }}>{currentUser.name}</Typography>
              <Box>
                <IconButton onClick={(event) => setProfileMenuAnchorEl(event.currentTarget)}>
                  <Avatar
                    alt={currentUser.name}
                    src={currentUser.profileImage ? currentUser.profileImage : "/static/images/avatar/2.jpg"}
                    sx={{ width: 36, height: 36 }}
                  />
                </IconButton>
                <Menu
                  anchorEl={profileMenuAnchorEl}
                  open={profileMenuOpen}
                  onClose={() => setProfileMenuAnchorEl(null)}
                >
                  <MenuItem onClick={handleProfileUpdate}>עדכון פרופיל</MenuItem>
                  <MenuItem onClick={() => { setProfileMenuAnchorEl(null); handleLogout(); }}>
                    התנתקות
                  </MenuItem>
                   {userMode === UserModes.Volunteer &&( <MenuItem
                  component={Link}
                  to="/VolunteeringList/true"
                >
                להתנדבויות המתאימות לי
                </MenuItem>)}
                  {userMode === UserModes.Volunteer &&( <MenuItem
                  component={Link}
                  to="/VolunteeringList/false"
                >
                להסטוריית ההתנדבויות שלי
                </MenuItem>)}
                  {userMode === UserModes.Organization &&( <MenuItem
                  component={Link}
                  to="/VolunteeringList/false"
                >
                להסטוריית ההתנדבויות שהוספתי
                </MenuItem>)}
               {userMode === UserModes.Organization && (
                      <MenuItem
                        component={Link}
                        to="/addVolunteering"
                      >
                        בקשת התנדבות חדשה
                      </MenuItem>
                    )}
                </Menu>
              </Box>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                sx={{ backgroundColor: "white", color: "black", minWidth: "80px" }}
                onClick={handleSigninClick}
              >
                התחברות
              </Button>
              <Menu anchorEl={signinAnchorEl} open={signinOpen} onClose={() => handleClose()}>
                <MenuItem
                  component={Link}
                  to="/signin/volunteer"
                  
                >
                  מתנדב
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/signin/organization"
                   
                >
                  ארגון
                </MenuItem>
              </Menu>

              <Button
                variant="contained"
                sx={{ backgroundColor: "white", color: "black", minWidth: "80px" }}
                onClick={handleSignupClick}
              >
                הרשמה
              </Button>
              <Menu anchorEl={signupAnchorEl} open={signupOpen} onClose={() => handleClose()}>
                <MenuItem
                  component={Link}
                  to="/signup/volunteer"
                  
                >
                  מתנדב
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/signup/organization"
                
                >
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
