import React, { useState } from 'react';
import { Image, View, ActivityIndicator, StyleSheet } from 'react-native';

/**
 * El lazy loading se logra en dos niveles: FlatList no renderiza ítems fuera
 * de su ventana (windowSize), y este componente muestra un spinner mientras
 * la imagen carga para evitar el parpadeo del placeholder vacío.
 */
const LazyImage = ({ uri, style }) => {
  const [loading, setLoading] = useState(true);

  return (
    <View style={[styles.wrapper, style]}>
      {loading && (
        <ActivityIndicator testID="lazy-image-spinner" style={StyleSheet.absoluteFill} color="#888" size="small" />
      )}
      <Image
        testID="lazy-image-img"
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
