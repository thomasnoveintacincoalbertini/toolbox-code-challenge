import React, { useRef, useState } from 'react';
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

const VideoModal = ({ visible, item, onClose }) => {
  const insets = useSafeAreaInsets();
  const videoRef = useRef(null);
  const [buffering, setBuffering] = useState(true);

  if (!item) return null;

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
          {item.videoUrl ? (
            <>
              <Video
                ref={videoRef}
                source={{ uri: item.videoUrl }}
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
          ) : (
            <View style={styles.unavailableContainer}>
              <Text style={styles.unavailableText}>Video no disponible</Text>
            </View>
          )}
        </View>

        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>
          {item.description ? (
            <Text style={styles.description}>{item.description}</Text>
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
