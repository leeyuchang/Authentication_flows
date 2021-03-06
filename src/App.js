import {NativeBaseProvider} from 'native-base';
import React from 'react';
import RootNavigator from './navigation';
import 'react-native-gesture-handler';
import {AuthProvider} from './contexts/auth';
import {QueryClient, QueryClientProvider} from 'react-query';
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
// LogBox.ignoreAllLogs(); //Ignore all log notifications

const queryClient = new QueryClient();

const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider>
          <RootNavigator />
        </NativeBaseProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
