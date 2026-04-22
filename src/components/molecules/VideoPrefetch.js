import React from 'react';
import { StyleSheet } from 'react-native';
import Video from 'react-native-video';

// Componente separado para que HomeScreen no dependa directamente de react-native-video
const VideoPrefetch = ({ urls }) =>
  urls.map((url) => (
    <Video
      key={url}
      source={{ uri: url }}
      style={styles.hidden}
      paused
      muted
      onError={() => {}}
    />
  ));

const styles = StyleSheet.create({
  hidden: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
});

export default VideoPrefetch;
