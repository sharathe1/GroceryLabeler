import React, { useState } from 'react';
import { View, Image, StyleSheet, ScrollView, Button, Alert, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LabelPayload, VisionSuggestedItem } from '../types';
import { LabelItemRow } from '../components/LabelItemRow';
import { saveLabels } from '../api/client';

type Props = NativeStackScreenProps<any, 'Review'>;

export const ReviewLabelsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { imageId, imageUrl, suggestedItems } = route.params as {
    imageId: number;
    imageUrl: string;
    suggestedItems: VisionSuggestedItem[];
  };

  const [labels, setLabels] = useState<LabelPayload[]>(
    suggestedItems.map((item) => ({
      name: item.name,
      category: item.category,
      confidence: item.confidence,
      source: item.confidence >= 0.7 ? 'AUTO' : 'AUTO_CORRECTED'
    }))
  );

  const updateLabel = (index: number, updated: LabelPayload) => {
    const copy = [...labels];
    copy[index] = updated;
    setLabels(copy);
  };

  const addLabel = () => {
    setLabels([...labels, { name: '', category: '', confidence: null, source: 'MANUAL' }]);
  };

  const deleteLabel = (index: number) => {
    setLabels(labels.filter((_, i) => i !== index));
  };

  const onSave = async () => {
    try {
      await saveLabels(imageId, labels);
      Alert.alert('Saved', 'Labels stored successfully.');
      navigation.navigate('Home');
    } catch (err) {
      Alert.alert('Error', 'Failed to save labels');
      console.error(err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.preview} />
      <Text style={styles.helper}>Edit labels suggested by the vision API or add your own.</Text>
      {labels.map((label, idx) => (
        <LabelItemRow
          key={idx}
          item={label}
          onChange={(updated) => updateLabel(idx, updated)}
          onDelete={() => deleteLabel(idx)}
          highConfidence={(label.confidence ?? 0) >= 0.7}
        />
      ))}
      <Button title="Add item" onPress={addLabel} />
      <View style={{ height: 12 }} />
      <Button title="Save" onPress={onSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  preview: { width: '100%', height: 280, marginBottom: 12, borderRadius: 8 },
  helper: { marginBottom: 12 }
});
