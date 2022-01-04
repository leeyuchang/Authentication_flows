import {Text, View} from 'native-base';
import React, {useRef} from 'react';
import {useAuthDispatch, useAuthState} from '../contexts/auth';
import {Button} from 'react-native';

export default function Ascreen() {
  const state = useAuthState();
  const dispatch = useAuthDispatch();
  const countRef = useRef(0);

  return (
    <View width={'100%'}>
      <Text>
        A-Screen {countRef.current++} / userToken{' '}
        {JSON.stringify(state, null, 2)}
      </Text>
      <Button title="click me" onPress={() => dispatch.signIn('hello world')} />
    </View>
  );
}
