// import { useState } from 'react';
// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Box,
//   Paper,
//   Alert
// } from '@mui/material';
// import { useDispatch, useSelector } from "react-redux";
// import { useLoginVolunteerMutation, useGetAllVolunteersQuery} from '../../redux/slices/api/volunteerApiSlice';
// import { useLoginOrganizationMutation,useGetAllOrganizationsQuery } from '../../redux/slices/api/organizationApiSlice';
// import { jwtDecode } from 'jwt-decode';
// import { setCurrentUser, selectUserMode } from "../../redux/slices/togetherForceSlice";
// import { Volunteer } from '../../interface/Volunteer';
// import { Organization } from '../../interface/Organization'; 
// import {  useNavigate } from "react-router";
// import { UserModes } from '../../interface/UserModes';


// const SignIn = () => {
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<boolean>(false);
//     const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const userMode = useSelector(selectUserMode);
//   const [loginVolunteer, { isLoading: isLoadingVolunteer }] = useLoginVolunteerMutation();
//   const [loginOrganization, { isLoading: isLoadingOrganization }] = useLoginOrganizationMutation();
//   const { data:allVolunteers } = useGetAllVolunteersQuery()
//   const { data: allOrganizations } = useGetAllOrganizationsQuery();
//   const isLoading = isLoadingVolunteer || isLoadingOrganization;
  

  
//   const handleLogin = async () => {
//     setError(null);
//     setSuccess(false);
//     try {
//       let response;
//       if (userMode === "Volunteer") {
//         response = await loginVolunteer({ email, password }).unwrap();
//       } else if (userMode === "Organization") {
//         response = await loginOrganization({ email, password }).unwrap();
//       } else {
//         setError("יש לבחור מצב משתמש (מתנדב או ארגון)");
//         return;
//       }
  
//       const { accessToken } = response;
//       localStorage.setItem("token", accessToken);
  
//       const decoded = jwtDecode<{ email: string }>(accessToken);
//       let fullUser;
  
//       if (userMode===UserModes.Volunteer && allVolunteers) {
//         console.log(999);
        
//         fullUser = allVolunteers.find((v) => v.email === decoded.email);
//       } else if (userMode === UserModes.Organization && allOrganizations) {
//         fullUser = allOrganizations.find((o) => o.email === decoded.email);
//       }
  
//       if (!fullUser) {
//         setError("המשתמש לא נמצא במסד הנתונים.");
//         return;
//       }
  
//       dispatch(setCurrentUser(fullUser));
//       localStorage.setItem("user", JSON.stringify(fullUser));
//       localStorage.setItem("userMode", JSON.stringify(userMode));
      
//       setSuccess(true);
//       navigate("/");
//     } catch (err: any) {
//       setError(err?.data?.message || "שגיאה בהתחברות");
//     }
//   };
  

//   return (
//     <Container maxWidth="sm">
//       <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
//         <Typography variant="h4" gutterBottom>
//           התחברות {userMode === "Volunteer" ? "כמתנדב" : userMode === "Organization" ? "כארגון" : ""}
//         </Typography>

//         <TextField
//           fullWidth
//           label="אימייל"
//           type="email"
//           variant="outlined"
//           margin="normal"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <TextField
//           fullWidth
//           label="סיסמה"
//           type="password"
//           variant="outlined"
//           margin="normal"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <Box mt={2}>
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             disabled={isLoading}
//             onClick={handleLogin}
//           >
//             התחברות
//           </Button>
//         </Box>

//         {error && (
//           <Box mt={2}>
//             <Alert severity="error">{error}</Alert>
//           </Box>
//         )}

//         {success && (
//           <Box mt={2}>
//             <Alert severity="success">התחברת בהצלחה!</Alert>
//           </Box>
//         )}
//       </Paper>
//     </Container>
//   );
// };

// export default SignIn;
import { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Alert
} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { useLoginVolunteerMutation } from '../../redux/slices/api/volunteerApiSlice';
import { useLoginOrganizationMutation } from '../../redux/slices/api/organizationApiSlice';
import { jwtDecode } from 'jwt-decode';
import { setCurrentUser, selectUserMode, setToken } from "../../redux/slices/togetherForceSlice";
import { useNavigate } from "react-router";
import { UserModes } from '../../interface/UserModes';

const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userMode = useSelector(selectUserMode);
  const [loginVolunteer, { isLoading: isLoadingVolunteer }] = useLoginVolunteerMutation();
  const [loginOrganization, { isLoading: isLoadingOrganization }] = useLoginOrganizationMutation();
  const isLoading = isLoadingVolunteer || isLoadingOrganization;

  const handleLogin = async () => {
    setError(null);
    setSuccess(false);
    try {
      let response;
      let fullUser;
      if (userMode === UserModes.Volunteer) {
        const loginResponse = await loginVolunteer({ email, password }).unwrap();
        response = loginResponse;
        fullUser = loginResponse.user; // גישה למשתמש המלא
      } else if (userMode === UserModes.Organization) {
        const loginResponse = await loginOrganization({ email, password }).unwrap();
        response = loginResponse;
        fullUser = loginResponse.organization; // גישה לארגון המלא
      } else {
        setError("יש לבחור מצב משתמש (מתנדב או ארגון)");
        return;
      }

      const { accessToken } = response;
      localStorage.setItem("token", accessToken);
      dispatch(setToken(accessToken));

      if (!fullUser) {
        setError("פרטי המשתמש לא התקבלו בהתחברות.");
        return;
      }

      dispatch(setCurrentUser(fullUser));
      localStorage.setItem("user", JSON.stringify(fullUser));
      localStorage.setItem("userMode",userMode);

      setSuccess(true);
      navigate("/");
    } catch (err: any) {
      setError(err?.data?.message || "שגיאה בהתחברות");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          התחברות {userMode === "Volunteer" ? "כמתנדב" : userMode === "Organization" ? "כארגון" : ""}
        </Typography>

        <TextField
          fullWidth
          label="אימייל"
          type="email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="סיסמה"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
            onClick={handleLogin}
          >
            התחברות
          </Button>
        </Box>

        {error && (
          <Box mt={2}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}

        {success && (
          <Box mt={2}>
            <Alert severity="success">התחברת בהצלחה!</Alert>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default SignIn;