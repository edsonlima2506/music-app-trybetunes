import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import '../styles/Favorites.css';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super()

    this.state = {
      favoritesSongs: [],
    }

    this.getMusics = this.getFavoriteMusics.bind(this);
    this.renderMusics = this.renderFavoriteMusics.bind(this);
  }

  componentDidMount() {
    this.getFavoriteMusics();
  }

  async getFavoriteMusics() {
    const musicFavorites =  await getFavoriteSongs()
    console.log(`${musicFavorites} PRIMEIRO`);
    this.setState({
      favoritesSongs: musicFavorites,
    });
    const { favoritesSongs } = this.state;
    console.log(`${favoritesSongs} SEGUNDO`);
  }

  renderFavoriteMusics() {
    const { favoritesSongs } = this.state
    console.log(`${favoritesSongs} TERCEIRO`);
    return (favoritesSongs.map((music) => (
      <MusicCard
      objMusic={ music }
      key={ music.trackId }
      trackName={ music.trackName }
      previewUrl={ music.previewUrl }
      trackId={ music.trackId }
    />
    ))
    );
  }

  render() {
    const { favoritesSongs } = this.state
    return (
      <div data-testid="page-favorites">
        <Header />
        <div className="favorite-musics">
          <h1>Você não cansa de ouvir:</h1>
          <div>
            { favoritesSongs.length > 0 && this.renderFavoriteMusics() }
          </div>
        </div>
      </div>
    );
  }
}

export default Favorites;
