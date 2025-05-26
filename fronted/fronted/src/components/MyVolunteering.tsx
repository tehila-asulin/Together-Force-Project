import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { selectUserMode } from "../redux/slices/togetherForceSlice";
import VolunteeringList from "./VolunteeringList";
import { UserModes } from "../interface/UserModes";

const MyVolunteering = () => {
  const userMode = useSelector(selectUserMode);

  const isLoggedIn = userMode === UserModes.Organization || userMode === UserModes.Volunteer;

  return (
    <>
      {isLoggedIn && <VolunteeringList />}
    </>
  );
};

export default MyVolunteering;