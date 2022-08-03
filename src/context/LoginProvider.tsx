import {
  createContext, FC, ReactNode, useContext, useEffect, useState,
} from 'react';
import {
  LoginService, UserProfile, FormState,
} from '../services/LoginService.class';


interface ContextProps {
  isLoading: boolean,
  userProfile: UserProfile,
  isLoggedIn: boolean,
  onFetchToken: (userInput: FormState) => void,
  onFetchUserProfile: () => Promise<void>
}

const Context = createContext({} as ContextProps);

export const useLogin = () => {
  return useContext(Context);
};

/**
 *
 * @description when LoginService keeps track loggedUser
 */
const loginService = new LoginService();

export const LoginProvider: FC<{children: ReactNode}> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(loginService.isValidToken);
  const [isLoading, setIsLoading] = useState<boolean>(loginService.isValidToken);
  const [userProfile, setUserProfile] = useState({} as UserProfile);

  const onFetchToken = async (userInput: FormState) => {
    try {
      await loginService.fetchToken(userInput);
      if (loginService.isValidToken) {
        setIsLoggedIn(true);
        setIsLoading(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFetchUserProfile = async () => {
    try {
      await loginService.fetchUserProfile();
      setUserProfile(loginService.loggedUser);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loginService.isValidToken) {
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
      isLoading, userProfile, isLoggedIn, onFetchToken, onFetchUserProfile,
    }}
    >
      {children}
    </Context.Provider>
  );
};
