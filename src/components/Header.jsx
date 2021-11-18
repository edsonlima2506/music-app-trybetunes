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
import getMusics from '../services/musicsAPI';
const logoPrincipalSong = "https://data.whicdn.com/images/112018283/original.jpg";
const backgroundPrincipalSong = "https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

class Header extends React.Component {
  constructor() {
    super()

    this.state = {
      music: ''
    }

    this.showMusic = this.showMusic.bind(this);
  }

  componentDidMount() {
    this.showMusic()
  }

  showMusic = async () => {
    const albumResult = await getMusics("548656698");
    const musicPrincipal = albumResult[4];
    this.setState({ music: musicPrincipal });
  }

  render() {
    const { music } = this.state;
    return (
      <aside data-testid="header-component" className="menu-lateral">
          <div className="balls">
            <div className="ball red"></div>
            <div className="ball yellow"></div>
            <div className="ball green"></div>
          </div>
          <div className="logoAndIcon">
            <img src={ spotify } alt="logo spotify" className="logo"/>
            &#9778;
          </div>
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
        <img src={ backgroundPrincipalSong } alt="" className="backgroundPrincipalSong" />
        <div className="principalSong">
          <img src={ logoPrincipalSong } alt="" className="logoPrincipalSong" />
          <span>
            <h1>Sweater Weather</h1>
            <h2>The Neighbourhood</h2>
            <audio src={ music.previewUrl }
            controls
            className="audioPrincipalSong"
            >
              <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
            </audio>
          </span>
        </div>
      </aside>
    );
  }
}

export default Header;
