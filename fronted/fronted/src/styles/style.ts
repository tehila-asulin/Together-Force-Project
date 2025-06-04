export const styles = {
  container: { display: 'flex', justifyContent: 'center', mt: 4 },
  stack: { width: '100%', maxWidth: 400 },
  card: { p: 3, boxShadow: 'md', width: '100%' },
  sheet: { width: 365, p: 2, borderRadius: 'sm' },
  list: { maxHeight: 300, overflowY: 'auto' },
  cardOverflow: { display: 'flex', justifyContent: 'flex-end', p: 2 },
  cardActions: { display: 'flex', justifyContent: 'flex-end' },
  avatarBox: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, mb: 2 },
  uploadButton: { display: 'none' },
  doneIcon: { position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)' },
  headerWithSearch: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 },
  title: { fontWeight: 'lg' },
  searchField: { ml: 2, width: 150 },
  titleVolunteerOptions: { fontWeight: "lg", mb: 2, textAlign: "center" },
  categoryBox: { mb: 2 },
  categoryTitle: { fontWeight: "lg", mb: 1 },
  listItems: { "--List-gap": "8px", "--ListItem-radius": "20px" },
  cardStyle: (isCompleted: boolean, isInProgress: boolean) => ({
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
  }),

  relativeTimeStyle: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'background.level1',
    px: 1,
    py: 0.5,
    borderRadius: '8px',
    fontSize: '0.75rem',
  },

  takenByStyle: {
    position: 'absolute',
    top: 8,
    left: 8,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'background.level1',
    px: 1,
    py: 0.5,
    borderRadius: '8px',
  },

  completedRatingBoxStyle: {
    position: 'absolute',
    top: 8,
    left: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    zIndex: 2,
  },

  completedInnerBoxStyle: {
    display: 'flex',
    alignItems: 'center',
  },

  ratingSectionStyle: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    mt: 0.5,
    gap: 1,
  },

  ratingStarsStyle: {
    "& .MuiRating-iconFilled": { color: "#ffb400" },
    "& .MuiRating-iconHover": { color: "#ffdb70" },
  },

  cardContentStyle: {
    alignItems: 'center',
    textAlign: 'center',
    mt: 6,
  },

  avatarStyle: {
    '--Avatar-size': '4rem',
    mb: 1,
  },

  titleStyle: {
    mt: 1,
  },

  descriptionStyle: {
    maxWidth: '24ch',
    mt: 1,
    whiteSpace: 'pre-line',
  },

  completedMessageBoxStyle: {
    backgroundColor: '#e0f2f1',
    p: 2,
    borderRadius: 2,
    textAlign: 'center',
    mt: 2,
  },

  cardActionsStyle: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    p: 2,
  },

  dialogPaperStyle: {
    borderRadius: 3,
    p: 2,
    minWidth: 320,
    bgcolor: "#f9fafb",
    boxShadow:
      "0px 8px 24px rgba(0, 0, 0, 0.1), 0px 2px 8px rgba(0, 0, 0, 0.06)",
  },

  dialogTitleStyle: {
    m: 0,
    p: 2,
    fontWeight: "bold",
    fontSize: 22,
    color: "#333",
    textAlign: 'center',
  },

  closeIconStyle: {
    position: "absolute",
    right: 8,
    top: 8,
    color: (theme: any) => theme.palette.grey[500],
  },

  dialogStackStyle: {
    py: 1,
    textAlign: 'center',
  },

  dialogActionsStyle: {
    px: 3,
    pb: 2,
  },
    appBar: {
    backgroundColor: "rgb(0, 104, 245)",
    width: "100%",
    top: 0,
    position: "fixed",
  },

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
    paddingX: 2,
  },

  navBox: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },

  logoBox: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "64px",
  },

  logoImage: {
    height: "100px",
    maxHeight: "100%",
    objectFit: "contain",
  },

  navButton: {
    backgroundColor: "white",
    color: "black",
    minWidth: "90px",
  },

  navButtonSmall: {
    backgroundColor: "white",
    color: "black",
    minWidth: "80px",
  },

  userNameText: {
    color: "white",
  },

  avatar: {
    width: 36,
    height: 36,
  },
   containerBox: {
    width: "80vw",
    height: "80vh",
    position: "relative",
    overflow: "hidden",
  },
  backgroundBox: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    opacity: 0.1,
    zIndex: 1,
  },
  contentBox: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    px: 2,
  },
  formStack: { width: '100%', maxWidth: 400 },
  formCard: { p: 3, boxShadow: 'md', width: '100%' },
  volunteerCategoryBox: { width: 400 },
  volunteerOptionsTitle: {
    fontWeight: "lg",
    mb: 2,
    textAlign: "center",
  },
  sectionTitle: {
    fontWeight: "lg",
  },
};
