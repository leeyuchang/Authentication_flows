import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import {useAuthDispatch} from '../contexts/auth';

export default function SignInScreen() {
  const {signIn} = useAuthDispatch();
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  return (
    <Center flex={1} px="3">
      <Example signIn={signIn} />
    </Center>
  );
}

const Example = props => {
  return (
    <Box safeArea p="1" py="8" w="100%" maxW="320">
      <Heading
        size="lg"
        fontWeight="600"
        color="coolGray.800"
        _dark={{
          color: 'warmGray.50',
        }}>
        Welcome
      </Heading>
      <Heading
        mt="1"
        _dark={{
          color: 'warmGray.200',
        }}
        color="coolGray.600"
        fontWeight="medium"
        size="xs">
        Sign in to continue!
      </Heading>

      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>Email ID</FormControl.Label>
          <Input />
        </FormControl>
        <FormControl>
          <FormControl.Label>Password</FormControl.Label>
          <Input type="password" />
          <Link
            _text={{
              fontSize: 'xs',
              fontWeight: '500',
              color: 'indigo.500',
            }}
            alignSelf="flex-end"
            mt="1">
            Forget Password?
          </Link>
        </FormControl>
        <Button mt="2" colorScheme="indigo" onPress={() => props.signIn({})}>
          Sign in
        </Button>
        <HStack mt="6" justifyContent="center">
          <Text
            fontSize="sm"
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}>
            I'm a new user.{' '}
          </Text>
          <Link
            _text={{
              color: 'indigo.500',
              fontWeight: 'medium',
              fontSize: 'sm',
            }}
            href="#">
            Sign Up
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
};
