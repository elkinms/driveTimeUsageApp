import React from 'react';
import { View, Button, NativeModules } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../../app/hooks';
import { logout } from '../authSlice';

const Header = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handleSignOut = () => {
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const handleOpenAccessibilitySettings = () => {
    NativeModules.OpenAccessibilityService?.open(); // Открытие настроек Accessibility
  };

  return (
    <View>
      <Button title="Sign Out" onPress={handleSignOut} />
      <Button title="Enable Accessibility" onPress={handleOpenAccessibilitySettings} />
    </View>
  );
};

export default Header;
