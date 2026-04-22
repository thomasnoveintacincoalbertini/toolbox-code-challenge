import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LazyImage from '../src/components/atoms/LazyImage';

describe('LazyImage', () => {
  it('shows a spinner while loading', () => {
    const { getByTestId } = render(
      <LazyImage uri="https://example.com/img.jpg" style={{ width: 100, height: 100 }} />
    );
    expect(getByTestId('lazy-image-spinner')).toBeTruthy();
  });

  it('hides the spinner after image loads', () => {
    const { getByTestId, queryByTestId } = render(
      <LazyImage uri="https://example.com/img.jpg" style={{ width: 100, height: 100 }} />
    );
    fireEvent(getByTestId('lazy-image-img'), 'load');
    expect(queryByTestId('lazy-image-spinner')).toBeNull();
  });

  it('hides the spinner on error', () => {
    const { getByTestId, queryByTestId } = render(
      <LazyImage uri="https://example.com/img.jpg" style={{ width: 100, height: 100 }} />
    );
    fireEvent(getByTestId('lazy-image-img'), 'error');
    expect(queryByTestId('lazy-image-spinner')).toBeNull();
  });
});
