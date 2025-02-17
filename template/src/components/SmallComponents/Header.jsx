import React from 'react';
import { Link } from 'react-router-dom';
import "../../../assets/sass/modules/SmallComponents/Header.module.scss";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/calendar">Calendar</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;