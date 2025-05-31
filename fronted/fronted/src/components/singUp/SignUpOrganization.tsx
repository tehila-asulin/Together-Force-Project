// // import { Box, Divider, Stack, Typography, Card, CardActions, CardOverflow, Avatar } from "@mui/joy";
// // import { TextField } from "@mui/material";
// // import Button from "@mui/joy/Button";
// // import { Controller, useForm } from "react-hook-form";
// // import { styles } from "../../styles/style";  // ייבוא העיצובים
// // import profileOrganizationSchema from "../../schemas/profileOrganizationSchema"
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import {useCreateOrganizationMutation} from '../../redux/slices/api/organizationApiSlice'

// // const SingUpOrganization = () => {
// //     const { reset, handleSubmit, watch, control, formState: { errors } } = useForm({
// //         mode: "onBlur",
// //         resolver: zodResolver(profileOrganizationSchema), 
// //         defaultValues: { 
// //           name: "", 
// //           profileImage: "",  
// //           email: "", 
// //           phone: "",
// //           password: "",
// //           organizationNumber: "", 
// //         },});

// //       const profileImage = watch("profileImage");
// //       const [CreateOrganizationMutation]=useCreateOrganizationMutation()

// //       // const onSubmit = (data: any) => {
// //       //   try{
// //       //     console.log("Form Data:", data);
// //       //     CreateOrganizationMutation(data)
// //       //     reset();
// //       //   }
// //       //   catch{
// //       //   console.log("error to add organization");
// //       //   }

// //       // };

// // //     const onSubmit = async (data: any) => {
// // //   try {
// // //     const formData = new FormData();
// // //     formData.append("name", data.name);
// // //     formData.append("organizationNumber", data.organizationNumber);
// // //     formData.append("email", data.email);
// // //     formData.append("phone", data.phone);
// // //     formData.append("password", data.password);

// // //     // במקרה שאתה שומר את התמונה כ־Base64, תצטרך להמיר ל־File או לשלוח לשרת בצורה אחרת.
// // //     if (typeof data.profileImage === "string" && data.profileImage.startsWith("data:image")) {
// // //       const blob = await (await fetch(data.profileImage)).blob();
// // //       const file = new File([blob], "profile.jpg", { type: blob.type });
// // //       formData.append("profileImage", file);
// // //     }

// // //     await CreateOrganizationMutation(formData);
// // //     reset();
// // //   } catch (error) {
// // //     console.error("Error adding organization:", error);
// // //   }
// // // };
// // // הוספנו שימוש ב־FormData ושולחים קובץ תמונה אמיתי לשרת
// // const onSubmit = async (data: any) => {
// //   try {
// //     const formData = new FormData();
// //     formData.append("name", data.name);
// //     formData.append("organizationNumber", data.organizationNumber);
// //     formData.append("email", data.email);
// //     formData.append("phone", data.phone);
// //     formData.append("password", data.password);

// //     if (data.profileImage instanceof File) {
// //       formData.append("profileImage", data.profileImage);
// //     }

// //     await CreateOrganizationMutation(formData);
// //     reset();
// //   } catch (error) {
// //     console.error("Error adding organization:", error);
// //   }
// // };

// //       return (
// //         <Box sx={styles.container}>
// //           <Stack spacing={4} sx={styles.stack}>
// //             <Card sx={styles.card}>
// //               <form onSubmit={handleSubmit(onSubmit)}>
// //                 <Box sx={{ mb: 1 }}>
// //                   <Typography level="title-md">Personal Info</Typography>
// //                 </Box>
// //                 <Divider />
// //                 <Stack spacing={2}>
// //                   {/* העלאת תמונת פרופיל */}
// //                   <Box sx={styles.avatarBox}>
// //                     <Avatar src={profileImage || "/default-avatar.png"} sx={styles.avatar} />
// //                     <Controller
// //                       name="profileImage"
// //                       control={control}
// //                       render={({ field }) => (
// //                         <>
// //                           <input
// //                             type="file"
// //                             accept="image/*"
// //                             onChange={(event) => {
// //                               const file = event.target.files?.[0];
// //                               if (file) {
// //                                 const reader = new FileReader();
// //                                 reader.onloadend = () => {
// //                                   field.onChange(reader.result); 
// //                                 };
// //                                 reader.readAsDataURL(file);
// //                               }
// //                             }}
// //                             style={styles.uploadButton}
// //                             id="profile-upload"
// //                           />
// //                           <label htmlFor="profile-upload">
// //                             <Button component="span" variant="outlined" size="sm">
// //                               Upload Image
// //                             </Button>
// //                           </label>
// //                         </>
// //                       )}
// //                     />
// //                   </Box>

// //                   <Controller 
// //                     name="name"
// //                     control={control}
// //                     render={({ field }) => (
// //                       <TextField {...field} label="Full Name" fullWidth margin="normal" error={!!errors.name} helperText={errors.name?.message} />
// //                     )}
// //                   />
// //                   <Controller 
// //                     name="organizationNumber"
// //                     control={control}
// //                     render={({ field }) => (
// //                       <TextField {...field} label="ID Number" fullWidth margin="normal" error={!!errors.organizationNumber} helperText={errors.organizationNumber?.message} />
// //                     )}
// //                   />
// //                   <Controller 
// //                     name="phone"
// //                     control={control}
// //                     render={({ field }) => (
// //                       <TextField {...field} label="Phone" fullWidth margin="normal" error={!!errors.phone} helperText={errors.phone?.message} />
// //                     )}
// //                   />
// //                   <Controller 
// //                     name="email"
// //                     control={control}
// //                     render={({ field }) => (
// //                       <TextField {...field} label="Email" fullWidth margin="normal" error={!!errors.email} helperText={errors.email?.message} />
// //                     )}
// //                   />
// //                   <Controller
// //   name="password"
// //   control={control}
// //   render={({ field }) => (
// //     <TextField
// //       {...field}
// //       type="password"
// //       label="Password"
// //       fullWidth
// //       margin="normal"
// //       error={!!errors.password}
// //       helperText={errors.password?.message}
// //     />
// //   )}
// // />

// //                 </Stack>


// //                 <CardOverflow sx={styles.cardOverflow}>
// //                   <CardActions sx={styles.cardActions}>
// //                     <Button type="submit" size="sm" variant="solid">
// //                       Save
// //                     </Button>
// //                   </CardActions>
// //                 </CardOverflow>
// //               </form>
// //             </Card>
// //           </Stack>
// //         </Box>
// //       );
// // }

// // export default SingUpOrganization





// import { Box, Divider, Stack, Typography, Card, CardActions, CardOverflow, Avatar } from "@mui/joy";
// import { TextField } from "@mui/material";
// import Button from "@mui/joy/Button";
// import { Controller, useForm } from "react-hook-form";
// import { styles } from "../../styles/style";  // ייבוא העיצובים
// import profileOrganizationSchema from "../../schemas/profileOrganizationSchema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useCreateOrganizationMutation } from '../../redux/slices/api/organizationApiSlice';

// const SingUpOrganization = () => {
//     const { reset, handleSubmit, watch, control, formState: { errors } } = useForm({
//         mode: "onBlur",
//         resolver: zodResolver(profileOrganizationSchema), 
//         defaultValues: { 
//           name: "", 
//           profileImage: "",  
//           email: "", 
//           phone: "",
//           password: "",
//           organizationNumber: "", 
//         },
//     });

//     const profileImage = watch("profileImage");
//     const [CreateOrganizationMutation] = useCreateOrganizationMutation();

//     const onSubmit = async (data: any) => {
//         try {
//             const formData = new FormData();
//             formData.append("name", data.name);
//             formData.append("organizationNumber", data.organizationNumber);
//             formData.append("email", data.email);
//             formData.append("phone", data.phone);
//             formData.append("password", data.password);

//             // בדוק אם קיים קובץ והוסף אותו כקובץ אמיתי ל־FormData
//             if (data.profileImage instanceof File) {
//                 formData.append("profileImage", data.profileImage);
//             }

//             await CreateOrganizationMutation(formData);
//             reset();
//         } catch (error) {
//             console.error("Error adding organization:", error);
//         }
//     };

//     return (
//         <Box sx={styles.container}>
//             <Stack spacing={4} sx={styles.stack}>
//                 <Card sx={styles.card}>
//                     <form onSubmit={handleSubmit(onSubmit)}>
//                         <Box sx={{ mb: 1 }}>
//                             <Typography level="title-md">Personal Info</Typography>
//                         </Box>
//                         <Divider />
//                         <Stack spacing={2}>
//                          {/* העלאת תמונת פרופיל */}
//                  <Box sx={styles.avatarBox}>
//                    <Avatar
//   src={profileImage instanceof File ? URL.createObjectURL(profileImage) : "/default-avatar.png"}
//   sx={styles.avatar}
// />

//                   <Controller
//   name="profileImage"
//   control={control}
//   render={({ field }) => (
//     <>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={(event) => {
//           const file = event.target.files?.[0];
//           if (file) {
//             field.onChange(file); // זה הקובץ האמיתי!
//           }
//         }}
//         style={styles.uploadButton}
//         id="profile-upload"
//       />
//       <label htmlFor="profile-upload">
//         <Button component="span" variant="outlined" size="sm">
//           Upload Image
//         </Button>
//       </label>
//     </>
//   )}
// />

//                   </Box>

//                             <Controller 
//                                 name="name"
//                                 control={control}
//                                 render={({ field }) => (
//                                     <TextField {...field} label="Full Name" fullWidth margin="normal" error={!!errors.name} helperText={errors.name?.message} />
//                                 )}
//                             />
//                             <Controller 
//                                 name="organizationNumber"
//                                 control={control}
//                                 render={({ field }) => (
//                                     <TextField {...field} label="ID Number" fullWidth margin="normal" error={!!errors.organizationNumber} helperText={errors.organizationNumber?.message} />
//                                 )}
//                             />
//                             <Controller 
//                                 name="phone"
//                                 control={control}
//                                 render={({ field }) => (
//                                     <TextField {...field} label="Phone" fullWidth margin="normal" error={!!errors.phone} helperText={errors.phone?.message} />
//                                 )}
//                             />
//                             <Controller 
//                                 name="email"
//                                 control={control}
//                                 render={({ field }) => (
//                                     <TextField {...field} label="Email" fullWidth margin="normal" error={!!errors.email} helperText={errors.email?.message} />
//                                 )}
//                             />
//                             <Controller
//                                 name="password"
//                                 control={control}
//                                 render={({ field }) => (
//                                     <TextField
//                                         {...field}
//                                         type="password"
//                                         label="Password"
//                                         fullWidth
//                                         margin="normal"
//                                         error={!!errors.password}
//                                         helperText={errors.password?.message}
//                                     />
//                                 )}
//                             />

//                         </Stack>

//                         <CardOverflow sx={styles.cardOverflow}>
//                             <CardActions sx={styles.cardActions}>
//                                 <Button type="submit" size="sm" variant="solid">
//                                     Save
//                                 </Button>
//                             </CardActions>
//                         </CardOverflow>
//                     </form>
//                 </Card>
//             </Stack>
//         </Box>
//     );
// }

// export default SingUpOrganization;
// import { Box, Divider, Stack, Typography, Card, CardActions, Avatar } from "@mui/joy";
// import { TextField } from "@mui/material";
// import Button from "@mui/joy/Button";
// import { Controller, useForm } from "react-hook-form";
// import { styles } from "../../styles/style";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useCreateOrganizationMutation } from '../../redux/slices/api/organizationApiSlice';
// import profileOrganizationSchema from "../../schemas/profileOrganizationSchema";
// const SingUpOrganization = () => {
//     const { reset, handleSubmit, watch, control, formState: { errors } } = useForm({
//         mode: "onBlur",
//         resolver: zodResolver(profileOrganizationSchema), 
//         defaultValues: { 
//           name: "", 
//           profileImage: "",  
//           email: "", 
//           phone: "",
//           password: "",
//           organizationNumber: "", 
//         },
//     });

//     const profileImage = watch("profileImage");
//     const [CreateOrganizationMutation] = useCreateOrganizationMutation();

//     const onSubmit = async (data: any) => {
//         try {
//             const formData = new FormData();
//             formData.append("name", data.name);
//             formData.append("organizationNumber", data.organizationNumber);
//             formData.append("email", data.email);
//             formData.append("phone", data.phone);
//             formData.append("password", data.password);

//             // אם קיים קובץ תמונה, הוסף אותו
//             if (data.profileImage instanceof File) {
//                 formData.append("profileImage", data.profileImage);
//             }

//             await CreateOrganizationMutation(formData);  // שליחה ל-API
//             reset();
//         } catch (error) {
//             console.error("Error adding organization:", error);
//         }
//     };

//     return (
//         <Box sx={styles.container}>
//             <Stack spacing={4} sx={styles.stack}>
//                 <Card sx={styles.card}>
//                     <form onSubmit={handleSubmit(onSubmit)}>
//                         <Box sx={{ mb: 1 }}>
//                             <Typography level="title-md">Personal Info</Typography>
//                         </Box>
//                         <Divider />
//                         <Stack spacing={2}>
//                             {/* העלאת תמונת פרופיל */}
//                             <Box sx={styles.avatarBox}>
//                                 <Avatar
//                                     src={profileImage instanceof File ? URL.createObjectURL(profileImage) : "/default-avatar.png"}
//                                     sx={styles.avatar}
//                                 />
//                                 <Controller
//                                     name="profileImage"
//                                     control={control}
//                                     render={({ field }) => (
//                                         <>
//                                             <input
//                                                 type="file"
//                                                 accept="image/*"
//                                                 onChange={(event) => {
//                                                     const file = event.target.files?.[0];
//                                                     if (file) {
//                                                         field.onChange(file); // קובץ אמיתי
//                                                     }
//                                                 }}
//                                                 style={styles.uploadButton}
//                                                 id="profile-upload"
//                                             />
//                                             <label htmlFor="profile-upload">
//                                                 <Button component="span" variant="outlined" size="sm">
//                                                     Upload Image
//                                                 </Button>
//                                             </label>
//                                         </>
//                                     )}
//                                 />
//                             </Box>
//                             <Controller 
//                                 name="name"
//                                 control={control}
//                                 render={({ field }) => (
//                                     <TextField {...field} label="Full Name" fullWidth margin="normal" error={!!errors.name} helperText={errors.name?.message} />
//                                 )}
//                             />
//                             <Controller 
//                                 name="organizationNumber"
//                                 control={control}
//                                 render={({ field }) => (
//                                     <TextField {...field} label="ID Number" fullWidth margin="normal" error={!!errors.organizationNumber} helperText={errors.organizationNumber?.message} />
//                                 )}
//                             />
//                             <Controller 
//                                 name="phone"
//                                 control={control}
//                                 render={({ field }) => (
//                                     <TextField {...field} label="Phone" fullWidth margin="normal" error={!!errors.phone} helperText={errors.phone?.message} />
//                                 )}
//                             />
//                             <Controller 
//                                 name="email"
//                                 control={control}
//                                 render={({ field }) => (
//                                     <TextField {...field} label="Email" fullWidth margin="normal" error={!!errors.email} helperText={errors.email?.message} />
//                                 )}
//                             />
//                             <Controller
//                                 name="password"
//                                 control={control}
//                                 render={({ field }) => (
//                                     <TextField
//                                         {...field}
//                                         type="password"
//                                         label="Password"
//                                         fullWidth
//                                         margin="normal"
//                                         error={!!errors.password}
//                                         helperText={errors.password?.message}
//                                     />
//                                 )}
//                             />
//                         </Stack>

//                         <CardActions sx={styles.cardActions}>
//                             <Button type="submit" size="sm" variant="solid">
//                                 Save
//                             </Button>
//                         </CardActions>
//                     </form>
//                 </Card>
//             </Stack>
//         </Box>
//     );
// };

// export default SingUpOrganization;


// import { Box, Divider, Stack, Typography, Card, CardActions, Avatar } from "@mui/joy";
// import { TextField } from "@mui/material";
// import Button from "@mui/joy/Button";
// import { Controller, useForm } from "react-hook-form";
// import { styles } from "../../styles/style";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useCreateOrganizationMutation, useLoginOrganizationMutation } from '../../redux/slices/api/organizationApiSlice';
// import profileOrganizationSchema from "../../schemas/profileOrganizationSchema";
// import { useDispatch, useSelector } from "react-redux";
// import {selectCurrentUser ,setCurrentUser, selectUserMode } from "../../redux/slices/togetherForceSlice";
// import { useNavigate } from "react-router";
// import {Organization} from "../../interface/Organization"

// import Cookies from "js-cookie";
// const SingUpOrganization = () => {
//     const currentUser=useSelector(selectCurrentUser)
//     const { reset, handleSubmit, watch, control, formState: { errors } } = useForm({
//         mode: "onBlur",
//         resolver: zodResolver(profileOrganizationSchema),

//     defaultValues: (currentUser && "organizationNumber" in currentUser)
//   ? {
//       name: currentUser.name || "",
//       email: currentUser.email || "",
//       phone: currentUser.phone || "",
//       password: "",
//       profileImage: currentUser.profileImage || "",
//      organizationNumber: String(currentUser.organizationNumber) || "",

//     }
//   : {
//       name: "",
//       email: "",
//       phone: "",
//       password: "",
//       profileImage: "",
//       organizationNumber: "",
//     },

//     });

//     const dispatch = useDispatch();
//     const userMode = useSelector(selectUserMode);
//     const profileImage = watch("profileImage");
//     const [CreateOrganizationMutation] = useCreateOrganizationMutation();
//     const [loginOrganization, { isLoading: isLoadingOrganization }] = useLoginOrganizationMutation();
//     const navigate = useNavigate();

//     const onSubmit = async (data: any) => {
//         try {
//             const formData = new FormData();
//             formData.append("name", data.name);
//             formData.append("organizationNumber", data.organizationNumber);
//             formData.append("email", data.email);
//             formData.append("phone", data.phone);
//             formData.append("password", data.password);


//             if (data.profileImage instanceof File) {
//                 formData.append("profileImage", data.profileImage);
//             }

//             const signUpResponse = await CreateOrganizationMutation(formData);
//             //const email=data.email
//             //const password=data.password
//             //const loginResponse = await loginOrganization({email,password }).unwrap();
//             if (signUpResponse.data?.accessToken) {
//                 Cookies.set("token", signUpResponse.data.accessToken, { expires: 7, path: "/" });
//             } 
//             dispatch(setCurrentUser(signUpResponse.data?.organization));
//             localStorage.setItem("user", JSON.stringify(signUpResponse.data?.organization));
//             localStorage.setItem("userMode", userMode);
//             navigate("/");
//             reset();
//         } catch (error) {
//             console.error("Error adding organization:", error);
//         }
//     };

//     return (
//         <Box sx={styles.container}>
//             <Stack spacing={4} sx={styles.stack}>
//                 <Card sx={styles.card}>
//                     <form onSubmit={handleSubmit(onSubmit)}>
//                         <Box sx={{ mb: 1 }}>
//                             <Typography level="title-md">Personal Info</Typography>
//                         </Box>
//                         <Divider />
//                         <Stack spacing={2}>
//                             {/* העלאת תמונת פרופיל */}
//                             <Box sx={styles.avatarBox}>
//                                 <Avatar
//                                     src={profileImage instanceof File ? URL.createObjectURL(profileImage) : "/default-avatar.png"}
//                                     sx={styles.avatar}
//                                 />
//                                 <Controller
//                                     name="profileImage"
//                                     control={control}
//                                     render={({ field }) => (
//                                         <>
//                                             <input
//                                                 type="file"
//                                                 accept="image/*"
//                                                 onChange={(event) => {
//                                                     const file = event.target.files?.[0];
//                                                     if (file) {
//                                                         field.onChange(file); // קובץ אמיתי
//                                                     }
//                                                 }}
//                                                 style={styles.uploadButton}
//                                                 id="profile-upload"
//                                             />
//                                             <label htmlFor="profile-upload">
//                                                 <Button component="span" variant="outlined" size="sm">
//                                                     Upload Image
//                                                 </Button>
//                                             </label>
//                                         </>
//                                     )}
//                                 />
//                             </Box>
//                             <Controller
//                                 name="name"
//                                 control={control}
//                                 render={({ field }) => (
//                                     <TextField {...field} label="Full Name" fullWidth margin="normal" error={!!errors.name} helperText={errors.name?.message} />
//                                 )}
//                             />
//                             <Controller
//                                 name="organizationNumber"
//                                 control={control}
//                                 render={({ field }) => (
//                                     <TextField {...field} label="ID Number" fullWidth margin="normal" error={!!errors.organizationNumber} helperText={errors.organizationNumber?.message} />
//                                 )}
//                             />
//                             <Controller
//                                 name="phone"
//                                 control={control}
//                                 render={({ field }) => (
//                                     <TextField {...field} label="Phone" fullWidth margin="normal" error={!!errors.phone} helperText={errors.phone?.message} />
//                                 )}
//                             />
//                             <Controller
//                                 name="email"
//                                 control={control}
//                                 render={({ field }) => (
//                                     <TextField {...field} label="Email" fullWidth margin="normal" error={!!errors.email} helperText={errors.email?.message} />
//                                 )}
//                             />
//                             <Controller
//                                 name="password"
//                                 control={control}
//                                 render={({ field }) => (
//                                     <TextField
//                                         {...field}
//                                         type="password"
//                                         label="Password"
//                                         fullWidth
//                                         margin="normal"
//                                         error={!!errors.password}
//                                         helperText={errors.password?.message}
//                                     />
//                                 )}
//                             />
//                         </Stack>

//                         <CardActions sx={styles.cardActions}>
//                             <Button type="submit" size="sm" variant="solid" disabled={isLoadingOrganization}>
//                                 Save
//                             </Button>
//                         </CardActions>
//                     </form>
//                 </Card>
//             </Stack>
//         </Box>
//     );
// };

// export default SingUpOrganization;
import {
  Box,
  Divider,
  Stack,
  Typography,
  Card,
  CardActions,
  Avatar
} from "@mui/joy";
import { TextField, Alert } from "@mui/material";
import Button from "@mui/joy/Button";
import { Controller, useForm } from "react-hook-form";
import { styles } from "../../styles/style";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateOrganizationMutation, useEditOrganizationMutation } from '../../redux/slices/api/organizationApiSlice';
import getProfileOrganizationSchema from "../../schemas/profileOrganizationSchema";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setCurrentUser, selectUserMode, setUserMode } from "../../redux/slices/togetherForceSlice";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { useState } from "react";
import { UserModes } from "../../interface/UserModes";


const SingUpOrganization = () => {
  const [error, setError] = useState<string | null>(null);
  const currentUser = useSelector(selectCurrentUser);
  const userMode = useSelector(selectUserMode);
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
    watch,
    control,
    formState: { errors }
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

      if (isEditMode) {
        formData.append("_id", currentUser._id);
        const result = await editOrganization(formData).unwrap();
        dispatch(setCurrentUser(result));
        localStorage.setItem("user", JSON.stringify(result));
      } else {
        const signUpResponse = await CreateOrganizationMutation(formData).unwrap()
        if (signUpResponse.accessToken) {
          Cookies.set("token", signUpResponse.accessToken, { expires: 7, path: "/" });
        }
        if (signUpResponse.organization) {


          dispatch(setCurrentUser(signUpResponse.organization));
          dispatch(setUserMode(UserModes.Organization));
          localStorage.setItem("user", JSON.stringify(signUpResponse.organization));
          localStorage.setItem("userMode", UserModes.Organization);
          navigate("/");
          reset();
        }
      }


    } catch (error:any) {
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
              {/* תמונת פרופיל */}
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
              <Button type="submit" size="sm" variant="solid"> 
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

