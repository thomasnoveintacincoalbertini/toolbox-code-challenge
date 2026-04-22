import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, PixelRatio } from 'react-native';
import LazyImage from '../atoms/LazyImage';

// Dimensiones definidas en el brief: placeimg.com/320/480
const POSTER_WIDTH = Math.round(320 / PixelRatio.get());
const POSTER_HEIGHT = Math.round(480 / PixelRatio.get());

const PosterItem = ({ item, onPress, visible }) => (
  <TouchableOpacity onPress={() => onPress(item)} style={styles.container} activeOpacity={0.8}>
    <LazyImage uri={item.imageUrl} width={POSTER_WIDTH} height={POSTER_HEIGHT} visible={visible} />
    <View style={styles.titleOverlay}>
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    borderRadius: 6,
    overflow: 'hidden',
  },
  titleOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 6,
    paddingHorizontal: 6,

  },
  title: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default PosterItem;
