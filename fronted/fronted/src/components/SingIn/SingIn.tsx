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
import { setCurrentUser, selectUserMode } from "../../redux/slices/togetherForceSlice";
import { Volunteer } from '../../interface/Volunteer';
import { Organization } from '../../interface/Organization'; 

const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const dispatch = useDispatch();
  const userMode = useSelector(selectUserMode);
  const [loginVolunteer, { isLoading: isLoadingVolunteer }] = useLoginVolunteerMutation();
  const [loginOrganization, { isLoading: isLoadingOrganization }] = useLoginOrganizationMutation();
  
  const isLoading = isLoadingVolunteer || isLoadingOrganization;
  

  const handleLogin = async () => {
    console.log(userMode);
    
    setError(null);
    setSuccess(false);
    try {
      let response;
      if (userMode === "Volunteer") {
        response = await loginVolunteer({ email, password }).unwrap();
      } else if (userMode === "Organization") {
        response = await loginOrganization({ email, password }).unwrap();
      } else {
        setError("יש לבחור מצב משתמש (מתנדב או ארגון)");
        return;
      }

      const { accessToken } = response;
      localStorage.setItem('token', accessToken);

      const userData = jwtDecode<Volunteer | Organization>(accessToken);
      localStorage.setItem("user", JSON.stringify(userData));
      dispatch(setCurrentUser(userData));
      
      setSuccess(true);
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
