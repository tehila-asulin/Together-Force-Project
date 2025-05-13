import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router"; 
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, selectUserMode } from "../redux/slices/togetherForceSlice";
import VolunteeringCard from "./VolunteeringCard";
import VolunteeringList from "./VolunteeringList";
import { UserModes } from "../interface/UserModes";

const HomePage = () => {
  const userMode = useSelector(selectUserMode);

  return (
    <>
      <VolunteeringList></VolunteeringList>
      {console.log(userMode)}
      {console.log("ll")}

      {userMode === UserModes.Organization ? (
        <Button
          component={Link}
          to="/addVolunteering"
          variant="contained"
          sx={{ backgroundColor: "white", color: "black", minWidth: "80px" }}
        >
          לבקשת התנדבות חדשה
        </Button>
      ) : (
        <VolunteeringList></VolunteeringList>
      )}
            

    </>
  );
};

export default HomePage;
