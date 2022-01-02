import {Center, Container, Heading, Text} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import io from 'socket.io-client';
import {AppState} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

export default function HomeScreen() {
  return (
    <Center flex={1} px={10}>
      <Example />
    </Center>
  );
}

export const Example = () => {
  const appState = useRef(AppState.currentState);
  const ioRef = useRef();

  const [response, setResponse] = useState('');

  useEffect(() => {
    ioRef.current = io('http://000.000.000.000:3100');
    ioRef.current.emit('joinRoom', {myId: '123'});
    ioRef.current.on('changes', msg =>
      setResponse(prev => prev + JSON.stringify(msg, null, 2)),
    );
    ioRef.current.on('connect_error', err => {
      console.log(`connect_error due to ${err.message}`);
    });
    return () => ioRef.current.close();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
        BackgroundTimer.stopBackgroundTimer(); //after this call all code on background stop run.
      } else {
        BackgroundTimer.runBackgroundTimer(() => {
          //code that will be called every 10 seconds to keep connection
          ioRef.current.emit('background');
          console.log('tic');
        }, 10000);
      }
      appState.current = nextAppState;
      console.log('AppState', appState.current);
    });

    return () => subscription.remove();
  }, []);

  return (
    <Container>
      <Heading>
        A component library for the
        <Heading color="emerald.500"> React Ecosystem</Heading>
      </Heading>
      <Text mt="1" fontWeight="medium">
        {response}
      </Text>
    </Container>
  );
};
