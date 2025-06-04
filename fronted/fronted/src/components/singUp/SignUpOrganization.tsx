import { Box, Divider, Stack, Typography, Card, CardActions, Avatar } from "@mui/joy";
import { TextField, Alert } from "@mui/material";
import Button from "@mui/joy/Button";
import { Controller, useForm } from "react-hook-form";
import { styles } from "../../styles/style";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateOrganizationMutation, useEditOrganizationMutation } from '../../redux/slices/api/organizationApiSlice';
import getProfileOrganizationSchema from "../../schemas/profileOrganizationSchema";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setCurrentUser, setUserMode } from "../../redux/slices/togetherForceSlice";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { useState } from "react";
import { UserModes } from "../../interface/UserModes";

const SingUpOrganization = () => {
  const [error, setError] = useState<string | null>(null);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editOrganization] = useEditOrganizationMutation();

  const [previewImage, setPreviewImage] = useState(
    currentUser?.profileImage || "/default-avatar.png"
  );

  const isEditMode = !!(currentUser && "organizationNumber" in currentUser);

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(getProfileOrganizationSchema(isEditMode)),
    defaultValues: isEditMode
      ? {
        name: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        password: "",
        profileImage: currentUser.profileImage || "",
        organizationNumber: String(currentUser.organizationNumber) || "",
      }
      : {
        name: "",
        email: "",
        phone: "",
        password: "",
        profileImage: "",
        organizationNumber: "",
      },
  });

  const [CreateOrganizationMutation] = useCreateOrganizationMutation();

  const onSubmit = async (data: any) => {
    try {
      if (isEditMode && !data.password) {
        delete data.password;
      }

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("organizationNumber", data.organizationNumber);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      if (data.password) formData.append("password", data.password);
      if (data.profileImage instanceof File) {
        formData.append("profileImage", data.profileImage);
      }
      let result = null
      if (isEditMode) {
        formData.append("_id", currentUser._id);
        result = await editOrganization(formData).unwrap();
      } else {
        result = await CreateOrganizationMutation(formData).unwrap()
      }
      if (result.accessToken) {
        Cookies.set("token", result.accessToken, { expires: 7, path: "/" });
      }
      if (result.organization) {
        dispatch(setCurrentUser(result.organization));
        dispatch(setUserMode(UserModes.Organization));
        localStorage.setItem("user", JSON.stringify(result.organization));
        localStorage.setItem("userMode", UserModes.Organization);
        navigate("/");
        reset();
      }
    }
    catch (error: any) {
      console.log(error);

      setError(error.data.message)
    }
  };

  return (
    <Box sx={styles.container}>
      <Stack spacing={4} sx={styles.stack}>
        <Card sx={styles.card}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mb: 1 }}>
              <Typography level="title-md">פרופיל ארגון</Typography>
            </Box>
            <Divider />
            <Stack spacing={2}>

              <Box sx={styles.avatarBox}>
                <Avatar
                  src={previewImage}
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
                            setPreviewImage(URL.createObjectURL(file));
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
                    label="שם הארגון"
                    fullWidth
                    margin="normal"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />

              <Controller
                name="organizationNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="מספר ארגון"
                    fullWidth
                    margin="normal"
                    error={!!errors.organizationNumber}
                    helperText={errors.organizationNumber?.message}
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
            {error && (
              <Box mt={2}>
                <Alert severity="error">{error}</Alert>
              </Box>
            )}
            <CardActions sx={styles.cardActions}>
              <Button type="submit" size="sm" variant="solid" disabled={isSubmitting}>
                {isEditMode ? "עדכן" : "הירשם"}
              </Button>
            </CardActions>
          </form>
        </Card>
      </Stack>
    </Box>
  );
};

export default SingUpOrganization;

