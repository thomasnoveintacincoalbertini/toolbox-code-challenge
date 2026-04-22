import React, { useEffect, useState } from 'react';
import { Image, View, ActivityIndicator, StyleSheet } from 'react-native';

const LazyImage = ({ uri, width, height, visible = true }) => {
  const [loading, setLoading] = useState(true);
  const containerStyle = { width, height, backgroundColor: '#222', overflow: 'hidden' };

  useEffect(() => {
    if (visible) {
      setLoading(true);
    }
  }, [visible, uri]);

  if (!visible) {
    return <View testID="lazy-image-placeholder" style={containerStyle} />;
  }

  return (
    <View style={containerStyle}>
      {loading && (
        <ActivityIndicator
          testID="lazy-image-spinner"
          style={StyleSheet.absoluteFill}
          color="#888"
          size="small"
        />
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
  hidden: {
    opacity: 0,
  },
});

export default LazyImage;
