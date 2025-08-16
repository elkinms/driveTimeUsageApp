import React from 'react';
import { View, Button } from 'react-native';
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

  return (
    <View>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

export default Header;
