import React, { useRef, useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Video from 'react-native-video';

const BUFFER_CONFIG = {
  minBufferMs: 5000,
  maxBufferMs: 20000,
  bufferForPlaybackMs: 1000,
  bufferForPlaybackAfterRebufferMs: 2000,
};

// Recibe props específicas en lugar del objeto item completo
// para no depender de propiedades que no usa (imageUrl)
const VideoModal = ({ visible, title, videoUrl, description, onClose }) => {
  const insets = useSafeAreaInsets();
  const videoRef = useRef(null);
  const [buffering, setBuffering] = useState(true);

  // Cada vez que el modal se abre el Video se monta desde cero,
  // por lo que el buffering siempre arranca en true
  useEffect(() => {
    if (visible) setBuffering(true);
  }, [visible]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingTop: insets.top, paddingBottom: insets.bottom + 16 }}
        bounces={false}
      >
        <TouchableOpacity onPress={onClose} style={styles.backBtn} hitSlop={styles.hitSlop}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.videoContainer}>
          {videoUrl && visible ? (
            <>
              <Video
                ref={videoRef}
                source={{ uri: videoUrl }}
                style={styles.video}
                controls
                resizeMode="contain"
                paused={false}
                bufferConfig={BUFFER_CONFIG}
                onBuffer={({ isBuffering }) => setBuffering(isBuffering)}
                onLoad={() => setBuffering(false)}
                onError={(e) => { setBuffering(false); console.warn('Video error:', e); }}
              />
              {buffering && (
                <ActivityIndicator style={StyleSheet.absoluteFill} size="large" color="#fff" />
              )}
            </>
          ) : !videoUrl ? (
            <View style={styles.unavailableContainer}>
              <Text style={styles.unavailableText}>Video no disponible</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
          {description ? (
            <Text style={styles.description}>{description}</Text>
          ) : null}
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backBtn: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  hitSlop: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
  },
  videoContainer: {
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  unavailableContainer: {
    aspectRatio: 16 / 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unavailableText: {
    color: '#fff',
    fontSize: 16,
  },
  info: {
    padding: 16,
    gap: 8,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    color: '#aaa',
    fontSize: 14,
    lineHeight: 22,
  },
});

export default VideoModal;
