import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export const launchImagePicker = async(): Promise<string | undefined> => {
  await checkMdeiaPermissions();

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  }
};

const checkMdeiaPermissions = async(): Promise<void> => {
  if (Platform.OS !== 'web') {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      return Promise.reject('We need permission to access your photos');
    }
  }

  return Promise.resolve();
}