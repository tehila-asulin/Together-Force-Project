import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router"; 
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, selectUserMode } from "../redux/slices/togetherForceSlice";
import VolunteeringCard from "./VolunteeringCard";

const HomePage = () => {
  const userMode = useSelector(selectUserMode);

  return (
    <>
      {console.log(userMode)}
      {console.log("ll")}

      {userMode === "Organization" ? (
        <Button
          component={Link}
          to="/addVolunteering"
          variant="contained"
          sx={{ backgroundColor: "white", color: "black", minWidth: "80px" }}
        >
          לבקשת התנדבות חדשה
        </Button>
      ) : (
        <Button
          component={Link}
          to="/addVolunteering"
          variant="contained"
          sx={{ backgroundColor: "white", color: "black", minWidth: "80px" }}
        >
          התנדבויות
        </Button>
      )}
              <VolunteeringCard></VolunteeringCard>

    </>
  );
};

export default HomePage;
