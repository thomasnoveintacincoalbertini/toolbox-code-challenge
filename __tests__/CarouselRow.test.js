import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CarouselRow from '../src/components/organisms/CarouselRow';

jest.mock('../src/components/atoms/LazyImage', () => {
  const { View } = require('react-native');
  return ({ style, visible = true }) =>
    visible ? <View testID="lazy-image" style={style} /> : null;
});

const posterCarousel = {
  title: 'Top Movies',
  type: 'poster',
  items: [
    { title: 'Movie A', imageUrl: 'https://example.com/a.jpg', videoUrl: 'https://v.com/a' },
    { title: 'Movie B', imageUrl: 'https://example.com/b.jpg' },
    { title: 'Movie C', imageUrl: 'https://example.com/c.jpg', videoUrl: 'https://v.com/c' },
    { title: 'Movie D', imageUrl: 'https://example.com/d.jpg', videoUrl: 'https://v.com/d' },
  ],
};

const thumbCarousel = {
  title: 'Featured',
  type: 'thumb',
  items: [
    { title: 'Show X', imageUrl: 'https://example.com/x.jpg', videoUrl: 'https://v.com/x' },
    { title: 'Show Y', imageUrl: 'https://example.com/y.jpg' },
  ],
};

describe('CarouselRow', () => {
  it('renders the carousel title', () => {
    const { getByText } = render(
      <CarouselRow carousel={posterCarousel} onItemPress={() => {}} />
    );
    expect(getByText('Top Movies')).toBeTruthy();
  });

  it('renders all item titles for poster type', () => {
    const { getByText, queryByText } = render(
      <CarouselRow carousel={posterCarousel} onItemPress={() => {}} />
    );
    expect(getByText('Movie A')).toBeTruthy();
    expect(getByText('Movie B')).toBeTruthy();
    expect(getByText('Movie C')).toBeTruthy();
    expect(queryByText('Movie D')).toBeNull();
  });

  it('only mounts images for the initial visible poster items', () => {
    const { getAllByTestId } = render(
      <CarouselRow carousel={posterCarousel} onItemPress={() => {}} />
    );
    expect(getAllByTestId('lazy-image')).toHaveLength(3);
  });

  it('renders thumb carousel title', () => {
    const { getByText } = render(
      <CarouselRow carousel={thumbCarousel} onItemPress={() => {}} />
    );
    expect(getByText('Featured')).toBeTruthy();
  });

  it('renders all item titles for thumb type', () => {
    const { getByText } = render(
      <CarouselRow carousel={thumbCarousel} onItemPress={() => {}} />
    );
    expect(getByText('Show X')).toBeTruthy();
    expect(getByText('Show Y')).toBeTruthy();
  });

  it('calls onItemPress with the correct item when pressed', () => {
    const onItemPress = jest.fn();
    const { getByText } = render(
      <CarouselRow carousel={posterCarousel} onItemPress={onItemPress} />
    );
    fireEvent.press(getByText('Movie A'));
    expect(onItemPress).toHaveBeenCalledWith(posterCarousel.items[0]);
  });
});
