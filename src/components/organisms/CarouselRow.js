import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import PosterItem from '../molecules/PosterItem';
import ThumbItem from '../molecules/ThumbItem';

// Agregar un nuevo tipo de carrusel solo requiere una entrada en este mapa,
// sin modificar el componente (abierto para extensión, cerrado para modificación)
const ITEM_COMPONENTS = {
  poster: PosterItem,
  thumb: ThumbItem,
};
const INITIAL_VISIBLE_ITEMS = 3;

const getCarouselItemKey = (carouselTitle, item, index) =>
  `${carouselTitle}-${item.title}-${item.imageUrl ?? item.videoUrl ?? 'item'}-${index}`;

const CarouselRow = ({ carousel, onItemPress }) => {
  const ItemComponent = ITEM_COMPONENTS[carousel.type] ?? ThumbItem;
  const [visibleItemKeys, setVisibleItemKeys] = useState(() => (
    new Set(
      carousel.items
        .slice(0, INITIAL_VISIBLE_ITEMS)
        .map((item, index) => getCarouselItemKey(carousel.title, item, index))
    )
  ));
  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    setVisibleItemKeys(
      new Set(
        viewableItems.map(({ item, index }) =>
          getCarouselItemKey(carousel.title, item, index ?? 0)
        )
      )
    );
  }, [carousel.title]);

  useEffect(() => {
    setVisibleItemKeys(
      new Set(
        carousel.items
          .slice(0, INITIAL_VISIBLE_ITEMS)
          .map((item, index) => getCarouselItemKey(carousel.title, item, index))
      )
    );
  }, [carousel.items, carousel.title]);

  const renderItem = useCallback(
    ({ item, index }) => (
      <ItemComponent
        item={item}
        onPress={onItemPress}
        visible={visibleItemKeys.has(getCarouselItemKey(carousel.title, item, index))}
      />
    ),
    [ItemComponent, carousel.title, onItemPress, visibleItemKeys]
  );

  const keyExtractor = useCallback(
    (item, index) => getCarouselItemKey(carousel.title, item, index),
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
        extraData={visibleItemKeys}
        maxToRenderPerBatch={4}
        initialNumToRender={3}
        windowSize={5}
        removeClippedSubviews
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
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
