import { Box, Container, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md" sx={{ direction: 'rtl', fontFamily: 'Alef, Assistant, sans-serif' }}>
      <Box display="flex" justifyContent="center">
        <Paper elevation={3} sx={{ p: 4, mt: 5, borderRadius: 4, textAlign: 'center', width: '100%' }}>
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
          <List sx={{ textAlign: 'center' }}>
            <ListItem>
              <ListItemText primary="• תהליך הצטרפות פשוט, עם בדיקה ידנית לשמירה על איכות השירות." sx={{ textAlign: 'center' }} />
            </ListItem>
            <ListItem>
              <ListItemText primary="• מערכת חכמה להתאמת מתנדבים למשימות." sx={{ textAlign: 'center' }} />
            </ListItem>
            <ListItem>
              <ListItemText primary="• עיצוב נגיש ונעים לכל הגילאים." sx={{ textAlign: 'center' }} />
            </ListItem>
          </List>

          <Typography variant="h5" color="primary" sx={{ mt: 3 }}>
            ביחד – יוצרים חברה טובה יותר 💙
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};
export default About;
