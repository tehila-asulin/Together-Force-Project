
import { Box, Container, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
const GuidePage=()=> {
    return (
    <Container maxWidth="md" sx={{ direction: 'rtl', fontFamily: 'Alef, Assistant, sans-serif', textAlign: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, mt: 5, borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom>
          איך מצטרפים?
        </Typography>

        <Typography variant="body1" sx={{ mb: 4 }}>
          בין אם אתם מתנדבים שרוצים לתת או ארגונים שמחפשים עזרה – אנחנו כאן בשבילכם!
        </Typography>

        <Typography variant="h6" sx={{ mb: 2 }}>
          למתנדבים:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="1. הירשמו דרך טופס ההרשמה בלחיצה על כפתור 'הצטרפות כמתנדב'." />
          </ListItem>
          <ListItem>
            <ListItemText primary="2. מלאו את הפרטים האישיים ותחומי העניין שלכם." />
          </ListItem>
          <ListItem>
            <ListItemText primary="3. המתינו לאישור קצר, ולאחר מכן תוכלו לבחור התנדבויות שמתאימות לכם." />
          </ListItem>
        </List>

        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          לארגונים:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="1. הירשמו דרך טופס 'הצטרפות כארגון'." />
          </ListItem>
          <ListItem>
            <ListItemText primary="2. הזינו פרטים על הארגון, תחומי הפעילות ואיש קשר." />
          </ListItem>
          <ListItem>
            <ListItemText primary="3. לאחר אישור, תוכלו לפרסם משימות התנדבות בלחיצת כפתור." />
          </ListItem>
        </List>

        <Box sx={{ mt: 3, p: 2, bgcolor: '#f0f0f0', borderRadius: 2 }}>
          <Typography variant="body2" color="textSecondary">
            אנחנו מאשרים כל משתמש ידנית – כדי לשמור על סביבה בטוחה, אמינה ומקצועית.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );

}

  export default GuidePage