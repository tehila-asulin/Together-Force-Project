// import React from 'react';
// import VolunteeringCard from './VolunteeringCard';
// import { useGetAllVolunteeringQuery } from '../redux/slices/api/volunteeringApiSlice';
// import { Volunteering } from '../interface/Volunteering';
// import { selectCurrentUser} from "../redux/slices/togetherForceSlice";
// import { useSelector } from 'react-redux';

// const VolunteeringList=() =>{
//     const currentUser = useSelector(selectCurrentUser);

//   const {
//     data: allVolunteering,
//     isLoading,
//     isError,
//     error,
//   } = useGetAllVolunteeringQuery();

//   if (isLoading) return <p>טוען נתונים...</p>;
//   if (isError) return <p>אירעה שגיאה: {(error as any)?.message || 'שגיאה לא ידועה'}</p>;

//   return (
//     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
//   {currentUser && 'organizationNumber' in currentUser && (
//   <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
//     {allVolunteering
//       ?.filter((volunteering: Volunteering) => 
//         volunteering.byOrganizationNumber === currentUser.organizationNumber
//       )
//       .map((volunteering: Volunteering) => (
//         <VolunteeringCard key={volunteering._id} v={volunteering} />
//       ))}
      
//   </div>
// )}
// </div>
//   );
// }

// export default VolunteeringList;
// src/components/VolunteeringList.tsx
import React from 'react';
import VolunteeringCard from './VolunteeringCard';
import { useGetAllVolunteeringQuery } from '../redux/slices/api/volunteeringApiSlice';
import { Volunteering } from '../interface/Volunteering';
import { selectCurrentUser } from '../redux/slices/togetherForceSlice';
import { filterByOrganization, filterByVolunteerPreferences } from '../filters/volunteeringFilters';
import { useDispatch, useSelector } from "react-redux";
import {  setVolunteerings,selectVolunteerings } from "../redux/slices/togetherForceSlice";

const VolunteeringList = () => {
    const {data,isLoading,isError,error} = useGetAllVolunteeringQuery();
   const dispatch = useDispatch();
   const currentUser = useSelector(selectCurrentUser);
   dispatch(setVolunteerings(data))
   const allVolunteering = useSelector(selectVolunteerings);
  if (isLoading) return <p>טוען נתונים...</p>;
  if (isError) return <p>אירעה שגיאה: {(error as any)?.message || 'שגיאה לא ידועה'}</p>;

  let filteredVolunteering: Volunteering[] = [];

  if (!currentUser || !allVolunteering) {
    return null;
  }

  if ('organizationNumber' in currentUser) {
    // משתמש מארגון
    filteredVolunteering = filterByOrganization(allVolunteering, currentUser.organizationNumber);
  } else if ('selectedCities' in currentUser && 'selectedVolunteerOptions' in currentUser) {
    // מתנדב
    filteredVolunteering = filterByVolunteerPreferences(
      allVolunteering,
      currentUser.selectedCities,
      currentUser.selectedVolunteerOptions
    );
  } else {
    filteredVolunteering = allVolunteering;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {filteredVolunteering.map((v: Volunteering) => (
        <VolunteeringCard key={v._id} v={v} />
      ))}
    </div>
  );
};

export default VolunteeringList;
