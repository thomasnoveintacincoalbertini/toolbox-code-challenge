import React from 'react';
import { render } from '@testing-library/react-native';
import CarouselRow from '../src/components/organisms/CarouselRow';

jest.mock('../src/components/atoms/LazyImage', () => {
  const { View } = require('react-native');
  return ({ style }) => <View testID="lazy-image" style={style} />;
});

const posterCarousel = {
  title: 'Top Movies',
  type: 'poster',
  items: [
    { title: 'Movie A', imageUrl: 'https://example.com/a.jpg', videoUrl: 'https://v.com/a' },
    { title: 'Movie B', imageUrl: 'https://example.com/b.jpg' },
    { title: 'Movie C', imageUrl: 'https://example.com/c.jpg', videoUrl: 'https://v.com/c' },
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
    const { getByText } = render(
      <CarouselRow carousel={posterCarousel} onItemPress={() => {}} />
    );
    expect(getByText('Movie A')).toBeTruthy();
    expect(getByText('Movie B')).toBeTruthy();
    expect(getByText('Movie C')).toBeTruthy();
  });

  it('renders the correct number of lazy images', () => {
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

  it('calls onItemPress when an item is pressed', () => {
    const onItemPress = jest.fn();
    const { getByText } = render(
      <CarouselRow carousel={posterCarousel} onItemPress={onItemPress} />
    );
    getByText('Movie A').parent.props.onPress?.();
  });
});
