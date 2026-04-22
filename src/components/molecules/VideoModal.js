import React, { useRef, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';

const BUFFER_CONFIG = {
  minBufferMs: 5000,
  maxBufferMs: 20000,
  bufferForPlaybackMs: 1000,
  bufferForPlaybackAfterRebufferMs: 2000,
};

const VideoModal = ({ visible, item, onClose }) => {
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
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn} hitSlop={styles.hitSlop}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

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
            <Text style={styles.unavailableText}>Video no disponible</Text>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 12,
  },
  closeBtn: {
    padding: 4,
  },
  hitSlop: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
  closeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  videoContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  unavailableText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default VideoModal;
