import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { fetchDataset } from '../api/client';

interface DatasetItem {
  imageUrl: string;
  labels: { name: string; category?: string | null }[];
}

export const DatasetListScreen: React.FC = () => {
  const [items, setItems] = useState<DatasetItem[]>([]);

  useEffect(() => {
    fetchDataset()
      .then(setItems)
      .catch((err) => console.error(err));
  }, []);

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={items}
      keyExtractor={(_, idx) => idx.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.imageUrl }} style={styles.thumb} />
          <Text style={styles.title}>{item.labels.length} labels</Text>
          <Text style={styles.subtitle}>{item.labels.map((l) => l.name).join(', ')}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  card: { marginBottom: 12, borderWidth: 1, borderColor: '#eee', padding: 12, borderRadius: 8 },
  thumb: { width: '100%', height: 180, borderRadius: 8 },
  title: { fontWeight: '700', marginTop: 8 },
  subtitle: { color: '#555' }
});
