import { Box, Container, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

const GuidePage = () => {
  return (
    <Container maxWidth="md" sx={{ direction: 'rtl', fontFamily: 'Rubik, Heebo, sans-serif', textAlign: 'center' }}>
      <Box display="flex" justifyContent="center">
        <Paper elevation={3} sx={{ p: 4, mt: 5, borderRadius: 4, textAlign: 'center', width: '100%' }}>
          <Typography variant="h4" gutterBottom>
            איך מצטרפים?
          </Typography>

          <Typography variant="body1" sx={{ mb: 4 }}>
            בין אם אתם מתנדבים שרוצים לתת או ארגונים שמחפשים עזרה – אנחנו כאן בשבילכם!
          </Typography>

          <Typography variant="h6" sx={{ mb: 2 }}>
            למתנדבים:
          </Typography>
          <List sx={{ textAlign: 'center' }}>
            <ListItem>
              <ListItemText primary="1. הירשמו דרך טופס ההרשמה בלחיצה על כפתור 'הרשמה כמתנדב'." sx={{ textAlign: 'center' }} />
            </ListItem>
            <ListItem>
              <ListItemText primary="2. מלאו את הפרטים האישיים ותחומי העניין שלכם." sx={{ textAlign: 'center' }} />
            </ListItem>
            <ListItem>
              <ListItemText primary="3. המתינו לאישור קצר, ולאחר מכן תוכלו לבחור התנדבויות שמתאימות לכם." sx={{ textAlign: 'center' }} />
            </ListItem>
          </List>

          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
            לארגונים:
          </Typography>
          <List sx={{ textAlign: 'center' }}>
            <ListItem>
              <ListItemText primary="1. הירשמו דרך טופס 'הרשמה כארגון'." sx={{ textAlign: 'center' }} />
            </ListItem>
            <ListItem>
              <ListItemText primary="2. הזינו פרטים על הארגון, תחומי הפעילות ואיש קשר." sx={{ textAlign: 'center' }} />
            </ListItem>
            <ListItem>
              <ListItemText primary="3. לאחר אישור, תוכלו לפרסם משימות התנדבות בלחיצת כפתור." sx={{ textAlign: 'center' }} />
            </ListItem>
          </List>

          <Box sx={{ mt: 3, p: 2, bgcolor: '#f0f0f0', borderRadius: 2 }}>
            <Typography variant="body2" color="textSecondary">
              אנחנו מאשרים כל משתמש ידנית – כדי לשמור על סביבה בטוחה, אמינה ומקצועית.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default GuidePage;
