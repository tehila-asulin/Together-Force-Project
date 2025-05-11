import * as React from "react";
import {
  Box, Divider, Stack, Typography, Card, CardActions, CardOverflow,
  Checkbox, List, ListItem, Sheet, Avatar
} from "@mui/joy";
import { Done } from "@mui/icons-material";
import { TextField, FormControlLabel, RadioGroup, Radio } from "@mui/material";
import Button from "@mui/joy/Button";
import { Controller, useForm } from "react-hook-form";
import { styles } from "../styles/style";
import volunteerCategories from "../../public/volunteerCategories.json";
import AddVolunteeringSchema from "../schemas/AddVolunteeringSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import cities from "../../public/dataCities.json";
import { useCreateVolunteeringMutation } from '../redux/slices/api/volunteeringApiSlice';
import {useEditOrganizationMutation} from "../redux/slices/api/organizationApiSlice"
import { selectCurrentUser} from "../redux/slices/togetherForceSlice";
import { useDispatch, useSelector } from "react-redux";
import { Organization } from '../interface/Organization'; 
const VolunteeringForm = () => {
  const {
    reset,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(AddVolunteeringSchema),
    defaultValues: {
      title: "",
      description: "",
      origin: [],
      phone: "",
      isDone: false
    }
  });

  const [searchTerm, setSearchTerm] = React.useState("");
  const [showMenu, setShowMenu] = React.useState(false);
  const [createNewVolunteering] = useCreateVolunteeringMutation();
  const [updateOrganization]=useEditOrganizationMutation()
  const currentUser = useSelector(selectCurrentUser);

  const selectedCities = watch("origin");

  // const onSubmit = (data: any) => {
  //   try {
  //     console.log("Form Data:", data);
  //     createNewVolunteering(data);
  
  //     if (currentUser && 'organizationNumber' in currentUser) {
  //       console.log("iiii");
  //       const updatedOrg = {
  //         ...currentUser,
  //         history: [...(currentUser.history || []), data],
         
          
  //       };
  //       console.log(updatedOrg);
  //       updateOrganization(updatedOrg as Organization); 
  //       console.log(updatedOrg);

  //     }
  
  //     reset();
  //   } catch (error) {
  //     console.error("Error adding volunteering:", error);
  //   }
  // };
  
  
const onSubmit = async (data: any) => {
  try {
    console.log("Form Data:", data);

    // 1. שמירה של ההתנדבות
    const res = await createNewVolunteering(data).unwrap();  // unwrap מחלץ את המידע מהתגובה
    console.log(res);

    // 2. עדכון ההיסטוריה רק אחרי שיצירה הצליחה
    if (currentUser && 'organizationNumber' in currentUser) {
      const updatedOrg: Organization = {
        ...currentUser,
        history: [...(currentUser.history ?? []), res], // מוסיפה את ההתנדבות החדשה לסוף ההיסטוריה
      };
      await updateOrganization(updatedOrg);
      
    }

    reset();
  } catch (error) {
    console.error("Error adding volunteering:", error);
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
              <Typography level="title-md">Volunteer Info</Typography>
            </Box>
            <Divider />

            {/* בחירת אפשרות התנדבות אחת בלבד */}
            <Box sx={{ width: 400 }}>
              <Typography level="h4" sx={styles.titleVolunteerOptions}>
                אפשרויות התנדבות
              </Typography>
              {errors.title && <Typography color="danger">{errors.title.message}</Typography>}
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field}>
                    {Object.entries(volunteerCategories).map(([category, options]) => (
                      <Box key={category} sx={styles.categoryBox}>
                        <Typography level="body-sm" sx={styles.categoryTitle}>
                          {category}
                        </Typography>
                        <List orientation="horizontal" wrap sx={styles.listItems}>
                          {options.map((option, index) => (
                            <ListItem key={index}>
                              <FormControlLabel
                                control={<Radio />}
                                label={option.name}
                                value={option.name}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    ))}
                  </RadioGroup>
                )}
              />
            </Box>

            {/* ערים */}
            <Sheet variant="outlined" sx={styles.sheet}>
              <Box sx={styles.headerWithSearch}>
                <Typography id="cities" level="body-sm" sx={styles.title}>
                  בחירת עיר
                </Typography>
                <TextField
                  placeholder="חפש עיר..."
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  sx={styles.searchField}
                />
              </Box>

              {errors.origin && <Typography color="danger">{errors.origin.message}</Typography>}

              {showMenu && (
                <List sx={styles.list}>
                  {cities
                    .filter((city) => city.name.includes(searchTerm))
                    .map((city, index) => (
                      <ListItem key={index}>
                        {selectedCities.includes(city.name) && (
                          <Done color="primary" sx={styles.doneIcon} />
                        )}
                        <Controller
                          name="origin"
                          control={control}
                          render={({ field }) => (
                            <Checkbox
                              size="sm"
                              disableIcon
                              overlay
                              label={city.name}
                              checked={field.value.includes(city.name)}
                              onChange={(event) => {
                                const newSelected = event.target.checked
                                  ? [...field.value, city.name]
                                  : field.value.filter((name) => name !== city.name);
                                field.onChange(newSelected);
                              }}
                            />
                          )}
                        />
                      </ListItem>
                    ))}
                </List>
              )}
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
