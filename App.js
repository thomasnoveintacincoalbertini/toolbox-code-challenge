import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './src/store';
import HomeScreen from './src/screens/HomeScreen';

const queryClient = new QueryClient();

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="light" />
          <HomeScreen />
        </QueryClientProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
