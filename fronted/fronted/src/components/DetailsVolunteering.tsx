import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useGetVolunteeringByIdQuery } from "../redux/slices/api/volunteeringApiSlice";
import { useGetOrganizationByNumberQuery } from "../redux/slices/api/organizationApiSlice";
import { Box, Typography, CircularProgress, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const DetailsVolunteering = () => {
  const { volunteeringId } = useParams<{ volunteeringId: string }>();
  const volunteeringIdStr = volunteeringId ? String(volunteeringId) : "";
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const {
    data: volunteering,
    error: volunteeringError,
    isLoading: volunteeringLoading,
  } = useGetVolunteeringByIdQuery(volunteeringIdStr, { skip: !volunteeringIdStr });

  const orgNumberStr = volunteering?.byOrganizationNumber !== undefined
    ? String(volunteering.byOrganizationNumber)
    : "";

  const {
    data: orgData,
    error: orgError,
    isLoading: orgLoading,
  } = useGetOrganizationByNumberQuery(orgNumberStr, { skip: !orgNumberStr });

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };
  if (volunteeringLoading || orgLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (volunteeringError || orgError) {
    return (
      <Box mt={5} textAlign="center">
        <Typography color="error">אירעה שגיאה בטעינת הנתונים.</Typography>
      </Box>
    );
  }

  if (!volunteering) {
    return (
      <Box mt={5} textAlign="center">
        <Typography>לא נמצאה התנדבות עם מזהה זה.</Typography>
      </Box>
    );
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", fontSize: "1.8rem", position: "relative" }}>
        {volunteering.title}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" gap={2}>
          {orgData && (
            <>
              <Avatar
                alt={orgData.name}
                src={orgData.profileImage}
                sx={{ width: 70, height: 70 }}
              />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                ע"י הארגון: {orgData.name}
              </Typography>
            </>
          )}

          <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
            פרטי ההתנדבות: {volunteering.description}
          </Typography>

          <Typography variant="body2">
            📍 עיר: {volunteering.origin}
          </Typography>

          <Typography variant="body2">
            📅 לביצוע עד: {new Date(volunteering.deadline).toLocaleString("he-IL", {
              dateStyle: "full",
              timeStyle: "short",
            })}
          </Typography>


          <Typography variant="body2">
            ☎️ טלפון ליצירת קשר: {volunteering.phone}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center" }}>

      </DialogActions>
    </Dialog>
  );
};


export default DetailsVolunteering;
