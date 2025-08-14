
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Drive from '../screens/Drive';
import Trips from '../screens/Trips';

const Tab = createBottomTabNavigator();

export default function RootNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Drive" component={Drive} />
                <Tab.Screen name="Trips" component={Trips} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
