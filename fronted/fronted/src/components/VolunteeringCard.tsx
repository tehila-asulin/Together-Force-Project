import * as React from 'react';
import { useState, useEffect } from 'react';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';
import { Volunteering } from '../interface/Volunteering';
import { Link } from "react-router";
import { toZonedTime } from 'date-fns-tz';
import { formatDistanceToNow } from 'date-fns';
import { he } from 'date-fns/locale';
import { selectUserMode, selectCurrentUser } from "../redux/slices/togetherForceSlice";
import { useSelector } from "react-redux";
import { UserModes } from "../interface/UserModes";
import { useEditVolunteeringMutation } from "../redux/slices/api/volunteeringApiSlice"
import { useEditVolunteerMutation } from "../redux/slices/api/volunteerApiSlice"
import { Volunteer } from "../interface/Volunteer"
import { statusV } from "../interface/statusV"

interface Props {
  volunteering: Volunteering;
}

const VolunteeringCard = ({ volunteering }: Props) => {
  const currentUser = useSelector(selectCurrentUser);
  const [editVolunteering] = useEditVolunteeringMutation();

  const isInProgress = volunteering.status === statusV.IN_PROGRESS;
  const isCompleted = volunteering.status === statusV.COMPLETED;

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

  const [relativeTime, setRelativeTime] = useState<string>('');
  const userMode = useSelector(selectUserMode);

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
          ? '#e0f7fa' // תכלת בהיר
          : isInProgress
          ? '#f5f5f5' // אפור בהיר
          : 'white',
        opacity: isCompleted ? 0.7 : 1,
        pointerEvents: isCompleted ? 'none' : 'auto',
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
            paddingX: 1,
            paddingY: 0.5,
            borderRadius: '8px',
            fontSize: '0.75rem',
          }}
        >
          {relativeTime}
        </Typography>
      )}

      <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
        <Avatar src="/static/images/avatar/1.jpg" sx={{ '--Avatar-size': '4rem' }} />
        <Chip
          size="sm"
          variant="soft"
          color="primary"
          sx={{
            mt: -1,
            mb: 1,
            border: '3px solid',
            borderColor: 'background.surface',
          }}
        >
          PRO
        </Chip>
        <Typography level="title-lg">{volunteering.title}</Typography>
        <Typography level="body-sm" sx={{ maxWidth: '24ch' }}>
          {volunteering.description}
        </Typography>
      </CardContent>

      <CardOverflow sx={{ bgcolor: 'background.level1' }}>
        <CardActions buttonFlex="1">
          <ButtonGroup variant="outlined" sx={{ bgcolor: 'background.surface' }}>
            <Button
              component={Link}
              to={`/detailsVolunteering/${volunteering._id}`}
              disabled={isCompleted}
            >
              פרטים נוספים
            </Button>
            {userMode === UserModes.Organization ? (
              <Button disabled={isCompleted}>מחיקת ההתנדבות</Button>
            ) : (
              <Button
                onClick={handleTakeVolunteering}
                disabled={isInProgress || isCompleted}
              >
                (: אני על זה
              </Button>
            )}
          </ButtonGroup>
        </CardActions>
      </CardOverflow>
    </Card>
  );
};

export default VolunteeringCard;
