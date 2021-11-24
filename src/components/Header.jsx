import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import '../styles/Mobile.css';
import search from '../images/pesquisar.png';
import favorite from '../images/favorito.png';
import profileIcon from '../images/icone.png';
import podcast from '../images/podcast.png';
import audiobook from '../images/audiobook.png';
import videoclip from '../images/videoclip.png';
import spotify from '../images/spotify.png';

class Header extends React.Component {
  constructor() {
    super()

    this.state = {
      music: ''
    }
  }

  renderTopHeader() {
    return(
      <div className="topHeader">
        <div className="balls">
          <div className="ball red"></div>
          <div className="ball yellow"></div>
          <div className="ball green"></div>
          </div>
          <div className="logoAndIcon">
          <img src={ spotify } alt="logo spotify" className="logo"/>
          &#9778;
        </div>
      </div>
    );
  }

  renderMenu() {
    return (
      <div>
        <p className="menuText">MENU</p>
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
              <img src={ profileIcon } alt="pessoa" className="icon" />
              Perfil
              </Link>
          </nav>
          <p className="em-breve">EM BREVE</p>
          <nav>
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
          </nav>
        </div>
    );
  }

  renderMusicPlayer() {
    const { artistName, musicName, musicImage, musicPreview, autoPlay } = this.props;
    return (
      <div className="principalSong">
          <img src={ musicImage } alt="" className="logoPrincipalSong" />
          <span>
            <h1>{ musicName }</h1>
            <h2>{ artistName }</h2>
            <audio src={ musicPreview }
            controls
            className="audioPrincipalSong"
            autoPlay={ autoPlay }
            >
              <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
            </audio>
          </span>
        </div>
    );
  }

  renderHeader() {
    return (
      <aside data-testid="header-component" className="menu-lateral">
        { this.renderTopHeader() }
        { this.renderMenu() }
        { this.renderMusicPlayer() }
      </aside>
    );
  }

  render() {
    return (
      <div>
        { this.renderHeader() }
      </div>
    );
  }
}

export default Header;
