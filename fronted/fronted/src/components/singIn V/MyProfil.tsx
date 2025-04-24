import * as React from "react";
import { Box, Divider, Stack, Typography, Card, CardActions, CardOverflow, Checkbox, List, ListItem, Sheet, Avatar } from "@mui/joy";
import { Done } from "@mui/icons-material";
import { TextField } from "@mui/material";
import Button from "@mui/joy/Button";
import { Controller, useForm } from "react-hook-form";
import { styles } from "../../styles/style";  // ייבוא העיצובים
import volunteerCategories from "../../../public/volunteerCategories.json"; 
import profileSchema from "../../schemas/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import cities from "../../../public/dataCities.json";
import {useCreateVolunteerMutation} from '../../redux/slices/api/volunteerApiSlice'

const MyProfile=() =>{
  const { reset, handleSubmit, watch, control, formState: { errors } } = useForm({
    mode: "onBlur",
    resolver: zodResolver(profileSchema), 
    defaultValues: { 
      fullName: "", 
      idNumber: "", 
      selectedCities: [], 
      profileImage:"",  
      email: "", 
      phone: "",
      password:"",
      selectedVolunteerOptions: [] 
  }});

  const [searchTerm, setSearchTerm] =React.useState("");
  const [showMenu, setShowMenu] = React.useState(false);

   const [createNewVolunteer]=useCreateVolunteerMutation()

  const selectedCities = watch("selectedCities");
  const profileImage = watch("profileImage");

  const onSubmit = (data: any) => {
    try{
      console.log("Form Data:", data);
      createNewVolunteer(data)
      reset();

    }
    catch{
    console.log("error to add volunteer");
    }

  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowMenu(value.length > 0); 
  };

  return (
    <Box sx={styles.container}>
      <Stack spacing={4} sx={styles.stack}>
        <Card sx={styles.card}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mb: 1 }}>
              <Typography level="title-md">Personal Info</Typography>
            </Box>
            <Divider />
            <Stack spacing={2}>
              {/* העלאת תמונת פרופיל */}
              <Box sx={styles.avatarBox}>
                <Avatar src={profileImage || "/default-avatar.png"} sx={styles.avatar} />
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
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              field.onChange(reader.result); 
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        style={styles.uploadButton}
                        id="profile-upload"
                      />
                      <label htmlFor="profile-upload">
                        <Button component="span" variant="outlined" size="sm">
                          Upload Image
                        </Button>
                      </label>
                    </>
                  )}
                />
              </Box>

              <Controller 
                name="fullName"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Full Name" fullWidth margin="normal" error={!!errors.fullName} helperText={errors.fullName?.message} />
                )}
              />
              <Controller 
                name="idNumber"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="ID Number" fullWidth margin="normal" error={!!errors.idNumber} helperText={errors.idNumber?.message} />
                )}
              />
              <Controller 
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Phone" fullWidth margin="normal" error={!!errors.phone} helperText={errors.phone?.message} />
                )}
              />
              <Controller 
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Email" fullWidth margin="normal" error={!!errors.email} helperText={errors.email?.message} />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="Password"
                    fullWidth
                    margin="normal"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
            </Stack>

            {errors.selectedVolunteerOptions && <Typography>{errors.selectedVolunteerOptions.message}</Typography>}

            <Box sx={{ width: 400 }}>
              <Typography level="h4" sx={styles.titleVolunteerOptions}>
                אפשרויות התנדבות
              </Typography>
              {Object.entries(volunteerCategories).map(([category, options]) => (
                <Box key={category} sx={styles.categoryBox}>
                  <Typography level="body-sm" sx={styles.categoryTitle}>
                    {category}
                  </Typography>
                  <List orientation="horizontal" wrap sx={styles.listItems}>
                    {options.map((option, index) => (
                      <ListItem key={index}>
                        <Controller
                          name="selectedVolunteerOptions"
                          control={control}
                          render={({ field }) => (
                            <Checkbox
                              overlay
                              disableIcon
                              variant="soft"
                              label={option.name}
                              checked={field.value.includes(option.name)}
                              onChange={(event) => {
                                const newSelected = event.target.checked
                                  ? [...field.value, option.name]
                                  : field.value.filter((item) => item !== option.name);
                                field.onChange(newSelected);
                              }}
                            />
                          )}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ))}
            </Box>

            {errors.selectedCities && <Typography>{errors.selectedCities.message}</Typography>}

            <Sheet variant="outlined" sx={styles.sheet}>
              <Box sx={styles.headerWithSearch}>
                <Typography id="cities" level="body-sm" sx={styles.title}>
                  choose city
                </Typography>
                <TextField
                  placeholder="search city...."
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  sx={styles.searchField}
                />
              </Box>

              {showMenu && (
                <List sx={styles.list}>
                  {cities
                    .filter((city) => city.name.includes(searchTerm))
                    .map((city, index) => (
                      <ListItem key={index}>
                        {selectedCities.includes(city.name) && <Done color="primary" sx={styles.doneIcon} />}
                        <Controller
                          name="selectedCities"
                          control={control}
                          render={({ field }) => (
                            <Checkbox
                              size="sm"
                              disableIcon
                              overlay
                              label={city.name}
                              checked={field.value.includes(city.name)}
                              onChange={(event) => {
                                const newSelectedCities = event.target.checked
                                  ? [...field.value, city.name]
                                  : field.value.filter((text) => text !== city.name);
                                field.onChange(newSelectedCities);
                              }}
                            />
                          )}
                        />
                      </ListItem>
                    ))}
                </List>
              )}
            </Sheet>

            <CardOverflow sx={styles.cardOverflow}>
              <CardActions sx={styles.cardActions}>
                <Button type="submit" size="sm" variant="solid">
                  Save
                </Button>
              </CardActions>
            </CardOverflow>
          </form>
        </Card>
      </Stack>
    </Box>
  );
}
export default MyProfile