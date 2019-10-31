import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.ball} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ball: {
    backgroundColor: '#f00',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
