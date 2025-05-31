// import * as React from 'react';
// import { useState, useEffect } from 'react';
// import Avatar from '@mui/joy/Avatar';
// import Chip from '@mui/joy/Chip';
// import Button from '@mui/joy/Button';
// import ButtonGroup from '@mui/joy/ButtonGroup';
// import Card from '@mui/joy/Card';
// import CardContent from '@mui/joy/CardContent';
// import CardOverflow from '@mui/joy/CardOverflow';
// import CardActions from '@mui/joy/CardActions';
// import Typography from '@mui/joy/Typography';
// import Box from '@mui/joy/Box';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import { Volunteering } from '../interface/Volunteering';
// import { Link } from "react-router";
// import { toZonedTime } from 'date-fns-tz';
// import { formatDistanceToNow } from 'date-fns';
// import { he } from 'date-fns/locale';
// import { selectUserMode, selectCurrentUser } from "../redux/slices/togetherForceSlice";
// import { useSelector } from "react-redux";
// import { UserModes } from "../interface/UserModes";
// import { useEditVolunteeringMutation, useRemoveVolunteeringMutation } from "../redux/slices/api/volunteeringApiSlice";
// import { statusV } from "../interface/statusV";
// import { useGetVolunteerByIdQuery } from '../redux/slices/api/volunteerApiSlice';
// import { useGetOrganizationByNumberQuery } from "../redux/slices/api/organizationApiSlice";

// interface Props {
//   volunteering: Volunteering;
// }

// const VolunteeringCard = ({ volunteering }: Props) => {
//   const currentUser = useSelector(selectCurrentUser);
//   const userMode = useSelector(selectUserMode);
//   const [editVolunteering] = useEditVolunteeringMutation();
//   const [deleteVolunteering] = useRemoveVolunteeringMutation();

//   const isVolunteerUser = userMode === UserModes.Volunteer;

// const { data: organizationData } = useGetOrganizationByNumberQuery(
//   isVolunteerUser && volunteering.byOrganizationNumber ? String(volunteering.byOrganizationNumber) : '',
//   { skip: !isVolunteerUser || !volunteering.byOrganizationNumber }
// );



//   const isInProgress = volunteering.status === statusV.IN_PROGRESS;
//   const isCompleted = volunteering.status === statusV.COMPLETED;

//   const { data: volunteer, isLoading: isVolunteerLoading } = useGetVolunteerByIdQuery(volunteering.idMaker!, {
//     skip: !volunteering.idMaker || userMode !== UserModes.Organization || !isInProgress,
//   });

//   const handleTakeVolunteering = async () => {
//     if (!currentUser || !volunteering) return;
//     try {
//       const updatedVolunteering: Volunteering = {
//         ...volunteering,
//         status: statusV.IN_PROGRESS,
//         idMaker: currentUser._id ?? "",
//       };
//       await editVolunteering(updatedVolunteering).unwrap();
//       alert("ההתנדבות עודכנה בהצלחה!");
//     } catch (error) {
//       console.error("Error taking volunteering:", error);
//       alert("אירעה שגיאה בעדכון ההתנדבות");
//     }
//   };

//   const handleCancelVolunteering = async () => {
//     if (!currentUser || !volunteering) return;
//     try {
//       const updatedVolunteering: Volunteering = {
//         ...volunteering,
//         status: statusV.PENDING,
//         idMaker: "",
//       };
//       await editVolunteering(updatedVolunteering).unwrap();
//       alert("ההתנדבות בוטלה בהצלחה!");
//     } catch (error) {
//       console.error("Error cancelling volunteering:", error);
//       alert("אירעה שגיאה בביטול ההתנדבות");
//     }
//   };

//   const handleMarkCompleted = async () => {
//     try {
//       const updatedVolunteering: Volunteering = {
//         ...volunteering,
//         status: statusV.COMPLETED,
//       };
//       await editVolunteering(updatedVolunteering).unwrap();
//       alert("סימנת את ההתנדבות כהושלמה");
//     } catch (error) {
//       console.error("Error completing volunteering:", error);
//       alert("אירעה שגיאה");
//     }
//   };

//   const handleDeleteVolunteering = () => {
//     if (volunteering._id) {
//       deleteVolunteering(volunteering._id);
//     } else {
//       console.error("cannot delete volunteering: _id is undefined");
//     }
//   };

//   const [relativeTime, setRelativeTime] = useState<string>('');

//   useEffect(() => {
//     const updateRelativeTime = () => {
//       if (!volunteering.createdAt) return;
//       const israelTime = toZonedTime(new Date(volunteering.createdAt), 'Asia/Jerusalem');
//       if (isNaN(israelTime.getTime())) return;
//       const formatted = formatDistanceToNow(israelTime, { addSuffix: true, locale: he });
//       setRelativeTime(formatted);
//     };

//     updateRelativeTime();
//     const interval = setInterval(updateRelativeTime, 60000);
//     return () => clearInterval(interval);
//   }, [volunteering.createdAt]);

//   return (
//   <Card
//     sx={{
//       width: 320,
//       maxWidth: '100%',
//       boxShadow: 'lg',
//       position: 'relative',
//       backgroundColor: isCompleted
//         ? '#e0f7fa'
//         : isInProgress
//           ? '#f5f5f5'
//           : 'white',
//       opacity: isCompleted ? 0.7 : 1,
//       pointerEvents: isCompleted ? 'none' : 'auto',
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'space-between',
//     }}
//   >
//     {/* זמן יחסי בצד ימין למעלה */}
//     {relativeTime && (
//       <Typography
//         level="body-xs"
//         sx={{
//           position: 'absolute',
//           top: 8,
//           right: 8,
//           backgroundColor: 'background.level1',
//           px: 1,
//           py: 0.5,
//           borderRadius: '8px',
//           fontSize: '0.75rem',
//         }}
//       >
//         {relativeTime}
//       </Typography>
//     )}

//     {/* תגית מתנדב לקח */}
//     {userMode === UserModes.Organization && isInProgress && volunteer && (
//       <Box
//         sx={{
//           position: 'absolute',
//           top: 8,
//           left: 8,
//           display: 'flex',
//           alignItems: 'center',
//           backgroundColor: 'background.level1',
//           px: 1,
//           py: 0.5,
//           borderRadius: '8px',
//         }}
//       >
//         <CheckCircleIcon sx={{ color: 'green', mr: 0.5 }} />
//         <Typography level="body-sm">נלקח ע"י {volunteer.name}</Typography>
//       </Box>
//     )}

//     {/* תוכן הכרטיס */}
//     <CardContent sx={{ alignItems: 'center', textAlign: 'center', mt: 3 }}>
//       {isVolunteerUser && (
//         <Avatar
//           src={
//             organizationData?.profileImage
//               ? organizationData.profileImage
//               : "/static/images/avatar/1.jpg"
//           }
//           sx={{ '--Avatar-size': '4rem', mb: 1 }}
//         />
//       )}

//       <Typography level="title-lg" sx={{ mt: 1 }}>
//         {volunteering.title}
//       </Typography>

//       <Typography
//         level="body-sm"
//         sx={{ maxWidth: '24ch', mt: 1, whiteSpace: 'pre-line' }}
//       >
//         {volunteering.description}
//       </Typography>
//     </CardContent>

//     {/* פעולות */}
//     <CardOverflow sx={{ bgcolor: 'background.level1', mt: 'auto' }}>
//       <CardActions buttonFlex="1">
//         <ButtonGroup
//           variant="outlined"
//           sx={{ bgcolor: 'background.surface', width: '100%' }}
//         >
//           <Button
//             component={Link}
//             to={`/detailsVolunteering/${volunteering._id}`}
//             disabled={isCompleted}
//           >
//             פרטים נוספים
//           </Button>

//           {userMode === UserModes.Organization ? (
//             <Box>
//               <Button disabled={isCompleted} onClick={handleDeleteVolunteering}>
//                 מחיקת ההתנדבות
//               </Button>
//               {isInProgress && (
//                 <Button onClick={handleMarkCompleted}>סמן כהושלם</Button>
//               )}
//             </Box>
//           ) : (

//             isInProgress && volunteering.idMaker === currentUser?._id ? (
//               <Button onClick={handleCancelVolunteering}>לביטול ההתנדבות</Button>
//             ) : (
//               <Button
//                 onClick={handleTakeVolunteering}
//                 disabled={isInProgress || isCompleted}
//               >
//                 (: אני על זה
//               </Button>
//             )
//           )}
//         </ButtonGroup>
//       </CardActions>
//     </CardOverflow>
//   </Card>
// );

// };

// export default VolunteeringCard;

// import { useState, useEffect } from 'react';
// import Avatar from '@mui/joy/Avatar';

// import Button from '@mui/joy/Button';
// import Card from '@mui/joy/Card';
// import CardContent from '@mui/joy/CardContent';
// import CardOverflow from '@mui/joy/CardOverflow';
// import CardActions from '@mui/joy/CardActions';
// import Typography from '@mui/joy/Typography';
// import Box from '@mui/joy/Box';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import { Volunteering } from '../interface/Volunteering';
// import { Link } from "react-router";
// import { toZonedTime } from 'date-fns-tz';
// import { formatDistanceToNow } from 'date-fns';
// import { he } from 'date-fns/locale';
// import { selectUserMode, selectCurrentUser } from "../redux/slices/togetherForceSlice";
// import { useSelector } from "react-redux";
// import { UserModes } from "../interface/UserModes";
// import { useEditVolunteeringMutation, useRemoveVolunteeringMutation } from "../redux/slices/api/volunteeringApiSlice";
// import { statusV } from "../interface/statusV";
// import { useGetVolunteerByIdQuery } from '../redux/slices/api/volunteerApiSlice';
// import { useGetOrganizationByNumberQuery } from "../redux/slices/api/organizationApiSlice";

// interface Props {
//   volunteering: Volunteering;
// }

// const VolunteeringCard = ({ volunteering }: Props) => {
//   const currentUser = useSelector(selectCurrentUser);
//   const userMode = useSelector(selectUserMode);
//   const [editVolunteering] = useEditVolunteeringMutation();
//   const [deleteVolunteering] = useRemoveVolunteeringMutation();

//   const isVolunteerUser = userMode === UserModes.Volunteer;

//   const { data: organizationData } = useGetOrganizationByNumberQuery(
//     isVolunteerUser && volunteering.byOrganizationNumber ? String(volunteering.byOrganizationNumber) : '',
//     { skip: !isVolunteerUser || !volunteering.byOrganizationNumber }
//   );

//   const isInProgress = volunteering.status === statusV.IN_PROGRESS;
//   const isCompleted = volunteering.status === statusV.COMPLETED;

//   const { data: volunteer, isLoading: isVolunteerLoading } = useGetVolunteerByIdQuery(volunteering.idMaker!, {
//     skip: !volunteering.idMaker || userMode !== UserModes.Organization || !isInProgress,
//   });

//   const handleTakeVolunteering = async () => {
//     if (!currentUser || !volunteering) return;
//     try {
//       const updatedVolunteering: Volunteering = {
//         ...volunteering,
//         status: statusV.IN_PROGRESS,
//         idMaker: currentUser._id ?? "",
//       };
//       await editVolunteering(updatedVolunteering).unwrap();
//       alert("ההתנדבות עודכנה בהצלחה!");
//     } catch (error) {
//       console.error("Error taking volunteering:", error);
//       alert("אירעה שגיאה בעדכון ההתנדבות");
//     }
//   };

//   const handleCancelVolunteering = async () => {
//     if (!currentUser || !volunteering) return;
//     try {
//       const updatedVolunteering: Volunteering = {
//         ...volunteering,
//         status: statusV.PENDING,
//         idMaker: "",
//       };
//       await editVolunteering(updatedVolunteering).unwrap();
//       alert("ההתנדבות בוטלה בהצלחה!");
//     } catch (error) {
//       console.error("error cancelling volunteering:", error);
//       alert("אירעה שגיאה בביטול ההתנדבות");
//     }
//   };

//   const handleMarkCompleted = async () => {
//     try {
//       const updatedVolunteering: Volunteering = {
//         ...volunteering,
//         status: statusV.COMPLETED,
//       };
//       await editVolunteering(updatedVolunteering).unwrap();
//       alert("סימנת את ההתנדבות כהושלמה");
//     } catch (error) {
//       console.error("error completing volunteering:", error);
//       alert("אירעה שגיאה");
//     }
//   };

//   const handleDeleteVolunteering = () => {
//     if (volunteering._id) {
//       deleteVolunteering(volunteering._id);
//     } else {
//       console.error("cannot delete volunteering: _id is undefined");
//     }
//   };

//   const [relativeTime, setRelativeTime] = useState<string>('');

//   useEffect(() => {
//     const updateRelativeTime = () => {
//       if (!volunteering.createdAt) return;
//       const israelTime = toZonedTime(new Date(volunteering.createdAt), 'Asia/Jerusalem');
//       if (isNaN(israelTime.getTime())) return;
//       const formatted = formatDistanceToNow(israelTime, { addSuffix: true, locale: he });
//       setRelativeTime(formatted);
//     };

//     updateRelativeTime();
//     const interval = setInterval(updateRelativeTime, 60000);
//     return () => clearInterval(interval);
//   }, [volunteering.createdAt]);

//   return (
//     <Card
//       sx={{
//         width: 320,
//         maxWidth: '100%',
//         boxShadow: 'lg',
//         position: 'relative',
//         backgroundColor: isCompleted
//           ? '#e0f7fa'
//           : isInProgress
//             ? '#f5f5f5'
//             : 'white',
//         opacity: isCompleted ? 0.7 : 1,
//         pointerEvents: isCompleted ? 'none' : 'auto',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//       }}
//     >
//       {relativeTime && (
//         <Typography
//           level="body-xs"
//           sx={{
//             position: 'absolute',
//             top: 8,
//             right: 8,
//             backgroundColor: 'background.level1',
//             px: 1,
//             py: 0.5,
//             borderRadius: '8px',
//             fontSize: '0.75rem',
//           }}
//         >
//           {relativeTime}
//         </Typography>
//       )}

//       {userMode === UserModes.Organization && isInProgress && volunteer && (
//         <Box
//           sx={{
//             position: 'absolute',
//             top: 8,
//             left: 8,
//             display: 'flex',
//             alignItems: 'center',
//             backgroundColor: 'background.level1',
//             px: 1,
//             py: 0.5,
//             borderRadius: '8px',
//           }}
//         >
//           <CheckCircleIcon sx={{ color: 'green', mr: 0.5 }} />
//           <Typography level="body-sm">נלקח ע"י {volunteer.name}</Typography>
//         </Box>
//       )}

//       <CardContent sx={{ alignItems: 'center', textAlign: 'center', mt: 3 }}>
//         {isVolunteerUser && (
//           <Avatar
//             src={
//               organizationData?.profileImage
//                 ? organizationData.profileImage
//                 : "/static/images/avatar/1.jpg"
//             }
//             sx={{ '--Avatar-size': '4rem', mb: 1 }}
//           />
//         )}

//         <Typography level="title-lg" sx={{ mt: 1 }}>
//           {volunteering.title}
//         </Typography>

//         <Typography
//           level="body-sm"
//           sx={{ maxWidth: '24ch', mt: 1, whiteSpace: 'pre-line' }}
//         >
//           {volunteering.description}
//         </Typography>
//       </CardContent>

//       <CardOverflow sx={{  mt: 'auto' }}>
//         <CardActions sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 2 }}>
//           <Button
//             fullWidth
//             variant="outlined"
//             component={Link}
//             to={`/detailsVolunteering/${volunteering._id}`}
//             disabled={isCompleted}
//           >
//             פרטים נוספים
//           </Button>

//           {userMode === UserModes.Organization ? (
//             <>
//               <Button fullWidth variant="outlined" disabled={isCompleted} onClick={handleDeleteVolunteering}>
//                 מחיקת ההתנדבות
//               </Button>
//               {isInProgress && (
//                 <Button fullWidth variant="outlined" onClick={handleMarkCompleted}>
//                   סמן כהושלם
//                 </Button>
//               )}
//             </>
//           ) : (
//             isInProgress && volunteering.idMaker === currentUser?._id ? (
//               <Button fullWidth variant="outlined" onClick={handleCancelVolunteering}>
//                 לביטול ההתנדבות
//               </Button>
//             ) : (
//               <Button
//                 fullWidth
//                 variant="outlined"
//                 onClick={handleTakeVolunteering}
//                 disabled={isInProgress || isCompleted}
//               >
//                 (: אני על זה
//               </Button>
//             )
//           )}
//         </CardActions>
//       </CardOverflow>
//     </Card>
//   );
// };

// export default VolunteeringCard;

import { useState, useEffect } from 'react';
import Avatar from '@mui/joy/Avatar';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Dialog from '@mui/material/Dialog';
import Rating from '@mui/material/Rating';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Stack from '@mui/joy/Stack';

import { Volunteering } from '../interface/Volunteering';
import { Link } from 'react-router';
import { toZonedTime } from 'date-fns-tz';
import { formatDistanceToNow } from 'date-fns';
import { he } from 'date-fns/locale';
import { selectUserMode, selectCurrentUser } from "../redux/slices/togetherForceSlice";
import { useSelector } from "react-redux";
import { UserModes } from "../interface/UserModes";
import { useEditVolunteeringMutation, useRemoveVolunteeringMutation } from "../redux/slices/api/volunteeringApiSlice";
import { statusV } from "../interface/statusV";
import { useGetVolunteerByIdQuery } from '../redux/slices/api/volunteerApiSlice';
import { useGetOrganizationByNumberQuery } from "../redux/slices/api/organizationApiSlice";
import {
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  volunteering: Volunteering;
}

const VolunteeringCard = ({ volunteering }: Props) => {
  const currentUser = useSelector(selectCurrentUser);
  const userMode = useSelector(selectUserMode);
  const [editVolunteering] = useEditVolunteeringMutation();
  const [deleteVolunteering] = useRemoveVolunteeringMutation();
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const [relativeTime, setRelativeTime] = useState<string>('');
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [rating, setRating] = useState<number | null>(null);


  const isVolunteerUser = userMode === UserModes.Volunteer;

  const { data: organizationData } = useGetOrganizationByNumberQuery(
    isVolunteerUser && volunteering.byOrganizationNumber ? String(volunteering.byOrganizationNumber) : '',
    { skip: !isVolunteerUser || !volunteering.byOrganizationNumber }
  );

  const isInProgress = volunteering.status === statusV.IN_PROGRESS;
  const isCompleted = volunteering.status === statusV.COMPLETED;

  const shouldFetchVolunteer =
    volunteering.idMaker &&
    userMode === UserModes.Organization &&
    (volunteering.status === statusV.IN_PROGRESS || volunteering.status === statusV.COMPLETED);

  const { data: volunteer, isLoading: isVolunteerLoading } = useGetVolunteerByIdQuery(volunteering.idMaker!, {
    skip: !shouldFetchVolunteer,
  });


  const handleTakeVolunteering = async () => {
    if (!currentUser || !volunteering) return;
    try {
      const updatedVolunteering: Volunteering = {
        ...volunteering,
        status: statusV.IN_PROGRESS,
        idMaker: currentUser._id ?? "",
      };
      await editVolunteering(updatedVolunteering).unwrap();
      alert("ההתנדבות עודכנה בהצלחה!");
    } catch (error) {
      console.error("Error taking volunteering:", error);
      alert("אירעה שגיאה בעדכון ההתנדבות");
    }
  };

  const handleCancelVolunteering = async () => {
    if (!currentUser || !volunteering) return;
    try {
      const updatedVolunteering: Volunteering = {
        ...volunteering,
        status: statusV.PENDING,
        idMaker: "",
      };
      await editVolunteering(updatedVolunteering).unwrap();
      alert("ההתנדבות בוטלה בהצלחה!");
    } catch (error) {
      console.error("error cancelling volunteering:", error);
      alert("אירעה שגיאה בביטול ההתנדבות");
    }
  };

  const handleMarkCompleted = async () => {
    try {
      const updatedVolunteering: Volunteering = {
        ...volunteering,
        status: statusV.COMPLETED,
      };
      await editVolunteering(updatedVolunteering).unwrap();
      alert("סימנת את ההתנדבות כהושלמה");
    } catch (error) {
      console.error("error completing volunteering:", error);
      alert("אירעה שגיאה");
    }
  };

  const handleDeleteVolunteering = () => {
    if (volunteering._id) {
      deleteVolunteering(volunteering._id);
    } else {
      console.error("cannot delete volunteering: _id is undefined");
    }
  };


  useEffect(() => {
    const updateRelativeTime = () => {
      if (!volunteering.createdAt) return;
      const israelTime = toZonedTime(new Date(volunteering.createdAt), 'Asia/Jerusalem');
      if (isNaN(israelTime.getTime())) return;
      const formatted = formatDistanceToNow(israelTime, { addSuffix: true, locale: he });
      setRelativeTime(formatted);
    };

    updateRelativeTime();
    const interval = setInterval(updateRelativeTime, 60000);
    return () => clearInterval(interval);
  }, [volunteering.createdAt]);

  const handleFinishClick = () => {
    setShowRatingDialog(true);
  };

  const handleConfirmFinish = async () => {
    setShowRatingDialog(false);
    try {
      const updatedVolunteering: Volunteering = {
        ...volunteering,
        rating: rating ?? 0,
      };
      await editVolunteering(updatedVolunteering).unwrap();
      alert(" סיימת את ההתנדבות. תודה! נשלחה הודעה לארגון");
      setIsDisable(true)
    } catch (error) {
      console.error("Error marking as completed:", error);
      alert("אירעה שגיאה");
    }
  };

  return (
    <>
      <Card
        sx={{
          width: 320,
          maxWidth: '100%',
          boxShadow: 'lg',
          position: 'relative',
          backgroundColor: isCompleted
            ? '#e0f7fa'
            : isInProgress
              ? '#f5f5f5'
              : 'white',
          opacity: isCompleted ? 0.7 : 1,
          pointerEvents: isCompleted ? 'none' : 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {relativeTime && (
          <Typography
            level="body-xs"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'background.level1',
              px: 1,
              py: 0.5,
              borderRadius: '8px',
              fontSize: '0.75rem',
            }}
          >
            {relativeTime}
          </Typography>
        )}

        {userMode === UserModes.Organization && isInProgress && volunteer && volunteering.rating === null && (
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'background.level1',
              px: 1,
              py: 0.5,
              borderRadius: '8px',
            }}
          >
            <CheckCircleIcon sx={{ color: 'blue', mr: 0.5 }} />
            <Typography level="body-sm">נלקח ע"י {volunteer.name}</Typography>
          </Box>
        )}

        {userMode === UserModes.Organization && volunteering.rating != null && volunteer && (
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              zIndex: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircleIcon sx={{ color: 'green', mr: 0.5 }} />
              <Typography sx={{ backgroundColor: 'transparent', p: 0 }} level="body-sm">
                בוצע ע"י {volunteer.name}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row-reverse',
                mt: 0.5,
                gap: 1,
              }}
            >
              <Typography level="body-sm" sx={{ backgroundColor: 'transparent', p: 0 }}>
                דירוג שניתן ע"י המתנדב
              </Typography>

              <Rating
                value={volunteering.rating}
                readOnly
                size="large"
                max={5}
                sx={{
                  "& .MuiRating-iconFilled": { color: "#ffb400" },
                  "& .MuiRating-iconHover": { color: "#ffdb70" },
                }}
              />
            </Box>
          </Box>
        )}

        <CardContent sx={{ alignItems: 'center', textAlign: 'center', mt: 6 }}>
          {isVolunteerUser && (
            <Avatar
              src={
                organizationData?.profileImage
                  ? organizationData.profileImage
                  : "/static/images/avatar/1.jpg"
              }
              sx={{ '--Avatar-size': '4rem', mb: 1 }}
            />
          )}

          <Typography level="title-lg" sx={{ mt: 1 }}>
            {volunteering.title}
          </Typography>

          <Typography
            level="body-sm"
            sx={{ maxWidth: '24ch', mt: 1, whiteSpace: 'pre-line' }}
          >
            {volunteering.description}
          </Typography>
        </CardContent>

        {isDisable && userMode === UserModes.Volunteer && (
          <Box
            sx={{
              backgroundColor: '#e0f2f1',
              p: 2,
              borderRadius: 2,
              textAlign: 'center',
              mt: 2,
            }}
          >
            <Typography fontWeight="bold" color="success">
              סיימת את ההתנדבות 🎉
            </Typography>
            <Typography level="body-sm">
              הודעה נשלחה לארגון
            </Typography>
          </Box>
        )}

        <CardOverflow sx={{ mt: 'auto' }}>
          <CardActions sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              component={Link}
              to={`/detailsVolunteering/${volunteering._id}`}
              disabled={isCompleted || isDisable}
            >
              פרטים נוספים
            </Button>

            {userMode === UserModes.Organization ? (
              <>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleDeleteVolunteering}
                  disabled={isInProgress || isDisable}
                >
                  מחיקת ההתנדבות
                </Button>
                {volunteering.rating && (
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleMarkCompleted}
                    disabled={isDisable}
                  >
                    סמן כהושלם
                  </Button>
                )}
              </>
            ) : isInProgress && volunteering.idMaker === currentUser?._id ? (
              <>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleCancelVolunteering}
                  disabled={isDisable}
                >
                  לביטול ההתנדבות
                </Button>
                <Button
                  fullWidth
                  variant="solid"
                  color="success"
                  onClick={handleFinishClick}
                  disabled={isDisable}
                >
                  סיימתי
                </Button>
              </>
            ) : (
              <Button
                fullWidth
                variant="outlined"
                onClick={handleTakeVolunteering}
                disabled={isInProgress || isCompleted || isDisable}
              >
                (: אני על זה
              </Button>
            )}
          </CardActions>
        </CardOverflow>
      </Card>

      <Dialog
        open={showRatingDialog}
        onClose={() => setShowRatingDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
            minWidth: 320,
            bgcolor: "#f9fafb",
            boxShadow:
              "0px 8px 24px rgba(0, 0, 0, 0.1), 0px 2px 8px rgba(0, 0, 0, 0.06)",
          },
        }}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, fontWeight: "bold", fontSize: 22, color: "#333", textAlign: 'center' }}
        >
          מתנדב יקר! נשמח אם תדרג את חווית ההתנדבות שלך
          <IconButton
            aria-label="close"
            onClick={() => setShowRatingDialog(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Stack spacing={3} alignItems="center" sx={{ py: 1 }}>
            <Typography component="p" variant="soft" color="neutral" sx={{ textAlign: 'center' }}>
              ?כמה נהנית מההתנדבות
            </Typography>

            <Rating
              value={rating}
              onChange={(_: React.SyntheticEvent, newValue: number | null) =>
                setRating(newValue)
              }
              size="large"
              max={5}
              sx={{
                "& .MuiRating-iconFilled": { color: "#ffb400" },
                "& .MuiRating-iconHover": { color: "#ffdb70" },
              }}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button variant="outlined" onClick={() => setShowRatingDialog(false)}>
            ביטול
          </Button>
          <Button variant="solid" onClick={handleConfirmFinish} disabled={!rating}>
            אשר וסיים
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );

};

export default VolunteeringCard;
