import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
  navigation: NativeStackNavigationProp<any>;
}

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grocery Labeler</Text>
      <Button title="Scan New Image" onPress={() => navigation.navigate('Scan')} />
      <View style={{ height: 12 }} />
      <Button title="View Dataset" onPress={() => navigation.navigate('Dataset')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  }
});
