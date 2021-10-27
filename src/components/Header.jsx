import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../images/logo.png';
import search from '../images/pesquisar.png';
import favorite from '../images/favorito.png';
import profile from '../images/perfil.png';

class Header extends React.Component {

  render() {
    return (
      <aside data-testid="header-component" className="menu-lateral">
        <img src={ logo } alt="logo" className="logo" />
        <nav>
          <Link
            to="/search"
            data-testid="link-to-search"
            className="link-nav">
              <img src={ search } alt="lupa" className="icon" />
              Pesquisar
          </Link>
          <Link
          to="/favorites"
          data-testid="link-to-favorites"
          className="link-nav">
            <img src={ favorite } alt="lupa" className="icon" />
            Favoritas
          </Link>
          <Link
          to="/profile"
          data-testid="link-to-profile"
          className="link-nav">
            <img src={ profile } alt="lupa" className="icon" />
            Perfil
            </Link>
        </nav>
        <div className="copy">&copy; <h3>Edson Lima</h3></div>
      </aside>
    );
  }
}

export default Header;
