import { FC } from 'react';
import { FaStream, FaMoon } from 'react-icons/fa';
import './navbar.css';


/**
 *
 * @description When we click the toggle-button we store
 * our preferred-theme in localStorage.
 */
export const Navbar: FC = () => {
  return (
    <nav className="navbar">
      <FaStream className="navbar__icon" />
      <h2 className="navbar__heading">LarnU Bootcamp</h2>
      <span>
        <FaMoon className="navbar__icon" title="change to light mode" />
      </span>
    </nav>
  );
};
