import React from 'react';
import { Text, StyleSheet } from 'react-native';

const ItemTitle = ({ title }) => (
  <Text style={styles.text} numberOfLines={2}>
    {title}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
    paddingHorizontal: 4,
  },
});

export default ItemTitle;
