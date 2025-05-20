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

interface Props {
  v: Volunteering;
}

const VolunteeringCard = ({ v }: Props) => {
  const [relativeTime, setRelativeTime] = useState<string>('');

  useEffect(() => {
    const updateRelativeTime = () => {
      if (!v.createdAt) return;
      const israelTime = toZonedTime(new Date(v.createdAt), 'Asia/Jerusalem');
      if (isNaN(israelTime.getTime())) return;
      const formatted = formatDistanceToNow(israelTime, { addSuffix: true, locale: he });
      setRelativeTime(formatted);
    };

    updateRelativeTime(); // מריץ מידית
    const interval = setInterval(updateRelativeTime, 60000); // מריץ כל דקה

    return () => clearInterval(interval); // ניקוי בזמן unmount
  }, [v.createdAt]);

  return (
    <Card sx={{ width: 320, maxWidth: '100%', boxShadow: 'lg', position: 'relative' }}>
      {/* תצוגת "לפני X זמן" בפינה העליונה הימנית */}
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
        <Typography level="title-lg">{v.title}</Typography>
        <Typography level="body-sm" sx={{ maxWidth: '24ch' }}>
          {v.description}
        </Typography>
      </CardContent>
      <CardOverflow sx={{ bgcolor: 'background.level1' }}>
        <CardActions buttonFlex="1">
          <ButtonGroup variant="outlined" sx={{ bgcolor: 'background.surface' }}>
           <Button  component={Link} to={`/detailsVolunteering/${v._id}`}>לביצוע</Button>
            <Button>Connect</Button>
          </ButtonGroup>
        </CardActions>
      </CardOverflow>
    </Card>
  );
};

export default VolunteeringCard;
