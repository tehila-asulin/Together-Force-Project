import { Box, Divider, Stack, Typography, Card, CardActions, CardOverflow, Sheet, Avatar } from "@mui/joy";
import { useState } from "react";
import { TextField, Autocomplete, Alert } from "@mui/material";
import Button from "@mui/joy/Button";
import { Controller, useForm } from "react-hook-form";
import { styles } from "../../styles/style";
import volunteerCategories from "../../../public/volunteerCategories.json";
import { zodResolver } from "@hookform/resolvers/zod";
import cities from "../../../public/dataCities.json";
import { selectCurrentUser, setUserMode } from "../../redux/slices/togetherForceSlice";
import { useCreateVolunteerMutation, useEditVolunteerMutation } from "../../redux/slices/api/volunteerApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, } from "../../redux/slices/togetherForceSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { UserModes } from "../../interface/UserModes";
import getProfileVolunteerSchema from "../../schemas/profileSchema";

const SingUpVolunteer = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const [updateVolunteer] = useEditVolunteerMutation();
  const isEditMode = !!(currentUser && "idNumber" in currentUser);
  const { reset, handleSubmit, watch, control, formState: { errors, isSubmitting } } =
    useForm({
      mode: "onBlur",
      resolver: zodResolver(getProfileVolunteerSchema(isEditMode)),
      defaultValues:
        isEditMode
          ? {
            name: currentUser.name || "",
            idNumber: currentUser.idNumber || "",
            selectedCities: currentUser.selectedCities || [],
            profileImage: currentUser.profileImage || "",
            email: currentUser.email || "",
            phone: currentUser.phone || "",
            password: "",
            selectedVolunteerOptions: currentUser.selectedVolunteerOptions || [],
          }
          : {
            name: "",
            idNumber: "",
            selectedCities: [],
            profileImage: "",
            email: "",
            phone: "",
            password: "",
            selectedVolunteerOptions: [],
          }
    });

  const [error, setError] = useState<string | null>(null);
  const [createNewVolunteer] = useCreateVolunteerMutation();
  const profileImage = watch("profileImage");

  const dispatch = useDispatch();
  const allVolunteerOptions = Object.values(volunteerCategories);

  const onSubmit = async (data: any) => {
    try {
      if (isEditMode && !data.password) {
        delete data.password;
      }
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("selectedVolunteerOptions", JSON.stringify(data.selectedVolunteerOptions));
      formData.append("phone", data.phone);
      formData.append("idNumber", data.idNumber);
      formData.append("password", data.password);
      formData.append("selectedCities", JSON.stringify(data.selectedCities));
      if (data.profileImage instanceof File) {
        formData.append("profileImage", data.profileImage);
      }
      let result = null
      if (isEditMode) {
        formData.append("_id", currentUser._id);
        result = await updateVolunteer(formData).unwrap();
      } else {
         result = await createNewVolunteer(formData).unwrap();
      }
      if (result.accessToken) {
        Cookies.set("token", result.accessToken, { expires: 7, path: "/" });
      }
      if (result.volunteer) {
        dispatch(setCurrentUser(result.volunteer));
        localStorage.setItem("user", JSON.stringify(result.volunteer));
        localStorage.setItem("userMode", UserModes.Volunteer);
        dispatch(setUserMode(UserModes.Volunteer));
        navigate("/");
        reset();
      }

    }

     catch (error: any) {
    setError(error.data.message)
  }
}


return (
  <Box sx={styles.container}>
    <Stack spacing={4} sx={styles.stack}>
      <Card sx={styles.card}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">פרופיל מתנדב</Typography>
          </Box>
          <Divider />
          <Stack spacing={2}>
            <Box sx={styles.avatarBox}>
              <Avatar
                src={
                  profileImage instanceof File
                    ? URL.createObjectURL(profileImage)
                    : currentUser?.profileImage || "/default-avatar.png"
                }
                sx={styles.avatar}
              />
              <Controller
                name="profileImage"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          field.onChange(file);
                        }
                      }}
                      style={styles.uploadButton}
                      id="profile-upload"
                    />
                    <label htmlFor="profile-upload">
                      <Button component="span" variant="outlined" size="sm">
                        העלאת תמונה
                      </Button>
                    </label>
                  </>
                )}
              />
            </Box>

            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="שם מלא"
                  fullWidth
                  margin="normal"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
            <Controller
              name="idNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="תעודת זהות"
                  fullWidth
                  margin="normal"
                  error={!!errors.idNumber}
                  helperText={errors.idNumber?.message}
                  disabled={isEditMode}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="טלפון"
                  fullWidth
                  margin="normal"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}

                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="מייל"
                  fullWidth
                  margin="normal"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  disabled={isEditMode}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="סיסמא"
                  fullWidth
                  margin="normal"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  disabled={isEditMode}
                />
              )}
            />
          </Stack>

          <Box sx={{ width: 400 }}>
            <Typography level="h4" sx={styles.titleVolunteerOptions}>
              אפשרויות התנדבות
            </Typography>
            <Controller
              name="selectedVolunteerOptions"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <Autocomplete
                  multiple
                  options={allVolunteerOptions}
                  value={field.value}
                  onChange={(_, newValue) => field.onChange(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="בחר תחומי התנדבות" disabled={isEditMode} />
                  )}

                />
              )}
            />
          </Box>

          <Sheet variant="outlined" sx={{ mt: 3, p: 2 }}>
            <Typography level="body-sm" sx={styles.title}>
              בחירת ערים
            </Typography>

            <Controller
              name="selectedCities"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <Autocomplete
                  multiple
                  options={cities.map((city) => city.name)}
                  value={field.value || []}
                  onChange={(_, newValue) => field.onChange(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="בחר ערים"
                      error={!!errors.selectedCities}
                      helperText={errors.selectedCities?.message}
                      size="small"
                    />
                  )}
                  disableCloseOnSelect
                  clearOnEscape
                />
              )}
            />
          </Sheet>
          {error && (
            <Box mt={2}>
              <Alert severity="error">{error}</Alert>
            </Box>
          )}
          <CardOverflow sx={styles.cardOverflow}>
            <CardActions sx={styles.cardActions}>
              <Button type="submit" size="sm" variant="solid" disabled={isSubmitting}>
                {isEditMode ? "עדכן" : "הירשם"}
              </Button>
            </CardActions>
          </CardOverflow>
        </form>
      </Card>
    </Stack>
  </Box>
);
};

export default SingUpVolunteer;

