import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import Header from '../../auth/components/Header';
import { useGetTripsQuery } from '../tripApi.ts';
import Trip from '../components/Trip';

const Trips = () => {
  const { data: trips, isLoading, isError, refetch } = useGetTripsQuery();
  if (isLoading) return <ActivityIndicator />;
  if (isError) {
    return (
      <View>
        <Text>Failed to load data.</Text>
        <Text onPress={() => refetch()}>Tap to retry.</Text>
      </View>
    );
  }

  return (
    <View>
      <Header />
      <FlatList
        data={trips ?? []}
        renderItem={({ item }) => (
          <Trip
            startTime={item.startTime}
            stopTime={item.stopTime}
            touchCount={item.touchCount}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={<Text>No trips.</Text>}
      />
    </View>
  );
};

export default Trips;
