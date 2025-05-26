import * as React from "react";
import {
  Box,
  Divider,
  Stack,
  Typography,
  Card,
  CardActions,
  CardOverflow,
  Sheet,
} from "@mui/joy";
import Button from "@mui/joy/Button";
import { Controller, useForm } from "react-hook-form";
import { styles } from "../styles/style";
import volunteerCategories from "../../public/volunteerCategories.json";
import AddVolunteeringSchema from "../schemas/AddVolunteeringSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import cities from "../../public/dataCities.json";
import { useCreateVolunteeringMutation } from "../redux/slices/api/volunteeringApiSlice";
import { useEditOrganizationMutation } from "../redux/slices/api/organizationApiSlice";
import { selectCurrentUser } from "../redux/slices/togetherForceSlice";
import { useSelector } from "react-redux";
import { Volunteering } from "../interface/Volunteering";
import { TextField, Autocomplete } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useNavigate } from "react-router";

const VolunteeringForm = () => {
    const navigate = useNavigate();
  const {
    reset,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(AddVolunteeringSchema),
    defaultValues: {
      title: "",
      description: "",
      origin: "", // עיר אחת בלבד - מחרוזת
      phone: "",
      isDone: false,
      deadline: undefined,
    },
  });

  const [createNewVolunteering] = useCreateVolunteeringMutation();
  const [updateOrganization] = useEditOrganizationMutation();
  const currentUser = useSelector(selectCurrentUser);

  const onSubmit = async (data: any) => {
    try {
      console.log("Form Data:", data);

      let updatedVo: Volunteering;

      if (currentUser && "organizationNumber" in currentUser) {
        updatedVo = {
          ...data,
          byOrganizationNumber: currentUser.organizationNumber,
        };
      } else {
        throw new Error("Missing organizationNumber");
      }

      const res = await createNewVolunteering(updatedVo).unwrap();
      reset();
      navigate("/");
    } catch (error) {
      console.error("Error adding volunteering:", error);
    }
  };

  return (
    <Box sx={styles.container}>
      <Stack spacing={4} sx={styles.stack}>
        <Card sx={styles.card}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mb: 1 }}>
              <Typography level="title-md">Volunteer Info</Typography>
            </Box>
            <Divider />

            {/* בחירת תחום התנדבות */}
            <Box sx={{ width: 400 }}>
              <Typography level="h4" sx={styles.titleVolunteerOptions}>
                אפשרויות התנדבות
              </Typography>
              {errors.title && (
                <Typography color="danger">{errors.title.message}</Typography>
              )}
              <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Autocomplete
                    options={Object.values(volunteerCategories)}
                    value={field.value || null}
                    onChange={(_, newValue) => field.onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="בחר תחום התנדבות"
                        error={!!errors.title}
                        helperText={errors.title?.message}
                      />
                    )}
                  />
                )}
              />
            </Box>

            {/* בחירת עיר - באמצעות Autocomplete */}
            <Sheet variant="outlined" sx={{ mt: 3, p: 2 }}>
              <Typography level="body-sm" sx={styles.title}>
                בחירת עיר
              </Typography>

              <Controller
                name="origin"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Autocomplete
                    options={cities.map((city) => city.name)}
                    value={field.value ?? undefined}
                    onChange={(_, newValue) => field.onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="בחר עיר"
                        error={!!errors.origin}
                        helperText={errors.origin?.message}
                        size="small"
                      />
                    )}
                    disableClearable
                    clearOnEscape
                  />
                )}
              />
            </Sheet>

            {/* תיאור (לא חובה) */}
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="פרטים נוספים"
                  multiline
                  margin="normal"
                  fullWidth
                  rows={4}
                />
              )}
            />

            {/* טלפון */}
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="טלפון"
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  margin="normal"
                />
              )}
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Controller
                name="deadline"
                control={control}
                render={({ field }) => (
                  <DateTimePicker
                    {...field}
                    label="תאריך ושעת דדליין"
                    value={field.value || null}
                    onChange={(newValue) => field.onChange(newValue)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        margin: "normal",
                        error: !!errors.deadline,
                        helperText: errors.deadline?.message,
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>

            <CardOverflow sx={styles.cardOverflow}>
              <CardActions sx={styles.cardActions}>
                <Button type="submit" size="sm" variant="solid">
                  שמירה
                </Button>
              </CardActions>
            </CardOverflow>
          </form>
        </Card>
      </Stack>
    </Box>
  );
};

export default VolunteeringForm;
