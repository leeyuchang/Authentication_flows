import {Text, View} from 'native-base';
import React, {useRef} from 'react';
// import {useAuthState} from '../contexts/auth';

export default function Bscreen() {
  const countRef = useRef(0);
  // const state = useAuthState();
  return (
    <View>
      <Text>B-Screen {countRef.current++}/</Text>
    </View>
  );
}
