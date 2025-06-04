import { useEffect } from 'react';
import VolunteeringCard from './VolunteeringCard';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/slices/togetherForceSlice';
import { useGetFilteredVolunteeringQuery } from '../redux/slices/api/volunteeringApiSlice';
import { Volunteering } from '../interface/Volunteering';
import socket from '../socket/socket';
import { useDispatch } from 'react-redux';
import  volunteeringApiSlice  from '../redux/slices/api/volunteeringApiSlice';
interface Props {
  filterByCitiesSkills: Boolean;
}
const VolunteeringList = ({filterByCitiesSkills}:Props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const requestParams =
    currentUser && 'organizationNumber' in currentUser
      ? { organizationNumber: currentUser.organizationNumber }
      : filterByCitiesSkills ===false  &&
        currentUser &&
        'selectedCities' in currentUser &&
        'selectedVolunteerOptions' in currentUser
      ? {
          selectedCities: currentUser.selectedCities,
          selectedOptions: currentUser.selectedVolunteerOptions,
        }
      : currentUser && '_id' in currentUser
      ? {
          volunteerId: currentUser._id,
        }
      : {};

  const { data: filteredVolunteering, isLoading, isError, error } =
    useGetFilteredVolunteeringQuery(requestParams);

  useEffect(() => {
    
    const handleNewVolunteering = () => {
    
      dispatch(volunteeringApiSlice.util.invalidateTags(['TogetherForce']));
    };

    socket.on('VolunteeringRoom', handleNewVolunteering);

    return () => {
      socket.off('VolunteeringRoom', handleNewVolunteering);
    };
  }, [dispatch]);

  if (isLoading) return <p>טוען נתונים...</p>;
  if (isError) return <p>שגיאה: {(error as any)?.message || 'לא ידועה'}</p>;

  return (
  <>
    {filteredVolunteering && filteredVolunteering.length > 0 ? (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {filteredVolunteering?.map((v: Volunteering) => (
          <VolunteeringCard key={v._id} volunteering={v} />
        ))}
      </div>
    ) : (
      <p>לא נמצאו התנדבויות</p>
    )}
  </>
);
};

export default VolunteeringList;