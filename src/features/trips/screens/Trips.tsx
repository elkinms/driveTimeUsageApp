import { View, Text } from 'react-native';
import Header from '../../auth/components/Header.tsx';

const Trips = () => {
    return (
      <View>
        <Header />
          <Text>Trips</Text>
          {/* TODO: add list of trips */}
      </View>
    );
};

export default Trips;
