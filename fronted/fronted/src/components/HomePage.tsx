// import React from "react";
// import { Button } from "@mui/material";
// import { Link } from "react-router";
// import { useSelector } from "react-redux";
// import { selectUserMode } from "../redux/slices/togetherForceSlice";
// import VolunteeringList from "./VolunteeringList";
// import { UserModes } from "../interface/UserModes";

// const HomePage = () => {
//   const userMode = useSelector(selectUserMode);

//   return (
//     <>
//       {userMode === UserModes.Organization && (
//         <Button
//           component={Link}
//           to="/addVolunteering"
//           variant="contained"
//           sx={{ backgroundColor: "white", color: "black", minWidth: "80px" }}
//         >
//           בקשת התנדבות חדשה
//         </Button>
//       )}
      
//       <VolunteeringList />
//     </>

//   );
// };

// export default HomePage;
import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { selectUserMode } from "../redux/slices/togetherForceSlice";
import VolunteeringList from "./VolunteeringList";
import { UserModes } from "../interface/UserModes";

const HomePage = () => {
  const userMode = useSelector(selectUserMode);

  const isLoggedIn = userMode === UserModes.Organization || userMode === UserModes.Volunteer;

  return (
    <>
      {userMode === UserModes.Organization && (
        <Button
          component={Link}
          to="/addVolunteering"
          variant="contained"
          sx={{ backgroundColor: "white", color: "black", minWidth: "80px" }}
        >
          בקשת התנדבות חדשה
        </Button>
      )}

      {isLoggedIn && <VolunteeringList />}
    </>
  );
};

export default HomePage;
