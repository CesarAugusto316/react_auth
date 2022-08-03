import { FC } from 'react';
import {
  Form, Navbar, Welcome,
} from './components';
import { useLoginContext } from './context/LoginProvider';


export const App: FC = () => {
  const { isUserLoggedIn } = useLoginContext();

  return (
    <div id="app" data-theme="dark">
      <Navbar />
      <section className="section">
        {!isUserLoggedIn && <Form />}
        {isUserLoggedIn && <Welcome />}
        <main className="main" />
      </section>
    </div>
  );
};
