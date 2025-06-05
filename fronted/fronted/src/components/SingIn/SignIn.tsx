import Cookies from "js-cookie";
import { useState } from 'react';
import {Container,TextField,Button,Typography,Box,Paper,Alert} from '@mui/material';
import { useDispatch } from "react-redux";
import { useLoginVolunteerMutation } from '../../redux/slices/api/volunteerApiSlice';
import { useLoginOrganizationMutation } from '../../redux/slices/api/organizationApiSlice';
import { setCurrentUser, setUserMode } from "../../redux/slices/togetherForceSlice";
import { useNavigate, useParams } from "react-router";
import { UserModes } from '../../interface/UserModes';

const SignIn = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userModeLog } = useParams();


  const userMode =
    userModeLog === "volunteer"
      ? UserModes.Volunteer
      : userModeLog === "organization"
      ? UserModes.Organization
      : null;

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
        fullUser = loginResponse.volunteer;
      } else if (userMode === UserModes.Organization) {
        const loginResponse = await loginOrganization({ email, password }).unwrap();
        response = loginResponse;
        fullUser = loginResponse.organization;
      } else {
        setError("יש לבחור מצב משתמש (מתנדב או ארגון)");
        return;
      }

      Cookies.set("token", response.accessToken, { expires: 7, path: "/" });
    
      if (!fullUser) {
        setError("פרטי המשתמש לא התקבלו בהתחברות.");
        return;
      }

      dispatch(setCurrentUser(fullUser));
      localStorage.setItem("user", JSON.stringify(fullUser));
      localStorage.setItem("userMode", userMode);
      dispatch(setUserMode(userMode))

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

