import React from 'react';
import { View, TextInput, Text, StyleSheet, Button } from 'react-native';
import { LabelPayload } from '../types';

interface Props {
  item: LabelPayload;
  onChange: (updated: LabelPayload) => void;
  onDelete?: () => void;
  highConfidence?: boolean;
}

export const LabelItemRow: React.FC<Props> = ({ item, onChange, onDelete, highConfidence }) => {
  return (
    <View style={[styles.row, !highConfidence && styles.lowConfidence]}>
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={item.name}
          onChangeText={(text) => onChange({ ...item, name: text })}
          placeholder="e.g. Kellogg's Corn Flakes"
        />
      </View>
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          value={item.category || ''}
          onChangeText={(text) => onChange({ ...item, category: text })}
          placeholder="e.g. cereal"
        />
      </View>
      <Text style={styles.meta}>Conf: {item.confidence ?? '—'}</Text>
      <Text style={styles.meta}>Source: {item.source}</Text>
      {onDelete && <Button title="Delete" onPress={onDelete} />}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12
  },
  lowConfidence: {
    borderColor: '#f39c12',
    backgroundColor: '#fdf4e3'
  },
  fieldGroup: {
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8
  },
  label: {
    fontWeight: '600'
  },
  meta: {
    fontSize: 12,
    color: '#555'
  }
});
