import React, {useEffect} from 'react';
import { DeviceEventEmitter, NativeModules, StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    const sub = DeviceEventEmitter.addListener('touchEvent', (data) => {
      console.log('📲 Touch Event:', data);
    });

    NativeModules.OpenAccessibilityService?.setContextManually?.();

    return () => {
      sub.remove();
    };
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <RootNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}
