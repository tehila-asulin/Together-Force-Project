import React from "react";
import { useParams } from "react-router";
import { useGetVolunteeringByIdQuery } from "../redux/slices/api/volunteeringApiSlice";
import { useGetOrganizationByNumberQuery } from "../redux/slices/api/organizationApiSlice";
import { Box, Typography, CircularProgress, Avatar, Paper } from "@mui/material";

const DetailsVolunteering= () => {
  const { volunteeringId } = useParams<{ volunteeringId: string }>();
  const volunteeringIdStr = volunteeringId ? String(volunteeringId) : "";
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

  if (volunteeringLoading || orgLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (volunteeringError || orgError) {
    return (
      <Box mt={5}>
        <Typography color="error">אירעה שגיאה בטעינת הנתונים.</Typography>
      </Box>
    );
  }

  if (!volunteering) {
    return (
      <Box mt={5}>
        <Typography>לא נמצאה התנדבות עם מזהה זה.</Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ maxWidth: 600, margin: "auto", p: 4, mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {volunteering.title}
      </Typography>

      {orgData && (
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar
            alt={String(orgData.organizationNumber) || "Organization"}
            src={orgData.profileImage}
            sx={{ width: 56, height: 56, mr: 2 }}
          />
          <Typography variant="h6">
            {orgData.name}
          </Typography>
        </Box>
      )}

      <Typography variant="body1" paragraph>
        {volunteering.description || "אין תיאור זמין."}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        עיר: {volunteering.origin}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        טלפון: {volunteering.phone}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        תאריך אחרון להגשה: {new Date(volunteering.deadline).toLocaleDateString("he-IL")}
      </Typography>
    </Paper>
  );
};



export default DetailsVolunteering;
