import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Text, ActivityIndicator, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import { uploadAndClassify } from '../api/client';

interface Props {
  navigation: NativeStackNavigationProp<any>;
}

export const ScanScreen: React.FC<Props> = ({ navigation }) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const requestAndCapture = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Camera access is needed to capture groceries.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ base64: false, quality: 0.6 });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleClassify = async () => {
    if (!imageUri) return;
    setLoading(true);
    try {
      const response = await uploadAndClassify(imageUri);
      navigation.navigate('Review', {
        imageId: response.imageId,
        imageUrl: response.imageUrl,
        suggestedItems: response.suggestedItems
      });
    } catch (err) {
      Alert.alert('Error', 'Failed to classify image.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Capture Image" onPress={requestAndCapture} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.preview} />}
      {loading ? <ActivityIndicator /> : <Button title="Upload & Classify" onPress={handleClassify} disabled={!imageUri} />}
      <Text style={styles.helper}>Images are uploaded to the backend and classified using the configured VisionService.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  preview: { width: '100%', height: 320, marginVertical: 12, borderRadius: 8 },
  helper: { fontSize: 12, color: '#555' }
});
