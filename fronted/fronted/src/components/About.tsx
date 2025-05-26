import { Container, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

const About=()=> {
   return (
    <Container maxWidth="md" sx={{ direction: 'rtl', fontFamily: 'Alef, Assistant, sans-serif', textAlign: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, mt: 5, borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom>
          אודות "יחד בעשייה"
        </Typography>

        <Typography variant="body1" sx={{ mb: 4 }}>
          "יחד בעשייה" הוא מיזם חברתי שנולד מתוך הרצון לחבר בין אנשים שמבקשים לעזור – לבין אלו שזקוקים לעזרה.
        </Typography>

        <Typography variant="body1" sx={{ mb: 4 }}>
          בין אם מדובר בליווי קשישים, אריזת סלי מזון, עזרה בשיעורי בית או כל משימה קהילתית אחרת – אנחנו כאן כדי לקשר, להנגיש ולייעל.
        </Typography>

        <Typography variant="h6" sx={{ mb: 2 }}>
          מה מייחד אותנו?
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="• תהליך הצטרפות פשוט, עם בדיקה ידנית לשמירה על איכות השירות." />
          </ListItem>
          <ListItem>
            <ListItemText primary="• מערכת חכמה להתאמת מתנדבים למשימות." />
          </ListItem>
          <ListItem>
            <ListItemText primary="• עיצוב נגיש ונעים לכל הגילאים." />
          </ListItem>
        </List>

        <Typography variant="h5" color="primary" sx={{ mt: 3 }}>
          ביחד – יוצרים חברה טובה יותר 💙
        </Typography>
      </Paper>
    </Container>
  );
}
export default About
