import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

// type AuthDispatch = Dispatch<Action>;
// const AuthDispatchContext = createContext<AuthDispatch | null>(null);

const initialState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
};

type State = {
  isLoading: boolean;
  isSignout: boolean;
  userToken: string | null;
};

type Dispatch = {
  signIn: (data: string) => Promise<void>;
  signOut: () => void;
  signUp: (data: string) => Promise<void>;
};

const initialDispatch = {
  signIn: async () => {},
  signOut: () => {},
  signUp: async () => {},
};

const AuthStateContext = createContext<State>(initialState);
const AuthDispatchContext = createContext<Dispatch>(initialDispatch);

type Action =
  | {type: 'RESTORE_TOKEN'; token: string | null}
  | {type: 'SIGN_IN'; token: string | null}
  | {type: 'SIGN_OUT'};

function reducer(prevState: State, action: Action): State {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {...prevState, isLoading: false, userToken: action.token};
    case 'SIGN_IN':
      return {...prevState, isSignout: false, userToken: action.token};
    case 'SIGN_OUT':
      return {...prevState, isSignout: true, userToken: null};
  }
}

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken: string | null;
      try {
        // Restore token stored in `AsyncStore`
        // userToken = await AsyncStorage.getItem('userToken');
        // After restoring token, screen will be unmounted and thrown away.
        setTimeout(() => {
          userToken = null;
          dispatch({type: 'RESTORE_TOKEN', token: userToken});
        }, 3000);
      } catch (error) {
        // Restoring token failed
      }
    };
    bootstrapAsync();
  }, []);

  const authDispatchContextValue = useMemo(
    () => ({
      signIn: async (data: string) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        console.log(data);
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async (data: string) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        console.log(data);
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={authDispatchContextValue}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

export function useAuthState() {
  const state = useContext(AuthStateContext);
  if (!state) {
    throw new Error('Cannot find AuthProvider');
  }
  return state;
}

export function useAuthDispatch() {
  const dispatch = useContext(AuthDispatchContext);
  if (!dispatch) {
    throw new Error('Cannot find AuthProvider');
  }
  return dispatch;
}
