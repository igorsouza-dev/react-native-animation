import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  Image,
  Alert,
  Animated,
  StyleSheet,
  Dimensions,
  PanResponder,
  TouchableWithoutFeedback,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const {width} = Dimensions.get('window');

export default function User({onPress, user}) {
  const [opacity, setOpacity] = useState(new Animated.Value(0));
  const [offset, setOffset] = useState(new Animated.ValueXY({x: 0, y: 50}));
  const panResponder = PanResponder.create({
    onPanResponderTerminationRequest: () => false,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      {
        dx: offset.x,
      },
    ]),
    onPanResponderRelease: () => {
      if (offset.x._value > 180) {
        Alert.alert('Deleted!');
      }
      Animated.spring(offset.x, {
        toValue: 0,
        bounciness: 10,
      }).start();
    },
    onPanResponderTerminate: () => {
      Animated.spring(offset.x, {
        toValue: 0,
        bounciness: 10,
      }).start();
    },
  });
  useEffect(() => {
    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 5,
        bounciness: 20,
      }),
      Animated.timing(opacity, {
        duration: 500,
        toValue: 1,
      }),
    ]).start();
  }, []); //eslint-disable-line

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        {opacity},
        {
          transform: [
            ...offset.getTranslateTransform(),
            {
              rotateZ: offset.x.interpolate({
                inputRange: [width * -1, width],
                outputRange: ['-50deg', '50deg'],
              }),
            },
          ],
        },
      ]}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.userContainer}>
          <Image style={styles.thumbnail} source={{uri: user.thumbnail}} />

          <View style={[styles.infoContainer, {backgroundColor: user.color}]}>
            <View style={styles.bioContainer}>
              <Text style={styles.name}>{user.name.toUpperCase()}</Text>
              <Text style={styles.description}>{user.description}</Text>
            </View>
            <View style={styles.likesContainer}>
              <Icon name="heart" size={12} color="#FFF" />
              <Text style={styles.likes}>{user.likes}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    marginTop: 10,
    borderRadius: 10,
    flexDirection: 'column',
    marginHorizontal: 15,
  },

  thumbnail: {
    width: '100%',
    height: 150,
  },

  infoContainer: {
    backgroundColor: '#57BCBC',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
  },

  bioContainer: {
    flex: 1,
  },

  name: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 10,
  },

  description: {
    color: '#FFF',
    fontSize: 13,
    marginTop: 2,
  },

  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 20,
  },

  likes: {
    color: '#FFF',
    fontSize: 12,
    marginLeft: 5,
  },
});
