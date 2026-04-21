import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import LazyImage from '../atoms/LazyImage';
import ItemTitle from '../atoms/ItemTitle';

const POSTER_WIDTH = 120;
const POSTER_HEIGHT = 180;

const PosterItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item)} style={styles.container} activeOpacity={0.8}>
    <LazyImage uri={item.imageUrl} style={styles.image} />
    <ItemTitle title={item.title} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: POSTER_WIDTH,
    marginRight: 10,
  },
  image: {
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
    borderRadius: 6,
  },
});

export default PosterItem;
