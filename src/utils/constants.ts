import { Platform } from 'react-native';

export const API_BASE_URL: string = Platform.select({
  android: 'http://192.168.100.101:8080',
  ios: 'http://localhost:8080',
})!;
