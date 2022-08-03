import {
  createContext, FC, ReactNode, useContext, useEffect, useState,
} from 'react';
import {
  LoginService, UserProfile, FormState,
} from '../services/LoginService.class';


interface ContextProps {
  isLoading: boolean,
  userProfile: UserProfile,
  isUserLoggedIn: boolean,
  onFetchToken: (userInput: FormState) => Promise<void>,
  onFetchUserProfile: () => Promise<void>
}

const Context = createContext({} as ContextProps);

export const useLoginContext = () => {
  return useContext(Context);
};

/**
 *
 * @description LoginService keeps track if loggedInUser
 */
const loginService = new LoginService();

export const LoginProvider: FC<{children: ReactNode}> = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(loginService.hasValidToken);
  const [isLoading, setIsLoading] = useState<boolean>(loginService.hasValidToken);
  const [userProfile, setUserProfile] = useState({} as UserProfile);

  const onFetchToken = async (userInput: FormState) => {
    try {
      await loginService.fetchToken(userInput);
      if (loginService.hasValidToken) {
        setIsUserLoggedIn(true);
        setIsLoading(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFetchUserProfile = async () => {
    try {
      await loginService.fetchUserProfile();
      setUserProfile(loginService.loggedInUser);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loginService.hasValidToken) {
      loginService.fetchUserProfile()
        .then((user) => {
          setUserProfile(user);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <Context.Provider value={{
      isLoading, userProfile, isUserLoggedIn, onFetchToken, onFetchUserProfile,
    }}
    >
      {children}
    </Context.Provider>
  );
};
