import { FC } from 'react';
import {
  Form, Navbar, Welcome,
} from './components';
import { useLoginContext } from './context/LoginProvider';


export const App: FC = () => {
  const { isLoggedIn } = useLoginContext();

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
