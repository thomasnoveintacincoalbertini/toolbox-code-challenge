import React, { useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import PosterItem from '../molecules/PosterItem';
import ThumbItem from '../molecules/ThumbItem';

// Agregar un nuevo tipo de carrusel solo requiere una entrada en este mapa,
// sin modificar el componente (abierto para extensión, cerrado para modificación)
const ITEM_COMPONENTS = {
  poster: PosterItem,
  thumb: ThumbItem,
};

const CarouselRow = ({ carousel, onItemPress }) => {
  const ItemComponent = ITEM_COMPONENTS[carousel.type] ?? ThumbItem;

  const renderItem = useCallback(
    ({ item }) => <ItemComponent item={item} onPress={onItemPress} />,
    [ItemComponent, onItemPress]
  );

  const keyExtractor = useCallback(
    (item, index) => `${carousel.title}-${index}`,
    [carousel.title]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{carousel.title}</Text>
      <FlatList
        data={carousel.items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        maxToRenderPerBatch={4}
        initialNumToRender={3}
        windowSize={5}
        removeClippedSubviews
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 28,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingHorizontal: 16,
  },
});

export default CarouselRow;
