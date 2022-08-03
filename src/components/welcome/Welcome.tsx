import { FC, useEffect } from 'react';
import { Spinner } from '../spinner/Spinner';
import { useLogin } from '../../context/LoginProvider';
import './welcome.css';


export const Welcome: FC = () => {
  const { userProfile, isLoading, onFetchUserProfile } = useLogin();

  useEffect(() => {
    onFetchUserProfile();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <h1 className="primary-heading">
        <span>Welcome</span>
        <span className="primary-heading__user">{userProfile.username}</span>
      </h1>
    </div>
  );
};
