
import { View, Text } from 'react-native';
import type { TripData } from '../types';

const formatDateTime = (iso: string) => {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
};

const Trip: React.FC<TripData> = ({ startTime, stopTime, driveTime, touchCount }) => {
    return (
        <View>
          <Text>Start time: {formatDateTime(startTime)}</Text>
          <Text>Stop time: {stopTime ? formatDateTime(stopTime) : 'In progress...'}</Text>
          <Text>Drive time: {driveTime} seconds</Text>
          <Text>Number of phone use: {touchCount}</Text>
        </View>
    );
};

export default Trip;