import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import search from '../images/pesquisar.png';
import play from '../images/play.png';
import profile from '../images/perfil.png';
import config from '../images/config.png';
import notification from '../images/notification.png';
import verify from '../images/verificar.png';
import fone from '../images/fone.png';
import { getUser } from '../services/userAPI';
import '../styles/Search.css';
import '../styles/Mobile.css';
const negrali = "https://www.jornaldorap.com.br/wp-content/uploads/2020/10/negra-li-elle-brasil.jpg";
const arlindo = "https://www.ecp.org.br/wp-content/uploads/2017/12/arlindo_cruz_2014-c2-bdwashington_possato0184.jpg";
const djonga = "https://ogimg.infoglobo.com.br/in/24367056-73a-f6d/FT1086A/87575815_SCO-rapper-Djonga.jpg";
const emicida = "https://files.nsctotal.com.br/s3fs-public/styles/teaser_image_style/public/graphql-upload-files/Emicida_1.jpg?NeintMhzidhVBdoJAJyfB9vt6SvP9YTE&itok=vxQdYXxt";

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      buttonDisable: true,
      music: '',
      resultadoDaBuscaTexto: '',
      albumAtual: [],
      userName: '',
    };

    this.enableButon = this.enableButon.bind(this);
    this.searchMusic = this.searchMusic.bind(this);
    this.recoverUser = this.recoverUser.bind(this);
    this.renderAlbuns = this.renderAlbuns.bind(this);
    this.renderSearchArea = this.renderSearchArea.bind(this);
    this.renderInicialScreen = this.renderInicialScreen.bind(this);
    this.renderSuperiorInicialScreen = this.renderSuperiorInicialScreen.bind(this);
  }

  componentDidMount() {
    this.recoverUser()
  }

  searchMusic = async () => {
    const { music, resultadoDaBuscaTexto } = this.state;
    const inputMusic = document.getElementById('inputMusic');
    const album = await searchAlbumsAPI(music);
    if (album.length !== 0) {
      this.setState({
        music: '',
        resultadoDaBuscaTexto: String(inputMusic.value),
        albumAtual: album,
      });
      console.log(resultadoDaBuscaTexto);
      inputMusic.value = '';
    } else {
      this.setState({ music: '' });
      inputMusic.value = '';
    }
  }

  enableButon({ target }) {
    if (target.value.length >= 2) {
      this.setState({
        buttonDisable: false,
        music: target.value,
      });
    }
  }

  recoverUser = async () => {
    const { name } = await getUser()
    this.setState({
      userName: name,
    });
  }

  renderSuperiorInicialScreen() {
    return (
      <div className="superiorInicialScreen">
        { this.renderSearchArea() }
        <p>Destaque da semana</p>
        <span className="contentSuperiorScreen">
          <h1>Sweater Weather</h1>
          <img src={ verify } alt=""  className="icon"/>
        </span>
        <span className="secundaryContentSuperiorScreen">
          <img src={ fone } alt="" className="icon"/>
          <h2>11,184,817</h2>
          <p>Reproduções este mês</p>
        </span>
      </div>  
    );
  }

  renderAlbuns() {
    const { albumAtual } = this.state;
    return <div> 
    { this.renderSuperiorInicialScreen() }
    <div className="album-cards">
      { albumAtual.map((collection) => (
        <section key={ collection.collectionId } className="album-card">
          <span className="image-infos">
            <img src={ collection.artworkUrl100 } alt="imagem album" className="album-image qualidade"/>
            <span>
              <h3 className="album-name info">{ collection.collectionName }</h3>
              <h4 className="artist-name info">{ collection.artistName }</h4>
              <Link
                to={ `/album/${collection.collectionId}` }
                data-testid={ `link-to-album-${collection.collectionId}` }
                >
                <img src={ play } alt="" className="play" />
              </Link>
            </span>
          </span>
        </section>
      )) } 
      </div>
    </div>
  }

  renderSearchArea() {
    const { buttonDisable, userName } = this.state;
    return <form>
    <div className="search-input-button">
      <span className="center-flex">
        <input
          id="inputMusic"
          type="text"
          data-testid="search-artist-input"
          onChange={ this.enableButon }
          className="input-search"
          placeholder="Busque por seu artista favorito"
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ buttonDisable }
          onClick={ this.searchMusic }
          className="button-search"
        >
          <img src={ search } alt="lupa" className="icon"/>
        </button>
      </span>
      <span className="center-flex">
        <div className="user-div">
          <img src={ profile } alt="lupa" className="user-icon" />
          <h2>{ `Olá, ${ userName }!` }</h2>
        </div>
        <img src={ config } alt="engrenagem" className="icon"/>
        <img src={ notification } alt="bell" className="icon"/>
      </span>
    </div>
  </form>
  }

  renderInicialScreen() {
    return (
    <div className="inicialScreen">
      { this.renderSuperiorInicialScreen() }
      <div className="mainContentInicialScreen">
        <section>
          <img src={ negrali } alt="" className="artistPic"/>
          <img src={ play } alt="" className="playArtistCard"/>
          <h1>Negra Li</h1>
          <div className="listenersArtists">
            <img src={ fone } alt="" className="icon"/>
            <p>5,275,950</p>
          </div>
        </section>
        <section>
          <img src={ arlindo } alt="" className="artistPic"/>
          <img src={ play } alt="" className="playArtistCard"/>
          <h1>Arlindo Cruz</h1>
          <div className="listenersArtists">
            <img src={ fone } alt="" className="icon"/>
            <p>15,129,741</p>
          </div>
        </section>
        <section>
          <img src={ djonga } alt="" className="artistPic"/>
          <img src={ play } alt="" className="playArtistCard"/>
          <h1>Djonga</h1>
          <div className="listenersArtists">
            <img src={ fone } alt="" className="icon"/>
            <p>177,952,863</p>
          </div>
        </section>
        <section>
          <img src={ emicida } alt="" className="artistPic"/>
          <img src={ play } alt="" className="playArtistCard"/>
          <h1>Emicida</h1>
          <div className="listenersArtists">
            <img src={ fone } alt="" className="icon"/>
            <p>125,445,397</p>
          </div>
        </section>
      </div>
    </div>
    )
  }

  render() {
    const { albumAtual } = this.state;
    return (
      <div data-testid="page-search" className="search">
        <Header />
        { albumAtual.length !== 0 ? this.renderAlbuns() : this.renderInicialScreen() }
      </div>
    );
  }
}

export default Search;
