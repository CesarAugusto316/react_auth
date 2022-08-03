import { FC } from 'react';
import {
  Form, Navbar, Welcome,
} from './components';
import { useLogin } from './context/LoginProvider';


export const App: FC = () => {
  const { isLoggedIn } = useLogin();

  return (
    <div id="app" data-theme="dark">
      <Navbar />
      <section className="section">
        {!isLoggedIn && <Form />}
        {isLoggedIn && <Welcome />}
        <main className="main" />
      </section>
    </div>
  );
};
