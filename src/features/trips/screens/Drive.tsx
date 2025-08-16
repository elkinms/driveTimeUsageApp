import { View, Text, Button } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { resetTrip, startTrip, stopTrip } from '../tripSlice.ts';
import { API_BASE_URL } from '../../../utils/constants';
import { selectUserEmail } from '../../auth/authSlice';
import Header from '../../auth/components/Header';

const Drive = () => {
  const userEmail = useAppSelector(selectUserEmail);
  const dispatch = useAppDispatch();
  const activeTrip = useAppSelector(state => state.trip.activeTrip);

  const handleToggleTrip = async () => {
    if (activeTrip) {
      try {
        await fetch(`${API_BASE_URL}/trips/${activeTrip.id}/stop`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ stopTime: new Date().toISOString() }),
        });
        dispatch(stopTrip());
        dispatch(resetTrip());
      } catch (error) {
        console.error('Error during ending the trip:', error);
      }
    } else {
      try {
        const res = await fetch(`${API_BASE_URL}/trips/start`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: userEmail,
            startTime: new Date().toISOString() }),
        });

        const data = await res.json();
        dispatch(startTrip({ id: data.id, startTime: data.startTime }));
      } catch (error) {
        console.error('Error during starting the trip:', error);
      }
    }
  };

  return (
    <View>
      <Header />
      <View>
        <Text>Welcome. Drive safely.</Text>
      </View>
      <View>
        <Button
          title={activeTrip ? 'Stop driving' : 'Start driving'}
          onPress={handleToggleTrip}
        />
      </View>
    </View>
  );
};

export default Drive;
