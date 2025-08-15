import { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { useLoginMutation } from '../authApi.ts';
import { useAppDispatch } from '../../../app/hooks.ts';
import { setUser } from '../authSlice';
import { useNavigation, CommonActions } from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const user = await login({ email, password }).unwrap();
      dispatch(setUser(user));

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        })
      );
    } catch (e) {
      console.log('Login error:', e);
    }
  };

  const handleSignUp = () => {
    navigation.navigate('Registration');
  };

  return (
    <View>
      <Text>Sign in</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title={isLoading ? 'Signing in...' : 'Sign in'} onPress={handleSubmit} />
      {error && <Text>Login failed</Text>}
      <TouchableOpacity onPress={handleSignUp} style={{ marginTop: 12 }}>
        <Text style={{ color: 'blue' }}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
