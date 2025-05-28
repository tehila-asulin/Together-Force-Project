import { Box, Button, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUserMode } from "../redux/slices/togetherForceSlice";
import { UserModes } from "../interface/UserModes";
import logo from "../assets/logo.png";

const HomePage = () => {
  const userMode = useSelector(selectUserMode);

  return (
    <Box sx={{ width: "80vw", height: "80vh", position: "relative", overflow: "hidden" }}>
      {/* רקע כתמונה מלאה */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${logo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.1,
          zIndex: 1,
        }}
      />

      {/* תוכן בקדמה */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Stack spacing={2}>
          {userMode === UserModes.Volunteer && (
            <>
              <Button variant="contained" component={Link} to="/VolunteeringList">
                להתנדבויות המתאימות לי
              </Button>
              <Button variant="outlined" component={Link} to="/myVolunteering">
                להיסטוריית ההתנדבויות שלי
              </Button>
            </>
          )}

          {userMode === UserModes.Organization && (
            <>
              <Button variant="contained" component={Link} to="/VolunteeringList">
                היסטוריית ההתנדבויות שהוספתי
              </Button>
              <Button variant="outlined" component={Link} to="/addVolunteering">
                בקשת התנדבות חדשה
              </Button>
            </>
          )}
        </Stack>
      </Box>
    </Box>

  );
};

export default HomePage;
