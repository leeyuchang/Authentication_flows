/* eslint-disable react-native/no-inline-styles */
import {Text, View} from 'native-base';
import React from 'react';

export default function SplashScreen() {
  return (
    <View
      style={{
        backgroundColor: 'yellowgreen',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Youlpass</Text>
    </View>
  );
}
