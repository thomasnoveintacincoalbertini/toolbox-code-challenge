import { useState, useCallback } from 'react';

const PREFETCH_WINDOW = 3;

const usePrefetch = () => {
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

  return { prefetchUrls, onViewableItemsChanged };
};

export default usePrefetch;
