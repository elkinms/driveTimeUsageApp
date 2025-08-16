import { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { useRegisterMutation } from '../authApi.ts';
import { useAppDispatch } from '../../../app/hooks.ts';
import { setUser } from '../authSlice';
import { CommonActions, useNavigation } from '@react-navigation/native';

const Registration = () => {
  const dispatch = useAppDispatch();
  const [register, { isLoading, error }] = useRegisterMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigation = useNavigation();

  const onSubmit = async () => {
    try {
      const user = await register({ email, password, name }).unwrap();
      dispatch(setUser(user));

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        })
      );
    } catch (e) {
      console.log('Register error', e);
    }
  };

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  return (
    <View>
      <Text>Sing up</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="*Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="*Password" value={password} onChangeText={setPassword} secureTextEntry />

      {error && <Text>Error: {(error as any)?.data?.message || 'Unknown error'}</Text>}

      <Button title={isLoading ? 'Signing up...' : 'Sign up'} onPress={onSubmit} disabled={isLoading} />

      <TouchableOpacity onPress={handleSignIn} style={{ marginTop: 12 }}>
        <Text style={{ color: 'blue' }}>Already have an account? Sign in</Text>
      </TouchableOpacity>

    </View>
  );
};

export default Registration;
