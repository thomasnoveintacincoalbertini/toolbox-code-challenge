import React, { useState, useCallback } from 'react';
import { ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import useAuth from '../hooks/useAuth';
import useCarousels from '../hooks/useCarousels';
import CarouselRow from '../components/organisms/CarouselRow';
import LoadingSpinner from '../components/atoms/LoadingSpinner';
import ErrorMessage from '../components/atoms/ErrorMessage';
import VideoModal from '../components/molecules/VideoModal';

const HomeScreen = () => {
  const { token, type } = useAuth();
  const { data: carousels, isLoading, isError } = useCarousels(token, type);

  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleItemPress = useCallback((item) => {
    setSelectedItem(item);
    setModalVisible(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalVisible(false);
    setSelectedItem(null);
  }, []);

  if (!token || isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message="Error al cargar los datos. Intente nuevamente." />;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        {carousels?.map((carousel, index) => (
          <CarouselRow
            key={`${carousel.title}-${index}`}
            carousel={carousel}
            onItemPress={handleItemPress}
          />
        ))}
      </ScrollView>

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
  scroll: {
    flex: 1,
  },
  content: {
    paddingTop: 16,
    paddingBottom: 32,
  },
});

export default HomeScreen;
