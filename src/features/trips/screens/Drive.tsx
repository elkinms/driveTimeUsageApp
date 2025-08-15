import { View, Text, Button } from 'react-native';

const Drive = () => {
    return (
        <View>
            <View>
                <Text>
                    Welcome. Drive safely.
                </Text>
            </View>
            <View>
                <Button title="Start driving" onPress={() => { /* TODO: start */ }} />
            </View>
        </View>
    );
};

export default Drive;
