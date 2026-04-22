const normalizePicsum = (url) => {
  if (!url) return url;
  const match = url.match(/placeimg\.(?:com)\/(\d+)\/(\d+)/);
  if (!match) return url;
  return `https://picsum.photos/${match[1]}/${match[2]}`;
};

export const normalizeCarousels = (carousels) =>
  carousels.map((carousel) => ({
    ...carousel,
    items: carousel.items.map((item) => ({
      ...item,
      imageUrl: normalizePicsum(item.imageUrl),
    })),
  }));
