import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import search from '../images/pesquisar.png'
import '../styles/Search.css';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      buttonDisable: true,
      music: '',
      resultadoDaBuscaTexto: '',
      albumAtual: [],
    };

    this.enableButon = this.enableButon.bind(this);
    this.searchMusic = this.searchMusic.bind(this);
  }

  searchMusic = async () => {
    const { music, resultadoDaBuscaTexto } = this.state;
    const inputMusic = document.getElementById('inputMusic');
    const album = await searchAlbumsAPI(music);
    if (album.length !== 0) {
      this.setState({
        music: '',
        resultadoDaBuscaTexto: inputMusic.value,
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

  render() {
    const { buttonDisable, resultadoDaBuscaTexto, albumAtual } = this.state;
    const result = `Resultado de álbuns de: ${resultadoDaBuscaTexto}`;
    return (
      <div data-testid="page-search" className="search">
        <Header />
        <form>
          <div className="search-input-button">
            <input
              id="inputMusic"
              type="text"
              data-testid="search-artist-input"
              onChange={ this.enableButon }
              className="input-search"
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ buttonDisable }
              onClick={ this.searchMusic }
              className="button-search"
            >
              <img src={ search } alt="" className="icon"/>
            </button>
          </div>
        </form>
        <h1>{ result }</h1>
        { albumAtual.length === 0 ? <p>Nenhum álbum foi encontrado</p>
          : albumAtual.map((collection) => (
            <div key={ collection.collectionId }>
              <h1>{ collection.collectionName }</h1>
              <p>{ collection.artistName }</p>
              <Link
                to={ `/album/${collection.collectionId}` }
                data-testid={ `link-to-album-${collection.collectionId}` }
              >
                Ver album
              </Link>
            </div>)) }
      </div>
    );
  }
}

export default Search;
