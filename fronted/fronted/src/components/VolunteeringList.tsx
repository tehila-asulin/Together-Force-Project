import React from 'react';
import VolunteeringCard from './VolunteeringCard';
import { useGetAllVolunteeringQuery } from '../redux/slices/api/volunteeringApiSlice';
import { Volunteering } from '../interface/Volunteering';
import { selectCurrentUser} from "../redux/slices/togetherForceSlice";
import { useSelector } from 'react-redux';

const VolunteeringList=() =>{
    const currentUser = useSelector(selectCurrentUser);

  const {
    data: allVolunteering,
    isLoading,
    isError,
    error,
  } = useGetAllVolunteeringQuery();

  if (isLoading) return <p>טוען נתונים...</p>;
  if (isError) return <p>אירעה שגיאה: {(error as any)?.message || 'שגיאה לא ידועה'}</p>;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
  {currentUser && 'organizationNumber' in currentUser && (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
    {allVolunteering
      ?.filter((volunteering: Volunteering) => 
        volunteering.byOrganizationNumber === currentUser.organizationNumber
      )
      .map((volunteering: Volunteering) => (
        <VolunteeringCard key={volunteering._id} v={volunteering} />
      ))}
  </div>
)}
</div>
  );
}

export default VolunteeringList;
