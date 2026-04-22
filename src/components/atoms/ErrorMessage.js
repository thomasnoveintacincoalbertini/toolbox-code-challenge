import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const ErrorMessage = ({ message, actionLabel, onAction }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{message}</Text>
    {actionLabel && onAction ? (
      <TouchableOpacity style={styles.button} onPress={onAction} activeOpacity={0.8}>
        <Text style={styles.buttonText}>{actionLabel}</Text>
      </TouchableOpacity>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
  },
  text: {
    color: '#ff4444',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#111',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ErrorMessage;
