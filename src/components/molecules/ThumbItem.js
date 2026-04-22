import React from 'react';
import { TouchableOpacity, View, StyleSheet, PixelRatio } from 'react-native';
import LazyImage from '../atoms/LazyImage';
import ItemTitle from '../atoms/ItemTitle';

// Dimensiones definidas en el brief: placeimg.com/640/480
const THUMB_WIDTH = Math.round(640 / PixelRatio.get());
const THUMB_HEIGHT = Math.round(480 / PixelRatio.get());

const ThumbItem = ({ item, onPress, visible }) => (
  <TouchableOpacity onPress={() => onPress(item)} style={styles.container} activeOpacity={0.8}>
    <View style={styles.imageWrapper}>
      <LazyImage uri={item.imageUrl} width={THUMB_WIDTH} height={THUMB_HEIGHT} visible={visible} />
    </View>
    <ItemTitle title={item.title} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },
  imageWrapper: {
    borderRadius: 6,
    overflow: 'hidden',
  },
});

export default ThumbItem;
