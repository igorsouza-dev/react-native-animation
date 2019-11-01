import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ball: {
    backgroundColor: '#f00',
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 30,
  },
  ball2: {
    backgroundColor: '#03f',
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 30,
  },
  ball3: {
    backgroundColor: '#862',
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 30,
  },
});

export default function App() {
  const [ballY, setBallY] = useState(new Animated.Value(0));
  const [ballY2, setBallY2] = useState(new Animated.Value(0));
  const [ballY3, setBallY3] = useState(new Animated.Value(0));
  const [ballX, setBallX] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(ballY, {
      toValue: 500,
      timing: 1000,
    }).start();
    Animated.spring(ballY2, {
      toValue: 300,
      bounciness: 20,
    }).start();
    Animated.decay(ballY3, {
      velocity: 0.5,
    }).start();
  }, []); // eslint-disable-line

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.ball,
          {
            top: ballY,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.ball2,
          {
            top: ballY2,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.ball3,
          {
            top: ballY3,
          },
        ]}
      />
    </View>
  );
}
