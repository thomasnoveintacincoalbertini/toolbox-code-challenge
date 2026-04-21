import React, { useState } from 'react';
import { Image, View, ActivityIndicator, StyleSheet } from 'react-native';

const LazyImage = ({ uri, style }) => {
  const [loading, setLoading] = useState(true);

  return (
    <View style={[styles.wrapper, style]}>
      {loading && (
        <ActivityIndicator style={StyleSheet.absoluteFill} color="#888" size="small" />
      )}
      <Image
        source={{ uri }}
        style={[StyleSheet.absoluteFill, loading && styles.hidden]}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#222',
    overflow: 'hidden',
  },
  hidden: {
    opacity: 0,
  },
});

export default LazyImage;
