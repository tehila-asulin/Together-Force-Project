import VolunteeringCard from './VolunteeringCard';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/slices/togetherForceSlice';
import { useGetFilteredVolunteeringQuery } from '../redux/slices/api/volunteeringApiSlice';
import { Volunteering } from '../interface/Volunteering';

const VolunteeringList = () => {
  const currentUser = useSelector(selectCurrentUser);

  const requestParams =
    currentUser && 'organizationNumber' in currentUser
      ? { organizationNumber: currentUser.organizationNumber }
      : currentUser && 'selectedCities' in currentUser && 'selectedVolunteerOptions' in currentUser
      ? {
          selectedCities: currentUser.selectedCities,
          selectedOptions: currentUser.selectedVolunteerOptions,
        }
      : {};

  const {
    data: filteredVolunteering,isLoading,isError,error,} = useGetFilteredVolunteeringQuery(requestParams);

  if (isLoading) return <p>טוען נתונים...</p>;
  if (isError) return <p>אירעה שגיאה: {(error as any)?.message || 'שגיאה לא ידועה'}</p>;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {filteredVolunteering?.map((v: Volunteering) => (
        <VolunteeringCard key={v._id} v={v} />
      ))}
    </div>
  );
};

export default VolunteeringList;
