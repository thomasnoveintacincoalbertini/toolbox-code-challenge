import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import LazyImage from '../atoms/LazyImage';
import ItemTitle from '../atoms/ItemTitle';

const THUMB_WIDTH = 200;
const THUMB_HEIGHT = 120;

const ThumbItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item)} style={styles.container} activeOpacity={0.8}>
    <LazyImage uri={item.imageUrl} style={styles.image} />
    <ItemTitle title={item.title} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: THUMB_WIDTH,
    marginRight: 10,
  },
  image: {
    width: THUMB_WIDTH,
    height: THUMB_HEIGHT,
    borderRadius: 6,
  },
});

export default ThumbItem;
