import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import LazyImage from '../atoms/LazyImage';

const POSTER_WIDTH = 120;
const POSTER_HEIGHT = 180;

const PosterItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item)} style={styles.container} activeOpacity={0.8}>
    <LazyImage uri={item.imageUrl} style={StyleSheet.absoluteFill} />
    <View style={styles.titleOverlay}>
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
    marginRight: 10,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#222',
    justifyContent: 'flex-end',
  },
  titleOverlay: {
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
