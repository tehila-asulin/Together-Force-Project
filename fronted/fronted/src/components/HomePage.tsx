
import {Box} from "@mui/material";
import logo from "../assets/logo.png"; 
const HomePage = () => {

  return (
 
  <Box
    component="img"
    src={logo}
    alt="לוגו יחד בעשייה"
    sx={{
      width: "100%",
      height: "100%",
      objectFit: "cover", 
    }}
  />
     
  );
};

export default HomePage;
