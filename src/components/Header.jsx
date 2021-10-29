import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../images/logo.png';
import search from '../images/pesquisar.png';
import favorite from '../images/favorito.png';
import profile from '../images/perfil.png';
import podcast from '../images/podcast.png';
import audiobook from '../images/audiobook.png';
import videoclip from '../images/videoclip.png';
import envio from '../images/envio.png';

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
            <img src={ favorite } alt="coração" className="icon" />
            Favoritas
          </Link>
          <Link
          to="/profile"
          data-testid="link-to-profile"
          className="link-nav">
            <img src={ profile } alt="pessoa" className="icon" />
            Perfil
            </Link>
        </nav>
        <hr />
        <nav>
          <h1 className="em-breve">Em breve</h1>
          <Link
            to="/search"
            data-testid="link-to-search"
            className="link-nav">
              <img src={ podcast } alt="microfone" className="icon" />
              Podcasts
          </Link>
          <Link
          to="/search"
          data-testid="link-to-favorites"
          className="link-nav">
            <img src={ audiobook } alt="livro" className="icon" />
            AudioBooks
          </Link>
          <Link
          to="/search"
          data-testid="link-to-profile"
          className="link-nav">
            <img src={ videoclip } alt="video" className="icon" />
            Video clipes
            </Link>
            <Link
          to="/search"
          data-testid="link-to-profile"
          className="link-nav">
            <img src={ envio } alt="envio" className="icon" />
            Seus uploads
            </Link>
        </nav>
        <div className="copy">&copy; <h3>Edson Lima</h3></div>
      </aside>
    );
  }
}

export default Header;
