import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../styles/MusicCard.css';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      isFavoriteSong: false,
    };

    this.isFavorite = this.isFavorite.bind(this);
    this.isNotFavorite = this.isNotFavorite.bind(this);
    this.checkFavorite = this.checkFavorite.bind(this);
  }

  componentDidMount() {
    this.checkFavorite();
  }

  isFavorite = async () => {
    const { objMusic } = this.props;
    const { loading } = this.state;
    console.log(loading);
    this.setState({ loading: true });
    await addSong(objMusic);
    this.setState({ loading: false, isFavoriteSong: true });
  }

  isNotFavorite = async () => {
    const { loading } = this.state;
    const { objMusic } = this.props;
    console.log(loading);
    this.setState({ loading: true });
    await removeSong(objMusic);
    this.setState({ loading: false, isFavoriteSong: false });
  }

  async checkFavorite() {
    const favorites = await getFavoriteSongs();
    const { trackId } = this.props;
    const isFavorite = favorites.some((msc) => msc.trackId === trackId);
    this.setState({ isFavoriteSong: isFavorite });
  }

  render() {
    const { objMusic, trackId } = this.props;
    const { loading, isFavoriteSong } = this.state;
    return (
      <div>
        <div key={ objMusic.trackName } className="music-player-name">
          <img src={ objMusic.artworkUrl60 } alt="" />
          <p>{ objMusic.trackName }</p>
          <audio
            data-testid="audio-component"
            src={ objMusic.previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
            <input
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              checked={ isFavoriteSong }
              onChange={ isFavoriteSong ? this.isNotFavorite : this.isFavorite }
              className="checkbox-favorite"
            />
        </div>
        { loading && <h3>Carregando...</h3> }
      </div>
    );
  }
}

MusicCard.propTypes = {
  objMusic: PropTypes.objectOf(PropTypes.object).isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
