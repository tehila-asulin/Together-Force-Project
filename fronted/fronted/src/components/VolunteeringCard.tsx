import { useState, useEffect } from 'react';
import Avatar from '@mui/joy/Avatar';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
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
import {styles} from '../styles/style';

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
   const isInProgress = volunteering.status === statusV.IN_PROGRESS;
  const isCompleted = volunteering.status === statusV.COMPLETED;

  const { data: organizationData } = useGetOrganizationByNumberQuery(
    isVolunteerUser && volunteering.byOrganizationNumber ? String(volunteering.byOrganizationNumber) : '',
    { skip: !isVolunteerUser || !volunteering.byOrganizationNumber }
  );
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
      <Card sx={styles.cardStyle(isCompleted, isInProgress)}>
        {relativeTime && (
          <Typography level="body-xs" sx={styles.relativeTimeStyle}>
            {relativeTime}
          </Typography>
        )}

        {userMode === UserModes.Organization && isInProgress && volunteer && volunteering.rating === null && (
          <Box sx={styles.takenByStyle}>
            <CheckCircleIcon sx={{ color: 'blue', mr: 0.5 }} />
            <Typography level="body-sm">נלקח ע"י {volunteer.name}</Typography>
          </Box>
        )}

        {userMode === UserModes.Organization && volunteering.rating != null && volunteer && (
          <Box sx={styles.completedRatingBoxStyle}>
            <Box sx={styles.completedInnerBoxStyle}>
              <CheckCircleIcon sx={{ color: 'green', mr: 0.5 }} />
              <Typography sx={{ backgroundColor: 'transparent', p: 0 }} level="body-sm">
                בוצע ע"י {volunteer.name}
              </Typography>
            </Box>

            <Box sx={styles.ratingSectionStyle}>
              <Typography level="body-sm" sx={{ backgroundColor: 'transparent', p: 0 }}>
                דירוג שניתן ע"י המתנדב
              </Typography>

              <Rating
                value={volunteering.rating}
                readOnly
                size="large"
                max={5}
                sx={styles.ratingStarsStyle}
              />
            </Box>
          </Box>
        )}

        <CardContent sx={styles.cardContentStyle}>
          {isVolunteerUser && (
            <Avatar
              src={organizationData?.profileImage ? organizationData.profileImage : "/static/images/avatar/1.jpg"}
              sx={styles.avatarStyle}
            />
          )}

          <Typography level="title-lg" sx={styles.titleStyle}>
            {volunteering.title}
          </Typography>

          <Typography level="body-sm" sx={styles.descriptionStyle}>
            {volunteering.description}
          </Typography>
        </CardContent>

        {isDisable && userMode === UserModes.Volunteer && (
          <Box sx={styles.completedMessageBoxStyle}>
            <Typography fontWeight="bold" color="success">
              סיימת את ההתנדבות 🎉
            </Typography>
            <Typography level="body-sm">
              הודעה נשלחה לארגון
            </Typography>
          </Box>
        )}

        <CardActions sx={styles.cardActionsStyle}>
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
      </Card>

      <Dialog
        open={showRatingDialog}
        onClose={() => setShowRatingDialog(false)}
        PaperProps={{
          sx: styles.dialogPaperStyle,
        }}
      >
        <DialogTitle sx={styles.dialogTitleStyle}>
          מתנדב יקר! נשמח אם תדרג את חווית ההתנדבות שלך
          <IconButton
            aria-label="close"
            onClick={() => setShowRatingDialog(false)}
            sx={styles.closeIconStyle}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Stack spacing={3} alignItems="center" sx={styles.dialogStackStyle}>
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
              sx={styles.ratingStarsStyle}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={styles.dialogActionsStyle}>
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
