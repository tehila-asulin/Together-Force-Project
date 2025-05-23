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
import * as React from 'react';
import { useState, useEffect } from 'react';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Volunteering } from '../interface/Volunteering';
import { Link } from "react-router";
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

interface Props {
  volunteering: Volunteering;
}

const VolunteeringCard = ({ volunteering }: Props) => {
  const currentUser = useSelector(selectCurrentUser);
  const userMode = useSelector(selectUserMode);
  const [editVolunteering] = useEditVolunteeringMutation();
  const [deleteVolunteering] = useRemoveVolunteeringMutation();

  const isVolunteerUser = userMode === UserModes.Volunteer;

  const { data: organizationData } = useGetOrganizationByNumberQuery(
    isVolunteerUser && volunteering.byOrganizationNumber ? String(volunteering.byOrganizationNumber) : '',
    { skip: !isVolunteerUser || !volunteering.byOrganizationNumber }
  );

  const isInProgress = volunteering.status === statusV.IN_PROGRESS;
  const isCompleted = volunteering.status === statusV.COMPLETED;

  const { data: volunteer, isLoading: isVolunteerLoading } = useGetVolunteerByIdQuery(volunteering.idMaker!, {
    skip: !volunteering.idMaker || userMode !== UserModes.Organization || !isInProgress,
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
      console.error("Error cancelling volunteering:", error);
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
      console.error("Error completing volunteering:", error);
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

  const [relativeTime, setRelativeTime] = useState<string>('');

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

  return (
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

      {userMode === UserModes.Organization && isInProgress && volunteer && (
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
          <CheckCircleIcon sx={{ color: 'green', mr: 0.5 }} />
          <Typography level="body-sm">נלקח ע"י {volunteer.name}</Typography>
        </Box>
      )}

      <CardContent sx={{ alignItems: 'center', textAlign: 'center', mt: 3 }}>
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

      <CardOverflow sx={{  mt: 'auto' }}>
        <CardActions sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            component={Link}
            to={`/detailsVolunteering/${volunteering._id}`}
            disabled={isCompleted}
          >
            פרטים נוספים
          </Button>

          {userMode === UserModes.Organization ? (
            <>
              <Button fullWidth variant="outlined" disabled={isCompleted} onClick={handleDeleteVolunteering}>
                מחיקת ההתנדבות
              </Button>
              {isInProgress && (
                <Button fullWidth variant="outlined" onClick={handleMarkCompleted}>
                  סמן כהושלם
                </Button>
              )}
            </>
          ) : (
            isInProgress && volunteering.idMaker === currentUser?._id ? (
              <Button fullWidth variant="outlined" onClick={handleCancelVolunteering}>
                לביטול ההתנדבות
              </Button>
            ) : (
              <Button
                fullWidth
                variant="outlined"
                onClick={handleTakeVolunteering}
                disabled={isInProgress || isCompleted}
              >
                (: אני על זה
              </Button>
            )
          )}
        </CardActions>
      </CardOverflow>
    </Card>
  );
};

export default VolunteeringCard;
