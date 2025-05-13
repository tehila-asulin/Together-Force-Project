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


import { Box, Divider, Stack, Typography, Card, CardActions, Avatar } from "@mui/joy";
import { TextField } from "@mui/material";
import Button from "@mui/joy/Button";
import { Controller, useForm } from "react-hook-form";
import { styles } from "../../styles/style";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateOrganizationMutation } from '../../redux/slices/api/organizationApiSlice';
import profileOrganizationSchema from "../../schemas/profileOrganizationSchema";
const SingUpOrganization = () => {
    const { reset, handleSubmit, watch, control, formState: { errors } } = useForm({
        mode: "onBlur",
        resolver: zodResolver(profileOrganizationSchema), 
        defaultValues: { 
          name: "", 
          profileImage: "",  
          email: "", 
          phone: "",
          password: "",
          organizationNumber: "", 
        },
    });

    const profileImage = watch("profileImage");
    const [CreateOrganizationMutation] = useCreateOrganizationMutation();

    const onSubmit = async (data: any) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("organizationNumber", data.organizationNumber);
            formData.append("email", data.email);
            formData.append("phone", data.phone);
            formData.append("password", data.password);

            // אם קיים קובץ תמונה, הוסף אותו
            if (data.profileImage instanceof File) {
                formData.append("profileImage", data.profileImage);
            }

            await CreateOrganizationMutation(formData);  // שליחה ל-API
            reset();
        } catch (error) {
            console.error("Error adding organization:", error);
        }
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
                                <Avatar
                                    src={profileImage instanceof File ? URL.createObjectURL(profileImage) : "/default-avatar.png"}
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
                                                        field.onChange(file); // קובץ אמיתי
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
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="Full Name" fullWidth margin="normal" error={!!errors.name} helperText={errors.name?.message} />
                                )}
                            />
                            <Controller 
                                name="organizationNumber"
                                control={control}
                                render={({ field }) => (
                                    <TextField {...field} label="ID Number" fullWidth margin="normal" error={!!errors.organizationNumber} helperText={errors.organizationNumber?.message} />
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

                        <CardActions sx={styles.cardActions}>
                            <Button type="submit" size="sm" variant="solid">
                                Save
                            </Button>
                        </CardActions>
                    </form>
                </Card>
            </Stack>
        </Box>
    );
};

export default SingUpOrganization;
