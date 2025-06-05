import {Box,Divider,Stack, Typography,Card,CardActions,CardOverflow,Sheet,} from "@mui/joy";
import Button from "@mui/joy/Button";
import { Controller, useForm } from "react-hook-form";
import { styles } from "../styles/style";
import volunteerCategories from "../../public/volunteerCategories.json";
import AddVolunteeringSchema from "../schemas/AddVolunteeringSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import cities from "../../public/dataCities.json";
import { useCreateVolunteeringMutation } from "../redux/slices/api/volunteeringApiSlice";
import { selectCurrentUser } from "../redux/slices/togetherForceSlice";
import { useSelector } from "react-redux";
import { Volunteering } from "../interface/Volunteering";
import { TextField, Autocomplete, Alert } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useNavigate } from "react-router";
import { useState } from "react";
const VolunteeringForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors ,isSubmitting},
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(AddVolunteeringSchema),
    defaultValues: {
      title: "",
      description: "",
      origin: "",
      phone: "",
      isDone: false,
      deadline: undefined,
    },
  });

  const [createNewVolunteering] = useCreateVolunteeringMutation();
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

      await createNewVolunteering(updatedVo).unwrap();
      reset();
      navigate("/");
    } catch (error: any) {
      setError(error)
    }
  };

  return (
    <Box sx={styles.container}>
      <Stack spacing={4} sx={styles.formStack}>
        <Card sx={styles.formCard}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mb: 1 }}>
              <Typography level="title-md">טופס הוספת בקשת הנתנדבות</Typography>
            </Box>
            <Divider />

            <Box sx={styles.volunteerCategoryBox}>
              <Typography level="h4" sx={styles.volunteerOptionsTitle}>
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

            <Sheet variant="outlined" sx={{ ...styles.sheet, mt: 3 }}>
              <Typography level="body-sm" sx={styles.sectionTitle}>
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

            {error && (
              <Box mt={2}>
                <Alert severity="error">{error}</Alert>
              </Box>
            )}

            <CardOverflow sx={styles.cardOverflow}>
              <CardActions sx={styles.cardActions}>
                <Button type="submit" size="sm" variant="solid" disabled={isSubmitting}>
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
