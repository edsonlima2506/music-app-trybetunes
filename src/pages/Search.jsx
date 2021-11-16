import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import search from '../images/pesquisar.png';
import play from '../images/play.png';
import profile from '../images/perfil.png';
import trybetunes from '../images/destaque.png';
import config from '../images/config.png';
import notification from '../images/notification.png';
import { getUser } from '../services/userAPI';
import '../styles/Search.css';
import '../styles/Mobile.css';

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

  renderAlbuns() {
    const { albumAtual } = this.state;
    return <div className="albums-cards"> { albumAtual.map((collection) => (
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
    )) } </div>
  }

  renderSearchArea() {
    const { buttonDisable, userName } = this.state;
    return <form>
    <div className="search-input-button">
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
      <div className="icons">
        <img src={ config } alt="engrenagem" className="icon"/>
        <img src={ notification } alt="bell" className="icon"/>
      </div>
      <div className="user-div">
        <img src={ profile } alt="lupa" className="user-icon" />
        <h2>{ `Olá, ${ userName }!` }</h2>
      </div>
    </div>
  </form>
  }

  renderInicialScreen() {
    return <div>
      <img src={ trybetunes } alt="" className="imagem-inicial"/>
    </div>
  }

  render() {
    const { resultadoDaBuscaTexto, albumAtual } = this.state;
    const result = `Exibindo álbuns de: ${resultadoDaBuscaTexto}`;
    return (
      <div data-testid="page-search" className="search">
        <Header />
        { this.renderSearchArea() }
        { albumAtual.length !== 0 && <h2 className="result-text">{ result }</h2> }
        { albumAtual.length === 0 ? this.renderInicialScreen() : this.renderAlbuns() }
      </div>
    );
  }
}

export default Search;
