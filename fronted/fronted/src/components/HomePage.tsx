import { Box, Button, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUserMode } from "../redux/slices/togetherForceSlice";
import { UserModes } from "../interface/UserModes";
import logo from "../assets/logo.png";
import {styles} from '../styles/style';

const HomePage = () => {
  const userMode = useSelector(selectUserMode);

    return (
    <Box sx={styles.containerBox}>
      <Box
        sx={{
          ...styles.backgroundBox,
          backgroundImage: `url(${logo})`,
        }}
      />

      <Box sx={styles.contentBox}>
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
