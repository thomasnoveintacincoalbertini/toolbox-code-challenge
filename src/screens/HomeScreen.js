import React, { useState, useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Video from 'react-native-video';
import useAuth from '../hooks/useAuth';
import useCarousels from '../hooks/useCarousels';
import CarouselRow from '../components/organisms/CarouselRow';
import LoadingSpinner from '../components/atoms/LoadingSpinner';
import ErrorMessage from '../components/atoms/ErrorMessage';
import VideoModal from '../components/molecules/VideoModal';

const PREFETCH_WINDOW = 3;

const HomeScreen = () => {
  const { token, type } = useAuth();
  const { data: carousels, isLoading, isError } = useCarousels(token, type);

  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [prefetchUrls, setPrefetchUrls] = useState([]);

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    const urls = [
      ...new Set(
        viewableItems
          .slice(0, PREFETCH_WINDOW)
          .map(({ item: carousel }) => carousel.items?.[0]?.videoUrl)
          .filter(Boolean)
      ),
    ];

    setPrefetchUrls(urls);
  }, []);

  const handleItemPress = useCallback((item) => {
    setSelectedItem(item);
    setModalVisible(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalVisible(false);
    setSelectedItem(null);
  }, []);

  const renderCarousel = useCallback(
    ({ item: carousel }) => (
      <CarouselRow carousel={carousel} onItemPress={handleItemPress} />
    ),
    [handleItemPress]
  );

  const keyExtractor = useCallback(
    (item, index) => `carousel-${item.title}-${index}`,
    []
  );

  if (!token || isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message="Error al cargar los datos. Intente nuevamente." />;

  return (
    <SafeAreaView style={styles.safe}>
      {prefetchUrls.map((url) => (
        <Video
          key={url}
          source={{ uri: url }}
          style={styles.prefetch}
          paused
          muted
          onError={() => {}}
        />
      ))}

      <FlatList
        data={carousels}
        renderItem={renderCarousel}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        windowSize={3}
        maxToRenderPerBatch={2}
        initialNumToRender={2}
        removeClippedSubviews
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      />

      <VideoModal
        visible={modalVisible}
        item={selectedItem}
        onClose={handleModalClose}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#111',
  },
  content: {
    paddingTop: 16,
    paddingBottom: 32,
  },
  prefetch: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
});

export default HomeScreen;
