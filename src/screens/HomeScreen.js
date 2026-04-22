import React, { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuth from '../hooks/useAuth';
import useCarousels from '../hooks/useCarousels';
import useTokenInterceptor from '../hooks/useTokenInterceptor';
import useVideoModal from '../hooks/useVideoModal';
import CarouselRow from '../components/organisms/CarouselRow';
import LoadingSpinner from '../components/atoms/LoadingSpinner';
import ErrorMessage from '../components/atoms/ErrorMessage';
import VideoModal from '../components/molecules/VideoModal';

const HomeScreen = () => {
  const { token, type, authenticate, authError } = useAuth();
  useTokenInterceptor(authenticate);

  const { data: carousels, isLoading, isError, refetch } = useCarousels(token, type);
  const { selectedItem, modalVisible, handleItemPress, handleModalClose } = useVideoModal();

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

  if (!token) {
    if (authError) {
      return (
        <ErrorMessage
          message={authError}
          actionLabel="Reintentar"
          onAction={authenticate}
        />
      );
    }

    return <LoadingSpinner />;
  }

  if (isLoading) return <LoadingSpinner />;
  if (isError) {
    return (
      <ErrorMessage
        message="Error al cargar los datos. Intente nuevamente."
        actionLabel="Reintentar"
        onAction={refetch}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
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
      />
      <VideoModal
        visible={modalVisible}
        title={selectedItem?.title}
        videoUrl={selectedItem?.videoUrl}
        description={selectedItem?.description}
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
});

export default HomeScreen;
